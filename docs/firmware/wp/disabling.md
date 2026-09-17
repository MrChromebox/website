# Disabling Firmware Write Protection

To fully disable firmware write protection you need to:

* Disable the **hardware** write protection (the `!WP` pin, or the Google Security Chip (GSC) WP state).
* Disable **software** write protection on the flash chip.
* Clear any protected ranges (start and end both set to 0).

::: tip NOTE
Once software write protection is disabled, it stays disabled until you turn it back on. Re-enabling hardware WP later does **not** re-protect the flash contents.
:::

Check the [Supported Devices](/docs/supported-devices.md) page for your board's hardware WP method, then read [Which method should I use?](#which-method-should-i-use) before you start taking screws out.

::: warning IMPORTANT
Your device must be in [Developer Mode](/docs/boot-modes/developer.md). If it is enrolled / managed by a school or employer, CCD is locked out and none of the `gsctool` or SuzyQ methods will work.
:::

::: warning IMPORTANT
If you are using the Firmware Utility Script to flash firmware or set GBB flags, **do not** manually disable software WP. The script handles that. You only need hardware WP off (and, on Ti50, RO verification disabled).
:::

## Which security chip do I have?

Not every ChromeOS device has a GSC. There are three cases:

* **No GSC** — 2016 and earlier (Sandy Bridge through Skylake). Hardware WP is a screw, jumper, or switch. You do not need `gsctool`.
* **CR50** — 2017 through most 2022 devices (Apollolake / Kabylake through Alder Lake-P). Hardware WP is enough; battery, jumper, screw, or SuzyQ.
* **Ti50** — most families first sold in 2023 or later (Nissa, Skyrim, Brox, Rex, and similar). `gsctool` from ChromeOS, or a SuzyQable. There is no battery or jumper WP method.

The [Supported Devices](/docs/supported-devices.md) WP Method column lists CR50 or Ti50 when a GSC is present. Don't guess from the year alone — a few later boards still use CR50, and a few Alder Lake-era names (Brox) already use Ti50.

To confirm on the device:

**From ChromeOS:** open `chrome://system` and find `tpm_version`.

* `gsc_version: GSC_VERSION_TI50` — Ti50
* `gsc_version: GSC_VERSION_CR50` — CR50
* no `gsc_version` line (TPM 1.2, Infineon, etc.) — no GSC

**From a VT2 shell** (`CTRL+ALT+F2` at the login screen, log in as `chronos`):

```bash
sudo gsctool -a -I | grep AllowUnverifiedRo
```

* A line of output — Ti50
* `gsctool` runs, but that grep is empty — CR50
* `gsctool` is missing, or cannot talk to a GSC — no GSC

## Which method should I use?

| Device | What you must do | How to disable hardware WP |
| --- | --- | --- |
| No GSC (2016 and earlier) | Hardware WP only | Remove the screw, bridge the jumper, or flip the switch |
| CR50 | Hardware WP only | Battery disconnect, jumper, screw, or a [SuzyQable](#using-closed-case-debugging-ccd-using-a-suzyqable) |
| Ti50 | Hardware WP **and** `AllowUnverifiedRo=always` | [`gsctool`](#using-gsctool-no-suzyqable) from ChromeOS, or a [SuzyQable](#using-closed-case-debugging-ccd-using-a-suzyqable) |

Do not open a device with a Ti50 to pull the battery or hunt for a jumper. That will not drop WP, and it will not disable RO verification. Flashing Full ROM without `AllowUnverifiedRo=always` will fail to boot.

**Practical recommendations:**

* **CR50, board has a battery WP method:** disconnect the battery. Simplest.
* **Ti50, still running ChromeOS:** use [`gsctool`](#using-gsctool-no-suzyqable). No cable, no disassembly.
* **You want an easy recovery path if the flash goes badly:** use a [SuzyQable](#using-closed-case-debugging-ccd-using-a-suzyqable) and `ccd reset factory`. That keeps CCD factory-open so you can unbrick later without opening the case.

```
                    What WP method does your board use?
                    (Supported Devices column, or tpm_version)
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
           No GSC                   CR50                    Ti50
        (2016 and earlier)     (most 2017–2022)          (most 2023+)
              │                       │                       │
              ▼                       ▼                       ▼
        Screw, jumper,          Battery, jumper,        Do not open
        or switch               or screw                the case
                                    │                       │
                                    │               ┌───────┴────────┐
                                    │               │                │
                              or SuzyQable    Still on ChromeOS  Want WP off
                                                    │            across power-off
                                                    ▼            / easy unbrick?
                                               gsctool:               │
                                               open CCD               ▼
                                               AllowUnverifiedRo  SuzyQ:
                                               always             wp disable atboot
                                               gsctool -a -w      + ccd reset factory
                                               disable
                                               Then flash; do not
                                               fully power off
```

Jump to: [screw](#removing-the-write-protection-screw) · [battery](#disconnecting-the-battery) · [jumper](#bridging-a-jumper) · [`gsctool`](#using-gsctool-no-suzyqable) · [SuzyQable](#using-closed-case-debugging-ccd-using-a-suzyqable)

<a id="disable-ap-ro-firmware-verification"></a>

## Ti50 considerations

Ti50 is a different GSC from CR50, not a "Gen2 CR50". Besides controlling the `!WP` pin, it verifies two things at boot:

1. The read-only (RO) portion of the AP firmware
2. The software write-protect registers (enable bit **and** range)

If either check fails, the AP is held in reset. The device will not boot, including Recovery Mode.

You disable both of those checks — and hardware WP — through CCD. There is no battery or jumper WP path on Ti50.

| Control | What it does | `gsctool` | SuzyQ console |
| --- | --- | --- | --- |
| `AllowUnverifiedRo` | Skip AP RO + SW WP register verification | `gsctool -a -I AllowUnverifiedRo:always` | `ccd reset factory` (or `ccd set`) |
| Hardware WP | Lets you change flash WP registers and RO data | `gsctool -a -w disable` (until the GSC reboots) | `wp disable` + `wp disable atboot` |

Set `AllowUnverifiedRo` **before** you disable software WP or flash Full ROM. Changing the SW WP registers with verification still on is enough to brick, even if you never touch the AP firmware.

Google's writeup of this feature is [Read-only firmware unlock on 2023+ devices](https://www.chromium.org/chromium-os/developer-library/guides/device/ro-firmware-unlock/).

## Opening CCD with gsctool

CCD (Closed Case Debugging) has to be **Open** before `gsctool` can change WP or CCD capabilities. This is `gsctool -a -o` — that **opens** CCD, it does not "unlock" it (`-u` is a different, weaker state).

You need this for the no-cable Ti50 path, and as step 1 of the SuzyQ path.

1. Boot to the ChromeOS login screen in Developer Mode.
2. Open VT2: `CTRL+ALT+F2` (Refresh / right-arrow key).
3. Log in as `chronos` (no password). On some images `root` still works; the Firmware Utility Script wants `chronos`, so use that.
4. Open CCD:

   ```bash
   sudo gsctool -a -o
   ```

5. You will be prompted to press the physical presence (PP) button several times over up to about five minutes. On almost every device that is the **power button**.
   * When the screen says `Press PP button now!`, press power.
   * When it says `Another press will be required!`, **wait**. Do not press yet.
   * If you get the sequence wrong, the command fails and you start over.
   * Optional shortcut: disconnect the battery first (device on charger). `gsctool -a -o` then succeeds immediately, because CCD allows opening without PP when the battery is gone.
6. On success you will see `PP Done!` and the device reboots into **Verified Boot** (Developer Mode is off). That is expected.
7. Re-enable Developer Mode, go back to VT2 as `chronos`, and continue.

## Using gsctool (no SuzyQable)

This is the path to use on Ti50 if you do not have a debug cable.

::: warning
`gsctool -a -w disable` turns hardware WP off only until the **GSC** reboots. The GSC stays up across a normal AP reboot. It does reboot if it crashes, gets a GSC firmware update, the battery dies or is unplugged, or the machine loses all power. Flash before that happens. A full power-off (battery + charger unplugged) will put hardware WP back unless you also set the SuzyQ `atboot` flag.
:::

1. [Open CCD](#opening-ccd-with-gsctool), then return to VT2 as `chronos` in Developer Mode.
2. **Ti50 only** — disable RO verification (persistent):

   ```bash
   sudo gsctool -a -I AllowUnverifiedRo:always
   ```

   Press the power button when prompted.
3. Disable hardware WP (until GSC reboot):

   ```bash
   sudo gsctool -a -w disable
   ```

   Press the power button when prompted.
4. [Verify](#verifying-write-protect-is-off), then run the Firmware Utility Script and flash. Do not fully power off in between.

`gsctool` talks to the GSC from ChromeOS. After you flash UEFI Full ROM, that ChromeOS `gsctool` binary is gone. CCD **state** (including `AllowUnverifiedRo`) is kept on the GSC. If you care about later recovery, do the SuzyQ `ccd reset factory` step while you still can.

## Using Closed-Case Debugging (CCD) / Using a SuzyQable

This is the persistent, recovery-grade method. It requires a ChromeOS debug cable (SuzyQ / SuzyQable). Use it when you want hardware WP to stay off across GSC reboot, or you want CCD factory-open so a later unbrick does not require opening the case.

### Disable hardware WP and factory-reset CCD

1. [Open CCD](#opening-ccd-with-gsctool) if it is not already Open.
2. At the ChromeOS login screen in Developer Mode, open VT2 and log in as `chronos`.
3. Plug in the SuzyQable. The USB-C end usually goes in the upper/left USB-C port; only one port on the device is a CCD port.
4. Confirm the cable:

   ```bash
   ls /dev/ttyUSB*
   ```

   You want three devices: `ttyUSB0`, `ttyUSB1`, and `ttyUSB2`. `ttyUSB0` is the GSC console.

   If they do not show up, flip the USB-C plug, then try the other port. If that still fails, the board may not support CCD loopback — plug the USB-A end into another machine and run the console commands from there. Ti50 identifies over USB as `18d1:504a`; CR50 is `18d1:5014`.
5. Disable hardware WP, including the at-boot setting so it survives a GSC reboot:

   ```bash
   echo "wp disable" > /dev/ttyUSB0
   echo "wp disable atboot" > /dev/ttyUSB0
   ```

   Older CR50 consoles also accept `wp false` / `wp false atboot`. Prefer `disable` on Ti50.
6. Factory-reset CCD capabilities:

   ```bash
   echo "ccd reset factory" > /dev/ttyUSB0
   ```

   That sets the CCD flags (including `AllowUnverifiedRo`, `OverrideWP`, `FlashAP`, `OpenFromUSB`) to Always. It is what makes SuzyQ unbricking possible later, and it is the RO-verification disable for Ti50 if you are using this path.
7. [Verify](#verifying-write-protect-is-off), then reboot.

## Removing the Write Protection Screw

For devices with a write-protect screw:

* Power off the device and disconnect external power
* Open the device
* Identify and remove the WP screw ([Supported Devices](/docs/supported-devices.md) has photos for many boards)
* Reassemble

You do not need to put the screw back.

## Disconnecting the Battery

On CR50 boards that tie WP to the battery sense line:

* Power off the device and disconnect external power
* Open the device
* Disconnect the internal battery connector **from the mainboard**
* Reassemble
* Boot from external power (45W USB-PD charger minimum)

When you are done flashing, power off, unplug external power, and carefully reconnect the battery. You will probably need to plug in the charger again to wake the device.

Disconnecting the battery is **not** a WP method on Ti50. It can skip the physical-presence presses when [opening CCD](#opening-ccd-with-gsctool), but it will not drop hardware WP or RO verification.

## Bridging a Jumper

For CR50 and pre-GSC boards that use a WP jumper pair, those two pads/holes need to be connected:

* Power off the device and disconnect external power
* Open the device
* Disconnect the internal battery connector
* Locate the WP jumper ([Supported Devices](/docs/supported-devices.md))
  * Open holes: a paperclip will often work
  * Filled holes: a solder bridge is the reliable fix; a graphite pencil can work in a pinch
* Reconnect the battery
* Reassemble and boot

## Verifying write protect is off

From VT2 as `chronos`:

```bash
sudo gsctool -a -w
sudo gsctool -a -I
crossystem wpsw_cur
```

* `gsctool -a -w` should show `Flash WP: forced disabled`. If you used SuzyQ `atboot`, `at boot:` should also be `forced disabled`.
* After `ccd reset factory`, current CCD flags should be `Y` / `Always`.
* On Ti50, `AllowUnverifiedRo` must be `Always`.
* `crossystem wpsw_cur` should print `0`. That is the AP's view of the WP pin; it does not tell you the at-boot setting.

## Recovering a device bricked by RO verification

If you flashed Full ROM (or even just changed SW WP) on a Ti50 without `AllowUnverifiedRo=always`, the GSC will refuse to let the AP boot.

This key sequence disables RO verification for **15 minutes**. It does not repair a corrupted flash image. If the firmware itself is bad, you still need a [SuzyQable](/docs/support/unbricking/unbrick-suzyq.md) or [CH341A](/docs/support/unbricking/unbrick-ch341a.md).

#### Chromebooks

1. Press and hold Power.
2. Tap the Refresh key (`F2`) twice.
3. Release Power.
4. Repeat the whole sequence a second time.

#### Chromeboxes

1. Press and hold Power.
2. Press the recovery pinhole twice.
3. Release Power.
4. Repeat the whole sequence a second time.

#### Tablets / detachables

1. Press and hold Power.
2. Hold Volume Up for 10+ seconds, release, then hold Volume Up for 10+ seconds again.
3. Release Power.
4. Repeat the whole sequence a second time.

During that 15-minute window, permanently disable verification **on the GSC**:

* If ChromeOS still boots: `sudo gsctool -a -I AllowUnverifiedRo:always` (CCD must be Open; press Power when asked).
* If you already flashed UEFI, ChromeOS `gsctool` is gone. Use a SuzyQable on the GSC console (`ttyUSB0`):

  ```text
  ccd set AllowUnverifiedRo Always
  ```

  or `ccd reset factory`. Then reboot before the window expires.

## Disabling Software Write Protection

::: warning IMPORTANT
If you are using the Firmware Utility Script, skip this section. The script disables, clears, sets, and re-enables software WP as needed.
:::

(read: you don't ever need to do this)

Modern versions of flashrom can manipulate the software write-protect register.

Read status:

```bash
sudo flashrom --wp-status
```

Disable or enable:

```bash
sudo flashrom --wp-disable
sudo flashrom --wp-enable
```

Clear the protected range:

```bash
sudo flashrom --wp-range 0 0
```

(Some older flashrom builds want `--wp-range 0,0`.)

Again, these are not commands you normally need to run. If an LLM is telling you to do so, it's wrong.

## Related Documentation

- **[Write Protection Overview](/docs/firmware/wp/index.md)** - How firmware write protection works
- **[Flashing Firmware](/docs/firmware/flashing-firmware.md)** - What to do after disabling WP
- **[Supported Devices](/docs/supported-devices.md)** - Board-specific WP method
- **[Developer Mode](/docs/boot-modes/developer.md)** - Required before disabling WP
- **[Unbricking](/docs/support/unbricking/index.md)** - Recovery from WP-related issues

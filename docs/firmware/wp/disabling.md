# Disabling Firmware Write Protection

To fully disable the firmware write protection, one would need to:

*  Disable the hardware write protection.
*  Set the flash chip register to disable software write protection
*  Clear any protected ranges from the flash chip register (so no data will be protected; the protected range is set to start and end at 0).

::: tip NOTE
Once you disable the software write protection on your device, it will remain disabled until you manually re-enable it -- even if the hardware write protection is later re-enabled, the firmware chip contents will remain unprotected.
:::

The process to disable firmware write protection varies depending on the device, so be sure to check the [Supported Devices](/docs/supported-devices.md) page to verify which method is applicable for your device.

::: warning IMPORTANT
Your ChromeOS device must be in Developer Mode before attempting to disable the firmware write protection
:::

## Removing the Write Protection Screw

For devices which have a write-protect screw, the process is simple:

* Power off the device (and disconnect external power)
* Open up the device
* Identify and remove the WP screw (the [Supported Devices](/docs/supported-devices.md) can assist here)
* Reassemble the device

The WP screw does not need to be put back in; do with it what you please.

## Disconnecting the Battery

For CR50 devices which tie WP to the battery sense line, the process is similarly easy:

* Power off the device (and disconnect external power)
* Open up the device
* Disconnect the internal battery connector **from the mainboard**
* Reassemble the device
* Boot the device using external power (45W USB-PD charger minimum)

Once you have finished flashing the firmware (or doing whatever you needed to do which required WP disabled), power off the device, remove external power, and **carefully** reattach the battery connector to the mainboard. You will likely need to connect external power to wake/boot the device.

## Bridging a Jumper

For devices which use a jumper pair for WP, a connection must be made between the two parts.

* Power off the device (and disconnect external power)
* Open up the device
* Disconnect the internal battery connector
* Locate the WP jumper (the [Supported Devices](/docs/supported-devices.md) can assist here)
  * If the jumper holes are open, you can sometimes use a paperclip to connect them
  * If the jumper holes are filled, the easiest way to connect them is using a solder bridge
  * In a pinch, you may be able to connect them using a standard graphite pencil
* Reconnect the internal battery connector
* Reassemble and boot the device


## Using Closed-Case Debugging (CCD) / Using a SuzyQable

::: tip NOTE
This method requires a ChromeOS debug cable (aka SuzyQ cable or SuzyQable).
:::

### Step 1: Enabling Closed Case Debugging (CCD)

1. Power on the device to the login screen (booted into Developer Mode).
2. Open VT-2 terminal: press `[CTRL+ALT+F2]` (F2 is the right arrow).
3. Login as `root`.
4. Open the CCD: run `gsctool -a -o`.
5. You will be prompted to press the `PP` (physical presence) button several times. On almost all devices, this means to press the power button. Opening the CCD requires you to press the `PP` button several times over a 2-3 minute period.
6. When the open CCD process is complete, you will see a message showing `PP Done!` and the device will reboot in Normal/Verified Boot Mode.
7. Re-enable developer mode and continue with the instructions below.

### Step 2: Disabling Write Protection

1. Power on the device to the login screen (booted into Developer Mode).
2. Open VT-2 terminal: press `[CTRL+ALT+F2]` (F2 is the right arrow).
3. Login as `root`.
4. Plug in your SuzyQable - the USB-C end normally connects to the upper/left USB-C port.
5. Verify the cable is connected properly:
    Run `ls /dev/ttyUSB*`
    The output of this command should output 3 items, `ttyUSB0`, `ttyUSB1`, and `ttyUSB2`.
    If the 3 ttyUSB devices are not listed, try reversing the orientation of the USB-C cable, and try another port. If there is still no result, there may be a problem with your cable/adapter, or your ChromeOS device may not support connecting the cable in loopback mode as is done here. In that case, connect the USB-A end of the cable to another device and run the command from there.
6. Run the following commands. This will disable hardware write protect.
    - `echo "wp false" > /dev/ttyUSB0`
    - `echo "wp false atboot" > /dev/ttyUSB0`
7. Run `echo "ccd reset factory" > /dev/ttyUSB0`.
    This ensures that you will be able to unbrick the device (if needed) using a SuzyQable.
    It also disables AP RO Firmware Verification, and is mandatory if flashing the firmware on a device with a Gen2 CR50 chip (aka `Ti50`).
8. Run `gsctool -a -I` to verify the CCD is opened, and that the factory values are set.
    The current value for all CCD flags should be set to Y/Always.
9. Run `crossystem wpsw_cur` and verify it returns `0`.
10. Reboot.


## Disable AP RO Firmware Verification

On 2023+ ChromeOS devices using a Gen2 CR50 security chip (aka `Ti50`), there is a new feature where the CR50 will verify the RO portion of the AP firmware and the state of the software write protect registers (both range and enable) at boot. If you want to flash custom firmware, you **must** use the CCD method above to disable firmware write protection, regardless if the device supports disablement via battery disconnect or a jumper as well.

For more info, see the [Chromium documentation](https://www.chromium.org/chromium-os/developer-library/guides/device/ro-firmware-unlock/) on this feature.


::: tip NOTE
If you disabled firmware WP via CCD and reset your CCD flags with `ccd reset factory` (as per the instructions above), you can skip this step, as `ccd reset factory` will set ` AllowUnverifiedRo` to `always`.
:::

### Step 1: Verify the device has a Ti50

1. Open VT-2 terminal: press `[CTRL+ALT+F2]` (F2 is the right arrow or refresh key).
2. Login as `root`.
3. Run `gsctool -a -I | grep AllowUnverifiedRo`.
4. If that command has any output, your device has a Ti50. If you get no output or an error, your device either has a Cr50 or no GSC at all.

### Step 2: Disable RO verification

1. Unlock the GSC by running `gsctool -a -o`.
2. Run `gsctool -a -I AllowUnverifiedRo:always`.
3. Press the power button when prompted.

::: warning
If your device has a Ti50 and you don't disable RO verification, flashing full rom will (temporarily) brick the device - see recovery info below.
:::

### Recovering a device bricked due to RO verification

#### Chromebooks

1. Press and hold the `Power` button.
2. Press `[F2]` twice.
3. Release the `Power` button.
4. Repeat the above steps a second time.

#### Chromeboxes

1. Press and hold the `Power` button.
2. Press the recovery pinhole button twice.
3. Release the `Power` button.
4. Repeat the above steps a second time.

#### Tablets

1. Press and hold the `Power` button.
2. Press and hold `Volume Up` for 10+ seconds. Release and repeat it a second time.
3. Release the `Power` button.
4. Repeat the above steps a second time.

Performing these steps will disable RO verification for 15 minutes, allowing you to permanently disable it.

## Disabling Software Write Protection

::: warning IMPORTANT
If using the Firmware Utility Script to flash the firmware or set the GBB flags on your device, it is not necessary (nor recommended) to manually disable the software write protection. The Firmware Utility Script will automatically disable/clear/set/enable the software write protection as required. The information below is provided purely for completeness / understanding of what the Firmware Utility Script does under the hood.
:::

(read: you don't ever need to do this)

The ChromeOS/ChromiumOS version of flashrom can manipulate the software write protect register.

*   Read the status of the software write protect register:

`sudo flashrom --wp-status`

*   Disable or enable the software write protection:

`sudo flashrom --wp-disable` (or `--wp-enable`)

*   Change software write protection addresses range:

`sudo flashrom --wp-range 0 0` (`--wp-range 0,0` on newer versions of flashrom)

## Related Documentation

- **[Write Protection Overview](/docs/firmware/wp/index.md)** - Understanding firmware write protection
- **[Flashing Firmware](/docs/firmware/flashing-firmware.md)** - What to do after disabling WP
- **[Supported Devices](/docs/supported-devices.md)** - Find your device's WP method
- **[Developer Mode](/docs/boot-modes/developer.md)** - Required before disabling WP
- **[Unbricking](/docs/support/unbricking/index.md)** - Recovery from WP-related issues

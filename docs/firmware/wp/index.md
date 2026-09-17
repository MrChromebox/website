# Firmware Write Protection on ChromeOS Devices

The firmware write protect mechanism is one of the most misunderstood aspects of ChromeOS devices; many guides/blogs/how-to's incorrectly tell users to disable it as part of whatever process they are attempting to guide the user through. Hopefully this page can clear some of that up :)

## How Does Firmware Write Protection Work?

On a typical ChromeOS device, the system (or application processor/AP) firmware is stored on a [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface) [flash chip](https://en.wikipedia.org/wiki/Flash_memory#Serial_flash), often in a [SOIC-8](https://en.wikipedia.org/wiki/Small_Outline_Integrated_Circuit) package. As part of the [ChromeOS security model](https://www.chromium.org/chromium-os/chromiumos-design-docs/firmware-boot-and-recovery), certain parts of the device firmware are set to be read-only. The protection of these read-only regions is implemented by a combination of hardware and software measures.

### Software write protection

The software write protection is implemented via special registers on the firmware chip. These registers allow for the software write-protect to be enabled or disabled, as well as one or more ranges of addresses to be protected / marked as read-only. This allows for parts of the chip to be protected (e.g., the RO firmware, or RO_VPD regions) and parts to be system (or user) writable (e.g., the RW_LEGACY region).

### Hardware Write Protection

The hardware write protection is an electrical circuit which prevents writing to the software protection special registers; it's normally enforced by the grounding of the !WP pin on the firmware flash chip. Thus, the hardware write protection not only protects directly these special registers, but indirectly also the data in the firmware chip.

#### HW WP Implementation

On devices without a Google Security Chip (GSC), a jumper, switch, or screw grounds the `!WP` pin. On CR50 and Ti50, the GSC drives it.

*   **No GSC (2012–2016):** everything through Skylake/Braswell. The 2013 Chromebook Pixel was the first WP screw; Haswell, Broadwell, Baytrail, Skylake, and Braswell followed.
*   **CR50 (2017 through most 2022 devices):** Kabylake, Apollolake, and later up through Alder Lake-P. On most early CR50 boards, WP follows the battery sense line, so disconnecting the battery cable **from the mainboard** disables hardware WP. Some later CR50 boards use an unpopulated jumper or a screw instead. You can also change WP from the GSC console with a SuzyQable.
*   **Ti50 (most 2023+ families):** Nissa, Skyrim, Brox, Rex, and similar. The GSC still drives `!WP`, but there is no battery or jumper WP method. Disable hardware WP with `gsctool` from ChromeOS, or with a SuzyQable. Ti50 also verifies AP firmware at boot; see [Ti50 considerations](#ti50-considerations).

`gsctool` talks to the GSC from ChromeOS (no cable). That is how you disable WP on Ti50. On CR50 it is used to **open** CCD before a SuzyQable can change WP from the GSC console. A [SuzyQable](/docs/firmware/wp/disabling.md#using-closed-case-debugging-ccd-using-a-suzyqable) is also the way to keep WP off across a GSC reboot, or to factory-open CCD for later unbricking.

Check the [Supported Devices](/docs/supported-devices.md) WP Method column for your board, then follow [Disabling Firmware Write Protection](/docs/firmware/wp/disabling.md).

## Ti50 considerations

Ti50 is a different chip from CR50, not a second-generation CR50. Besides driving `!WP`, it checks two things every boot:

1. The read-only (RO) portion of the AP firmware
2. The software write-protect registers (enable bit **and** range)

If either check fails, the AP is held in reset — no boot, no Recovery Mode. Disconnecting the battery does not turn this off.

Before flashing Full ROM (or otherwise changing SW WP) you must set `AllowUnverifiedRo` to `always`, then disable hardware WP. Both are done with `gsctool` from ChromeOS, or from the GSC console on a SuzyQable. Step-by-step is on [Disabling Firmware Write Protection](/docs/firmware/wp/disabling.md#ti50-considerations).

Google's writeup is [Read-only firmware unlock on 2023+ devices](https://www.chromium.org/chromium-os/developer-library/guides/device/ro-firmware-unlock/).

## Why Disable Firmware Write Protection?

There are only two real reasons to disable the firmware write protect on your ChromeOS device:

*   To change the Google Binary Block (GBB) flags
*   To flash custom firmware which modifies or overwrites the RO portions of the stock firmware

Flashing firmware which only modifies an RW portion of the firmware (like RW_LEGACY, for Legacy Boot Mode) does not require the firmware write protect to be disabled.

### GBB Flags

The GBB Flags are used to modify the boot behavior of a ChromeOS device in Developer Mode. There is a wide range of functions offered by these flags, but they are most commonly used to:

*   Shorten the Developer Mode boot screen timeout (from 30s to 1s, and remove the beep)
*   Prevent accidental disablement of Developer Mode (via spacebar)
*   Force enablement of Legacy Boot Mode (regardless of crossystem flag value)
*   Set Legacy Boot Mode as the default boot path (negates the need to use CTRL+L)

For most users, there's no need to set these flags manually, as the [Firmware Utility Script](/docs/fwscript.md) provides the functionality to set the desired timeout and default boot option, while setting the other flags to sane defaults. See the [Set Boot Options (GBB Flags) section](/docs/fwscript.md#set-boot-options-gbb-flags-stock-firmware) for detailed documentation of all available options.

::: tip NOTE
The GBB flags are a construct of the stock ChromeOS device firmware. They do not exist / cannot be set when running custom firmware which replaces the stock firmware (e.g., MrChromebox's UEFI Firmware).
:::

### Custom Firmware

Flashing custom firmware which completely replaces the stock firmware requires disabling the firmware write protect, since all RO and RW portions of the chip are overwritten.

See [Disabling Firmware Write Protection](/docs/firmware/wp/disabling.md) for the actual procedures.

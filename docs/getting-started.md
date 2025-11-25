# Getting Started

::: danger
You are about to make **unsupported** changes to your device that will in many cases **void your warranty**. MrChromebox firmware and utilities are provided **as-is, without any guarantee**.
Any and all changes are made **at your own risk**!
:::

::: warning IMPORTANT
If your device is currently managed/enrolled by an organization (such as a school or employer), then you do not own the device, and you should not be modifying it in any way without direct, express, written permission.
:::

## Prerequisites

* An x86_64 (Intel/AMD) architecture device — ARM-based devices are not supported
* The device's Hardware ID (HWID) / ChromeOS board name
    * The device's HWID can be found at the bottom of the Recovery Mode and Developer Mode screens, as well as by going to `chrome://system` in the browser and searching for `HWID`
* To actually own the Chromebook — devices managed by a school or company generally are locked down and cannot be switched to Developer Mode
* A basic understanding of how the firmware and boot process on ChromeOS devices differs from standard PCs, so that you understand the changes being made
* Familiarity with command line input / how to use a terminal/command prompt
* A few USB flash drives which you can format/overwrite as needed
* Another (non-mobile) device in case things go sideways and you need to recover

::: warning
It cannot be stressed enough: **This is NOT a one-click procedure**. Modifying your device's firmware is serious business.
Following a YouTube video or blog post with "simplified" instructions will only end in tears.
:::

## What's the TL;DR?

### Dual Booting via RW_LEGACY firmware

If you want to dual boot ChromeOS and Linux on your device:

* Verify your device has [RW_LEGACY support](/docs/supported-devices.md)
* Put your device in [Developer Mode](/docs/boot-modes/developer.md)
* Open a terminal/shell:
    * **ChromeOS (R117+):** Press `[CTRL+ALT+F2]` at login screen, login as `chronos`
    * **ChromeOS (older):** Press `[CTRL+ALT+T]`, type `shell` and press Enter
    * **Linux:** Open your distribution's terminal application
* Run the [Firmware Utility Script](fwscript.md):
    ```
    cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh
    ```
* Select option 1: "Install/Update RW_LEGACY Firmware" from the script menu
* Follow the prompts and choose your preferred boot options
* Reboot when complete
* Press `[CTRL+L]` on the Developer Mode boot screen to boot in Legacy Boot Mode
* Boot your Linux USB/SD and install your new OS

::: tip NOTE
Installing Linux on the internal storage along with ChromeOS requires repartitioning the device using tools which can handle ChromeOS partition types; see the [Chrultrabook docs](https://docs.chrultrabook.com) for more info.
:::

::: note
This method does NOT require disabling firmware write-protect. Do not open your device or remove screws unless instructed to do so.
:::

### Replacing ChromeOS via Full ROM firmware

If you want to wipe ChromeOS from your device and replace it with Linux or Windows:

* Verify your device has [UEFI Full ROM support](/docs/supported-devices.md)
* Put your device in [Developer Mode](/docs/boot-modes/developer.md)
* Disable the device's **hardware** [firmware write protection](firmware/wp/index.md)
    * Check the [Supported Devices page](/docs/supported-devices.md) for your device's WP method
    * Methods include: WP screw removal, battery disconnect, jumper bridging, or CCD/SuzyQable
* Open a terminal/shell:
    * **ChromeOS:** Press `[CTRL+ALT+F2]` at login screen, login as `chronos`
    * **Linux:** Open your distribution's terminal application
* Run the [Firmware Utility Script](fwscript.md):
    ```
    cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh
    ```
* Select option 2: "Install/Update UEFI (Full ROM) Firmware" from the script menu
* **IMPORTANT:** When prompted, create a backup of your stock firmware
    * Save this backup to a safe location (Google Drive, another PC, USB drive)
    * You will need this backup if you ever want to restore ChromeOS
* Follow the prompts to complete the firmware flash
* Power off the device using the script menu option (do not reboot immediately)
* If you disconnected the battery, reconnect it now
* Power on and boot your Linux/Windows installation media
* Install your new OS

::: warning
Again, I cannot stress it enough: flashing your device's firmware and changing the OS is not a simple or minor procedure. If you don't fully read and understand the process and what the tools you're using are doing, it's going to be very hard to troubleshoot if something goes wrong. The documentation here is dense for a reason.
:::

## Asking for help properly

If you are facing an issue, please read the [FAQ](faq.md) first.


**Do not use the manufacturer's model name when asking for help** (e.g. HP Chromebook 14a), as it doesn't help with identifying the machine. Provide the HWID/boardname (e.g. CAREENA), otherwise your support request will be ignored.

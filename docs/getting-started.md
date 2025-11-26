# Getting Started

::: danger
You are about to make **unsupported** changes to your device that will in many cases **void your warranty**. MrChromebox firmware and utilities are provided **as-is, without any guarantee**.
Any and all changes are made **at your own risk**!
:::

::: warning IMPORTANT
If your device is currently managed/enrolled by an organization (such as a school or employer), then you do not own the device, and you should not be modifying it in any way without direct, express, written permission.
:::

## Quick Start Checklist

Before you begin, ensure you have:

- ☐ Read and understood the warnings above
- ☐ Verified your device is x86_64 (Intel/AMD) - check [Supported Devices](/docs/supported-devices.md)
- ☐ Found your device's board name (HWID)
- ☐ **Backed up all important data** - switching to Developer Mode **wipes everything**
- ☐ Chromebook battery charged (>50%) and power adapter connected
- ☐ USB drive(s) for backups and OS installation (8GB+ recommended)
- ☐ Another device available for troubleshooting/research
- ☐ Set aside 1-3 hours for the complete process
- ☐ Read the [FAQ](/docs/faq.md) to understand common issues

::: tip TIME EXPECTATIONS
- **RW_LEGACY (Dual Boot)**: 30-60 minutes total
- **UEFI Full ROM (Replace ChromeOS)**: 1-3 hours total (including OS installation)

First-time users should budget extra time for reading documentation and troubleshooting.
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

## Decision Guide: Which Firmware Should I Use?

Use this decision tree to determine the right path for your needs:

```
                ┌──────────────────────────────────────┐
                │       What do you want to do?        │
                └──────────────────┬───────────────────┘
                                   │
                ┌──────────────────┴───────────────────┐
                │                                      │
         Keep ChromeOS?                        Replace ChromeOS?
                │                                      │
                ▼                                      ▼
    ┌───────────────────────┐              ┌──────────────────────┐
    │   RW_LEGACY Firmware  │              │  UEFI Full ROM       │
    │   (Dual Boot)         │              │  (Complete Replace)  │
    ├───────────────────────┤              ├──────────────────────┤
    │ ✓ Keep ChromeOS       │              │ ✓ Full OS control    │
    │ ✓ Boot Linux via      │              │ ✓ Best hardware      │
    │   CTRL+L              │              │   support            │
    │ ✓ No hardware         │              │ ✓ NVRAM/boot order   │
    │   modification needed │              │ ✓ Windows support    │
    │ ✗ Limited boot options│              │ ✗ Removes ChromeOS   │
    │ ✗ No NVRAM            │              │ ✗ Requires HW WP     │
    │                       │              │   disable            │
    └───────────┬───────────┘              └───────────┬──────────┘
                │                                      │
                ▼                                      ▼
    See "Dual Booting" below          See "Replacing ChromeOS" below


    Special Cases:
    ┌────────────────────────────────────────────────────────────┐
    │ • EOL Device? → UEFI Full ROM only (RW_LEGACY blocked)     │
    │ • Ti50 Device (2022+)? → Extra caution reverting to stock  │
    │ • Need Windows? → Must use UEFI Full ROM                   │
    │ • Just testing Linux? → RW_LEGACY is simpler, reversible   │
    └────────────────────────────────────────────────────────────┘
```

::: tip NOT SURE?
If you're uncertain, start with **RW_LEGACY** - it's easier, reversible, and lets you test without committing. You can always upgrade to UEFI Full ROM later if needed.
:::

 ## What's the TL;DR?

### Dual Booting via RW_LEGACY firmware

If you want to dual boot ChromeOS and Linux on your device:

* **BACKUP YOUR DATA** - Enabling Developer Mode wipes all user data
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

* **BACKUP YOUR DATA** - You will lose access to all ChromeOS data after flashing
* Verify your device has [UEFI Full ROM support](/docs/supported-devices.md)
* Put your device in [Developer Mode](/docs/boot-modes/developer.md)
* Disable the device's **hardware** [firmware write protection](/docs/firmware/wp/index.md)
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

## If You Run Into Issues

Common first-time problems and where to find solutions:

- **Can't enter Developer/Recovery Mode** → See [Known Issues: Boot Mode Issues](/docs/known-issues.md#cant-enter-developer-mode--recovery-mode)
- **Script won't run (R117+)** → See [FAQ: VT2 Terminal Requirement](/docs/faq.md#why-cant-i-run-sudo-commands-in-crosh-anymore)
- **Device won't boot after flash** → See [Known Issues: Device Won't Boot](/docs/known-issues.md#device-wont-boot-after-firmware-flash)
- **Write protection issues** → See [Write Protection Guide](/docs/firmware/wp/index.md)
- **Lost firmware backup** → See [Reverting to Stock](/docs/reverting/index.md)
- **Other issues** → Check [FAQ](/docs/faq.md) and [Known Issues](/docs/known-issues.md)

## Asking for Help Properly

Before asking for help, please:

1. **Read the [FAQ](/docs/faq.md)** - many common questions are answered there
2. **Check [Known Issues](/docs/known-issues.md)** - your problem may be documented with solutions
3. **Search existing issues** on [GitHub](https://github.com/MrChromebox/firmware/issues)

### Where to Get Help

- **Firmware issues**: [MrChromebox Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)
- **Script issues**: [MrChromebox Scripts Issue Tracker](https://github.com/MrChromebox/scripts/issues/)
- **OS installation/drivers**: [Chrultrabook Forums](https://forum.chrultrabook.com/)
- **General help**: [Chrultrabook Forums](https://forum.chrultrabook.com/)

### What Information to Provide

When asking for help, always include:

- **Board name (HWID)** - e.g., "EVE", "BANSHEE", "BLUEBIRD" (NOT "HP Chromebook 14a")
- **Firmware version** - found in firmware menu or boot screen
- **What you were trying to do** - step-by-step description
- **What happened instead** - error messages, unexpected behavior -- screenshots/pics are helpful
- **What you've already tried** - troubleshooting steps taken

::: danger CRITICAL
**Do not use the manufacturer's model name** (e.g., "HP Chromebook 14a", "Acer Chromebook 314") when asking for help. These names don't uniquely identify devices. Always provide the **board name/HWID** (e.g., "CAREENA", "SHUBOZ"). It's not possible to support requests without board names.
:::

## Related Documentation

### Essential Reading
- **[FAQ](/docs/faq.md)** - Frequently asked questions and answers
- **[Known Issues](/docs/known-issues.md)** - Common problems and solutions
- **[Supported Devices](/docs/supported-devices.md)** - Check what firmware your device supports

### Firmware Documentation
- **[Firmware Overview](/docs/firmware/index.md)** - Understanding ChromeOS firmware architecture
- **[Firmware Types](/docs/firmware/types.md)** - RW_LEGACY vs UEFI Full ROM detailed comparison
- **[Firmware Utility Script](/docs/fwscript.md)** - Complete script feature documentation
- **[Write Protection](/docs/firmware/wp/index.md)** - How to disable hardware write protection

### Boot Modes
- **[Boot Modes Overview](/docs/boot-modes/index.md)** - Understanding ChromeOS boot modes
- **[Developer Mode](/docs/boot-modes/developer.md)** - How to enable and use Developer Mode
- **[Legacy Boot Mode](/docs/boot-modes/legacy.md)** - Using CTRL+L to boot alternate OSes

### Reverting & Recovery
- **[Reverting to Stock](/docs/reverting/index.md)** - How to restore ChromeOS
- **[Unbricking Guide](/docs/support/unbricking/index.md)** - Recovery from failed firmware flash

### OS Installation (External)
- **[Chrultrabook Documentation](https://docs.chrultrabook.com/)** - Comprehensive OS installation guides and device compatibility information

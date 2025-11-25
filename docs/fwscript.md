# Firmware Utility Script

## Overview

The ChromeOS Firmware Utility Script simplifies the most common functions most users need when interacting with the firmware on their ChromeOS device.

It can be run from ChromeOS, or any Linux distribution which has a full shell. It cannot be run via WSL or a virtualized environment (i.e., a ChromeOS penguin shell).

Currently, it allows the user to:

*   Install/Update the RW_LEGACY firmware (allows dual booting of ChromeOS + Linux)
*   Install/Update coreboot/UEFI Full ROM firmware (for running Linux/Windows without ChromeOS)
*   Backup Current Firmware (to local filesystem or USB device)
*   Flash Custom Firmware (from local filesystem or USB device)
*   Set the Boot Options (GBB Flags) (only for stock ChromeOS firmware)
*   Set the device's Hardware ID (for both stock and UEFI firmware)
*   Restore the Stock Firmware (only for devices which have not reached EOL)
*   Clear UEFI NVRAM (only for UEFI Full ROM firmware)

At startup, the Firmware Utility Script will automatically detect the device, OS, and current firmware details, and show a customized menu options based on this information. Some options may be greyed-out/disabled for some devices. Because most of these operations are being done to normally read-only parts of the firmware, the firmware write protect will need to be removed for most of the script's functions. This is documented for each function below, and the script will likewise check and display the write-protect state for each function that requires it to be disabled.

::: warning IMPORTANT
This script must be run **as a normal/non-root user**. Running it as root will break things. DO NOT RUN 'SUDO SU' BEFORE RUNNING THE SCRIPT CMD BELOW.
:::

And do note that in the script command below, it's `-LOf` **(L capital O f), not L zero f.**

To download and run this script under ChromeOS or Linux, from a terminal/shell type:
`cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh`
and press `[ENTER]`.

If you encounter certificate related errors when downloading the script from ChromeOS, then add `-k` to the curl command to bypass SSL certificate checking as so:
`cd; curl -LOfk https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh`
and press `[ENTER]`.

::: warning NOTE
Starting with ChromeOS R117, this script must be run from a VT2 terminal (from login screen: `[CTRL+ALT+F2]`, login `chronos`); it cannot be run from a crosh shell (`[CTRL+ALT+T]` when logged in) due to the removal of sudo, or from a crostini (penguin) terminal; crostini is a virtualized container and lacks the necessary access to read or modify the firmware.
:::

![fwscript WP ON](/images/fwutil_cros_wp-on.png)
Firmware Utility Script, on device with stock firmware and WP enabled

![fwscript WP OFF](/images/fwutil_cros_wp-off.png)
Firmware Utility Script, on device with stock firmware and WP disabled

![fwscript UEFI menu](/images/fwutil_uefi_menu.png)
Firmware Utility Script, on device with Full ROM firmware and WP disabled

In the screenshots above, only the script functions available for the device and current firmware are enabled (cyan text); unavailable functions are in grey. Features which require the firmware WP to be disabled are clearly labeled as such, along with the ability of that function to be used based on the current WP state.



### Script Functions Explained

*   **Install/Update the RW_LEGACY Firmware**

    This option performs two simple tasks: it sets the crossystem boot flag necessary to enable Legacy Boot mode, and it installs an RW_LEGACY firmware update appropriate for the device. Users will have the option to set the default boot device (internal storage \[default\] or USB/SD); Haswell/Broadwell Chromebox users will also have the option to enable "headless" (no display attached) booting, which is really only useful if you're going to run the box without a display and connect remotely (e.g., via ssh). Changing either of these options requires re-running this script function.

    After updating the RW_LEGACY firmware, Legacy Boot Mode can be accessed via `[CTRL+L]` on the Developer Mode boot screen. It can also be set as the default by changing the GBB Flags via 'Set Boot Options' feature below.

    **Requires firmware write-protect disabled:** `NO`


*   **Install/Update UEFI (Full ROM) Firmware**

    As this is a full replacement firmware, the script will offer users the option to back up their stock firmware to USB (required if the script is not capable of providing a stock firmware image).

    As Chromeboxes store their Ethernet MAC address in the RO_VPD (read-only vital product data) region of the stock firmware, the script will extract that region from the stock firmware and inject it into the new firmware ensuring the unique MAC address isn't lost. It will also persist the VPD region across firmware updates, so this is all transparent to the user.

    After installing the UEFI (Full ROM) Firmware, your device will boot directly in UEFI Mode; ChromeOS will not be able to boot. Your ChromeOS device is now a "regular PC," and you can install the OS of your choice without any special instructions.

    **Requires firmware write-protect disabled:** `YES`


*   **Set Boot Options (GBB Flags)**

    This script function allows one to change the timeout for the Developer Mode boot screen (2s or 30s) and the default boot target (ChromeOS or Legacy Boot Mode). Setting the boot target to Legacy Boot removes the requirement of pressing `[CTRL+L]` at boot; instead, you must press `[CTRL+D]` to boot ChromeOS. This function is just a wrapper around the `gbb_utility` application built into ChromeOS that will read the GBB region from the stock firmware, set the GBB flags based on user input, and write it back to flash. For all options except 'Factory Default,' the GBB flags will also be set to force-enable legacy booting (GBB_FLAG_FORCE_DEV_BOOT_LEGACY), which overrides the crosssytem `dev_boot_legacy` flag, and to force-enable Developer Mode (GBB_FLAG_FORCE_DEV_SWITCH_ON), which prevents exiting Developer Mode via the spacebar (either accidentally or intentionally).

    Regardless of which default boot mode is selected, one can always override the default via keystroke: `[CTRL+D]` for ChromeOS Developer Mode, or `[CTRL+L]` for Legacy Boot Mode.

    **Note:** Whenever the GBB Flags are set to anything besides the Factory Default, their current value will be displayed in a small black box in the upper-left corner of the Developer Mode boot screen, along with other some other firmware/OS-related info. This is normal and no cause for alarm, though you'll need to re-run the script and reset them to the Factory Default before exiting Developer Mode (should you want to do so).

    After setting the Boot Options / GBB flags, the boot timeout and default OS will be whatever you selected, and can be changed at any time by re-running this script function.

    **Supported Devices:** `All ChromeOS devices running stock (or stock + RW_LEGACY) firmware`

    **Requires firmware write-protect disabled:** `YES`


*   **Set Hardware ID (HWID) - Stock Firmware**

    This script function is a wrapper around the `gbb_utility` application built into ChromeOS. It will read the GBB region from the stock firmware, set the HWID based on user input, and write it back to flash. The only time this function is needed is if one flashed a generic recovery image firmware (aka a shellball ROM) instead of restoring a backup of their own device firmware. Shellball ROMs extracted from a recovery image have a generic HWID embedded which ChromeOS does not recognize as valid for purposes of OS and firmware updates (among other things), so it's necessary to set a valid one. HWIDs aren't unique, so any valid one for a given device with the same board name will work.

    **Note:** If you restored your stock firmware using the option from this script, it is not necessary to (nor should you) set the HWID afterward.

    After setting a valid HWID, simply reboot and ChromeOS updates should work normally.

    **Supported Devices:** `All ChromeOS devices running stock (or stock + RW_LEGACY) firmware`

    **Requires firmware write-protect disabled:** `YES`


*   **Set Hardware ID (HWID) - UEFI Firmware**

    For devices running UEFI Full ROM firmware, the HWID is stored differently than on stock firmware - it's stored in the CBFS (coreboot File System) rather than the GBB region. This function uses `cbfstool` to modify the HWID.

    ::: warning IMPORTANT
    Changing the HWID on UEFI firmware is rarely needed and can be dangerous. An incorrect HWID could result in the wrong firmware being flashed during an update, which could brick your device. Only change the HWID if you fully understand the implications.
    :::

    The script will:
    1. Display your current HWID (if present)
    2. Ask for confirmation multiple times (this is serious!)
    3. Read the current firmware from the flash chip
    4. Remove the old HWID entry (if present)
    5. Add the new HWID to the firmware
    6. Disable software write-protect
    7. Write the modified firmware back to the flash chip

    **When would you need this?**
    
    * If you flashed a generic/wrong firmware build for your device
    * If your HWID was lost or corrupted during a custom firmware flash
    * If you're building custom firmware and need to set a proper HWID

    **Note:** The script automatically preserves the HWID when flashing official MrChromebox firmware or using the custom firmware flash function, so manually setting it should rarely be necessary.

    After setting the HWID, reboot for the change to take effect. You can verify the HWID was set correctly by re-running the script and checking the value displayed.

    **Supported Devices:** `All ChromeOS devices running UEFI Full ROM firmware`

    **Requires firmware write-protect disabled:** `YES`


*   **Backup Current Firmware**

    This function allows you to create a backup of the current firmware before making any changes. This is highly recommended before flashing Full ROM firmware or making other significant changes.

    The script offers two backup destinations:
    
    1. **Backup to local filesystem:** Save the firmware backup to a directory on the system (you can specify a custom path or use the current directory). The backup will be named `BACKUP-[boardname]-[version]-[date].rom`
    
    2. **Backup to USB device:** Save the firmware backup directly to a USB drive or SD card. The script will list available USB devices and you can select which one to use.

    After creating a backup, store it in a safe place (Google Drive, another PC, etc) as you may need it to recover from a bad flash or to restore your device later.

    **Supported Devices:** `All ChromeOS devices`

    **Requires firmware write-protect disabled:** `NO`


*   **Flash Custom Firmware**

    This is an advanced function that allows you to flash a custom firmware image from a file. This is useful for testing custom builds, flashing firmware from other sources, or restoring from a non-standard backup.

    ::: danger ADVANCED USERS ONLY
    This function is for advanced users who understand firmware internals. Flashing incompatible or corrupted firmware will brick your device. Only use this if you know what you're doing and have the ability to recover from a bad flash.
    :::

    The script offers two source options:
    
    1. **Flash from local filesystem:** Provide the full path to a firmware file (.rom or .bin) stored on the system
    
    2. **Flash from USB device:** Select a firmware file from a USB drive or SD card. The script will list available firmware files (.rom, .ROM, .bin, .BIN) and you can choose which one to flash.

    **Automatic Data Preservation:**
    
    When flashing custom firmware, the script will automatically attempt to extract and preserve device-specific data from your current firmware:
    
    * Serial number (if present)
    * Hardware ID (HWID)
    * Vital Product Data (VPD) - includes MAC address and other device info
    * RW_MRC_CACHE - memory training data for faster boot times
    * SMMSTORE - UEFI NVRAM variables

    This data will be injected into the custom firmware before flashing, ensuring your device retains its unique identifiers and settings.

    **Important Notes:**
    
    * Always create a backup of your current firmware before flashing custom firmware
    * Ensure the custom firmware is compatible with your specific device
    * The firmware write-protect must be disabled before using this function
    * If the flash fails, **DO NOT REBOOT** - use the restore option to flash your backup

    **Supported Devices:** `All ChromeOS devices running UEFI Full ROM firmware`

    **Requires firmware write-protect disabled:** `YES`


*   **Restore Stock Firmware**

    This script function will restore the stock firmware, preferably from a backed-up copy on USB. For most devices, if a user-provided backup is not available, the script will download the firmware from a recovery image (a shellball ROM). For Chromeboxes, if the current fimware contains an embedded VPD region, it will be extracted and merged before flashing. These (device-specific) shellball ROMs have been modified to include a valid hardware ID (HWID), so ChromeOS updates will work normally. Support for flashing shellball ROMs for additional devices is planned for the near future.

    After restoring the stock firmware, you will need to reboot and reinstall ChromeOS from the recovery media. After booting ChromeOS, you will need to re-run this script and reset the Boot Flags/GBB Flags in order to exit Developer Mode and fully return to stock.

    **Supported Devices:** `All non-EOL ChromeOS devices running non-stock firmware`

    **Requires firmware write-protect disabled:** `YES`


### Device-Specific Functions

*   **Downgrade Touchpad Firmware (Pixelbook/EVE only)**

    This function is specific to the Google Pixelbook (device codename: EVE) and downgrades the touchpad firmware to an older version that is compatible with Windows.

    ::: warning IMPORTANT
    If you plan to run Windows on your Pixelbook, you **must** downgrade the touchpad firmware, otherwise the touchpad will not work under Windows. The stock touchpad firmware only works with ChromeOS/Linux.
    :::

    **When to use this:**
    
    * After flashing UEFI Full ROM firmware on a Pixelbook
    * Before installing Windows on a Pixelbook
    * Ideally performed before the first reboot after flashing UEFI firmware

    The script will download the downgrade firmware file, verify its checksum, and flash it to the touchpad's EC (Embedded Controller). Do not touch the touchpad during the flashing process.

    **Note:** This function may not work reliably under all Linux distributions. If it fails under Linux, try running it from ChromeOS (before flashing UEFI firmware) or from the ChromiumOS environment.

    **Supported Devices:** `Google Pixelbook (EVE) only`

    **Requires firmware write-protect disabled:** `YES`


*   **Upgrade Touchpad Firmware (Pixelbook/EVE only)**

    This function is specific to the Google Pixelbook (device codename: EVE) and upgrades the touchpad firmware back to the stock version that is compatible with ChromeOS.

    ::: warning IMPORTANT
    If you plan to restore ChromeOS on your Pixelbook, you **must** upgrade the touchpad firmware back to stock, otherwise the touchpad will not work under ChromeOS.
    :::

    **When to use this:**
    
    * After restoring stock firmware on a Pixelbook
    * Before reinstalling ChromeOS on a Pixelbook
    * After you previously downgraded the touchpad firmware for Windows
    * Ideally performed before rebooting after restoring stock firmware

    The script will download the stock touchpad firmware file, verify its checksum, and flash it to the touchpad's EC (Embedded Controller). Do not touch the touchpad during the flashing process.

    **Note:** This function may not work reliably under all Linux distributions. If it fails under Linux, try running it from ChromeOS after restoring stock firmware.

    **Supported Devices:** `Google Pixelbook (EVE) only`

    **Requires firmware write-protect disabled:** `YES`


The Reboot and Power Off options are (hopefully) sufficiently self-explanatory :).

If running UEFI Full ROM firmware, there will be an additional option to clear the NVRAM. This will delete all bootorder entries stored in NVRAM, and they will be created again on the next boot (or next time grub is updated).



The source for the Firmware Utility Script (as well as all helper/accessory scripts) can be found [on my 'scripts' GitHub repository](https://github.com/MrChromebox/scripts). Any issues, feature requests, and/or improvements can be reported via the issue tracker or a pull request.

# Frequently Asked Questions

::: tip PRO TIP
Read this page in its entirety (and search) before asking for help. If the answer to your email/forum post/etc. is found here, expect a snippy reply if you get one at all.
:::

## About the Project

### What is MrChromebox firmware?

* MrChromebox firmware is custom coreboot-based firmware for ChromeOS devices. It provides two main options: RW_LEGACY firmware (for dual-booting ChromeOS + Linux) and UEFI Full ROM firmware (for replacing ChromeOS with Linux/Windows). The project focuses solely on the firmware layer, not operating system support.

### How are the MrChromebox and chrultrabook projects related?

* The two projects are complementary: MrChromebox focuses solely on the device firmware, whereas the [chrultrabook project](https://chrultrabook.com) focuses mainly on OS support for ChromeOS devices running MrChromebox firmware. There is a fair amount of overlap though, and many developers contribute to both projects.

### What is coreboot, and how does it relate to ChromeOS device firmware?

* [coreboot](https://coreboot.org) is an open-source firmware project that is the basis for the system firmware used on all ChromeOS devices from 2013 to the present. coreboot is just one part of the system firmware however — it initializes all of the hardware needed to boot the device (CPU, RAM, peripherals, etc.), then hands things off to another firmware component (called the payload) to boot the operating system.

Google uses their own downstream fork of coreboot, coupled with a custom payload ([depthcharge](https://chromium.googlesource.com/chromiumos/platform/depthcharge/)) to boot ChromeOS.

MrChromebox firmware uses upstream coreboot (with modifications), coupled with the open-source [edk2](https://github.com/tianocore/edk2) payload to provide a UEFI-compatible solution.

When people say they are "flashing coreboot" on a ChromeOS device, what they really mean is they are flashing a non-Google, upstream-based coreboot firmware image (such as the ones provided by MrChromebox).

### How does the MrChromebox fork of edk2 differ from upstream?

MrChromebox's edk2 fork adds many fixes and new features on top of edk2:

* **TPM Support**: Complete TPM 1.2 and TPM 2.0 support added to UefiPayloadPkg, including TPM detection, Physical Presence Interface (PPI) integration with coreboot handoff buffer parsing, and TCG Configuration menu in BIOS setup.

* **Secure Boot**: Full Secure Boot implementation with default key enrollment (DB, DBX), Microsoft UEFI certificate enrollment, DBX update support, enhanced error messages with verbose logging, and improved Secure Boot configuration UI with state display indicators.

* **Network Infrastructure**: Full network stack implementation with UEFI PXE boot support and iPXE network boot option integration, enabling modern network boot capabilities with network boot enumeration and Shell network command support (TFTP, etc.).

* **Universal Flash Storage (UFS)**: Major performance enhancement with source-based UFS platform driver. Achieves 12x boot performance improvement. Supports Intel Alderlake and Meteor Lake platforms with UFS device enumeration and boot options.

* **Storage Controller Drivers**: New SdMmcPciGli driver for GLI SD/MMC controllers (GL9750/GL9755) with ASPM re-enable support, PLL/SSC configuration improvements, and MISC register handling fixes. Added AmdPcoSdhciDxe driver for AMD Picasso eMMC support.

* **Boot Manager**: Complete redesign and renaming with improved boot menu, better device descriptions and naming, UFS LUN enumeration improvements, boot progress messages, and option to prioritize internal devices.

* **Frontpage Enhancements**: Battery status display, SMBIOS device name lookup, reworked layout with SMBIOS data display, memory type fallback handling (Type 17 as fallback to Type 19), banner positioning fixes, and increased row count.

* **Configuration Options**: New Time/Date Settings formset DXE driver, Device Manager renamed to "System Configuration" with improved organization, battery status display with new BatteryStatus protocol and EcAcpiBatteryStatusDxe driver.

* **coreboot Form Representation (CFR)**: Implementation of CFR support for initial bootloader records with version number tracking, min/max/step values, and hex flag options.

* **SMM Store**: Enhanced SMM store capabilities with 64-bit MMIO store support, sticky-write flash support, erase-before-write fixes, and store region capabilities configuration.

* **System Configuration**: New filesystem drivers, increased firmware device (FD) size, forced 4k alignment for all component types, PlatformGopPolicy implementation, enhanced ACPI table checking and validation, coreboot SDK compatibility fixes, and memory attribute mask corrections.

* **Hardware Drivers**: Improved USB error handling for faulting devices, keyboard driver cleanup, Graphics Output Protocol (GOP) improvements with framebuffer offset support, serial port initialization fixes, and fault tolerant write alignment improvements.


### What is ChromeOS automatic update expiration (AUE)?

* When Google first ships a ChromeOS device based on a given hardware platform, they guarantee the device will get OS, browser, and security updates for a specific amount of time. Historically, this was around 6.5 years, though newer devices now are guaranteed [10 years of updates](https://support.google.com/chromebook/answer/9367166?hl=en).

For devices which no longer receive updates / have reached their end-of-life (EOL) from Google's perspective, flashing MrChromebox firmware provides the opportunity to continue using the device with another OS, saving millions of ChromeOS devices from becoming e-waste.

## Before You Start

### Will my device run Linux or Windows?

* Maybe. The MrChromebox project only provides system firmware for Intel/AMD x86_64 devices; it does not support ARM-based devices at all. It also does not provide or track OS support.

How well a given device is able to run Linux/Windows depends largely on its platform architecture, and how well that's supported by the OS. Windows support for Chromebooks depends largely on custom drivers for touchpad/touchscreen/audio written by [coolstar](https://coolstar.org/chromebook/windows-install.html). The Chrultrabook project maintains a [Supported Device list](https://docs.chrultrabook.com/docs/devices.html) which gives Linux/Windows OS support status.

### I want to buy a Chromebook to run Windows or Linux — which should I buy?

* Buying any Chromebook with the intention of running Windows or Linux is not a great idea. Many can't boot anything other than ChromeOS. Those that can boot Linux (or Windows) often have functional deficiencies — DO NOT EXPECT EVERYTHING TO WORK OUT OF THE BOX. Older models fare better compatibility-wise, but there are still lots of caveats, and it's generally not recommended to buy a Chromebook as a cheap Linux device.

That said, the Chrultrabook compatibility list linked above is your best, most up-to-date reference for OS support/compatibility.

### What are the risks of flashing custom firmware?

* **RW_LEGACY firmware:** Zero risk of bricking. It only modifies a writable firmware region and leaves ChromeOS fully functional. You can always revert by running ChromeOS recovery.

* **UEFI Full ROM firmware:** Small risk of bricking your device if something goes wrong during the flash. Recovery requires relatively inexpensive hardware (CH341A programmer or SuzyQ cable) and some technical knowledge. Creating a backup before flashing is highly recommended. UEFI firmware also completely removes ChromeOS, so reverting requires restoring stock firmware first.

See [Firmware Types](/docs/firmware/types.md) for detailed comparison.

### Do I need to open my device to flash firmware?

* **RW_LEGACY firmware:** No. It does not require disabling firmware write-protect.

* **UEFI Full ROM firmware:** Yes, in most cases. You need to disable hardware write-protect, which usually requires opening the device to remove a screw, disconnect the battery, bridge a jumper, or use a SuzyQ cable with CCD.

See [Disabling Write Protection](/docs/firmware/wp/disabling.md) for details on your specific device.

## Firmware Questions

### What's the difference between RW_LEGACY and UEFI Full ROM firmware?

* **RW_LEGACY** is for dual-booting ChromeOS + Linux. It updates only the legacy boot payload, leaves ChromeOS intact, doesn't require opening your device, and carries zero risk of bricking. However, it has limitations like no NVRAM support (boot order can't be saved between boots).

* **UEFI Full ROM** completely replaces the stock firmware, removes ChromeOS entirely, requires opening the device to disable write-protect, and carries a small bricking risk. It provides full UEFI functionality, better OS support, and turns your Chromebook into a regular PC.

See [Firmware Types](/docs/firmware/types.md) for detailed comparison.

### I just want to boot Linux from USB on my Chromebook — what do I need to do?

* Check the [Supported Devices](/docs/supported-devices.md) page to ensure your device has functional RW_LEGACY firmware available. If so, then simply put your device into [Developer Mode](/docs/boot-modes/developer.md), then run the [Firmware Utility Script](/docs/fwscript.md) and update the RW_LEGACY firmware (no need to disable the firmware write-protect for this). Reboot, press `[CTRL+L]` to boot in Legacy Boot Mode, then press ESC and select your USB from the boot menu.

### Can I update my UEFI firmware without disabling write-protect again?

* Yes! Once you've disabled firmware write-protect to install UEFI firmware, the **software** write-protect remains disabled even if you reconnect the battery or reinstall the WP screw. You can safely update your firmware anytime without reopening the device.

The script automatically handles all write-protect requirements during updates.

### My device is taking forever to boot after flashing UEFI firmware - is it bricked?

* No! The first boot after flashing UEFI firmware can take up to 60 seconds (or up to 2 minutes on some devices) while the system performs RAM training. This is completely normal.

Be patient and **do not** interrupt the first boot. Subsequent boots will be much faster. If your device still hasn't booted after 2 full minutes, try a hard reset (`[Refresh+Power]` or `[ESC+Power]`).

### My device shows a black screen with text after flashing firmware - is it broken?

* Probably not! You're likely seeing the **EFI Shell** (shows "Shell>") - No bootable device found. Type `exit` to access the boot menu, then boot your USB/SD or install an OS.

If you see a completely black screen with nothing, wait 2 minutes, then try a hard reset.

### I flashed UEFI firmware on my Ti50 device and now it won't boot - what happened?

* Ti50 devices (2023+) have AP RO Firmware Verification that must be disabled before flashing custom firmware. If you didn't disable it, your device will refuse to boot.

**To recover:**
1. Press and hold Power + tap Refresh/F3 twice + release Power
2. Repeat step 1 a second time
3. This temporarily disables RO verification for 15 minutes
4. Quickly boot Linux and run the Firmware Utility Script
5. Properly disable RO verification: `gsctool -a -I AllowUnverifiedRo:always`
6. Reboot normally

See [Disabling Write Protection](/docs/firmware/wp/disabling.md#disable-ap-ro-firmware-verification) for details.

### I'm trying to exit Developer Mode, but when I press space it says "WARNING: TONORM prohibited by GBB_FORCE_DEV_SWITCH_ON" — how do I fix this?

* The 'Set Boot Options (GBB Flags)' option of the Firmware Utility Script automatically sets the GBB Flag to force Developer Mode on when a non-default option is selected, to mitigate the problem of accidentally exiting Developer Mode and wiping your ChromeOS user data. To clear the GBB flags / reset them to factory default, simply re-run the Firmware Utility Script and choose the option to reset the GBB Flags to factory default. You can also do this from a ChromeOS terminal with the following command: `sudo futility --gbb --set --flags=0x0` and then reboot.

On older devices, the command is `sudo /usr/share/vboot/bin/set_gbb_flags.sh 0x0`

### I'm running Legacy boot firmware now — can I switch to the UEFI firmware?

* You can, but your existing OS install won't boot. You'll need to either reinstall the OS (often the easiest course of action), or you can attempt to migrate your existing install, but this isn't ideal and should be considered unsupported.

### I accidentally updated to the UEFI firmware, and now my existing OS won't boot — what do I do?

* You have two options:
  1. Reinstall your OS (recommended - cleanest solution)
  2. Restore your previous firmware from backup:
     * Boot a UEFI-capable Linux Live USB
     * Re-run the Firmware Utility Script
     * If you have a stock firmware backup: Choose "Restore Stock Firmware" and select your backup file
     * If you have a backup of your previous custom firmware: Choose "Flash Custom Firmware" and select your backup file
     * Note: Only works if you created a firmware backup before flashing UEFI

### I disconnected the battery to disable write-protect - when can I reconnect it?

* You can reconnect the battery **after** successfully flashing the firmware and powering off the device (using the script's power-off option).

Do not reconnect the battery while the device is powered on or during the flash process. After reconnecting, you may need to plug in external power to wake/boot the device initially.

### Why won't the Firmware Utility Script allow me to restore the stock firmware on a ChromeOS device which has reached AUE/EOL?

* Because in most cases, there is no point in going back to an old, insecure, potentially broken version of ChromeOS when better alternatives exist. If you're planning to sell the device, the worst thing you can do is sell it with an OS that isn't getting updates anymore.

For EOL devices, continue using UEFI firmware with Linux, Windows, or ChromeOS Flex. See [ChromeOS Flex on EOL devices](#is-chromeos-flex-a-good-option-for-my-chromeos-device-which-has-reached-aue-eol) below.

## Booting & Installation

### I just installed the UEFI firmware, and now my device boots to a black screen that says 'shell' — what do I do?

* You're in the EFI shell; the firmware boots there when it can't find a valid UEFI boot device, either externally (USB, SD) or internally. Just type 'exit' to get back to the UEFI settings menu, from which you can select your boot device or reboot.

You need to install a UEFI-boot capable OS from a properly formatted USB/SD device. If you're creating the install media from Windows, use [Rufus](https://rufus.akeo.ie) to write the ISO to USB.
If writing a Windows ISO, select the ISO, then set the Partition scheme to 'MBR for UEFI' or 'GPT for UEFI;' 'MBR for UEFI-CSM' will not work since CSM = Legacy BIOS and the UEFI firmware doesn't support Legacy mode.
For a Linux ISO, select the ISO, then change the write mode from 'ISO Image' to 'DD Image' from the drop-down menu. As most Linux ISO images these days are compatible with both Legacy and UEFI booting, this ensures maximum compatibility.

### I flashed the firmware and need to install an OS, but my USB drive isn't detected/isn't booting — what now?

* Make sure you created the USB install media correctly:
  * Be sure to use a 64-bit OS; on the Windows side, use only Windows 10 or newer — Windows 7 will not work, Win 8/8.1 doesn't support all the required drivers; 32-bit anything (Windows or Linux) will not work (the UEFI firmware is 64-bit only)
  * For Windows, use Rufus or the Windows Media Creation Tool. Almost any options in Rufus should work, but UEFI/GPT is recommended. FAT vs NTFS should not matter. The UEFI firmware supports both
  * For Linux, ensure your distro supports UEFI. Any tool that supports UEFI Linux (such as Rufus) or a dd mode or dd itself on any \*nix should be able to make a working installation USB. Do **not** use Unetbootin. It is known to have issues making UEFI-capable installation USBs.

* Any blogs, guides, or instructions that tell you to enable Legacy/CSM mode as part of installation are not relevant for ChromeOS hardware and should be discarded completely. The UEFI firmware does not support Legacy/CSM mode. All new PCs, even if they have a Legacy/CSM mode, ship with UEFI as the default. Windows 8+ has good UEFI support. Linux has had EFI/UEFI support for over a decade. macOS has never supported Legacy BIOS. Common \*BSD variants either have UEFI support or are in the process of adding it. You should not need any Legacy mode

* Some drives are slow and the firmware does not detect them in one go:
  * The EFI shell is your friend: just type "exit" to go to the GUI menu
  * If you can't get a drive to detect at power on, try plugging it in on the shell page, then exiting the shell with "exit" and see if it appears under "Boot Menu"
  * If not, go to "Boot Manager" and, with the USB drive still plugged in, pick "Reset System." This will reset with the USB drive still partly powered on and will increase the odds of proper detection
  * You might also try putting a powered hub between the USB drive and ChromeOS device. That can help improve the odds of proper detection if the drive is not powering on in time
  * USB drive still not detecting? Try another drive. Also, some people have reported higher success rates with SD cards

### I'm using your UEFI firmware, installed my OS \[Linux\], and it still boots to the EFI shell — what do I do?

* Sounds like your Linux distro doesn't install the EFI bootloader in the default location. No worries, it's an easy fix:

Type 'exit' to return to the UEFI settings menu, then select Boot Manager. From there, select Boot From File, then navigate to and boot from `/EFI/[distro name]/grubx64.efi` (where `[distro name]` will be ubuntu, arch, debian, etc). Once your OS is booted, open a terminal/shell, and type the following (observing case):

```
sudo su
mkdir -p /boot/efi/EFI/BOOT
cp /boot/efi/EFI/[distro name from above]/grubx64.efi /boot/efi/EFI/BOOT/BOOTX64.efi
```

then reboot to test. What we're doing is copying the grub EFI boot stub from the OS-installed location to the location the firmware is expecting (`/EFI/BOOT/BOOTX64.efi`) on the EFI system partition (ESP), which most distros will mount at `/boot/efi`. You may need to adjust slightly for your distro, but these instructions should work in most cases.

### The Windows installer says none of my partitions are large enough to install Windows — help?

* When installing Windows on the internal storage of a ChromeOS device (which is usually 16/32GB at best), you need to first delete all the existing (ChromeOS) partitions — even the EFI system partition — and then choose to install Windows into the unpartitioned space.

### I am trying to boot Linux from USB and getting an error: "error: unknown filesystem. alloc magic is broken at 0x78cd97c0" — how do I fix it?

* Your ISO wasn't written to USB properly — as an image, not an ISO — and you need to redo it [using the proper tool/settings](/docs/support/bootableusb.md). Etcher or Rufus in dd mode are the recommended options. The ChromeOS Recovery tool also works properly.

## Post-Installation / OS Issues

### I've installed Windows or Linux, and now something doesn't work?

* Check the [chrultrabook docs](https://docs.chrultrabook.com) for known issues/workarounds, and go to the [chrultrabook forums](https://forum.chrultrabook.com/) for help.

### How can I get audio working under Linux?

* See [the post-install notes on the Chrultrabook docs](https://docs.chrultrabook.com/docs/installing/installing-linux.html#fixing-audio)

### Should I install a 32-bit or 64-bit OS?

* The UEFI Full ROM firmware only supports 64-bit OSes, so be sure to use the 'x86_64' version of whatever OS you want to install. USB media created from 32-bit ISOs will simply fail to boot.

### UEFI is cool and all, but I'd like to revert to ChromeOS — how can I do that?

* No problem, you just need to restore the stock firmware first:

  * Boot a 64-bit Linux Live USB (e.g. Ubuntu, Fedora)
  * Run the Firmware Utility Script (on Ubuntu, may need to install curl first: sudo apt install curl)
  * Select the option to restore the stock firmware, follow the prompts and reboot when complete
  * Insert the Recovery media when prompted
  * After Recovery is complete, run Firmware Utility Script again, and reset the firmware boot flags to default
  * (Optional) Reboot, and exit Developer Mode

See [Reverting to Stock ChromeOS](/docs/reverting/) for detailed instructions.

### I'm trying to install ChromeOS Flex and use it in a managed environment, but getting an error related to the TPM — how do I fix this?

* The MrChromebox-4.20.0 firmware release added support for TPM 1.2/2.0 management via the UEFI Device Manager, so this should no longer be an issue. If running an older firmware version, boot a current Linux ISO and run the [Firmware Utility Script](/docs/fwscript.md) to update to the latest release.

### Is ChromeOS Flex a good option for my ChromeOS device which has reached AUE/EOL?

* It depends on the device. ChromeOS Flex does not provide the same level of hardware support as ChromeOS for Chromebooks/Chromeboxes. Generally speaking, ChromeOS devices from 2013-2015 based on the Intel Sandybridge, IvyBridge, Haswell, and Broadwell platforms can run ChromeOS Flex with full functionality; exceptions include the 2015 Chromebook Pixel (SAMUS) and the Acer Chromebase (BUDDY), which use a different audio setup that isn't (currently) supported by Flex. Other/newer hardware platforms have the same issue — pretty much everything will work other than the built-in audio (in which case, a Bluetooth or USB audio device can be used).

**For EOL devices specifically:**

* Haswell Chromebooks: 100% functional
* Broadwell Chromebooks: 100% functional (exceptions: no built-in audio on BUDDY or SAMUS)
* Haswell/Broadwell Chromeboxes: 100% functional
* Baytrail/Braswell/Skylake devices: no built-in audio, otherwise fully functional. BT/USB audio works fine.

## Firmware Utility Script

### The Firmware Utility script fails to run under Ubuntu 22.04 (or derivatives) with a file not found error — how to fix?

* The Snap-installed curl app in Ubuntu 22.04 prevents the script from working properly; remove it and install curl via apt instead:

```
sudo snap remove curl
sudo apt update
sudo apt install -y curl
```

Then re-run the script.

### The script says I must run it from VT2 terminal on ChromeOS R117+ - how do I do that?

* Starting with ChromeOS R117, Google removed `sudo` from the main shell, so the script must be run from a VT2 terminal:

1. At the ChromeOS login screen (not logged in), press `[CTRL+ALT+F2]` (F2 is the right arrow key)
2. Login as `chronos` (no password needed)
3. Run the script: `cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh`

You cannot run the script from a Crosh shell (`[CTRL+ALT+T]`) or from a Crostini/Penguin terminal.

### What does "Clear UEFI NVRAM" do and when should I use it?

* Clearing NVRAM erases all UEFI boot entries and settings stored in the firmware. This is useful when:

* Boot order is corrupted or contains invalid entries
* System fails to boot and you suspect NVRAM corruption
* After major OS changes or reinstallation
* Troubleshooting boot issues

After clearing, boot entries will be recreated automatically when you boot an OS or update a bootloader. Your installed operating systems and their data are not affected - only the firmware's knowledge of how to boot them is reset.

See the [Firmware Utility Script docs](/docs/fwscript.md#clear-uefi-nvram) for details.

### Do I need to create a firmware backup before flashing?

* **For UEFI Full ROM firmware: YES, highly recommended!**

The script will prompt you to create a backup when flashing UEFI firmware. Store this backup in a safe place (Google Drive, another PC, etc). Without a backup, restoring stock firmware is more difficult and you may lose your device's unique identifiers (VPD, serial number).

**For RW_LEGACY firmware: No, not required.** RW_LEGACY only modifies a writable region and carries no bricking risk.

## Miscellaneous

### Where can I find a SuzyQ cable (SuzyQable)?

* They used to be available from Sparkfun, but aren't any longer. A young entrepreneur has made some cables/adapters available and [sells them on eBay](https://www.ebay.com/itm/316024978790). They are also available from [Frya Labs](https://shop.fyralabs.com/products/suzyq-board).

There are also schematics online which show how to make a cable using a USB-C cable and a breakout board, along with a few resistors.

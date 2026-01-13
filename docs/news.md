# Latest Updates


 ## MrChromebox-2512.0 Release

(2026.01.13)

This new release is based on the coreboot 25.12 tag (December 2025) and includes the following changes:

### coreboot fixes and enhancements:
- Fixed coreboot setup options intermittently not saving on Broadwell and earlier platforms
- Fixed power-on-after-fail behavior on Fizz-based devices (7th/8th-gen Chromeboxes)
- Reverted to using FW config for touchpad device selection on GALTIC (and similar boards)
- Added Windows-compatible camera interface for many devices which use MIPI (vs USB) cameras
- Added more CFR setup options for various devices
- Improved robustness of EC -RW firmware update mechanism
- Misc other minor fixes/improvements

### edk2 Payload Updated
- Updated edk2 payload to rebase on upstream tag edk2-stable202511.
- Improvements to battery detection
- Added password lock feature to edk2 setup
- Added option to set boot timeout
- Added option to prioritize internal or external boot devices


## Firmware Utility Script: CR50 NVRAM Reset Feature

(2025.12.23)

A new feature has been added to the Firmware Utility Script to help address "Secure NVRAM (TPM) Initialization" issues that can occur when restoring stock ChromeOS firmware on devices with CR50 security chips.

When restoring stock firmware using the script, users with CR50-based devices (Apollo Lake and newer) will now automatically have the TPM and kernel version data in the CR50 NVRAM reset to their factory default values. This reset ensures the TPM and kernel versions are in a known good state, preventing initialization errors after restoring stock firmware.

For more information on this feature, see the [Firmware Utility Script documentation](/docs/fwscript).


 ## MrChromebox-2509.4 Release

(2025.11.30)

This point release addresses issues in the previous 2509.3 release, with a few improvements as well:

### coreboot Fixes/Improvements
- **CFR support** added for multiple Google boards: Skyrim, Kahlee, Guybrush
- **iPXE booting** integrated into EDK2 payload for network booting on boards with onboard LAN
- **ACPI S3 sleep state** fixed for Brya-based boards
- **RGB keyboard configuration** support at boot via Chrome EC for boards equipped with one
- **SMMSTORE region size increased** to fix UEFI DBX (revocation database) updates via fwupd
- **Improved Intel ME mode change handling**: Enhanced CSE reset error detection and fallback logic
- **Samsung Lumpy**: Fixed HDA pin configuration issues causing speakers to not be disabled when plugging headphones
- **Samsung Stumpy**: Improved fan configuration

### EDK2 Improvements
- **Battery status display** added to Frontpage with new BatteryStatus protocol
- **Time/Date Settings** allows for configuration via edk2 settings
- **Frontpage improvements**: Increased banner row count, fixed center-aligned banner position
- "Advanced Configuration" menu renamed to "System Configuration"
- SecureBootConfig: Made current state display non-selectable to avoid confusion
- Improved UFS boot device enumeration (skip non-zero LUNs, better naming)


### Important:
Due to changing the size of the UEFI variable store, all configuration items (include boot entries) will be erased and reset to their default values.  
For some users, this may mean needing to boot their OS via Boot Manager/Boot From File and manually re-adding the BootOrder entry if the OS does not do it automatically.

## Major Documentation Overhaul

(2025.11.25)

The website documentation has received a comprehensive update (thanks Cursor AI!) to better reflect the current state of the Firmware Utility Script and improve the user experience. This is the most significant documentation update since the 2024 website migration to Vuepress.

**Firmware Utility Script Documentation (`/docs/fwscript.md`):**
* Added documentation for previously undocumented features:
  - Backup Current Firmware (local filesystem and USB methods)
  - Flash Custom Firmware (advanced feature with automatic data preservation)
  - Set Hardware ID (HWID) for UEFI firmware
  - Device-specific functions (Pixelbook touchpad firmware management)
* Expanded existing sections:
  - Complete GBB Flags documentation (all 6 menu options explained)
  - Enhanced Clear UEFI NVRAM section
  - Comprehensive data preservation explanation (serial, HWID, VPD, MRC cache, SMMSTORE)
  - Detailed restore methods documentation
* Added new "Understanding the Menu System" section explaining dynamic menus, write-protect indicators, and firmware update notifications
* Added prominent EOL device restrictions with explanations

**Other Documentation Updates:**
* **getting-started.md:** Added complete script execution details, terminal instructions, and backup reminders
* **firmware/booting.md:** Added firmware type distinctions section explaining RW_LEGACY vs UEFI boot flows and limitations
* **firmware/types.md:** Updated RW_LEGACY description (now uses edk2), added NVRAM limitation documentation, removed outdated references
* **firmware/updating-firmware.md:** Clarified this is for updating existing UEFI installations, not initial flashing
* **firmware/wp/index.md:** Added Ti50 security chip information and RO verification warnings
* **reverting/** documentation: Fixed typos and added detailed restoration method explanations

**FAQ Reorganization (`/docs/faq.md`):**
* Complete restructure into 6 logical sections: About the Project, Before You Start, Firmware Questions, Booting & Installation, Post-Installation/OS Issues, and Firmware Utility Script
* Added 12 new FAQ entries covering common issues:
  - What's the difference between RW_LEGACY and UEFI Full ROM?
  - Device taking forever to boot (RAM training explanation)
  - Ti50 device won't boot recovery instructions
  - Battery reconnection timing
  - VT2 terminal requirement for ChromeOS R117+
  - Clear UEFI NVRAM explanation
  - Firmware backup recommendations
  - And more...
* Improved existing entries with more actionable answers and better cross-referencing

All documentation now accurately reflects the current firmware script functionality, provides better guidance for common issues, and offers clearer explanations of technical concepts. Special thanks to the community for feedback that helped identify areas needing improvement.


 ## MrChromebox-2509.3 Release

(2025.11.08)

This point release addresses a few small issues in the 2509.2 release:

 * Fixed SMBIOS product name capitalization
 * Re-set S3 as default sleep mode on older boards


 ## MrChromebox-2509.2 Release

(2025.11.01)

This point release addresses issues in the 2509.1 release, with a few improvements as well:

 * Fixed (hopefully) UFS storage not enumerating under edk2 / unable to boot
 * Added support for Genesys Logic GL9763E eMMC controllers
 * Added support for Genesys Logic GL9750/9755 SD card controllers (still WIP)
 * Fixed fan stalling under Windows for Haswell/Broadwell Chromeboxes
 * Improved thermal management for HSW/BDW Chromeboxes
 * Improved keyboard backlight detection for setting level at boot via menu option
 * Added automatic fan control menu option for boards with fans
 * Added touchpad type menu option for PEPPY (should fix touchpad under Windows)
 * Added touchscreen enable/disable menu option for LULU
 * Added menu option to toggle IPU camera(s) on/off for Kabylake Chromebooks
 * Added touchscreen type menu option for DRAWCIA
 * Added touchpad type menu option for GALTIC
 * Fixed EC-RW updates for Tigerlake Chromebooks
 * Improved eMMC driver for AMD Picasso Chromebooks
 * Improved/fixed EC-RW firmware sync
 * Consolidated firmware builds -- 115 images removed
 * All devices using the same board/build now differntiated via HWID, which is read from CBFS
 * New script feature to set HWID on UEFI firmware (hopefully not needed)
 * Removed 'Power on after fail' menu option for Chromebooks; only makes sense for Chromeboxes/bases
 * Added new script options to generate debug and cbmem-enabled builds (for self-compilers)
 * Added new script to generate edk2 RW_LEGACY payload


 ## RW_LEGACY updates for everyone!

(2025.10.31)

Usually RW_LEGACY support is released when a platform is first supported, and doesn't change much unless there's an issue to address. But now that I have a separate branch and build script for updating the RW_LEGACY payload, I figured it was time to unify things, as well as fix a few outstanding issues. This new release supports all non-EOL ChromeOS devices, other than Hatch-based Cometlake Chromebooks, which still lack RWL support due to bugs in Google's stock firmware that I have yet to work around.

 * Unified RWL release for all platforms Kabylake/Apollolake and newer
 * Improved UFS support
 * Added support for eMMC on devices using GL9763E controller
 * Added support for SD cards on devices using GL9750/9755 controllers
 * Simplified edk2 menus with unavilable options removed
 * Removed edk2 shell
 * Auto-boot to setup menu when no boot devices available


 ## MrChromebox-2509.1 Release

(2025.10.13)

This point release addresses issues in the 2509.0 release, with a few improvements as well:

 * Fixed I2C controllers not working under Windows on some platforms
   (Haswell, Broadwell, Baytrail, Braswell)
 * Fixed Windows display brightness control on Alderlake-N (nissa) devices
 * Added CFR option menu support for Jasperlake boards (and Purism devices)
 * Added a CFR option for TANIKS/TAEKO to select eMMC or NVMe storage type
 * Updated EC-RW firmware on Tigerlake and Alderlake/Raptorlake devices to improve TBT5 compatibility
 * Updated edk2 branch (uefipayload_2508), rebased on upstream edk2-stable202508 tag


## MrChromebox-2509.0 Release

(2025.10.07)

This new release is based on the coreboot 25.09 tag (September 2025) and includes the following changes:

### New Boards Supported (36 new configs)

#### Intel Alder Lake (12th Gen) - 9 new boards
- AOpen Chromebox Commercial 3 (aurash)
- AOpen/ViewSonic/IMAGO Chromebox variants (bujia)
- Acer Chromebook Plus Spin 514 (dochi)
- Acer Chromebook Plus 514 (jubilant)
- Acer Chromebook Plus 516 (jubileum)
- Lenovo Chromebook Plus 2-in-1 (lotso)
- Acer Chromebox CXI6 (moxie)
- Acer Chromebook Plus Enterprise 515 (omniknight)
- Galaxy Chromebook Plus (xol)

#### Intel Alder Lake-N (12th Gen) - 23 new boards
- Acer Chromebox Mini CXM2 (dirks)
- HP Fortis G1i 11/14 and Flip variants (domika, domilly, domiso)
- Acer Chromebook Spin 311 (gallida360)
- CTL Chromebook PX111E (gana)
- CTL/Poin2 Chromebook Plus variants (glassway)
- Centerm/Positivo/Multi/Aiwa/Acer Spin 311 variants (gothrax)
- CTL/Pegatron/Poin2 12" variants (guren, guren360)
- Centerm Chromebook M621 variants (hideo)
- Lenovo 500e Gen 4s (pujjoga, pujjogatwin)
- CTL/Edxis/Mouse Chromebook variants (quandiso2, quandiso3602)
- Acer Chromebook Plus 514 (roric)
- Acer Chromebook 315 (ruke)
- Acer Chromebook 514 C937 (rull)
- Acer Chromebook 511 (rynax)
- NEC Chromebook Y4 (sundance)
- ASUS Chromebook CR11 and Flip variants (teliks, teliks360)
- ASUS Chromebook CX15 (telith)
- ASUS Chromebook CX14 (teltic)

#### Intel Jasper Lake (11th Gen) - 2 new boards
- ASUS Chromebook CX1505CKA (awadoron)
- ASUS Chromebook CX1405CKA/CB1405CKA (awasuki)

#### Intel Meteor Lake (14th Gen) - 2 new boards
- Acer Chromebook Plus Spin 714 (karis)
- ASUS ExpertBook CX54 Chromebook Plus (screebo)

### MrChromebox-Specific Enhancements

#### coreboot Firmware Runtime (CFR) Support
Added CFR configuration support to enable runtime firmware option changes via edk2 setup menu:
- **Mainboards**: Brya, Volteer, Drallion, Hatch, Octopus, Reef, Eve, Poppy, Glados, Auron, Slippy, Link, Rex, Zork, Puff, Fizz
- **ChromeEC options**: Keyboard backlight level at boot, EC sync, RW jump control
- **Apollo Lake**: CFR configuration objects for SoC-level options

#### edk2 Payload Updated
Updated edk2 payload to rebase on upstream tag edk2-stable202505.



 ## Some backend improvements

(2025.10.07)

In preparation for the MrChromebox-2509 release, some much needed backend improvements have been made to the Firmware Utility script, and some new utility scripts added:

  - New menu functions to backup current firmware and flash custom firmware
  - Major refactoring of device information storage in device-db
  - A handful of performance improvements
  - New edk2/UEFI RW_LEGACY firmware option for Apollo Lake boards
  - New helper script to identify boards without firmware
  - New helper script to update the supported devices list here from device database
  - New helper script to update the device DB from Google's recovery config
  - Updated the README - documentation improvements are always good :)



 ## MrChromebox-2503.0 Release

(2025.04.27)

This new release is based on the coreboot 25.03 tag (March 2025) and includes the following changes:

 * Rebased on coreboot tag 25.03
 * New edk2 branch (uefipayload_2502), rebased on upstream edk2-stable202502 tag
 * Fixed battery indicator under Windows on Alderlake-N devices
 * Changed display init on KIP
 * Add support for coreboot setup engine to 10th-gen Chromeboxes and earlier
     * Adds a new 'Platform Setup Menu' option under 'Advanced Configuration'
     * Allows runtime configuration of many coreboot options
     * Options available vary by platform, but all support setting the behavior when power lost/restored
     * More options and support for Chromebooks will be added in the future


 ## MrChromebox-2408.1 Release

(2024.09.14)

Just a quick rollup to capture the previous hotfixes:

 * Fix presence of some USB ports on TGL Chromebooks
 * Fix ACPI battery code which prevented booting Windows on SNB/IVB/HSW/BDW/BYT/BSW Chromebooks
 * Update JSL devices with fixed images, which were rolled back after an issue was found in the 2408 release


 ## Some small MrChromebox-2408 Updates

(2024.09.11)

As with any release, some small issues sneak past testing, so pushing a few fixes:

 * Fix presence of some USB ports on TGL Chromebooks
 * Fix ACPI battery code which prevented booting Windows on SNB/IVB/HSW/BDW/BYT/BSW Chromebooks

Updated boards will have a firmware version of MrChromebox-2408-1 or MrChromebox-2408-2 and a build date of 2024/09/10 or 2024/09/11.


 ## MrChromebox-2408 Release

(2024.09.08)

This new release is based on the coreboot 24.08 tag (August 2024) and includes the following changes:

 * Rebased on coreboot tag 24.08
 * New edk2 branch (uefipayload_2408), rebased on upstream edk2-stable202408 tag
 * Adjusted touchscreen init timing params for JINLON
 * Minor improvements to EC software sync code
 * Added automatic fan control for 7th/8th-gen Chromeboxes (FIZZ board)
 * Fixed fan control on 10th-gen Chromeboxes
 * Added ACPI driver attachment for SPI CR50 TPMs to use coolstar's Windows drivers
 * Added ability to configure (when compiling) UMA allocation for Intel Sandy/Ivybridge and AMD Stoneyridge and Picasso devices
 * Fixed display init on some boards (LASER14, MARASOV, OMNIGUL, KINOX)
 * AMD Picasso devices no longer use vboot


 ## MrChromebox-2405.1 Point Release

(2024.07.10)

This release is just for AMD Mendocino-based devices, and updates them from 4.22.x to the 2405 code base.

The issues which held back MDN from the initial 2405 release have been resolved, and should not be a problem going forward.

MDN is now a first-class option, with full functionality under both Windows/Linux, working Modern Standby (S0ix), audio, and everything else. The only exception is the fingerprint reader (FPR), which is unsupported on all ChromeOS devices outside of ChromeOS currently.



## Major Website Overhaul!
(2024.07.04)

Long Overdue, the backend of the website here has been migrated from the old hand-crafted HTML to a new markdown-based setup using [Vuepress](https://vuepress.vuejs.org), with the source all [on Github](https://github.com/MrChromebox/website) for ease of updates and automated deployment. This means community contributions can be more easily integrated, and hopefully will improve the flow of information (in both directions) between this project and [chrultrabook](https://chrultrabook.com).

There are problably a lot of rough edges still, so feel free to [submit an issue](https://github.com/MrChromebox/website/issues) or a [pull request](https://github.com/MrChromebox/website/pulls) should you come across anything :)



## MrChromebox-2405 Release

(2024.06.15)

As coreboot has changed its version numbering to a YYMM scheme, MrChromebox releases will now do the same. This new release is based on the coreboot 24.05 tag (May 2024) and includes the following changes:
 * Rebased on coreboot tag 24.05
 * Added support for several new Intel Jasperlake boards (beadrix, boxy, dexi, peezer, taranza)
 * Added latest Google-built EC-RW updates for all Jasperlake boards
 * Updated the EC-RW firmware for Fizz boards (7th/8th-gen Chromeboxes)
 * Updated EC-RW software update code for improved compatibility
 * Fixed SMBUS subsystem ID on several Sandy/Ivybridge Chromebooks
 * Increased the UMA VRAM to 128MB on AMD Picasso boards (zork)
 * Filtered out some spurious error messages in the coreboot console log


AMD Mendocino boards have been held back from this release while some issues with the new signed PSP verstage binaries are sorted out.

The full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-2405) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_2402) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## MrChromebox-4.22.4 Release

(2024.04.16)

Quick Fix for Alderlake boards:
 * Added UFS support to edk2 for Alderlake/Alderlake-N-based devices
 * Update edk2 branch to uefipayload_202402
 * Rebuild for all other non-AMD boards so build date and firmware date match


The full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.22.4) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_2402) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## MrChromebox-4.22.3 Release

(2024.04.15)

Showing AMD Chromebooks some love:
 * Added eMMC support for Picasso-based devices
 * Added ECRW updates for Picasso-based devices
 * Added SMMSTORE and SecureBoot support for Picasso-based devices
 * Added SMMSTORE and SecureBoot support for Cezanne-based devices
 * Added SMMSTORE and SecureBoot support for Mendocino-based devices
 * Update edk2 branch to uefipayload_202402

All other boards remain on 4.22.2-x.

The full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.22.3) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_2402) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## Firmware Utility Script back up and running

(2024.02.23 -- #2)

The Firmware Utility Script and all associated files should be back up and running 100% now.

The site wiki pages are still a bit of a mess formatting-wise, and I hope to have that resolved sometime this weekend.



## Site Issues and Downtime

(2024.02.23)

As many of you have realized, the site was down the past few days as the old host disappeared. I've moved to a new host and am rebuilding the site using some fairly old backups. The Firmware Utility script will be back online once fresh firmware images are rebuilt and uploaded. Your patience is appreciated.

To those who complained that my site/service being down has cost you money, I would suggest you contact me for a commercial support contract which would allow you to self-host and avoid that issue.


## MrChromebox-4.22.2 Release

(2024.01.20)

Bugfix release:
 * Fixed some ACPI errors on 10th-13th-gen devices which would cause issues under Windows

The full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.22.2) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202309) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## MrChromebox-4.22.1 Release

(2024.01.16)

Bugfix release:
 * Fixed Windows BSOD INTERNAL_POWER_ERROR on 10th-gen Chromeboxes
 * Fixed ACPI error on Alderlake/Raptorlake Chromebooks which broke some functionality under Windows

The full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.22.1) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202309) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## MrChromebox-4.22.0 Release

(2023.12.22)

This is a relatively minor release, mainly updating coreboot and fixing any lingering issues from the 4.21 release (largely on AMD Picasso devices)

The full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.22) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202309) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## MrChromebox-4.21.1 Release

(2023.10.29)

Bugfix release, mainly for AMD Chromebooks:
 * Fixed S3 sleep/resume on AMD Stoneyridge devices
 * Added Windows display brightness controls and audio driver support for AMD Stoneyridge devices
 * Fixed WiFi not working on S3 resume for AMD Picasso devices
 * Fixed audio configuration under Windows for some AMD Picasso devices
 * Fixed tablet mode under Windows for DEWATT and FROSTFLOW
 * Fixed S0i3 sleep under Linux for AMD Cezanne Chroembooks
 * Fixed pre-OS display init on DROBIT
 * Fixed unknown device showing under Windows for devices with a fingerprint reader
 * Fixed a few unknown devices showing under Windows on Intel Cometlake devices

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.21) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202309) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## MrChromebox-4.21.0 Release

(2023.10.01)

This is a pretty big release, now supporting over 250 unique devices:
 * rebased on coreboot 4.21 tag
 * rebased on edk2/UEFI payload branch uefipayload_202309 (based on edk2-stable202308)
 * Add UEFI firmware for Brask-based Alderlake/Raptorlake-U/P Chromeboxes
 * Add UEFI firmware for Nissa-based Alderlake-N Chromebooks
 * Add UEFI firmware for AMD Picasso Chromebooks
 * Add UEFI firmware for AMD Cezzane Chromebooks
 * Add UEFI firmware for AMD Mendocino Chromebooks
 * Fixed a handful of other small bugs

IMPORTANT: MrChromebox does not provide support for running any specific OS, only the firmware to do so. OS support is provided by coolstar.org and on the Chrultrabook Discord server..

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.21) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202309) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## coreboot 4.20.1 Release

(2023.07.21)

Mainly a bugfix release, this adds support for a few more boards as well:
 * updated the edk2/UEFI payload using branch upp_202306
 * Fixed tablet mode for CYAN
 * Support both NVMe and eMMC on TANIKS
 * Add UEFI firmware for REDRIX, PIRIKA, PIRETTE, TAEKO
 * Fixed SMBUS subsystem ID on Sandy/IvyBridge devices
 * Fixed audio on LINK under Windows
 * Added support on LINK for coolstar's upcoming touchpad/touchscreen drivers
 * Raised default TDP (PL1) on KOHAKU from 9W to 12W
 * Fixed reboot issue on BANSHEE under Windows with some NVMe drives
 * Fixed S3 resume on AMD StoneyRidge Chromebooks

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.20) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202306) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.20 Release

(2023.05.15)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * Improved support for coolstar's Windows SOF audio drivers for Geminilake, Cometlake, Tigerlake, and Alderlake devices
 * updated the edk2/UEFI payload using branch upp_202304
 * Added UEFI SecureBoot support
 * Added support for managing TPM 1.2/2.0 via the UEFI Device Manager (though CR50 TPMs are not yet functional)
 * Fixed enrollment for devices running ChromeOS Flex (TPM 1.2 only)
 * Improved USB detection in Tianocore
 * Fixed various Windows issues on a handful of devices
 * Updated CPU microcode for all devices to latest available
 * Added UEFI Full ROM images for all Tigerlake Chromebooks
 * Added UEFI Full ROM images for all Jasperlake Chromebooks
 * Added UEFI Full ROM images for all Alderlake Chromebooks

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.20) [\[2\]](https://github.com/MrChromebox/edk2/commits/upp_202304) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.19 Release

(2023.01.23)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * Added support for coolstar's upcoming Windows SOF audio drivers for Geminilake, Cometlake, Tigerlake, and Alderlake devices
 * updated Tianocore/UEFI using branch upp_202301
 * Improved USB detection in Tianocore
 * Fixed Windows BSOD/ACPI BIOS ERROR on a handful of devices
 * Updated CPU microcode for all devices to latest available
 * Added UEFI Full ROM images for more Tigerlake Chromebooks
 * Added UEFI Full ROM images for a handful of Jasperlake Chromebooks

Beta UEFI images are available upon request for newer boards using Jasperlake, or Alderlake SoCs and AMD Zen+/Picasso.

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/MrChromebox-4.19) [\[2\]](https://github.com/MrChromebox/edk2/commits/upp_202301) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.18.2 Update

(2022.11.29)

Squashed some more USB-related issues introduced in the initial 4.18 release. Added UEFI Full ROM images for a handful of TGL and JSL boards.

## coreboot 4.18.1 Update

(2022.10.27)

A sneaky USB enumersation bug snuck into the 4.18 release as part of the Tianocore/edk2 update, which (mostly) prevented the detection of USB keyboards on SKL/KBL Chromeboxes (though I had a few reports of BDW Chromeboxes being affected too, althought I could not reproduce). The root cause has been identified and fixed, so pushing out a 4.18.1 update for all boards using the new/fixed Tianocore build.

## coreboot 4.18 Release

(2022.10.24)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * Added support for coolstar's upcoming Windows audio drivers for Skylake, Kabylake, Apollolake, and Geminilake platform devices
 * Fixed extranous microphone channels picking up noise when recording
 * updated Tianocore/UEFI using branch upp_202210
 * Improved USB detection in Tianocore
 * Fixed CR50 TPM init on devices with an I2C CR50 TPM
 * Fixed Windows BSOD/ACPI BIOS ERROR on a handful of devices
 * Updated CPU microcode for all devices to latest available

Beta UEFI images are available upon request for newer boards using Intel Tigerlake, Jasperlake, or Alderlake SoCs and AMD Zen+/Picasso.

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2022.10.24) [\[2\]](https://github.com/MrChromebox/edk2/commits/upp_202210) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.16 Release

(2022.04.09)

A release based on coreboot 4.15 was skipped due to lack of time, but hopefully this release will make up for it :)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * Added UEFI Full ROM support for all Apollolake and Geminilake devices (over 50+ new boards!) - updated Tianocore/UEFI using branch upp_202111
 * Added EC firmware updates for all APL, GLK, and CML devices making the top row keyboard keys work OOTB under Linux
 * Fixed USB ports not working after a reboot from Windows on KBL Chromeboxes
 * Implemented runtime device detection for all touchpads/touchscreens for KBL+ boards, which should fix issues caused by multiple ACPI entries for touchpads/screens not actually present
 * Updated CPU microcode for all devices to latest available

NOTE: c720 (PEPPY) users running Windows need to be using the latest touchpad drivers (crostouchpad 4.1.2) which support IRQ sharing, otherwise the touchpad will not work with this release.

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2022.04.09) [\[2\]](https://github.com/MrChromebox/edk2/commits/upp_202111) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## Pixelbook 4.14 firmware updated

(2021.08.06)

The 4.14 release added an updated EC-RW firmware for the Pixelbook, but apparently the update was failing due to a timeout erasing the RW region, causing the EC to fall back to the much older factory RO firmware. This broke suspend and the keyboard under Windows. An update has been release which fixes the issue and allows the EC-RW firmware update to complete successfully, so suspend and Windows (10 and 11) work properly now. Update via the Firmware Utility script from (natively booted) Linux (wsl does not work).

## coreboot 4.14 Release

(2021.07.25)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * updated Tianocore/UEFI using branch uefipayload_202107
 * fixed boot issues with some OSes which needed to be loaded below 4GB (ZorinOS, Proxmox, QubesOS)
 * Added EC firmware update for EVE (Pixelbook 2017)
 * updated CPU microcode for all Intel devices to latest available

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2021.07.25) [\[2\]](https://github.com/MrChromebox/edk2/commits/uefipayload_202107) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## RW_LEGACY/AltFw support for Jasperlake, Zen2 Chromebooks Added

(2021.06.02)

Support for booting Linux natively via the new legacy boot replacement (Alternative Firmware Menu / AltFw) has been added for JSL/Zen2 devices. Supported devices include:

 * HP Pro c645 Chromebook Enterprise (BERKNIP)
 * HP Chromebook 14a (DIRINBOZ)
 * Acer Chromebook Spin 514 (EZKINIL)
 * Lenovo ThinkPad C13 Yoga Chromebook (MORPHIUS)
 * ASUS Chromebook Flip CM5 (WOOMAX)
 * Lenovo 500e Chromebook 2nd Gen (BOTEN)
 * HP Chromebook 11 G9 EE (DRAWLAT)
 * HP Chromebook 14 G7 (DRAWMAN)
 * HP Chromebook x360 11 G4 EE (DRAWCIA)

Unlike many previous devices using Altfw, Jasperlake devices have fully working sleep (ACPI SS3); Zen2 devices do not.

As always, RW_LEGACY firmware does **not** require disabling firmware write protection to flash/use.

## coreboot 4.13 Release

(2021.04.21)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * updated Tianocore/UEFI codebase to edk2-stable202102
 * improved dynamic detection of USB/SD devices at boot time
 * improved NVRAM implementation applied to older Sandy/Ivybridge-based devices and AMD devices
 * fixed GPU support for Haswell/Broadwell devices under MacOS
 * fix fan speed issues via EC firmware updates for LULU and FIZZ devices
 * Added UEFI firmware support (with EC firmware updates) for Cometlake-based Chromebooks and Chromeboxes
 * Added UEFI firmware support for Cometlake-based Purism Librem Mini v2 and Librem 14
 * updated CPU microcode for all Intel devices to latest available

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2021.04.21) [\[2\]](https://github.com/MrChromebox/edk2/commits/2021.04.21) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## RW_LEGACY/AltFw support for Cometlake Chromeboxes Added

(2020.11.26)

While probably not available via retail channels just yet, buyers of the soon-to-be-released Cometlake-based Chromeboxes can purchase knowing they will have day one support for booting Linux natively via the new legacy boot replacement (Alternative Firmware Menu / AltFw). Supported devices include:

 * Asus Chromebox 4 (DUFFY)
 * Acer Chromebox CXI4 (KAISA)
 * HP Chromebox G3 (NOIBAT)
 * CTL Chromebox CBx2 (WYVERN)

UEFI Full ROM support for all Cometlake-based ChromeOS devices (books and boxes) is in the works as well.

## It's always something with Braswell

(2020.06.06)

It seems that several Braswell users have run into firmware/pre-OS display init issues with the new UefiPayloadPkg in the 4.12 release, so I'm rolling them back to the older CorebotPayloadPkg UEFI payload, with some tweaks to help address the NVRAM issues which plagued the previous release. Hopefully that will tide things over until I can figure out what's going on / why others are running into issues I'm not seeing here.

## coreboot 4.12 Release

(2020.06.04)

Beside updating the base coreboot code, this release as usual is full of fixes and improvements:
 * updated Tianocore/UEFI codebase to use new UefiPayloadPkg (vs the 2+ year old CorebootPayloadPkg which had since been dropped)
 * improved dynamic detection of USB/SD devices at boot time
 * new and improved NVRAM implementation (hopefully no more corrupted BootOrder variables)
 * switched back to UEFI/GOP driver init for Baytrail devices, using an updated GOP driver
 * fixed HDMI audio support for Haswell/Broadwell devices under MacOS
 * fix fan speed issues via EC firmware updates for LULU and FIZZ devices
 * more Windows compatibility tweaks for Kabylake devices
 * fixed Windows display brightness controls for LINK
 * fixed missing RAM display on UEFI setup screen for Baytrail devices
 * updated CPU microcode for all Intel devices to latest available

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2020.06.04) [\[2\]](https://github.com/MrChromebox/edk2/commits/2020.06.04) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## Another coreboot 4.11 Respin (4.11.2 point release)

(2020.03.17)

Several longstanding bugs were squashed, some more recent ones too, and a handful of improvements:
 * fixed NVRAM corruption leading to hung boot or inaccessible boot menus
 * fixed graphics console cursor/text flashing on screen before boot logo
 * fixed GPIO interrupt bug on Haswell devices preventing proper idling/sleep states (causing up to 30% CPU usage on CPU0)
 * fixed trackpad functionality under Linux on LUMPY
 * fixed internal display init issue on some Baytrail devices
 * added Windows compatibility tweaks for several Kabylake devices
 * fixed Windows display driver compatibility issue on some Broadwell devices
 * fixed auto fan control / fan starting issue on LULU (via an ECRW update)
 * updated CPU microcode for all Intel devices to latest available

Also added UEFI firmware support for the AMD Stoneyridge devices:
 * Acer Chromebook 315 / CB315-2H (ALEENA)
 * HP Chromebook 11A G6 EE (BARLA)
 * HP Chromebook 14A G5 (CAREENA)
 * Acer Chromebook 311 / Spin 311 (KASUMI/KASUMI360)
 * Lenovo 14e Chromebook / S345 (LIARA)

And as a bonus, the Firmware Utility Script will now let you know if an update for your device is available:
<p align="center"> <img src="/images/fwscript_update.png" alt="fwscript update notification" width="500"/></p>

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2020.03.17) [\[2\]](https://github.com/MrChromebox/edk2/commits/2020.03.17) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## RW_LEGACY Firmware Added for NOCTURNE

(2020.02.23)

RW_LEGACY firmware has been added for the Google Pixel Slate, so masochists who want to run Linux natively whilst dual booting ChromeOS now have that option. As mentioned below but worth repeating: firmware support often preceeds OS support, so users shouldn't expect any additional functionality under Linux compared to any other Kabylake devices (and in the case of NOCTURNE, it's probably worse, due to Linux's poor support for DPCD backlight control).

## UEFI Firmware Added for ATLAS and NOCTURNE

(2020.02.15)

Completing support for Kabylake ChromeOS devices, support has been added for ATLAS (Google Pixelbook Go) and NOCTURNE (Google Pixel Slate). As is often the case, the availablity of custom UEFI firmware preceeds OS support, so users shouldn't expect any additional functionality under Linux compared to any other Kabylake devices (and in the case of NOCTURNE, it's probably worse, due to Linux's poor support for DPCD backlight control).

## Pixelbook Windows backlight control fixed!

(2020.01.10)

A few weeks ago, a firmware update was released for the Pixelbook (EVE) which enabled backlight control under Windows. Some users experienced issues with this, so the previous version was made available as an option as well. Now, those issues have been fixed, so all Pixelbook users can safely update :)

Additionally, the power-on screen brightness was reduced slightly, which should benefit Linux users who mostly still don't have backlight control

## AMD eMMC booting fixed!

(2020.01.07)

AMD Chromebooks are the first to use Google's new Legacy Boot Mode implementation which features Tianocore as the legacy boot payload. Unfortuantely, the use of a custom eMMC controller chip (the Bayhub BH720) prevented the eMMC from being functional/bootable. But the folks at Bayhub kindly provided the support needed to get it working :)

This means work can resume on UEFI Full ROM firmware for AMD Chromebooks -- stay tuned!

## coreboot 4.11 Respin (4.11.1 point release)

(2019.12.01)

As usual, there's always a few issues that crop up with a new release, so just a quick fix to address those:
 * fixed external display output on Skylake devices
 * fixed internal display output on FALCO
 * fixed audio on EVE under Windows
 * fixed DP/HDMI audio issues on Haswell/Broadwell Chromeboxes
 * adjusted display scaling on CAROLINE at boot

Also took the opportunity to slip in a few improvements as well:
 * switched EVE to using coreboot native display init
    - adjusted display scaling at boot
 * added script function to downgrade touchpad firmware on EVE
    - only needed for touchpad to function under Windows
    - may need to be performed from ChromeOS/ChromiumOS
 * switched all NAMI variants to using coreboot native display init
 * Added UEFI Full ROM firmware for the following devices
    - Acer Chromebook 715 (BARD)
    - Acer Chromebook 714 (EKKO)
    - Samsung Chromebook Plus V2 (NAUTILUS)
    - Asus Chromebook C425 (LEONA)
    - Asus Chromebook Flip C433/C434 (SHYVANA)

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2019.12.01) [\[2\]](https://github.com/MrChromebox/edk2/commits/2019.12.01) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.11 + Tiano improvements

(2019.11.25)

Hot off the heels of the previous update, we have a fresh release based on the newly-tagged coreboot 4.11. In addition to being rebased on the latest version of coreboot, this release features a host of improvements and fixes:
 * fixed issue with NVRAM being corrupted by Windows
 * new/improved UEFI Boot Options/Settings screens
    - improved header layout
    - simplified menu options
    - more descriptive naming for SATA, NVMe, and USB drives in boot menu
    - easier to make changes to and save bootorder entries
 * open-source coreboot native graphics init (libgfxinit) now used for Haswell, Broadwell, and Skylake devices instead of closed-source GOP driver
 * better scaling of boot splash/menus for HiDPI displays

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2019.11.25) [\[2\]](https://github.com/MrChromebox/edk2/commits/2019.11.25) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.10 remix

(2019.10.28)

Just a quick respin to address some issues with the 2019.08.22 4.10 release:
 * fixed issues with Skylake/Kabylake devices booting some Linux ISOs
 * fixed some issues with Skylake/Kabylake devices and Windows 10 1903
 * fixed screen init issues with some Librem 15v4 devices
 * added a mitigation to the UEFI NVRAM becoming full and getting corrupted

With the coreboot 4.11 release not too far off, more fixes/improvements are coming - including native coreboot graphics init with proper HiDPI support for more models!

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2019.08.22) [\[2\]](https://github.com/MrChromebox/edk2/commits/master) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## coreboot 4.10 release (and more)

(2019.08.22)

Like this update, the coreboot 4.10 release was a bit delayed, but hopefully the result will be a nice stable release with no regressions (one can dream, anyway).

The UEFI Full ROM firmware for all devices has been updated and rebuilt, with the following notable changes:
 * coreboot codebase updated to 4.10 release
 * added UEFI Full ROM firmware for NAMI and SORAKA Kabylake Chroembooks
 * added UEFI Full ROM firmware for all Purism Librem laptops
 * Fixed touchscreen function on LINK under Cloudready
 * Fixed tablet mode functionality on CYAN
 * Fixed booting issues on some CLAPPER devices
 * and a few more things I need to pull out of the commit list

Additionally, preliminary RW_LEGACY support has been added for AMD StoneyRidge-based Chromebooks, using Tianocore as the payload. Booting from internal eMMC is not yet working, but booting from external sources works as expected.
(FWIW, Ubuntu 19.04 seems fully functional OOTB on these devices, which is nice)

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2019.08.22) [\[2\]](https://github.com/MrChromebox/edk2/commits/master) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## NVRAM? Yep, we got that!

(2018.12.30)

Since the beginning, one of the major features missing from the UEFI firmware available for ChromeOS devices (or for any devices using Tianocore as the coreboot payload) has been NVRAM to save the UEFI settings -- most notably, the boot order. I'm happy to report that's no longer an issue :). While not all settings are hooked into the NVRAM backend yet, boot order manipulation and custom boot targets are now possible, which makes things a lot easier.

The UEFI Full ROM firmware for all devices has been updated and rebuilt, with the following notable changes:
 * coreboot codebase updated to 4.9 release
 * Tianocore codebase updated to current upstream master
 * NVRAM functional to support boot order customization
 * added UEFI Full ROM firmware for the Pixelbook (EVE)
 * added UEFI Full ROM firmware for the Acer Chromebase 24 (BUDDY)
 * SandyBridge/IvyBridge devices now use coreboot native graphics init (libgfxinit)
 * improved VMX support for Skylake/Kabylake devices
 * fixed detection of internal storage for Core i-based Kabylake Chromeboxes
 * improved handling of write-protection on Apollolake/Kabylake devices
 * and a few more things I'll add as I remember them

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2018.12.30) [\[2\]](https://github.com/MrChromebox/edk2/commits/2018.12.30) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## UEFI Full ROM Firmware now available for all Skylake Chromebooks and Kabylake Chromeboxes

(2018.08.02)

Long overdue but hopefully worth the wait -- UEFI Full ROM firmware for Skylake Chromebooks!

The target audience for this firmware is users wanting to run a standalone Linux setup on their Skylake Chromebook. While installation of Windows 10 is possible, there are still numerous issues on the firmware side and missing drivers which prevent these devices from being useful under Windows. As with previous releases, updated EC firmware is included as well.

The UEFI Full ROM firmware for all devices has been updated and rebuilt, with the following notable changes:
 * coreboot codebase updated to 4.8 release
 * Tianocore codebase updated to current upstream master
 * updated the CPU microcode on all devices to the latest Intel recommended versions (which includes mitigations for Meltdown/Spectre)
 * added support for the 2018/Kabylake Chromeboxes
 * fixed DisplayPort outputs on Stumpy (Samsung Series 3 Chromebox)
 * fixed cooling fan occassionally stalling on Link (Chromebook Pixel 2013)
 * improved compatibility for Braswell devices with newer (4.13+) Linux kernels
 * script now double verifies Full ROM firmware flashes
 * script now uses the firmware flash chip's built-in write-protect functionality to protect the Full ROM firmware after flashing, which should hopefully significantly reduce any chance of bricking (not yet implemented for Skylake/Kabylake)
 * script no longer disables software write-protect automatically when run outside of ChromeOS

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2018.08.02) [\[2\]](https://github.com/MrChromebox/edk2/commits/2018.08.02) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).

## UEFI Full ROM Firmware now available for all Braswell devices (and Stout too!)

(2018.02.04)

It's taken a long time to get here, but it's finally happened -- UEFI Full ROM firmware for Braswell devices!

Not only that, but we were able to fix many of the issues which led us to believe that we wouldn't be able to have full functionality under Windows 10 (ok almost full -- touchscreens don't work due to lack of custom drivers required, and have been disabled/hidden as a result. But everything else works, even built-in speakers/headphones). coolstar will be updating his Windows install guide shortly, which will include links to the requried drivers for touchpad and audio support.

Linux users will need to use a distro with kernel 4.13 or newer in order to have a functional keyboard; GalliumOS users should use [this pre-release 2.2 ISO](https://galliumos.org/releases/nightly/galliumos-braswell-xenon-20171227T072217Z.iso) to ensure full functionality OOTB.

Braswell users don't get all the fun though, all UEFI Full ROM firmware has been updated and rebuilt, with the following notable changes:
 * coreboot codebase updated to 4.7 release
 * Tianocore codebase updated to current upstream master
 * fixed issue where available RAM limited to 2GB when UEFI firmware booted without a connected display (headless mode)
 * enabled keyboard backlight on boot (for devices which have it), providing early proof-of-life and eliminating need for OS driver (but still supports use of one)
 * updated the CPU microcode on Haswell and Broadwell devices to the latest Intel recommended versions (which do not include fixes for Meltdown/Spectre)
 * added support for the Lenovo Thinkpad X131e Chromebook (Stout)
 * updated Legacy Boot (SeaBIOS) Full ROMs for Chromeboxes
 * switched to SHA-1 checksum verification on firmware downloads
 * and plenty of other things I'm forgetting ATM, and will add here when I remember them :)

NOTE: on Braswell devices, the first boot after firmware flash will take a good 30 seconds or so (vs 10s or less on most other devices), due to RAM training being performed. This is normal, so don't panic when you reboot and get a black screen for what feels like forever - just wait and it will boot eventually :)

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2018.02.04) [\[2\]](https://github.com/MrChromebox/edk2/commits/2018.02.04) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/all).



## RW_LEGACY Support added for all ApolloLake Devices! (and the Pixelbook)

(2017.12.02)

Just a quick update to add RW_LEGACY support for the newly-released ApolloLake devices (see the Devices page for supported models), as well as the new Google Pixelbook. While Legacy Boot mode is now available/functional on these devices, support in the upstream Linux kernel isn't fully there yet. While basics like the keyboard and touchpad should work in most distros with a recent (4.8+) kernel, things like the touchscreen, media keys, and suspend/resume are still a WIP.

As usual, best compatibility is likely to be found with GalliumOS, which has issue trackers set up for both [ApolloLake](https://github.com/GalliumOS/galliumos-distro/issues/364) and [Kabylake](https://github.com/GalliumOS/galliumos-distro/issues/400) platforms.

While this is a quick/small update, work continues on UEFI/Full ROM firmware for both the Braswell and Skylake platforms. We're hopeful for a holiday release :)



## Support added for Link and Lumpy

(2017.07.14)

Long overdue, we now have support for Link (Google Chromebook Pixel 2013) and Lumpy (Samung Chromebook Series 5 550). Link, having a Google Chrome-EC, also gets an updated EC firmware which improves PS2 compliance and makes it functional without any additional drivers.

There's also a handful of fixes for other devices scattered in, including one for the internal microphone on Falco (HP Chromebook 14) which had been lingering on the issues list for far too long.

Lastly, we've done a bunch of code cleanup, and updated all devices to the latest coreboot/Tianocore upstream sources.

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox?tab=repositories) [\[1\]](https://github.com/MrChromebox/coreboot/commits/2017.07.14) [\[2\]](https://github.com/MrChromebox/edk2/commits/2017.07.14) [\[3\]](https://github.com/MrChromebox/chrome-ec/branches/yours).



## New Splash Screen added; BayTrail Audio on Windows fixed

(2017.04.09)

Gone is the brief "Start Boot Option" text - the UEFI firmware now has a proper splash screen, with the coreboot logo (a European brown hare) and a printout of the amount of system RAM. The splash will show for ~1s, during which time you can press ESC to enter the UEFI firmware settings.

<p align="center"> <img src="/images/tiano_splash.png" alt="Tianocore boot logo" width="500"/></p>

Baytrail devices also got a handful of fixes, most notably working audio under Windows when using coolstar's Maxim audio driver. This release also fixes an issue where selecting the eMMC from the boot menu would fail to boot Windows, and an issue with going into sleep on devices with a light sensor (which isn't used/supported).

The Firmware Utility Script has undergone some improvements for flashing Full ROM firmware: it now better informs users when flashing will break compatibility with the currently installed OS, provides info on any required post-install steps, removed the option of flashing Legacy Full ROM firmware for all Chromebooks, and provides stronger encouragement to use the UEFI firmware on Chromeboxes where Legacy firmware is still available.

Lastly, we've done a bunch of code cleanup, updated to the latest coreboot/Tianocore upstream sources, and retested everything under the Windows 10 Creator's Update (1703).

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox/coreboot/commits/2017.04.09).



## UEFI Headless Booting is Fixed! CTRL-ALT-DEL added!

(2017.03.19)

While the headless boot fix mainly affects Chromebox users, it also prevents the UEFI firmware from hanging when the display init either fails or takes longer than expected/allowed.

We've also updated the EC firmware on Haswell/Broadwell/Baytrail Chromebooks to send CTRL-ALT-DEL when the left CTRL and left ALT keys are held, and backspace is pressed. This mainly benefits Windows users but is useful in many other cases as well. The EC firmware has also a fix where the keyboard could fail to init properly if the keys were pressed (read: walked on by your cat) in between the firmware loaded and Linux re-initializing the keyboard.

Lastly, Baytrail devices got some tweaks to the audio device which should allow them to have functional audio under Windows once coolstar finishes writing the codec driver. After this update, Windows will identify and load the driver for the SST audio device, and will show the volume control on the taskbar, but sound will not yet be functional. Keep an eye out on [/r/chrultrabook](https://www.reddit.com/r/chrultrabook) for the driver release announcement (and please don't ask when it will be done / if you can help test - we've got everything we need ATM). Linux users are unaffected; audio is working for Baytrail in GalliumOS, and should work in other distros once kernel 4.11 is released, assuming the distro's kernel is configured to load the driver.

As usual, the full list of changes can be found [on my github repos](https://github.com/MrChromebox/coreboot/commits/2017.03.19).



## EC Firmware updates For Everyone! (almost)

(2017.02.21)

The big feature in this release is that we're now able to update not only the main system firmware, but also the firmware for the embedded controller (EC) on Chromebooks as well. This has a few immediate benefits:
 * The keyboard is now fully PS2 compliant, and should work OOTB without any special drivers on all OSes. Special drivers are still needed for the correct mapping of the media keys, but you no longer have to use an external keyboard to install Windows (eg).
 * Resume from suspend via opening the lid is now fixed on all Haswell Chromebooks (Falco, Leon, Peppy, and Wolf)
 * Adjusted the fan speeds on the HP Chromebook 14 G1 (Falco), which was a universal complaint from all owners

While updating the EC firmware is something that's usually fraught with dragons, on Chromebooks it's easy and safe: the EC maintains two copies of the firmware - a read-only (RO) copy and a read-write (RW) copy. When the system boots, the main firmware checks that the version of the EC RW firmware matches what's expected; if there's a mismatch, the RW copy gets updated. Upon successful update, or if no update is needed, the EC is rebooted using the RW firwmare and system boot proceeds as normal. If there's a problem updating, then the EC uses the RO firmware and an update attempt is made again on the next reboot. All of this is completely transparent to the end user, and adds less than 0.1s to the boot time.

These EC firmware updates are included for all Haswell, Broadwell, and Baytrail Chromebooks running the UEFI Full ROM firmware. Older SandyBridge/IvyBridge devices don't use Google's ChromeEC, so can't be updated. Chromeboxes don't use an EC, so this doesn't apply to them.

There's also a handful of other fixes and improvements too:
 * UEFI firmware added for the HP Pavilion Chromebook 14 (butterfly)
 * Fixed an issue related to external display detection on Chromeboxes
 * Fixed a power-management related issue with the PCH (platform controller hub) on Broadwell devices, which should translate into slightly better battery life

As usual, the full list of changes can be found [on my github repo](https://github.com/MrChromebox/coreboot/commits/2017.02.21).



## Two Steps Forward, One Step Back?

(2017.01.27)

Despite our best efforts, it seems a few gremlins snuck into the 01/23 release, so pushing a new round of UEFI firmware to address the issues that popped up:
 * fixed trackpad functionality on Banjo
 * fixed Windows Display output on Gandolf, Guado, Rikku, and Tidus
 * fixed touchscreen functionality on Clapper and Glimmer
 * increased graphics memory pre-allocation (DVMT) on Baytrail devices from 64 to 128MB
 * reverted Legacy Boot (SeaBIOS) Full ROM firmware to previous release to fix backlight control issue
 * removed Legacy Boot (SeaBIOS) Full ROM firmware for Baytrail devices, as it wasn't thoroughly tested, and really isn't necessary since BYT devices have the BOOT_STUB firmware option

As usual, the full list of changes (and source code) can be found [on my github repo](https://github.com/MrChromebox/coreboot/commits/2017.01.27).



## Holy Baytrail, Batman!

(2017.01.23)

It's been a long time coming, but we finally have proper support for all 15(!) Baytrail devices (Celeron N2xxx). All BYT devices now have UEFI Full ROM firmware, fully capable of running Windows\*\* and Linux; Legacy (SeaBIOS) Full ROMs are also available, but most users will be better served by the UEFI firmware.

Additionally, other devices received a handful of fixes and improvements too:
 * fixed VGA output on UEFI firmware for Samsung Series 3 Chromebox (STUMPY); DisplayPort still non-functional as the primary/only output however
 * fixed intermittent issue with UEFI pre-boot graphics init on some devices with 1080p (or higher) displays
 * devices with a Google Embedded Controller (EC) now boot with their updated RW firmware (vs the base RO firmware) active

As usual, the full list of changes can be found [on my github repo](https://github.com/MrChromebox/coreboot/commits/2017.01.23).

\*\* Built-in audio (including the headphone jack) will not work on Baytrail devices due to lack of audio drivers from the manufacturer; this is not something we're able to hack ourselves unfortunately. HDMI audio is functional, and Bluetooth/USB audio devices will work without issue as well.



## So Long, SeaBIOS!

(2016.12.14)

After months of hard work, we've finally managed to extricate SeaBIOS from the UEFI firmware -- now they directly boot into the UEFI payload (Tianocore) without using SeaBIOS as a shim. This paves the way for many future improvements, like functional NVRAM for saving the UEFI settings/boot paths (hopefully).

In the meantime, this release has a handful of notable fixes and improvements:
 * boot times should be another 2-3s quicker
 * the coreboot logo has been added to the Windows boot screen
 * CPU type text justification fixed in the firmware settings screen on the Acer c710
 * Virtualization (vmx / VT-x) is fixed for the Acer c710
 * the Intel Management Engine (ME) has been correctly re-enabled for the Acer c710 (which should fix long resume from sleep times)
 * fixed reporting of battery details (make/model/serial #) for Chromebooks

As usual, the full list of changes can be found [on my github repo](https://github.com/MrChromebox/coreboot/commits/2016.12.14).



## Another round of UEFI Updates

(2016.12.08)

This UEFI release adds pre-OS HDMI video output for Chromebooks; previously, on many models, the firmware settings and boot manager screens were visible only on the internal display - now they should be visible on both internal and external displays. Though external displays do take a lot longer to turn on/init, so there may be a 2-3s delay defore output is visible.

There are also fixes for the power LED on the Dell Chromebox 3010 (Tricky) and for the trackpad on the Dell Chromebook 13 7310 (Lulu) which previously required a kernel command-line parameter to work around a fix for the Windows trackpad driver - it should work OOTB now for all Linux distros outside of ChromiumOS/CloudReady, which doesn't include the correct driver/config (still). Also, the master display clock on Broadwell devices has been bumped back up (now that the HDMI audio issue has been resolved), which should enable 2160p60 (4K 60Hz) output on capable devices (Chromeboxes, Pixel2).



## More UEFI Improvements, new ROMs for Haswell Chromeboxes

(2016.11.27)

This UEFI release fixes some issues with backlight control for Haswell Chromebooks under Linux and OS X/MacOS, adds support for 3 new Haswell Chromebox models (Acer/McCloud, Dell/Tricky, and HP/Zako) which were previously handled by the firmware for the Asus model (Panther). Handling them separately allows for better control of the power LEDs (and their blinking state on McCloud/Tricky) and fan speeds optimized for each model.

Additionally, the UEFI firmware now has the option to select either internal (SSD) or external (USB/SD) storage as the preferred boot target at time of install; previously it was fixed at external. Regardless of which option is selected, the boot menu is available by hitting ESC (or any key other than Enter) while the progress bar is visible at the bottom of the screen, then selecting 'Boot Manager' from the UEFI firmware setup menu. Once we have the ability to save the firmware settings, choosing the boot priority at install time will no longer be necessary.



## Huge improvements in UEFI Firmware! (for all devices with UEFI firmware)

(2016.11.17)

Thanks in no small part to the efforts of [coolstar](https://www.reddit.com/user/coolstarorg), we are now able to say goodbye to the VGA BIOS in our UEFI firmware, relying excusively on the EFI GOP driver. This fixes a whole slew of audio/video related problems, including HDMI audio under Windows (now works OOTB for all devices), Windows installer video mode/output (particularly on the SandyBridge c710), and many others.

Additionally, there's a handful of other fixes as well:
 * Haswell Chromeboxes: fix fan spinup under Windows
 * All Haswell devices: increase default video memory (DVMT) from 32MB to 96MB (putting it back on par with Broadwell)
 * All Broadwell devices: fix HDMI audio speedup under Windows using previous 'intel_audio_enable.exe' method
As usual, the full list of changes can be found [on my github repo](https://github.com/MrChromebox/coreboot/commits/2016.11.17).



## Full ROM support added for Monroe

(2016.11.07)

A device-specific Full ROM has been added for Monroe, the Haswell-based LG Chromebase. Previously, Monroe was covered under the Haswell Chromebox umbrella, but it was brought to my attention that there are enough differences to warant a separate build.

Additionally, a whole slew of fixes are included for other devices as well:
 * Parrot: use correct interrupt values for SandyBridge/IvyBridge variants under Linux
 * Parrot: include SD/MMC drivers to support booting from SD under UEFI
 * Panther: add USB ACPI port definitions to improve Windows, OS X support
 * Haswell/Broadwell Chromeboxes: increase timeout to enter UEFI setup at boot
 * a few other minor fixes that escape me

Edit: also updated Stumpy (Samsung Series 3 Chromebox) to automatically power on after AC power lost, and to fix the power LED.



## Fix for SandyBridge-based Acer C710 (Parrot)

(2016.10.20)

Shortly after the release of the Full ROM firmware for the Acer C710 (Parrot), we discovered a bug affecting the amount of RAM reported by Linux/Windows on the SandyBridge (Celeron 847U) models; it also caused some significant performance issues as well. This issue has now been corrected. IvyBridge (Celeron 1007U) models were not affected.

Also, the Firmware Utility Script main menu got a minor facelift, improving readability and now fitting properly inside a standard 80x25 terminal.



## Full ROM Support Added for Acer C710 (Parrot)

(2016.10.15)

After several weeks of testing and debugging, support for the Acer C710 (Parrot) is finally ready. Full ROM firmware (both UEFI and Legacy boot) is available for both the SandyBridge (Celeron 847U) and IvyBridge (Celeron 1007U) variants, which supports booting both Linux and Windows (Win7 and above). There are a few outstanding issues with suspend/resume, but overall everything functions as it should. A big thanks to [ReddestDream](https://www.reddit.com/user/ReddestDream) and [coolstar](https://www.reddit.com/user/coolstarorg) for their efforts. As usual, the best place to get support is on [the chrultrabook subreddit](https://www.reddit.com/r/chrultrabook).

Also, the Full ROMs (both Legacy and UEFI) for Broadwell devices have been updated with a fix for the ACPI backlight controls under Linux; the workaround of using an xorg.conf file to blacklist the ACPI controls is no longer needed.



## Audio fix for Auron devices

(2016.09.29)

Just a quick update to the Full ROMs for Auron devices (Auron_Paine and Auron_Yuna - Acer c740/c910 respectively) which fixes an audio output issue. The 09/22 firmware introduced a bug which broke the headphone jack output, this is simply a bug fix release for that.



## More Full ROM Firmware Updates

(2016.09.22)

Today's Full ROM updates feature improved support for ACPI S4/hibernate low-power mode. Previously, devices would enter S4/hibernate but still be using the same amout of power as S3/suspend, leading to excessive power (battery) drain. Additionally, many devices would fail to wake (consistently, or at all) when opening the lid while hibernated, requiring the use of the power button to wake. Both of those issues have been fixed for the Full ROM firmware for all supported devices\*.

\* Mostly - some Acer C720 (PEPPY) users have reported lid wake not working for S4 or S5 still - issue is under investigation.

And while I previously said the last update would be the final Full ROM for any supported Baytrail devices, I didn't want to leave them out of this update, so **this** will be the final one. For reals.



## Full ROM Firmware Update for HSW/BDW

(2016.09.18)

Today's Full ROM updates feature an updated VGA BIOS (VBIOS) for Haswell Chromebooks, which speeds up initial power on a bit (by not setting a video mode that's never used), as well as a Wifi fix for all devices using an Intel wifi card (the issue seemed to not affect most users, but there's no harm in the fix).

It's also the last set of Full ROMs I'll be offering for Baytrail Chromebooks, since the current Full ROMs 1) don't offer any real advantage over the BOOT_STUB firmware, 2) introduce some minor issues, like not always powering on when the lid opens, 3) only cover a handful of Baytrail devices, and 4) never fulfilled their original goal of making the devices usable under Windows, due to lack of working trackpad/touchscreen/sound. I'll keep the code around in a separate branch in case anyone wants to build their own from my sources, but it won't be updated and I won't be distributing new builds after today (unless something happens to change the conditions above).



## New Script Functions: Remove/Restore ChromeOS Bitmaps

(2016.09.15)

Lots of people use ChromeOS in Developer Mode, and the one thing they can all agree on is that the bright white Developer Mode boot screen is a retina-searing travesty. To that end, I've added a new script function which removes the ChromeOS bitmap images used for the Developer Mode and Recovery Mode splash screens, which leaves your device with a simple and pleasant black screen with white text:

<p align="center"> <img src="/images/devmode_normal.png" alt="Developer Mode boot screen" width="300"/>
&nbsp;&nbsp;becomes&nbsp;&nbsp;
<img src="/images/dev_no_bmp.png" alt="Developer Mode text only" width="300"/></p>

If you want to restore the stock bitmaps, the [Firmware Utility Script](docs/fwscript) has you covered there too :)

Edit: Sadly this doesn't work on Skylake Chromebooks, as they use a different method to render these bitmap images, and removing them from the firmware results in a solid white screen, not a solid black one.



## Legacy and UEFI Full ROMs added for all Haswell/Broadwell devices

(2016.09.06)

Haswell/Broadwell device owners now have the option of flashing a Full ROM with either Legacy Boot (SeaBIOS) or UEFI Boot (Tianocore). UEFI booting is needed/optimal for users who want to run Windows, OS X, or a multi-boot setup; Most Linux users will need to install a boot manager such as [rEFInd](http://www.rodsbooks.com/refind/) since the UEFI firmware currently only looks for the default EFI boot path (`EFI\BOOT\BOOTX64.EFI`). GalliumOS users will want to stick with the Legacy Boot option, since GalliumOS isn't UEFI compatible yet.

All Full ROMs feature improvements to the SMBIOS tables, which fixes the amount of RAM reported to the system (mainly affected Windows and OS X). Haswell/Broadwell Full ROMs also get fixes to the onboard audio, which improve the headphone jack detection/functionality, and fix the subsystem ID reported so that Windows will automatically install the correct drivers via Windows Update. Baytrail Full ROMs have been updated with a fix for battery status under Windows.



## Skylake RW_LEGACY support added

(2016.08.05)

RW_LEGACY firmware support has been added for current Skylake-based Chromebooks (CHELL, LARS, SENTRY). While these models may have included basic RW_LEGACY functionality stock, this improved version features proper video initialization in Legacy Boot Mode, resulting in the correct screen resolution being set (ie, text is more readable) and screen redraws are significantly faster (ie, instant). And, like all firmware updates offered via the Firmware Utility Script, it allows the user to set their preferred boot device in Legacy Boot Mode (either internal storage or external USB/SD).

Additionally, a Full ROM firmware was added for the 2014 Dell Chromebook 11 (CANDY), and several improvements were made to the script related to eMMC controller address support for Baytrail devices.



## (Preliminary) Braswell support added

(2016.07.30)

RW_LEGACY firmware support has been added for current Braswell-based Chromebooks (Celeron N3xxx models: CELES, CYAN, EDGAR, REKS, TERRA, ULTIMA). I don't have confirmation of the eMMC and SD card controller addresses for all of them (only CYAN and EDGAR so far), so eMMC/SD might not show up in the SeaBIOS boot menu for some models. In that case, drop me a line and I'll give you instructions to retrieve the firmware boot log, which will tell me the correct addresses.

Unfortunately, Linux support for Braswell is still pretty spotty. I was able to boot/install GalliumOS, but the keyboard, sound, touchscreen, and a few other things didn't work yet. Wifi/BT worked fine, so an external keyboard was all I needed for it to be usable.

**Update:** another Braswell user tested Fedora 24 (Gnome, Cinnamon, MATE) and reported that the keyboard works properly, but not the trackpad (which isn't surprising, since GalliumOS uses a custom/ported ChromeOS driver for it); Ubuntu 16.04 wouldn't boot, but Mint 18 did (albeing without a working keyboard/trackpad).

Also, the syslinux bootloader used for installing LibreELEC in dual-boot and external USB configurations has been updated, as well as the flashrom binary used on non-ChromeOS/ChromiumOS systems. Both were updated to add Braswell support, and didn't appear problematic on older platforms in my (albeit limited) testing here.



## Baytrail Windows Update

(2016.07.24)

All Baytrail Full ROMs have been updated to fix the detection/operation of emmc/SD storage controllers by Windows, so you can now install Windows onto the internal emmc (or at least access it if booting from external media). Unfortunately, the I2C bus functionality is not yet working, so an external mouse is required since the trackpad will be non-functional. Baytrail Full ROMs are currently available for ENGUARDE, GLIMMER, GNAWTY, NINJA, QUAWKS, and SWANKY. If you'd like support for your Baytrail Chromebook added, just let me know.

Also, fixed an issue with the Firmware Utility Script's listing of available USB devices for firmware backup on ChromeOS devices with emmc internal storage (vs SSD). Previously, the first USB device wasn't being displayed as the script assumed it was the internal ssd (and therefore excluded it).



## A few bug fixes, plus Cloudready support

(2016.07.20)

As is usual with changes of this magnitude, a small bug or two emerged (related to the Stock Firmware Restore functionality of the Firmware Utility Script) and were promptly fixed. Also, support has been addded for Neverware's Cloudready OS, a ChromiumOS derivative. It uses a slightly different partition layout than ChromeOS/ChromiumOS, and the scripts were not prepared for it. Clouldready is handled the same as ChromiumOS - that is, ChromeOS-specific functions are still locked out/not available.



## New Site, New Firmware, New Script Functions!

(2016.07.19)

Along with the revamped website, all firmware files have been rebuilt and updated using the latest sources. Plus, Full ROM firmware has been added for several BayTrail Chromebooks (ENGUARDE, GLIMMER, GNAWTY, and SWANKY) with more to come in the near future.

Additionally, the Firmware Utility Script's **Restore Stock Firmware** function has been updated to support all Haswell, Broadwell, and Baytrail ChromeOS devices - even if you don't have a backup file available. The **Restore Stock BOOT_STUB** function has likewise been updated to support all Baytrail devices, even those flashed with BOOT_STUB firmware from another party.

Check out the [Firmware Utility Script](docs/fwscript) info page for all the details.

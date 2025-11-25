# Glossary

Common terms and acronyms used in ChromeOS firmware and the MrChromebox project.

## A

**AltFw (Alternative Firmware)**
: The newer term for Legacy Boot Mode on recent ChromeOS devices. Accessed via the boot menu in Developer Mode, it allows booting alternative operating systems using firmware from the RW_LEGACY region.

**AUE (Auto Update Expiration)**
: The date when a ChromeOS device stops receiving automatic updates from Google. Also called End of Life (EOL). Devices past AUE have restrictions on RW_LEGACY firmware updates and stock firmware restoration.

## B

**BIOS (Basic Input/Output System)**
: Traditional PC firmware interface. ChromeOS devices don't use traditional BIOS - they use either stock ChromeOS firmware or can be flashed with custom firmware (like MrChromebox) which supports UEFI booting.

**Boot Stub**
: (Deprecated) A minimal firmware payload used on older ChromeOS devices to chainload an alternative bootloader.

## C

**cbfstool**
: Command-line utility for manipulating the coreboot File System (CBFS). Used to extract, add, or modify components in coreboot firmware images.

**cbmem**
: Command-line utility for reading the coreboot memory console log. Essential for debugging firmware issues.

**CBFS (Coreboot File System)**
: The file system used within coreboot firmware images to store payloads, configuration data, and other components.

**CCD (Closed Case Debugging)**
: A feature of CR50/Ti50 security chips that allows debugging and firmware manipulation without opening the device, using a SuzyQable cable.

**coreboot**
: Open-source firmware project that initializes hardware during boot. All ChromeOS devices (2013+) use coreboot as their firmware base. MrChromebox firmware uses upstream coreboot with (extensive) modifications.

**CR50**
: Google Security Chip (GSC) found in ChromeOS devices from 2017-2022. Controls hardware write protection and provides closed-case debugging features.

**crossystem**
: ChromeOS utility for reading and setting system properties and boot flags (e.g., enabling Legacy Boot Mode).

## D

**depthcharge**
: Google's custom firmware payload used in stock ChromeOS firmware to boot ChromeOS. It performs verified boot and loads the ChromeOS kernel.

**Developer Mode**
: A special boot mode that disables verified boot and allows root access to ChromeOS, booting alternative operating systems, and running the Firmware Utility Script. Required for firmware modifications.

## E

**EC (Embedded Controller)**
: A separate microcontroller in ChromeOS devices that manages keyboard, battery, thermal, and other low-level hardware functions. Has its own firmware separate from the main system firmware.

**edk2**
: Open-source UEFI firmware implementation from the TianoCore project. Used as the payload in MrChromebox UEFI Full ROM firmware and newer RW_LEGACY firmware.

**EOL (End of Life)**
: See AUE (Auto Update Expiration).

## F

**Firmware Utility Script**
: MrChromebox's bash script (`firmware-util.sh`) for installing, updating, and managing custom firmware on ChromeOS devices.

**flashrom**
: Open-source utility for reading, writing, verifying, and erasing flash ROM chips. Used by the Firmware Utility Script to flash firmware.

**Full ROM**
: See UEFI Full ROM Firmware.

## G

**GBB (Google Binary Block)**
: A data structure in ChromeOS firmware containing hardware ID, recovery keys, and boot flags. GBB Flags control boot behavior in Developer Mode.

**GBB Flags**
: Firmware-level settings that modify ChromeOS boot behavior in Developer Mode, such as boot timeout, default boot target, and Developer Mode protection.

**GSC (Google Security Chip)**
: Generic term for Google's security chips (CR50 or Ti50) that control hardware write protection and provide security features.

**gsctool**
: Command-line utility for interacting with the Google Security Chip (CR50/Ti50). Used for CCD operations and firmware updates.

## H

**HWID (Hardware ID)**
: A unique identifier for each ChromeOS device model (e.g., "BANSHEE A2A-B3C-D4E"). Also called the board name. Used by ChromeOS for device identification and by the Firmware Utility Script for device detection.

## I

**IFD (Intel Flash Descriptor)**
: Data structure in Intel firmware that defines the layout of the SPI flash chip, including regions for BIOS, ME, and other components.

## L

**Legacy Boot Mode**
: Older term for booting alternative operating systems using the RW_LEGACY firmware region. Accessed via `CTRL+L` in Developer Mode on older devices. See also AltFw.

## M

**ME (Management Engine)**
: Intel's proprietary firmware subsystem that runs independently of the main processor. On ChromeOS devices with MrChromebox UEFI Full ROM firmware, the ME can be enabled/disabled from the Platform Setup menu.

**MRC Cache (Memory Reference Code Cache)**
: Cached memory training data that speeds up boot times. Stored in the firmware flash chip and reused across boots to avoid re-training RAM.

## N

**Normal Mode**
: The default ChromeOS boot mode with full verified boot enabled. Only allows booting Google-signed ChromeOS images.

**NVRAM (Non-Volatile Random Access Memory)**
: Memory that retains data when power is off. In UEFI firmware, stores boot configuration (boot order, UEFI settings). RW_LEGACY firmware lacks persistent NVRAM.

## P

**Payload**
: The firmware component executed by coreboot to boot the operating system. Examples: depthcharge (ChromeOS), SeaBIOS (Legacy BIOS), edk2 (UEFI).

**PP (Physical Presence)**
: A security mechanism requiring physical interaction (typically pressing the power button) to confirm certain operations like opening CCD. Prevents remote attacks.

## R

**Recovery Mode**
: A special boot mode for restoring ChromeOS and RW firmware components from recovery media. Entered via `ESC+Refresh+Power` (Chromebooks) or recovery button (Chromeboxes).

**RO (Read-Only)**
: Firmware regions protected from modification when write protection is enabled. Contains core boot code and recovery components.

**RW (Read-Write)**
: Firmware regions that can be updated without disabling write protection. Contains updateable firmware components.

**RW_LEGACY**
: A firmware region in stock ChromeOS firmware that can contain an alternative bootloader payload (SeaBIOS or edk2) for booting non-ChromeOS operating systems. Accessed via Legacy Boot Mode/AltFw.

## S

**SeaBIOS**
: Open-source legacy BIOS implementation. Used as the payload in older RW_LEGACY firmware implementations.

**SMMSTORE**
: A firmware region used by UEFI firmware to store NVRAM variables (boot order, settings). Emulates UEFI NVRAM on systems without a dedicated NVRAM chip.

**SPI (Serial Peripheral Interface)**
: Communication protocol used for firmware flash chips on ChromeOS devices.

**Stock Firmware**
: The original ChromeOS firmware installed by Google/the manufacturer. Can be restored from a backup or extracted from a recovery image.

**SuzyQable / SuzyQ Cable**
: A special USB Type-C debugging cable used for Closed Case Debugging (CCD) on CR50/Ti50 devices. Allows firmware manipulation without opening the device.

## T

**Ti50**
: Google Security Chip (GSC) found in ChromeOS devices from 2023 onwards. Successor to CR50 with additional security features including AP RO Verification.

**Tianocore**
: The project name for edk2. Sometimes used interchangeably with edk2.

## U

**UEFI (Unified Extensible Firmware Interface)**
: Modern firmware standard that replaced legacy BIOS. Provides features like secure boot, boot manager, and graphical setup menus.

**UEFI Full ROM Firmware**
: MrChromebox's complete firmware replacement for ChromeOS devices. Completely replaces stock firmware with coreboot + edk2, enabling full UEFI boot with persistent NVRAM and boot manager.

## V

**Verified Boot**
: ChromeOS security feature that cryptographically verifies firmware and OS components before executing them. Prevents unauthorized modifications.

**VPD (Vital Product Data)**
: Device-specific data stored in firmware including serial number, region, and other manufacturing information. Should be backed up before flashing custom firmware.

## W

**WP (Write Protection)**
: Security mechanism that prevents modification of firmware regions. Consists of hardware write protection (physical mechanism) and software write protection (flash chip registers). Must be disabled to flash UEFI Full ROM firmware.

**WP Screw**
: A screw used on some ChromeOS devices (2013-2017) to enable hardware write protection. Removing it disables hardware WP.

## Related Documentation

- **[Getting Started](/docs/getting-started.md)** - Begin your firmware journey
- **[FAQ](/docs/faq.md)** - Frequently asked questions
- **[Firmware Types](/docs/firmware/types.md)** - Understanding firmware options
- **[Firmware Utility Script](/docs/fwscript.md)** - Script documentation


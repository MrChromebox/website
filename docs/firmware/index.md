# ChromeOS Device Firmware

## Overview

ChromeOS devices use a sophisticated firmware architecture built around several open-source projects. Understanding this architecture is essential when modifying your device to run alternate operating systems. This page provides a comprehensive overview of how ChromeOS firmware works and the different modification options available.

## Firmware Architecture

The firmware used by ChromeOS devices consists of two main components:

1. **Hardware Initialization**: [coreboot](http://www.coreboot.org) - an open-source firmware project that initializes the hardware (CPU, RAM, chipset, etc.)
2. **Payloads**: One or more programs that are executed by coreboot to either boot an operating system or provide additional functionality:
   - **depthcharge**: The verified boot payload used to boot ChromeOS
   - **SeaBIOS**: Legacy BIOS payload for older devices' Legacy Boot Mode
   - **edk2** (Tianocore): UEFI payload used on newer devices' Alternative Firmware Menu and in UEFI Full ROM firmware

The firmware resides on a dedicated SPI flash chip (typically 8MB or 16MB) and is divided into several distinct regions, each serving a specific purpose.

## Firmware Layout and Regions

ChromeOS firmware uses a specific layout with multiple regions, some read-only and some read-write. The example below shows a modern 16MB firmware layout (Alderlake/Raptorlake platform):

```
┌─────────────────────────────────────────────────────────────┐
│  FLASH (16MB Total)                                         │
├─────────────────────────────────────────────────────────────┤
│  SI_ALL (3712K) - Intel Management Engine & Descriptor      │
│    ├─ SI_DESC (4K)   - Flash descriptor                     │
│    └─ SI_ME          - Management Engine firmware           │
├─────────────────────────────────────────────────────────────┤
│  SI_BIOS (12672K) - Main BIOS Region                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ READ-WRITE SECTIONS                                   │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RW_SECTION_A (3956K) - ChromeOS Firmware Slot A       │  │
│  │   ├─ VBLOCK_A (8K)        - Verification block        │  │
│  │   ├─ FW_MAIN_A            - Main firmware (CBFS)      │  │
│  │   └─ RW_FWID_A (64 bytes) - Firmware version ID       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RW_LEGACY (512K) - Alternative boot payload (CBFS)    │  │
│  │   Used for Legacy Boot Mode / Alternative Firmware    │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RW_MISC (152K) - Read-Write data regions              │  │
│  │   ├─ UNIFIED_MRC_CACHE (128K) - Memory training       │  │
│  │   │   ├─ RECOVERY_MRC_CACHE (64K)                     │  │
│  │   │   └─ RW_MRC_CACHE (64K)                           │  │
│  │   ├─ RW_ELOG (4K)        - Event log                  │  │
│  │   ├─ RW_SHARED (4K)      - Shared data                │  │
│  │   ├─ RW_VPD (8K)         - Read-write VPD             │  │
│  │   └─ RW_NVRAM (8K)       - UEFI NVRAM variables       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RW_SECTION_B (3956K) - ChromeOS Firmware Slot B       │  │
│  │   ├─ VBLOCK_B (8K)        - Verification block        │  │
│  │   ├─ FW_MAIN_B            - Main firmware (CBFS)      │  │
│  │   └─ RW_FWID_B (64 bytes) - Firmware version ID       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ WP_RO (4MB) - WRITE-PROTECTED READ-ONLY REGION        │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RO_VPD (16K)        - Read-only Vital Product Data    │  │
│  │                       (Serial #, MAC, region, etc.)   │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RO_GSCVD (8K)       - Google Security Chip data       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ RO_SECTION          - Read-only firmware              │  │
│  │   ├─ FMAP (2K)      - Flash map (layout descriptor)   │  │
│  │   ├─ RO_FRID (64B)  - Read-only firmware ID           │  │
│  │   ├─ GBB (12K)      - Google Binary Block             │  │
│  │   │                   (Flags, keys, bitmaps, HWID)    │  │
│  │   └─ COREBOOT       - Bootblock and RO coreboot       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

::: tip NOTE
Firmware layout varies by platform and total flash chip size (4MB, 8MB, or 16MB). Older devices have simpler layouts with fewer regions. The layout shown above represents a modern Intel Alderlake/Raptorlake device with a 16MB flash chip.
:::

### Read-Write (RW) Regions

These regions can be updated without disabling hardware write protection:

**Main ChromeOS Firmware Slots (A/B redundancy for reliability):**
- **RW_SECTION_A / RW_SECTION_B**: Contain the depthcharge payload and ChromeOS verified boot firmware. ChromeOS updates alternate between these slots, providing fallback capability if an update fails.

**Alternative Boot Payload:**
- **RW_LEGACY**: Contains an alternate boot payload (SeaBIOS or edk2) that can be used to boot non-ChromeOS operating systems. This is what gets updated when you install RW_LEGACY firmware via the Firmware Utility Script.

**Data and Cache Regions:**
- **UNIFIED_MRC_CACHE** / **RW_MRC_CACHE**: Memory Reference Code training data. Stores RAM initialization parameters for faster subsequent boots (first boot after firmware flash requires RAM training, which takes 20-30+ seconds).
- **RW_ELOG**: Event log for firmware and boot events
- **RW_SHARED**: Shared data between RO and RW firmware
- **RW_VPD**: Read-write VPD for user-modifiable data
- **RW_NVRAM**: Storage for UEFI firmware variables (on supported devices)

### Read-Only (RO) Regions (Write-Protected)

The **WP_RO** region at the bottom of the layout is read-only, enforced by [hardware and software write protection](/docs/firmware/wp/index.md). Modifying these regions requires disabling HW WP:

- **RO_VPD** (Vital Product Data): Contains device-specific information like serial number, region, manufacturing data, and MAC address. This data is critical for warranty and device identification and should be preserved when flashing custom firmware.
- **RO_GSCVD**: Google Security Chip (CR50/Ti50) data
- **GBB** (Google Binary Block): Contains firmware configuration flags (GBB flags), keys for verified boot, ChromeOS bitmaps, and hardware ID (HWID). The Firmware Utility Script can modify GBB flags to change boot behavior (timeout, default boot target, Developer Mode enforcement).
- **RO_FRID**: Read-only firmware version identifier
- **COREBOOT**: The main coreboot bootblock and read-only code that initializes hardware
- **FMAP**: Flash map - a descriptor that defines the layout of all firmware regions

### Management Engine Region

- **SI_ALL** (Intel platforms only): Contains the Intel Management Engine (ME) firmware and flash descriptor. The ME is a separate microcontroller that handles low-level platform management. Custom UEFI Full ROM firmware uses a stripped-down ME for minimal functionality.

## Understanding Write Protection

Write protection is a security feature that prevents unauthorized modification of critical firmware regions. It consists of two components:

1. **Hardware Write Protection (HW WP)**: A physical mechanism (screw, jumper, or battery disconnect) that prevents firmware modification at the hardware level
2. **Software Write Protection (SW WP)**: A software flag that can be disabled in Developer Mode (when HW WP is also disabled)

To perform certain firmware modifications (installing UEFI Full ROM, setting GBB flags, restoring stock firmware), hardware write protection **must** be disabled. See the [Write Protection documentation](/docs/firmware/wp/index.md) for detailed information.

## Firmware Modification Types

When we talk about updating or modifying the firmware on ChromeOS devices, we're typically referring to one of three approaches:

### 1. RW_LEGACY Firmware

- Updates **only** the RW_LEGACY region of your existing stock firmware
- Allows dual-booting ChromeOS and an alternate OS (typically Linux)
- Does **not** require disabling hardware write protection
- ChromeOS remains fully functional
- Boot via `CTRL+L` in Developer Mode
- See [Firmware Types: RW_LEGACY](/docs/firmware/types.md#rw_legacy-firmware) for details

### 2. UEFI Full ROM Firmware

- **Completely replaces** the stock firmware with custom coreboot + UEFI firmware
- **Removes** ChromeOS capability - device will only boot alternate OSes
- **Requires** disabling hardware write protection
- Provides better hardware support and functionality for Linux/Windows
- Automatically preserves critical data (HWID, VPD, serial number)
- See [Firmware Types: UEFI Full ROM](/docs/firmware/types.md#uefi-full-rom-firmware) for details

### 3. BOOT_STUB Firmware (Deprecated)

- Formerly available on some older Baytrail/Braswell devices
- Removes ChromeOS but keeps minimal stock firmware
- Less common; generally superseded by UEFI Full ROM
- See [Firmware Types: BOOT_STUB](/docs/firmware/types.md#boot_stub-firmware) for details

## Choosing Between RW_LEGACY and UEFI Full ROM

Not sure which firmware option is right for you? Here's a quick decision guide:

### Choose RW_LEGACY if you want to:
- **Keep ChromeOS** and dual-boot with Linux
- Avoid hardware modifications (no need to disable write protection)
- Have a simple, reversible setup
- Test Linux compatibility before fully committing

### Choose UEFI Full ROM if you want to:
- **Replace ChromeOS** completely with Linux or Windows
- Get the best hardware support and performance
- Use modern UEFI features (Secure Boot, boot manager, etc.)
- Have full control over the firmware and boot process

::: tip NOTE
RW_LEGACY has some limitations compared to UEFI Full ROM, including no UEFI NVRAM support for persistent boot entries, potential display initialization delays, and platform-specific quirks. For the best experience running an alternate OS, UEFI Full ROM is recommended.
:::

## Boot Flow Overview

Understanding how the firmware boots helps clarify the differences between stock and custom firmware:

### Stock ChromeOS Firmware Boot Flow

1. Power on → coreboot hardware initialization
2. Verify firmware integrity (verified boot)
3. Load depthcharge payload
4. Check for Recovery/Developer Mode
5. In Developer Mode, user can press:
   - `CTRL+D` → Boot ChromeOS (default)
   - `CTRL+L` → Boot RW_LEGACY payload (if installed)
   - `CTRL+U` → Boot from external USB (ChromeOS only)
6. Boot ChromeOS from internal storage

### UEFI Full ROM Boot Flow

1. Power on → coreboot hardware initialization
2. Load edk2 (Tianocore) UEFI payload
3. Display (coreboot) boot logo
4. Press ESC for UEFI setup menu
5. Check boot order from NVRAM
6. Attempt to boot from devices in order (internal NVMe/eMMC, USB, SD card, network)
7. If no bootable device found, drop to the UEFI shell

## MrChromebox Custom Firmware vs Stock

MrChromebox custom firmware offers several advantages over stock Google firmware:

**For RW_LEGACY Updates:**
- Proper video initialization (readable text, faster redraws)
- edk2 (UEFI) payload on newer devices for better OS compatibility
- Configurable default boot device
- Improved hardware support

**For UEFI Full ROM:**
- Complete UEFI environment with modern features
- NVRAM support for persistent boot configuration
- Better display initialization and resolution support
- Includes EC (Embedded Controller) firmware updates on Chromebooks for improved hardware support
- Automatic data preservation (VPD, HWID, serial number, RW_MRC_CACHE, SMMSTORE)
- Regular updates with latest coreboot and edk2 improvements
- Optimized for running Linux and Windows

## Additional Resources

- **[Firmware Types](/docs/firmware/types.md)**: Detailed explanation of each firmware type
- **[Flashing Firmware](/docs/firmware/flashing-firmware.md)**: How to install firmware using the Firmware Utility Script
- **[Write Protection](/docs/firmware/wp/index.md)**: Understanding and disabling write protection
- **[Updating Firmware](/docs/firmware/updating-firmware.md)**: How to update already-installed UEFI firmware
- **[Manual Flashing](/docs/firmware/manual-flashing.md)**: Advanced: manually flash firmware without the script
- **[Firmware Utility Script](/docs/fwscript.md)**: Complete guide to the script's features and functions

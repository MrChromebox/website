# Documentation Sitemap

Complete overview of all available documentation on MrChromebox.tech.

## Quick Links

- **[Getting Started](/docs/getting-started.md)** - First-time user guide with decision tree
- **[FAQ](/docs/faq.md)** - Frequently asked questions
- **[Known Issues](/docs/known-issues.md)** - Common problems and solutions
- **[Glossary](/docs/glossary.md)** - Terms and acronyms explained
- **[Supported Devices](/docs/supported-devices.md)** - Device compatibility lookup

## Firmware Documentation

### Overview & Concepts
- **[Firmware Overview](/docs/firmware/index.md)** - ChromeOS firmware architecture explained
- **[Firmware Types](/docs/firmware/types.md)** - RW_LEGACY, UEFI Full ROM, BOOT_STUB
- **[Firmware Booting](/docs/firmware/booting.md)** - How firmware boots and boot order

### Installation & Updates
- **[Flashing Firmware](/docs/firmware/flashing-firmware.md)** - Using the Firmware Utility Script
- **[Updating Firmware](/docs/firmware/updating-firmware.md)** - Updating existing UEFI firmware
- **[Manual Flashing](/docs/firmware/manual-flashing.md)** - Advanced manual firmware flashing

### Write Protection
- **[Write Protection Overview](/docs/firmware/wp/index.md)** - Understanding hardware write protection
- **[Disabling Write Protection](/docs/firmware/wp/disabling.md)** - How to disable WP on your device

## Firmware Utility Script

- **[Script Documentation](/docs/fwscript.md)** - Complete feature reference
  - Install/Update RW_LEGACY
  - Install/Update UEFI Full ROM
  - Backup/Restore/Flash Custom Firmware
  - Set Boot Options (GBB Flags)
  - Set Hardware ID (HWID)
  - Device-specific functions
  - Clear UEFI NVRAM

## ChromeOS Boot Modes

- **[Boot Modes Overview](/docs/boot-modes/index.md)** - Understanding all boot modes with transition diagram
- **[Normal Mode](/docs/boot-modes/normal.md)** - Default ChromeOS verified boot
- **[Recovery Mode](/docs/boot-modes/recovery.md)** - Entering and using Recovery Mode
- **[Developer Mode](/docs/boot-modes/developer.md)** - Enabling and using Developer Mode
- **[Legacy Boot Mode](/docs/boot-modes/legacy.md)** - Booting alternate OSes with CTRL+L

## Reverting to Stock ChromeOS

- **[Reverting Overview](/docs/reverting/index.md)** - Options for restoring stock firmware
- **[Flashing Stock Firmware](/docs/reverting/flashing-stock.md)** - Restoring stock ChromeOS firmware
- **[ChromeOS Recovery USB](/docs/reverting/recovery-usb.md)** - Creating and using recovery media

## Support & Troubleshooting

### Getting Help
- **[Help & Support](/docs/support/index.md)** - Where to get help and how to report issues
- **[Making a Bootable USB](/docs/support/bootableusb.md)** - Creating OS installation media
- **[Debugging](/docs/support/debugging.md)** - Collecting logs and diagnostic information
- **[Compiling Firmware](/docs/support/compiling.md)** - Building custom firmware from source

### Recovery
- **[Unbricking Overview](/docs/support/unbricking/index.md)** - Recovering from failed firmware flash
- **[Unbricking with CH341A](/docs/support/unbricking/unbrick-ch341a.md)** - External programmer recovery
- **[Unbricking with SuzyQable](/docs/support/unbricking/unbrick-suzyq.md)** - SuzyQ cable recovery

## Device Information

- **[Supported Devices](/docs/supported-devices.md)** - Complete device compatibility table
  - Search by board name (HWID)
  - Firmware type availability (RW_LEGACY, UEFI Full ROM)
  - Write protection method
  - Platform information

## Reference

- **[Glossary](/docs/glossary.md)** - Terms and acronyms
- **[FAQ](/docs/faq.md)** - Frequently asked questions
- **[Known Issues](/docs/known-issues.md)** - Common problems and solutions

## External Resources

### Community & Support
- **[Chrultrabook Forums](https://forum.chrultrabook.com/)** - Community help and discussions
- **[Chrultrabook Documentation](https://docs.chrultrabook.com/)** - OS installation and compatibility guides

### Development
- **[MrChromebox Firmware Issues](https://github.com/MrChromebox/firmware/issues/)** - Firmware bug reports
- **[MrChromebox Scripts Issues](https://github.com/MrChromebox/scripts/issues/)** - Script bug reports
- **[MrChromebox Website Issues](https://github.com/MrChromebox/website/issues/)** - Documentation improvements

### Technical References
- **[coreboot Documentation](https://doc.coreboot.org/)** - coreboot project documentation
- **[edk2/Tianocore Wiki](https://github.com/tianocore/tianocore.github.io/wiki)** - UEFI payload documentation
- **[ChromiumOS Docs](https://www.chromium.org/chromium-os/)** - ChromeOS developer documentation

## Quick Navigation by Use Case

### I want to...
- **Dual-boot ChromeOS and Linux** → [Getting Started: Dual Booting](/docs/getting-started.md#dual-booting-via-rw_legacy-firmware)
- **Replace ChromeOS with Linux/Windows** → [Getting Started: Replacing ChromeOS](/docs/getting-started.md#replacing-chromeos-via-full-rom-firmware)
- **Restore stock ChromeOS** → [Reverting to Stock](/docs/reverting/index.md)
- **Update my UEFI firmware** → [Updating Firmware](/docs/firmware/updating-firmware.md)
- **Fix a bricked device** → [Unbricking Guide](/docs/support/unbricking/index.md)
- **Check device compatibility** → [Supported Devices](/docs/supported-devices.md)
- **Get help with an issue** → [Help & Support](/docs/support/index.md)
- **Understand firmware types** → [Firmware Types](/docs/firmware/types.md)
- **Disable write protection** → [Write Protection Guide](/docs/firmware/wp/index.md)

## Documentation by Experience Level

### Beginners
1. [Getting Started](/docs/getting-started.md)
2. [Glossary](/docs/glossary.md)
3. [FAQ](/docs/faq.md)
4. [Boot Modes Overview](/docs/boot-modes/index.md)
5. [Firmware Utility Script](/docs/fwscript.md)
6. [Supported Devices](/docs/supported-devices.md)

### Intermediate
1. [Firmware Overview](/docs/firmware/index.md)
2. [Firmware Types](/docs/firmware/types.md)
3. [Write Protection](/docs/firmware/wp/index.md)
4. [Known Issues](/docs/known-issues.md)
5. [Reverting to Stock](/docs/reverting/index.md)

### Advanced
1. [Manual Flashing](/docs/firmware/manual-flashing.md)
2. [Debugging](/docs/support/debugging.md)
3. [Compiling Firmware](/docs/support/compiling.md)
4. [Unbricking](/docs/support/unbricking/index.md)


# Legacy Boot Mode / Alternative Bootloader (AltFw)

ChromeOS’ Legacy Boot Mode (old older devices) or Alternative Bootloader (aka AltFw, on newer devices) provides a method for booting an alternative OS by running a firmware payload from the RW_LEGACY firmware region. On older devices using Legacy Boot Mode, RW_LEGACY contains a single payload; on devices with AltFw, there can be multiple (though this feature is not used on most devices)

*   Unsupported (by Google) method for booting alternate OSes using the RW_LEGACY firmware region
    *   On older devices, the [SeaBIOS](http://www.seabios.org/) payload is used, providing a Legacy BIOS bootloader
    *   On newer devices, the [edk2](https://github.com/tianocore/edk2) (aka Tianocore) payload is used, providing a UEFI bootloader.
*   Accessed via `[CTRL+L]` on the developer mode boot screen (older devices) or Alternative Bootloader menu option (newer devices)
*   Requires explicit enabling in Developer Mode via command line: `sudo crossystem dev_boot_legacy=1 (or dev_boot_altfw=1)` (installing RW_LEGACY firmware via the [Firmware Utility Script](/docs/fwscript) will set these flags for you)
*   Most ChromeOS devices are not capable out of the box, and require a RW_LEGACY firmware update first

**Note:** If you hear two beeps after pressing `[CTRL+L]`, then either your device doesn't have a valid Legacy Boot Mode / RW_LEGACY firmware installed, or legacy boot/AltFw capability has not been been enabled via the crossystem flag(s) above.

Using the ChromeOS Firmware Utility Script to update your device's RW_LEGACY firmware region will address both of these issues, as it not only provides an updated, fully functional RW_LEGACY firmware, but also sets the required boot flag.

## Related Documentation

- **[Boot Modes Overview](/docs/boot-modes/index.md)** - Understanding all ChromeOS boot modes
- **[Developer Mode](/docs/boot-modes/developer.md)** - Required for Legacy Boot Mode
- **[Firmware Utility Script](/docs/fwscript.md)** - Installing RW_LEGACY firmware
- **[Firmware Types](/docs/firmware/types.md)** - RW_LEGACY vs UEFI Full ROM
- **[Booting Your OS](/docs/firmware/booting.md)** - Using the edk2 boot menu
- **[Known Issues](/docs/known-issues.md)** - RW_LEGACY limitations

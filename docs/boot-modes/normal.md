# Normal/Verified Boot Mode

In Normal/Verified Boot Mode, the read-only (RO) part of the firmware verifies the read-write (RW, aka updateable) part of the firmware, then executes it. The RW firmware verifies all other firmware is up-to-date (EC, power delivery, touchpad, touchscreen, storage, etc), verifies the (active) ChromeOS kernel on the internal storage, then boots the OS.

*   Can only boot Google-signed ChromeOS images
*   Full verification of firmware and OS kernel
*   No root (sudo) access to the system, no ability to boot Linux natively (aka bare metal)
*   Automatically boots to Recovery Mode if any step of Verified Boot fails
*   This is the default / out-of-the-box configuration for all ChromeOS devices

## Related Documentation

- **[Boot Modes Overview](/docs/boot-modes/index.md)** - Understanding all ChromeOS boot modes
- **[Developer Mode](/docs/boot-modes/developer.md)** - How to enable Developer Mode
- **[Recovery Mode](/docs/boot-modes/recovery.md)** - Entering and using Recovery Mode
- **[Getting Started](/docs/getting-started.md)** - Begin your firmware journey

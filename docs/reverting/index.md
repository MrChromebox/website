---
prev: false
next: flashing-stock
---
# Reverting to Stock ChromeOS

::: warning
If your device has hit AUE (Automatic Update Expiration), you will not be able to restore the stock ChromeOS firmware using the [Firmware Utility Script](/docs/fwscript.md); see the [FAQ](/docs/faq.md#misc)
:::

## Requirements

- A PC or laptop to make a ChromeOS recovery USB.
- An external drive like a USB drive or SD card that is at least 8GB.
- Another external drive that contains your stock ROM backup (if backup is available).
- An understanding that this guide has the potential to brick your device.

You can revert your firmware back to stock and reinstall ChromeOS.

This is useful if you're planning to sell your device.

::: tip NOTE
If you only flashed RW_LEGACY firmware to your device, there is no need to flash the stock firmware back on the device -- you're already running it. Simply perform a ChromeOS USB recovery and exit Developer Mode.
:::

## Related Documentation

### Reverting Process
- **[Flashing Stock Firmware](/docs/reverting/flashing-stock.md)** - Step-by-step restoration process
- **[ChromeOS Recovery USB](/docs/reverting/recovery-usb.md)** - Creating and using recovery media

### Understanding Firmware
- **[Firmware Types](/docs/firmware/types.md)** - What you're reverting from (RW_LEGACY vs UEFI)
- **[Firmware Utility Script](/docs/fwscript.md)** - Script's backup and restore functions
- **[Write Protection](/docs/firmware/wp/index.md)** - Required for stock firmware restoration

### Troubleshooting
- **[Known Issues](/docs/known-issues.md)** - EOL device restrictions and common problems
- **[FAQ](/docs/faq.md)** - AUE/EOL device questions
- **[Unbricking](/docs/support/unbricking/index.md)** - If restoration fails

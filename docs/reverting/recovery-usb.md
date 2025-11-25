---
prev: flashing-stock
next: false
---
# ChromeOS Recovery USB

::: danger WARNING
- Creating a ChromeOS Recovery USB will **wipe all data** on the USB device
- The recovery process will wipe **all data** on the internal drive
:::

This guide covers creating and using a ChromeOS Recovery USB to reinstall ChromeOS on your device.

## When You Need This

- After restoring stock firmware via the [Firmware Utility Script](/docs/fwscript.md)
- When ChromeOS is corrupted and won't boot
- When preparing to sell or return your device

::: tip NOTE
If you only flashed RW_LEGACY firmware, you don't need to restore stock firmware first. Simply perform a ChromeOS USB recovery and exit Developer Mode.
:::

## Prerequisites

- A PC or laptop to create the recovery USB
- A USB drive or SD card (8GB minimum)
- Your device's board name or model identifier

## Part 1: Creating the Recovery USB

There are two methods for creating a ChromeOS Recovery USB:

### Method 1: Chromebook Recovery Utility (Recommended)

**Supported Platforms:** Windows, ChromeOS, macOS

1. Download the [Chromebook Recovery Utility](https://chrome.google.com/webstore/detail/chromebook-recovery-utili/pocpnlppkickgojjlmhdmidojbmbodfm) from the Chrome Web Store

2. Launch the app and follow the on-screen instructions

3. If you can't find your device automatically:
   - Select "Select a model from a list"
   - Choose your manufacturer and model

4. Select the USB drive you want to use

5. Wait for the process to complete

### Method 2: Manual Recovery Image Flash

**Use this if:** The Recovery Utility fails, or you're running Linux

#### Step 1: Download the Recovery Image

1. Go to [cros.tech](https://cros.tech/) and find your device

2. Click on the "Recovery Images" dropdown and select the latest image

3. Download and extract the `.bin` file from the archive

#### Step 2: Flash the Recovery Image

**Windows:**

Use [Rufus](/docs/support/bootableusb.md#flashing-using-rufus-windows) to flash the recovery `.bin` file to USB. **Important:** Flash in "dd" mode, not "ISO" mode.

**macOS/ChromeOS/Linux:**

Use [dd](/docs/support/bootableusb.md#flashing-with-dd-linux-macos) to flash the recovery `.bin` file to USB.

Example:
```bash
sudo dd if=chromeos_recovery_image.bin of=/dev/sdX bs=4M status=progress
sync
```

Replace `/dev/sdX` with your USB device path (use `lsblk` to identify).

## Part 2: Booting from the Recovery USB

Once your recovery USB is ready:

### Step 1: Enter Recovery Mode

1. Power off your device completely

2. Boot to [Recovery Mode](/docs/boot-modes/recovery.md):
   - Press and hold **ESC + Refresh (F3)**, then press **Power**
   - Release all keys when you see the recovery screen

### Step 2: Start the Recovery Process

1. When prompted with "Chrome OS is missing or damaged", insert your recovery USB

2. The recovery process will start automatically

3. Wait for the process to complete (typically 5-15 minutes)

4. Your device will reboot automatically when finished

### Step 3: Exit Developer Mode (If Applicable)

If you're returning the device to stock configuration:

1. On first boot, you'll see the "OS verification is OFF" screen

2. Press **SPACEBAR** to re-enable OS verification

3. Press **ENTER** to confirm

4. The device will powerwash and reboot to stock ChromeOS

## Troubleshooting

### Recovery Process Fails

**If you disabled firmware write protection via battery disconnect:**
- You'll need to disconnect the battery again for recovery to complete successfully
- This is due to how the stock firmware handles WP state

**Recovery logs are created automatically:**
- The recovery USB creates a small (~10MB) Linux-formatted partition
- Recovery logs are stored here and can help diagnose failures
- Mount this partition on a Linux system to access the logs

### Device Not Recognizing USB

1. Try a different USB port (avoid USB hubs)
2. Recreate the recovery USB using a different USB drive
3. Verify you downloaded the correct recovery image for your device

### Recovery Image Won't Flash

- Ensure your USB drive is at least 8GB
- Try a different USB drive (some drives have compatibility issues)
- On Linux/macOS, ensure you have proper permissions (`sudo`)

## After Recovery

Once recovery completes:

1. **Stock firmware restored?** You're done! Your device is back to factory state.

2. **Want to reinstall Linux?** 
   - Re-enable Developer Mode
   - Run the [Firmware Utility Script](/docs/fwscript.md) again
   - Follow the [Getting Started guide](/docs/getting-started.md)

## Related Documentation

- **[Flashing Stock Firmware](/docs/reverting/flashing-stock.md)** - Restore stock firmware before recovery
- **[Recovery Mode](/docs/boot-modes/recovery.md)** - Understanding Recovery Mode
- **[Boot Modes](/docs/boot-modes/index.md)** - Developer Mode and other boot states
- **[Making a Bootable USB](/docs/support/bootableusb.md)** - For Linux/Windows installation media


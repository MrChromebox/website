---
prev: flashing-stock
next: booting-recovery-usb
---
# Making a Recovery USB

::: danger WARNING
Creating a ChromeOS Recovery USB will **wipe all data** on the USB device.
:::

In order to reinstall ChromeOS, you need to create a ChromeOS Recovery USB for your specific device.

The easiest way to do so is using the Chromebook Recovery Utility, but if that fails, or you are running Linux, then you will need to manually create the Recovery media.

## Chromebook Recovery Utility (Windows/ChromeOS/macOS)

1. Download the [Chromebook Recovery Utility](https://chrome.google.com/webstore/detail/chromebook-recovery-utili/pocpnlppkickgojjlmhdmidojbmbodfm) from the Chrome Web Store.

2. Launch the app, then follow on-screen instructions. If you are unable to find your device, you can select the "Select a model from a list" option.

3. Select the USB drive you want to use.

4. Wait for it to complete.

## Manually Flash Recovery Image (Windows/ChromeOS/macOS/Linux)

1. Go to [cros.tech](https://cros.tech/) and find your device.

2. Click on the "Recovery Images" dropdown and select the latest one.

3. Extract the file.

### Windows

Use [Rufus](bootableusb.md#flashing-using-rufus-windows) to flash the recovery .bin file to USB but make sure to flash in "dd" mode.

### macOS/ChromeOS/Linux

Use [dd](bootableusb.md#flashing-with-dd-linux-macos) to flash the recovery .bin file to USB.

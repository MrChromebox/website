# Restoring the Stock ChromeOS Firmware

::: warning
If your device has hit AUE/EOL, you will not be able to revert it to ChromeOS.
:::

## Requirements

* Linux installed on the device, or a [bootable Linux live USB](./bootableusb.md).
* Network connectivity
* A USB containing your stock firmware backup image, or
* A ChromeOS [Recovery USB](./making-recovery-usb.md)

## Restoring

1. Boot Linux

2. Ensure `curl` is installed
   * For Ubuntu-based distros, run: `sudo apt update && sudo apt install -y curl`

3. Run the [Firmware Utility Script](/docs/fwscript.md):
   * `cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh`

4. Choose option 2: `Restore Stock ChromeOS Firmware`.

5. Follow the prompts. Reboot after successful completion.

With the stock ChromeOS firmware restored, you can now perform a [ChromeOS USB recovery](./booting-recovery-usb.md) to reload ChromeOS.


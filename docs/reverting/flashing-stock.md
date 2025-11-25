# Restoring the Stock ChromeOS Firmware

::: warning
If your device has hit AUE/EOL, you will not be able to revert it to ChromeOS.
:::

## Requirements

* Linux installed on the device, or a [bootable Linux live USB](/docs/support/bootableusb.md).
* Network connectivity
* A USB containing your stock firmware backup image, or
* A ChromeOS [Recovery USB](./making-recovery-usb.md)

## Restoring

1. Boot Linux

2. Ensure `curl` is installed
   * For Ubuntu-based distros, run: `sudo apt update && sudo apt install -y curl`

3. Run the [Firmware Utility Script](/docs/fwscript.md):
   * `cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh`

4. The script will detect your UEFI firmware and show the UEFI firmware menu

5. Choose option 2: `Restore Stock Firmware`

6. Select your restoration method:
   * **Option 1 - Restore from USB backup:** Use your previously created firmware backup file
   * **Option 2 - Restore from ChromeOS Recovery USB:** Extract firmware from a recovery image
   
7. Follow the prompts and provide the required USB drive when requested

8. Reboot after successful completion

With the stock ChromeOS firmware restored, you can now perform a [ChromeOS USB recovery](./booting-recovery-usb.md) to reload ChromeOS.

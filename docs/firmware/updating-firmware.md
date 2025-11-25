# Updating MrChromebox Custom Firmware

This guide is for updating UEFI Full ROM firmware on devices that **already have MrChromebox UEFI firmware installed**. If you haven't yet installed UEFI firmware on your device, see [Flashing Firmware](/docs/firmware/flashing-firmware.md) instead.

::: warning IMPORTANT
The Firmware Utility Script can only be run from ChromeOS or Linux.
If you are using Windows, boot a live Linux ISO (such as Ubuntu or Fedora) from USB and run the script from there.
:::

::: tip NOTE
The curl application is not installed by default on some Ubuntu / Ubuntu-based distros.
To install it, run: `sudo apt update && sudo apt install -y curl`
:::

## Update Process

1. Run the [Firmware Utility Script](/docs/fwscript.md):
   * From a terminal, run: `cd; curl -LOf https://mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh` and press `[ENTER]`.
2. The script will detect your current UEFI firmware and display the UEFI firmware menu
3. Choose option 1: `Install/Update UEFI (Full ROM) Firmware` and press `[ENTER]`.
4. Follow the prompts - the script will automatically preserve your device-specific data (serial, HWID, VPD, etc.)
5. Assuming no errors occur, reboot your device.

::: tip NOTE
Firmware write-protect does not need to be disabled when updating UEFI firmware, as the software write-protect remains disabled after the initial installation. If you previously re-enabled hardware write-protect (reconnected battery, reinstalled WP screw), you do not need to disable it again for updates.
:::

# Updating MrChromebox Custom Firmware

::: warning IMPORTANT
The Firmware Utility Script can only be run from ChromeOS or Linux.
If you are using Windows, boot a live Linux ISO (such as Ubuntu or Fedora) from USB and run the script from there.
:::

::: tip NOTE
The curl application is not installed by default on some Ubuntu / Ubuntu-based distros.
To install it, run: `sudo apt update && sudo apt install -y curl`
:::
   
1. Run the [Firmware Utility Script](/docs/fwscript.md):
   * From a terminal, run: `cd; curl -LOf mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh` and press `[ENTER]`.
2. Choose option 1: `Install/Update UEFI (Full ROM) Firmware` and press `[ENTER]`.
3. Follow the prompts.
4. Assuming no errors occur, reboot your device.

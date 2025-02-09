# Flashing MrChromebox Custom Firmware

Refer to [Firmware Types](types.md) for information about the different firmware types available for flashing on a ChromeOS device.

::: danger DRAGONS LIE AHEAD
**Flashing the firmware has the potential to brick your device**, requiring relatively inexpensive hardware and some technical knowledge to recover. Not all boards can be tested prior to release, and even then slight differences in hardware can lead to unforeseen failures. If you don't have the ability to recover from a bad flash, **you're taking a risk**. Flashing Full ROM firmware will remove your ability to run ChromeOS.
:::

## Firmware Flashing TLDR 

1. [Enable developer mode](/docs/boot-modes/developer.md).
2. [Disable write protect](/docs/firmware/wp/disabling.md) (if flashing the UEFI Full ROM firmware).
3. Run the [Firmware Utility Script](/docs/fwscript).
4. If you are flashing Full ROM firmware, the script will prompt you to make a backup of your stock firmware. **Store it in a safe place** (Google Drive, another PC, etc), as reverting to stock firmware without a backup is **more difficult and has some limitations**.
5. Assuming no errors occur, power off the device using the script menu option.

::: warning IMPORTANT
If an error occurs when flashing the UEFI Full ROM firmware, **do not shutdown**.
Using the script menu option, restore the stock firmware from your backup, and copy the log file to a safe place so you can provide it for troubleshooting.
:::

::: tip NOTE
If you disconnected the battery to [disable firmware write protect](/docs/firmware/wp/disabling.md), you can plug it back in now. You will not need to disconnect it again for any subsequent flashing.
:::

## Booting 

### UEFI Full ROM Firmware

The first boot after flashing can take up to a minute before the display turns on - be patient and **do not interrupt the first boot**.

If your device still hasn't booted after 2 full minutes, perform a Hard Reset (`[Refresh+Power]`).

### RW_LEGACY Firmware

On the Developer Mode boot screen, press Ctrl+L. If a payload menu selection appears, choose `edk2` or `Tianocore`.

Press `ESC` when you see the boot splash screen for either SeaBIOS or edk2 to access the boot menu / select your boot device.

# Making a Bootable USB

Creating a bootable USB drive is essential for installing an operating system on your Chromebook/Chromebox after flashing custom firmware, or for creating a ChromeOS recovery USB to restore stock firmware.

This guide covers creating bootable USB drives for Linux and Windows installation. For creating a ChromeOS recovery USB, see [ChromeOS Recovery USB](/docs/reverting/recovery-usb.md).

::: danger DATA LOSS WARNING
Flashing Ventoy or ISOs to an external drive will **wipe all data** on that drive. Back up any important files before proceeding.
:::

## Prerequisites

1. Another PC or laptop (Windows, Linux, or macOS)
2. An internet connection to download ISO files and tools
3. A USB drive or SD card with at least 8GB capacity (16GB+ recommended for Windows)

## Downloading an ISO

1. Determine what OS you want.
   
   **For Linux:**
   * Most modern Linux distributions work well with MrChromebox firmware
   * For best results, use distributions with recent kernels (6.1+)
   * See the [chrultrabook Supported Devices page](https://docs.chrultrabook.com/docs/devices.html) for specific OS compatibility by device
   
   **For Windows:**
   * Only official versions of Windows 10 (version 1709 or later) and Windows 11 are supported
   * Driver support varies by device - check [chrultrabook compatibility](https://docs.chrultrabook.com/docs/devices.html) before installing
   
2. Place the ISO in a safe place.

## Flashing using Rufus (Windows)

For this guide, we will be using Rufus to create our bootable USB. Rufus is a useful tool that allows you to flash ISOs to an external drive.

1. Download Rufus from [here](https://rufus.ie/en/). The standard Windows x64 version will do.

   ![image](/rufus.png)

2. Plug in your external drive.
3. Locate and launch Rufus. It should ask you to launch with administrator privileges, select YES.
4. Press the "SELECT" button on the right-hand side.
5. A File Explorer window should pop up, find your ISO of choice, then click "Open".
6. Click "Start". The default options should work just fine.
7. Wait for the green bar to say "READY", then click "Close" and eject your newly made external drive.
8. Profit

## Flashing using Ventoy (Windows/Linux/macOS)

For this guide, we will be using Ventoy to create our bootable USB.
Ventoy allows you to boot multiple ISO's from a single drive.
1. Download and extract the latest version from [Github](https://www.ventoy.net/en/download.html).
   * Download the respective file for your platform.
     ![image](/ventoy/download-alt.png)

2. Run `Ventoy2Disk.exe` for Windows or `VentoyGUI.x86_64` for Linux.
   * Make sure to allow administrator privileges when prompted.

3. Plug in your external drive and click the green circle to refresh devices. It should pick up your external drive.
4. Click Options > Partition Style and select "GPT".
5. Once you have done Step 4, click "Install" and click ok twice to start the install.
6. Open your Files App and find a drive that's labeled as "Ventoy".
7. Copy the ISO you downloaded into that drive, after that eject it.
8. Profit

## Flashing with dd (Linux/macOS)

1. Plug in your external drive
2. Run `lsblk` to help determine the drive to be flashed. If the device is mounted you will need to use `umount` to unmount it.
3. Flash with `dd if=myfile.iso of=/dev/<device name (as shown by lsblk)> bs=16M status=progress`.

::: tip
Be sure to target the drive itself and not a partition (e.g., `/dev/sdb`, not `/dev/sdb1`).
:::

## Next Steps

After creating your bootable USB:

**For installing an OS on your device:**
1. Insert the USB drive into your Chromebook/Chromebox
2. Power on and access the boot menu:
   - **Stock firmware with RW_LEGACY**: Press `CTRL+L` in Developer Mode, then `ESC` to access boot menu
   - **UEFI Full ROM firmware**: Press `ESC` during boot to access UEFI setup menu, select "Boot Manager"
3. Select your USB drive from the boot menu
4. Follow the OS installation instructions

**For reverting to stock firmware:**
- See [Restoring Stock Firmware](/docs/reverting/flashing-stock.md) for complete instructions
- You'll need either a firmware backup or a ChromeOS recovery USB

## Additional Resources

- [Booting from USB/SD Card](/docs/firmware/booting.md) - Understanding boot modes and boot order
- [Restoring Stock Firmware](/docs/reverting/flashing-stock.md) - Reverting to ChromeOS
- [chrultrabook Documentation](https://docs.chrultrabook.com/) - OS installation guides and compatibility information

# Unbricking/Flashing with a SuzyQable

## Requirements

* A ChromeOS device with CCD (closed-case debugging) enabled on one of the USB-C ports. If your device uses CR50 for the firmware write protection, then it has CCD capability.

::: warning NOTE
These instructions do not apply to any device which is locked/managed. Enterprise and/or EDU enrollment locks out CCD functionality completely.
:::

* A USB-C debug cable ([aka Suzy-Q cable](https://www.sparkfun.com/products/retired/14746))
* The device must have the CCD flags factory reset (as per instructions to [Disable write protect with a SuzyQable](/docs/firmware/wp/disabling.html#using-closed-case-debugging-ccd-using-a-suzyqable)), or the battery must be unplugged/disconnected from the mainboard.
* Another device running Linux, preferably a current Debian/Ubuntu-based distro

## Hardware Disassembly

As above, this is only needed if you failed to factory reset the CCD flags if you didn't follow the guide to [Disable write protect with a SuzyQable](/docs/firmware/wp/disabling.html#using-closed-case-debugging-ccd-using-a-suzyqable). While this is somewhat device-specific, the main points are the same:

* Disconnect all external power
* Remove bottom cover (screws are often located under rubber feet or strips)
  - Some Chromebooks open up through the back and some through the keyboard, and as mentioned in [Disabling write protect via Battery](/docs/firmware/wp/disabling.html#disconnecting-the-battery). On keyboard, you have to pry it out and remove a ribbon wire under the keyboard.
* Disconnect the internal battery

## Prepping to Flash

Most any 64-bit Debian/Ubuntu based distro should work here, but this guide will use a Ubuntu live session booted from USB (since its version of flashrom supports Suzy-Q flashing).

Let's get to it:
1. Boot your Linux environment (Ubuntu live USB or later recommended)
2. Connect to the internet
3. Open a (non-root) terminal/shell window, change to home directory
   * `cd;`
4. Install flashrom via apt:
   * `sudo apt update`
   * `sudo apt install flashrom`
5. Connect the USB-C end of the Suzy-Q cable to the CCD port on your ChromeOS device (usually left USB-C port) and the USB-A end to your Linux device
6. Verify the cable is properly connected:
   * `ls /dev/ttyUSB*`
     * This command should return 3 items: `ttyUSB0`, `ttyUSB1`, and `ttyUSB2`.
     * If not, then your cable is connected to the wrong port or is upside down; adjust and repeat command until output is as expected
7. Set the CCD state to open:
   * `echo "ccd open" | sudo tee -a /dev/ttyUSB0 > /dev/null`
8. Determine file to be flashed
   * Depending on your desired use for the device, you have 3 options for flashing:
   * The backup file of the stock firmware created by my Firmware Utility Script
     * If using this, simply copy the file from USB into the home directory of the live USB user
   * The custom UEFI firmware for the device
     * If you were flashing the UEFI firmware when things went sideways, then that's the easiest way to proceed. You can download the UEFI firmware for your device by examining the [sources.sh file from the Firmware Utility Script GitHub repo](https://github.com/MrChromebox/scripts/blob/master/sources.sh). Simply concatenate the device-specific filename to the Full ROM base path:
       * `wget <Full ROM base path><device specific filename>`
       * Example for the Acer Chromebook 14 CB3-431 (EDGAR)
       * `wget https://mrchromebox.tech/files/firmware/full_rom/coreboot_tiano-edgar-mrchromebox_20180827.rom`
       * Don't forget to get the SHA1 file for verification:
       * `wget https://mrchromebox.tech/files/firmware/full_rom/coreboot_tiano-edgar-mrchromebox_20180827.rom.sha1`
       * Then verify the download:
       * `sha1sum -c coreboot_tiano-edgar-mrchromebox_20180827.rom.sha1`
   * The shellball firmware for the device
      * A shellball ROM can be downloaded via the coreboot `crosfirmware.sh` script from a Linux terminal:
        * `wget https://github.com/coreboot/coreboot/raw/refs/heads/main/util/chromeos/crosfirmware.sh`
        * `bash crosfirmware.sh <board name in all lowercase>`
        * Example for the Acer Chromebook 14 CB3-431 (EDGAR):
          * `wget https://github.com/coreboot/coreboot/raw/refs/heads/main/util/chromeos/crosfirmware.sh`
          * `bash crosfirmware.sh edgar`
        * This will produce a shellball firmware image named `coreboot-Google_Edgar.<version>.bin`. It will not have a valid HWID and will need the GBB flags reset after flashing to the device.

::: tip
If you're not sure which file to use for your device / don't know your device's board name, you can reference [the supported devices page](/docs/supported-devices.html).
:::

### Persisting the board's Vital Product Data (VPD) and Hardware ID (HWID)

The firmware in all ChromeOS devices contains a section (RO_VPD) which stores board-specific data, like the serial number, localization settings, and on many devices which have an Ethernet port, the LAN MAC address as well. When flashing via the Firmware Utility Script, the script will automatically extract this from the running firmware and inject it into the firmware to be flashed, so the device serial, LAN MAC address, etc are all maintained. Without this, the device will use a default/generic LAN MAC address set by coreboot. While not ideal, this is only really an issue if two or more of the same device are on the same LAN segment (or you're statically assigning IP addresses based on MAC). But for completeness, if flashing the UEFI firmware or shellball ROM, we'll extract the VPD (either from the board itself or a backup made by the script) and inject it into the firmware to be flashed.

::: tip NOTE
You don't need to do this if flashing a stock firmware backup created by the Firmware Utility Script; that image already contains the VPD.
:::

1. For both the options below, we'll need to use the gbb_utility and cbfstool (coreboot filesystem) binaries, so let's download/extract those:
      * `wget https://mrchromebox.tech/files/util/cbfstool.tar.gz && tar -zxf cbfstool.tar.gz`
      * `wget https://mrchromebox.tech/files/util/gbb_utility.tar.gz && tar -zxf gbb_utility.tar.gz`
    * Option 1: Extract VPD and HWID from the firmware on device
      * `sudo flashrom -p raiden_debug_spi:target=AP -r badflash.rom`
      * `./cbfstool badflash.rom read -r RO_VPD -f vpd.bin`
      * `./gbb_utility badflash.rom --get --hwid | sed 's/^hardware_id: //' > hwid.txt`
    * Option 2: Extract VPD and HWID from stock firmware backup created by Firmware Utility Script (this assumes the file has been copied into working directory)
      * `./cbfstool stock-firmware-<devicename>-<date>.rom read -r RO_VPD -f vpd.bin`
      * `./gbb_utility stock-firmware-<devicename>-<date>.rom --get --hwid | sed 's/^hardware_id: //' > hwid.txt`
2. Then we inject the VPD and HWID into the firmware image to be flashed.
    * `./cbfstool <Shellball ROM/UEFI Full ROM filename> write -r RO_VPD -f vpd.bin`
    * For UEFI Full ROM run 
      * `./cbfstool <UEFI Full ROM filename> add -n hwid -f hwid.txt -t raw`
    * For Shellball run
      * `./gbb_utility <Shellball ROM> --set --hwid="$(cat hwid.txt)"`
Now the firmware image is ready to be flashed, and will maintain the device's unique serial, LAN MAC address, etc.

## Flashing Your Device

Now that everything is prepped, time to flash the device.

1. Flash the firmware:
    * For Intel-based ChromeOS devices, flash using
      * `sudo flashrom -p raiden_debug_spi:target=AP -w <filename> --ifd -i bios`
    * For all other devices, use
      * `sudo flashrom -p raiden_debug_spi:target=AP -w <filename>`

    Where `<filename>` is the name of your backup file, UEFI firmware file, or shellball firmware file. This will usually take 3-5 mins to complete; flashrom will first read the flash chip, determine which sectors differ, erase those sectors, write the new data, then verify the data written. The initial CCD setup make take a minute or so and not show any progress.

### Clean Up

Once flashing is complete, disconnect the Suzy-Q cable. If the internal battery was not disconnected, the device will likely reboot as soon as flashing has completed. If the internal battery was disconnected, reconnect it and replace the bottom cover/keyboard. Flip over the device, connect external power, press the power button, and cross your fingers :)

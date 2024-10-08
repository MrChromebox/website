# Manually Flashing Firmware

::: danger
Flashing your own firmware has the potential to brick your device. Do not do this unless you are sure you know what you're doing **and have a way to recover from a bad flash**. Some level of knowledge with using the Linux command line is required.
:::

The steps below assume you are flashing an image named `coreboot.rom`; substitute it as necessary.

1. Download flashrom, cbfstool, and gbb utility, decompress, and ensure it is executable:
   * `wget -O flashrom.tar.gz https://mrchromebox.tech/files/util/flashrom_ups_libpci37_20240418.tar.gz && tar -zxf flashrom.tar.gz && chmod +x flashrom`
   * `wget https://mrchromebox.tech/files/util/cbfstool.tar.gz && tar -zxf cbfstool.tar.gz && chmod +x cbfstool`
   * `wget https://mrchromebox.tech/files/util/gbb_utility.tar.gz && tar -zxf gbb_utility.tar.gz && chmod +x gbb_utility`

2. Flash your custom ROM
   * Backup your current firmware (just in case things go wrong):
     `sudo ./flashrom -p internal -r backup.rom`
   * Extract your VPD from your backup:
         `./cbfstool backup.rom read -r RO_VPD -f vpd.bin`
   * Inject the VPD into your custom ROM:
         `./cbfstool coreboot.rom write -r RO_VPD -f vpd.bin`
   * Extract your HWID and inject it into the custom ROM (if it exists)
       * if your current firmware came from the firmware utility script run
         * `./cbfstool backup.rom extract -n hwid -f hwid.txt`
       * if it is stock firmware then run
         * `./gbb_utility backup.rom --get --hwid | sed 's/[^ ]* //' > hwid.txt`
       * `./cbfstool coreboot.rom add -n hwid -f hwid.txt`
   * Flash your custom firmware:
       * AMD devices: `sudo ./flashrom -p internal -w coreboot.rom`
       * Intel devices: `sudo ./flashrom -p internal --ifd -i bios -w coreboot.rom`
3. Reboot
   * Assuming flashrom shows `success` at the end of the process, reboot.

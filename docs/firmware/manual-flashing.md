# Manually Flashing Firmware

::: danger
Flashing your own firmware has the potential to brick your device. Do not do this unless you are sure you know what you're doing **and have a way to recover from a bad flash**. Some level of knowledge with using the Linux command line is required.
:::

The steps below assume you are flashing an image named `coreboot.rom`; substitute it as necessary.

1. Download flashrom, decompress, and ensure it is executable:
   * `wget -o flashrom.tar.gz https://mrchromebox.tech/files/util/flashrom_ups_libpci37_20240418.tar.gz`
   * `tar zxf flashrom.tar.gz`
   * `chmod +x flashrom`

2. Flash your custom ROM
   * Backup your current firmware (just in case things go wrong):
     `sudo ./flashrom -p internal -r backup.rom`
   * Extract your VPD from your backup and inject it into your custom ROM
       * Download and extract cbfstool binary: 
         `wget https://mrchromebox.tech/files/util/cbfstool.tar.gz && tar -zxf cbfstool.tar.gz`
       * Extract your VPD: 
         `./cbfstool backup.rom read -r RO_VPD -f vpd.bin`
       * Inject VPD into the custom ROM: 
         `./cbfstool coreboot.rom write -r RO_VPD -f vpd.bin`
   * Flash your custom firmware:
       * AMD devices: `sudo ./flashrom -p internal -w coreboot.rom`
       * Intel devices: `sudo ./flashrom -p internal --ifd -i bios -w coreboot.rom`
3. Reboot
   * Assuming flashrom shows `success` at the end of the process, reboot.

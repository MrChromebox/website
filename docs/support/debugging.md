# Debugging

## Grabbing Logs

* If you're experiencing a firmware problem, provide output from `cbmem` console.
    * If you're running Linux, the output from `dmesg`, and `dmidecode` can also be helpful
* If you're experiencing OS-related issues, please ask for help using the [Chrultrabook Forums](https://forum.chrultrabook.com/).

## Firmware

To debug firmware, you will need the following tools:

* `cbmem` utility - to obtain coreboot boot logs
* A SuzyQable - If you're experiencing severe system instability (lockups, crashes), preventing you from on-device debugging.

To dump the cbmem buffer, follow these steps:
1. Download the cbmem utility:
    - `wget https://mrchromebox.tech/files/util/cbmem.tar.gz`

2. Unzip the file and give the binary executable permissions:
    - `tar -xf cbmem.tar.gz;rm cbmem.tar.gz;chmod +x cbmem`

3. Run `cbmem` and redirect the output to `cbmem.log` file:
    - `sudo ./cbmem -1 > cbmem.log`

4. Provide the `cbmem.log` file via the chrultrabook forums, Github issue tracker, or email for further analysis.

::: tip NOTE
The parameter following the cbmem command is the number one (-1), not the letter l (-l).
:::

## SuzyQable Debug Cable

The SuzyQable provides three serial ports (UARTs) which can be accessed using a terminal utility such as `minicom` or `picocom`:
1. CR50 console under /dev/ttyUSB0:
   * `minicom -D /dev/ttyUSB0`
2. CPU console under /dev/ttyUSB1:
   * `minicom -D /dev/ttyUSB1`
3. Embedded Controller (EC) console under /dev/ttyUSB2
   * `minicom -D /dev/ttyUSB2`

* The CPU console can be used to debug coreboot, edk2, or the Linux kernel, but you need to re-compile coreboot with following configuration options enabled:
`CONSOLE_SERIAL=y`
`EDK2_SERIAL_SUPPORT=y`

* For kernel debugging, you will also need to append the following to your kernel command line:
`loglevel=15 console=ttyS4,115200n8`

## ACPI and Linux kernelspace

1. Download the chrultrabook debugging script.
    * `cd ~/Desktop;wget https://raw.githubusercontent.com/chrultrabook/linux-tools/main/debugging.sh`

    It will dump:
    * ACPI tables from sysfs (`/sys/firmware/acpi/*`)
    * DMI information (`dmidecode`)
    * Coreboot buffer (`cbmem`)
    * Linux kernel logs (`dmesg`)
    * List of PCI devices (`lspci`)
    * List of USB devices (`lsusb`)
    * Information about soundcards present in the system and their configuration

    Into `debug-logs.tar.gz` archive on your desktop.

2. Run it: `chmod +x debugging.sh;./debugging.sh`

3. Upload this file if you need help with troubleshooting.

## gsctool

gsctool is used to communicate with the GSC (Google Security Chip) from ChromeOS and is usually used to unlock CCD without having to open up the device.

View status:
* `sudo gsctool -a -I`

Unlock CCD:
* `sudo gsctool -a -o`
* This will prompt you multiple times over several minutes to press the power button. After the last time, the device will reboot back into Verified Boot Mode

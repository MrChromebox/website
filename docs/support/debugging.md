# Debugging

This guide covers collecting diagnostic information for firmware-related issues. For OS-specific problems (drivers, functionality under Linux/Windows), please use the [Chrultrabook Forums](https://forum.chrultrabook.com/).

## Before You Begin

When reporting firmware issues, always include:

- **Device board name (HWID)** - not manufacturer model name
- **Firmware version** - found in firmware menu or `sudo dmidecode -t bios`
- **What you're trying to do** - detailed description
- **What's happening instead** - error messages, unexpected behavior
- **Relevant log files** - see sections below for how to collect

## Quick Reference: What Logs to Collect

| Issue Type | Logs Needed | Tools |
|------------|-------------|-------|
| Boot failure / black screen | cbmem console log | `cbmem` utility |
| Firmware crashes / hangs | cbmem + SuzyQable serial | `cbmem`, SuzyQable |
| Hardware not detected | cbmem, dmesg, lspci | `cbmem`, Linux tools |
| ACPI/driver issues | Full debug bundle | `debugging.sh` script |
| Display/graphics issues | cbmem, dmesg, firmware version | `cbmem`, Linux tools |

## Collecting Firmware Logs (cbmem)

The `cbmem` utility captures coreboot's boot log, which is essential for diagnosing firmware issues.

### When to Use cbmem

- Device boots but has hardware detection issues
- Investigating boot time delays
- Debugging display initialization problems
- Any firmware-related errors or warnings

### Collecting cbmem Logs

**Step 1: Download cbmem utility**
```bash
wget https://mrchromebox.tech/files/util/cbmem.tar.gz
```

**Step 2: Extract and make executable**
```bash
tar -xf cbmem.tar.gz
rm cbmem.tar.gz
chmod +x cbmem
```

**Step 3: Run cbmem and save output**
```bash
sudo ./cbmem -1 > cbmem.log
```

::: tip NOTE
The parameter is the number one (`-1`), not the letter l (`-l`).
:::

**Step 4: Share the log file**

Attach `cbmem.log` to your issue report on:
- [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)
- [Chrultrabook Forums](https://forum.chrultrabook.com/)
- Email to MrChromebox (if requested)

### Understanding cbmem Output

The cbmem log contains:
- **Hardware initialization** - CPU, RAM, chipset setup
- **Device enumeration** - PCI devices, USB controllers, storage
- **Display initialization** - Graphics setup and mode setting
- **Boot timestamps** - Helps identify slow boot stages
- **Error messages** - Look for "ERROR", "WARN", or "FAIL" lines

Common issues revealed by cbmem:
- Missing or misconfigured hardware
- RAM training failures
- Display initialization problems
- Storage device detection issues

## Advanced: SuzyQable Debug Cable

The SuzyQable (also called SuzyQ, CCD cable) is a specialized USB-C debug cable that provides serial console access to various components of ChromeOS devices with CR50/Ti50 security chips.

### When You Need a SuzyQable

- **Severe boot failures** - device doesn't POST, completely dead
- **Firmware development** - real-time debugging during boot
- **Bricked device recovery** - see [Unbricking with SuzyQable](/docs/support/unbricking/unbrick-suzyq.md)
- **Advanced firmware debugging** - kernel crashes, early boot issues

### SuzyQable Serial Ports

The SuzyQable provides three serial console ports (UARTs):

**Port 1: CR50/Ti50 Console** (`/dev/ttyUSB0`)
```bash
minicom -D /dev/ttyUSB0
```
- Google Security Chip console
- Used for CCD unlock, RO verification debugging
- Required for Ti50 device recovery

**Port 2: CPU Console** (`/dev/ttyUSB1`)
```bash
minicom -D /dev/ttyUSB1
```
- Main coreboot/edk2 console output
- Shows boot process in real-time
- Requires firmware compiled with serial console support (see below)

**Port 3: EC Console** (`/dev/ttyUSB2`)
```bash
minicom -D /dev/ttyUSB2
```
- Embedded Controller console
- Useful for debugging keyboard, battery, power issues
- EC-specific commands available

### Enabling Serial Console Output

Standard MrChromebox firmware does not include serial console output by default. To enable:

**For coreboot/firmware debugging:**

Compile custom firmware with these options enabled:
```
CONFIG_CONSOLE_SERIAL=y
CONFIG_EDK2_SERIAL_SUPPORT=y
```

See [Compiling Firmware](/docs/support/compiling.md) for build instructions.

**For Linux kernel debugging:**

Add to kernel command line (in GRUB or bootloader config):
```
loglevel=15 console=ttyS4,115200n8
```

### Terminal Emulator Setup

**Using minicom:**
```bash
sudo apt install minicom
minicom -D /dev/ttyUSB1 -b 115200
```

**Using picocom:**
```bash
sudo apt install picocom
picocom -b 115200 /dev/ttyUSB1
```

**Using screen:**
```bash
screen /dev/ttyUSB1 115200
```

To exit: `CTRL+A` then `K` (minicom), `CTRL+A` then `CTRL+X` (picocom), `CTRL+A` then `\` (screen)

### Where to Get a SuzyQable

- [Sparkfun: Servo Micro](https://www.sparkfun.com/products/15879) + proper USB-C cable
- Search online for "SuzyQable" or "CCD cable"
- Not all USB-C debug cables work - must be SuzyQable-compatible

## Comprehensive Debug Bundle (Linux)

For complex issues involving hardware detection, ACPI, or driver problems, use the chrultrabook debugging script to collect a complete diagnostic bundle.

### When to Use the Debug Script

- Hardware not working under Linux (audio, touchpad, etc.)
- ACPI errors or warnings in dmesg
- Device not detected or enumerated incorrectly
- Suspend/resume issues
- Any hardware-related Linux kernel problems

### Collecting Complete Debug Information

**Step 1: Download the script**
```bash
cd ~/Desktop
wget https://raw.githubusercontent.com/chrultrabook/linux-tools/main/debugging.sh
```

**Step 2: Make executable and run**
```bash
chmod +x debugging.sh
./debugging.sh
```

The script automatically collects:
- **ACPI tables** - System hardware description from firmware
- **DMI information** - System/board identification (`dmidecode`)
- **cbmem log** - coreboot firmware boot log
- **dmesg** - Linux kernel messages and errors
- **lspci -vvnn** - Detailed PCI device information
- **lsusb -vv** - Detailed USB device information
- **Audio configuration** - Sound card setup and driver info

**Step 3: Find the output**

All logs are packaged into `debug-logs.tar.gz` on your Desktop.

**Step 4: Upload and share**

Upload this archive when requesting help on:
- [Chrultrabook Forums](https://forum.chrultrabook.com/)
- [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/) (if firmware-related)

### Manual Log Collection

If the script doesn't work, manually collect key logs:

**System information:**
```bash
sudo dmidecode > dmidecode.txt
sudo lspci -vvnn > lspci.txt
lsusb -vv > lsusb.txt
```

**Firmware and kernel logs:**
```bash
sudo cbmem -1 > cbmem.log
dmesg > dmesg.txt
```

**ACPI tables:**
```bash
sudo cat /sys/firmware/acpi/tables/DSDT > dsdt.dat
sudo acpidump > acpi-tables.txt
```

## Google Security Chip Tools (gsctool)

The `gsctool` utility communicates with the GSC (Google Security Chip - CR50 or Ti50) and is primarily used for CCD (Closed Case Debugging) operations from ChromeOS.

### What is CCD?

CCD (Closed Case Debugging) allows:
- Disabling firmware write-protection without opening the device
- Accessing debug interfaces via SuzyQable
- Useful for developers and advanced users

::: warning IMPORTANT
CCD unlock is **not** required for standard firmware modifications. Most users should just remove the WP screw or disconnect the battery per the [Write Protection Guide](/docs/firmware/wp/index.md).
:::

### Using gsctool (ChromeOS only)

**Check CCD status:**
```bash
sudo gsctool -a -I
```

**Unlock CCD:**
```bash
sudo gsctool -a -o
```

This initiates a multi-step process:
1. You'll be prompted multiple times over 5-10 minutes to press the power button
2. Device will reboot between prompts
3. After final prompt, device reboots to Verified Boot Mode
4. CCD will be unlocked, allowing SuzyQable access and WP control

**Important CCD notes:**
- Only works from ChromeOS (not Linux or after flashing UEFI firmware)
- Requires physical presence (power button presses)
- Ti50 devices may have additional restrictions
- Once UEFI firmware is flashed, CCD state is preserved but `gsctool` won't work

### Alternative: Physical Write-Protect Methods

For most users, physical WP methods are simpler:
- **Remove WP screw** - see device-specific instructions
- **Disconnect battery** - on devices without WP screw
- **SuzyQable CCD** - if already unlocked

See [Write Protection Guide](/docs/firmware/wp/index.md) for detailed instructions.

## Additional Resources

- **[Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)** - Report firmware bugs
- **[Chrultrabook Forums](https://forum.chrultrabook.com/)** - Get help with debugging
- **[Unbricking Guide](/docs/support/unbricking/index.md)** - Recover from failed flashes
- **[Compiling Firmware](/docs/support/compiling.md)** - Build custom firmware with debug options
- **[Write Protection](/docs/firmware/wp/index.md)** - Understanding and disabling WP

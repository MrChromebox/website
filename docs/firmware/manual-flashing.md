# Manually Flashing Firmware

::: danger
Flashing your own firmware has the potential to brick your device. Do not do this unless you are sure you know what you're doing **and have a way to recover from a bad flash**. Some level of knowledge with using the Linux command line is required.
:::

## When to Flash Manually

Most users should use the [Firmware Utility Script](/docs/fwscript.md) to flash firmware, as it handles all the complexity automatically, including custom firmware builds via the "Flash Custom Firmware" option. Manual flashing is appropriate for:

- **Script unavailable**: Running an OS/environment where the script doesn't work (e.g., non-Linux systems)
- **Advanced debugging**: Troubleshooting firmware issues that require fine-grained control over the flashing process
- **External flashing**: Using a hardware programmer (CH341A, Raspberry Pi, flashrom-compatible device) to recover a bricked device
- **Educational purposes**: Learning how the flashing process works under the hood
- **Scripted automation**: Integrating firmware flashing into custom deployment workflows

::: tip RECOMMENDATION
If you're installing MrChromebox firmware or flashing custom builds, use the [Firmware Utility Script](/docs/fwscript.md) instead. It's safer, faster, handles data preservation automatically, and supports custom firmware via the "Flash Custom Firmware" option.
:::

## Prerequisites

Before proceeding with manual flashing:

1. **Linux environment** (native boot or live USB)
2. **Firmware write-protect disabled** (for full ROM flashing)
3. **Battery charged** (>20% for Chromebooks)
4. **Backup of current firmware** (critical!)
5. **Recovery method available** (SuzyQable, CH341A programmer, or another device to create recovery media)

## Understanding Flashrom Options

Before running the commands, it's important to understand what the flashrom options do:

### Common Options

- `-p internal`: Use the internal SPI controller (flashing from the device itself)
- `-r <file>`: Read firmware from flash chip to file
- `-w <file>`: Write firmware from file to flash chip
- `-v <file>`: Verify flash chip contents against file

### Intel-Specific Options

- `--ifd`: Use Intel Flash Descriptor layout
- `-i bios`: Only read/write the BIOS region (SI_BIOS), not ME or descriptor regions

::: warning VERIFICATION OPTIONS
- **No flag** (default): Verifies entire flash chip - slowest but safest
- **`-N` flag**: Skips verification of regions not being written - faster, still safe for what was flashed
- **`-n` flag**: Skips all verification - fastest but risky, only use if you can recover from a bad flash

For BIOS region-only flashing (`-i bios`), using `-N` is reasonable since it still verifies the written region. Avoid `-n` unless you have a recovery method available.
:::

### AMD-Specific Differences

AMD devices don't use Intel's IFD layout, so they don't need the `--ifd` or `-i bios` flags. The entire flash chip is written as a single region.

## Platform-Specific Warnings

### Ti50 Devices (2022 and newer)

Devices with the Ti50 security chip perform additional RO firmware verification. **Critical warnings:**

- If RO verification fails, the device **will not boot** - not even to recovery mode
- External flashing hardware (SuzyQable or CH341A) will be required for recovery
- Always create a backup before flashing
- Ensure your custom firmware is compatible with Ti50 RO verification

See [Write Protection: Ti50 Considerations](/docs/firmware/wp/index.md#ti50-considerations) for detailed information.

### Alderlake/Raptorlake Devices

Some newer devices may require additional steps or have specific quirks. Check the [Known Issues](/docs/known-issues.md) page for device-specific information.

## Manual Flashing Procedure

The steps below assume you are flashing an image named `coreboot.rom`; substitute the filename as necessary.

### Step 1: Download Required Tools

Download flashrom, cbfstool, and gbb_utility, then make them executable:

```bash
# Download and extract flashrom
wget -O flashrom.tar.gz https://mrchromebox.tech/files/util/flashrom_ups_libpci37_20240418.tar.gz
tar -zxf flashrom.tar.gz
chmod +x flashrom

# Download and extract cbfstool
wget https://mrchromebox.tech/files/util/cbfstool.tar.gz
tar -zxf cbfstool.tar.gz
chmod +x cbfstool

# Download and extract gbb_utility
wget https://mrchromebox.tech/files/util/gbb_utility.tar.gz
tar -zxf gbb_utility.tar.gz
chmod +x gbb_utility
```

### Step 2: Backup Current Firmware

**This step is critical!** Always create a backup before flashing:

**AMD devices:**
```bash
sudo ./flashrom -p internal -r backup.rom
```

**Intel devices:**
```bash
sudo ./flashrom -p internal -r backup.rom --ifd -i bios
```

::: tip IMPORTANT
Verify the backup was created successfully and is non-zero size:
```bash
ls -lh backup.rom
```
Should show a file size of several megabytes (typically 8MB or 16MB).
:::

**Store the backup safely** - copy it to USB drive or upload to cloud storage. This backup can save your device if something goes wrong.

### Step 3: Extract and Preserve Critical Data

Your firmware contains device-specific data that must be preserved:

**Extract VPD (Vital Product Data):**
```bash
./cbfstool backup.rom read -r RO_VPD -f vpd.bin
```

**Inject VPD into your custom ROM:**
```bash
./cbfstool coreboot.rom write -r RO_VPD -f vpd.bin
```

**Extract and inject HWID:**

If your current firmware is from the Firmware Utility Script:
```bash
./cbfstool backup.rom extract -n hwid -f hwid.txt
```

If your current firmware is stock ChromeOS firmware:
```bash
./gbb_utility backup.rom --get --hwid | sed 's/[^ ]* //' > hwid.txt
```

Add HWID to your custom ROM:
```bash
./cbfstool coreboot.rom add -n hwid -f hwid.txt -t raw
```

::: warning NOTE
If the `add` command fails with "already exists", use `remove` first:
```bash
./cbfstool coreboot.rom remove -n hwid
./cbfstool coreboot.rom add -n hwid -f hwid.txt -t raw
```
:::

### Step 4: Flash Your Custom Firmware

Now flash the prepared firmware to your device:

**AMD devices:**
```bash
sudo ./flashrom -p internal -w coreboot.rom
```

**Intel devices (with verification):**
```bash
sudo ./flashrom -p internal --ifd -i bios -w coreboot.rom
```

**Intel devices (skip verification of unwritten regions):**
```bash
sudo ./flashrom -p internal --ifd -i bios -w coreboot.rom -N
```

Flashing typically takes 30-90 seconds on Intel devices (longer without `-N`), 60-120 seconds on AMD devices.

::: tip SUCCESS INDICATORS
Flashrom will display progress and verification messages. A successful flash ends with:
```
Reading old flash chip contents... done.
Erasing and writing flash chip... Erase/write done.
Verifying flash... VERIFIED.
```
:::

### Step 5: Verify the Flash (Optional but Recommended)

If you used the `-n` flag (skip all verification), or want to double-check, manually verify the flash:

**Intel devices:**
```bash
sudo ./flashrom -p internal --ifd -i bios -v coreboot.rom
```

**AMD devices:**
```bash
sudo ./flashrom -p internal -v coreboot.rom
```

::: tip NOTE
If you used `-N` (default for most Intel commands), the written region was already verified automatically. Manual verification is only necessary if you used `-n` or want extra assurance.
:::

### Step 6: Reboot

If flashrom reported success and verification passed, you're ready to reboot:

```bash
sudo reboot
```

::: warning FIRST BOOT
The first boot after flashing may take 30-90 seconds due to RAM training. Don't panic if you see a black screen - wait at least 90 seconds before assuming something went wrong.
:::

## Verifying Firmware Version After Flash

After successful boot, verify your firmware was flashed correctly:

**From Linux terminal:**
```bash
sudo dmidecode -t bios
```

**From UEFI firmware setup menu:**
- Press ESC during boot
- Check firmware version displayed on main screen


## Additional Resources

- [Firmware Utility Script](/docs/fwscript.md) - The recommended method for most users
- [Unbricking Guide](/docs/support/unbricking/index.md) - Recovery from failed flash
- [Compiling Firmware](/docs/support/compiling.md) - Build your own firmware from source
- [Flashrom Documentation](https://flashrom.org/Flashrom) - Official flashrom documentation
- [Write Protection](/docs/firmware/wp/index.md) - Understanding and disabling WP

## External Flashing

If internal flashing fails or your device is bricked, you may need to flash externally using a hardware programmer. See the [Unbricking Guide](/docs/support/unbricking/index.md) for detailed instructions on:

- Using a CH341A programmer
- Using a SuzyQable (CR50/Ti50 devices)
- Proper flash chip clip placement and connection
- External flashing procedures

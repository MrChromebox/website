# Known Issues

This page documents known hardware and firmware issues affecting ChromeOS devices when running MrChromebox firmware. For OS-specific compatibility issues (drivers, functionality under Linux/Windows), see the [chrultrabook documentation](https://docs.chrultrabook.com/docs/installing/known-issues.md).

::: tip REPORTING ISSUES
For firmware bugs (**not OS issues**), use the [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/). For script issues, use the [Scripts Issue Tracker](https://github.com/MrChromebox/scripts/issues/).
:::

## Platform Support Limitations

### ARM-Based Devices (Not Supported)

**All ARM-based Chromebooks**: The MrChromebox project does not support these devices at all. This includes devices with MediaTek, Rockchip, Qualcomm, or NVIDIA Tegra processors. MrChromebox firmware only supports Intel and AMD x86_64 platform devices.

### End of Life (EOL) Devices

**Devices past their Auto Update Expiration (AUE) date** have the following restrictions:

- **RW_LEGACY updates blocked**: Cannot install or update RW_LEGACY firmware (existing installations continue to work)
- **Stock firmware restoration blocked**: Cannot restore stock firmware using the Firmware Utility Script (prevents users from getting stuck on an unsupported ChromeOS version)
- **UEFI Full ROM firmware**: Still fully supported and updated

**Affected platforms**: SandyBridge, IvyBridge, Haswell, Broadwell, BayTrail, Braswell, and Skylake.

See [Google's AUE Policy](https://support.google.com/chrome/a/answer/6220366) for specific device EOL dates.

## Firmware-Specific Issues

### RW_LEGACY Firmware Limitations

RW_LEGACY firmware has inherent limitations compared to UEFI Full ROM:

**All Devices:**
- **No UEFI NVRAM**: Cannot save boot order or UEFI settings persistently. Boot order resets after each boot.
- **Limited boot options menu**: No support for features like boot order modification, TPM management or Secure Boot.

**Device-Specific:**
- **GeminiLake**: Legacy Boot Mode/Alternative Firmware menu works but does not show payload list. Boot device selection is non-functional.
- **CometLake**:  Chromebooks do not currently have functional Legacy Boot Mode due to bugs in Google's stock firmware.

**Workaround**: For the best experience with alternate OSes, use UEFI Full ROM firmware instead of RW_LEGACY.

### AMD Platform Issues

**AMD Stoneyridge (pre-Zen):**
- Most Stoney Ridge devices do not currently have functional Legacy Boot Mode due to bugs in Google's stock firmware.

**AMD Cezanne (Zen 3):**
- Legacy Boot Mode/Alternative Firmware menu works, edk2 boots, but screen backlight is off during firmware/boot.
- Backlight functions normally once the OS loads.
- Workaround: Use UEFI Full ROM firmware for proper backlight control throughout the boot process.

### Google Security Chip (CR50/Ti50) Issues

**Ti50 Devices (2022 and newer):**
- **RO Firmware Verification**: Ti50 performs additional verification of RO firmware regions. If RO verification fails, the device will not boot, even to recovery mode.
- **Recovery Requirement**: Failed RO verification requires physical intervention - either external flashing hardware or a SuzyQable cable.
- **Affected Actions**: Installing UEFI Full ROM, restoring stock firmware, or any operation that modifies normally write-protected regions.

**Risk Mitigation:**
- Always create a firmware backup before flashing UEFI Full ROM on Ti50 devices
- Understand that reverting to stock firmware carries higher risk on Ti50 devices
- Have recovery hardware available (SuzyQable or CH341A programmer) before attempting firmware modifications

See [Write Protection: Ti50 Considerations](/docs/firmware/wp/index.md#ti50-considerations) for detailed information.

## Device-Specific Issues

::: tip NOTE
You should avoid buying devices with severe issues, and consider selling if you already own one.
:::

### Severe Hardware Issues

**Samsung Chromebook 3 (CELES):**
- Numerous hardware bugs make it difficult to use reliably
- Issues include unstable USB, intermittent display problems, and poor thermal management
- **Recommendation**: Avoid purchasing; not worth the hassle

**Samsung Galaxy Chromebook (KOHAKU):**
- Badly designed hardware with multiple failure modes
- Deteriorating trackpad grounding causes erratic behavior over time
- Possibly faulty backlight circuit leading to premature failure
- **Recommendation**: Avoid purchasing; known to fail prematurely

### Minor Device Issues

**Samsung Chromebox Series 3 (STUMPY):**
- VGA output through the DVI port is completely non-functional
- DisplayPort output is non-functional under Windows (but works fine at boot and under Linux)
- **Workaround**: Use HDMI output, or use Linux if DisplayPort is required

## Common User Issues and Solutions

### First Boot After Firmware Flash Takes Forever

**Symptom**: After flashing UEFI Full ROM firmware, the first boot takes 20-60 seconds with a black screen.

**Cause**: RAM training - the firmware must re-run RAM training when changing firmware types, or when the MRC cache is empty or invalid.

**Solution**: This is normal behavior. Subsequent boots will be much faster (typically under 5) as the training data is cached. See [FAQ: Why does my device take forever to boot?](/docs/faq.md#why-does-my-device-take-forever-to-boot-the-first-time-after-flashing-firmware)

### Device Won't Boot After Firmware Flash

**Possible causes:**

1. **Still in RAM training** - Wait up to 90 seconds, especially on newer devices with DDR5
2. **Ti50 RO verification failure** - See Ti50 issues above
3. **Corrupted firmware flash** - Recovery via external flashing may be required

**Recovery steps:**
1. Wait at least 90 seconds before assuming failure
2. Try force-powering off (hold power button 10+ seconds) and power on again
3. Try a hard reset (press Refresh + power simltaneously, then release)
4. If still not booting, see [Unbricking Guide](/docs/support/unbricking/index.md)

### Can't Enter Developer Mode / Recovery Mode

**Chromebooks:**
- Ensure battery is plugged (important!!) in and charged (>20%)
- Try the key combination multiple times
- On some devices, timing matters - try holding keys before pressing power
- Must use built-in keyboard for accessing Recovery and Developer Modes

**Chromeboxes:**
- Locate the physical recovery button (usually a small pin-hole)
- Hold recovery button while powering on
- Release after 3-5s

**If Developer Mode screen appears but won't proceed:**
- On R117+, the warning screen timeout changed from 30s to 2 minutes
- Press `CTRL+D` to boot immediately instead of waiting

### Firmware Utility Script Shows "Update Available" But Update Fails

**Cause**: Usually network connectivity issues or download interruptions.

**Solutions:**
1. Check internet connection
2. Run the script again/flash again
3. If using corporate/school network, try a different network (may be blocking firmware downloads)
4. Check script output for specific error messages
5. Use a VPN

### Boot Priority Keeps Resetting / Can't Save Boot Order (RW_LEGACY)

**Cause**: RW_LEGACY firmware does not support UEFI NVRAM for persistent boot settings.

**Solutions:**
- Switch to UEFI Full ROM firmware for persistent boot order
- Or accept that boot device selection must be done manually each time via the firmware boot menu

## Platform-Specific Issues

### SandyBridge/IvyBridge (2012-2013)

- Some devices have quirks with USB 3.0 controllers
- Lower performance due to older hardware (expected)

### Haswell/Broadwell (2014-2015)

- Generally well-supported with few issues
- EC firmware updates on Chromebooks provide improved keyboard support

### BayTrail/Braswell (2014-2016)

- Some devices have eMMC compatibility issues under Windows (requires specific drivers)
- Touchscreen support varies by device and OS

### Skylake/Kabylake (2016-2018)

- Mature platform with excellent support
- Most hardware works well under both Linux and Windows
- EC firmware updates on Chromebooks improve keyboard and power management

### Apollolake/GeminiLake (2017-2019)

- GeminiLake RW_LEGACY has non-functional boot menu (use CTRL+L)
- Otherwise well-supported

### Cometlake/Tigerlake (2020-2021)

- Excellent support with latest firmware
- Few known issues

### Alderlake/Alderlake-N/Raptorlake (2022-2024)

- Modern platform with active development
- Some devices have Ti50 security chip - see Ti50 issues above
- Fixed RW_LEGACY payload on some devices (cannot be updated)

### Meteor Lake (2024+)

- Newest supported platform
- Limited device availability; support being actively developed

## Getting Help

If you encounter an issue not listed here:

1. **Check the FAQ**: Many common questions are answered in the [FAQ](/docs/faq.md)
2. **Search existing issues**: Check the [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/) to see if it's already reported
3. **Ask in the right place**:
   - Firmware bugs → [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)
   - Script issues → [Scripts Issue Tracker](https://github.com/MrChromebox/scripts/issues/)
   - OS compatibility/drivers → [chrultrabook forums](https://forum.chrultrabook.com/)
   - General help → [chrultrabook forums](https://forum.chrultrabook.com/)

::: warning IMPORTANT
When reporting issues, always include:
- Device board name (e.g., BLUEBIRD, EVE, BANSHEE)
- Firmware version (found in firmware menu or boot screen)
- What you were doing when the issue occurred
- Any error messages (exact text or screenshots)
:::

For OS-specific issues (drivers, functionality under Linux/Windows), see the [chrultrabook documentation](https://docs.chrultrabook.com/docs/installing/known-issues.md).

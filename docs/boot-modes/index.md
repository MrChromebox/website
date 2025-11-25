---
next: false
prev: false
---

# ChromeOS Boot Modes

ChromeOS devices have several distinct boot modes that control how the system operates and what firmware/software can be loaded. Understanding these modes is essential when modifying your device to run alternate operating systems or custom firmware.

## Boot Mode Overview

### [Normal/Verified Boot Mode](normal.md)

The default, out-of-the-box mode for all ChromeOS devices.

- **Purpose**: Secure, verified boot of Google-signed ChromeOS only
- **Access Level**: Standard user access, no root/sudo
- **Firmware Modification**: Not possible
- **OS Options**: ChromeOS only
- **Security**: Full firmware and OS verification enabled

### [Recovery Mode](recovery.md)

A special mode for recovering the device when something goes wrong or for enabling Developer Mode.

- **Purpose**: Restore/reinstall ChromeOS and RW firmware components
- **Access Level**: Limited - can only reinstall OS
- **How to Enter**: Key combination (`ESC+Refresh+Power` on Chromebooks) or recovery button (Chromeboxes)
- **Use Cases**: OS corruption recovery, entering Developer Mode, restoring from failed firmware updates

### [Developer Mode](developer.md)

An unlocked mode that provides system access and allows firmware modifications.

- **Purpose**: Development, testing, and firmware modification
- **Access Level**: Full root access via VT2 shell
- **Firmware Modification**: Possible (RW_LEGACY without disabling WP, UEFI Full ROM with WP disabled)
- **OS Options**: ChromeOS + alternate OSes via Legacy Boot Mode
- **Security**: Reduced - verification relaxed, data wipe on entry/exit

### [Legacy Boot Mode](legacy.md)

A boot option within Developer Mode for loading alternate operating systems.

- **Purpose**: Boot Linux or other OSes alongside ChromeOS
- **Access Method**: Press `CTRL+L` in Developer Mode
- **Firmware Requirement**: RW_LEGACY firmware must be installed first
- **Limitations**: Dual-boot only, no persistent NVRAM on most devices

## Boot Mode Transitions

Understanding how to transition between boot modes is crucial:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Boot Mode State Diagram                     │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │ Normal Mode  │ ← Default state (ships like this)
    │ (Verified)   │
    └──────┬───────┘
           │
           │ ESC+Refresh+Power (Chromebooks)
           │ or Recovery Button (Chromeboxes)
           ↓
    ┌──────────────┐
    │ Recovery     │
    │ Mode         │
    └──────┬───────┘
           │
           │ Press CTRL+D, confirm with ENTER
           │ ⚠️  DATA WIPE WARNING ⚠️
           ↓
    ┌──────────────┐       Install RW_LEGACY firmware
    │ Developer    │       via Firmware Utility Script
    │ Mode         │ ────────────────────────────────┐
    └──┬────┬──────┘                                 │
       │    │                                        ↓
       │    │ Press CTRL+L in Developer Mode   ┌─────────────┐
       │    └─────────────────────────────────→│ Legacy Boot │
       │                                       │ Mode        │
       │                                       └─────────────┘
       │
       │ SPACEBAR at Dev Mode screen
       │ ⚠️  DATA WIPE WARNING ⚠️
       ↓
    ┌──────────────┐
    │ Returns to   │
    │ Normal Mode  │
    └──────────────┘
```

::: danger DATA LOSS WARNING
Transitioning between Normal Mode and Developer Mode **wipes all user data** from the device. Always backup important files before making this transition.
:::

## Boot Modes and Firmware Types

How boot modes interact with different firmware types:

### Stock ChromeOS Firmware

- **Normal Mode**: Default operation, no modifications possible
- **Recovery Mode**: Can restore ChromeOS and RW firmware
- **Developer Mode**: Required for any firmware modifications
- **Legacy Boot Mode**: Available after installing RW_LEGACY firmware

### RW_LEGACY Firmware (Modified Stock)

- Stock firmware with updated RW_LEGACY region only
- Developer Mode still required for access
- Enables dual-booting ChromeOS and alternate OSes
- Press `CTRL+L` in Developer Mode to access
- No write-protect disablement required for installation

### UEFI Full ROM Firmware (Complete Replacement)

- Completely replaces stock firmware
- Boot modes no longer apply (no ChromeOS, no Developer Mode)
- Direct boot to UEFI firmware → installed OS
- Press `ESC` during boot for UEFI setup menu
- Cannot return to stock without external flashing or backup restoration

## Troubleshooting Boot Mode Issues

### Can't Enter Recovery Mode

**Chromebooks:**
- Ensure you're using the built-in keyboard (external keyboards don't work)
- Press all three keys (`ESC+Refresh+Power`) simultaneously
- Hold for 1-2 seconds, then release
- Check that Refresh key is the correct one (has circular arrow icon)

**Chromeboxes:**
- Locate the recovery button (small pinhole, often near Kensington lock)
- Use a paperclip or SIM tool
- Hold button down while pressing power, release after 3-5 seconds

### Can't Enter Developer Mode

**From Recovery Mode:**
- Press `CTRL+D` when in Recovery Mode
- If nothing happens, try pressing both keys firmly
- Some devices require you to press `ENTER` after `CTRL+D`
- Battery must be plugged in and charged (>20%) for Chromebooks

**Device Immediately Exits Developer Mode:**
- Check if GBB flags are blocking it (unlikely unless previously modified)
- Verify battery connection is solid (loose battery can trigger exit)
- Some enterprise-enrolled devices block Developer Mode

## Additional Resources

- **[Firmware Types](/docs/firmware/types.md)**: Understanding RW_LEGACY vs UEFI Full ROM
- **[Firmware Utility Script](/docs/fwscript.md)**: Tool for installing and managing firmware
- **[Write Protection](/docs/firmware/wp/index.md)**: Understanding and disabling hardware WP
- **[Getting Started](/docs/getting-started.md)**: Quick start guide for dual-booting or replacing ChromeOS
- **[Supported Devices](/docs/supported-devices.md)**: Check what firmware types your device supports

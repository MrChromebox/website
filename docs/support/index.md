# Help & Support

## Before Asking for Help

1. **Read the documentation** - Check the [FAQ](/docs/faq.md), [Known Issues](/docs/known-issues.md), and [Getting Started](/docs/getting-started.md)
2. **Search existing issues** - Your problem may already be documented with solutions
3. **Verify your device** - Know your board name (HWID), not just manufacturer model
4. **Collect logs** - See [Debugging Guide](/docs/support/debugging.md) for log collection

## Where to Get Help

Getting your issue resolved quickly depends on asking in the right place:

### General Help & OS Issues

**[Chrultrabook Forums](https://forum.chrultrabook.com/)** - Best for:
- OS installation help (Linux, Windows)
- Driver issues and hardware compatibility
- General ChromeOS hardware questions
- Community support and discussion

### Firmware Issues

**[Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)** - For:
- Firmware bugs (boot failures, hardware not detected)
- Feature requests for firmware
- UEFI/coreboot specific problems

::: warning IMPORTANT
**NOT for OS issues** - driver problems, software bugs, OS compatibility belong on Chrultrabook Forums
:::

### Script Issues

**[Scripts Issue Tracker](https://github.com/MrChromebox/scripts/issues/)** - For:
- Firmware Utility Script bugs
- Script download/execution problems
- Script feature requests

### Website Issues

**[Website Issue Tracker](https://github.com/MrChromebox/website/issues/)** - For:
- Documentation errors or improvements
- Website bugs or suggestions
- Broken links or outdated information


## How to Report Issues Effectively

When reporting any issue, always include:

1. **Device board name (HWID)** - e.g., "EVE", "BANSHEE", not "HP Chromebook 14a"
2. **Firmware version** - found in firmware menu or via `sudo dmidecode -t bios`
3. **What you're trying to do** - step-by-step description
4. **What's happening instead** - error messages, unexpected behavior
5. **What you've tried** - troubleshooting steps already attempted
6. **Relevant logs** - cbmem, dmesg, or debug bundle (see [Debugging](/docs/support/debugging.md))

::: danger CRITICAL
**Do not use manufacturer model names** when reporting issues. Model names like "HP Chromebook 14a" or "Acer Chromebook 314" don't uniquely identify devices. Always use the **board name/HWID**. Issues without board names may be ignored.
:::

## Device & Firmware Support Requests

### New Device Support

Adding support for new devices often requires:
- Physical hardware for testing and debugging
- Device is x86_64 (Intel/AMD) - ARM devices not supported
- Device has community interest (multiple users requesting)

If you can loan or donate hardware for development, this significantly speeds up the process.

### Feature Requests

Feature requests are welcome if they:
- Benefit the broader user base (not device-specific hacks)
- Are technically feasible with current coreboot/edk2
- Don't compromise security or stability

Submit feature requests via the [firmware issue tracker](https://github.com/MrChromebox/firmware/issues).

### Commercial Support

Commercial entities looking for custom firmware solutions for ChromeOS devices should [email directly](mailto:MrChromebox@gmail.com) to discuss requirements and pricing.


## Unbricking Service

### DIY Recovery First

Most "bricked" devices can be recovered without professional help:

- **Black screen after flash** - Wait 90 seconds (RAM training), try hard reset
- **Boot loop** - May need firmware re-flash or external programmer
- **External flashing** - See [Unbricking Guide](/docs/support/unbricking/index.md) for:
  - CH341A programmer usage
  - SuzyQable recovery (CR50/Ti50 devices)
  - Step-by-step recovery procedures

Many times what appears to be a brick is actually just RAM training or a recoverable issue.

### Professional Unbricking Service

If you've tried DIY recovery and your device is truly bricked, MrChromebox offers a low-cost unbricking service:

- **Available to**: USA residents (international shipping at your cost)
- **Covers**: All ChromeOS devices, any firmware (MrChromebox or other)
- **Process**: [Email for details](mailto:MrChromebox@gmail.com)
- **Cost**: Low-cost service, exact pricing provided via email

Service includes diagnosis (may not actually be bricked!), firmware recovery, and testing before return.

## Additional Support Resources

### Documentation

- **[FAQ](/docs/faq.md)** - Frequently asked questions with answers
- **[Known Issues](/docs/known-issues.md)** - Common problems and solutions
- **[Getting Started](/docs/getting-started.md)** - First-time user guide
- **[Debugging Guide](/docs/support/debugging.md)** - How to collect logs
- **[Unbricking Guide](/docs/support/unbricking/index.md)** - Recovery procedures

### External Resources

- **[Chrultrabook Documentation](https://docs.chrultrabook.com/)** - OS installation and compatibility
- **[Chrultrabook Forums](https://forum.chrultrabook.com/)** - Community support
- **[Coreboot Documentation](https://doc.coreboot.org/)** - Technical firmware details
- **[edk2/Tianocore Docs](https://github.com/tianocore/tianocore.github.io/wiki)** - UEFI payload information

### Archive / Historical Information

- [Chromebox E-Z Setup Script (Kodi forums)](http://forum.kodi.tv/showthread.php?tid=194362) - Legacy LibreELEC/Kodi script
- [Kodi Chromebox Wiki](https://kodi.wiki/view/Archive:Chromebox) - Archived Kodi-specific info

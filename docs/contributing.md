# Contributing

Contributions to MrChromebox firmware, scripts, and documentation are welcome! Whether you're fixing a typo, reporting a bug, or proposing a new feature, your help is appreciated.

## Documentation Contributions

### Website Documentation

Found a typo, outdated information, or want to improve the docs?

- **Report issues**: [Website Issue Tracker](https://github.com/MrChromebox/website/issues/)
- **Submit changes**: Fork the repository and submit a pull request
- **What to contribute**:
  - Typo fixes and grammar improvements
  - Clarifications of confusing sections
  - Additional troubleshooting information
  - Updated screenshots or diagrams
  - New FAQ entries based on common questions

### Documentation Guidelines

When contributing to documentation:

- Use clear, concise language
- Test any commands or procedures before documenting
- Include board names (HWID), not manufacturer model names
- Link to related documentation where appropriate
- Follow the existing formatting and structure

## Firmware Contributions

### Reporting Firmware Bugs

**Before reporting**, check:
1. Issue isn't already reported: [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)
2. You're using the latest firmware version
3. Issue is firmware-related (not OS/driver issue)

**When reporting**, include:
- Device board name (HWID)
- Firmware version
- Steps to reproduce
- Expected vs actual behavior
- Relevant logs (cbmem, dmesg)

See [Debugging Guide](/docs/support/debugging.md) for log collection instructions.

### Firmware Development

Firmware improvements and bug fixes are welcome! The MrChromebox firmware is based on coreboot.

- **Firmware source**: [MrChromebox Coreboot](https://github.com/MrChromebox/coreboot)
- **edk2 payload**: [MrChromebox edk2](https://github.com/MrChromebox/edk2)
- **Requirements**: 
  - Understanding of coreboot development
  - Ability to test changes on actual hardware
  - Familiarity with ChromeOS device architecture

**Pull request guidelines**:
- Test thoroughly on affected hardware
- Follow coreboot coding standards
- Include clear commit messages
- Document any user-facing changes

## Script Contributions

### Reporting Script Issues

The Firmware Utility Script simplifies firmware installation and management.

- **Script issues**: [Scripts Issue Tracker](https://github.com/MrChromebox/scripts/issues/)
- **Script source**: [MrChromebox Scripts](https://github.com/MrChromebox/scripts)

**When reporting script bugs**:
- Exact command run
- Full output/error messages
- Device board name
- OS and ChromeOS version (if applicable)

### Script Development

Contributions to the script are welcome:

- Bug fixes for existing features
- Improved error handling
- Better user feedback
- Platform-specific fixes

**Guidelines**:
- Maintain backward compatibility where possible
- Test on both ChromeOS and Linux environments
- Consider impact on all supported devices
- Keep code readable and well-commented

## Device Support Requests

### Adding New Device Support

To request support for a new device:

1. Verify it's x86_64 (Intel/AMD) - ARM devices not supported
2. Check if already supported: [Supported Devices](/docs/supported-devices.md)
3. Open issue on [Firmware Issue Tracker](https://github.com/MrChromebox/firmware/issues/)
4. Include:
   - Device board name (HWID)
   - Device manufacturer and model
   - Hardware specifications (CPU, RAM, storage)
   - Any unique hardware features

**Note**: Adding device support often requires:
- Physical hardware for testing
- Community interest (multiple users requesting)
- Hardware donations or loans help speed up the process

## Community Support

### Helping Other Users

One of the best ways to contribute is helping other users:

- Answer questions on [Chrultrabook Forums](https://forum.chrultrabook.com/)
- Share your experiences and solutions
- Write blog posts or tutorials
- Create video guides (with proper attribution)

### Spreading the Word

- Share the project with others who might benefit
- Link to documentation when helping users
- Credit MrChromebox when discussing the firmware

## Code of Conduct

When contributing, please:

- Be respectful and constructive
- Focus on technical merit
- Help newcomers learn
- Give credit where due
- Follow project guidelines

## Questions?

Not sure how to contribute or where to start?

- General questions: [Chrultrabook Forums](https://forum.chrultrabook.com/)
- Development questions: Open an issue on the relevant GitHub repository
- Direct contact: [Email MrChromebox](mailto:MrChromebox@gmail.com) (for significant contributions or questions)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project you're contributing to:

- Firmware: GPL-2.0
- Scripts: GPL-3.0
- Documentation: CC-BY-SA-4.0 (or as specified in repository)

---

Thank you for your interest in contributing to the MrChromebox project!


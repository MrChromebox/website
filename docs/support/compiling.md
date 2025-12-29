# Compiling Your Own Firmware

::: danger
Building and flashing your own firmware has the potential to brick your device. Do not do this unless you are sure you know what you're doing **and have a way to recover from a bad flash**. Some level of knowledge with using the Linux command line is required.
:::

1. **Install tools and libraries needed for coreboot/edk2:**
   * Debian/Ubuntu based distros: `sudo apt install -y bison build-essential curl flex git gnat imagemagick libncurses5-dev m4 nasm python-is-python3 uuid-dev zlib1g-dev libssl-dev pkg-config libcmocka-dev libnss3-dev`
   * Arch based distros: `sudo pacman --needed -S base-devel curl git gcc-ada ncurses zlib nasm imagemagick pkgconf cmocka nss`
   * Redhat based distros: `sudo dnf install git make gcc-gnat flex bison xz bzip2 gcc g++ ncurses-devel wget zlib-devel patch openssl libuuid-devel nasm texinfo pkgconfig cmocka-devel nss-devel`

2. **Clone the repository:**
   * `git clone https://github.com/mrchromebox/coreboot.git`

3. **Clone the submodules:**
   * `cd coreboot`
   * `git submodule update --init --checkout --recursive`

4. **Build the coreboot toolchain**
   * `make crossgcc-i386 CPUS=$(nproc)`

5. **Make changes now, if needed.**
   * Common changes include:
     * Replacing the default logo (`Documentation/coreboot_logo.bmp`)
     * Enabling serial debug output (`CONFIG_CONSOLE_SERIAL=y`)

6. **Build the firmware**
   * `./build-uefi.sh <boardname>`
     * For example, `./build-uefi.sh panther`
     * If successful, the compiled image will be found in `~/dev/roms`

7. **See [Flashing Manually](/docs/firmware/manual-flashing.md) to flash**

## Related Documentation

- **[Manual Flashing](/docs/firmware/manual-flashing.md)** - How to flash your custom firmware
- **[MrChromebox coreboot Repository](https://github.com/MrChromebox/coreboot)** - Firmware source code
- **[MrChromebox edk2 Repository](https://github.com/MrChromebox/edk2)** - UEFI payload source
- **[coreboot Documentation](https://doc.coreboot.org/)** - Upstream coreboot documentation
- **[Contributing](/docs/contributing.md)** - How to contribute firmware improvements
- **[Unbricking](/docs/support/unbricking/index.md)** - Recovery from bad flash

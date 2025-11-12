# ChromeOS Device Firmware

The firmware used by ChromeOS devices is built around serveral open-source projects, and consists (mainly) of a hardware init component ([coreboot](http://www.coreboot.org)) and one or more payloads (depthcharge for Verified Boot and ChromeOS, [SeaBIOS](http://www.seabios.org) for Legacy Boot Mode) which are subsequently executed. The firmware resides on an SPI flash chip and uses the layout shown below. The shaded sections at the bottom are read-only, which is enforced by a combination of [hardware and software write protection measures](/docs/firmware/wp/index.md#hw-wp-implementation). When we talk about updating the firmware on ChromeOS devices, we're referring to either the RW_LEGACY or (RO) BOOT_STUB sections, or to the entire firmware image (often referred to as a "full ROM"). These three update types are described in more detail below.

<p align="center"> <img src="/images/stock_firmware_layout.png" alt="ChromeOS firmware layout" width="500"/></p>

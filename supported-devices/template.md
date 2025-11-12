---
prev: faq.md
next: fwscript.md
---

<!--
NOTE - do not edit the supported-devices.md file, edit the template file in the supported-devices folder
-->

# Supported Devices

## Determining Device Support

What's in a name? All ChromeOS devices have a board/device name, which determines which firmware, OS build, etc a device uses. The board name is listed at the bottom of both the Recovery Mode and Developer Mode screens -- it's the first part of the hardware ID (HWID), before any spaces or hyphens.

::: important
**Your device's board name is what determines if it's supported or not** -- not the make, model, CPU, or anything else. The only thing that matters is the name, so use that when determining support in the table below (or for anything else really).
:::

The chart below provides a full, authoritative list of all ChromeOS devices currently supported by the Firmware Utility Script, the firmware types available for each, and the hardware write-protect method used. In most cases, all of the devices in a given platform/family are supported identically, but sometimes there are outliers (esp with older or newer devices). The goal is to offer both RW_LEGACY and UEFI Full ROM firmware for all devices wherever possible, so you have the option of dual booting ChromeOS, or liberating your device completely :)

::: tip NOTE
MrChromebox firmware only supports Intel/AMD x86_64 platform devices. Devices which use and ARM-based CPU (e.g., anything other than Intel/AMD) are not supported.
:::

## OS Support

A device having firmware available (either RW_LEGACY or UEFI Full ROM) does not imply any level of functionality when running an OS other than ChromeOS. Some devices/platforms are better supported in some Linux distros vs others. Some devices/platforms are better supported under Windows than others.

The best resource for OS compatibility is the [chrultrabook Supported Devices Page](https://docs.chrultrabook.com/docs/devices.html)



## Device Listing

Supported devices are listed in the table below, grouped by platform/family, roughly in chronological order. To reiterate, support is determined entirely and exclusively by the device's ChromeOS HWID/board name. Device names are just for reference, and may be incomplete as many models/sub-models may use the same HWID/board name. Please don't ask if your HP Chromebook 14b-ca0023dx (eg) is supported. Figure out the Board Name and then locate it in the table. If it's not listed, it's not supported (in which case you are encouraged to email me so I can add support for it).

::: tip
If you're on a smaller screen, scroll sideways to see whole table.
:::

<AddScript script-url="../../supported-devices.js"/>
<p>Search: <input type="text" class="deviceSearch"></p>

<div class="deviceTable">
${{TABLE}}
</div>

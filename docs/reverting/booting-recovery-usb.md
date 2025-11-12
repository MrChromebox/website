---
prev: making-recovery-usb
next: false
---
# Booting the Recovery USB

::: danger WARNING
The recovery process will wipe **all** data on the internal drive.
:::

1. Boot the device to [Recovery Mode](/docs/boot-modes/recovery.md).

2. Plug in your recovery USB drive when prompted.

3. The recovery process will start automatically.

4. If returning the device to stock, exit Developer Mode

::: warning NOTE
If the recovery process fails, and you disabled Firmware Write Protection via battery disconnect, you will need to again disconnect the battery in order for the recovery process to complete successfully.
:::

::: tip
The recovery process creates logs on the recovery USB, in a small (~10MB) Linux-formatted partition.
These logs can be useful in diagnosing a failed recovery.
:::

# rclone LuCI compatibility and UI localization

This custom patch set keeps `luci-app-rclone` usable on newer LuCI/OpenWrt
trees and injects a lightweight Simplified Chinese translator into:

- `rclone-ng`
- `rclone-webui-react`

Run this after `./scripts/feeds update -a && ./scripts/feeds install -a`:

```sh
custom/rclone-fixes/apply.sh
```

The patches are intentionally stored under `custom/` instead of editing
`feeds/` directly, so rebasing this fork on `coolsnowwolf/lede` does not drop
the local maintenance changes.

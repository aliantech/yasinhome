#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

cd "$ROOT"

apply_patch_file() {
  local patch_file="$1"

  if patch --dry-run -p1 < "$patch_file" >/dev/null 2>&1; then
    patch -p1 < "$patch_file"
  elif patch --reverse --dry-run -p1 < "$patch_file" >/dev/null 2>&1; then
    echo "Already applied: $patch_file"
  else
    echo "Patch does not apply cleanly: $patch_file" >&2
    return 1
  fi
}

apply_patch_file custom/rclone-fixes/luci-app-rclone-openwrt-compat.patch
apply_patch_file custom/rclone-fixes/rclone-webui-zh-cn.patch

echo "rclone LuCI compatibility and Web UI Chinese localization patches applied."

#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

cd "$ROOT"

rm -rf feeds/luci/applications/luci-app-passwall
rm -f package/feeds/luci/luci-app-passwall
rm -f feeds/luci.tmp/info/.packageinfo-applications_luci-app-passwall

for index in feeds/luci.index feeds/luci.tmp/.packageinfo; do
  if [[ -f "$index" ]]; then
    awk '
      BEGIN { RS = "@@\n"; ORS = "" }
      $0 ~ /(^|\n)Package: luci-app-passwall(\n|$)/ { next }
      { print $0 "@@\n" }
    ' "$index" > "$index.tmp"
    mv "$index.tmp" "$index"
  fi
done

if [[ -f .config ]]; then
  sed -i \
    -e '/^CONFIG_PACKAGE_luci-app-passwall_INCLUDE_.*=y$/d' \
    -e '/^# CONFIG_PACKAGE_luci-app-passwall_INCLUDE_.* is not set$/d' \
    -e 's/^CONFIG_PACKAGE_luci-app-passwall=y$/# CONFIG_PACKAGE_luci-app-passwall is not set/' \
    .config
fi

echo "passwall feed package removed."

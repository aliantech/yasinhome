#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
README="$ROOT/README.md"
TMP="$(mktemp)"

awk '
  /^## 官方讨论群$/ { skip = 1; next }
  /^## 瑞莎网络计算/ { skip = 1; next }
  /^## 了解更多$/ { skip = 1; next }
  /^## 捐/ { skip = 1; next }
  skip && /^## 注意$/ { skip = 0 }
  skip && /^## 特别提示$/ { skip = 0 }
  skip { next }

  /本套代码保证肯定可以编译成功/ { next }
  /你可以自由使用，但源码编译二次发布请注明我的 GitHub 仓库链接/ { next }
  /想学习 OpenWrt 开发/ { next }
  /报名地址:/ { next }
  /forgotfun\.org\/2018\/04\/openwrt-training-2018/ { next }
  /!\[star\]\(doc\/star\.png\)/ { next }

  { print }
' "$README" > "$TMP"

mv "$TMP" "$README"

awk '
  BEGIN { in_tip = 0; n = 0 }
  /^## 特别提示$/ { in_tip = 1; print; next }
  in_tip && /^[0-9]+\. / {
    sub(/^[0-9]+\./, ++n ".")
    print
    next
  }
  { print }
' "$README" > "$TMP"

mv "$TMP" "$README"

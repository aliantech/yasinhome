#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

cp configs/yasinhome.config .config
custom/passwall-clean/apply.sh
make defconfig

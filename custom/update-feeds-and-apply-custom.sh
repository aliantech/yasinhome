#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

./scripts/feeds update -a
custom/passwall-clean/apply.sh
./scripts/feeds install -a

custom/rclone-fixes/apply.sh

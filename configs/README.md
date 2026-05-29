# Custom LEDE configuration

Put reusable build configuration here.

Recommended pattern:

- Store device configs as named files, for example `x86_64.config`.
- Copy the one you want to build to `.config` before running `make defconfig`.
- Keep local files under `files/` so they are overlaid into the firmware rootfs.
- Keep package or source tweaks under `custom/` and apply them with small scripts or patches.

The `master` branch is intended to stay rebased on `coolsnowwolf/lede:master`.

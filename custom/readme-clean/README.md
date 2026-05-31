# README cleanup

This directory keeps the fork's README cleanup policy outside upstream files.

Run from the repository root after syncing upstream:

```sh
custom/readme-clean/apply.sh
```

The script removes promotional sections from `README.md` while leaving build
instructions and useful project notes intact. The GitHub Actions sync workflow
runs it automatically after rebasing on `coolsnowwolf/lede:master`.

# passwall cleanup

This fork does not use `luci-app-passwall`.

Run this after `./scripts/feeds update -a` and before `./scripts/feeds install -a`:

```sh
custom/passwall-clean/apply.sh
```

The script removes the passwall LuCI feed package and its feed symlink, avoiding
metadata warnings from missing optional passwall dependencies.

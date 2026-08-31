# yasinhome Agent Protocol

## Yasin Brain Governance

- 使用当前 Host Profile 定位并读取 Yasin Brain 根 `AGENTS.md`；本文件只补充 yasinhome 的项目事实和更严格边界。
- 涉及设备、编译 runtime、路由器、网络、存储或跨设备状态时，同时读取 `00-Core/Device-Roles-And-Safety-Gates.md`。
- 规则更新、上下文恢复或目标状态变化后，重新核对上述入口。

## Project Identity

- Project: `yasinhome`
- Repository: `https://github.com/aliantech/yasinhome`
- Authoritative workspace: `/home/yasin/workspace/yasinhome` on Ubuntu
- Purpose: LEDE/OpenWrt source fork with maintained yasinhome configuration, feed selection, and isolated custom patches.
- This repository is a build source, not proof that any firmware was flashed or that an OpenWrt device is healthy.

## Project-Specific Reading

1. `README.md` for supported build environments and the non-root build requirement.
2. `custom/README.md`, `custom/apply-yasinhome-config.sh`, and `custom/update-feeds-and-apply-custom.sh` before changing maintained customization or feed behavior.
3. `.github/workflows/sync-upstream.yml` before changing upstream synchronization or commit-replay behavior.

## Project Boundaries

- Never build as `root`. Use the Ubuntu project workspace and the documented toolchain for formal Linux build acceptance.
- Preserve `configs/yasinhome.config`, `custom/`, `feeds.conf.default`, and unrelated local build state. Do not run `make clean`, `make dirclean`, `make distclean`, delete `dl/`, or replace `.config` unless the current task explicitly authorizes that exact scope.
- The scheduled upstream workflow owns its documented rebase and `force-with-lease` behavior. Agents must not manually rebase, force-push, or rewrite `master` without explicit current-task authorization and a verified recovery point.
- Upstream-sync commit hashes may change after replay. Before discarding or archiving an older local chain, verify patch equivalence and preserve any unique commit or WIP.
- Firmware build success does not authorize flashing, rebooting, or changing an OpenWrt device. Those actions require an explicitly named target and independent device/network readback.
- Never read, print, copy, or commit credentials, private feed tokens, router passwords, private keys, or device sessions.

## Verification

- Governance-only changes: run `git diff --check` and the Yasin Brain adoption audit for this exact checkout.
- Maintained configuration changes: review the exact `configs/`, `custom/`, and `feeds.conf.default` diff, then use the documented non-root Ubuntu build path appropriate to the task.
- Upstream synchronization: verify `HEAD`, upstream, ahead/behind, patch equivalence for replayed custom commits, and a clean worktree after the workflow or fast-forward completes.
- Firmware or device work is incomplete until the separately authorized build artifact and real target device/network surface are independently verified.

<!-- BEGIN YASIN BRAIN EXPERIENCE REVIEW -->
## End-of-Task Experience Gate

- substantial engineering task 完成前必须执行 Yasin Brain 根 `AGENTS.md` 的 End-of-Task Protocol；触发条件只由根协议维护，本文件不复制。
- 项目专属经验优先更新本仓库现有 known issues、decision、runbook、test 或 schema guardrail；跨项目候选才进入 Yasin Brain。没有新知识时报告 `no_op`，不得为了完成 gate 创建 Markdown。
<!-- END YASIN BRAIN EXPERIENCE REVIEW -->

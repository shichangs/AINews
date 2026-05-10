# 修复发布流水线 — 技术方案

> 目标:让线上 https://shichangs.github.io/AINews/ 的数据从卡死的 2026-03-20 重新流动到最新的外部源数据(2026-05-10),并消除导致这次卡死的架构脆弱性,而非只做一次性救火。

## 1. 现状诊断(证据)

### 1.1 数据时间戳对比

| 位置 | 最新内容 | 来源 |
|---|---|---|
| 外部源 `~/Desktop/ClaudeCode/daily-ai-news` | 2026-05-10 | `ls -t` |
| 外部源 `~/Desktop/ClaudeCode/portfolio-news` | 2026-05-04 | `ls -t` |
| 外部源 `~/Desktop/ClaudeCode/daily-ai-news/weekly` | 2026-W19 | `ls -t` |
| 仓库 `content/daily-ai-news` | 2026-03-21 | `ls -t` |
| 仓库 `data/site-data.json::generatedAt` | 2026-03-20T01:08 | `node -e` |
| 线上 GitHub Pages | 同上 | 浏览器访问 |

→ 外部源比仓库新约 50 天。

### 1.2 git 状态

主仓库 `/Users/sc-claw/Desktop/Github/ai-news` 上 main 分支:
- `## main...origin/main [ahead 19, behind 5]` — 双向分叉
- 顶层 `content/` 有大量 untracked `.md`(`2026-02-26.md` … `2026-03-20.md`、`portfolio-news-2026-*.md`、`2026-W09.md` 等),不在 daily-ai-news/ 子目录里。

19 个 ahead 中前 3 个 commit 的 subject:

```
65ee129 chore: fallback sync ClaudeCode markdown to AINews content
78cb0f4 chore(sync): backfill claudecode weekly/portfolio root content
82faab5 chore(content): sync daily-ai-news 2026-03-20
```

后 16 个全部是 `chore: update generated AI news data`。

### 1.3 launchd 行为

`/tmp/ai-news-sync.log` 自 3/20 起每 30 分钟一行:

```
[auto] Found non-auto commits ahead of origin/main. Skip auto publish.
```

错误日志为空。

### 1.4 关键代码

`scripts/auto-sync-and-publish.js:15`
```js
const COMMIT_MESSAGE = "chore: update generated AI news data";
```

`scripts/auto-sync-and-publish.js:290-294`
```js
const unpushedSubjects = getUnpushedCommitSubjects();
if (unpushedSubjects.some((subject) => subject !== COMMIT_MESSAGE)) {
  console.log("[auto] Found non-auto commits ahead of origin/main. Skip auto publish.");
  return;
}
```

→ **白名单是单一字符串完全相等**。三个非匹配 subject 中只要存在一个,就 `return`,launchd 永久卡住。

### 1.5 GitHub Actions 行为

`.github/workflows/sync-site-data.yml` 在每次 `push` 到 main 且改动 `content/**/*.md` 时触发,跑 `node scripts/sync-content.js`,自 commit `data/site-data.json` 回 main。这条链路是健康的,但**输入(content 的更新)依赖本地 push**,而本地 push 已经停了 50 天。

---

## 2. 根因 + 架构问题

### 直接根因
1. 三个非白名单 subject 卡住了 launchd 的安全闸门。
2. 与此同时远端跑了 5 次 GitHub Actions 自动 commit,本地 main 与远端分叉(ahead 19/behind 5),即便修闸门也需要先 rebase。

### 架构层面的脆弱性
- **双链路并存但耦合不清**:README 宣称"GitHub Actions 主链路,不依赖本机 launchd",实际**采集**(外部源 → 仓库 content)只能由本地 launchd 完成,Actions 只是**后处理**。这条主链路始终依赖本机。
- **fallback 脚本写错位置**:`content/` 顶层散落的一堆 .md 不在任何 sync 脚本读取的子目录里(`source-state.js` 只读 `daily-ai-news/`、`weekly-ai-tech/`、`portfolio-news/`),说明某条 fallback 路径写入路径有 bug,产生了 dead data。
- **白名单设计脆弱**:用 commit subject 字符串相等做闸门,任何新增的 sync 类型都需要修代码,且没有 fallback。

---

## 3. 候选方案对比

### 方案 A:最小修补
- 主仓库 `git pull --rebase origin main && git push` 解套
- 把白名单改成正则集合,允许 `chore(content): sync*` / `chore(sync): *` / `chore: fallback*`
- 清理 `content/` 顶层 dead .md
- **不**改架构

| 维度 | 评分 |
|---|---|
| 实施成本 | 低 |
| 解决根因 | 仅止血;白名单仍在,下次新增脚本仍可能撞墙 |
| 历史改写 | 无(rebase 改写自己 unpushed commit) |

### 方案 B:彻底解耦,本地不再 push
- 外部源 → 本地 launchd 只负责"采集 + commit",**不 push**
- 用户/独立 cron 显式 push
- 把"生成 site-data.json"完全交给 GitHub Actions
- 取消白名单逻辑

| 维度 | 评分 |
|---|---|
| 实施成本 | 中(需要新增 push cron 或改用户工作流) |
| 解决根因 | 彻底 |
| 改动面 | 大(改本地脚本职责、改 launchd plist) |
| 风险 | 用户可能忘记 push,内容延迟 |

### 方案 C(推荐):统一 commit 规范 + 架构清理
保留 launchd 做"采集 + push",但做三件事让链路单一稳定:
1. **统一 commit message**:无论是采集 markdown 还是回写 site-data,本地脚本一律用同一格式(如 `chore: update generated AI news data` 或 `chore(sync): external sources YYYY-MM-DD`),并把白名单改为**前缀/正则**,而不是字符串完全相等。fallback 路径也走同一个 commit 函数。
2. **本地不再生成 site-data.json**:把 site-data 的生成完全交给 GitHub Actions(本地 sync 脚本可在预览时跑,但**不 commit `data/`**)。这样本地脚本只 commit `content/**`,Actions 只 commit `data/site-data.json`,两条 commit 职责清晰、互不竞争。
3. **同步前 rebase**:每次本地 sync 前先 `git fetch && git rebase origin/main`,主动消化远端的 Actions auto commit,杜绝下次再分叉。

外加一次性清理:
- 在主仓库 `git pull --rebase origin main` 把当前 19 ahead/5 behind 解开
- 删掉 `content/` 顶层 untracked `.md`(及修 fallback 脚本写入路径)
- 把已经在 daily-ai-news/ 里的 `2026-03-05 copy.md` 这种重复文件清掉

| 维度 | 评分 |
|---|---|
| 实施成本 | 中 |
| 解决根因 | 是(白名单不再脆弱,职责分离) |
| 历史改写 | rebase 仅影响 unpushed 的本地 commit,远端历史不变 |
| 风险 | 中,但每步可独立回滚(每个动作单独 commit) |

---

## 4. 推荐方案 C — 详细步骤

### Phase 1 · 救火(让线上立刻恢复更新)

P1.1. 主仓库工作树确认干净
```bash
git -C ~/Desktop/Github/ai-news status -sb
# 期望:除了已知 untracked 的 content/*.md,无 modified 文件
```

P1.2. 把顶层 untracked `.md` 先归档备份(防止 rebase 中误失)
```bash
mkdir -p /tmp/ai-news-content-toplevel-backup-20260510
mv ~/Desktop/Github/ai-news/content/*.md /tmp/ai-news-content-toplevel-backup-20260510/
mv ~/Desktop/Github/ai-news/content/weekly /tmp/ai-news-content-toplevel-backup-20260510/ 2>/dev/null || true
# 注意保留 content/README.md
```
> 这些文件本就是 untracked、未被任何脚本读取的孤儿 → mv 出仓库不会影响任何东西。

P1.3. 同步远端,rebase 解分叉
```bash
git -C ~/Desktop/Github/ai-news fetch origin
git -C ~/Desktop/Github/ai-news rebase origin/main
# 19 个本地 commit 被重放到远端 5 个 auto commit 之上
```

P1.4. 推送
```bash
git -C ~/Desktop/Github/ai-news push origin main
```
触发 GitHub Actions → 生成新的 site-data.json → Pages 部署。线上数据应跳到 2026-03-21(因为本地 content 也只到那天)。

### Phase 2 · 让外部源(到 5/10)流上去

Phase 1 只解决了"本地积压推不上去",**外部源 → 本地 content** 的同步还没跑。

P2.1. 手动跑一次 launchd 脚本
```bash
node ~/Desktop/Github/ai-news/scripts/auto-sync-and-publish.js
```
此时白名单**仍是旧的**,但 unpushed 已为 0,脚本会:
- 把外部源 50 天积压的 markdown 复制进 `content/daily-ai-news/`、`content/portfolio-news/`、`content/daily-ai-news/weekly/`
- 用 `chore: update generated AI news data` commit 并 push
- 触发 Actions 生成 site-data。

> **必须先做 P1 再做 P2**,否则 P2 也会被白名单 block。

### Phase 3 · 加固(防再次卡死)

P3.1. 修白名单为正则集合([scripts/auto-sync-and-publish.js:15](scripts/auto-sync-and-publish.js)、:290-294)
```js
const AUTO_SUBJECT_PATTERNS = [
  /^chore: update generated AI news data$/,
  /^chore\(content\): sync /,        // sync daily-ai-news YYYY-MM-DD
  /^chore\(sync\): /,                 // sync 前缀通用
  /^chore: fallback sync /,           // fallback 脚本
];
function isAutoSubject(subject) {
  return AUTO_SUBJECT_PATTERNS.some((re) => re.test(subject));
}
// ...
if (unpushedSubjects.some((s) => !isAutoSubject(s))) {
  console.log(`[auto][BLOCKED] Non-auto commit detected: ${unpushedSubjects.find((s) => !isAutoSubject(s))}. Skip auto publish.`);
  return;
}
```

P3.2. **【Codex revised】** 不在入口无条件 rebase,改为 **push-fail-then-rebase-retry**
- 入口仅做 `git fetch origin main`,不动本地分支
- 正常路径:白名单通过 → push;若 push 失败(non-fast-forward),则:
  1. 工作树必须干净(`git status --porcelain` 为空)
  2. **再次** 检查所有 ahead commit subject 仍全部通过白名单
  3. 满足以上两条才执行 `git rebase origin/main` + 重新 push
  4. 任一失败 → `git rebase --abort` + 日志告警 + exit 1
- 把"日常巡检"和"历史改写"严格分离:rebase 仅在 push 拒绝这一明确信号下才发生

P3.3. **【Codex revised:从可选升为推荐】** 把"生成 site-data.json"从本地脚本剥离
- 证据:`auto-sync-and-publish.js:249-257` 与 `.github/workflows/sync-site-data.yml:30-43` 都 commit 同一个 `data/site-data.json`,确实存在双写
- 方案:`auto-sync-and-publish.js` 不再把 `data/site-data.json` 加入 commit,只 commit `content/daily-ai-news`、`content/portfolio-news`(及其它 content/ 子目录);Actions 是唯一会 commit `data/` 的角色
- 本地预览不受影响,因为 `preview-local.js` 仍会本地生成 site-data 给本地服务器读取,只是不再 commit
- 同步移除 `auto-sync-and-publish.js` 中显式 `git add data/site-data.json`(若有)

P3.4. **【Codex revised:先调研再修】** 定位顶层 .md 来源
- **先调研**:
  ```bash
  cd ~/Desktop/Github/ai-news
  # 历史上谁第一次往 content/ 顶层添加 .md
  git log --all --diff-filter=A --format="%h %s" -- 'content/*.md' | head
  # 如果是 untracked never-tracked,看 source 写入路径
  grep -rn "content/" scripts/ | grep -v "daily-ai-news\|weekly\|portfolio\|tech"
  ```
- 找到来源(可能是脚本某分支,也可能是历史一次性手工操作)
- 再决定是改脚本还是只做一次性清理
- **不在 hypothesis 阶段动代码**

### Phase 4 · 验证

P4.1 验证线上 JSON 已更新
- `curl -s https://shichangs.github.io/AINews/data/site-data.json | python3 -c "import json,sys;d=json.load(sys.stdin);print(d['generatedAt'], d['issues'][0]['id'])"`
- 期望:`generatedAt` 为今天,`issues[0].id` 为 `2026-05-10`(或外部源最新一天)

P4.2 launchd 日志验证
- `tail -n 30 /tmp/ai-news-sync.log`,**不应**再有 `Skip auto publish`
- 期望出现 `[auto] Pushed pending auto-publish commit(s) to origin/main.` 或 `Source signature unchanged`

P4.3 **【Codex 推荐】** 加 health-check 脚本
- 新文件 `scripts/health-check.js`:只读 `data/site-data.json`,若 `generatedAt` 距今超 2 天 → exit 1 + 写日志
- 接入方式:
  - 短期:launchd 周期任务里 piggyback 一行调用
  - 长期:GitHub Actions scheduled workflow(每天一次)用同一份脚本 ping 线上 JSON
- 这能捕获 *本次正在发生的失败模式*:"脚本在跑、日志在写、但数据不动"

---

## 5. 风险与回滚

| 步骤 | 主要风险 | 回滚方式 |
|---|---|---|
| P1.2 mv 顶层 .md | 万一其实有脚本读它们,会断 | 备份目录在 `/tmp/`,可一键 mv 回去;另 `git status` 已确认 untracked,安全 |
| P1.3 rebase | 与 origin 冲突 | `git rebase --abort` 即可回到原状;19 个本地 commit 不会丢 |
| P1.4 push | 推上去之后远端 Actions 跑出错 | Actions 失败不会破坏 main,只是 site-data 不更新;查日志再修 |
| P2.1 跑 sync 脚本 | 把异常 markdown 也同步进去 | 回退最近一次 commit (`git reset --hard HEAD~1`);launchd 会重新尝试 |
| P3.x 改代码 | 白名单太松导致误推 | 每次改后跑 `--dry-run` 模式确认;改动只放在脚本侧,不影响 Actions |

---

## 6. 不做的事(scope 边界)

- 不动 GitHub Actions(已健康)
- 不改前端(`app.js`/`detail.js`)
- 不引入新的 cron/调度系统
- 不修改外部源目录(`~/Desktop/ClaudeCode/...`)的写入方
- 不删 launchd 配置(只在脚本里加固)

---

## 7. 待 Codex review 的问题

1. P1.3 rebase 19 个本地 commit 之后,这些 commit 是否仍然能被 P3.1 的新白名单覆盖?(都是 `chore: update generated AI news data`,应当 OK,但需 codex 复核 [auto-sync-and-publish.js:290-294]() 真实读取的 subject 来自 `git log --format=%s origin/main..HEAD`,和 rebase 后的 subject 是否一致)
2. P3.3 是否值得做?会不会引入"本地预览生成 data 但不 commit,Actions 又 commit"的双写隐患?
3. 是否还有比 P3.2 自动 rebase 更稳妥的方式应对远端分叉(比如 push 失败时再 rebase 重试一次)?
4. fallback 脚本(P3.4)究竟在哪里?需要读代码确认,可能 P3.4 的实施需要先做调研。
5. 是否应该一并加一个 health-check 脚本,定期对比 `data/site-data.json::generatedAt` 与今天的差距,超过 N 天就告警(写到日志或邮件)?


# AI News Pulse

静态 AI 新闻站点，内容由 Markdown 自动转换为 `data/site-data.json`。

## 当前推荐架构（已落地）

主链路改为 GitHub 驱动，不依赖本机 `launchd`：

1. 在仓库 `content/` 下维护 Markdown。
2. 推送到 `main` 后，GitHub Actions 自动运行 `node scripts/sync-content.js`。
3. 工作流自动提交 `data/site-data.json` 到 `main`。
4. GitHub Pages 从 `main` 自动发布。

工作流文件：

- `.github/workflows/sync-site-data.yml`

## 内容目录

- 日报：`content/daily-ai-news/*.md`
- 周报（可选）：`content/daily-ai-news/weekly/*.md`
- AI 技术周报：`content/weekly-ai-tech/*.md`
- 投资组合：`content/portfolio-news/*.md`

如果 `weekly` 目录为空，会自动用最近日报生成周汇总。

## 本机定时采编（当前配置）

投资组合周报使用 Codex 定时任务，每周一北京时间 09:00 触发；完整生成要求保存在
[`prompts/portfolio-weekly-v3.md`](prompts/portfolio-weekly-v3.md)。

- 正式入口：`~/Desktop/ClaudeCode/portfolio-news/portfolio-news-YYYY-MM-DD.md`。
- 研究台账和未通过核查的草稿：该目录下的 `research/` 子目录，不发布到网站。
- 完整稿通过临时文件原子写入后，由现有 `com.ainews.sync` 复制到仓库并推送，再由上述 Actions / Pages 流程发布。
- 每期创建新的周报，已有月报保持独立；缺失上期时如实披露，周涨跌仍使用相邻交易周计算。
- 文末 `## 采编说明` 使用表格与清单，网页默认收起；行情口径的必要简注保留在速览表旁。

## 本地预览（推荐）

推送前先本地检查，确认无误再 push：

```bash
node scripts/preview-local.js --watch
```

- 访问：`http://localhost:8000`
- 支持自动同步：当 `content/` 或外部映射目录的 markdown 变化时，会自动重跑生成
- 停止：`Ctrl + C`
- 自定义端口：`AI_NEWS_PREVIEW_PORT=8010 node scripts/preview-local.js --watch`

## 本地生成与预览（手动）

```bash
node scripts/sync-content.js
python3 -m http.server 8000
```

打开 `http://localhost:8000`。

## 目录覆盖（可选）

默认读取仓库内 `content/`。若你需要临时从别的目录读取，可传环境变量：

```bash
AI_NEWS_DAILY_DIR=/your/daily/path \
AI_NEWS_WEEKLY_DIR=/your/weekly/path \
AI_NEWS_TECH_DIR=/your/weekly-ai-tech/path \
AI_NEWS_PORTFOLIO_DIR=/your/portfolio/path \
node scripts/sync-content.js
```

## 从旧方案迁移

旧的本机自动方案（`launchd` + `scripts/auto-sync-and-publish.js`）仍保留，但不再推荐作为主链路。  
推荐改为：只在仓库 `content/` 更新 Markdown，然后直接 push。

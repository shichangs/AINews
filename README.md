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
- 投资组合：`content/portfolio-news/*.md`

如果 `weekly` 目录为空，会自动用最近日报生成周汇总。

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
AI_NEWS_PORTFOLIO_DIR=/your/portfolio/path \
node scripts/sync-content.js
```

## 从旧方案迁移

旧的本机自动方案（`launchd` + `scripts/auto-sync-and-publish.js`）仍保留，但不再推荐作为主链路。  
推荐改为：只在仓库 `content/` 更新 Markdown，然后直接 push。

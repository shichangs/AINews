# AI News Pulse

一个纯静态 AI 新闻展示站，但内容不再写死在前端里。

现在的结构是：

- `scripts/sync-content.js`：从本机 `~/Desktop/ClaudeCode` 读取 Markdown
- `data/site-data.json`：把可部署的数据写进仓库
- `index.html`：首页，读取 `site-data.json` 展示摘要和筛选
- `issue.html`：完整日报详情页

## 内容同步

本项目默认从下面两个目录读取内容：

- `/Users/shichangliao/Desktop/ClaudeCode/daily-ai-news`
- `/Users/shichangliao/Desktop/ClaudeCode/portfolio-news`

每次你的 Markdown 更新后，在项目目录运行：

```bash
node scripts/sync-content.js
```

脚本会重新生成：

```text
data/site-data.json
```

如果你以后改了源目录，也可以通过环境变量覆盖：

```bash
AI_NEWS_DAILY_DIR=/your/daily/path AI_NEWS_PORTFOLIO_DIR=/your/portfolio/path node scripts/sync-content.js
```

如果你希望自动同步，可以用监听模式：

```bash
node scripts/sync-content.js --watch
```

它会先同步一次，然后持续监听上述 Markdown 目录；只要文件有变更，就会自动重建 `data/site-data.json`。保持这个终端窗口运行即可，按 `Ctrl+C` 停止监听。

如果你不想保持一个终端窗口常驻运行，也可以用 macOS 的 `launchd` 定时执行：

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.shichangliao.ainews.sync.plist
```

仓库里已经提供模板文件：

```text
launchd/com.shichangliao.ainews.sync.plist
```

它的行为是：

- 登录后立即执行一次
- 之后每 30 分钟执行一次 `node scripts/auto-sync-and-publish.js`
- 只有当原始 Markdown 内容真的变化时，才会重新生成 `data/site-data.json`
- 自动只提交并推送 `data/site-data.json` 到 `origin/main`

常用管理命令：

```bash
launchctl kickstart -k gui/$(id -u)/com.shichangliao.ainews.sync
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.shichangliao.ainews.sync.plist
```

## 本地预览

这是纯前端静态页面，不需要安装依赖。

先同步一次内容：

```bash
node scripts/sync-content.js
```

然后可以直接打开：

- `index.html`
- `issue.html`

如果你想用本地服务预览，也可以运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## GitHub Pages

`.nojekyll` 已经包含在仓库里，GitHub Pages 会直接发布静态文件。

更新流程：

1. 在 `ClaudeCode` 目录里更新 Markdown。
2. 在本项目运行 `node scripts/sync-content.js`。
3. 提交并推送 `data/site-data.json` 和前端文件。
4. GitHub Pages 会自动重新发布。

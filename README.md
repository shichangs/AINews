# AI News Pulse

一个纯静态 AI 新闻展示站，直接基于本地整理后的 AI 日报内容生成。

## 本地预览

这是纯前端静态页面，不需要安装依赖。

直接打开下面文件即可：

- `index.html`

如果你想用本地服务预览，也可以在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## GitHub Pages 部署

当前项目已经包含：

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`

`.nojekyll` 用于让 GitHub Pages 直接按静态文件发布，而不是走 Jekyll 处理流程。

### 部署步骤

1. 创建一个 GitHub 仓库，并把当前项目推送上去。
2. 保证仓库是公开仓库（公开仓库下 GitHub Pages 通常免费）。
3. 打开仓库页面，进入 `Settings`。
4. 进入左侧的 `Pages`。
5. 在 `Build and deployment` 中选择 `Deploy from a branch`。
6. 选择分支 `main`（或你实际使用的默认分支）。
7. 文件夹选择 `/ (root)`。
8. 保存后等待几分钟，GitHub 会生成公开访问地址。

部署成功后，地址通常类似：

```text
https://<你的用户名>.github.io/<仓库名>/
```

## 更新内容

后续只要修改静态文件并再次推送到 GitHub，GitHub Pages 就会自动重新发布。

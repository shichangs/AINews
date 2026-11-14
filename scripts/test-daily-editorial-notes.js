const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { test, after } = require("node:test");

const scriptPath = path.join(__dirname, "sync-content.js");
const context = { require: createRequire(scriptPath), console, process, __dirname };
vm.createContext(context);
vm.runInContext(fs.readFileSync(scriptPath, "utf8").replace(/\nmain\(\);\s*$/, "\n"), context);
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ai-news-editorial-test-"));
after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

const report = `# 日报\n\n## 今日摘要\n\n- 一条摘要\n\n## 1. AI 产品更新\n\n### 示例产品开放\n\n新闻正文保持原样。\n\n（来源：[官方](https://example.com/official) · [报道](https://example.com/news)）\n\n## 本周值得盯\n\n- 11/20 — 产品活动。\n`;
function parse(markdown) {
  const filePath = path.join(tempDir, "2026-11-14.md");
  fs.writeFileSync(filePath, markdown);
  return context.parseDailyIssue(filePath);
}

test("legacy lead records move below the report without changing its news or summary", () => {
  const original = parse(report);
  const issue = parse(report.replace("# 日报\n", "# 日报\n\n> 注：UTC 时间窗口。前期归档缺失；已如实披露。\n>\n> 一手来源巡检：官方收 §1；另一来源未能直取。\n"));
  assert.deepEqual(issue.stories, original.stories);
  assert.equal(issue.summary, original.summary);
  assert.deepEqual(issue.sections, original.sections);
  assert.ok(issue.htmlContent.startsWith('<h3 id="今日摘要">'));
  assert.ok(issue.htmlContent.indexOf('<details class="editorial-notes">') > issue.htmlContent.indexOf("本周值得盯"));
  assert.ok(issue.htmlContent.includes("前期归档缺失"));
  assert.ok(issue.htmlContent.includes("未能直取"));
  assert.ok(!issue.htmlContent.includes("&gt;"));
  assert.ok(!issue.htmlContent.includes("<details open"));
});

test("structured appendix tables and headings never become news stories", () => {
  const original = parse(report);
  const issue = parse(`${report}\n## 采编说明\n\n### 来源巡检\n\n| 来源 | 结果 |\n|---|---|\n| 官方 | 收 §1 |\n\n### 审稿记录\n\n- 剔除旧闻。\n`);
  assert.deepEqual(issue.stories, original.stories);
  assert.deepEqual(issue.sections, original.sections);
  assert.equal(issue.summary, original.summary);
  assert.ok(issue.htmlContent.includes("<table>"));
  assert.ok(issue.htmlContent.includes("<th>来源</th>"));
  assert.ok(issue.htmlContent.endsWith("</div></details>"));
});

test("reports without editorial records and quotations inside news remain unchanged", () => {
  const markdown = report.replace("新闻正文保持原样。", "新闻正文保持原样。\n\n> 注：这是新闻里的引语。");
  const issue = parse(markdown);
  assert.equal(issue.htmlContent, context.markdownToHtml(markdown));
  assert.ok(!issue.htmlContent.includes("editorial-notes"));
});

const fs = require("fs");
const path = require("path");
const {
  DAILY_DIR,
  WEEKLY_DIR,
  PORTFOLIO_DIR,
  TECH_DIR,
  listMarkdownFiles,
  getSourceDirectories,
  buildSourceSignature,
} = require("./lib/source-state");

const OUTPUT_PATH = path.join(__dirname, "..", "data", "site-data.json");
const WATCH_POLL_MS = 30 * 60 * 1000;

const META_HEADINGS = [
  "今日摘要",
  "分板块新闻",
  "速览总结",
  "本周宏观背景",
  "本周风险预警",
  "更新日期",
];

const CATEGORY_KEYWORDS = [
  "主要 AI Labs",
  "AI Agent",
  "AI 产品",
  "产品更新",
  "中国 AI",
  "机器人",
  "自动驾驶",
  "医疗 AI",
  "芯片",
  "半导体",
];

function syncContent() {
  const issues = listMarkdownFiles(DAILY_DIR)
    .sort((left, right) => right.localeCompare(left))
    .map((fileName) => parseDailyIssue(path.join(DAILY_DIR, fileName)));

  const weeklyReports = getWeeklyReports(issues);
  const portfolioReports = getPortfolioReports();
  const weeklyAiTechReports = getWeeklyAiTechReports();
  const marketBrief = portfolioReports[0] || null;
  const latestWeeklyAiTech = weeklyAiTechReports[0] || null;

  if (!issues.length) {
    throw new Error(`No daily markdown files found in ${DAILY_DIR}`);
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    sourceDirectories: {
      daily: DAILY_DIR,
      weekly: WEEKLY_DIR,
      portfolio: PORTFOLIO_DIR,
      weeklyAiTech: TECH_DIR,
    },
    issues,
    weeklyReports,
    weeklyDigest: weeklyReports[0] || null,
    portfolioReports,
    marketBrief,
    weeklyAiTechReports,
    latestWeeklyAiTech,
  };

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH} with ${issues.length} daily issue(s).`);

  return payload;
}

function formatWatchInterval(milliseconds) {
  const minutes = milliseconds / 60000;
  if (Number.isInteger(minutes)) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }
  return `${minutes.toFixed(1)} minutes`;
}

function startWatchMode() {
  syncContent();

  const watchDirectories = getSourceDirectories();
  if (!watchDirectories.length) {
    throw new Error("No source directories available to watch.");
  }

  let lastSignature = buildSourceSignature();

  watchDirectories.forEach((dirPath) => {
    console.log(`[watch] Watching ${dirPath}`);
  });

  const timer = setInterval(() => {
    const nextSignature = buildSourceSignature();
    if (nextSignature === lastSignature) {
      return;
    }

    lastSignature = nextSignature;
    console.log("[watch] Markdown changed, re-syncing...");
    try {
      syncContent();
    } catch (error) {
      console.error("[watch] Sync failed:", error.message);
    }
  }, WATCH_POLL_MS);

  const stopWatching = () => {
    clearInterval(timer);
    console.log("\n[watch] Stopped.");
    process.exit(0);
  };

  process.on("SIGINT", stopWatching);
  process.on("SIGTERM", stopWatching);

  console.log(
    `[watch] Polling for markdown changes every ${formatWatchInterval(WATCH_POLL_MS)}. Press Ctrl+C to stop.`,
  );
}

function main() {
  if (process.argv.includes("--watch")) {
    startWatchMode();
    return;
  }

  syncContent();
}

function sortMarkdownFilesByMtime(dirPath) {
  return listMarkdownFiles(dirPath)
    .map((fileName) => ({
      fileName,
      fullPath: path.join(dirPath, fileName),
      stat: fs.statSync(path.join(dirPath, fileName)),
    }))
    .sort((left, right) => right.stat.mtimeMs - left.stat.mtimeMs)
    .map((entry) => entry.fullPath);
}

function parseDailyIssue(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const lines = splitLines(markdown);
  const id = path.basename(filePath, ".md");
  const date = id;

  const title = extractFirstHeading(lines) || id;
  const summary = extractSummary(lines, ["今日摘要"]) || "暂无摘要。";
  const sections = extractSections(lines);
  const stories = extractStories(lines).slice(0, 12);

  return {
    id,
    date,
    label: formatIssueLabel(date),
    title: cleanHeadingText(title),
    summary,
    sections,
    stories,
    sourceFile: filePath,
    htmlContent: markdownToHtml(markdown),
  };
}

function parseMarketBrief(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const lines = splitLines(markdown);
  const id = path.basename(filePath, ".md");
  const date = extractDateFromId(id);
  const title = extractFirstHeading(lines) || "投资组合周报";
  const summary =
    extractSummary(lines, ["本周宏观背景", "速览总结"]) || "暂无投资视角摘要。";
  const rows = extractTableRows(lines, "速览总结");
  const riskLines = extractBulletSection(lines, "本周风险预警");

  return {
    id,
    date,
    label: date ? formatIssueLabel(date) : "最新",
    title: cleanHeadingText(title),
    summary,
    sourceFile: filePath,
    highlights: rows.slice(0, 3).map((row) => ({
      value: [row["代码"], row["本周涨跌"] || row["股价"]].filter(Boolean).join(" "),
      label: row["一句话摘要"] || row["公司"] || row["代码"] || "市场要点",
      anchor: slugify(row["公司"] || row["代码"] || row["一句话摘要"] || "market"),
    })),
    movers: rows.slice(0, 3).map((row) => ({
      name: row["公司"] || row["代码"] || "重点标的",
      note: row["一句话摘要"] || row["情绪"] || "暂无摘要。",
    })),
    risks: riskLines.slice(0, 4).map((line, index) => ({
      name: extractRiskName(line) || `风险 ${index + 1}`,
      note: stripMarkdown(line),
    })),
    htmlContent: markdownToHtml(markdown),
  };
}

function getWeeklyReports(issues) {
  const weeklyFiles = sortMarkdownFilesByMtime(WEEKLY_DIR);
  if (weeklyFiles.length) {
    return weeklyFiles.map((filePath) => parseWeeklyDigest(filePath));
  }
  return [buildWeeklyDigestFromIssues(issues)];
}

function getPortfolioReports() {
  return sortMarkdownFilesByMtime(PORTFOLIO_DIR).map((filePath) => parseMarketBrief(filePath));
}

function getWeeklyAiTechReports() {
  return sortMarkdownFilesByMtime(TECH_DIR)
    .filter((filePath) => /^weekly-ai-tech-\d{4}-\d{2}-\d{2}\.md$/.test(path.basename(filePath)))
    .map((filePath) => parseWeeklyAiTechReport(filePath));
}

function parseWeeklyDigest(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const lines = splitLines(markdown);
  const id = path.basename(filePath, ".md");
  const date = extractDateFromId(id);
  const title = extractFirstHeading(lines) || "每周 AI 新闻";
  const stories = extractStories(lines).slice(0, 12);
  const summary =
    extractSummary(lines, ["本周摘要", "摘要", "今日摘要"]) ||
    extractFirstParagraph(lines) ||
    "暂无周报摘要。";

  return {
    id,
    date,
    label: date ? formatIssueLabel(date) : "最新",
    title: cleanHeadingText(title),
    summary,
    coverageLabel: "周报文件",
    coverage: [],
    highlights: stories.map((story) => ({
      title: story.title,
      detail: story.detail,
    })),
    sourceFile: filePath,
    htmlContent: markdownToHtml(markdown),
  };
}

function parseWeeklyAiTechReport(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8");
  const lines = splitLines(markdown);
  const id = path.basename(filePath, ".md");
  const date = extractDateFromId(id);
  const title = extractFirstHeading(lines) || "AI 技术周报";
  const stories = extractStories(lines).slice(0, 12);
  const summary =
    extractSummary(lines, ["本周导读", "导读", "今日摘要", "摘要"]) ||
    extractFirstParagraph(lines) ||
    "暂无技术周报摘要。";

  return {
    id,
    date,
    label: date ? formatIssueLabel(date) : "最新",
    title: cleanHeadingText(title),
    summary,
    coverageLabel: "技术周报",
    coverage: [],
    highlights: stories.map((story) => ({
      title: story.title,
      detail: story.detail,
    })),
    stories,
    sourceFile: filePath,
    htmlContent: markdownToHtml(markdown),
  };
}

function buildWeeklyDigestFromIssues(issues) {
  const selectedIssues = issues.slice(0, 7);
  const newest = selectedIssues[0];
  const oldest = selectedIssues[selectedIssues.length - 1];
  const sectionLabels = [
    ...new Set(selectedIssues.flatMap((issue) => issue.sections)),
  ];
  const coverage = selectedIssues.map((issue) => ({
    id: issue.id,
    label: issue.label,
    date: issue.date,
    title: issue.title,
    summary: issue.summary,
  }));
  const highlights = selectedIssues
    .flatMap((issue) =>
      issue.stories.slice(0, 3).map((story) => ({
        title: `${issue.label} · ${story.title}`,
        detail: story.detail,
      })),
    )
    .slice(0, 12);

  const summary = `基于最近 ${selectedIssues.length} 份日报自动汇总，覆盖 ${oldest.date} 到 ${newest.date}。重点主题包括 ${sectionLabels
    .slice(0, 6)
    .join("、")}。`;

  const markdown = [
    "# 每周 AI 新闻",
    "",
    "## 本周概览",
    "",
    summary,
    "",
    "## 按日期回顾",
    "",
    ...selectedIssues.flatMap((issue) => [
      `### ${issue.label} · ${issue.title}`,
      "",
      issue.summary,
      "",
      ...issue.stories
        .slice(0, 4)
        .map((story) => `- **${story.title}**：${story.detail}`),
      "",
    ]),
  ].join("\n");

  return {
    id: "auto-weekly-digest",
    title: "每周 AI 新闻",
    summary,
    coverageLabel: `${oldest.label} - ${newest.label}`,
    coverage,
    highlights,
    date: newest.date,
    label: `${newest.label}`,
    sourceFile: `Auto generated from ${DAILY_DIR}`,
    htmlContent: markdownToHtml(markdown),
  };
}

function splitLines(markdown) {
  return markdown.split(/\r?\n/);
}

function extractFirstHeading(lines) {
  const heading = lines.find((line) => /^#\s+/.test(line.trim()));
  return heading ? heading.replace(/^#\s+/, "").trim() : "";
}

function extractSummary(lines, candidates) {
  const sectionLines = extractSectionLines(lines, candidates);
  const paragraphs = sectionLines
    .join("\n")
    .split(/\n\s*\n/)
    .map((block) => stripMarkdown(block).trim())
    .filter(Boolean);
  return paragraphs[0] || "";
}

function extractFirstParagraph(lines) {
  const text = lines
    .map((line) => line.trim())
    .filter((line) => line && !/^#/.test(line) && !/^---+$/.test(line))
    .map((line) => stripMarkdown(line));
  return text[0] || "";
}

function extractSectionLines(lines, candidates) {
  let collecting = false;
  const collected = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^(#{2,3})\s+(.+)$/);

    if (headingMatch) {
      const headingText = cleanHeadingText(headingMatch[2]);
      const matches = candidates.some((candidate) => headingText.includes(candidate));
      if (matches) {
        collecting = true;
        continue;
      }
      if (collecting) {
        break;
      }
    }

    if (collecting) {
      collected.push(line);
    }
  }

  return collected;
}

function extractSections(lines) {
  const sections = [];
  for (const line of lines) {
    const headingMatch = line.trim().match(/^(#{2,3})\s+(.+)$/);
    if (!headingMatch) {
      continue;
    }

    const level = headingMatch[1].length;
    const headingText = headingMatch[2].trim();
    if (!isCategoryHeading(headingText, level)) {
      continue;
    }

    const label = mapCategory(cleanHeadingText(headingText));
    if (!sections.includes(label)) {
      sections.push(label);
    }
  }

  return sections;
}

function extractStories(lines) {
  const stories = [];
  const seenTitles = new Set();
  let currentCategory = "焦点";
  let activeStory = null;

  function flushStory() {
    if (!activeStory) {
      return;
    }

    const detail = stripMarkdown(activeStory.body.join(" ")).replace(/\s+/g, " ").trim();
    if (!activeStory.title || !detail || seenTitles.has(activeStory.title)) {
      activeStory = null;
      return;
    }

    const fullBody = activeStory.body.join("\n");
    const links = extractLinks(fullBody).slice(0, 2);
    const story = {
      tag: activeStory.tag,
      impact: activeStory.impact,
      title: activeStory.title,
      detail: clip(detail, 140),
      links,
      anchor: slugify(activeStory.title),
    };

    seenTitles.add(story.title);
    stories.push(story);
    activeStory = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);

    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].trim();

      if (level <= 3 && isCategoryHeading(headingText, level)) {
        flushStory();
        currentCategory = mapCategory(cleanHeadingText(headingText));
        continue;
      }

      if (level === 3) {
        flushStory();
        const title = stripMarkdown(headingText);
        activeStory = {
          tag: currentCategory,
          impact: inferImpact(title),
          title,
          body: [],
        };
        continue;
      }

      if (level <= 2) {
        flushStory();
      }
    }

    if (/^---+$/.test(line)) {
      flushStory();
      continue;
    }

    const boldHeading = line.match(/^\*\*(.+?)\*\*(.*)$/);
    if (boldHeading && line.length < 260) {
      flushStory();
      const title = stripMarkdown(boldHeading[1]).trim();
      activeStory = {
        tag: currentCategory,
        impact: inferImpact(title),
        title,
        body: [],
      };

      const trailing = boldHeading[2].trim();
      if (trailing) {
        activeStory.body.push(trailing);
      }
      continue;
    }

    if (activeStory && line) {
      activeStory.body.push(rawLine);
    }
  }

  flushStory();
  return stories;
}

function extractLinks(text) {
  const links = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let match = regex.exec(text);

  while (match) {
    links.push({
      label: stripMarkdown(match[1]).trim(),
      url: match[2].trim(),
    });
    match = regex.exec(text);
  }

  return links;
}

function extractTableRows(lines, headingName) {
  const sectionLines = extractSectionLines(lines, [headingName]);
  const tableLines = [];
  let collecting = false;

  for (const line of sectionLines) {
    if (/^\|.*\|$/.test(line.trim())) {
      tableLines.push(line.trim());
      collecting = true;
      continue;
    }
    if (collecting) {
      break;
    }
  }

  if (tableLines.length < 2) {
    return [];
  }

  const rows = tableLines.map(parseTableLine).filter((row) => row.length);
  const header = rows[0];
  const bodyRows = rows.slice(1).filter((row) => !row.every((cell) => /^:?-{2,}:?$/.test(cell)));

  return bodyRows.map((row) => {
    const record = {};
    header.forEach((column, index) => {
      record[column] = row[index] || "";
    });
    return record;
  });
}

function parseTableLine(line) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => stripMarkdown(cell).trim());
}

function extractBulletSection(lines, headingName) {
  const sectionLines = extractSectionLines(lines, [headingName]);
  const bullets = sectionLines
    .map((line) => line.trim())
    .filter((line) => /^-\s+/.test(line))
    .map((line) => line.replace(/^-\s+/, "").trim());

  if (bullets.length) {
    return bullets;
  }

  return sectionLines
    .map((line) => stripMarkdown(line).trim())
    .filter(Boolean)
    .slice(0, 4);
}

function extractRiskName(line) {
  const match = line.match(/\*\*(.+?)\*\*|([A-Za-z][A-Za-z\s&.-]+)(?::|：)/);
  if (!match) {
    return "";
  }
  return stripMarkdown(match[1] || match[2]).trim();
}

function isCategoryHeading(text, level) {
  const cleaned = cleanHeadingText(text);
  if (META_HEADINGS.some((keyword) => cleaned.includes(keyword))) {
    return false;
  }
  if (CATEGORY_KEYWORDS.some((keyword) => cleaned.includes(keyword))) {
    return true;
  }
  if (/^[0-9一二三四五六七八九十]+[.、]/.test(cleaned)) {
    return true;
  }
  if (level === 2 && /AI|机器人|自动驾驶|医疗|芯片/.test(cleaned)) {
    return true;
  }
  return false;
}

function mapCategory(text) {
  const cleaned = cleanHeadingText(text);
  if (cleaned.includes("主要 AI Labs")) {
    return "AI Labs";
  }
  if (cleaned.includes("AI Agent")) {
    return "AI Agent";
  }
  if (cleaned.includes("产品")) {
    return "产品";
  }
  if (cleaned.includes("中国 AI")) {
    return "中国 AI";
  }
  if (cleaned.includes("机器人")) {
    return "机器人";
  }
  if (cleaned.includes("自动驾驶")) {
    return "自动驾驶";
  }
  if (cleaned.includes("医疗")) {
    return "医疗 AI";
  }
  if (cleaned.includes("芯片") || cleaned.includes("半导体")) {
    return "芯片";
  }
  return cleaned;
}

function inferImpact(title) {
  if (title.includes("🔥")) {
    return "高热";
  }
  if (title.includes("融资") || title.includes("$")) {
    return "资本";
  }
  if (title.includes("发布") || title.includes("上线")) {
    return "更新";
  }
  if (title.includes("收购") || title.includes("合并")) {
    return "并购";
  }
  if (title.includes("风险") || title.includes("安全")) {
    return "风险";
  }
  return "关注";
}

function formatIssueLabel(dateString) {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return dateString;
  }
  return `${Number(parts[1])}月${Number(parts[2])}日`;
}

function extractDateFromId(text) {
  const match = String(text).match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "";
}

function cleanHeadingText(text) {
  return text
    .replace(/^[^\p{L}\p{N}]+/gu, "")
    .replace(/^[0-9一二三四五六七八九十]+[.、]\s*/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function slugify(text) {
  const ascii = stripMarkdown(text)
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .trim()
    .replace(/\s+/g, "-");
  return ascii || "section";
}

function stripMarkdown(text) {
  return String(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/\|/g, " ")
    .trim();
}

function markdownToHtml(markdown) {
  const lines = splitLines(markdown);
  const html = [];
  let paragraph = [];
  let bulletItems = [];
  let orderedItems = [];
  let tableLines = [];
  let skippedLeadTitle = false;
  let ignoreNextRule = false;

  function canAppendInlineSource() {
    if (!html.length) {
      return false;
    }
    return /^<p>/.test(html[html.length - 1]);
  }

  function isSourceOnlyParagraph(text) {
    const normalized = String(text).replace(/\s+/g, " ").trim();
    if (!normalized || !/来源/u.test(normalized)) {
      return false;
    }

    const withoutLinks = normalized.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "");
    const compact = withoutLinks.replace(/[|/·()（）:：\-—,\s]+/g, "");
    return compact === "来源";
  }

  function buildInlineSourceHtml(text) {
    const links = extractLinks(text);
    if (!links.length) {
      return "";
    }

    const linkHtml = links
      .map((link) => {
        const label = stripMarkdown(link.label)
          .replace(/^来源\s*[·:：-]?\s*/u, "")
          .trim();
        const safeLabel = escapeHtml(label || stripMarkdown(link.label).trim());
        const safeUrl = escapeHtml(link.url.trim());
        return `<a href="${safeUrl}" target="_blank" rel="noreferrer">${safeLabel}</a>`;
      })
      .join(" / ");

    return `<span class="inline-source">（来源：${linkHtml}）</span>`;
  }

  function appendInlineSource(text) {
    if (!isSourceOnlyParagraph(text) || !canAppendInlineSource()) {
      return false;
    }

    const sourceHtml = buildInlineSourceHtml(text);
    if (!sourceHtml) {
      return false;
    }

    const lastIndex = html.length - 1;
    html[lastIndex] = html[lastIndex].replace("</p>", ` ${sourceHtml}</p>`);
    return true;
  }

  function flushParagraph() {
    if (!paragraph.length) {
      return;
    }
    const text = paragraph.join(" ").trim();
    if (text) {
      if (appendInlineSource(text)) {
        paragraph = [];
        return;
      }
      html.push(`<p>${formatInline(text)}</p>`);
    }
    paragraph = [];
  }

  function flushBulletList() {
    if (!bulletItems.length) {
      return;
    }
    html.push(`<ul>${bulletItems.map((item) => `<li>${formatInline(item)}</li>`).join("")}</ul>`);
    bulletItems = [];
  }

  function flushOrderedList() {
    if (!orderedItems.length) {
      return;
    }
    html.push(
      `<ol>${orderedItems.map((item) => `<li>${formatInline(item)}</li>`).join("")}</ol>`,
    );
    orderedItems = [];
  }

  function flushTable() {
    if (!tableLines.length) {
      return;
    }

    const rows = tableLines.map(parseTableLine).filter((row) => row.length);
    if (!rows.length) {
      tableLines = [];
      return;
    }

    const header = rows[0];
    const bodyRows = rows.slice(1).filter((row) => !row.every((cell) => /^:?-{2,}:?$/.test(cell)));

    html.push(
      [
        '<div class="table-wrap"><table>',
        `<thead><tr>${header.map((cell) => `<th>${formatInline(cell)}</th>`).join("")}</tr></thead>`,
        `<tbody>${bodyRows
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${formatInline(cell)}</td>`).join("")}</tr>`,
          )
          .join("")}</tbody>`,
        "</table></div>",
      ].join(""),
    );
    tableLines = [];
  }

  function flushAll() {
    flushParagraph();
    flushBulletList();
    flushOrderedList();
    flushTable();
  }

  function isInlineHeadingMeta(text) {
    const trimmed = String(text).trim();
    if (!trimmed || trimmed.length > 80) {
      return false;
    }
    return (
      (/^（[^）]+）$/u.test(trimmed) || /^\([^)]+\)$/.test(trimmed)) &&
      !/[。！？:：]$/u.test(trimmed)
    );
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (/^\|.*\|$/.test(line)) {
      flushParagraph();
      flushBulletList();
      flushOrderedList();
      tableLines.push(line);
      continue;
    }
    flushTable();

    if (!line) {
      flushParagraph();
      flushBulletList();
      flushOrderedList();
      continue;
    }

    if (/^---+$/.test(line)) {
      flushAll();
      if (ignoreNextRule) {
        ignoreNextRule = false;
        continue;
      }
      html.push('<hr class="report-rule" />');
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushAll();
      const rawLevel = headingMatch[1].length;
      const title = stripMarkdown(headingMatch[2]).trim();
      if (rawLevel === 1 && !skippedLeadTitle) {
        skippedLeadTitle = true;
        ignoreNextRule = true;
        continue;
      }

      const level = Math.min(rawLevel, 3);
      const tag = `h${Math.min(level + 1, 4)}`;
      const id = slugify(title);
      const className =
        tag === "h4" ? (/^\d+\.\s/.test(title) ? "topic-heading" : "entry-heading") : "";
      const classAttr = className ? ` class="${className}"` : "";
      html.push(`<${tag}${classAttr} id="${id}">${formatInline(title)}</${tag}>`);
      continue;
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      flushOrderedList();
      bulletItems.push(bulletMatch[1].trim());
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      flushBulletList();
      orderedItems.push(orderedMatch[1].trim());
      continue;
    }

    const boldHeading = line.match(/^\*\*(.+?)\*\*(.*)$/);
    if (boldHeading && line.length < 260) {
      flushAll();
      const titleMarkdown = boldHeading[1].trim();
      const title = stripMarkdown(titleMarkdown).trim();
      const id = slugify(title);
      const trailing = boldHeading[2].trim();
      if (isInlineHeadingMeta(trailing)) {
        html.push(
          `<h4 class="entry-heading" id="${id}">${formatInline(titleMarkdown)} <span class="entry-meta-inline">${formatInline(trailing)}</span></h4>`,
        );
        continue;
      }

      html.push(`<h4 class="entry-heading" id="${id}">${formatInline(titleMarkdown)}</h4>`);
      if (trailing) {
        paragraph.push(trailing);
      }
      continue;
    }

    paragraph.push(line);
  }

  flushAll();
  return html.join("\n");
}

function formatInline(text) {
  return autoLinkBareUrls(
    escapeHtml(text)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>"),
  );
}

function autoLinkBareUrls(text) {
  return text.replace(/(^|[\s(（:：|])(https?:\/\/[^\s<>"']+)/g, (_match, prefix, rawUrl) => {
    let url = rawUrl;
    let trailing = "";

    while (/[),.，;；!?！？）|]$/u.test(url)) {
      trailing = url.slice(-1) + trailing;
      url = url.slice(0, -1);
    }

    return `${prefix}<a href="${url}" target="_blank" rel="noreferrer">${url}</a>${trailing}`;
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

main();

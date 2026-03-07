const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const DEFAULT_CONTENT_ROOT = path.join(REPO_ROOT, "content");
const DAILY_DIR =
  process.env.AI_NEWS_DAILY_DIR || path.join(DEFAULT_CONTENT_ROOT, "daily-ai-news");
const WEEKLY_DIR =
  process.env.AI_NEWS_WEEKLY_DIR || path.join(DAILY_DIR, "weekly");
const PORTFOLIO_DIR =
  process.env.AI_NEWS_PORTFOLIO_DIR || path.join(DEFAULT_CONTENT_ROOT, "portfolio-news");
const TECH_DIR =
  process.env.AI_NEWS_TECH_DIR || path.join(DEFAULT_CONTENT_ROOT, "weekly-ai-tech");

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("."));
}

function getSourceDirectories() {
  return [...new Set([DAILY_DIR, WEEKLY_DIR, PORTFOLIO_DIR, TECH_DIR].map((dirPath) => path.resolve(dirPath)))]
    .filter((dirPath) => fs.existsSync(dirPath));
}

function hashContent(text) {
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33) ^ text.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

function buildSourceSignature() {
  return getSourceDirectories()
    .flatMap((dirPath) =>
      listMarkdownFiles(dirPath).map((fileName) => {
        const fullPath = path.join(dirPath, fileName);
        const content = fs.readFileSync(fullPath, "utf8");
        return `${fullPath}:${hashContent(content)}`;
      }),
    )
    .sort()
    .join("|");
}

module.exports = {
  DAILY_DIR,
  WEEKLY_DIR,
  PORTFOLIO_DIR,
  TECH_DIR,
  listMarkdownFiles,
  getSourceDirectories,
  buildSourceSignature,
};

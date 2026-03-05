const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawnSync } = require("child_process");
const { getSourceDirectories } = require("./lib/source-state");

const REPO_ROOT = path.join(__dirname, "..");
const SYNC_SCRIPT = path.join(__dirname, "sync-content.js");
const PORT = Number(process.env.AI_NEWS_PREVIEW_PORT || "8000");
const WATCH_MODE = process.argv.includes("--watch");

let syncScheduled = false;
let syncing = false;

function runSync() {
  if (syncing) {
    syncScheduled = true;
    return;
  }

  syncing = true;
  console.log("[preview] Syncing content...");

  const result = spawnSync(process.execPath, [SYNC_SCRIPT], {
    cwd: REPO_ROOT,
    stdio: "inherit",
    env: process.env,
  });

  syncing = false;

  if (result.status !== 0) {
    console.error("[preview] Sync failed.");
    process.exit(result.status || 1);
  }

  if (syncScheduled) {
    syncScheduled = false;
    runSync();
  }
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".js") return "application/javascript; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".md") return "text/markdown; charset=utf-8";
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".ico") return "image/x-icon";
  return "application/octet-stream";
}

function resolveFilePath(urlPath) {
  const normalizedPath = decodeURIComponent(urlPath.split("?")[0]);
  const cleanPath = normalizedPath === "/" ? "/index.html" : normalizedPath;
  const absolutePath = path.resolve(REPO_ROOT, `.${cleanPath}`);

  if (!absolutePath.startsWith(REPO_ROOT)) {
    return null;
  }

  if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()) {
    return absolutePath;
  }

  return null;
}

function createServer() {
  return http.createServer((request, response) => {
    const filePath = resolveFilePath(request.url || "/");
    if (!filePath) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": getMimeType(filePath),
      "Cache-Control": "no-store",
    });

    fs.createReadStream(filePath).pipe(response);
  });
}

function startWatchMode() {
  const watchDirs = getSourceDirectories();
  if (!watchDirs.length) {
    console.warn("[preview] No source directories found for watch mode.");
    return;
  }

  let timer = null;

  watchDirs.forEach((dirPath) => {
    fs.watch(dirPath, { persistent: true }, () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        runSync();
      }, 300);
    });
    console.log(`[preview] Watching ${dirPath}`);
  });
}

function printQuickLinks() {
  const siteDataPath = path.join(REPO_ROOT, "data", "site-data.json");
  if (!fs.existsSync(siteDataPath)) {
    return;
  }

  try {
    const siteData = JSON.parse(fs.readFileSync(siteDataPath, "utf8"));
    const latestIssueId = siteData.issues?.[0]?.id;
    if (latestIssueId) {
      console.log(`[preview] Latest issue: http://localhost:${PORT}/issue.html?id=${encodeURIComponent(latestIssueId)}`);
    }
  } catch (error) {
    console.warn("[preview] Failed to read quick links from site-data.json.");
  }
}

function main() {
  if (!Number.isInteger(PORT) || PORT <= 0 || PORT > 65535) {
    console.error("[preview] Invalid AI_NEWS_PREVIEW_PORT value.");
    process.exit(1);
  }

  runSync();

  const server = createServer();
  server.listen(PORT, () => {
    console.log(`[preview] Serving /Users/sc-claw/Desktop/Github/ai-news at http://localhost:${PORT}`);
    console.log("[preview] Press Ctrl+C to stop.");
    printQuickLinks();

    if (WATCH_MODE) {
      startWatchMode();
      console.log("[preview] Auto-sync is enabled (--watch).");
    }
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("\n[preview] Stopped.");
      process.exit(0);
    });
  });
}

main();

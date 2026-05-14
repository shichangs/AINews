const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO_ROOT = path.join(__dirname, "..");
const GIT_BIN = process.env.AI_NEWS_GIT_BIN || "git";
const STATE_PATH =
  process.env.AI_NEWS_STATE_PATH ||
  path.join(os.homedir(), "Library", "Application Support", "AINews", "auto-publish-state.json");
const LEGACY_STATE_PATH = path.join(REPO_ROOT, "logs", "auto-publish-state.json");
const COMMIT_MESSAGE = "chore: update generated AI news data";
const AUTO_SUBJECT_PATTERNS = [
  /^chore: update generated AI news data$/,
  /^chore\(content\): sync /,
  /^chore\(sync\): /,
  /^chore: fallback sync /,
];
function isAutoSubject(subject) {
  return AUTO_SUBJECT_PATTERNS.some((re) => re.test(subject));
}
const DAILY_DIR =
  process.env.AI_NEWS_DAILY_DIR || path.join(os.homedir(), "Desktop", "ClaudeCode", "daily-ai-news");
const WEEKLY_DIR =
  process.env.AI_NEWS_WEEKLY_DIR || path.join(DAILY_DIR, "weekly");
const PORTFOLIO_DIR =
  process.env.AI_NEWS_PORTFOLIO_DIR ||
  path.join(os.homedir(), "Desktop", "ClaudeCode", "portfolio-news");
const TECH_DIR =
  process.env.AI_NEWS_TECH_DIR || path.join(os.homedir(), "Desktop", "ClaudeCode", "weekly-ai-tech");

// Repo-local content directories (single source for site build)
const CONTENT_DAILY_DIR = path.join(REPO_ROOT, "content", "daily-ai-news");
const CONTENT_WEEKLY_DIR = path.join(CONTENT_DAILY_DIR, "weekly");
const CONTENT_PORTFOLIO_DIR = path.join(REPO_ROOT, "content", "portfolio-news");
const CONTENT_TECH_DIR = path.join(REPO_ROOT, "content", "weekly-ai-tech");
const EXEC_ENV = {
  ...process.env,
  HOME: process.env.HOME || os.homedir(),
  PATH: process.env.PATH || "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
  GIT_TERMINAL_PROMPT: process.env.GIT_TERMINAL_PROMPT || "0",
};
const FS_RETRY_MAX = 8;
const FS_RETRY_DELAY_MS = 120;

function exec(command, args) {
  try {
    return execFileSync(command, args, {
      cwd: REPO_ROOT,
      env: EXEC_ENV,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (error.stdout) {
      process.stdout.write(String(error.stdout));
    }
    if (error.stderr) {
      process.stderr.write(String(error.stderr));
    }
    throw error;
  }
}

function sleep(milliseconds) {
  const sab = new SharedArrayBuffer(4);
  const view = new Int32Array(sab);
  Atomics.wait(view, 0, 0, milliseconds);
}

function isTransientFsError(error) {
  if (!error) {
    return false;
  }
  const message = String(error.message || "");
  return (
    error.code === "EAGAIN" ||
    error.code === "EMFILE" ||
    error.syscall === "open" ||
    error.syscall === "read" ||
    message.includes("Unknown system error -11")
  );
}

function withFsRetry(fn) {
  for (let attempt = 1; attempt <= FS_RETRY_MAX; attempt += 1) {
    try {
      return fn();
    } catch (error) {
      if (!isTransientFsError(error) || attempt === FS_RETRY_MAX) {
        throw error;
      }
      sleep(FS_RETRY_DELAY_MS * attempt);
    }
  }
  throw new Error("Retry loop unexpectedly exited.");
}

function listMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return withFsRetry(() => fs.readdirSync(dirPath))
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
        const content = withFsRetry(() => fs.readFileSync(fullPath, "utf8"));
        return `${fullPath}:${hashContent(content)}`;
      }),
    )
    .sort()
    .join("|");
}

function isEligibleSourceFile(srcDir, fileName) {
  if (srcDir === DAILY_DIR) {
    return /^\d{4}-\d{2}-\d{2}\.md$/.test(fileName);
  }
  if (srcDir === WEEKLY_DIR) {
    // weekly dir contains ISO-week summaries (YYYY-Www.md), and historically also
    // some YYYY-MM-DD.md daily snapshots — accept both so weekly digests stay in sync.
    return /^\d{4}-W\d{2}\.md$/.test(fileName) || /^\d{4}-\d{2}-\d{2}\.md$/.test(fileName);
  }
  if (srcDir === PORTFOLIO_DIR) {
    return /^portfolio-news-\d{4}-\d{2}-\d{2}\.md$/.test(fileName);
  }
  if (srcDir === TECH_DIR) {
    return /^weekly-ai-tech-\d{4}-\d{2}-\d{2}\.md$/.test(fileName);
  }
  return true;
}

function copyMarkdownFiles(srcDir, dstDir) {
  if (!fs.existsSync(srcDir)) {
    return 0;
  }
  withFsRetry(() => fs.mkdirSync(dstDir, { recursive: true }));
  let copied = 0;
  for (const fileName of listMarkdownFiles(srcDir).filter((f) => isEligibleSourceFile(srcDir, f))) {
    const src = path.join(srcDir, fileName);
    const dst = path.join(dstDir, fileName);
    const srcContent = withFsRetry(() => fs.readFileSync(src, "utf8"));
    const dstContent = fs.existsSync(dst) ? withFsRetry(() => fs.readFileSync(dst, "utf8")) : null;
    if (dstContent !== srcContent) {
      withFsRetry(() => fs.writeFileSync(dst, srcContent, "utf8"));
      copied += 1;
    }
  }
  return copied;
}

function syncExternalSourcesToRepo() {
  let changed = 0;
  changed += copyMarkdownFiles(DAILY_DIR, CONTENT_DAILY_DIR);
  changed += copyMarkdownFiles(WEEKLY_DIR, CONTENT_WEEKLY_DIR);
  changed += copyMarkdownFiles(PORTFOLIO_DIR, CONTENT_PORTFOLIO_DIR);
  changed += copyMarkdownFiles(TECH_DIR, CONTENT_TECH_DIR);
  return changed;
}

function readState() {
  const candidates = [STATE_PATH, LEGACY_STATE_PATH];
  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) {
      continue;
    }
    try {
      return JSON.parse(withFsRetry(() => fs.readFileSync(filePath, "utf8")));
    } catch (error) {
      console.warn(`[auto] State file is unreadable at ${filePath}. Trying next path.`);
    }
  }
  return { sourceSignature: "" };
}

function writeState(sourceSignature, lastNewContentAt) {
  withFsRetry(() => {
    fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
    fs.writeFileSync(
      STATE_PATH,
      `${JSON.stringify(
        {
          sourceSignature,
          updatedAt: new Date().toISOString(),
          lastNewContentAt: lastNewContentAt || null,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
  });
}

const UPSTREAM_STALE_DAYS = Number(process.env.AI_NEWS_UPSTREAM_STALE_DAYS || 3);

function warnIfUpstreamStale(state, copiedThisRun) {
  if (copiedThisRun > 0) {
    return;
  }
  const lastSeen = state.lastNewContentAt ? new Date(state.lastNewContentAt) : null;
  if (!lastSeen || Number.isNaN(lastSeen.getTime())) {
    return;
  }
  const ageDays = (Date.now() - lastSeen.getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays > UPSTREAM_STALE_DAYS) {
    console.warn(
      `[auto][UPSTREAM-STALE] No new external content for ${ageDays.toFixed(1)} days ` +
        `(last seen ${state.lastNewContentAt}, threshold ${UPSTREAM_STALE_DAYS}). ` +
        `Check upstream generator at ${DAILY_DIR}.`,
    );
  }
}

function getCurrentBranch() {
  return exec(GIT_BIN, ["branch", "--show-current"]);
}

function getUnpushedCommitSubjects() {
  const output = exec(GIT_BIN, ["log", "--format=%s", "origin/main..HEAD"]);
  return output ? output.split("\n").filter(Boolean) : [];
}

const CONTENT_PATHS = [
  "content/daily-ai-news",
  "content/portfolio-news",
  "content/weekly-ai-tech",
];

function hasGeneratedDiff() {
  return Boolean(exec(GIT_BIN, ["status", "--porcelain", "--", ...CONTENT_PATHS]));
}

function commitGeneratedContent() {
  exec(GIT_BIN, ["add", "--", ...CONTENT_PATHS]);

  if (!hasGeneratedDiff()) {
    console.log("[auto] No publishable content diff.");
    return false;
  }

  const output = exec(GIT_BIN, ["commit", "-m", COMMIT_MESSAGE, "--", ...CONTENT_PATHS]);
  if (output) {
    process.stdout.write(`${output}\n`);
  }
  return true;
}

function pushWithRebaseRetry() {
  try {
    const output = exec(GIT_BIN, ["push", "origin", "main"]);
    if (output) {
      process.stdout.write(`${output}\n`);
    }
    return;
  } catch (_) {
    console.log("[auto] Initial push rejected. Trying fetch + whitelist recheck + rebase + retry.");
  }

  exec(GIT_BIN, ["fetch", "origin", "main"]);

  const subjects = getUnpushedCommitSubjects();
  const blocker = subjects.find((s) => !isAutoSubject(s));
  if (blocker) {
    throw new Error(`After fetch, blocking subject still present: "${blocker}". Refusing to rebase.`);
  }

  const status = exec(GIT_BIN, ["status", "--porcelain"]).trim();
  if (status) {
    throw new Error(`Working tree dirty before rebase: ${status}`);
  }

  try {
    exec(GIT_BIN, ["rebase", "origin/main"]);
  } catch (error) {
    try {
      exec(GIT_BIN, ["rebase", "--abort"]);
    } catch (_) {
      /* ignore — rebase may not actually be in progress */
    }
    throw new Error(`Rebase failed; aborted. ${error.message}`);
  }

  const retryOutput = exec(GIT_BIN, ["push", "origin", "main"]);
  if (retryOutput) {
    process.stdout.write(`${retryOutput}\n`);
  }
}

function main() {
  const sourceSignature = buildSourceSignature();
  if (!sourceSignature) {
    console.log("[auto] No markdown sources found. Skip publish.");
    return;
  }

  const branch = getCurrentBranch();
  if (branch !== "main") {
    console.log(`[auto] Current branch is "${branch || "detached"}". Skip auto publish until on main.`);
    return;
  }

  try {
    exec(GIT_BIN, ["fetch", "origin", "main"]);
  } catch (error) {
    console.warn(`[auto] fetch origin failed (continuing with local view): ${error.message || error}`);
  }

  const unpushedSubjects = getUnpushedCommitSubjects();
  const blocker = unpushedSubjects.find((s) => !isAutoSubject(s));
  if (blocker) {
    console.log(`[auto][BLOCKED] Non-auto commit subject: "${blocker}". Skip auto publish.`);
    return;
  }

  const state = readState();
  const copied = syncExternalSourcesToRepo();
  if (copied > 0) {
    console.log(`[auto] Synced ${copied} markdown file(s) from external sources into repo content/.`);
  }
  warnIfUpstreamStale(state, copied);
  const lastNewContentAt = copied > 0 ? new Date().toISOString() : state.lastNewContentAt || null;

  commitGeneratedContent();

  const finalSubjects = getUnpushedCommitSubjects();
  if (finalSubjects.length === 0) {
    writeState(sourceSignature, lastNewContentAt);
    console.log("[auto] Nothing to publish.");
    return;
  }

  try {
    pushWithRebaseRetry();
    writeState(sourceSignature, lastNewContentAt);
    console.log(`[auto] Pushed ${finalSubjects.length} commit(s) to origin/main.`);
  } catch (error) {
    console.error(`[auto] Push failed: ${error.message || error}`);
    process.exitCode = 1;
  }
}

main();

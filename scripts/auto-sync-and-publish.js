const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO_ROOT = path.join(__dirname, "..");
const NODE_BIN = process.execPath;
const GIT_BIN = process.env.AI_NEWS_GIT_BIN || "git";
const SYNC_SCRIPT = path.join(__dirname, "sync-content.js");
const OUTPUT_FILE = path.join(REPO_ROOT, "data", "site-data.json");
const STATE_PATH =
  process.env.AI_NEWS_STATE_PATH ||
  path.join(os.homedir(), "Library", "Application Support", "AINews", "auto-publish-state.json");
const LEGACY_STATE_PATH = path.join(REPO_ROOT, "logs", "auto-publish-state.json");
const COMMIT_MESSAGE = "chore: update generated AI news data";
const DAILY_DIR =
  process.env.AI_NEWS_DAILY_DIR || path.join(os.homedir(), "Desktop", "ClaudeCode", "daily-ai-news");
const WEEKLY_DIR =
  process.env.AI_NEWS_WEEKLY_DIR || path.join(DAILY_DIR, "weekly");
const PORTFOLIO_DIR =
  process.env.AI_NEWS_PORTFOLIO_DIR ||
  path.join(os.homedir(), "Desktop", "ClaudeCode", "portfolio-news");
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
  return [...new Set([DAILY_DIR, WEEKLY_DIR, PORTFOLIO_DIR].map((dirPath) => path.resolve(dirPath)))]
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

function writeState(sourceSignature) {
  withFsRetry(() => {
    fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
    fs.writeFileSync(
      STATE_PATH,
      `${JSON.stringify(
        {
          sourceSignature,
          updatedAt: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
  });
}

function getCurrentBranch() {
  return exec(GIT_BIN, ["branch", "--show-current"]);
}

function getUnpushedCommitSubjects() {
  const output = exec(GIT_BIN, ["log", "--format=%s", "origin/main..HEAD"]);
  return output ? output.split("\n").filter(Boolean) : [];
}

function hasOnlyAutoCommits(subjects) {
  return subjects.length > 0 && subjects.every((subject) => subject === COMMIT_MESSAGE);
}

function hasGeneratedDiff() {
  return Boolean(exec(GIT_BIN, ["status", "--porcelain", "--", "data/site-data.json"]));
}

function syncContent() {
  const output = exec(NODE_BIN, [SYNC_SCRIPT]);
  if (output) {
    process.stdout.write(`${output}\n`);
  }
}

function commitGeneratedData() {
  exec(GIT_BIN, ["add", "--", "data/site-data.json"]);

  if (!hasGeneratedDiff()) {
    console.log("[auto] data/site-data.json has no git diff after sync.");
    return false;
  }

  const output = exec(GIT_BIN, ["commit", "-m", COMMIT_MESSAGE, "--", "data/site-data.json"]);
  if (output) {
    process.stdout.write(`${output}\n`);
  }
  return true;
}

function pushMain() {
  const output = exec(GIT_BIN, ["push", "origin", "main"]);
  if (output) {
    process.stdout.write(`${output}\n`);
  }
}

function main() {
  const sourceSignature = buildSourceSignature();
  const state = readState();

  if (!sourceSignature) {
    console.log("[auto] No markdown sources found. Skip publish.");
    return;
  }

  if (!state.sourceSignature) {
    writeState(sourceSignature);
    console.log("[auto] Initialized source signature. Waiting for the next content change.");
    return;
  }

  const branch = getCurrentBranch();
  if (branch !== "main") {
    console.log(`[auto] Current branch is "${branch || "detached"}". Skip auto publish until on main.`);
    return;
  }

  const unpushedSubjects = getUnpushedCommitSubjects();
  if (unpushedSubjects.some((subject) => subject !== COMMIT_MESSAGE)) {
    console.log("[auto] Found non-auto commits ahead of origin/main. Skip auto publish.");
    return;
  }

  if (sourceSignature === state.sourceSignature) {
    if (hasOnlyAutoCommits(unpushedSubjects)) {
      try {
        pushMain();
        console.log("[auto] Pushed pending auto-publish commit(s) to origin/main.");
      } catch (error) {
        console.error("[auto] Push retry failed. Pending auto commit(s) were kept locally.");
        process.exitCode = 1;
      }
      return;
    }

    console.log("[auto] No source content change. Skip sync.");
    return;
  }

  syncContent();

  if (!fs.existsSync(OUTPUT_FILE)) {
    throw new Error(`Missing generated file: ${OUTPUT_FILE}`);
  }

  if (!hasGeneratedDiff()) {
    if (hasOnlyAutoCommits(unpushedSubjects)) {
      try {
        pushMain();
        writeState(sourceSignature);
        console.log("[auto] Pushed pending auto-publish commit(s) after unchanged regeneration.");
      } catch (error) {
        console.error("[auto] Push retry failed. Pending auto commit(s) were kept locally.");
        process.exitCode = 1;
      }
      return;
    }

    writeState(sourceSignature);
    console.log("[auto] Source changed, but generated data file is unchanged.");
    return;
  }

  const committed = commitGeneratedData();
  if (!committed) {
    return;
  }

  try {
    pushMain();
    writeState(sourceSignature);
    console.log("[auto] Pushed generated data to origin/main.");
  } catch (error) {
    console.error("[auto] Push failed. The local data commit was kept.");
    process.exitCode = 1;
  }
}

main();

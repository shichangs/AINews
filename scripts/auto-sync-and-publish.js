const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { buildSourceSignature } = require("./lib/source-state");

const REPO_ROOT = path.join(__dirname, "..");
const NODE_BIN = process.execPath;
const GIT_BIN = process.env.AI_NEWS_GIT_BIN || "/usr/local/bin/git";
const SYNC_SCRIPT = path.join(__dirname, "sync-content.js");
const OUTPUT_FILE = path.join(REPO_ROOT, "data", "site-data.json");
const STATE_PATH = path.join(REPO_ROOT, "logs", "auto-publish-state.json");
const COMMIT_MESSAGE = "chore: update generated AI news data";

function exec(command, args) {
  try {
    return execFileSync(command, args, {
      cwd: REPO_ROOT,
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

function readState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { sourceSignature: "" };
  }

  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  } catch (error) {
    console.warn("[auto] State file is unreadable. Rebuilding state.");
    return { sourceSignature: "" };
  }
}

function writeState(sourceSignature) {
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

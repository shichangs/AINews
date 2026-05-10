#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const STALE_DAYS_THRESHOLD = Number(process.env.AI_NEWS_STALE_DAYS || 2);
const REMOTE_URL = process.env.AI_NEWS_HEALTH_URL;

const REPO_ROOT = path.join(__dirname, "..");
const LOCAL_PATH = path.join(REPO_ROOT, "data", "site-data.json");

async function loadJson() {
  if (REMOTE_URL) {
    const response = await fetch(REMOTE_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} fetching ${REMOTE_URL}`);
    }
    return response.json();
  }
  if (!fs.existsSync(LOCAL_PATH)) {
    throw new Error(`site-data.json not found at ${LOCAL_PATH}`);
  }
  return JSON.parse(fs.readFileSync(LOCAL_PATH, "utf8"));
}

(async () => {
  const data = await loadJson();
  const generatedAt = data.generatedAt ? new Date(data.generatedAt) : null;
  const latestIssueId = data.issues && data.issues[0] ? data.issues[0].id : null;
  if (!generatedAt || Number.isNaN(generatedAt.getTime())) {
    console.error("[health] Missing or invalid generatedAt.");
    process.exit(2);
  }
  const ageMs = Date.now() - generatedAt.getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const source = REMOTE_URL || LOCAL_PATH;
  const stale = ageDays > STALE_DAYS_THRESHOLD;
  const tag = stale ? "[health][STALE]" : "[health]";
  console.log(
    `${tag} source=${source} generatedAt=${data.generatedAt} latestIssue=${latestIssueId} ageDays=${ageDays.toFixed(2)} threshold=${STALE_DAYS_THRESHOLD}`,
  );
  if (stale) {
    process.exit(1);
  }
})().catch((error) => {
  console.error(`[health] check failed: ${error.message || error}`);
  process.exit(2);
});

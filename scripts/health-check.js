#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const STALE_DAYS_THRESHOLD = Number(process.env.AI_NEWS_STALE_DAYS || 2);
const LATEST_ISSUE_STALE_DAYS = Number(process.env.AI_NEWS_LATEST_ISSUE_STALE_DAYS || 3);
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

function ageInDays(date) {
  return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
}

(async () => {
  const data = await loadJson();
  const source = REMOTE_URL || LOCAL_PATH;

  const generatedAt = data.generatedAt ? new Date(data.generatedAt) : null;
  if (!generatedAt || Number.isNaN(generatedAt.getTime())) {
    console.error("[health] Missing or invalid generatedAt.");
    process.exit(2);
  }
  const generatedAtAge = ageInDays(generatedAt);
  const generatedStale = generatedAtAge > STALE_DAYS_THRESHOLD;

  const latestIssueId = data.issues && data.issues[0] ? data.issues[0].id : null;
  let latestIssueAge = null;
  let latestIssueStale = false;
  if (latestIssueId && /^\d{4}-\d{2}-\d{2}$/.test(latestIssueId)) {
    const latestIssueDate = new Date(`${latestIssueId}T00:00:00Z`);
    if (!Number.isNaN(latestIssueDate.getTime())) {
      latestIssueAge = ageInDays(latestIssueDate);
      latestIssueStale = latestIssueAge > LATEST_ISSUE_STALE_DAYS;
    }
  }

  const stale = generatedStale || latestIssueStale;
  const reasons = [];
  if (generatedStale) reasons.push("generatedAt");
  if (latestIssueStale) reasons.push("latestIssue");
  const tag = stale ? `[health][STALE:${reasons.join(",")}]` : "[health]";

  console.log(
    `${tag} source=${source} generatedAt=${data.generatedAt} ` +
      `generatedAgeDays=${generatedAtAge.toFixed(2)} (threshold=${STALE_DAYS_THRESHOLD}) ` +
      `latestIssue=${latestIssueId} ` +
      `latestIssueAgeDays=${latestIssueAge !== null ? latestIssueAge.toFixed(2) : "n/a"} ` +
      `(threshold=${LATEST_ISSUE_STALE_DAYS})`,
  );
  if (stale) {
    process.exit(1);
  }
})().catch((error) => {
  console.error(`[health] check failed: ${error.message || error}`);
  process.exit(2);
});

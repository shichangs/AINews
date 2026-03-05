const DATA_URL = "./data/site-data.json";

const elements = {
  issueTitle: document.getElementById("issue-title"),
  issueSummary: document.getElementById("issue-summary"),
  issueMeta: document.getElementById("issue-meta"),
  storyJumps: document.getElementById("story-jumps"),
  reportContent: document.getElementById("report-content"),
  issueList: document.getElementById("issue-list"),
  lastUpdated: document.getElementById("last-updated"),
};

function getIssueId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function formatGeneratedAt(isoString) {
  if (!isoString) {
    return "未同步";
  }
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function renderIssueFeed(siteData, currentIssue) {
  elements.issueList.innerHTML = "";
  siteData.issues.forEach((issue) => {
    const item = document.createElement("a");
    item.className = `timeline-item${issue.id === currentIssue.id ? " is-active" : ""}`;
    item.href = `./issue.html?id=${encodeURIComponent(issue.id)}`;
    item.innerHTML = `
      <p class="date">${issue.date}</p>
      <h3>${issue.title}</h3>
      <p>${issue.summary}</p>
    `;
    elements.issueList.appendChild(item);
  });
}

function renderJumpList(issue) {
  elements.storyJumps.innerHTML = "";
  if (!issue.stories.length) {
    elements.storyJumps.innerHTML = '<p class="jump-empty">当前日报没有提取到焦点。</p>';
    return;
  }

  issue.stories.forEach((story) => {
    const link = document.createElement("a");
    link.className = "jump-link";
    link.href = `#${story.anchor || ""}`;
    link.textContent = story.title;
    elements.storyJumps.appendChild(link);
  });
}

function scrollToHash() {
  if (!window.location.hash) {
    return;
  }
  const targetId = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function shouldShowLeadSummary(issue) {
  if (!issue?.summary) {
    return false;
  }
  const htmlContent = (issue.htmlContent || "").trimStart();
  return !/^<h[2-6]\b/i.test(htmlContent);
}

function renderLastUpdated(isoString) {
  if (!elements.lastUpdated) {
    return;
  }
  elements.lastUpdated.textContent = `最后更新：${formatGeneratedAt(isoString)}`;
}

async function init() {
  elements.reportContent.innerHTML = '<div class="empty-state">正在载入完整日报…</div>';
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${DATA_URL}`);
    }

    const siteData = await response.json();
    const requestedIssueId = getIssueId();
    const currentIssue =
      siteData.issues.find((issue) => issue.id === requestedIssueId) || siteData.issues[0];

    if (!currentIssue) {
      throw new Error("No issues available.");
    }

    document.title = `${currentIssue.title} - AI News Pulse`;
    elements.issueTitle.textContent = currentIssue.title;
    const showSummary = shouldShowLeadSummary(currentIssue);
    elements.issueSummary.hidden = !showSummary;
    elements.issueSummary.textContent = showSummary ? currentIssue.summary : "";
    elements.reportContent.innerHTML = currentIssue.htmlContent;

    elements.issueMeta.innerHTML = [
      `<span class="meta-pill">${currentIssue.label}</span>`,
      `<span class="meta-pill">${currentIssue.sections.length} 个板块</span>`,
      `<span class="meta-pill">同步于 ${formatGeneratedAt(siteData.generatedAt)}</span>`,
    ].join("");

    renderJumpList(currentIssue);
    renderIssueFeed(siteData, currentIssue);
    renderLastUpdated(siteData.generatedAt);

    requestAnimationFrame(scrollToHash);
  } catch (error) {
    elements.issueSummary.textContent = "请先运行同步脚本生成数据，然后刷新页面。";
    elements.reportContent.innerHTML =
      '<div class="empty-state">未能读取完整日报数据。请检查 data/site-data.json 是否存在。</div>';
    renderLastUpdated();
    console.error(error);
  }
}

init();

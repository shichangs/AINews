const DATA_URL = "./data/site-data.json";
const FONT_SIZE_STORAGE_KEY = "ai-news-font-size";
const FONT_SIZE_OPTIONS = new Set(["compact", "default", "comfortable"]);

const TAB_CONFIG = {
  daily: { label: "每日 AI 新闻" },
  weekly: { label: "每周 AI 新闻" },
  portfolio: { label: "投资组合汇总" },
};

const state = {
  siteData: null,
  activeTab: "daily",
  fontSize: "default",
  selectedIds: {
    daily: null,
    weekly: null,
    portfolio: null,
  },
};

const elements = {
  tabStrip: document.getElementById("tab-strip"),
  fontSizeSwitch: document.getElementById("font-size-switch"),
  dateStrip: document.getElementById("date-strip"),
  articleTitle: document.getElementById("article-title"),
  articleSummary: document.getElementById("article-summary"),
  reportContent: document.getElementById("report-content"),
};

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

function showError(message) {
  elements.dateStrip.innerHTML =
    '<div class="empty-state compact-empty">站点数据暂时不可用。</div>';
  if (elements.fontSizeSwitch) {
    elements.fontSizeSwitch.title = "数据未加载";
  }
  elements.articleTitle.textContent = "没有可用内容";
  elements.articleSummary.textContent = message;
  elements.reportContent.innerHTML = `<div class="empty-state">${message}</div>`;
}

function getStoredFontSize() {
  try {
    const storedSize = window.localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    if (storedSize && FONT_SIZE_OPTIONS.has(storedSize)) {
      return storedSize;
    }
  } catch (error) {
    console.warn("Unable to read saved font size.", error);
  }
  return "default";
}

function applyFontSize(size, persist = true) {
  const nextSize = FONT_SIZE_OPTIONS.has(size) ? size : "default";
  state.fontSize = nextSize;

  document.body.classList.remove(
    "reading-compact",
    "reading-default",
    "reading-comfortable",
  );
  document.body.classList.add(`reading-${nextSize}`);

  if (elements.fontSizeSwitch) {
    elements.fontSizeSwitch.querySelectorAll(".font-size-button").forEach((button) => {
      const isActive = button.dataset.size === nextSize;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  if (!persist) {
    return;
  }

  try {
    window.localStorage.setItem(FONT_SIZE_STORAGE_KEY, nextSize);
  } catch (error) {
    console.warn("Unable to save font size.", error);
  }
}

function getCollection(tabKey) {
  if (!state.siteData) {
    return [];
  }

  if (tabKey === "daily") {
    return state.siteData.issues || [];
  }
  if (tabKey === "weekly") {
    if (state.siteData.weeklyReports?.length) {
      return state.siteData.weeklyReports;
    }
    if (state.siteData.weeklyDigest) {
      return [state.siteData.weeklyDigest];
    }
    return [];
  }
  if (tabKey === "portfolio") {
    if (state.siteData.portfolioReports?.length) {
      return state.siteData.portfolioReports;
    }
    if (state.siteData.marketBrief) {
      return [state.siteData.marketBrief];
    }
  }
  return [];
}

function getSelectedItem(tabKey) {
  const collection = getCollection(tabKey);
  const selectedId = state.selectedIds[tabKey];
  return collection.find((item) => item.id === selectedId) || collection[0] || null;
}

function ensureDefaults() {
  Object.keys(TAB_CONFIG).forEach((tabKey) => {
    const collection = getCollection(tabKey);
    if (!state.selectedIds[tabKey] && collection.length) {
      state.selectedIds[tabKey] = collection[0].id;
    }
  });
}

function updateUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("tab", state.activeTab);
  const selectedItem = getSelectedItem(state.activeTab);
  if (selectedItem) {
    url.searchParams.set("id", selectedItem.id);
  } else {
    url.searchParams.delete("id");
  }
  window.history.replaceState({}, "", url);
}

function pruneLeadingTitle(title) {
  const first = elements.reportContent.firstElementChild;
  if (!first || !/^H[1-6]$/.test(first.tagName)) {
    return;
  }

  if (first.textContent.trim() !== title.trim()) {
    return;
  }

  first.remove();
  const next = elements.reportContent.firstElementChild;
  if (next && next.classList.contains("report-rule")) {
    next.remove();
  }
}

function decorateArticleContent() {
  const headings = elements.reportContent.querySelectorAll("h4");
  headings.forEach((heading) => {
    const text = heading.textContent.trim();
    if (/^\d+\.\s/.test(text)) {
      heading.classList.add("topic-heading");
      return;
    }
    heading.classList.add("entry-heading");
  });

  const blocks = elements.reportContent.querySelectorAll("p");
  blocks.forEach((block) => {
    const text = block.textContent.trim();
    if (text.startsWith("来源：") || text.startsWith("来源:")) {
      block.classList.add("source-note");
    }
  });

  const sourceBlocks = [...elements.reportContent.querySelectorAll("p.source-note")];
  sourceBlocks.forEach((block) => {
    const previousBlock = block.previousElementSibling;
    if (!previousBlock || previousBlock.tagName !== "P") {
      return;
    }

    const links = [...block.querySelectorAll("a")];
    if (!links.length) {
      return;
    }

    const inlineSource = document.createElement("span");
    inlineSource.className = "inline-source";
    inlineSource.append("（来源：");

    links.forEach((link, index) => {
      const sourceLink = link.cloneNode(true);
      sourceLink.textContent = link.textContent
        .replace(/^来源\s*[·:：-]?\s*/u, "")
        .trim();
      inlineSource.append(sourceLink);
      if (index < links.length - 1) {
        inlineSource.append(" / ");
      }
    });

    inlineSource.append("）");
    previousBlock.append(" ");
    previousBlock.append(inlineSource);
    block.remove();
  });
}

function renderTabs() {
  const buttons = elements.tabStrip.querySelectorAll(".tab-button");
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
  });
}

function scrollActiveDateIntoView() {
  const active = elements.dateStrip.querySelector(".date-node.is-active");
  if (!active) {
    return;
  }
  active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function renderDateStrip() {
  const tabKey = state.activeTab;
  const collection = getCollection(tabKey);
  const selectedItem = getSelectedItem(tabKey);

  elements.dateStrip.innerHTML = "";

  if (!collection.length) {
    elements.dateStrip.innerHTML =
      '<div class="empty-state compact-empty">当前专栏还没有文章。</div>';
    return;
  }

  collection.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `date-node${item.id === selectedItem?.id ? " is-active" : ""}`;
    button.textContent = item.label || item.date || "最新";
    button.setAttribute("aria-pressed", item.id === selectedItem?.id ? "true" : "false");
    button.title = item.title;
    button.addEventListener("click", () => {
      if (state.selectedIds[tabKey] === item.id) {
        return;
      }
      state.selectedIds[tabKey] = item.id;
      updateUrl();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    elements.dateStrip.appendChild(button);
  });

  requestAnimationFrame(scrollActiveDateIntoView);
}

function renderArticle() {
  const tabKey = state.activeTab;
  const item = getSelectedItem(tabKey);

  if (!item) {
    elements.articleTitle.textContent = "没有可用内容";
    elements.articleSummary.textContent = "";
    elements.reportContent.innerHTML =
      '<div class="empty-state">当前专栏还没有可展示的文章。</div>';
    return;
  }

  elements.articleTitle.textContent = item.title;
  elements.articleSummary.textContent = item.summary || "";
  elements.reportContent.innerHTML = item.htmlContent || "";
  pruneLeadingTitle(item.title);
  decorateArticleContent();
}

function render() {
  renderTabs();
  renderDateStrip();
  renderArticle();
}

function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedTab = params.get("tab");
  const requestedId = params.get("id");

  if (requestedTab && TAB_CONFIG[requestedTab]) {
    state.activeTab = requestedTab;
  }

  if (!requestedId) {
    return;
  }

  const collection = getCollection(state.activeTab);
  if (collection.some((item) => item.id === requestedId)) {
    state.selectedIds[state.activeTab] = requestedId;
  }
}

function bindEvents() {
  elements.tabStrip.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTab = button.dataset.tab;
      if (!TAB_CONFIG[nextTab] || state.activeTab === nextTab) {
        return;
      }
      state.activeTab = nextTab;
      ensureDefaults();
      updateUrl();
      render();
    });
  });

  if (elements.fontSizeSwitch) {
    elements.fontSizeSwitch.querySelectorAll(".font-size-button").forEach((button) => {
      button.addEventListener("click", () => {
        const nextSize = button.dataset.size;
        if (!nextSize || nextSize === state.fontSize) {
          return;
        }
        applyFontSize(nextSize);
      });
    });
  }
}

async function init() {
  applyFontSize(getStoredFontSize(), false);
  bindEvents();
  elements.reportContent.innerHTML = '<div class="empty-state">正在载入文章…</div>';
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${DATA_URL}`);
    }

    state.siteData = await response.json();
    ensureDefaults();
    initFromUrl();
    ensureDefaults();
    if (elements.fontSizeSwitch) {
      elements.fontSizeSwitch.title = `最近同步：${formatGeneratedAt(state.siteData.generatedAt)}`;
    }
    updateUrl();
    render();
  } catch (error) {
    showError("未能读取站点数据。请先运行同步脚本，再刷新页面。");
    console.error(error);
  }
}

init();

const issues = [
  {
    id: "2026-02-28",
    date: "2026-02-28",
    label: "2月28日",
    title: "资本狂飙与地缘冲突，把 AI 行业推到新高点",
    summary:
      "OpenAI 完成 1100 亿美元超大融资，Anthropic 与五角大楼就军事边界正面冲突，中国市场同步进入密集发版和资本冲刺阶段。",
    keyMetrics: [
      { value: "$1100 亿", label: "OpenAI 融资额" },
      { value: "8000+", label: "公网暴露 MCP 服务器" },
      { value: "$1950 亿", label: "2 月 AI 融资总额" },
    ],
    sourceFile:
      "/Users/shichangliao/Desktop/ClaudeCode/daily-ai-news/2026-02-28.md",
    stories: [
      {
        tag: "融资",
        impact: "超大额",
        title: "OpenAI 完成史上最大私募融资",
        detail:
          "亚马逊、英伟达和软银共同领投，融资规模远高于先前市场预期，行业进入更激进的资金竞争阶段。",
        links: [
          {
            label: "TechCrunch",
            url: "https://techcrunch.com/2026/02/27/openai-raises-110b-in-one-of-the-largest-private-funding-rounds-in-history/",
          },
          {
            label: "Bloomberg",
            url: "https://www.bloomberg.com/news/articles/2026-02-27/openai-finalizes-110-billion-funding-at-730-billion-valuation",
          },
        ],
      },
      {
        tag: "政策",
        impact: "高压",
        title: "Anthropic 与五角大楼围绕模型红线对峙",
        detail:
          "Anthropic 拒绝将模型用于非法监控与全自主武器，特朗普政府向联邦机构施压；OpenAI 则选择以安全条款为前提继续合作。",
      },
      {
        tag: "Agent",
        impact: "安全",
        title: "MCP 暴露面扩大，8000 余台服务器无认证开放",
        detail:
          "协议扩张速度远快于安全治理，大量 MCP 服务器暴露管理端点和调试接口，说明企业级 Agent 运维已进入安全补课阶段。",
        links: [
          {
            label: "Medium",
            url: "https://cikce.medium.com/8-000-mcp-servers-exposed-the-agentic-ai-security-crisis-of-2026-e8cb45f09115",
          },
        ],
      },
      {
        tag: "产品",
        impact: "升级",
        title: "Claude Sonnet 4.6、GPT-5.2、Gemini 3.1 Pro 同周刷新能力上限",
        detail:
          "长上下文、编程评测和多模态能力同步提高，头部模型竞争从单点参数转向完整工作流效率。",
      },
      {
        tag: "中国 AI",
        impact: "激进",
        title: "中国“农历新年 AI 大战”进入全面对抗",
        detail:
          "字节、阿里、DeepSeek 等加快新模型发布，行业打法从模型能力竞争扩展到消费入口和商业化渗透。",
      },
      {
        tag: "机器人",
        impact: "扩张",
        title: "Waymo、Apptronik、Skild AI 推高物理 AI 估值天花板",
        detail:
          "自动驾驶与机器人融资在同一个月集体爆发，资本正在将 AI 投资从数字世界延伸到现实执行层。",
      },
    ],
  },
  {
    id: "2026-02-27",
    date: "2026-02-27",
    label: "2月27日",
    title: "军用 AI 边界与算力竞赛成为当天主线",
    summary:
      "五角大楼继续对 Anthropic 施压，xAI 抢占军方机密系统入口；与此同时，Meta、NVIDIA、AMD 的算力大单和 OpenAI 融资预期继续推高市场关注度。",
    keyMetrics: [
      { value: "$1000 亿+", label: "OpenAI 预期融资" },
      { value: "82.1%", label: "Claude Sonnet 5 SWE-Bench" },
      { value: "35.8%", label: "阿里云中国 AI 云份额" },
    ],
    sourceFile:
      "/Users/shichangliao/Desktop/ClaudeCode/daily-ai-news/2026-02-27.md",
    stories: [
      {
        tag: "政策",
        impact: "紧张",
        title: "五角大楼向 Anthropic 发出最后通牒",
        detail:
          "国防部要求解除 Claude 在军事场景中的限制，否则可能切断合同并重新定义其为供应链风险。",
        links: [
          {
            label: "Axios",
            url: "https://www.axios.com/2026/02/19/anthropic-pentagon-ai-fight-openai-google-xai",
          },
        ],
      },
      {
        tag: "融资",
        impact: "巨额",
        title: "OpenAI 新融资轮被推高到千亿美元级别",
        detail:
          "这一轮融资被市场视作冲击 IPO 窗口前的最后一次超大型私募，估值和营收目标同步抬升。",
      },
      {
        tag: "Agent",
        impact: "标准化",
        title: "MCP 捐赠 Linux 基金会后加速成为行业接口层",
        detail:
          "OpenAI、微软等继续公开拥抱 MCP，多 Agent 系统开始从实验走向标准化基础设施。",
      },
      {
        tag: "产品",
        impact: "编程",
        title: "Cursor 2.0 与 Windsurf Wave 13 打响 AI 编程工具大战",
        detail:
          "多 Agent 并行、计划模式、后台代理成为开发工具的新竞争核心，产品能力明显向执行层下沉。",
      },
      {
        tag: "中国 AI",
        impact: "份额",
        title: "阿里云继续领跑中国 AI 云市场",
        detail:
          "阿里云以 35.8% 的份额拉开与字节火山引擎、华为云的差距，开源与云服务形成联动优势。",
      },
      {
        tag: "机器人",
        impact: "落地",
        title: "中国人形机器人在春晚出圈，海外工厂开始小规模部署",
        detail:
          "公众认知和工业落地同时推进，机器人行业进入由展示转向交付的关键过渡期。",
      },
    ],
  },
  {
    id: "2026-02-26",
    date: "2026-02-26",
    label: "2月26日",
    title: "Agent 产品化加速，AI 生态从对话走向执行",
    summary:
      "Claude Code Scheduled Tasks、ChatGPT Agent、MCP 基金会化等事件集中出现，说明 2026 年初的竞争重心已经从单纯模型问答切到自动执行与工具生态。",
    keyMetrics: [
      { value: "10000+", label: "公开 MCP Server" },
      { value: "$600 亿", label: "Meta × AMD 芯片协议" },
      { value: "511 亿港元", label: "智谱 AI 上市市值" },
    ],
    sourceFile:
      "/Users/shichangliao/Desktop/ClaudeCode/daily-ai-news/2026-02-26.md",
    stories: [
      {
        tag: "产品",
        impact: "自动化",
        title: "Claude Code 推出 Scheduled Tasks",
        detail:
          "Claude 在常规对话之外获得定时执行能力，这使它更接近持续运行的工作代理，而不是仅靠手动触发的聊天工具。",
      },
      {
        tag: "产品",
        impact: "整合",
        title: "ChatGPT 把 Operator 升级为统一 Agent 系统",
        detail:
          "OpenAI 正把研究、浏览、执行和高风险控制汇总到单一 Agent 入口，产品形态进一步收敛。",
      },
      {
        tag: "Agent",
        impact: "生态",
        title: "MCP 正式捐赠给 Linux 基金会旗下 AAIF",
        detail:
          "协议进入更稳定的治理框架后，主流客户端和云厂商支持度持续上升，企业部署意愿将继续提升。",
      },
      {
        tag: "中国 AI",
        impact: "资本",
        title: "智谱 AI 上市与 Kimi 融资拉开新一轮国内融资周期",
        detail:
          "一边是独立大模型公司上市，一边是独角兽完成高额融资，国内市场重新进入估值重估阶段。",
      },
      {
        tag: "芯片",
        impact: "算力",
        title: "Meta 与 AMD 达成约 600 亿美元定制芯片大单",
        detail:
          "云厂商和模型公司开始更深度绑定硬件路线，算力采购已经不只是供应链问题，而是长期战略联盟。",
      },
      {
        tag: "自动驾驶",
        impact: "升温",
        title: "Waymo 与 Wayve 融资延续自动驾驶热度",
        detail:
          "自动驾驶再次成为物理 AI 资本焦点，市场正在押注执行型智能的商业化先行路径。",
      },
    ],
  },
];

const marketBrief = {
  title: "投资组合每周新闻简报",
  summary:
    "宏观数据依旧强势但通胀偏黏，市场对 AI 资本开支的耐受度正在被重新定价。组合内最强弹性来自算力链，最明显压力来自高估值和监管不确定性。",
  sourceFile:
    "/Users/shichangliao/Desktop/ClaudeCode/portfolio-news/portfolio-news-2026-02-26-updated.md",
  highlights: [
    { value: "+9%", label: "AMD 本周涨幅" },
    { value: "$600 亿", label: "Meta 五年芯片协议估值" },
    { value: "2026-03-18", label: "Micron 下一次财报" },
  ],
  movers: [
    { name: "AMD", note: "Meta 6GW GPU 大单落地，市场重新定价 AI 服务器需求。" },
    { name: "Nvidia", note: "财报超预期，但资金开始担心超大规模 AI 支出持续性。" },
    { name: "Tesla", note: "Waymo 融资扩大战略压力，Robotaxi 竞争叙事更紧张。" },
  ],
  risks: [
    { name: "Micron", note: "3 月 18 日财报前估值抬升较快，任何不及预期都可能触发回撤。" },
    { name: "Hims & Hers", note: "Q1 指引不及预期，监管和增长放缓叠加，情绪继续承压。" },
    { name: "PayPal", note: "传闻驱动反弹缺少基本面确认，走势存在回吐风险。" },
  ],
};

const state = {
  selectedIssueId: issues[0].id,
  activeTag: "全部",
  searchTerm: "",
};

const elements = {
  heroSummary: document.getElementById("hero-summary"),
  heroStats: document.getElementById("hero-stats"),
  heroFocusTitle: document.getElementById("hero-focus-title"),
  heroFocusText: document.getElementById("hero-focus-text"),
  heroSource: document.getElementById("hero-source"),
  issueFilters: document.getElementById("issue-filters"),
  tagFilters: document.getElementById("tag-filters"),
  spotlightTitle: document.getElementById("spotlight-title"),
  storyGrid: document.getElementById("story-grid"),
  marketSummary: document.getElementById("market-summary"),
  marketHighlights: document.getElementById("market-highlights"),
  marketMovers: document.getElementById("market-movers"),
  marketRisks: document.getElementById("market-risks"),
  marketSource: document.getElementById("market-source"),
  timelineList: document.getElementById("timeline-list"),
  sourceList: document.getElementById("source-list"),
  searchInput: document.getElementById("search-input"),
};

function getSelectedIssue() {
  return issues.find((issue) => issue.id === state.selectedIssueId) || issues[0];
}

function getAllTags() {
  const tags = new Set();
  issues.forEach((issue) => {
    issue.stories.forEach((story) => tags.add(story.tag));
  });
  return ["全部", ...tags];
}

function getVisibleStories() {
  const issue = getSelectedIssue();
  return issue.stories.filter((story) => {
    const matchesTag = state.activeTag === "全部" || story.tag === state.activeTag;
    const haystack = `${story.title} ${story.detail} ${story.tag} ${story.impact}`.toLowerCase();
    const matchesSearch =
      state.searchTerm.trim() === "" ||
      haystack.includes(state.searchTerm.trim().toLowerCase());
    return matchesTag && matchesSearch;
  });
}

function createPill(label, isActive, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `pill${isActive ? " is-active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function renderHero() {
  const issue = getSelectedIssue();
  const leadStory = issue.stories[0];

  elements.heroSummary.textContent = issue.summary;
  elements.heroStats.innerHTML = "";
  issue.keyMetrics.forEach((metric) => {
    const node = document.createElement("article");
    node.className = "stat-card";
    node.innerHTML = `
      <p class="stat-value">${metric.value}</p>
      <p class="stat-label">${metric.label}</p>
    `;
    elements.heroStats.appendChild(node);
  });

  elements.heroFocusTitle.textContent = leadStory.title;
  elements.heroFocusText.textContent = leadStory.detail;
  elements.heroSource.textContent = `来源文件：${issue.sourceFile}`;
}

function renderIssueFilters() {
  elements.issueFilters.innerHTML = "";
  issues.forEach((issue) => {
    elements.issueFilters.appendChild(
      createPill(issue.label, issue.id === state.selectedIssueId, () => {
        state.selectedIssueId = issue.id;
        render();
      }),
    );
  });
}

function renderTagFilters() {
  elements.tagFilters.innerHTML = "";
  getAllTags().forEach((tag) => {
    elements.tagFilters.appendChild(
      createPill(tag, tag === state.activeTag, () => {
        state.activeTag = tag;
        renderStories();
        renderTagFilters();
      }),
    );
  });
}

function renderStories() {
  const issue = getSelectedIssue();
  const visibleStories = getVisibleStories();
  elements.spotlightTitle.textContent = `${issue.label} / ${issue.title}`;
  elements.storyGrid.innerHTML = "";

  if (visibleStories.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "没有匹配到结果，试试更换主题筛选或搜索词。";
    elements.storyGrid.appendChild(empty);
    return;
  }

  visibleStories.forEach((story, index) => {
    const article = document.createElement("article");
    article.className = "story-card";
    article.style.setProperty("--bar-scale", `${0.34 + (index % 4) * 0.16}`);

    const links =
      story.links && story.links.length
        ? `<div class="story-links">${story.links
            .map(
              (link) =>
                `<a class="story-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`,
            )
            .join("")}</div>`
        : "";

    article.innerHTML = `
      <div class="story-meta">
        <span class="badge">${story.tag}</span>
        <span class="impact">${story.impact}</span>
        <span class="story-date">${issue.label}</span>
      </div>
      <h3>${story.title}</h3>
      <p>${story.detail}</p>
      ${links}
    `;
    elements.storyGrid.appendChild(article);
  });
}

function renderMarket() {
  elements.marketSummary.textContent = marketBrief.summary;
  elements.marketHighlights.innerHTML = "";
  elements.marketMovers.innerHTML = "";
  elements.marketRisks.innerHTML = "";
  elements.marketSource.textContent = marketBrief.sourceFile;

  marketBrief.highlights.forEach((metric) => {
    const item = document.createElement("div");
    item.className = "metric-line";
    item.innerHTML = `<strong>${metric.value}</strong><span>${metric.label}</span>`;
    elements.marketHighlights.appendChild(item);
  });

  marketBrief.movers.forEach((item) => {
    const row = document.createElement("div");
    row.className = "mini-row";
    row.innerHTML = `<strong>${item.name}</strong><span>${item.note}</span>`;
    elements.marketMovers.appendChild(row);
  });

  marketBrief.risks.forEach((item) => {
    const row = document.createElement("div");
    row.className = "mini-row";
    row.innerHTML = `<strong>${item.name}</strong><span>${item.note}</span>`;
    elements.marketRisks.appendChild(row);
  });
}

function renderTimeline() {
  elements.timelineList.innerHTML = "";
  issues.forEach((issue) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `timeline-item${issue.id === state.selectedIssueId ? " is-active" : ""}`;
    item.innerHTML = `
      <p class="date">${issue.date}</p>
      <h3>${issue.title}</h3>
      <p>${issue.summary}</p>
    `;
    item.addEventListener("click", () => {
      state.selectedIssueId = issue.id;
      render();
    });
    elements.timelineList.appendChild(item);
  });
}

function renderSources() {
  const sources = [
    ...issues.map((issue) => ({
      title: issue.label,
      path: issue.sourceFile,
      note: issue.summary,
    })),
    {
      title: "投资组合周报",
      path: marketBrief.sourceFile,
      note: "补充股票、芯片链和高风险事件，让新闻站具备一点投资视角。",
    },
  ];

  elements.sourceList.innerHTML = "";
  sources.forEach((source) => {
    const item = document.createElement("div");
    item.className = "source-item";
    item.innerHTML = `
      <strong>${source.title}</strong>
      <p>${source.note}</p>
      <p>${source.path}</p>
    `;
    elements.sourceList.appendChild(item);
  });
}

function render() {
  renderHero();
  renderIssueFilters();
  renderTagFilters();
  renderStories();
  renderMarket();
  renderTimeline();
  renderSources();
}

elements.searchInput.addEventListener("input", (event) => {
  state.searchTerm = event.target.value;
  renderStories();
});

render();

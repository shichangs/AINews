# AI 技术周报 · 2026 年第 33 周

**覆盖窗口**：2026-08-10 – 2026-08-17
**目标读者**：算法研究员
**论文时间约束**：仅收录 arXiv ID 前缀为 `2608` / `2607` 的预印本

---

## 【模块一】本周导读

**🔴 最重要的变化：后训练 Scaling 正式成为一条独立的代际升级路径。**
智谱 GLM-5.3 在**基座与 GLM-5.2 完全一致**的前提下，仅靠后训练把 Terminal-Bench 3.0 从 4.6 拉到 28.3、DeepSWE v1.1 从 46.2 拉到 66.9。这不是"又一个模型发布"，而是一个可复现的方法论声明：当预训练算力边际收益递减时，长程任务环境 + 超长后训练仍是被严重低估的富矿。同一周 Google 用 3 周迭代出 Gemini 3.7 Flash（FrontierCode 34.4→43.6），节奏上印证了同一判断——**竞争重心已从"谁的基座更大"转向"谁的后训练环境更多"**。

**🟡 值得关注但尚未明朗：Agent 安全的评测范式面临系统性失效。**
OpenART（2608.00677）给出了本周最锋利的框架性论断——agent 的风险通过一个被反复修改的 shared state 中介累积，**每一步单独看都合规，组合起来才越界**，而现有安全 benchmark 全部是短的、静态的，结构性测不到这类风险。其消融数据尤其值得警惕：环境演化攻击相对 instruction-only 攻击的优势，从简单环境的 ~2% 增长到最复杂环境的 >17%。更反直觉的结论是：**agent runtime 实现本身（context 组装、工具暴露、错误处理）能解释相当大一部分安全性差异，超出底层模型能力所能解释的范围**——换个"更安全"的模型不等于系统更安全。这个方向目前只有一篇论文，尚未形成共识。

**🟢 对开发者最有实际价值：本地 Agent 的硬件门槛这周被两侧同时压到了消费级。**
Meta Muse Glimmer 30B（Apache 2.0，4-bit 量化后语言模型 <20 GB，目标 24/32 GB 显存内跑完整 agent）与 Qwen3.8-27B（Apache 2.0，OSWorld-Verified 84.3 / AndroidWorld 81.9 同尺寸第一）在四天内先后落地，一张 RTX 4090/5090 或 M4 Max 就能常驻一个数据不出设备的多模态 agent。研究侧的 ABot-World-0（2607.19191）把交互式世界模型压进单张 RTX 5090（720P/16FPS/19 GiB），Stable FP4 Training（2607.24953）则给出了 FP4 端到端预训练稳定的充分条件——**这三件事共同指向同一个方向：算力门槛正在从"有没有集群"变成"有没有一张卡"**。

### 下周预告

1. **GLM-5.3 权重开源（约 8/28 前）** — 智谱承诺"发布后两周内"开源，但明确表示开源前需完成安全评估与加固，以限制其网络安全攻击能力、保留防御价值。**实际开源时点与是否做了能力阉割**是最值得盯的点。
2. **ICLR 2027 投稿截止** — 摘要 **2026/09/18 AOE**，全文 **2026/09/25 AOE**（已从 iclr.cc 官网确认）。今年新增两项硬约束：单作者最多 20 篇；每篇投稿至少需有一位作者注册评审 ≥3 篇，否则 desk reject。
3. **DeepSeek V4-Pro 重新发布** — 该模型 8/13 上线后不到 24 小时被官方悄然撤下横幅与公告，官方未作说明，仅表示"后续将继续调整"。重发时点、是否更名/改价，是下周最值得盯的国内事件。

---

## 【模块二】模型发布追踪

> 本周是罕见的密集发布周：Google、xAI、OpenAI、Meta、DeepSeek、智谱、阿里 7 家在 5 天内连续发版，国内三家（DeepSeek V4-Pro、GLM-5.3、Qwen3.8-27B）全部集中在 8/13–8/14 两天。

### ① 国际商业模型（闭源）

#### Gemini 3.7 Flash — Google（8 月 13 日）★ 本周官方披露最完整

**核心能力亮点**：定位「最智能的 workhorse 模型」，主攻 coding 与 agent。距离 Gemini 3.6 Flash 仅 **3 周**。

**与上一代对比**（全部取自 Google 官方博客）：

| Benchmark | 3.7 Flash | 3.6 Flash |
|---|---|---|
| FrontierCode 1.1 Main | **43.6%** | 34.4% |
| DeepSWE v1.1 | **65.3%** | 49.0% |
| WebDev Arena Elo | **1588** | 1538 |
| GDP.pdf（复杂文档理解） | **34.0%** | 22.0% |
| AutomationBench（真实业务流程） | **30.4%** | 17.0% |

AutomationBench 近乎翻倍（17.0 → 30.4）是最值得注意的一项——真实业务流程是 agent 落地的实际瓶颈，而非纯代码 benchmark。

**定价**：introductory **$0.75 / 1M 输入、$3.75 / 1M 输出**（3.6 Flash 的一半），有效期至 2026-12-31；**2027-01-01 起涨至 $1.50 / $7.50**。这是一个明确的短期获客窗口。

**访问方式**：Google Antigravity、AI Studio、Android Studio、Gemini Enterprise Agent Platform / app；个人用户经 Gemini app 的 Spark（需 AI Pro / Ultra 订阅，160+ 国家）。

**适合**：需要大规模跑生产级 agent 且对成本敏感的开发者与企业；金融/法律/生命科学的文档密集型工作。

> ⚠️ 多家媒体同时指出 **Gemini 3.5 Pro 仍在延期**，Google 未给出时间表（Bloomberg / Axios，二手）。

#### Grok 4.6 — xAI / SpaceXAI（8 月 12 日）

**核心能力亮点**：主攻 long-running agents 与交互式/视觉产出；官方称在多步任务中出现更多「自我测试与验证」行为。

**与上一代及竞品对比**（xAI 官方 evals 表，High 档）：

| Benchmark | Grok 4.6 | Grok 4.5 | GPT-5.6 Sol Max | Fable 5 Max |
|---|---|---|---|---|
| AA Intelligence Index | 61 | 56 | 61 | **62** |
| GDPval-AA v2 | **1753** | 1526 | — | 1741 |
| CursorBench v3.2 | 69.9% | 66.7% | — | — |
| DeepSWE v1.1 | 65.9% | 54% | **73%** | — |
| FrontierCode v1.1 | 61.3% | 56.6% | — | — |
| Terminal-Bench v3.0 | 26% | 15.7% | **34.6%** | 34.1% |

值得注意的是能力分布极不均衡：GDPval-AA v2 全表最高（知识工作类 agent 强），但 Terminal-Bench v3.0 明显落后前沿（26% vs 34.6%）。选型时应按任务类型而非综合指数判断。

**定价**：**$2 / 1M 输入、$6 / 1M 输出**；fast 变体 2 倍价。

**访问方式**：Cursor、Grok Build、xAI API，以及 OpenRouter / Vercel / Cloudflare；8 月 14 日追加进入 GitHub Copilot。首周在 Grok Build 与 Cursor 内 2x 额度。

**适合**：长程编码 agent、前端/交互原型快速成型；知识工作类 agent。

> ⚠️ 二手来源流传的「1.5T 参数 / 500K 上下文 / 知识截止 2026-02-01」**官方博客并未给出**，请勿引用。

#### GPT-5.6 Cyber — OpenAI（8 月 10 日）

**核心能力亮点**：网络安全专用模型，基于 GPT-5.6 Sol 训练，随 Daybreak 计划扩容发布。

**访问方式**：仅限 Daybreak **Red** 层级的「受信任客户伙伴」（需资格审批，非公开可用）；Blue 层提供事件响应、恶意软件分析、补丁验证等常规能力，官方称 Blue 是「多数防御方的推荐起点」。

**适合**：企业蓝队/红队、漏洞研究机构。

#### OpenAI Ultrafast 模式（8 月 13 日）— 非新模型，但属重大发布

GPT-5.6 Sol 的新 API service tier，速度最高 **14×**，输出 **最高 750 tokens/秒**，由 **Cerebras** 提供算力。限量 preview，需申请。

**适合**：实时语音客服、事故响应、金融实时研究、电商交互——即延迟本身构成产品体验的场景。

> 同周 OpenAI 其他动作：8/11 Daybreak 模型上架 AWS；8/11 ChatGPT 广告测试；GPT-5.6 Luna 本周生效为 Free/Go 层默认模型（无限文本对话 + Think 按钮）。

#### Anthropic — **本周无重大模型发布**

本周动作在产品/安全侧：8 月 11 日宣布对模型生成文本嵌入水印（详见模块五、六）；另有 Claude Fable 5 生物学安全护栏优化（减少约 85% 生物类误拒）。现役旗舰仍为 Claude Fable 5 / Mythos 5（2026-06-09）与 Claude Opus 5（2026-07-24）。

> ⚠️ 「Claude Fable 5.1」无任何官方公告、无 API model ID、无定价，仅为传闻。

#### Mistral — **本周无重大发布**

最近的实质发布为 OCR 4（2026-06-23）与 OCR 4.1（2026-07-16），均在窗口外。

---

### ② 国内大模型

#### GLM-5.3 — 智谱 AI（8 月 14 日）★ 本周国内最重要发布

**是否开源**：**将开源**——官方明确表示「发布两周后开放模型权重」，需先完成安全评估与加固（约 8 月 28 日）。

**核心能力亮点（本周最值得研究的一条）**：**基座与 GLM-5.2 完全一致，全部提升来自后训练 Scaling**——数十倍长程任务环境 + 超长后训练，基于 IndexShare / SAO / 新一代 Slime 框架。7430 亿参数。

**与前代及国际同类对比**（智谱官方数据）：

| Benchmark | GLM-5.3 | GLM-5.2 | 参照 |
|---|---|---|---|
| Terminal-Bench 3.0 | **28.3** | 4.6 | Grok 4.6 = 26 |
| DeepSWE v1.1 | **66.9** | 46.2 | Grok 4.6 = 65.9 |
| Agents' Last Exam | **28.5** | 23.8 | — |
| GDPval-AA v2 | **1,769** | — | Grok 4.6 = 1753、Fable 5 Max = 1741 |

若 GDPval-AA v2 的 1,769 成立，这是本周全表最高分。另一项官方数据更有工程价值：Z.ai Code Bench High 档 **31.4% vs Claude Opus 4.8 最高档 29.5%**，且**每任务平均输出约 5 万 tokens vs Opus 4.8 的约 12 万 tokens**——同等或更好的准确率下 token 消耗不到一半，这是真实的成本差异。

**涌现能力**：网络安全（白盒代码审查、漏洞发现）官方称持平 Mythos 5。联合清华、南开及多家安全团队红队测试，2 周内累计发现 **2,436 个漏洞**（1,097 个中高危），已报送 CNNVD/CNVD。

**获取方式**：ZCode、AutoClaw、GLM Coding Plan 全量用户；TraeWork/TraeCode、扣子、CodeBuddy、Qoder/QwenWork、JoyCode、OpenCode 等平台抢先体验；API「很快上线」。

> ⚠️ benchmark 数字为智谱自报，含自建 Z.ai Code Bench，非第三方评测。「754B（A40B）/ 1M 上下文 / 128K 最大输出」等规格来自二手汇总，官方公告未直接给出。

#### Qwen3.8-27B — 阿里通义千问（8 月 14 日）★ 本周唯一有完整官方 benchmark 表的开源模型

**是否开源**：**是，Apache 2.0**（含明确专利授权），可商用。

**规格**（HuggingFace 官方 model card）：27B dense 语言模型 + 视觉编码器（HF 显示 28B params），64 层，hidden 5120，词表 248,320；**混合注意力（Gated DeltaNet 线性注意力 + Gated Attention）**；原生 **262,144 上下文，YaRN 可扩至 1,000,000**；原生图像 + 视频输入；thinking 默认开启，支持 `reasoning_effort`（xhigh/medium/low）。

**与国际同类对比**（官方 card，对比 Muse Glimmer-30B / Opus4.6 Max）：

| Benchmark | Qwen3.8-27B | Opus4.6 Max |
|---|---|---|
| SWE-bench Pro | **61.7** | 53.4 |
| DeepSWE 1.1 | **42.2** | — |
| CoWorkBench | **70.7** | 68.2 |
| LiveCodeBench v6 | **90.3** | 88.8 |
| Terminal Bench 2.1 | 73.0 | **78.2** |
| GPQA Diamond | 89.2 | **91.3** |
| HLE | 30.8 | **40.0** |
| OSWorld-Verified | **84.3** | — |
| WebArena-Verified | **64.8** | — |
| AndroidWorld | **81.9** | — |

模式很清晰：**软件工程与 GUI/computer-use 类任务胜出，纯知识推理（GPQA/HLE）明显落后**。这是 27B dense 模型的合理能力画像。多模态四项（OSWorld / WebArena / AndroidWorld / SWE-MM 38.6）均为全表第一。

**获取方式**：`Qwen/Qwen3.8-27B`、`Qwen/Qwen3.8-27B-FP8`；vLLM / SGLang / Transformers / Docker Model Runner；已有 **406 个量化版本**（llama.cpp、Ollama、LM Studio、Jan）、75 个 finetune、14 个 adapter。HF 上月下载 267,725，likes 9.97k。

**相关**：Qwen3.8-Max（2.4T MoE / 95B 激活 / 1M 上下文 / 多模态，8 月 3 日发布，API $2/$6）的**开源权重于 8 月 12 日上线 HuggingFace**——但**开源版为纯文本、无 1M 上下文、thinking 强制开启、自定义 Qwen3.8-Max License（非 Apache 2.0）**，与 API 版有实质差异，这是本周最容易被误读的一点。（二手）

#### DeepSeek-V4-Pro-0813 — 深度求索（8 月 13 日）★ 发布即撤回

**是否开源**：否（API/App/Web）。同日 DeepSeek 以 **MIT 协议开源了 Agent 执行框架 DeepSeek Harness**（见模块四）。

**事件经过**：8/13 正式版上线，**不到 24 小时被官方悄然撤下横幅与公告**，官方未作任何说明。第三方评测（Artificial Analysis）显示其 AA Intelligence Index 为 **53**，而 V4-Flash 为 40；但定价是 Flash 的 **9 倍输入价、14 倍输出价**（$1.32 / $3.96 vs $0.14 / $0.28）。作为参照，Grok 4.6 = 61、GPT-5.6 Sol Max = 61、Fable 5 Max = 62——**V4-Pro 仍落后国际第一梯队约 8–9 分**。

**同步变化**：引入**峰谷定价**，自 8 月 16–17 日生效，谷价为峰价一半。

**社区解读分歧**：一方认为是部署环节出错（"现在跑的实际还是 Flash 模型"）；另一方认为性能确实未达预期。截至发稿官方未解释。

> ⚠️ 中文媒体流传的「1.6T 总参数 / 49B 激活 / 1M 上下文 / DeepSWE 12.8→62.7」**未在 Reuters 通稿或官方页核实到**，属二手。

#### 其余国内厂商 — **本周无重大发布**

| 厂商 | 状态 | 最近发布（窗口外） |
|---|---|---|
| 月之暗面 Kimi | 无 | Kimi K3（2.8T MoE，7/16 上线，7/27 开放全量权重）。Frontend Code Arena 1,679 Elo 第一，AA Index 57 |
| MiniMax | 无 | M3（196B/11B 激活/1M 上下文，MSA 稀疏注意力，6/01 发布 6/12 开源）；H3 全模态（7/31） |
| 百度文心 | 无 | 文心 5.0 正式版（2026-01，2.4 万亿全模态）、5.1（2026-05） |
| 字节豆包 | 无 | Doubao-Seed-2.1 Pro（6/23）、Seedream 5.0 Pro（**7/8，非 8 月**） |
| 腾讯混元 | 无 | 混元 3.0 计划 2026 年 4 月；6/26 起停用 9 个旧模型；7/23 语言与多模态部门合并为「基础模型部」 |
| 零一万物 | 无新模型 | ⚠️ 二手消息称 8/10 公告开放平台将逐步停止在线体验、API 与充值服务，**未从官网核实，待证** |

> ⚠️ **易错陷阱**：搜索中大量出现的「腾讯混元开源 0.5B/1.8B/4B/7B 四款小模型」实为 **2025 年 8 月**的新闻，多个中文聚合源误标为 2026 年，已排除。

---

### ③ 其他重要开源模型

#### Muse Glimmer 30B — Meta Superintelligence Labs（8 月 10 日）★ Meta 重返开源

**参数规模**：30B，从闭源大模型 Muse Spark **蒸馏**而来（logit distillation 预训练 + agent 密集中训练 + SFT / on-policy 蒸馏 / RL 后训练）。**许可：Apache 2.0**。

**运行硬件需求**（官方明确）：

- 全精度需 **>55 GB** 显存，不可行
- 官方提供 ~**4-bit 量化**，语言模型压至 **<20 GB**
- 连同 KV cache、视觉感知编码器、投机解码 drafter，**目标为 24 GB 或 32 GB 显存内跑完**（RTX 4090/5090、M4 Max/M5 Max 级别）
- 配套 **DFlash** 投机解码 drafter，实测提速 **RTX 5090 ×3.1、M5 Max ×1.8、M4 Max ×1.5**

**能力**：端到端 agent 任务（DeepSearch QA、MCP-Atlas、τ-Bench、SWE-Bench）、可靠 tool calling、失败恢复、图文交错多模态输入、兼容 OpenClaw 等 agent 编排、可调 reasoning effort、100+ 语言。官方对比对象为 Gemma4-31B 与 Qwen3.6-27B。

**获取方式**：HF `meta-models/Muse-Glimmer-30B`（另有 GGUF）；Ollama、LM Studio、Unsloth；llama.cpp / ExecuTorch / MLX；vLLM / SGLang；Together AI、Fireworks AI、OpenRouter。

**适合场景**：本地常驻个人 agent（日程、邮件、文件整理，数据不出设备）、本地 coding agent、LLM-as-a-judge 评测。

**战略含义**：Meta 明确划线——更强的 Muse Spark 保持闭源，**只有小模型开源**。开源接力棒已从 Llama 转到 Muse Glimmer（Llama 4 Maverick 之后无新版）。

#### Qwen3.8-27B — 见 ② 第 2 条

**显存需求（第三方估算，官方 card 未给）**：BF16 约 **56 GB**（80GB 卡）；FP8 约 **28 GB**（48GB 卡）；4-bit 约 **14–17 GB**（24GB 卡），另需 KV cache 余量。

**适合场景**：单卡本地/私有部署的多模态 agent、computer use / browser use / 移动端 GUI 自动化。

#### Llama / Gemma / Phi 系列 — **本周无重大发布**

Gemma 4（E2B / E4B / 26B-A4B / dense 31B，Apache 2.0，256K 上下文）为 2026-04-02 发布；Phi-4-reasoning-vision-15B（MIT）为 2026-03 发布。

> **本周 HuggingFace 实际热点即上述两款：Muse Glimmer 30B（8/10）与 Qwen3.8-27B（8/14）**，二者被广泛正面对比，构成本周的"本地 agent 之争"。

---

## 【模块三】热门论文精选

> 全部论文 arXiv ID 已逐字核对，仅收录 `2608` / `2607` 前缀。热度数据来自 2026-08-16 抓取的 HF Trending Papers 页面。**每篇末尾标注核实等级**（A = 已打开 arXiv abs 页逐字确认；B = abs URL 与标题多方一致但摘要内容来自搜索抽取；C = 未见 abs 页，来自第三方，谨慎引用）。

---

### 🧠 大语言模型 / 推理

#### Kimi K3: Open Frontier Intelligence

📄 https://arxiv.org/abs/2607.24653 | 💻 https://github.com/MoonshotAI/Kimi-K3 | 🤗 HF ⭐ 491 | 机构：Kimi Team（Moonshot AI），作者约 400 人

**问题**

- MoE 规模继续放大时，两个方向的信息流同时卡住：**序列长度方向**——标准注意力在百万 token 级别上 KV 读写与有效信息传递效率急剧劣化；**模型深度方向**——残差路径在极深堆叠下梯度/信息衰减。
- 路由 MoE 在专家数极多（近千）时训练不稳定，专家负载不均导致 expert-parallel 的实际 MFU 远低于理论值。
- 长程 agentic RL 的瓶颈不在算法而在基础设施：rollout 与沙箱状态无法跨百万 token 持久化，长程任务的 RL 样本因此无法有效采集。

**方法**

- **Kimi Delta Attention (KDA) + Attention Residuals**：前者针对序列长度方向的信息流，后者针对深度方向。论文强调 KDA 是 **algorithm-system co-design**——注意力变体与 kernel/调度一起设计，而非先定算法再做工程适配。
- **Stable LatentMoE**：总计 **896 个 routed experts**，每 token 有效激活 **16 个**。总参 **2.8T / 激活 104B**（激活率约 3.7%），稀疏度比典型 MoE 更极端。核心在"Stable"——在近千专家规模下保持路由稳定，配合完美均衡的 expert-parallel 训练与显存管理。
- **与常规 MoE 的本质区别**：不是简单加专家数，而是 latent 路由 + 稳定化。
- **后训练**：在 general / agentic / coding 三域做 RL，并训练**多档 reasoning-effort level**，使模型可按需分配思考预算；论文称由此获得 compositional generalization 与长程执行鲁棒性。
- **百万 token agentic RL**：带 persistent rollout 与 sandbox state——这是使长程 RL 在工程上可行的前提。
- 原生视觉能力 + 1M token 上下文，权重全量开源。

**效果**

- **相对 K2 的 scaling efficiency 提升约 2.5×**（同等算力下的综合能力增益）——这是本文最硬的量化结论。
- 在 long-horizon coding / agentic / knowledge / reasoning / vision 上达到 frontier 水平；论文**明确表述总体仍落后于 Claude Fable 5 与 GPT-5.6 Sol**，但稳定优于评测套件中其他开源及闭源模型。
- abstract 层面未给出逐 benchmark 数字，需查正文。

*核实等级：**A**（标题、作者、v1 07-27 / v2 08-07、全部架构数字、与 Fable 5 / Sol 的对比表述均已逐字确认）*

---

#### BDH-CQ: In-Context Learning with Recurrent Latent Reasoning

📄 https://arxiv.org/abs/2608.09888 | 💻 https://github.com/pathwaycom/arc-task-gen（论文 Comments 字段给出，为 ARC 任务生成器）| 🤗 HF ⭐ 618（**本周最高**）| 机构：Pathway

**问题**

- 主流 test-time reasoning 依赖**把中间步骤显式 verbalize 成 CoT token**，代价有三：(a) 推理算力与输出 token 数线性绑定，成本爆炸；(b) 推理必须被压缩进离散词表这一低带宽通道；(c) ARC-AGI 这类任务的核心是从少量 demonstration 归纳变换规则，而 CoT 采样/投票本质是"多次重猜"而非"更深地想"。
- 结果是 ARC-AGI-1 上的 cost-accuracy Pareto 前沿被推理 token 数锁死。

**方法**

- **In-context learning 改为记忆写入**：推理时给出的 demonstration 不作为 prompt 前缀参与注意力，而是**持续更新模型的 recurrent memory**。这把"看示例"从 O(n²) 注意力问题变成 O(n) 状态更新问题。
- **Recurrent latent reasoning**：query 的求解通过在**高维 latent space 中迭代计算**完成，全程不产出任何自然语言中间步骤。**深度 = 迭代次数，与输出长度解耦**。
- **与 CoT / self-consistency 的本质区别**：CoT 把计算量花在 decode 更多 token；BDH-CQ 把计算量花在同一状态上多轮 latent 迭代。与 RAG 也无关——没有外部检索，示例信息全部内化进 recurrent state。
- 论文分类在 **cs.NE** 而非 cs.CL，说明这是一条偏离 Transformer 主线的架构路径。
- 额外做了受控 ARC-like 干预实验，用于分离三件事：模型从 demonstration 学到了什么、推断出的变换应用得是否一致、哪些概念仍然难。

**效果**

- **ARC-AGI-1 public eval：29.5% pass@2**，模型仅 **150M 参数**。
- 推理成本 **$0.0007 / task**。
- 明确声明**突破此前报告的 ARC-AGI-1 cost-accuracy Pareto 前沿**。
- ⚠️ **口径提醒**：这是**成本效率的 SOTA，不是绝对准确率的 SOTA**。29.5% 远低于前沿大模型，卖点是 150M 参数 + 万分之七美元。

*核实等级：**A**（标题、9 位作者、2026-08-10、cs.NE、29.5% pass@2 / $0.0007、GitHub 链接位置均已确认）*

---

#### On-Policy Self-Distillation without Any Supervision

📄 https://arxiv.org/abs/2608.06296 | 💻 暂未确认 | 🤗 未确认 | 机构：UC San Diego / Georgia Tech / UMD / ByteDance（未逐一核实）

**问题**

- On-policy distillation 需要更强的 teacher，或至少需要标注答案作为 reward 信号。GRPO/RLVR 一类方法依赖 verifiable reward，在无标注域直接失效。
- 单纯的 self-consistency / majority vote 只能在**推理时**用来选答案，无法把这份"共识"回灌进参数。

**方法**

- **U-OPSD（unsupervised on-policy self-distillation）**：对每个 prompt 采样多条 rollout，用 majority vote 在一个 self-consistency 阈值下构造**伪解（pseudo solution）**。
- 关键设计：把模型分布**条件在这个伪解上**，再对**那些与伪解不一致的 completion** 做自蒸馏。这一步是与普通 self-training 的分界——不是拿伪标签做 SFT，而是用"条件于伪解的自身分布"作为 teacher 分布，只在分歧处施加 KL 压力。
- **与 GRPO 的区别**：GRPO 需要 group 内标量 reward 做 advantage；U-OPSD 完全不需要 reward，teacher 信号是模型自己在给定伪解条件下的分布，属 **distribution-level 而非 scalar-level 监督**。
- 阈值机制起自动弃权作用：共识不足的样本不产生训练信号，避免把错误共识固化。

**效果**

- ⚠️ **未能核实到任何具体 benchmark 数字**。仅确认论文存在、ID 为 2608.06296、方法描述如上。**引用前请自行查阅正文**。

*核实等级：**B**（abs URL 与标题一致；无量化结果，本模块置信度最低的一篇）*

---

### 👁️ 多模态

#### JoyAI-Video-Edit: Real-Time Open-Ended Video Editing with Autoregressive Diffusion

📄 https://arxiv.org/abs/2608.03974 | 💻 https://github.com/jd-opensource/JoyAI-Video-Edit（Apache 2.0）| 🤗 HF ⭐ 93（模型：jdopensource/JoyAI-Video-Edit）| 机构：京东

**问题**

- 现有视频编辑模型是**离线双向**的：必须拿到完整视频才能推理，因为 DiT 的 full attention 依赖未来帧。这直接排除了直播流、摄像头实时编辑、不定长视频。
- 强行改成因果自回归会引入三个具体故障：(a) **train-inference mismatch**——训练看双向上下文、推理只有历史；(b) 少步蒸馏（2-step）时 **source fidelity 崩塌**，编辑结果偏离原视频；(c) 长时自回归的**累积时序漂移**。

**方法**

- **Chunk-wise autoregressive adaptation**：把双向 DiT 改造为分块因果生成，**块内双向、块间因果**——这是延迟与质量之间的关键取舍点。
- **Source-Anchored Distribution Matching Distillation (SA-DMD)**：标准 DMD 蒸馏到 2 步会丢失对源视频的锚定；SA-DMD 在分布匹配目标中**显式锚定 source**，专门解决"两步生成时 source fidelity 保不住"。
- **Long-Horizon Autoregressive Distillation**：针对累积漂移，让学生在**长自回归 rollout 上对齐**，而非只在短片段上蒸馏。
- 架构三件套：**MLLM-based condition encoder**（理解自然语言编辑指令）+ **causal video VAE**（因果时序压缩，避免解码时回看未来）+ **multimodal diffusion transformer**（16B）。
- 同时支持 instruction-guided V2V 与 reference-conditioned (image+video)-to-video 两种编辑范式。

**效果**

- **端到端 720p @ ~30 FPS，单张 NVIDIA B200**。
- 自动指标 + 人工评测：大幅超越现有 streaming editor；在短视频与长视频上**与强离线系统持平**——**实时化没有付出通常的质量代价**，这是本文最关键的结论。
- 可对直播摄像头流做连续编辑，无需预先指定视频长度。

*核实等级：**B**（abs URL + 标题 + GitHub + HF 模型页三方一致；16B / 30FPS / B200 来自摘要抽取）*

---

#### MonkeyOCRv2: A Visual-Text Foundation Model for Document AI

📄 https://arxiv.org/abs/2607.11562 | 💻 https://github.com/Yuliang-Liu/MonkeyOCRv2（Apache 2.0）| 🤗 HF ⭐ 78（模型：zenosai/MonkeyOCRv2-B-Parsing）| 机构：华中科技大学（Yuliang Liu 团队，推断）

**问题**

- 通用 VLM 的视觉编码器（CLIP/SigLIP 系）在自然图像上预训练，**对文档的字符笔画级细节与版面几何是有损的**——patch 化 + 语义对比目标天然丢弃高频笔画信息。
- 结果是文档解析被迫靠堆大模型来补偿视觉编码器的信息损失，参数效率极差。
- 跨任务（识别/检测/公式/篡改检测）与跨语言各自训练专用模型，表示无法共享。

**方法**

- **text-centric 视觉基础模型**：在单一 encoder 中统一 fine-grained text modeling、cross-task representation learning、cross-lingual generalization。
- **双目标联合预训练（核心设计决策）**：
  - *image-to-text generation*：把视觉表示与文本内容对齐（语义侧）
  - *pixel-level document reconstruction*：强制保留**字符笔画与版面细节**（信号侧）

  单靠前者会丢笔画，单靠后者学不到语义，二者必须并行——这是全文的技术支点。
- **MonkeyDoc v2**：**1.13 亿张**文档图像、**17 种语言**，论文称为目前最大的文档图像预训练语料。
- 在五类任务上验证：文本识别、公式识别、文本检测、**文档篡改检测**、**重叠文本分割**——后两项直接考验像素级重建目标是否真的保住了细节。

**效果**

作为 MLLM 的 vision encoder，得到 **0.7B 文档解析模型**：

- **MDPBench 开源 SOTA**，比此前最好的 **3B dots.ocr 高 2.8 个绝对百分点**，而 vision encoder **小约 11×**。
- **OmniDocBench 上超过体量大数倍的通用 VLM，包括 Qwen3-VL-235B 与 GPT-5.2**。

这组数字最有说服力之处在于：**参数效率提升来自表示质量而非规模**。

*核实等级：**B**（abs URL + 标题 + GitHub 一致；1.13 亿图 / 17 语言 / +2.8% / 11× 来自摘要抽取）*

---

### 🤖 AI Agent / 工具使用

#### LongHorizon-Harness: Advancing Long-Horizon Agents for Real-World Tasks

📄 https://arxiv.org/abs/2608.01964 | 💻 https://github.com/AMAP-ML/LongHorizon-Harness | 🤗 HF ⭐ 172（项目页 https://lh-harness.pages.dev/）| 机构：阿里巴巴高德 AMAP-ML

**问题（本周 agent 方向最清晰的机制级诊断）**

- 现有 harness 把**任务执行、任务状态、完成度判定三者全部塞进同一个不断增长的 context**。由此产生两个具体故障：
  1. **状态不可追踪**：真实状态散落在几十轮对话里，模型必须每次从长 context 重新"读出"当前进度，而这份读出本身会出错。
  2. **错误自评的传播**：agent 自己声明"我完成了 X"，这条声明进入 context 后被后续步骤当作事实使用，错误不可逆地向下游扩散。
- 这不是"效果差"，而是**把 unverified 的自我断言与 verified 的环境事实混在同一存储介质里**造成的架构缺陷。

**方法**

- **状态外置**：把 task state 作为**执行之外的显式记录**维护，而不是留在 context 中。
- **只接纳独立验证的事实**：state 仅由**从环境独立验证过的 fact** 更新。**agent 的自我声明不能直接写入 state**——这是与 ReAct / 普通 scratchpad memory 的根本分野。
- **Manage–Execute–Audit (MEA) 循环**：
  - *Manage*：从外置 state 推导下一个 subtask
  - *Execute*：在 **fresh context** 中执行（每个 subtask 拿到干净上下文，切断污染路径）
  - *Audit*：由独立审计环节从环境侧核验结果，通过才允许写回 state
- 由此获得 **recoverable progress**：state 外置且已验证，崩溃/超时后可恢复，长程任务不必从头重来。
- 原生集成 Claude Code / Codex / OpenClaw，可跨桌面应用与 CLI 长时间运行。

**效果**

- **WeaveBench：80.7% PassRate**
- **OSWorld 2.0：35.2% partial score**
- **Terminal-Bench 2.1：77.2% success**

*核实等级：**B**（abs URL + 标题 + GitHub + 项目页三方一致；benchmark 数字来自摘要抽取）*

---

#### Ouroboros: A Self-Developing Frontier Coding Agent with Reviewed Core Evolution

📄 https://arxiv.org/abs/2608.08311 | 💻 https://github.com/razzant/ouroboros | 🤗 HF ⭐ 85 | 机构：Lomonosov Moscow State University / Skoltech / AIRI (FusionBrain Lab) / Joi Lab

**问题**

- 自改进 agent 的常见做法只改 prompt 或工具描述，**agent 的 core implementation（context 组装逻辑、harness 本身）是冻结的**。而实际瓶颈往往正在 core：context 怎么装配、工具怎么暴露。
- 无约束自改进又会导致不可控漂移与不可复现。

**方法**

- **self-developing harness**：不只是 prompt 自优化——**tools、prompts、context assembly、core implementation 四层全部可演化**。
- **Reviewed commits 作为演化的唯一通路**：每次改进以 reviewed commit 形式落地，**该 commit 成为后续工作的 runtime**。这既提供 review 闸门，又保证演化有版本化的可回溯记录——**与"在线权重自更新"路线本质不同：这里演化的是软件，不是参数**。
- **两种演化模式**：
  - *recursive free evolution*：改进本身是一个任务，完成一轮可调度下一轮（显式递归）
  - *experience-driven core evolution*：日常工作中暴露的 bug、粗糙点、低效 context 构造驱动结构性修改

  两者互补——前者主动探索，后者被动响应真实失败。

**效果**

- **Terminal-Bench 2.1：86.74%**（Opus 5 run），论文称为该 benchmark 已报告最佳。
- **OSWorld-Verified：90.69%**（Opus 5 run），超过此前最佳。
- **CL-Bench：五轮 rollout campaign 取得 normalized reward 0.23**，论文称为新 SOTA。
- ⚠️ 对照 LongHorizon-Harness 的 Terminal-Bench 2.1 = 77.2%，Ouroboros 的 86.74% 高出约 9.5 个点，但**两者底座模型不同，不构成严格可比**。

*核实等级：**B**（abs URL + 标题 + GitHub 一致；benchmark 与机构来自摘要抽取）*

---

#### Spark-to-Paper: End-to-End Research Paper Generation as a Composable Skill

📄 https://arxiv.org/abs/2608.11924 | 💻 https://github.com/Spark-To-Paper-Skills/spark-to-paper-skills | 🤗 HF ⭐ 277 | 机构：暂未确认

**问题**

- 从 idea 到论文不是文本生成问题：需要检索文献、设计并执行实验、依据证据修正论断、产出可编辑的发表级图表、并在超长生成过程中维持一致性。
- 现有 auto-research 系统的两个具体缺陷：(a) 把**需要模型判断的事**和**可以确定性执行并校验的事**混在一起，导致引用编造、图表不可编辑；(b) **先看到结果再决定要报告什么**——这在方法论上等价于 p-hacking，且让 claim 与 evidence 脱钩。

**方法**

- **十三个可组合 skill**，直接嵌入已有 coding assistant，**不需要独立 agent 平台或编排服务**。这是一个明确的工程立场：把 agent 能力表达为 skill 而非新建 orchestration 层。
- **判断与确定性操作分离**：凡是能被确定性执行并检查的（引用解析、图表生成、编译）交给可校验流程，模型只负责判断。这直接对应下面两个指标。
- **实验规划与结果报告分离**：**先声明所需证据，再观察结果**，随后按实测结果修正 manuscript claim。这是防 cherry-picking 的**机制性设计**，而非靠 prompt 约束。

**效果**

- 8 个受控研究主题上：**citation validity 99.5%**、**figure editability 96.4%**。
- ⚠️ abstract 未给出论文质量的人类评审分数。指标偏"流程可靠性"而非"科研价值"，解读时需注意这个口径差异。

*核实等级：**B**（abs URL + 标题一致；13 skills / 99.5% / 96.4% 来自摘要抽取）*

---

### 🦾 具身智能 / 机器人

#### G0.5: One Autoregressive Stream for Robot Reasoning and Action

📄 https://arxiv.org/abs/2608.11739 | 💻 https://github.com/OpenGalaxea/GalaxeaVLA（项目页 https://opengalaxea.github.io/G05/）| 🤗 未确认 | 机构：Galaxea 星海图

**问题**

当前 VLA 主流配方是 **pretrained VLM + 独立训练的 flow-matching action expert**（π0 系）。这个双系统结构有三个机制性代价：

1. VLM 退化为**纯视觉语言 encoder**，其预训练获得的推理能力无法直接作用于动作；
2. 两个模块**目标函数不同**（VLM 是 next-token，action expert 是 flow matching），梯度不共享，语义与动作之间只能通过一层 latent 接口传递；
3. reasoning 与 action 无法在同一序列里交错——模型不能"先想再做、边做边想"。

**方法**

- **单一 transformer decoder，一条自回归流**：reasoning token 与 action token 在**同一个 next-token prediction 目标**下发出。VLM 不再只是 encoder，而是同时充当 robot 的"大脑"与"运动皮层"。
- **统一 cross-entropy 目标**：robot action 样本与 VQA 样本用**完全相同的 cross-entropy** 优化，按 **VQA : action = 1 : 4** 混合。这个比例是关键取舍——足够的 VQA 比例用于保住 VLM 的语义/推理能力不被动作数据冲掉。
- **初始化自 Qwen3.5 2B VLM**，在 **14 种 embodiment** 的机器人演示 + 大规模 web 与 embodied VQA 数据上预训练。
- 条件输入：多视角 RGB + **embodiment identifier** + 自然语言指令 + 本体感受状态（proprioception）。embodiment identifier 是跨本体泛化的显式开关。
- **与 flow-matching action expert 的本质区别**：动作被离散化为 structured action token 纳入词表，因此 **reasoning 可以在动作生成中途插入**，形成真正的 interleaved 推理-执行，而非"想完一次性输出一段轨迹"。

**效果**

| Benchmark | 成绩 |
|---|---|
| DROID（zero-shot） | 82.5% |
| Bridge-SimplerEnv | 87.3% |
| RoboTwin 2.0 | 93.3% |
| LIBERO | 98.9% |
| **BEHAVIOR-1K**（长程移动操作，1000 项日常活动） | **0.3136** |
| 真机微调后（R1-Lite / R1-Pro） | 平均 76.7% |

⚠️ **BEHAVIOR-1K 的 0.3136 与其他 benchmark 的 80–99% 形成强烈反差——这可能是本文最有信息量的部分：长程移动操作仍是未解问题，短程操作 benchmark 已接近饱和且区分度不足。**

*核实等级：**C**（⚠️ arXiv abs URL 未在任何搜索结果中出现。ID 与标题来自 alphaXiv 与官方项目页，两方一致，但 **arXiv 上确切标题可能不同**（如带 "Galaxea" 前缀）。所有 benchmark 数字来自搜索抽取，**引用前务必自行打开 arXiv 页核对**）*

---

#### ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU

📄 https://arxiv.org/abs/2607.19191 | 💻 https://github.com/amap-cvlab/ABot-World（HF: acvlab/ABot-World-0-5B-LF）| 🤗 HF ⭐ 311 | 机构：阿里巴巴高德 AMAP CV Lab

**问题**

- 交互式世界模型有两条互相冲突的需求：**双向 DiT 质量高但不能实时因果生成**；**因果学生模型可实时但会 autoregressive drift**——长 rollout 上误差累积、画面逐渐崩坏，本质是训练分布与自 rollout 分布之间的 distribution shift。
- 第二个瓶颈是部署：DiT + VAE 的显存与延迟使其只能跑在数据中心 GPU 上。
- 第三是数据：动作条件世界模型需要**动作与视频严格同步标注**的大规模数据，这类数据几乎不存在。

**方法**

- **渐进式教师-学生蒸馏**：把 bidirectional action-conditioned teacher 通过 **teacher forcing + ODE distillation** 逐步蒸馏为 causal student。
- **LongForcing（核心贡献）**：让**学生的长自 rollout** 去对齐一个 **extended-horizon teacher**。这是直接针对 drift 的设计——不是在短片段上对齐，而是**在学生真实会遇到的长 rollout 分布上对齐**，从机制上缓解 exposure bias / 累积 distribution shift。
- **WorldExplorer 数据引擎**：agent 驱动采集，**由训练反馈引导**（哪里模型不好就去哪里采数据），闭环而非一次性建库。数据源覆盖 AAA 游戏、仿真引擎、互联网视频。
- **统一质检流水线**：14 项确定性质量检查 + VLM 评估 + 动作与文本同步标注。
- **原始键盘动作作为统一控制接口**——同时覆盖场景漫游与第三人称角色交互，避免为不同交互模式设计不同 action space。
- **reference-character memory**：为第三人称 rollout 提供持久外观线索，解决长 rollout 中角色"变脸"的身份一致性问题。
- **部署侧协同设计**：轻量 VAE decoder + 高效 attention + memory-aware scheduling + **low-bit DiT inference**。

**效果**

- **单张 NVIDIA RTX 5090 桌面 GPU**：**720P、最高 16 FPS**、**action-to-first-frame 延迟 1.2 s**、**峰值显存约 19 GiB**。
- **WorldRoamBench** 上具备有竞争力的可控性；加长交互 rollout 上表现出连贯的长程世界演化。
- ⚠️ abstract 用词是 "competitive controllability" 而非 SOTA——**质量上并未超越离线大模型，卖点是把交互式世界模型压进消费级显卡**。

*核实等级：**A**（标题、41 位作者、2026-07-21、720P/16FPS/1.2s/19GiB/RTX 5090、LongForcing、WorldRoamBench 均已逐字确认）*

---

### 🛡️ AI 安全 / 对齐 / 可解释性

#### OpenART: Scaling Agent Red Teaming via Open-Ended Environment Evolution

📄 https://arxiv.org/abs/2608.00677 | 💻 暂未确认 | 🤗 未确认 | 机构：复旦大学 / 上海人工智能实验室（据作者常属机构推断，**arXiv abs 页未标注 affiliation**）

**问题（本周安全方向最重要的框架性洞察）**

- Agent 与 LLM 的安全性质**不同类**：agent 行为通过一个**被反复修改与复用的 shared state** 中介，早期的状态改动会影响很久之后的决策。
- 现有安全 benchmark 全部聚焦**短的、静态的任务**，因此**结构性地无法捕捉这类累积风险**——每一步单独看都合规，组合起来才越界。
- 第二个盲点：几乎所有评测把安全性归因于底层模型，忽略了 **agent runtime 实现本身**（context 组装、工具暴露、错误处理）的贡献。

**方法**

- **OpenART Arena**：**10,000+ 已验证的 stateful 场景**，覆盖 **50 个 domain**，工具与技能池 **500,000+**。**任务中位数需 97 次 tool call**——这个数字本身就说明它测的是长程累积风险而非单轮越狱。
- 支持 **75 种 agent-model 配置**的统一评测——**把"模型"与"runtime"解耦为两个可独立变化的轴**，这是本文的评测设计关键。
- **Evolutionary Markov Hypergraph Attack (EMHA)**：
  - **黑盒策略，不需要任何参数更新**
  - 通过**协调授权范围内的 state transition** 实现 feedback-driven 的环境演化
  - **任务目标全程固定，只有环境状态变化**——这是与 prompt injection / jailbreak 的本质区别：**攻击面不是指令，而是环境状态空间**。用 hypergraph 建模状态转移之间的多元依赖，用进化搜索在其上寻找危险路径。
- **与 instruction-only evolution 的对照**是全文最关键的消融设置。

**效果**

- 全配置 **pooled Attack Success Rate = 85.0%**。
- **核心消融**：EMHA 相对 instruction-only evolution 的优势，从简单环境的 **~2%** 增长到最复杂环境的 **>17%**。这条曲线直接证明：**任务复杂度越高，环境演化暴露的安全失效越多**，而这部分风险是现有静态 benchmark 完全测不到的。
- **另一关键发现**：**agent 的具体 runtime 实现能解释相当大一部分安全性差异，超出底层模型能力所能解释的范围**。对工程实践的含义是——**换个更"安全"的模型不等于系统更安全**。

*核实等级：**A**（标题、9 位作者、2026-08-01、10k 场景 / 50 域 / 500k 工具 / 中位 97 tool call / 75 配置、ASR 85.0%、2%→17% 均已逐字确认。仅机构为推断）*

---

### ⚡ 高效推理 / 量化 / 压缩

#### Stable FP4 Training via Transposition-Invariant Block Quantization

📄 https://arxiv.org/abs/2607.24953 | 💻 暂未确认 | 🤗 未确认（不在 HF trending 榜）| 机构：arXiv abs 页未标注

**问题（本周诊断最精确的一篇）**

- FP8 训练已成熟，但推进到 FP4 一直不稳定。本文定位到一个**具体且此前未被明确指出的根因：tensor transposition 引起的 scale inconsistency**。
- 机制展开：常规 **1D block quantization** 沿一个维度分块并为每块计算 scale。前向用 W，反向用 Wᵀ。**转置后分块方向改变，同一批数值被分到不同的 block，因而拿到不同的 scaling factor**。结果是前向与反向对同一权重使用了不一致的量化表示 → **梯度有偏且不稳定**。
- 这解释了为什么此前的 microscaling（MX）方案在 FP4 下会发散——**不是 4 bit 精度不够，而是前后向不自洽**。

**方法**

- **2D block FP4 quantization（核心）**：沿两个维度同时分块，使 block 划分**在转置下不变（transposition-invariant）**。同一数值在前向与反向拿到**同一个 scale**，前后向计算一致性得以保持。其余为配套设计。
- **Truncation-free scaling**：不做截断，控制量化误差上界——截断会引入系统性偏差，与"无偏梯度"目标冲突。
- **Stochastic rounding**：保证量化后梯度**无偏**。与上一条配合——一个管方差/误差幅度，一个管偏差。
- **混合精度设计**：注意力的 **query 与 key projection 用 MXFP8** 而非 FP4。原因是 attention 对量化误差高度敏感（softmax 的指数放大效应）——这是务实的工程取舍而非理论妥协。
- **与 QAT / PTQ 的区别**：这是**端到端 FP4 预训练**，不是训练后量化，也不是伪量化训练。

**效果**

- 评测覆盖 **dense LLM 至 7B** 与 **30B MoE**，训练至 **100B tokens**。
- 全部设置下实现**稳定的端到端 FP4 训练**。
- 相对 **BF16**：**perplexity 与下游准确率退化 < 1.3%**。
- 结论具有很强的可操作性：**仅仅强制前后向 scaling 一致，就足以让 FP4 训练在规模上可用**。

*核实等级：**A**（标题、9 位作者、2026-07-27、2D block / transposition-invariant / MXFP8 QK、7B + 30B MoE / 100B tokens / <1.3% 均已逐字确认）*

---

### 🔬 AI for Science

> ⚠️ **本方向本周未找到高热度（HF trending 榜内）且符合 2608/2607 的论文。** 蛋白设计 / 材料发现 / 天气大模型三个主流子方向四轮检索命中的全部为 2503 / 2508 / 2602–2605 前缀，一律排除。以下一篇 ID 合规但热度未知，仅供参考。

#### LLM-Guided Retrieval for Prediction of Molecular Perturbation Responses

📄 https://arxiv.org/abs/2608.01734 | 💻 暂未确认 | 🤗 未确认 | 机构：暂未确认

**问题**

- 预测小分子扰动下的转录组响应对药物发现是核心问题，但**穷举 profiling 在组合空间上不可行**（药物 × 细胞系）。
- 现有路线各有硬伤：ChemCPA 一类需学习化学结构到表达变化的映射，在**未见细胞系**上泛化差；基于化学相似度的 kNN 只看分子指纹，捕捉不到生物学层面的相关性。

**方法**

- 把分子扰动预测**重构为 retrieve-and-aggregate 问题**：用"生物学相关化合物的已测响应"来近似未测药物的响应。这是**问题形式的转换，不是模型的改进**。
- **LGR (LLM-Guided Retrieval)**：由 LLM 对候选 neighbor drug 排序——关键约束是**候选集限制在目标细胞系中已被 profiling 的药物**，保证聚合的都是同一细胞系下的真实测量值，避免跨细胞系外推。
- **聚合器固定为 mean**：刻意不训练聚合权重。这个设计决策让 LLM 的先验知识成为唯一的可变部分，从而可以干净地归因增益来源。
- **与 RAG 的区别**：检索的不是文档而是**实验测量的表达 delta 向量**，LLM 只做排序（提供生物学先验），不参与生成最终数值。

**效果**

- 在 **Tahoe-100M 单细胞扰动图谱**上评测，覆盖三种 regime：**unseen-drug / unseen-cell-line / open-world**。
- 相对 **drug mean、ChemCPA、chemistry-based kNN** 三个 baseline 一致提升，**unseen cell-line 泛化上增益尤其显著**。
- ⚠️ **未核实到具体数值。**

*核实等级：**B**（abs URL + 标题一致；无具体数值）*

---

### 🌐 其他新兴方向

#### PlayWorld: Benchmarking World Models with Agent Players over Long-Horizon Objectives

📄 https://arxiv.org/abs/2608.13552 | 💻 https://github.com/kxding/PlayWorld（HF 数据集：jocelynd/playworld-bench）| 🤗 HF ⭐ 38 | 机构：暂未确认

**问题**

- 交互式世界模型的评测存在一个**方法论死结**：不同模型达成同一目标所需的动作序列**本质不同**（模型 A 三步能推开门，模型 B 需要五步）。因此**固定 action sequence 的 action-conditioned 评测在跨模型比较上是无效的**——你在惩罚"动作分布不同"，而不是在衡量"世界建模好不好"。
- 现有 metric 又主要停留在视频质量与短程可控性，测不到长程状态演化。

**方法**

- **用多模态 Agent Player 与世界模型交互**，朝**给定的长程目标**推进。评的是"能否达成目标"而非"是否复现指定动作序列"——**绕开了动作序列不可比的死结**。这是评测范式的转换。
- **171 个场景**，每个带明确 objective。
- **四个核心维度**，每一个对应一类具体失效：
  - *geometry consistency*——空间结构是否漂移
  - *interaction fidelity*——动作后果是否物理合理
  - ***out-of-sight evolution*——摄像机移开后，被遮挡物体的状态是否仍在正确演进。这是最难也最能区分"真世界模型"与"视频生成器"的维度**
  - *insight evolution*——视野内演化
- 另保留视频质量与可控性的基础指标作为对照层。

**效果**

- 评测 **9 个 SOTA 世界模型**。
- 核心结论：**当前模型在长程交互目标上普遍不可靠，尤其在维持空间一致性与持久状态演化上**。
- 与 ABot-World-0 恰好互补——后者证明"能实时跑"，PlayWorld 指出"跑得久了还是不对"。

*核实等级：**B**（abs URL + 标题 + GitHub + HF 数据集一致；171 场景 / 4 维度 / 9 模型来自摘要抽取）*

---

### 论文模块的明确未收录说明

以下方向本周**未收录，原因如实说明**：

- **机制可解释性（mechanistic interpretability / SAE）**：三轮检索（sparse autoencoder、activation steering、safety subspace）返回的论文 ID 全部为 2506 / 2509 / 2512 / 2605 / 2606 等**不合规前缀**，无一命中 2608/2607。**本方向本周未找到符合时间要求的可核实论文。**
- **KV cache 压缩/量化**：专项检索返回 2412 / 2502 / 2508 / 2510 / 2604 / 2605 前缀，无 2608/2607 命中。本方向改以 FP4 训练量化（2607.24953）代表。
- **ID 合规但未深入核实、故未展开收录**：MatrAIx (2608.04205, HF 40)、AutoDesign (2608.13560, HF 39)、ScrambleToolBench (2608.02358)、PAST-Bench (2608.04003)、GABench (2608.01684)、MiniWorld (2608.01127)。
- **因 ID 前缀不合规而排除的 HF 高赞论文**（部分热度高于本报告入选项）：COLLEAGUE.SKILL (2605.31264)、SkillOpt (2605.23904)、SenseNova-U1 (2605.12500)、ARIS (2605.03042)、DataFlow (2512.16676)、LTX-2 (2601.03233)、Unlimited OCR (2606.23050)。

---

## 【模块四】开源项目周榜

> ⚠️ **数据来源说明**：`github.com/trending?since=weekly` 本次返回的是严重过时的缓存快照（星数为多年前数值），已弃用。**本周 star 增量来自 Trendshift 周榜（2026 W33，8/10–8/16），属推断字段而非官方标注，请视作近似值**；总 star 数抓取时间 2026-08-17，其中前两项为 GitHub 仓库页直读，其余来自 Trendshift 详情页。

**[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) ⭐ 130.1k（本周约 +113k）**

- DeepSeek 官方开源的 Agent Harness（CLI 名 `dsh`），MIT 协议，架构核心是"万物皆插件"——模型/工具/沙箱/调度/UI 全部由插件组合，基于 Cordis 框架，目前为 developer preview
- 上手难度：⭐☆☆ 简单（装好 Node.js 后 `npx @deepseek-ai/dsh web` 即可拉起 Web UI，默认 127.0.0.1:3080）
- 适用场景：自建可插拔 Agent 运行时、给团队搭本地 Agent 工作台；插件生态（`dsh-plugin`）正在快速膨胀

**[earendil-works/pi](https://github.com/earendil-works/pi) ⭐ 91.4k（本周约 +5.3k）**

- AI Agent 工具箱：统一多厂商 LLM API（OpenAI/Anthropic/Google）、Agent 运行时、TUI 库、可自我扩展的 coding agent CLI
- 上手难度：⭐⭐☆ 中等（npm 安装 `@earendil-works/pi-coding-agent`；**没有内置权限系统，生产用需自行上容器/沙箱**）
- 适用场景：不想被单一模型厂商锁定的 Agent 开发；也可单独作为"统一 LLM API"层引用

**[stablyai/orca](https://github.com/stablyai/orca) ⭐ 46.1k（本周约 +5.7k）**

- 并行 Agent 的 ADE（Agent Development Environment）：Claude Code / Codex / Cursor / OpenCode / Pi 等任意 CLI agent 并排跑，**每个跑在独立 git worktree 里**，有桌面端、手机端和 VPS 版
- 上手难度：⭐☆☆ 简单（`brew install --cask stablyai/orca/orca`，或官网直接下 dmg/exe/AppImage）
- 适用场景：同时驱动多个编码 Agent 做同一任务再择优合并；手机端远程盯 Agent 进度

**[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐ 46.3k（本周约 +3.1k）**

- 把文档或一个主题直接变成"真正的"原生 PowerPoint：原生图形、转场动画、数据驱动的图表表格、讲者备注转语音旁白，支持自带 .pptx 模板
- 上手难度：⭐⭐☆ 中等（Python 项目，需本地配置环境）
- 适用场景：周报/月报/课件批量生成，尤其是需要可编辑 pptx 而非图片式幻灯片的场合

**[semantica-agi/semantica](https://github.com/semantica-agi/semantica) ⭐ 8.1k（本周约 +4.8k）**

- 面向"上下文"与"可问责 AI 系统"的图原生（Graph-Native）基础设施，8 月 10 日冲上 GitHub Trending 第 1
- 上手难度：⭐⭐⭐ 较难（基础设施层项目，需先理解图建模与上下文治理概念）
- 适用场景：需要溯源、审计、可解释性的企业级 RAG / Agent 记忆层

**[cactus-compute/needle](https://github.com/cactus-compute/needle) ⭐ 6.6k（本周约 +3.0k）**

- Needle 2：**45M 参数**的工具调用/设备控制/结构化抽取模型，**整个模型是一个 14MB 二进制，一次完整会话约占 28MB 内存**；带置信度分数，可用于"低置信就升级到大模型"的分级路由
- 上手难度：⭐☆☆ 简单（`pip install cactus-needle`，`@needle.tool` 装饰一个函数即可）
- 适用场景：手机、可穿戴、智能家居、机器人上的端侧函数调用；发票/回单类结构化抽取

**[holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS) ⭐ 8.3k（本周约 +2.8k）**

- 开源 All-in-One AI Agent 工作区，把 Claude Code、Codex 等 Agent 接到 100+ 工具集成 + MCP、浏览器和本地文件上，**共享同一份记忆**；可用内置模型也可 BYOK
- 上手难度：⭐⭐☆ 中等（TypeScript，**自定义 License，商用前需读授权条款**）
- 适用场景：给非纯代码类工作（调研、运营、文档处理）搭统一的 Agent 桌面

**[QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) ⭐ 2.4k（本周约 +2.4k，本周新项目）**

- 通义千问团队出品，让任意 Agent harness 变成"多模态原生"的插件集，8 月 11 日拿下 Trendshift Python 日榜第 1
- 上手难度：⭐⭐☆ 中等（Python，Apache-2.0，需先有一个 agent harness 作为宿主）
- 适用场景：给已有的编码/办公 Agent 补上图像、截图理解能力

> **本周榜单的一个观察**：8 项中有 6 项是 **agent 基础设施**（harness / ADE / 工作区 / 插件层 / 记忆层），而非模型或应用。开源社区的注意力已经从"跑什么模型"整体转移到"怎么组织 agent 运行时"。

---

## 【模块五】行业动态简报

📅 **08/10** | [产品/战略] Mark Zuckerberg 发表约 6,500 字长文《The Future Is for Everyone》，提出「个人超级智能」（personal superintelligence）愿景，主张 AI 的核心风险是**控制权集中**而非技术本身，承诺向数十亿人免费或低价提供个人智能体。（TechCrunch / The Next Web）

📅 **08/10** | [基建/融资] NVIDIA 宣布与 Apollo、BlackRock、Blackstone、Brookfield、Goldman Sachs、KKR 达成最高 **5,000 亿美元**的 AI 数据中心建设资金安排。**关键条款是英伟达用自有资金为抵押 GPU 的残值兜底——若 GPU 价值不及预期，英伟达补足最高 25% 差额**。消息一度惊动债市，黄仁勋随后公开澄清风险敞口有限。（Bloomberg / NVIDIA Blog / TechCrunch）

📅 **08/11** | [政策合规] Anthropic 宣布为 Claude 生成的文本嵌入**不可感知的机器可读水印**，文件类内容采用 C2PA 标准。直接动因是欧盟《AI Act》透明度义务（Article 50）于 **8 月 2 日**正式生效——8 月 2 日后发布的模型须原生支持标记。Anthropic 表示该机制**全球生效，不限于欧盟**。（TechCrunch / Fortune / Axios）

📅 **08/12** | [融资] AI 建站/编程平台 **Lovable** 确认新融资 **4 亿美元**，估值 **133 亿美元**；同日 OpenAI 参投的 **Thrive Holdings** 完成 **20 亿美元**融资，主攻企业侧 AI 落地。（TechCrunch）

📅 **08/13** | [融资] **Databricks** 完成 **50 亿美元**融资，估值 **1,900 亿美元**，Coatue 领投。原计划仅募 10 亿，投资人意向一度堆到 150 亿。Q2 年化营收跑赢 **70 亿美元**，同比增长逾 80%。（TechCrunch / Bloomberg）

📅 **08/13** | [重要合作] **IBM × OpenAI** 达成企业级 AI 合作：GPT-5.6、Codex、ChatGPT Work 集成进 IBM Consulting Advantage；IBM 设立专门的 OpenAI Practice，配备数千名经 OpenAI 认证的顾问与工程师，并联合 OpenAI Daybreak Cyber 伙伴计划做安全侧协同。首批行业为金融、政府、电信、零售。财务条款未披露。（IBM Newsroom / TechCrunch）

📅 **08/13** | [API 变化] OpenAI 推出 **Ultrafast** 模式，使 GPT-5.6 Sol 以约 **14 倍**速度运行（最高 750 tokens/s，Cerebras 供算力）。（TechCrunch / OpenAI）

📅 **08/13** | [国内 / 开源 + 事故] **DeepSeek 以 MIT 协议开源 Agent 执行框架 DeepSeek Harness**（`dsh`，v0.1 开发者预览）。**同日**，DeepSeek-V4-Pro-0813 正式版上线**不到 24 小时被官方悄然撤下**横幅与公告——第三方评测显示其智能指数仅比 V4-Flash 高一个身位，定价却是 Flash 的数倍。官方未作说明。（新浪科技 / IT之家 / 钛媒体）

📅 **08/13** | [资本市场] 《Fortune》报道 **Anthropic 计划 2026 年 10 月以约 2 万亿美元估值 IPO**，规模将超越 2026 年 6 月上市的 SpaceX（1.77 万亿美元），成为史上最大 IPO。Anthropic 已于 6 月向 SEC 秘密递交文件并进入静默期。（Fortune，经 IT之家/新浪科技转述；**属"据称/计划"，非官方确认**）

📅 **08/14** | [国内产品] **智谱发布 GLM-5.3**，7,430 亿参数，宣布两周内开源。基座与 GLM-5.2 完全一致，性能提升全部来自后训练 Scaling。另涌现网络安全能力：联合清华、南开及多家安全团队红队测试，2 周内累计发现 **2,436 个漏洞**（1,097 个中高危），已报送 CNNVD/CNVD。（36氪 / 智东西）

📅 **08/15** | [并购] **SpaceX 正式完成对 Cursor 母公司 Anysphere 的收购**（全股票交易，此前公布金额 600 亿美元），Cursor 并入 SpaceXAI 部门。（TechCrunch）

📅 **08/16** | [并购] Bloomberg 报道 **Stripe 敲定以超 70 亿美元收购 AI 网关 OpenRouter**——较其 82 天前 13 亿美元估值涨逾 5 倍，OpenRouter 称有 800 万全球用户。**Stripe 未确认金额**。（TechCrunch / Bloomberg / Fortune）

> **本周未找到中国新出台的 AI 监管政策。** 检索到的最新法规为《人工智能拟人化互动服务管理暂行办法》（2026/07/15 施行）与 GB 45438-2025 标识国标（2025/09/01 施行），均不在本周窗口内。因此本模块"政策法规"一栏以欧盟 AI Act 透明度义务（8/2 生效、8/11 触发 Anthropic 动作）为主。

---

## 【模块六】中文社区热点

> ⚠️ **采集说明**：机器之心（jiqizhixin.com）、量子位（qbitai.com）、新智元、PaperWeekly 本周文章**未能直接检索到**（定向域名搜索仅返回 6 月及更早旧文，qbitai.com 首页因抓取限制不可达）；即刻、小红书内容在搜索索引中基本不可达。以下话题**全部来自知乎、36氪、新浪科技、网易科技、钛媒体的交叉验证**，未虚构任何来源。

**话题一：DeepSeek Harness 开源 & V4-Pro"发布即撤回"**

- **为什么热**：8/13 一天内 DeepSeek 连出两件大事——开源 Agent 框架 Harness（被视为对标 Claude Code / Codex 的"Vibe Coding 入口"），但同日上线的旗舰 V4-Pro-0813 不到 24 小时被撤下公告。新浪科技当日热榜前十有四条与此相关。
- **主要观点分歧**：一方认为是**部署环节出错**——"现在跑的实际还是 Flash 模型"，属运维事故，模型本身没问题；另一方认为是**性能确实未达预期**——定价是 Flash 的数倍，第三方智能指数却只高一个身位，"对标 Fable 5 是不太可能了"。官方至今未解释，这本身又引发了对"静默回滚"透明度的批评。
- **代表性内容**：
  - [新浪科技：正式版突遭撤回，不到 24 小时口碑大逆转](https://finance.sina.com.cn/tech/roll/2026-08-13/doc-inineiyr9983745.shtml)
  - [DeepSeek Harness 震撼开源：一切皆插件](https://finance.sina.com.cn/tech/roll/2026-08-13/doc-inineuqe4558061.shtml)
  - [钛媒体：DeepSeek Harness，"杀死"Agent 黑箱](https://www.tmtpost.com/8104305.html)

**话题二：GLM-5.3 与"不换基座也能换代"的后训练路线**

- **为什么热**：8/14 智谱发布 GLM-5.3 并承诺两周内开源，最抓眼球的是**基座与 GLM-5.2 完全一致，全部提升来自后训练 Scaling**；加上"涌现网络安全能力、两周挖出 2,436 个漏洞"这一超出预期的结果，知乎相关提问与长文在两天内密集出现。
- **主要观点分歧**：乐观方认为这证明**预训练红利见顶后，后训练仍是被严重低估的富矿**，且同等思考预算下准确率 31.5% 高于 Claude Opus 4.8 的 29.5%、输出 token 不到其一半，是真实的工程胜利；谨慎方指出实测中它**审美判断偏弱**（建筑贴图四轮反馈仍显简陋）、对低风险改动也跑全量测试造成 token 浪费，且"接近 Claude Fable 5"主要成立于**编程与 Agent 这一窄口径**。
- **代表性内容**：
  - [36氪/智东西深度实测](https://www.36kr.com/p/3938994639617159)
  - [知乎：如何评价 GLM-5.3 的前沿编程能力与涌现的网络安全能力？](https://www.zhihu.com/question/2071591447367770456)
  - [知乎专栏：不堆参数，靠训练方法登顶开源代码能力](https://zhuanlan.zhihu.com/p/2071693294258721497)

**话题三：Claude 上线隐形文本水印，中文社区反应激烈**

- **为什么热**：8/11 Anthropic 宣布 Claude 生成的所有文本嵌入不可见水印，且**复制粘贴后仍随文本传播、部分编辑后可能存活**。中文社区反应比英文圈更激烈，知乎、微博、网易科技均出现"震怒""炸了"级别的标题。
- **主要观点分歧**：支持方认为这是**欧盟 AI Act 8/2 生效后的必然合规动作**，有助于遏制 AI slop、保护内容生态；反对方火力集中在两点——一是**使用场景被"抓包"**（TechCrunch 直接报道有用户不满水印会暴露他们在工作和课业中用 Claude），二是**判定边界模糊**："我只是改个错别字，也算 AI 作品？"另有国内开发者提出务实担忧：**合规责任不会因为 Anthropic 做了技术实现就自动转移**，集成 Claude 的下游产品仍需自行厘清标识义务。
- **代表性内容**：
  - [知乎：怎么看 Claude 在生成文本里加入隐形水印？](https://www.zhihu.com/question/2070443311802867884)
  - [知乎专栏：Claude 上线隐形水印，所有文本可全球追踪](https://zhuanlan.zhihu.com/p/2070565436660376183)
  - [网易科技：我只是改个错别字，也算 AI 作品？](https://www.163.com/tech/article/L44GGN2N00097U7T.html)
  - [TechCrunch: Some Claude users are mad that Anthropic's new watermarks will catch them](https://techcrunch.com/2026/08/12/some-claude-users-are-mad-that-anthropics-new-watermarks-will-catch-them-cheating-at-their-jobs-classes/)

**话题四：Anthropic 2 万亿美元 IPO 传闻**

- **为什么热**：8/13《Fortune》放出消息后，两天内新浪财经、网易、观点网、IT之家等密集转载，"史上最大 IPO 要易主了"成为标题模板。参照系很清晰——SpaceX 6 月刚以 1.77 万亿美元创纪录上市。
- **主要观点分歧**：讨论集中在**估值合理性**——支持方引用其年化营收已破 470 亿美元、投资方预测年底达 1,000–1,200 亿美元的增速；质疑方则指出这是**投资方预测而非公司披露**（Anthropic 6 月已进静默期，不能自行公开财务信息），存在明显的信息不对称。
- **代表性内容**：
  - [新浪科技：Anthropic 计划 10 月 IPO](https://finance.sina.com.cn/tech/digi/2026-08-14/doc-ininfrtu4289408.shtml)

**话题五：扎克伯格"个人超级智能"宣言的两极评价**

- **为什么热**：8/10 长文发布后，中文科技媒体的取题就已带情绪——36氪转载标题是《今年最激动人心的 AI 宣言，来自科技圈最不受待见的人》，把"内容"与"作者信誉"的张力直接摆出来。
- **主要观点分歧**：认同方买"AI 最大风险是控制权集中而非技术本身"这一框架，以及"给每个人一个私有智能体"的承诺；怀疑方的核心反驳是 **Meta 自身在隐私与注意力经济上的历史记录与这套说辞正面冲突**，且全文长于乌托邦叙事、短于具体机制。英文圈的定性（"Rorschach test"，罗夏墨迹测验）在中文讨论里也被反复引用。
- **代表性内容**：
  - [36氪：今年最激动人心的 AI 宣言](https://www.36kr.com/p/3940207148596612)
  - [TechCrunch: Why people aren't buying Mark Zuckerberg's AI future](https://techcrunch.com/2026/08/16/why-people-arent-buying-mark-zuckerbergs-ai-future/)

---

## 【模块七】本周实用工具推荐

**DeepSeek API**（https://platform.deepseek.com/pricing ｜ 文档 https://api-docs.deepseek.com/quick_start/pricing）

- **解决什么问题**：极低成本的大上下文模型调用，V4-Flash / V4-Pro 两档，支持思考模式、工具调用、JSON 输出
- **如何快速上手**：① platform.deepseek.com 注册充值拿 API Key；② base_url 改成 `https://api.deepseek.com` 直接用 OpenAI SDK 调（也提供 `https://api.deepseek.com/anthropic` 的 Anthropic 兼容端点）
- **适合**：开发者
- **费用**：纯付费（按量）。**本周有重要变动**：自 2026-08-16 16:00 UTC 起改为**高峰/低谷计价，低谷价为高峰价的一半**。
  - `deepseek-v4-flash`：低谷 $0.007 / $0.22 / $0.66，高峰 $0.014 / $0.44 / $1.32（缓存命中输入 / 缓存未命中输入 / 输出，每 1M tokens）
  - `deepseek-v4-pro`：低谷 $0.022 / $0.66 / $1.98，高峰 $0.044 / $1.32 / $3.96
  - 高峰时段 UTC 01:00–04:00 与 06:00–10:00
  - 💡 **可操作建议**：批量离线任务（数据标注、语料清洗、评测跑分）排到低谷时段，成本直接减半

**Firecrawl**（https://www.firecrawl.dev/pricing）

- **解决什么问题**：把任意网页/站点抓成干净的 Markdown 或结构化数据直接喂给 LLM；含 scrape / crawl / map / search / interact / monitor 六类接口
- **如何快速上手**：① 官网注册（免费档不需信用卡）拿 API Key；② 调 `/scrape` 传一个 URL 即返回 Markdown，或先在 firecrawl.dev/playground 里点着试
- **适合**：开发者（Playground 可视化界面非技术用户也能用）
- **费用**：免费额度 + 付费。Free 每月 1,000 credits（约 1,000 页）、2 并发；Hobby $16/月（年付）5,000 页；Standard $83/月 10 万页；Growth $333/月 50 万页；Scale $599/月 100 万页。计费：scrape/crawl/map/monitor 各 1 credit/页，search 2 credits/10 条结果，interact 2 credits/浏览器分钟；JSON 输出、Enhanced Mode 等额外扣费；自助档 credits 不结转，**失败请求不收费**

**硅基流动 SiliconFlow**（https://siliconflow.cn/pricing）

- **解决什么问题**：一个 OpenAI 兼容端点接入 100+ 国产开源大模型（DeepSeek / Kimi / GLM / Qwen / MiniMax / 混元 / 通义万相等），对话、生图、语音、视频全覆盖，**国内网络直连**
- **如何快速上手**：① 注册并完成实名认证（认证后才能使用全部免费模型）；② 用 OpenAI SDK 把 base_url 指向硅基流动，model 填模型全名即可
- **适合**：两者皆可（开发者调 API；非技术用户可在 cloud.siliconflow.cn 网页体验）
- **费用**：免费额度 + 付费。官网标注为**免费**的模型：THUDM/GLM-Z1-9B-0414、PaddlePaddle/PaddleOCR-VL-1.5、tencent/Hunyuan-MT-7B、BAAI/bge-m3 系列 embedding 与 reranker、Kwai-Kolors/Kolors 生图、TeleAI/TeleSpeechASR、FunAudioLLM/SenseVoiceSmall。付费示例（每 M tokens，输入/输出）：DeepSeek-V4-Flash ¥1.00/¥2.00，DeepSeek-V3.2 ¥4.00/¥6.00，GLM-5.2 ¥8.00/¥28.00，Kimi-K2.7-Code ¥6.50/¥27.00，Qwen3.5-35B-A3B ¥0.40/¥3.20（128k 以内）；生图 Z-Image-Turbo ¥0.10/张；TTS CosyVoice2 ¥0.05/千字符；视频 Wan2.2 ¥2.00/个

**ElevenLabs**（https://elevenlabs.io/pricing）

- **解决什么问题**：高质量 TTS / 语音克隆 / 语音转文字 / 音效 / 配音，中文效果可用，网页端点几下就能出音频
- **如何快速上手**：① 注册免费账号；② 网页里粘贴文本、选音色、点生成即可下载（接程序则 Settings → API Keys 拿 key）
- **适合**：两者皆可（非技术用户尤其友好）
- **费用**：免费额度 + 付费。Free $0/月，10k credits/月（约 10 分钟 TTS，128kbps/44.1kHz，3 个 Studio 项目，**无商用授权**）；Starter $6/月 30k credits（含商用授权 + 即时声音克隆）；Creator $22/月 121k credits（首月 5 折 $11，含专业声音克隆）；Pro $99/月 600k credits；Scale $299/月 1.8M credits；Business $990/月 6M credits。另有 Startup Grants：12 个月免费、33M 字符

**飞鼠格式 FlyingMouse Format**（https://github.com/LaoFeng-mouse/flyingmouse-format）

- **解决什么问题**：Windows 上的万能文件格式转换，**完全离线本地跑**，内置 FFmpeg / LibreOffice / Poppler / Tesseract——图片、Word/WPS、Excel、PPT、PDF、音视频互转 + OCR + 批量转换，还能解密网易云 ncm、QQ 音乐 mflac/mgg
- **如何快速上手**：① GitHub Releases 下 Windows 10/11 x64（或 Win7 兼容版）安装包；② 拖入文件、选目标格式、点转换
- **适合**：非技术用户
- **费用**：免费（**仅供个人免费使用，作者明确禁止商业售卖/转卖/套壳**）

---

## 【数据源与生成说明】

**报告生成时间**：2026-08-17
**数据截止时间**：2026-08-17（GitHub star 数与 HF 榜单为当日抓取；HF Trending Papers 点赞数为 2026-08-16 抓取）
**覆盖窗口**：2026-08-10 – 2026-08-17

**论文 arXiv ID 覆盖范围**：`2607.11562` – `2608.13552`（全部为 2607 / 2608 前缀，逐条核对）

### 主要数据来源

| 类别 | 来源 |
|---|---|
| 论文 | Hugging Face Trending Papers、arXiv abs 页面（cs.CL / cs.AI / cs.LG / cs.CV / cs.RO / cs.NE）、alphaXiv、各论文 GitHub 与项目页 |
| 模型 | blog.google、x.ai/news、openai.com/index、research.meta.ai/blog、huggingface.co model card、Reuters 通稿、IT之家、新浪科技、36氪 |
| 开源项目 | GitHub 仓库页（直读）、Trendshift 周榜（2026 W33） |
| 行业动态 | TechCrunch、Bloomberg、Axios、Fortune、IBM Newsroom、新浪科技、钛媒体、36氪、智东西 |
| 中文社区 | 知乎「人工智能」话题、36氪、新浪科技、网易科技、钛媒体 |
| 工具价格 | 各官方 pricing 页（DeepSeek / Firecrawl / SiliconFlow / ElevenLabs，均 2026-08-17 抓取） |

### 本期已知数据缺口（如实说明）

1. **`github.com/trending?since=weekly` 返回严重过时的缓存快照**（星数为多年前数值），已弃用。本周 star 增量改用 Trendshift 周榜，且该站字段无标签，增量数值系通过与 fork 总数交叉比对**推断**得出，**请视作近似值**。同一 GitHub URL 在不同时刻的新鲜度也不一致（orca、needle 的仓库页返回 8/9、8/11 的快照），已改用当日 Trendshift 数据。
2. **机器之心、量子位、新智元、PaperWeekly 本周内容未能检索到**；即刻、小红书在搜索索引中基本不可达。模块六全部来自知乎/36氪/新浪/网易/钛媒体交叉验证，**未虚构任何来源**。
3. **AI for Science 与机制可解释性两个方向本周未找到符合 2608/2607 时间约束的可核实论文**，已如实标注而非用旧论文填充。
4. **G0.5（2608.11739）的 arXiv abs 页未能直接打开**，标题与数字来自第三方，已标为 C 级，引用前请自行核对。
5. **中国本周新出台的 AI 监管政策：未找到**，政策一栏以欧盟 AI Act 为主。
6. 多项数字为厂商自报（GLM-5.3 全部 benchmark 含自建 Z.ai Code Bench、Qwen3.8-27B 对比表、Grok 4.6 evals 表），**非第三方独立评测**，横向比较时需注意口径。

### 三个易错陷阱（供后续采集参考）

1. **腾讯混元开源 0.5B/1.8B/4B/7B 四款小模型是 2025 年 8 月的新闻**，多个中文聚合源误标为 2026 年 8 月。
2. **Seedream 5.0 Pro 发布于 7 月 8 日**，非 8 月。
3. **「GLM-5.5」「Claude Fable 5.1」均为传闻**；本周实际发布的是 GLM-5.3，Anthropic 本周无新模型。

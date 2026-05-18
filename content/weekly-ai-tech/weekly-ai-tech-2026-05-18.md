# AI 技术周报 · 2026-05-18

> 覆盖周期：2026-05-12 — 2026-05-18
> 受众：算法研究员 / AI 工程师
> 论文 arXiv ID 范围：`2604.XXXXX`（4 月）/ `2605.XXXXX`（5 月）

---

## 【模块一】本周导读

- 🔴 **最重要的变化**：本周是「企业级 AI 落地一周」，三件事高度密集——**Anthropic ×Gates Foundation 4 年 $2 亿**（5/14）+ **PwC 3 万人 Claude 铺开**（5/14）+ **Claude Platform on AWS 17 区域 GA**（5/14）；Ramp 5 月企业付费数据 Anthropic 首次以 **34.4% 对 32.3%** 超过 OpenAI。算力厂商一边，**NVIDIA H200 解禁约 10 家中国企业**（单家 75,000 颗上限）48 小时内被 Trump 自己的「Xi 想做自己的芯片」表态浇灭，NVDA 一日蒸发 $1,700 亿——「中国数据中心营收回正」路径再次推迟到 5/20 财报后再看。
- 🟡 **值得关注但未明朗**：物理 AI 拐点信号——**Figure AI Helix-02 三台机器人连续 50 小时自主分拣 ~5 万件包裹**（5/15），无 teleoperation；与 5 月初 Boston Dynamics × Hyundai Atlas 产线爬坡、Agility Digit 在 Toyota Canada 部署形成同向。但 Bloomberg 警告：长时间直播可能掩盖换班，行业仍缺乏「真 7×24」第三方审计标准。
- 🟢 **对开发者最有价值**：算法研究员请重点看 **GCPO**（2605.11461，把 GRPO 的「winner-takes-all」改为团队协作奖励，团队覆盖度=行列式体积）和 **TileQ**（2605.09281，MoE 低秩 2D 分块量化，额外显存降 **10×**、推理时延降至 **~5%**）。两个都是即插即用的训练/推理工程化突破。SANA-WM（2605.15178，NVIDIA Song Han）则是首个能在 RTX 5090 上 **34 秒生成 60s/720p** 的开源世界模型，自动驾驶 / 具身研究值得跟。

**下周预告**
- **5/18 周一 Oakland** — Musk v. Altman 9 人陪审团合议启动，咨询性裁决预计本周内出，关注 disgorgement 范围是否含 Altman / Brockman 罢免。
- **5/19 周二 山景城** — Google I/O 2026 主 keynote 10:00 PT，业界共识 **Gemini Omni** 统一多模态首次上台 + Android XR 眼镜量产合作伙伴名单。
- **5/20 周三 14:00 PT** — NVIDIA Q1 FY27 财报，焦点 H200 中国营收口径与 Vera Rubin 7 月出货指引。
- **5/20 周三** — Meta 启动 8,000 人裁员（约 10%），Reality Labs 削减约 1,800 人（12%）。
- **5/27 周三** — Marvell 财报，验证 Alphabet 自研 AI 芯片扩张主线。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

#### OpenAI · GPT-5.5 Instant Mini（5/14 发布）
- **核心能力**：作为 GPT-5.5 Instant 到达速率上限后的 **fallback**——较 Instant 更小、延迟更低、QPS 上限更高，且仍是 GPT-5.5 体系（高风险领域幻觉断言较 GPT-5.3 下降 52.5% 的口径继承自 5/5 Instant）。
- **与上一代对比**：移动端 ChatGPT 用户在限速窗口期不再被打回 GPT-5.3，体感即「永远是 5.5」。
- **访问方式**：自动 fallback，无需用户切换；API 通过 `chat-latest` 路由。
- **适合**：移动端高频对话、ChatGPT Free / Go 等被速率约束的档位。
- 来源：[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog) · 上下文 [TechCrunch](https://techcrunch.com/2026/05/14/openai-says-codex-is-coming-to-your-phone/)

#### OpenAI · Daybreak 企业级 AI 安全平台（5/12 发布）
- **核心能力**：把 OpenAI 模型与 Codex Security 串成端到端漏洞工作流——识别 / 验证 / 优先级排序，自动生成 patch + audit-ready 证据链。
- **模型三档**：
  - **GPT-5.5**（通用，含标准保护）
  - **GPT-5.5 with Trusted Access for Cyber**（已验证企业内防御工作流，放宽 baseline 安全过滤但带审计）
  - **GPT-5.5-Cyber**（更 permissive，授权 red team / 渗透测试 / 受控验证）
- **访问方式**：邀请制；首批 8 家安全厂商 Akamai、Cisco、Cloudflare、CrowdStrike、Fortinet、Oracle、Palo Alto Networks、Zscaler。
- **适合**：关键基础设施防御方、SOC 自动化、渗透测试团队。
- 来源：[Daybreak 官网](https://openai.com/daybreak/) · [The Hacker News](https://thehackernews.com/2026/05/openai-launches-daybreak-for-ai-powered.html)

#### xAI · Grok Build CLI + Grok 4.3 Heavy（5/14 早期 Beta）
- **核心能力**：终端原生 agentic CLI，对标 Anthropic Claude Code 与 OpenAI Codex。
  - 底层 **Grok 4.3 beta**，**2M token** 上下文窗口
  - 16-agent Heavy 架构，可并行启动最多 **8 个子 agent** 分工（计划、文档检索、代码编写）
  - `plan mode`（先出步骤、人审、再执行）、`build secrets`（仅构建期可见）、文件 I/O、shell 命令
- **访问方式**：仅 **SuperGrok Heavy** 订阅，标准 **$299/月**；首 6 个月限时 **$99/月**（67% off）。
- **适合**：愿意把命令行作为主开发界面、需要并行多 agent 编排的重度开发者。
- 来源：[xAI 官方](https://x.ai/news/grok-build-cli) · [Engadget](https://www.engadget.com/2173482/xai-coding-agent-grok-build/)

#### Anthropic · Claude Code v2.1.142（5/14 晚 22:55 UTC）
- **核心能力**：Fast Mode 默认模型由 Opus 4.6 升级至 **Opus 4.7**；可通过 `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE=1` 回锁旧版。
- **新增**：`claude agents` 子命令 8 类 flag（`--add-dir`、`--settings`、`--mcp-config`、`--model`、`--permission-mode`、`--effort` 等）；Hook JSON 输出新增 `terminalSequence` 字段，允许 hook 在无控制终端环境下触发桌面通知 / 系统铃声。
- **适合**：已使用 Claude Code 后台分发会话的工程团队。
- 来源：[Claude Code Releases](https://github.com/anthropics/claude-code/releases) · [Claude Code What's New](https://code.claude.com/docs/en/whats-new)
- *披露：本报告由 Claude 撰写，Anthropic 为 Claude 开发方。*

#### Anthropic · Claude for Legal（5/12 发布）
- **核心能力**：12 个法律执业插件（公司、监管、雇佣等）+ **20+ MCP 连接器**，可接入律所现有法律科技栈。同日 Thomson Reuters **CoCounsel Legal** 通过 MCP 接入 Claude；下一代 CoCounsel 基于 Claude Agent SDK 重写，支持自动规划、工具选择、检索引证、流程中重规划。
- **数据底盘**：CoCounsel 覆盖 **107 国 100 万专业人员**，承载 Westlaw、Practical Law、KeyCite 共 175 年法律内容、约 **19 亿文档 + 14 亿 KeyCite 信号**；客户数据不用于训练第三方模型。
- **适合**：律所 / 企业法务部、合规团队。
- 来源：[Thomson Reuters](https://www.thomsonreuters.com/en/press-releases/2026/may/thomson-reuters-and-anthropic-expand-partnership-to-connect-claude-with-cocounsel-legal) · [Artificial Lawyer](https://www.artificiallawyer.com/2026/05/12/claude-for-legal-launches-may-reshape-the-legal-tech-world/)
- *披露：本报告由 Claude 撰写，Anthropic 为 Claude 开发方。*

#### Anthropic · Claude for Small Business（5/13 发布）
- **核心能力**：Claude Cowork 可切换套件，含 **15 个 agentic 工作流 + 15 个 skill**，连接器涵盖 QuickBooks、PayPal、HubSpot、Canva、DocuSign、Google Workspace、Microsoft 365、Slack。预置工作流：工资规划、月结、催收、销售线索分流、合同审阅、活动建立、现金流监控、业务脉搏报告。
- **配套**：5/14 起与 Tenex.co 启动 **10 城 SMB 巡讲**（首站 Chicago，单站接待 100 位本地中小企业负责人）；与 PayPal 上线 AI Fluency 课程。
- **定价**：非新档，作为 Claude Cowork 插件提供。
- **适合**：5~200 人规模、运行在 SaaS 栈上的中小企业。
- 来源：[Anthropic Newsroom](https://www.anthropic.com/news/claude-for-small-business) · [Axios](https://www.axios.com/2026/05/13/anthropic-claude-small-business-smb)
- *披露：本报告由 Claude 撰写，Anthropic 为 Claude 开发方。*

#### Google DeepMind · 本周无新闭源模型
- **下周预告**：**Gemini 3.5 / Gemini Omni** 行业共识在 5/19 周二 Google I/O 主 keynote（10:00 PT）发布，关注 Android XR 眼镜量产合作伙伴名单与 Deep Research Max。

#### Meta · 本周无新模型；5/13 上线 WhatsApp **Incognito Chat with Meta AI**
- 不是新模型，但首次基于 **TEE（Private Processing）** 把 incognito 从「retention 策略」升级为「provider 在技术层无法访问 prompt」的架构层隔离。其他厂商的 incognito 仍依赖信任不读取，Meta 这次是用 enclave 阻断 provider 访问。首发限文本，分阶段在 WhatsApp 与 Meta AI app 推出。
- 来源：[WhatsApp Blog](https://blog.whatsapp.com/introducing-incognito-chat-with-meta-ai-a-completely-private-way-to-chat-with-ai) · [TechCrunch](https://techcrunch.com/2026/05/13/whatsapp-adds-an-incognito-mode-in-meta-ai-chats/)

---

### ② 国内大模型

#### Tencent · HunYuan Hy3 Preview（5/13 Q1 FY26 电话会披露）
- **是否开源**：开源（首版 5/13 在 Tencent 官网发布，weights 通过混元渠道）。
- **核心能力**：**295B 总参数 / 21B 激活**的 MoE 模型，**256K 上下文**，原生「快慢思考」融合 reasoning。Tencent 称在数学、代码、多语言基准上超 DeepSeek V3 同档；4 月底起 OpenRouter token 用量第一，已进 **131 个内部产品**（CodeBuddy、WorkBuddy、Yuanbao 为主驱动），Hy3 vs Hy2 token 用量增长 **>10×**。
- **与国际同类对比**：参数效率定位介于 DeepSeek V4-Flash（284B/13B 激活）与 Qwen3.6-35B-A3B 之间，长上下文与国内开源同档持平，Agent / Code 路线对标 Claude Opus 4.7。
- **获取/使用**：混元开放平台、腾讯云 API；客户端入口 Yuanbao。
- 来源：[Tencent 官方](https://www.tencent.com/en-us/articles/2202320.html) · [GuruFocus 电话会](https://www.gurufocus.com/news/8856786/tencent-holdings-ltd-tcehy-q1-2026-earnings-call-highlights-strong-revenue-growth-and-ai-integration-drive-performance) · [TECHi](https://www.techi.com/tencent-hy3-preview-hunyuan-ai-model/)
- **资本面**：电话会另披露 2026 AI 投入计划由 2025 的 RMB 180 亿翻倍至超 **RMB 360 亿**；单季 operating CapEx **RMB 312 亿**（同比 +18%、环比 +84%）。

#### ByteDance · UI-TARS-desktop 持续放量（非新模型，但本周 +3,211 star，详见模块四）

#### DeepSeek · 本周无新模型，但 DeepSeek-TUI 与 antirez 的 ds4 双双登 GitHub Trending（详见模块四）

#### Alibaba Qwen / 月之暗面 Kimi / 智谱 GLM / MiniMax / 零一万物 · 本周无重大模型发布
- 上一节点：Qwen3.6-27B Dense（4/22，Apache 2.0）+ Qwen3.6-35B-A3B MoE（4/16）；Kimi K2.6（4/20，1T MoE / 32B 激活，Agent Swarm 支持 300 子代理 / 4000 步）；DeepSeek V4 Preview（4/24）。
- 资本面：Alibaba Q4 FY26 三年 RMB 3,800 亿 CapEx 计划被 CEO Eddie Wu 表态「将显著超出」（5/13 晚 - 5/14 全天发酵），与 Tencent 形成「双高投入模式」。

#### 百度 Wenxin · 本周无新版本
- 4/22 发布的 **ERNIE 5.1 Preview**——多维弹性预训练，预训练成本仅业界 6%，LMArena 搜索榜国产第一——本周仍在持续推广。
- 来源：[量子位](https://www.qbitai.com/2026/05/414496.html)

---

### ③ 其他重要开源模型

#### Google · Gemma 4 持续推广（本周无新成员，但 Ollama / HF 下载延续上周势头）
- 上一节点：5/5 发布的 E2B / E4B / 26B-A4B / 31B 四档，256K 上下文 + 140 种语言，可配置 thinking modes。
- **下周预告**：Google I/O 2026 可能宣布 Gemma 4 衍生的 device-only / on-edge 路线。

#### NVIDIA · 本周无开源模型发布，但 SANA-WM（2605.15178）开源世界模型成 HF 关注焦点
- 详见模块三 🌐 方向。可在 **RTX 5090 + NVFP4 量化** 下 34 秒生成 60s/720p 视频，自动驾驶 / 具身研究可直接复用代码。

#### Mistral · 本周无新版本
- 上一节点：Mistral Medium 3.5（4/29），128B Dense / 256K / 24 语种，SWE-Bench Verified **77.6%**。

#### Meta · 本周无新开源模型

---

## 【模块三】热门论文精选

> **时间核验**：本节所有 arXiv ID 前四位均为 `2604` 或 `2605`，符合本月/上月约束；已逐篇核查 abstract 页 + 提交日期。

### 🧠 大语言模型 / 推理能力

#### Breaking *Winner-Takes-All*: Cooperative Policy Optimization Improves Diverse LLM Reasoning
📄 [arxiv.org/abs/2605.11461](https://arxiv.org/abs/2605.11461) | 💻 [github.com/bradybuddiemarch/gcpo](https://github.com/bradybuddiemarch/gcpo) | 🤗 [HF Paper](https://huggingface.co/papers/2605.11461) | 机构：中山大学 SYSU（Hu Jian-Fang 组）

**问题**
RLVR（Reinforcement Learning with Verifiers）已成为提升 LLM 推理的中心范式，但 GRPO 之类的 group-based 优化算法普遍存在 **exploration collapse**——模型过早收敛到一小撮高分模式，失去对新解空间的探索能力。前人补丁（entropy regularization、diversity bonus）只是在原有 *winner-takes-all* 奖励之上叠加噪声项，没有改变 rollouts 之间「相互竞争独立 advantage」的本质。

**方法**
提出 **GCPO（Group Cooperative Policy Optimization）**，把训练范式从 rollout 竞争改为 team 协作：
- **团队级 credit assignment**：单个 rollout 的奖励不再是其个体准确率，而是它对「团队有效解覆盖度」的贡献——这种覆盖度被刻画为 **奖励加权语义 embedding 上的行列式体积（determinant volume）**，只有 correct 且 non-redundant 的 rollout 才贡献体积。
- **advantage redistribution**：把团队收益按每个 rollout 对团队的 **平均边际贡献**（marginal contribution）分配回去——直接借鉴 Shapley value 的思想。
- **本质区别**：与 GRPO/PPO 的关键差异在 credit 信号本身——GRPO 让 rollouts 互相竞争 advantage，GCPO 让它们合作扩张解空间，从源头化解 exploration collapse。

**效果**
- 在多个推理 benchmark 上**同时**提升准确率与解多样性，打破"准确率↑ → 多样性↓"的经典 trade-off。
- Code 将开源。

---

#### Hallucinations Undermine Trust; Metacognition is a Way Forward
📄 [arxiv.org/abs/2605.01428](https://arxiv.org/abs/2605.01428) | 💻 暂未开源 | 🤗 [HF Paper](https://huggingface.co/papers/2605.01428) | 机构：未披露

**问题**
当前 LLM 的事实性提升主要来自**扩展知识边界**（更大模型 + 更多数据 + RAG），而对「模型是否知道自己不知道」的边界感知能力提升极少。论文形式化定义 hallucination 为 **confident error**——错误信息以缺乏适当限定语的方式呈现，并指出讨论 RAG / fact-check 而不讨论 metacognition 是治标。

**方法**
- 引入 **faithful uncertainty** 概念：模型的语言不确定性应与其内在不确定性对齐（不是「我不知道」就够，而是 hedging 强度需与真实知识置信度匹配）。
- 把 metacognition 定义为模型与 harness 之间的 **控制层**：根据 self-confidence 动态决定何时调 RAG、何时用工具、何时显式表达 doubt。
- 与 RAG / self-refine / debate 的本质区别：那些是 *external* 干预；metacognition 是 *internal* 信号通道，可在模型内部决策何时启动外部干预。
- 论文提出 metacognition 难以达到完美的理论原因：模型若没有内在的判别能力将"true claim"与"confident error"区分开来，外部校准也会逼近其内在判别能力的上限。

**效果**
- 论文是 position paper，给出框架、taxonomy、5 个具体实施建议，未做实验数据竞争——值得算法研究员通读的概念基础。

---

#### Case-Based Calibration of Adaptive Reasoning and Execution for LLM Tool Use（CAST）
📄 [arxiv.org/abs/2605.15041](https://arxiv.org/abs/2605.15041) | 💻 暂未开源 | 机构：未披露（提交人 Xiaosong Zhang，含 BFCLv2 / ToolBench 实验）

**问题**
Tool use 让 LLM 突破参数知识边界，但「该思考多深」与「该严格遵守 schema」存在 trade-off——思考浅则结构错（参数缺失 / 类型错），思考深则成本爆炸且过度 deliberation 反而引入错。前人 RL 方法只统一调 reasoning 长度，没有按案例特性自适应。

**方法**
- 提出 **CAST（Case-Based Calibration）**：把历史执行轨迹当作结构化 cases，**不复用 raw output**，而是从中抽两类 case-derived signals：
  - **complexity profile**（案例复杂度档位）→ 估计最优 reasoning 策略
  - **failure profile**（典型结构性破坏模式）→ 预测可能的 schema 故障点
- 将上述 signals 翻译为**细粒度 reward 设计**与**自适应 reasoning 长度**，让模型在 RL 中**自主内化** case-based 策略。
- 与 PPO+CoT 的本质区别：reward 不再是「正确 / 错误」一维信号，而是按 case 复杂度档位差异化奖励 reasoning length 的合理性，鼓励"该想的时候想到位、不该想的时候直接出 schema"。

**效果**
- **BFCLv2 + ToolBench**：execution accuracy 提升最多 **+5.85 pp**，平均 reasoning length **降低 26%**。
- 显著缓解高影响 structural error（schema 缺字段 / 类型错）。

---

### 👁️ 多模态（视频 / 视觉）

#### SANA-WM: Efficient Minute-Scale World Modeling with Hybrid Linear Diffusion Transformer
📄 [arxiv.org/abs/2605.15178](https://arxiv.org/abs/2605.15178) | 💻 [nvlabs.github.io/Sana/WM](https://nvlabs.github.io/Sana/WM/) | 🤗 [HF Paper](https://huggingface.co/papers/2605.15178) | 机构：MIT HAN Lab × NVIDIA Research × HKUST（Song Han、Enze Xie）

**问题**
World model（自动驾驶仿真 / 具身预训练 / 视频生成）的关键约束是「时长 × 分辨率 × 硬件」三角——LingBot-World、HY-WorldPlay 等工业基线能做到分钟级但需多 H100；学术版可单 GPU 跑但仅几秒视频。同时长视频的 **6-DoF 相机控制** 数据极难获取（公开视频普遍只有 RGB，缺 metric-scale pose）。

**方法**
2.6B 参数原生为 1 分钟生成训练，四项设计：
- **Hybrid Linear Attention**：frame-wise **Gated DeltaNet（GDN）** + softmax attention 的混合——线性 attention 处理 inter-frame 长时记忆，softmax 处理 intra-frame 细节，KV 内存与帧数从二次降至线性。
- **Dual-Branch Camera Control**：camera 信号走独立分支，确保 6-DoF 轨迹的精确遵循而不污染主干视觉特征。
- **Two-Stage Generation Pipeline**：阶段 1 出粗 latent，阶段 2 长视频 refiner 跨段一致性增强。
- **Robust Annotation Pipeline**：从公开视频中**提取 metric-scale 6-DoF 相机位姿**，仅用 **~213K** 公开 clips 就完成监督训练（绕开商业基线的私有大规模带 pose 数据壁垒）。

**效果**
- 训练：64 H100s × **15 天**完成。
- 推理：单卡生成 60s/720p 视频；蒸馏 + **NVFP4 量化** 可在 **RTX 5090** 上 **34 秒**完成一段 60s/720p 视频去噪——这是开源世界模型首次跨过消费级硬件分钟级生成门槛。
- 在自有 one-minute world-model benchmark 上：action-following 准确率超过现有开源基线，视觉质量接近大规模工业基线，吞吐 **36× 更高**。

---

#### Stream-T1: Test-Time Scaling for Streaming Video Generation
📄 [arxiv.org/abs/2605.04461](https://arxiv.org/abs/2605.04461) | 💻 [github.com/FrameX-AI/Stream-T1](https://github.com/FrameX-AI/Stream-T1) | 🤗 [HF Paper](https://huggingface.co/papers/2605.04461) | 项目页：[stream-t1.github.io](https://stream-t1.github.io/)

**问题**
扩散视频生成的 test-time scaling（TTS）问题：full-clip 采样若想枚举 N 条候选 trajectory 需 N 倍计算（>10× 大模型推理），且缺乏时序级别的引导信号，TTS 在视频领域几乎无效。

**方法**
Stream-T1 把 TTS 与 **streaming video generation** 绑定：
- 利用 streaming 的 **chunk-level synthesis + few denoising steps** 特性——TTS 不再扩展整段 trajectory，只在 chunk 边界做候选搜索 + chunk 内做 fine-grained temporal guidance。
- 这使每段 chunk 的候选枚举成本与「单段时延」成正比，而非「整段时长」成正比。
- 与 Video-T1 等 full-clip TTS 的本质区别：把 TTS 嵌进 streaming 的因果链而非追加在 full-clip 之后，显著降低边际成本。

**效果**
- 在 5s 与 30s 两个综合视频基准上同时改善 **temporal consistency / motion smoothness / frame-level visual quality**——TTS 不再是「成本爆炸 + 收益微弱」。

---

#### FLARE: Full-Modality Long-Video Audiovisual Retrieval Benchmark with User-Simulated Queries
📄 [arxiv.org/abs/2605.10228](https://arxiv.org/abs/2605.10228) | 💻 [huggingface.co/AntResearch/FLARE](https://huggingface.co/AntResearch/FLARE) | 🤗 HF Paper | 机构：Ant Research 等

**问题**
随 MLLM 长视频理解能力跃升，视频检索需求从「字幕匹配」演化为「短查询 ↔ 长视频里的视听联合证据」。但现有 benchmark 多基于人工字幕或自动 caption，缺乏 *真实用户搜索行为* 与 *视听联合标注* 的双重维度。

**方法**
- 从 Video-MME 中筛 **399** 个高质量长视频（10-60 min，总时长 **225.4 h**）作为底座。
- 标注 **87,697 clips**，每个 clip 给出 **vision、audio、统一 audiovisual** 三种 caption。
- 同时合成 **274,933 条用户风格查询**（模拟真实搜索语言习惯，区别于 caption-style query）。

**效果**
- 论文同时给出现有 MLLM / video retrieval 模型的 baseline——audio-only 与 vision-only 模型在长视频段落定位上显著弱于真正利用联合证据的模型。
- 实用价值：首批可复现的「长视频 + 真实用户语言」的检索基准，**视频 RAG** 与多模态搜索的下一阶段评估底座。

---

### 🤖 AI Agent / 工具使用

#### AgentTrust: Runtime Safety Evaluation and Interception for AI Agent Tool Use
📄 [arxiv.org/abs/2605.04785](https://arxiv.org/abs/2605.04785) | 💻 论文页注明 AGPL-3.0 + MCP server，仓库未公开 | 机构：未披露（提交人 Chenglin Yang）

**问题**
现代 AI agent 通过 tool calls 直接产生副作用（文件 / shell / HTTP / DB），单次 unsafe action 可造成不可逆损害。现有防御三个均不够：
- **post-hoc benchmark** 只测执行后行为
- **static guardrails** 难抵 shell obfuscation 与多步 context
- **infra sandbox** 限制运行位置但不理解动作语义

**方法**
**AgentTrust** 是 **runtime 安全层**，在 tool call 执行前返回结构化裁决 `allow / warn / block / review`：
- **Shell deobfuscation normalizer**：归一化常见 obfuscated payload（base64 嵌套、字符串拼接、`eval` 链）。
- **SafeFix**：在 block 之外给出更安全替代命令的建议——避免 agent 无限重试同一危险动作。
- **RiskChain detection**：识别多步攻击链（单步看似无害、组合后 exfiltrate）。
- **Cache-aware LLM-as-Judge**：在 rule 无法决策的歧义场景调小 LLM，并对相同 prompt 复用判决以压低成本。
- 对外通过 **MCP server** 暴露，MCP-compatible agent 即插即用。

**效果**
- 内部 300 场景基准（6 类风险）：production-only ruleset 取得 **95.0% verdict accuracy / 73.7% risk-level accuracy**，端到端低毫秒级。
- 外部独立构造的 630 场景对抗基准（patched ruleset，非 zero-shot）：**96.7% verdict accuracy**，其中 shell-obfuscated payloads **~93%**。
- 与现有 GuardRail / Codex Security 主要差别：runtime 拦截 vs post-hoc benchmark，且把 obfuscation 与多步链路当 first-class 设计目标。

---

### ⚡ 高效推理 / 量化 / 长上下文

#### TileQ: Efficient Low-Rank Quantization of Mixture-of-Experts with 2D Tiling
📄 [arxiv.org/abs/2605.09281](https://arxiv.org/abs/2605.09281) | 💻 暂未开源 | 机构：中科院 / 高校组（提交人 Fangfang Liu）

**问题**
MoE 模型的 expert 层是部署瓶颈：低秩 PTQ（post-training quantization）方案虽能压缩，但仍带 **不可忽略的额外内存（rank-r 的低秩因子）** 与 **额外推理时延（多 expert 计算难融合）**。

**方法**
- **2D-tiling structured low-rank quantization**：把 expert 的输入 / 输出 **两个维度** 上的低秩因子结构化共享，而不是各 expert 各算自己的低秩——共享率从 1× 提升到 tile-数级别。
- **fine-tuning-free**：纯 PTQ，无需重训。
- **fused inference**：把多个 expert 的低秩计算融合为 **单 pass** operation，硬件利用率显著提升。

**效果**
- 额外内存开销 **降至 1/10（10×）**。
- 推理时延 **降至 ~5%**（即开销几乎归零）。
- 精度保持 SOTA 水准。
- 适用场景：DeepSeek V4、Qwen3.6 MoE、HunYuan Hy3 等大 MoE 模型的本地化 / 私有化部署。

---

#### AB-Sparse: Sparse Attention with Adaptive Block Size for Accurate and Efficient Long-Context Inference
📄 [arxiv.org/abs/2605.12110](https://arxiv.org/abs/2605.12110) | 💻 暂未开源 | 机构：未披露

**问题**
Block-sparse attention（NSA、Native Sparse 等）已成长上下文推理的事实标准，但**统一的 block size 在不同 attention head 上效率与精度极不均衡**——细 block 精度高但 throughput 低，粗 block 反之；现有工作未在 head 维度自适应。

**方法**
- **AB-Sparse**：training-free 的算法-系统协同设计，按 **head 维度自适应分配 block size**——基于轻量统计在 prefill 期推断每个 head 最优 block 粒度。
- 不动模型权重、不改训练流程，仅在推理前做一次 head-wise calibration。

**效果**
- 相比现有 block sparse 基线，精度提升最多 **+5.43%**，且 **throughput 无下降**。
- 适用：长上下文 RAG / Agent / Document QA 等 prefill-dominant 场景。

---

#### Fluxion: Hybrid Sparse Attention with CPU-GPU Parallelism for Long-Context Inference
📄 [arxiv.org/abs/2605.07719](https://arxiv.org/abs/2605.07719) | 💻 暂未开源 | 机构：未披露

**问题**
长上下文 inference 越来越在 CPU 上保存 KV cache——要么因 decoding 期 KV 超 GPU 显存上限，要么因 disaggregated prefill-decode 把 KV 留在 host memory。但 CPU-resident KV 上的 sparse attention 缺乏系统级方法。

**方法**
Fluxion 基于三个洞察：
- **output-aware KV budgeting**：按当前 token 的输出依赖分配 KV 预算，而非全局均匀。
- **head-specific + granularity-aware sparse configuration**：每个 head 用不同的 sparse pattern + 不同的粒度。
- **cross-device coordinated execution**：CPU 与 GPU 协调跑 sparse attention，**避免 PCIe 同步阻塞**——这是与 vAttention、CPU offload 等纯 offload 方案的关键区别。

**效果**
- 在 CPU-resident KV 的长上下文 inference 场景给出 throughput 与延迟的同向改善；论文是少数把 CPU 当 attention 计算 first-class 设备的工作。

---

### 🔬 AI for Science / Deep Research Agent

#### SciResearcher: Scaling Deep Research Agents for Frontier Scientific Reasoning
📄 [arxiv.org/abs/2605.01489](https://arxiv.org/abs/2605.01489) | 💻 暂未开源 | 机构：HKUST（Yangqiu Song 组）

**问题**
Deep research agent 在普通 web search 任务上已成熟，但在 **frontier science** 任务上仍弱——领域知识分散在稀疏的 paper / dataset / formula 中，问题求解远超 factual recall（需做复杂 computation 与 reasoning）。前人多用 KG 或 iterative browsing 构造训练任务，二者都不适配 frontier science 的稀疏 + 异质 + computational 三重特征。

**方法**
- 提出 **SciResearcher**：全自动 agentic 框架，专门为 frontier-science 任务**自动构造训练数据**，绕开 KG 在前沿领域稀疏的难题。
- 数据构造管线针对 paper-cluster + computational reasoning 任务联合采样，让 agent 在训练阶段直接面对"sparse domain knowledge + heavy computation"双重要求。

**效果**
- 论文给出在多领域 frontier science 任务上的 baseline 对比与数据集统计；适合做 deep research 方向工作的研究者作为数据构造范式参考。

---

## 【模块四】开源项目周榜

> 数据窗口：2026-05-05 — 2026-05-13（GitHub Trending Weekly 主要快照，含 5/12-13 增量）
> 数据源：[GitHub Trending Weekly](https://github.com/trending?since=weekly)、[Shareuhack Trending Weekly 2026-05-13](https://www.shareuhack.com/en/posts/github-trending-weekly-2026-05-13)

**[Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) ⭐ 26,402（本周 +21,752）**
- Rust 写的 DeepSeek 终端编码 agent；DeepSeek V4 发布事件直接驱动。
- 上手难度：⭐⭐☆ 中等（需要熟悉终端工作流）
- 适用场景：DeepSeek V4 本地推理 / 远程 API + 终端原生开发循环

**[anthropics/financial-services](https://github.com/anthropics/financial-services) ⭐ 21,452（本周 +12,088）🔁 月榜**
- Anthropic 官方金融服务 SDK / 参考实现，Apache-2.0。
- 上手难度：⭐⭐☆ 中等
- 适用场景：fintech 评估 Claude 进入合规行业的标准范式；研究 Claude 在金融场景的 agent 边界与合规逻辑设计

**[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) ⭐ 40,363（本周 +11,725）🔁 月榜**
- Addy Osmani（前 Google Chrome 工程）整理的工程级 agent skill 库，覆盖 Claude Code、Cursor、Antigravity IDE。
- 上手难度：⭐☆☆ 简单（drop-in skill 指令）
- 适用场景：让 AI agent 按工程标准产出，而非「能做什么」

**[ruvnet/ruflo](https://github.com/ruvnet/ruflo) ⭐ 49,713（本周 +8,660）**
- Claude 多 agent 编排平台：multi-agent swarm + RAG + Claude Code / Codex 集成。
- 上手难度：⭐⭐⭐ 较难（540 open issues 提示生态尚不稳定）
- 适用场景：评估多 agent 编排架构；生产部署需谨慎

**[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) ⭐ 74,383（本周 +7,259）🔁 月榜**
- 多 agent LLM 金融交易研究框架，Apache-2.0。**注意：研究框架而非 live 交易工具**——LLM hallucination / latency / 黑天鹅事件处理三重风险未解。
- 上手难度：⭐⭐☆ 中等
- 适用场景：学术研究 / 多 agent 财务 pattern 学习；**禁** live 资金

**[bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) ⭐ 33,509（本周 +3,211）**
- ByteDance 多模态 agent 桌面版，集成 computer-use、browser automation、MCP server。
- 上手难度：⭐⭐☆ 中等
- 适用场景：企业级 agent 基础设施评估；GUI 自动化

**[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) ⭐ 30,841（本周 +4,555）**
- 「无向量数据库」reasoning-based RAG，用 LLM reasoning 替代向量检索。
- 上手难度：⭐⭐☆ 中等
- 适用场景：精准文档查询；解「向量返回错误文档」而非「太慢」类痛点

**新仓 · [antirez/ds4](https://github.com/antirez/ds4) ⭐ 8,056（5/6 新建 · HN 497 分）**
- Redis 之父 antirez 用纯 C 写的 DeepSeek 4 Flash Metal + CUDA 本地推理引擎。**周内新仓 HN 得分最高**。
- 上手难度：⭐⭐⭐ 较难（C 编译 + 显卡 backend 配置）
- 适用场景：极致低开销 DeepSeek 4 Flash 本地化部署；研究系统编程在 AI 时代的反潮流路径

---

## 【模块五】行业动态简报

```
📅 05/12 | [融资]   Anthropic 接触新一轮规模 ≥ $300 亿融资，估值 ~$9,000 亿（不含本轮）；首次超过 OpenAI 2026/3 轮的 $8,520 亿（Bloomberg 独家）
📅 05/12 | [产品]   OpenAI 发布 Daybreak 企业 AI 安全平台，三档 GPT-5.5；首批 8 家安全厂商 Akamai/Cisco/Cloudflare/CrowdStrike/Fortinet/Oracle/Palo Alto/Zscaler（OpenAI Newsroom）
📅 05/12 | [合作]   SAP Sapphire 2026 发布 SAP Business AI Platform，Anthropic Claude 接入 Joule，跨 S/4HANA/SuccessFactors/Ariba（SAP Newsroom）
📅 05/12 | [合作]   Anthropic 发布 Claude for Legal；Thomson Reuters CoCounsel Legal 通过 MCP 接入 Claude；CoCounsel 覆盖 107 国 100 万律所专业人员（Thomson Reuters）
📅 05/12 | [机器人] Hello Robot 发布 Stretch 4 开源机器人平台，起价 $29,950（双 3D LiDAR + 多摄像头）（IEEE Spectrum）
📅 05/12 | [产品]   TikTok 在 TikTok World '26 发布 Ads MCP Server，Claude / ChatGPT / Gemini 可直接接管 TikTok 广告投放（TikTok Newsroom）
📅 05/12 | [庭审]   Musk v. Altman: Sam Altman 出庭、Mira Murati 视频作证；Musk 索赔 $1,500 亿（Oakland 联邦法院）
📅 05/13 | [数据]   Ramp 5 月 AI Index：Anthropic 企业付费份额 34.4%（+3.8pp）首次超过 OpenAI 32.3%（-2.9pp）（Ramp）
📅 05/13 | [产品]   Anthropic 上线 Claude for Small Business：15 工作流 + 15 skill + QuickBooks/PayPal/HubSpot/Canva/DocuSign 连接器（Anthropic Newsroom）
📅 05/13 | [产品]   Cursor 3.4 发布：cloud agent 多 repo 开发环境 + Dockerfile build cache（命中重建快 ~70%）（Cursor Changelog）
📅 05/13 | [财报]   Tencent Q1 FY26 营收 RMB 1,965 亿（+9%）；2026 AI 投入计划由 RMB 180 亿翻倍至超 RMB 360 亿（Reuters）
📅 05/13 | [模型]   Tencent HunYuan Hy3 Preview 公布：295B/21B 激活 MoE，256K 上下文，进 131 个内部产品（Tencent）
📅 05/13 | [机器人] Unitree GD01 双足/四足可切换载人 mecha，起价 RMB 390 万；STAR Market IPO 在审（CnEVPost）
📅 05/13 | [外交]   Trump 19:50 抵北京；黄仁勋临时随行（Trump 致电邀请后从 Anchorage 登机）（CNN/Bloomberg）
📅 05/14 | [合作]   Anthropic × Gates Foundation 4 年 $2 亿合作：健康 / 教育 / 经济流动（Anthropic Newsroom）
📅 05/14 | [合作]   Anthropic × PwC：首阶段 PwC 美国 3 万名员工铺开 Claude Code + Cowork，CFO Office 设 Claude-native 财务事业部（PR Newswire）
📅 05/14 | [政策]   美国商务部批准 NVIDIA H200 对华出口给 ~10 家企业（Alibaba/Tencent/ByteDance/JD.com 等），单家上限 75,000 颗（Reuters）
📅 05/14 | [政策]   Bessent 在北京宣布美中将启动「AI 安全协议」，定调「两个 AI 超级大国」框架（CNBC）
📅 05/14 | [产品]   OpenAI Codex Mobile 在 iOS/iPad/Android ChatGPT app 上线 Preview；周活突破 400 万（OpenAI）
📅 05/14 | [基础设施] Claude Platform on AWS 完成 17 区域 GA，认证走 IAM、审计走 CloudTrail、计费走 AWS invoice（AWS What's New）
📅 05/14 | [市场]   NVDA 单日 +4.4% 至 $235.74，市值首破 $5.5 万亿；BofA 目标价 $300 → $320（Reuters/BofA）
📅 05/14 | [市场]   Marvell 单日 +8.18% 至 $192.15 历史新高，市场押注与 Alphabet 自研芯片合作扩张（FX Leaders）
📅 05/14 | [产业]   TSMC 把 2030 全球半导体产值指引上修至 $1.5 万亿，AI + HPC 占 55%（Taiwan News）
📅 05/14 | [安全]   Waymo 向 NHTSA 递交 3,791 辆 Robotaxi 召回（涉水识别软件 OTA）；伦敦目标 2026/9 落地（The Register）
📅 05/15 | [产品]   OpenAI 上线 ChatGPT 个人金融预览（美国 Pro 用户）：Plaid 接入 12,000+ 金融机构，仅读取不可写入（OpenAI/Bloomberg）
📅 05/15 | [产品]   xAI 推出 Grok Build CLI 早期 Beta：Grok 4.3 + 2M 上下文 + 8 子 agent，仅 SuperGrok Heavy $299/月（首 6 月 $99）（x.ai）
📅 05/15 | [机器人] Figure AI 三台 Helix-02 机器人连续约 50 小时自主分拣 ~5 万件包裹，无 teleoperation；稳态接近人类 3 秒/件（Bloomberg）
📅 05/15 | [政策]   Anthropic 应众议院国土安全委员会闭门简报 Mythos 模型；NSA 已使用，CISA 据报尚未启用（The Hill）
📅 05/15 | [政府]   GOV.UK Chat 全量上线，Anthropic Claude 接管 gov.uk 80,000 页公民问答（GDS Blog）
📅 05/15 | [外交]   Trump-Xi 峰会闭幕：H200 至闭幕日零交付；AI 安全协议未落书面（CNBC/Time）
📅 05/15 | [市场]   NVDA -4%，单日蒸发 ~$1,700 亿；Trump 转述 Xi 原话「I want to make my own chips」浇灭 5/14 涨幅（Tom's Hardware）
📅 05/15 | [安全]   OpenAI 4 款 macOS app（ChatGPT Desktop/Codex App/Codex CLI/Atlas）需 6/12 前更新；TanStack npm 供应链攻击导致签名证书全部轮换（OpenAI Security Blog）
📅 05/16 | [市场]   10Y 美债破 4.55%、30Y 破 5.12%（2007/6 以来最高），AI 估值压力检验点定 5/20 NVDA 财报（Bloomberg）
📅 05/17 | [庭审]   Musk v. Altman 9 人陪审团 5/18 周一 Oakland 启动合议，若 OpenAI 败诉面临 $1,500 亿 disgorgement（咨询性裁决）
```

---

## 【模块六】中文社区热点

**话题 1：Anthropic 估值 $9,000 亿、首次超 OpenAI 企业付费份额**
- **为什么热**：Bloomberg 5/12 披露 Anthropic 接触 $300 亿融资 / 估值 $9,000 亿（不含本轮）；Ramp 5/13 给出 Anthropic 企业付费 34.4% vs OpenAI 32.3%。短短 18 个月内 Anthropic 从 ~8% 翻至 34.4%，与中国厂商 4 月的「调用量超美国」形成对照议题。
- **主要观点分歧**：
  - 正方：Claude Code 与企业级 agent 是真护城河；ChatGPT 已被 commoditize 为「to C 的助手」，企业市场以工程能力决胜。
  - 反方：估值反映的是 IPO 预期定价（Anthropic 在评估 2026/10 IPO 窗口），并非纯业务面；Microsoft 渠道 + 5/11 Deployment Company + ChatGPT Business 是 OpenAI 反扑路径。
- **代表性内容**：[Bloomberg](https://www.bloomberg.com/news/articles/2026-05-12/anthropic-in-talks-to-raise-30-billion-at-900-billion-valuation) · [TechCrunch](https://techcrunch.com/2026/05/13/anthropic-now-has-more-business-customers-than-openai-according-to-ramp-data/) · [VentureBeat: 3 threats](https://venturebeat.com/technology/anthropic-finally-beat-openai-in-business-ai-adoption-but-3-big-threats-could-erase-its-lead)

**话题 2：H200 解禁名单 vs 内部冻结 vs 国产 ASIC**
- **为什么热**：5/14 美国商务部批准 H200 卖给约 10 家中国企业（单家 75,000 颗上限），5/15 Trump 自己复述 Xi 的「I want to make my own chips」浇灭整轮涨幅。中国 AI 圈讨论：H200 解禁究竟是台前的 narrative，还是国产芯片产能真已能撑住 Hy3 / V4 / Qwen3.6 训练栈？
- **主要观点分歧**：
  - 正方：Tencent 电话会披露「2026 下半年随国产 ASIC 上量加速」，H200 解禁只是 narrative 工具；从 Alibaba 三年 CapEx「显著超出 RMB 3,800 亿」看，国产化是真在 ramp。
  - 反方：训练栈对内存带宽极敏感，国产 ASIC 当前无法替代 H200 的 HBM3e 配置；H200 「内部冻结」是议价策略，等贸易框架更明朗。
- **代表性内容**：[CNBC: H200 cleared](https://www.cnbc.com/2026/05/14/us-clears-h200-chip-sales-to-10-china-firms-as-nvidia-ceo-looks-for-breakthrough.html) · [Tom's Hardware](https://www.tomshardware.com/tech-industry/trump-says-china-is-blocking-h200-purchases) · [SCMP](https://www.scmp.com/tech/big-tech/article/3353573/alibaba-tencent-signal-ai-spending-surge-despite-earnings-pressure-china-chips-ramp)

**话题 3：Figure AI 50 小时自主分拣 — 物理 AI 拐点真假？**
- **为什么热**：5/15 三台 Figure 03 + Helix-02 在仓库分拣站点 50 小时连续无故障作业、约 5 万件包裹；Bloomberg 主稿明确零 teleoperation。物理 AI 圈讨论：这是 7×24 真自主拐点，还是「直播 demo 工程」？
- **主要观点分歧**：
  - 正方：稳态单件接近人类 3 秒——这是 vision-language-action 模型首次在公开数据上接近人类速率；与 Boston Dynamics × Hyundai Atlas、Agility Digit 在 Toyota Canada 形成同向。
  - 反方：Bloomberg 与 TechRadar 都指出长时间直播可能掩盖换班；50 小时与 7×24×52 还差两个数量级；缺乏第三方审计 + 故障数据。
- **代表性内容**：[Bloomberg](https://www.bloomberg.com/news/articles/2026-05-15/robotics-ceo-vows-no-intervention-in-humanoids-viral-trial-run) · [Interesting Engineering](https://interestingengineering.com/ai-robotics/figure-ai-humanoids-24-hour-autonomous-run) · [TechRepublic](https://www.techrepublic.com/article/news-figure-robot-demo-tests-24-7-humanoid-fleet-work/)

**话题 4：DeepSeek 生态本周双爆——antirez 用 C 写推理引擎 + DeepSeek-TUI 周涨 21K star**
- **为什么热**：Redis 之父 antirez 用纯 C 写 DeepSeek 4 Flash 推理引擎（5/6 新仓 8,056 star + HN 497 分），同时 DeepSeek-TUI 周涨 21K star——同一个模型在「用户体验层」与「推理引擎层」**同时**孵化破圈仓库。
- **主要观点分歧**：
  - 正方：DeepSeek 已不只是模型发布事件，而是开源工具生态的核心驱动者；系统编程在 Python 主导的 AI 时代仍有立足点（dirty frag HN 816 分也是同向证据）。
  - 反方：antirez 的 HN 热度可能更多来自 pre-wrapper 工程文化怀旧而非技术验证（Shareuhack 团队的提醒）；不要把社区敬意当成技术验证。
- **代表性内容**：[antirez/ds4](https://github.com/antirez/ds4) · [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI) · [Shareuhack 周报](https://www.shareuhack.com/en/posts/github-trending-weekly-2026-05-13)

**话题 5：Anthropic Mythos 闭门简报国土安全委员会——前沿模型与 nation-state 安全**
- **为什么热**：5/15 Anthropic Frontier Red Team 向众议院国土安全委员会闭门演示 Mythos 自主识别跨主流 OS 与浏览器多年期未披露漏洞；模型未公开发布。国内安全圈讨论：前沿模型成 cyber 武器化的 dual-use 问题，监管路径从哪里切入？
- **主要观点分歧**：
  - 正方：NSA 已用、CISA 未用的不对称是 critical infra 在前沿 AI 攻击下的暴露面证据；闭门简报是国会正式听证前的标准前置铺垫。
  - 反方：Mythos 的「数十年未披露漏洞」claim 缺第三方复现；闭门简报本身规避了公众审议，是「以安全为名的非透明 AI 治理」。
- **代表性内容**：[The Hill](https://thehill.com/policy/technology/5875253-house-briefing-anthropic-mythos/) · [CyberScoop](https://cyberscoop.com/house-homeland-security-briefing-anthropic-mythos-cyber-risks/)

---

## 【模块七】本周实用工具推荐

**Codex Mobile（[ChatGPT iOS / iPad / Android](https://chat.openai.com/)）**
- **解决什么问题**：在地铁 / 出差路上用手机审批 Codex 在 Mac 上跑的 agent 任务——查看 diff、批准命令、切换线程、回看测试输出。
- **如何快速上手**：① 升级 ChatGPT 移动 app；② 在 Mac 上保持 Codex 桌面端运行，手机端进入 Codex tab 即自动桥接。
- **适合**：开发者（macOS 主，Windows 即将支持）
- **费用**：免费（ChatGPT 任意档位含 Free 与 Go 均可用）

**Grok Build CLI（[x.ai/news/grok-build-cli](https://x.ai/news/grok-build-cli)）**
- **解决什么问题**：终端原生 agentic CLI，对标 Claude Code 与 Codex；优势是 **2M token 上下文 + 8 子 agent 并行**——大型 monorepo 整库分析。
- **如何快速上手**：① 订阅 SuperGrok Heavy（首 6 月 $99/月）；② `pip install grok-build` 或安装包；③ `grok build plan "重构这个模块"`。
- **适合**：开发者（重度，需要长上下文 / 多 agent 并行）
- **费用**：付费 — 标准 $299/月，首 6 月限时 $99/月

**ChatGPT 个人金融预览（[openai.com/index/personal-finance-chatgpt](https://openai.com/index/personal-finance-chatgpt/)）**
- **解决什么问题**：把 ChatGPT 当个人 CFO——自然语言查询「上月外卖花多少」「年末加薪 5% 退休账户怎么变」；持仓 / 消费 / 订阅 / 待付款一站式仪表盘。
- **如何快速上手**：① ChatGPT 侧边栏 "Finances → Get started"，或对话框输入 `@Finances, connect my accounts`；② 通过 Plaid 链接银行 / 经纪商账户；③ 仅读取，不能转账。
- **适合**：非技术用户（美国 ChatGPT Pro 用户先用，仅美国账户）
- **费用**：付费 — 含 ChatGPT Pro $200/月

**Cursor 3.4 Cloud Agent Dev Environments（[cursor.com/changelog/05-13-26](https://cursor.com/changelog/05-13-26)）**
- **解决什么问题**：团队跑大量并行 cloud agent 时，每个 agent 重复克隆 repo、装依赖、配置凭证开销巨大；3.4 把 multi-repo 环境用 Dockerfile 描述，复用 build cache，命中缓存的重建快 **~70%**。
- **如何快速上手**：① 升级 Cursor 3.4；② 在 Cloud Agent 设置中创建 `agent-env.Dockerfile`；③ 配置 build secrets（仅构建期可见）。
- **适合**：开发者（已使用 Cursor Cloud Agent 的工程团队）
- **费用**：免费额度 + 付费 — Cursor Pro $20/月起，cloud agent 算时按 Pro/Business 套餐

**Claude for Small Business（[anthropic.com/news/claude-for-small-business](https://www.anthropic.com/news/claude-for-small-business)）**
- **解决什么问题**：小企业一周时间打通财务 / 销售 / 合同 / 营销四条链——15 个 agentic 工作流 + QuickBooks / PayPal / HubSpot / Canva / DocuSign 连接器。
- **如何快速上手**：① 在 Claude Cowork 中切到 Small Business 套件；② 用 OAuth 一次性授权全部连接器；③ 在 workflow 列表里点开"月结/催收/线索分流"等模板直接运行。
- **适合**：非技术用户（5-200 人规模、依赖 SaaS 栈的中小企业）
- **费用**：免费额度 + 付费 — 作为 Claude Cowork 插件提供，按 Cowork 订阅计价

---

## 【数据源与生成说明】

- **报告生成时间**：2026-05-18（UTC），周一
- **覆盖周期**：2026-05-12 — 2026-05-18（7 天）
- **论文 arXiv ID 覆盖范围**：`2604.XXXXX`（4 月）/ `2605.XXXXX`（5 月），所有收录论文已逐篇核查 arXiv abstract 页与提交日期
- **主要数据来源**：
  - 一手：arXiv（abstract / abstract page 提交日期）、Hugging Face Daily Papers、OpenAI Blog、Anthropic Newsroom、xAI、AWS What's New、SAP / NVIDIA / Tencent / Cursor 官方 changelog
  - 二手：Bloomberg、CNBC、Reuters、TechCrunch、VentureBeat、TechRadar、9to5Mac、Engadget、Axios、The Register、The Hacker News
  - 中文：量子位、机器之心、PaperWeekly、CSDN、知乎、SCMP、CnEVPost
  - 开源：GitHub Trending Weekly + Shareuhack Trending Weekly 2026-05-13
- **数据截止时间**：2026-05-18 01:00 UTC（北京时间 5/18 09:00）
- **已知缺口**：本周 Google I/O（5/19）、NVIDIA Q1 FY27 财报（5/20）、Marvell 财报（5/27）等下周关键事件未覆盖，归入下周报。

# AI 技术周报 · 2026-04-15

> 覆盖周期：2026-04-08 至 2026-04-15｜面向：算法研究员
> arXiv 论文时间约束：ID 前缀必须为 `2604.XXXXX`（本月）或 `2603.XXXXX`（上月）

---

## 【模块一】本周导读

- 🔴 **最重要的变化**：Anthropic 在 4/7 宣布 Claude Mythos Preview **不对外开放**，仅通过 "Project Glasswing" 治理框架向约 50 家机构受限发放——原因是它自主发现了 27 年前的 OpenBSD 漏洞并自动化利用了 17 年前的 FreeBSD NFS RCE（CVE-2026-4747），财政部长 Bessent 与美联储主席 Powell 为此紧急召集金融机构。这是前沿模型首次因"双重用途能力过强"被全面限制发布，改写了 frontier model 治理的游戏规则。
- 🟡 **值得关注但尚未明朗**：中国模型集体冲线的窗口期——DeepSeek V4（1T 参数 MoE + Huawei Ascend 深度适配，4 月下旬）、Qwen 3.6 Plus（Terminal-Bench 2.0 超过 Claude 4.5 Opus）、Tencent HY-Embodied-0.5（32B 版本对标 Gemini 3.0 Pro）连续发布，叠加 OpenAI/Anthropic/Google 联合公告指控 DeepSeek、Moonshot、MiniMax 通过约 2.4 万个假账户进行 1600 万次"蒸馏式"调用。蒸馏依赖论 vs. 自主创新论的争议本周达到顶点。
- 🟢 **对研究者最有实际价值的**：两篇"工程向"论文值得细读——`[2604.06798] MoBiE` 给出 MoE 二值化 PTQ 方案，Qwen3-30B-A3B 上 PPL 降低 52.2% / 2× 加速；`[2604.07430] HY-Embodied-0.5` 提出 MoT-2B 边缘 + 32B 规模双轨架构，并开源在 `Tencent-Hunyuan/HY-Embodied`，是本周最值得复现的具身模型工作。

**下周预告（4/16–4/22）**
1. DeepSeek V4 预期于 4 月下旬发布（Alibaba / 字节 / 腾讯已下预订单）
2. Tencent Hunyuan 新一代 ~30B 模型预期本月底，关注 CL-bench 基准结果
3. 关注 ICLR 2026 Spotlight 口头汇报后的热度分布（HF Papers 点赞走势）

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**Claude Mythos Preview（Anthropic，4/7 公告）**
- 核心亮点：在所有主流操作系统与浏览器中自主发现 high-severity 漏洞；autonomously 发现并利用 OpenBSD 27 年旧漏洞与 FreeBSD NFS RCE（CVE-2026-4747）。
- 与上一代对比：在安全研究与代码分析维度跨代；Anthropic 形容其具备"端到端漏洞链发现"能力。
- 访问方式：**不公开发布**。通过 Project Glasswing 治理框架仅向约 50 家受限机构提供，财政部/美联储参与 governance 对话。
- 适合：这是一次"反常规"发布——对绝大多数研究者意味着"无法使用但必须知情"，用来判断前沿能力上限正在形成新的 governance 边界。
- 来源：https://red.anthropic.com/2026/mythos-preview/

**GPT-5.4（OpenAI，3 月首发，4 月价格稳定并继续生产部署）**
- 核心亮点：1M token 上下文；多步自治工作流执行；OSWorld-V 75%、GDPval 83%，为目前已公开 computer-use 基准记录。
- 与上一代对比：能力 +40% 的同时 API 价格维持。
- 访问方式：ChatGPT Pro（$100/月，高额度）、ChatGPT Pro $200/月 tier（20× 用量）、API。
- 适合：需要 long-horizon 工作流的 agent 研发团队。

**Gemini 3.1 Pro / Flash-Lite（Google DeepMind，3 月发布，4 月数据陆续公开）**
- 核心亮点：原生多模态；Ultra 版 2M context；ARC-AGI-2 77.1%、GPQA Diamond 94.3%。
- 定价：Flash-Lite 输入 $0.25/M tokens，目前输出价格最低（$2/M output）档位之一。
- 适合：对推理与成本同时敏感的高频 API 用户。

**Grok 4.20 Beta 2（xAI，当前生产版本）**
- 核心亮点：多 agent 架构，在 medicine 与 legal 基准上占优。Grok 5（6T 参数 MoE，Colossus 2 1GW 集群训练）Q2 2026 beta。
- 访问方式：X Premium+。
- 适合：需要"观点多样性"的 benchmark 对照组。

**Mistral Small 4（Mistral，3/3 发布，社区生态本月持续放量）**
- 核心亮点：dense compute 优化；三个月社区 fork/PR 合并数翻倍。
- 适合：希望以较小 dense 模型替代 MoE 的本地部署场景。

### ② 国内大模型（含开源与闭源）

**Qwen 3.6 Plus（阿里通义千问，3/31 预览，4/2 OpenRouter 全量）**
- 是否开源：否（商业 API），但配套 Qwen 系列开源分支继续演进。
- 核心亮点：
  - Terminal-Bench 2.0：**61.6**（vs Claude 4.5 Opus 59.3）
  - OmniDocBench v1.5：**91.2**（领先）
  - RealWorldQA：85.4；QwenWebBench Elo 1502
  - MCPMark：**48.2%**（Claude 对应分数 42.3%）
  - 推理速度 ~158 tokens/s，分别为 Claude Opus 4.6 的 1.7×、GPT-5.4 的 2×
- 与国际对比：在 tool-use / MCP / terminal 三类"Agent 原生"基准上首次全面超过 Claude 4.5 Opus。
- 获取：OpenRouter、阿里云百炼、Qwen Chat。
- 来源：https://www.buildfastwithai.com/blogs/qwen-3-6-plus-preview-review

**Kimi K2.6（Moonshot AI / 月之暗面，4/13 发布）**
- 是否开源：闭源 API + Kimi Code IDE。
- 核心亮点：基于 ~15T 混合视觉-文本 tokens 训练；推理深度与 agent 规划能力相对 K2.5 进一步增强；中英双语长上下文场景占优。
- 与国际对比：在中英双语 coding agent 场景对标 Claude Code，国内生态集成更顺。
- 获取：kimi.moonshot.cn、Kimi Code IDE、Cursor 内集成。
- 来源：https://www.buildfastwithai.com/blogs/kimi-code-k26-preview-2026

**DeepSeek V4（DeepSeek，预期 4 月下旬）**
- 是否开源：历史延续开源发布节奏，本次预期同步开源。
- 核心亮点：
  - 总参 ~1T、激活 ~32–37B 的 MoE
  - 1M 上下文；Engram memory、DeepSeek Sparse Attention、mHC 架构
  - 与 Huawei Ascend 深度适配，主流 Western 供应链被隔离
- 对比：以 V3.2 作为对照，V3.2 当前已能做到 ~90% GPT-5.4 质量 @ 约 1/50 价格（$0.27/M input tokens），V4 预期继续放大该剪刀差。
- 获取：预计同步上线 API 与开源权重。
- 来源：https://cntechpost.com/2026/04/10/chinese-ai-star-deepseek-targets-late-apr-v4-model-release/

**HY-Embodied-0.5（Tencent Hunyuan，4/9 论文 + 开源）**
- 是否开源：是，Apache 2.0，`github.com/Tencent-Hunyuan/HY-Embodied`。
- 核心亮点：双轨架构——MoT-2B（2B 激活，端侧）与 32B 版本（云端）；层次化时空感知。
- 对比国际：2B 版本在 16 个具身基准上胜过同量级 SOTA；32B 版本接近 Gemini 3.0 Pro。
- 获取：HuggingFace / GitHub。
- 详见【模块三-具身】。

**Doubao 2.0（字节豆包，4 月上旬推送）**
- 是否开源：否。
- 核心亮点：面向 "Agent 时代" 的整体能力升级；当前 WAU 1.552 亿。
- 对比：强在与抖音/飞书生态集成和高频迭代，纯模型质量仍次于 Qwen 3.6 Plus。
- 获取：豆包 App、火山方舟 API。
- 来源：https://www.tradingview.com/news/reuters.com,2026:newsml_L1N3ZA019:0-china-s-bytedance-releases-doubao-2-0-ai-model-for-agent-era/

**文心 4.5 Turbo / X1 Turbo（百度，4 月初发布）**
- 是否开源：否。
- 核心亮点：X1 Turbo 推理专用，价格仅 DeepSeek R1 的 25%；4.5 Turbo 多模态，较 DeepSeek V3 低 ~40%。
- 获取：文心一言、千帆大模型平台。
- 适合：对成本敏感的 2B 场景。

**Tencent Hunyuan 新一代 ~30B（预期 4 月下旬）**
- 方向：长上下文 + agent 可用性；CL-bench 为其自有上下文学习评测。
- 尚未发布，本周密集铺垫。

### ③ 其他重要开源模型

**Llama 4 Scout / Llama 4 Maverick（Meta，4/5 发布，本周持续热度）**
- Scout：17B 激活 / 16 experts MoE；10M context；原生多模态训练；最低显存 ~24GB（INT4）可跑。
- Maverick：MoE 架构，10M context，聚焦高阶推理。
- 获取：HuggingFace `meta-llama/*`、Ollama。
- 适合场景：长文档审阅、本地多模态 agent。

**Muse Spark（Meta，4/10 发布，**首个自研闭源模型**）**
- 战略信号：Meta 从"开源优先"转向开源+闭源双轨；Muse Spark 本身未开权重。

**Gemma 4（Google，4/2 发布）**
- 四个版本 2.3B / 8B / 15B / 31B；Apache 2.0；原生多模态。
- 基准：31B Dense 在 Arena AI 开源区 Top 3；Codeforces ELO 从 Gemma 3 的 110 跃升至 **2150**——编码能力的阶跃式提升。
- 最低显存：2.3B 可跑在 6GB 笔记本；31B 建议 40GB+（INT8）。
- 适合：本地 agent、教育场景。

**Arcee Trinity 400B（Arcee AI，4 月发布）**
- Apache 2.0；企业垂直 use case。
- 最低显存：需多卡 A100/H100 组集群（~4–8× 80GB）。

---

## 【模块三】热门论文精选

> 时间验证：以下论文 arXiv ID 均为 `2604.` 或 `2603.` 前缀；前 4 位非 2603/2604 者已一律剔除。

### 🧠 大语言模型（LLM）/ 推理能力

**Verify Before You Commit: Towards Faithful Reasoning in LLM Agents via Self-Auditing**
📄 https://arxiv.org/abs/2604.08401 | 💻 暂未开源 | 🤗 HF ⭐ 待查 | 机构：多机构联合

**问题**
LLM agent 在多步决策链中普遍存在 "signed-off 幻觉"——模型对未经验证的内部信念（internal belief state）提交外部动作；现有 reflection / critique 方法是 post-hoc 的，在动作已经提交后才纠偏，对破坏性 tool call（删除、下单、转账）保护不足。

**方法**
SAVeR（Self-Auditing VeRification）框架：
- 将 agent 每一步动作前的 internal belief 抽取为可审计的 intermediate 表示
- 在 action commit 之前，由 agent 自身以"审计员"身份对 belief 进行一致性/可检验性检查，不通过则回到 planning
- 与 reflection（动作后反思）和 external verifier（外部 critic 模型）的本质区别在于：审计在模型自身的 belief space 上内生发生，且发生在 commit 前

**效果**
论文给出的主要数字：在 agent-harm 场景下，破坏性动作率下降可量化（论文 Table 报告具体百分比）；在 ALFWorld、AgentBench 等 benchmark 上 faithful reasoning ratio 提升，trade-off 是单步延迟的线性增加。

---

**Adaptive Multi-Expert Reasoning via Difficulty-Aware Routing and Uncertainty-Guided Aggregation**
📄 https://arxiv.org/abs/2604.10335 | 💻 暂未开源 | 机构：多机构

**问题**
"一把尺子量到底"的 CoT prompting 对简单题浪费算力、对困难题又不够深。现有 MoE routing 是在 token 级别，但 reasoning 粒度的 routing（不同难度走不同专家 + 不同解码策略）仍缺少统一建模。

**方法**
- Difficulty-aware router：对 prompt 先做 difficulty embedding，映射到一组 specialized experts（算术 / 符号 / 常识 / 代码）
- Uncertainty-guided aggregation：在多专家给出解后，用各专家的预测熵作为聚合权重，而非简单 majority vote
- 区别于 self-consistency：self-consistency 是同一模型的多次采样，本工作是多个特化 expert 的异构聚合

**效果**
在 MATH、GSM8K、BBH 的 hard split 上相比 self-consistency 与 MoE baseline 有稳定增益（论文 Table 1/2）；消融显示 uncertainty-guided aggregation 是相对 majority voting 的主要增量来源。

---

**PRIME: Training-Free Proactive Reasoning via Iterative Memory Evolution for User-Centric Agent**
📄 https://arxiv.org/abs/2604.07645 | 💻 暂未开源 | 机构：多机构

**问题**
"持续学习 agent"的主流方案是持续 fine-tune，但对用户侧部署的个人 agent 来说，参数级更新成本高、隐私敏感、且容易 catastrophic forgetting。

**方法**
PRIME 把 agent 改进视作"记忆空间演化"而非"参数空间优化"：
- 维护分层 memory（episodic / semantic / procedural）
- 每次交互后仅对 memory 做 iterative evolution：merge、prune、re-embed
- 完全训练无关（training-free），参数始终冻结

**效果**
在长期个人 agent benchmark 上，PRIME 与 fine-tune 基线在 10 轮以上长交互后接近持平；而相比无更新的 RAG 基线则有稳定优势——显示对"个性化 agent"这一最大落地场景，记忆演化可能比微调更实用。

---

**EigentSearch-Q+: Enhancing Deep Research Agents with Structured Reasoning Tools**
📄 https://arxiv.org/abs/2604.07927 | 💻 暂未开源 | 机构：多机构

**问题**
现有 "deep research" agent（Perplexity、ChatGPT Deep Research 等）在复杂问题上缺少显式 query planning 与 evidence extraction，容易出现"搜到就堆上去"的 shallow 答案。

**方法**
Q+ 工具包：
- Query planning tool：将原始问题分解为多层子问题，显式构造 evidence tree
- Search-progress monitor：在 iteration 间追踪 coverage、novelty、redundancy
- Evidence extractor：从 long-context snapshot 中抽取可溯源片段
与 ReAct 或 baseline Deep Research 的区别：Q+ 是显式 structured reasoning 工具，而不是隐式 CoT。

**效果**
在自有 DeepResearch-Eval 基准上，覆盖率与 groundedness 较开源基线有明显提升；更关键的是 token 效率——相同预算下的回答深度更高。

---

**Process Reward Agents for Steering Knowledge-Intensive Reasoning**
📄 https://arxiv.org/abs/2604.09482 | 💻 暂未开源 | 机构：多机构

**问题**
知识密集型推理（生物医药、法律、代码）的 PRM（Process Reward Model）通常需要 rollout 级标注，成本高；且 PRM 一旦训好就固定不随领域变化。

**方法**
Process Reward Agents（PRA）：
- test-time 方法：冻结主 policy，由独立 agent 在推理每一步打分
- domain-grounded：PRA 可即时调用外部领域知识源（数据库、搜索、计算器）
- 与 GRPO/PPO 的区别：不改 policy，仅在推理期提供 step-wise steering

**效果**
在 medical QA、code reasoning 上相对于 zero-shot 与 RAG baseline 有稳定增量；主要价值在于"无需重训即可跨领域 transfer"，对企业落地场景友好。

---

### 👁️ 多模态

**OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation**
📄 https://arxiv.org/abs/2604.11804 | 💻 随 arXiv 发布 | 机构：多机构

**问题**
HOI（Human-Object Interaction）视频生成此前需要按条件类型（text / image-ref / audio / pose）各训一个模型，条件耦合不理想、不一致。

**方法**
- 端到端框架，单模型统一接收 text / reference image / audio / pose 四类条件
- 提出 HOIVG-Bench 评估 HOI 生成的一致性、物理性与条件符合度
- 区别于 ControlNet/IP-Adapter 系的独立插件路线：OmniShow 以共享 condition encoder + 自适应权重路由进行联合训练

**效果**
HOIVG-Bench 上在条件一致性、物理合理性两项上超过当前开源 baseline；工业级视频 demo 说明已具可用质量。

---

**Small Vision-Language Models are Smart Compressors for Long Video Understanding**
📄 https://arxiv.org/abs/2604.08120 | 💻 暂未开源 | 机构：多机构

**问题**
长视频理解在 frame-level tokenization 下 token 预算爆炸；均匀下采样会损失 query 相关关键帧。

**方法**
Tempo 框架：
- 用 SVLM（Small VLM）在 query-aware 模式下对视频进行时域压缩，只保留与 query 相关的帧/片段
- 压缩结果再喂给大 VLM 做深度理解
- 与 fixed keyframe sampling / uniform subsampling 的本质区别：压缩器本身是语义感知的小模型，而非启发式

**效果**
在 long-video benchmark（如 LVBench、Video-MME 长集）上以 10%–20% 的 tokens 达到接近全量输入的准确度，延迟下降显著。

---

**Visually-Guided Policy Optimization for Multimodal Reasoning**
📄 https://arxiv.org/abs/2604.09349 | 💻 暂未开源 | 机构：多机构

**问题**
RL 后训（GRPO/PPO）的多模态 reasoning 模型存在 "视觉注意漂移"——token 生成越往后，视觉条件影响越弱。

**方法**
VGPO：在 policy 优化中加入 Visual Attention Compensation（VAC），利用视觉 similarity 定位关键区域并放大其对 token 分布的影响；VAC 作为 auxiliary reward 与 task reward 联合优化。与 GRPO 的区别：加入显式的 modality-grounding reward term。

**效果**
在 MMMU、MathVista 等视觉 reasoning 基准上超过 GRPO baseline；消融验证 VAC 是主要贡献者。

---

### 🤖 AI Agent / 工具使用

**SEARL: Joint Optimization of Policy and Tool Graph Memory for Self-Evolving Agents**
📄 https://arxiv.org/abs/2604.07791 | 💻 暂未开源 | 机构：多机构

**问题**
工具增强 agent 的 policy 与 tool memory 通常解耦训练：policy 学什么时候调哪个工具，tool memory 只是知识库；当工具集动态扩展时，policy 的 routing 会失效。

**方法**
SEARL：
- 将工具组织为图（tool graph），节点是工具，边是调用依赖
- policy 与 tool graph memory 联合优化：policy 更新不仅调整动作分布，还更新 graph 上的 embedding
- 相对 ReAct / Toolformer：SEARL 显式建模工具间 composability，对组合调用场景更稳

**效果**
在 ToolBench、AgentBench 组合调用子集上超过 ReAct-based 基线；关键贡献是在工具集扩展 2× 后 policy 不退化。

---

**Mind the Gap Between Spatial Reasoning and Acting! Step-by-Step Evaluation of Agents With Spatial-Gym**
📄 https://arxiv.org/abs/2604.09338 | 💻 Spatial-Gym 已开源 | 机构：多机构

**问题**
现有具身基准混淆"理解空间"与"执行动作"。论文表明：同一 agent 在 spatial reasoning 子任务满分的情况下，落到执行仍有大幅掉分——说明 reasoning→acting 的 gap 是一个独立失败模式。

**方法**
Spatial-Gym：将每个任务显式拆分为 Reason / Plan / Act 三阶段，逐阶段打分；提供 step-by-step 评测 protocol。

**效果**
报告当前主流多模态 agent（Gemini、Claude、Qwen-VL）在 reasoning 得分 >80% 时，acting 得分仅 40–55%；提示后续研究需要把重点放到 grounding 环节。

---

### 🦾 具身智能 / 机器人

**HY-Embodied-0.5: Embodied Foundation Models for Real-World Agents**
📄 https://arxiv.org/abs/2604.07430 | 💻 https://github.com/Tencent-Hunyuan/HY-Embodied | 🤗 HF 待查 | 机构：Tencent Hunyuan

**问题**
具身 foundation model 面临两极化矛盾：边缘部署需要小体积（2B 以内），但通用空间推理能力又要求足够大规模；单一规模难以两头兼顾。

**方法**
双轨架构：
- **MoT-2B**：Mixture-of-Transformers，2B 激活参数；面向边缘/机载推理
- **32B 变体**：面向云端复杂推理
- 共享 hierarchical spatial-temporal perception 骨架：空间金字塔 + 时间多尺度，显式建模物体-环境-动作三元关系
- 与 RT-2 / OpenVLA 的区别：不是 "VLM + action head"，而是 specialized tokenizer 从预训练就联合建模感知+动作

**效果**
- MoT-2B：在 16 个具身基准上超过同规模 SOTA（Table 2）
- 32B：与 Gemini 3.0 Pro 可比，在 SimplerEnv、CALVIN、LIBERO 等基准上处于第一梯队
- 已开源，本周 HuggingFace 榜热度高

---

**RoboPlayground: Democratizing Robotic Evaluation through Structured Physical Domains**
📄 https://arxiv.org/abs/2604.05226 | 💻 随 arXiv 发布 | 机构：多机构

**问题**
机器人 manipulation 评估碎片化——每个 lab 自己的 simulator、自己的 task，结果不可比。

**方法**
结构化物理域：每个"域"定义一组可组合的 object / 物理属性 / 可行动作原语；用自然语言即可 author 出可执行 task；跨域共享接口。

**效果**
作为基础设施类工作，主要价值在于让 policy 对比具备横向可比性；已放出多个预设域和脚本。

---

### 🛡️ AI 安全 / 对齐 / 可解释性

**Precise Shield: Explaining and Aligning VLLM Safety via Neuron-Level Guidance**
📄 https://arxiv.org/abs/2604.08881 | 机构：多机构

**问题**
VLLM 安全对齐的现状多为 SFT + RLHF 级别干预，"safety neuron"是否存在及其定位缺少工程级证据。

**方法**
- 在 VLLM 中定位与有害视觉-文本拒答相关的 neuron 子集
- 在对齐阶段对该 neuron 组提供定向 steering（neuron-level alignment），而非全模型微调
- 与 circuit breakers 的区别：干预更细粒度、可逆、可审计

**效果**
在 harmful multimodal benchmark 上保持高拒答率的同时，over-refusal 下降；副作用更小。

---

**ProMedical: Hierarchical Fine-Grained Criteria Modeling for Medical LLM Alignment via Explicit Injection**
📄 https://arxiv.org/abs/2604.08326 | 机构：多机构

**问题**
医疗 LLM 对齐的"安全合规"维度过于粗粒度，导致模型在临床场景中对边界条件不敏感。

**方法**
- 构建分层细粒度临床准则（hierarchical fine-grained criteria）
- 准则通过 explicit injection 进入训练数据与 reward model
- 用 ProMedical-RM 引导 GRPO

**效果**
Qwen3-8B：整体准确率 +22.3%，合规率 +21.7%；是临床对齐工程化的可复用 recipe。

---

**Your Agent, Their Asset: A Real-World Safety Analysis of OpenClaw**
📄 https://arxiv.org/abs/2604.04759 | 机构：多机构

**问题**
个人 AI agent（OpenClaw 为 2026 年初部署规模最大的个人 agent）拥有系统级读写权限，现有安全框架多为 "tool-level"，缺少持续化状态视角。

**方法**
CIK 分类法（Capability / Intent / Knowledge）——将 agent persistent state 拆成三维，每维都给出威胁列表与缓解原语；实证评测基于真实部署样本。

**效果**
为"个人 agent 级 supply chain 风险"给出第一个系统分类；预计将被后续 agent 安全工作作为 threat model 引用。

---

### ⚡ 高效推理 / 量化 / 压缩

**MoBiE: Efficient Inference of Mixture of Binary Experts under Post-Training Quantization**
📄 https://arxiv.org/abs/2604.06798 | 💻 随论文发布 | 机构：多机构

**问题**
MoE 模型 PTQ（post-training quantization）一直困难——experts 之间的激活分布差异大，低 bit 量化在专家级会塌陷；而 MoE 又恰好是当前 frontier 模型的主流架构。

**方法**
MoBiE 为首个面向 MoE 的二值化（1-bit weight）PTQ 框架：
- per-expert 校准：expert-aware scaling 与 offset，避免 router 受量化扰动
- 保留 router 与 embedding 的高精度，只二值化 expert 权重
- 与一般 GPTQ/AWQ 的区别：明确考虑专家路由的离散性

**效果**
在 Qwen3-30B-A3B 上：
- 困惑度（PPL）相较 baseline 1-bit 量化下降 **52.2%**
- zero-shot 平均性能提升 **43.4%**
- 推理 **2× 加速**
对消费级 GPU 跑 MoE 前沿模型是一次可复现的跳跃。

---

**RUQuant: Towards Refining Uniform Quantization for Large Language Models**
📄 https://arxiv.org/abs/2604.04013 | 机构：多机构

**问题**
Uniform quantization 足够便宜但精度损失不小；非均匀方法精度好却部署复杂。

**方法**
refine uniform：在 uniform 的基础上加入 learned residual；优化时间压到 ~1 分钟级。

**效果**
- W6A6：99.8% full-precision 准确度
- W4A4：97%
- 优化耗时约 1 分钟——部署侧友好度拉满

---

**Weight Group-wise Post-Training Quantization for Medical Foundation Model**
📄 https://arxiv.org/abs/2604.07674 | 机构：多机构

**问题**
医疗 FM 往往在边端（超声、床旁设备）部署；既需要零 backprop 的 PTQ，又需要对医疗数据稀有 pattern 稳定。

**方法**
Permutation-COMQ：对 weight 做 group-wise permutation + COMQ 校准，全程无需 backprop。

**效果**
医疗 FM 上在高压缩率下保持诊断性能；是 "医疗 + PTQ" 小切口但直接可部署的工作。

---

### 🔬 AI for Science

**A Multimodal Foundation Model of Spatial Transcriptomics and Histology for Biological Discovery and Clinical Prediction**
📄 https://arxiv.org/abs/2604.03630 | 机构：多机构

**问题**
空间转录组与组织学本就是配对模态，但此前 FM 只覆盖其一，跨模态发现受限。

**方法**
在 **120 万** 配对空间分辨转录组样本 + 配套 histology 上联合训练，覆盖 18 个器官；空间 + 形态学 + 临床终点一体化 embedding。

**效果**
论文给出若干下游任务（分型、预后）上的 benchmark；是生物医药基础模型中空间分辨率最高的一类工作之一。

---

**OceanMAE: A Foundation Model for Ocean Remote Sensing**
📄 https://arxiv.org/abs/2604.08171 | 机构：多机构

**问题**
海洋遥感时序 + 多光谱 + 多传感器异构，通用 Earth-observation FM 水体表征不足。

**方法**
基于 masked autoencoder 的海洋专用 FM；在海洋任务上对多光谱、时间、地理位置做联合 mask。

**效果**
海洋下游任务（叶绿素、海表温度、赤潮）指标超过通用遥感 FM 的直接迁移。

---

## 【模块四】开源项目周榜

基于 GitHub Trending（weekly）与 AI 专业聚合源，按本周 star 增量排序：

**[OpenScreen](https://github.com/OpenScreen/OpenScreen) ⭐ 25.7k（本周 +15,921）**
- 桌面屏幕录制与编辑；Electron，MIT；窗口/全屏录制、缩放、自定义背景、运动模糊
- 上手难度：⭐☆☆ 简单（下载客户端即可）
- 适用场景：技术演示、录屏教学、Demo 制作

**[MemPalace](https://github.com/MemPalace/MemPalace) ⭐ 23.9k（本周新项目）**
- "记忆宫殿"结构：wings/halls/rooms 层次化结构化检索；用于替代扁平 vector search 的对话记忆
- 上手难度：⭐⭐☆ 中等（Python；需接入 LLM）
- 适用场景：长程对话 agent、个性化助手

**[google/adk-python](https://github.com/google/adk-python) ⭐ 8.2k（本周高增）**
- Google 官方 Agent Development Kit（多 agent 系统）
- 上手难度：⭐⭐☆ 中等
- 适用场景：企业级多 agent pipeline

**[meta-llama/llama-stack](https://github.com/meta-llama/llama-stack) ⭐ 6.4k（本周高增）**
- Llama 4 官方统一部署栈；多模型服务 / 监控 / 推理优化
- 上手难度：⭐⭐☆ 中等
- 适用场景：企业部署 Llama 4 Scout/Maverick

**[openai/codex-cli](https://github.com/openai/codex-cli) ⭐ 5.8k（本周高增）**
- 终端原生 AI coding agent；sandboxed 执行
- 上手难度：⭐☆☆ 简单（`npm install -g` 即可）
- 适用场景：DevOps、infra 工程师、terminal-first 工作流

**[block/goose](https://github.com/block/goose) ⭐ 4.9k（本周高增）**
- Local-first agent 框架；MCP 兼容；面向离线 agent
- 上手难度：⭐⭐☆ 中等
- 适用场景：需要本地能力的 personal agent

**[huggingface/smolagents](https://github.com/huggingface/smolagents) ⭐ 4.1k（本周高增）**
- 轻量级 agent 框架；无大依赖，CPU 即可跑
- 上手难度：⭐☆☆ 简单（`pip install smolagents`）
- 适用场景：原型、资源受限团队

**[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐ 连续两周 Top 5**
- v0.7.0 自进化：自动生成 Markdown skill 文件；1 万 skill 下检索延迟 ~10ms
- 上手难度：⭐⭐⭐ 较难（自演化 loop 配置复杂）
- 适用场景：autonomous agent 研究

---

## 【模块五】行业动态简报

📅 04/06 | [产业协作] OpenAI、Anthropic、Google 通过 Frontier Model Forum 联合应对针对中国厂商的"蒸馏盗取"；Anthropic 记录到 DeepSeek、Moonshot、MiniMax 通过约 2.4 万假账户产生约 1600 万次未授权调用（Bloomberg）。
📅 04/07 | [监管/治理] Anthropic 宣布 Claude Mythos Preview **不公开发布**，通过 Project Glasswing 仅授权约 50 家机构，起因是其自主发现 OpenBSD 27 年前漏洞并自动化利用 FreeBSD NFS RCE（CVE-2026-4747）（red.anthropic.com、NPR）。
📅 04/08 | [融资] Trent AI 完成 **$13M** 种子轮，聚焦 AI agent 安全，投资人含 LocalGlobe、Cambridge Innovation Capital 及 OpenAI 的 Joaquin Quiñonero Candela（fintech.global）。
📅 04/08 | [政策] Genesis Mission 启动 AI-for-Science 资助：阶段一 9 个月 $500K–$750K，阶段二 3 年 $6M–$15M（hpcwire.com）。
📅 04/08 | [融资] Patlytics 完成 **$40M** B 轮，面向 IP/专利生命周期 AI 平台（businesswire.com）。
📅 04/09 | [安全] Anthropic 公布 Mythos Preview 在每个主流操作系统与浏览器均发现 high-severity 漏洞；触发财政部长 Bessent 与美联储主席 Powell 与金融机构的紧急闭门会（Help Net Security、NPR）。
📅 04/09 | [政策] OpenAI 发 13 页立场文件，提议机器人税、公共财富基金、四天工作制（多源）。
📅 04/10 | [基础设施] CoreWeave 与 Meta 扩展合作至 **$21B**（2032 年前），在 2025-09 的 $14.2B 基础上继续加码（多源）。
📅 04/10 | [产品/定价] OpenAI 推出 ChatGPT **$100/月 Pro** 档位（在 $20 Plus 与 $200 高 tier 之间）（多源）。
📅 04/13 | [模型] Moonshot Kimi K2.6 全量发布，Kimi Code 同步升级（buildfastwithai.com）。
📅 04 上旬 | [融资] OpenAI "最新一轮" $122B 承诺资本，估值 $852B，云/硅/数据中心多头绑定（openai.com/index/accelerating-the-next-phase-ai/）。
📅 04 中旬 | [监管] 华盛顿州通过 AI chatbot 披露法，要求 AI chatbot 主动声明非人身份、对 distress 信号路由至 crisis service；NY S-3008C 已生效，Maine 禁止 AI 治疗 chatbot 议案在州长案头（roborhythms.com）。

---

## 【模块六】中文社区热点

**话题：DeepSeek V4 月底发布 + Huawei Ascend 深度绑定**
- 为什么热：首个国产 1T 参数 MoE；芯片独立叙事 + 价格剪刀差进一步放大
- 主要观点分歧：
  - 正方：V3.2 已做到 GPT-5.4 90% 质量 @ 1/50 价格，V4 有望定义新性价比曲线
  - 反方：开源延迟、训练数据依赖度不明朗；Ascend 适配换来的是生态锁死
- 代表性内容：https://cntechpost.com/2026/04/10/chinese-ai-star-deepseek-targets-late-apr-v4-model-release/

**话题：Qwen 3.6 Plus 登顶 Terminal-Bench 2.0 / MCPMark**
- 为什么热：首次在 Agent 原生基准（Terminal-Bench、MCPMark）上国产模型超过 Claude 4.5 Opus
- 主要观点分歧：
  - 正方：阿里真正补齐 tool-use 短板，国产 agent 一线从此不再是"次优项"
  - 反方：Terminal-Bench 2.0 仍以英文为主，实际 China 场景 tool 栈有差异
- 代表性内容：https://www.qbitai.com/2026/04/395206.html、https://www.buildfastwithai.com/blogs/qwen-3-6-plus-preview-review

**话题：Tencent HY-Embodied-0.5 开源，"国产具身模型冲全球第一"**
- 为什么热：32B 版本与 Gemini 3.0 Pro 同级；同时开源 2B 边缘版本
- 主要观点分歧：
  - 正方：具身 FM 路线首次形成"边缘 + 云端"双轨可复现工程
  - 反方：基准仍以仿真为主，真实机器人成功率存疑
- 代表性内容：https://www.qbitai.com/2026/04/399417.html、https://github.com/Tencent-Hunyuan/HY-Embodied

**话题：Doubao 2.0 上线，字节"Agent 时代"话语权争夺**
- 为什么热：1.55 亿 WAU 的产品迭代对国内 agent 生态影响大
- 主要观点分歧：
  - 正方：字节生态集成（抖音/飞书/剪映）让 Agent 快速有落脚点
  - 反方：纯模型能力仍弱于 Qwen 3.6 Plus，agent 能力靠生态而非模型
- 代表性内容：https://www.tradingview.com/news/reuters.com,2026:newsml_L1N3ZA019:0-china-s-bytedance-releases-doubao-2-0-ai-model-for-agent-era/

**话题：OpenAI/Anthropic/Google 联合反制"中国蒸馏"**
- 为什么热：1600 万次调用 / 2.4 万假账户的具体数字第一次公开
- 主要观点分歧：
  - 正方：国产模型追赶速度确实受益于蒸馏类信号，应有 governance
  - 反方：不同路径创新（MoE、Sparse Attention）是原创贡献，不能一概归为"抄"
- 代表性内容：https://www.bloomberg.com/news/articles/2026-04-06/openai-anthropic-google-unite-to-combat-model-copying-in-china

---

## 【模块七】本周实用工具推荐

**Google ADK (Agent Development Kit)**（https://github.com/google/adk-python）
- 解决什么问题：企业级多 agent 系统的标准化骨架；省掉自建 orchestration 的大部分轮子
- 如何快速上手：① `pip install google-adk` ② 跑 quickstart 例程搭起第一个 agent
- 适合：企业开发者、研究团队
- 费用：开源免费（模型调用按下游 API 计）

**Kimi Code K2.6**（https://kimi.moonshot.cn / Cursor 内集成）
- 解决什么问题：中英双语 coding agent；长上下文 + 工具调用
- 如何快速上手：① 访问 kimi.moonshot.cn 或在 Cursor 里启用 Kimi K2.6 ② 登录 Moonshot 账号
- 适合：中文 / 双语团队开发者
- 费用：Freemium + 企业 API

**OpenAI Codex CLI**（https://github.com/openai/codex-cli）
- 解决什么问题：终端原生 AI coding agent，sandboxed 执行避免误改生产
- 如何快速上手：① `npm install -g openai-codex-cli` ② 配置 OPENAI_API_KEY，运行 `codex "..."`
- 适合：DevOps、SRE、terminal-first 开发者
- 费用：按 GPT-5.4 API 用量计

**HuggingFace smolagents**（https://github.com/huggingface/smolagents）
- 解决什么问题：最小依赖的 agent 框架，本地 CPU 即可跑
- 如何快速上手：① `pip install smolagents` ② Python 函数即工具，实例化 agent 后 `agent.run("...")`
- 适合：独立开发者、原型验证
- 费用：开源免费

**Llama Stack（Meta）**（https://github.com/meta-llama/llama-stack）
- 解决什么问题：Llama 4 Scout/Maverick 的标准化部署栈
- 如何快速上手：① `git clone` + `pip install -r requirements.txt` ② 选模型与推理后端，通过 Docker/K8s 模板上线
- 适合：企业 ML 平台团队
- 费用：开源免费

---

## 【数据源与生成说明】

- **报告生成时间**：2026-04-15（UTC+8）
- **arXiv ID 覆盖范围**：`2604.00001 – 2604.11804`（4 月至本周）+ 少量 `2603.XXXXX`（上月）
- **主要数据来源**：
  - Hugging Face Daily Papers、Papers With Code Trending、arXiv cs.CL/cs.AI/cs.LG/cs.CV/cs.RO
  - OpenAI Blog / Anthropic News (red.anthropic.com) / Google DeepMind Blog / Meta AI Blog
  - DeepSeek、Qwen、文心、Kimi、GLM、MiniMax、零一万物、豆包、混元官网或公告
  - GitHub Trending（本周）、HuggingFace Model Hub
  - 机器之心、量子位、新智元、PaperWeekly、AIbase、即刻、小红书、知乎 AI 话题
  - Bloomberg、NPR、Help Net Security、TechCrunch、VentureBeat、Reuters
- **数据截止时间**：2026-04-15
- **编辑声明**：所有 arXiv 论文在收录前核查 ID 前 4 位均为 `2604` 或 `2603`；基准数值来自论文原文或官方公告；涉及 "下周预期" 的发布均明确标注"预期"，避免过度承诺。


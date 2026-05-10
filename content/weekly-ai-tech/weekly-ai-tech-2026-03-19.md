# AI 技术周报 | 2026年3月13日–3月19日

---

## 【模块一】本周导读

- 🔴 **最重要的变化**：DeepSeek V4 多模态大模型即将落地，原生支持文本/图像/视频生成，参数规模达 1T（MoE，~32B 激活），配合华为/寒武纪硬件优化，标志着国产多模态大模型进入 Trillion 级参数时代；与此同时 Google 发布 Gemini 3.1 Flash-Lite，以 $0.25/M input tokens 的极致低价切入高频推理场景，"模型即服务"的价格战进入白热化阶段。
- 🟡 **值得关注但尚未明朗的趋势**：Yann LeCun 的 AMI Labs 以 $1.03B 种子轮杀入 World Model 赛道，押注 JEPA 架构而非 LLM 路线——这是学术界对 LLM 范式的最大规模对赌，但产品化仍需数年，短期内难以验证其技术路线的优劣。
- 🟢 **对开发者最有实际价值的内容**：Karpathy 开源 autoresearch（一夜运行百次实验的自动化研究框架）、Hindsight（Agent 记忆层，LongMemEval 91%）和 OpenViking（Agent 上下文数据库）构成了 AI Agent 基础设施的新三件套，配合 OpenClaw 突破 250K stars，Agent 开发生态正在快速成熟。

**下周预告：**
1. DeepSeek V4 正式发布在即（已多次延期，本周或下周大概率官宣）
2. Meta "Avocado" 模型推迟至 5 月——关注其是否会提前释放技术细节
3. ICLR 2026 论文录用结果公布，关注 Oral/Spotlight 论文方向分布

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**GPT-5.4 — OpenAI（2026年3月）**
- 核心能力亮点：原生 Computer Use 能力，可自主执行跨应用多步工作流；引入 Tool Search 机制处理大型工具生态；1M token 上下文窗口（实验性）
- 与上一代对比：在 OSWorld-V 基准上达到 75%，超越 GPT-5.3-Codex 的纯编码定位，覆盖推理+工具使用+Computer Use 全栈能力
- 定价/访问方式：ChatGPT Plus / API 访问，具体 token 定价尚未公开完整信息
- 适合用户：需要自动化桌面操作的专业用户、复杂工具链编排的开发者

**Gemini 3.1 Flash-Lite — Google（2026年3月3日）**
- 核心能力亮点：Google 最具成本效率的模型，支持 1M token 多模态输入、64K token 文本输出；匹配 Gemini 2.5 Flash 的质量水平
- 与上一代对比：相较 Gemini 2.0 Flash-Lite，TTFAT（首 token 时延）快 2.5 倍，输出速度提升 45%
- 定价：$0.25/M input tokens，$1.50/M output tokens——目前闭源模型中性价比最高
- 适合用户：高频 API 调用场景（分类、提取、摘要）、成本敏感型应用

**Claude Opus 4.6 / Sonnet 4.6 — Anthropic（2026年2月）**
- 核心能力亮点：1M token 上下文窗口（beta）、128K 输出 token、Memory 功能全量上线（跨对话记忆用户偏好）
- 与上一代对比：Opus 4.6 是首个支持 1M 上下文的 Opus 级模型，长程推理和编码能力均有提升
- 定价/访问方式：Claude Pro / API
- 适合用户：长文档分析、复杂代码项目、需要持续上下文的对话场景

### ② 国内大模型（含开源与闭源）

**DeepSeek V4（即将发布）— DeepSeek**
- 是否开源：预计开源（延续 V3 系列惯例）
- 核心能力亮点：约 1T 总参数（MoE，~32B 激活/token），原生多模态（文本+图像+视频+音频），1M token 上下文窗口，Engram Conditional Memory 机制
- 与国际同类对比：参数规模与架构设计直接对标 GPT-5 系列，多模态原生设计而非拼接方案
- 获取方式：尚未正式发布，官网已出现疑似"V4 Lite"的模型更新（扩展上下文能力），正式发布预计本周或下周
- 硬件适配：与华为和寒武纪合作优化，支持国产 AI 芯片

**Qwen3 系列更新 — 阿里通义**
- Qwen3-Max-Thinking（2026年1月26日）：强化深度推理和 Agent 能力，适用科研/企业决策/自动编程
- Qwen3.5-397B-A17B：MoE 架构，总参 397B / 激活 17B，原生支持 256K 上下文（可扩展至 ~1M）
- Qwen3-Omni / Qwen3-VL / Qwen3-TTS：覆盖全模态（视觉/语音/TTS），其中 Qwen3-TTS 支持多语言语音合成和声音克隆
- 是否开源：部分开源
- 获取方式：阿里云百炼平台 / HuggingFace

**DeepSeek-V3.2-Exp / V3.2-Exp-Thinking — DeepSeek**
- 通用模型和推理模型的实验版更新，V3.2-Speciale 结合数学证明能力
- 在 OpenRouter 调用量 Top 5 中，国产开源模型占据 4 席（MiniMax M2.5、Kimi K2.5、GLM-5、DeepSeek V3.2），贡献 84.4% 的 token 使用量

**Kimi K2.5-Thinking — 月之暗面**
- 推理模型更新，90% 缓存命中率显著降低 API 成本
- 获取方式：Kimi API

**MiniMax M2.5 + Hailuo 2.3 / Music 2 / Speech 2.6 — MiniMax**
- 推理模型 M2.5 + 视频生成 Hailuo 2.3 + 音乐 Music 2 + 语音 Speech 2.6 组合更新
- 获取方式：MiniMax API / 海螺 App

### ③ 其他重要开源模型

本周无重大国际开源模型新版本发布。值得持续关注的是 Meta "Avocado" 模型因内测性能不达预期已推迟至 5 月。

---

## 【模块三】热门论文精选

### 🧠 大语言模型（LLM）/ 推理能力

**∇-Reasoner: LLM Reasoning via Test-Time Gradient Descent in Latent Space**
📄 [arXiv:2603.04948](https://arxiv.org/abs/2603.04948) | 💻 暂未开源 | 机构：未详

**问题**
现有 LLM 推理方法（如 Chain-of-Thought、Tree-of-Thought）在 token 空间进行搜索，每一步都需要完整的自回归生成，计算开销随推理深度线性增长。更根本的是，离散 token 空间的搜索无法利用梯度信息进行高效优化，导致 test-time compute 的利用效率低下。

**方法**
- 提出在 latent space 而非 token space 进行 test-time 优化的框架：将推理过程建模为对 token logits 的可微优化问题
- 在解码循环中集成梯度下降步骤，通过迭代地在隐空间中精化 policy
- 核心区别于 Best-of-N 或 MCTS 等搜索方法：不是在离散空间采样多条路径，而是沿梯度方向连续优化单条推理轨迹
- 可视为将 training-time 的梯度下降思想迁移到 inference-time

**效果**
- 论文展示了在数学推理和逻辑推理任务上的改进，具体 benchmark 数字需查阅原文

---

**Supervised Fine-Tuning versus Reinforcement Learning: A Study of Post-Training Methods for LLMs**
📄 [arXiv:2603.13985](https://arxiv.org/abs/2603.13985) | 💻 暂未开源 | 机构：未详

**问题**
LLM 后训练（post-training）中 SFT 和 RL 的关系一直缺乏系统性对比——实践中通常先 SFT 再 RLHF，但两者各自的贡献边界、在不同任务上的最优组合策略尚不清晰。

**方法**
- 系统比较 SFT 和 RL 在不同任务类型、数据规模下的效果差异
- 分析 SFT 注入先验知识的作用 vs. RL 在特定能力维度上的提升机制
- 研究两者的顺序依赖性和互补性

**效果**
- 结论表明：对于特定任务或领域，更高准确率和更可靠的推理通常依赖于 SFT 或 RL 的后训练，两者并非简单的先后关系
- 为后训练策略选择提供了实证参考框架

---

**Tackling Length Inflation Without Trade-offs: Group Relative Reward Rescaling for RL (GR3)**
📄 [arXiv:2603.10535](https://arxiv.org/abs/2603.10535) | 💻 暂未开源 | 机构：未详

**问题**
GRPO（Group Relative Policy Optimization）等 RL 训练方法存在 length inflation 问题：模型倾向于生成冗长回复以获取更高奖励，现有长度正则化方法（如 length penalty）虽能压缩输出，但会同时损害下游任务性能，形成 performance-efficiency trade-off。

**方法**
- 提出 GR3（Group Relative Reward Rescaling），一种在 GRPO 框架内的长度正则化方案
- 核心思路：对 group 内的 reward 进行 rescaling，使得长度不再是获取相对优势的渠道
- 与标准 GRPO 相比，训练动态和下游性能保持一致，同时显著减少输出冗余
- 适用于 RLHF 和 RLVR（Reinforcement Learning from Verifiable Rewards）两种设定

**效果**
- 在 RLHF 和 RLVR setting 下均维持了与标准 GRPO 可比的下游性能，同时有效控制了输出长度膨胀

---

**EsoLang-Bench: Evaluating Genuine Reasoning in LLMs via Esoteric Programming Languages**
📄 [arXiv:2603.09678](https://arxiv.org/abs/2603.09678) | 💻 暂未开源 | 机构：未详

**问题**
现有 LLM benchmark（如 HumanEval、MBPP）中的编程题大量出现在训练数据中，导致 benchmark 污染；模型的高分表现可能反映的是记忆而非真正的推理能力。

**方法**
- 使用 Esoteric Programming Languages（如 Brainfuck、Befunge 等极小众编程语言）构建评测，这些语言几乎不可能出现在预训练语料中
- 将标准编程题等价转换为 esoteric language 版本，保持逻辑难度不变但消除记忆优势
- 评测五个前沿模型

**效果**
- 模型在标准 benchmark 上达到 85-95% 的任务，在等价的 esoteric 版本上仅得 0-11%
- 揭示了当前 LLM 编程能力中"记忆 vs 推理"的巨大鸿沟

---

**Ranking Reasoning LLMs under Test-Time Scaling**
📄 [arXiv:2603.10960](https://arxiv.org/abs/2603.10960) | 💻 暂未开源 | 机构：未详

**问题**
随着 test-time compute scaling 成为提升 LLM 推理能力的主流方向，如何在不同 compute budget 下公平地比较和排名推理模型成为新挑战——同一模型在不同 test-time compute 下表现差异巨大。

**方法**
- 提出在 test-time scaling 条件下对推理 LLM 进行排名的框架
- 系统分析不同 compute budget 分配策略对排名结果的影响

**效果**
- 具体排名结果和实验数字详见论文原文

---

### 👁️ 多模态（图像、视频、音频）

**Think While Watching: Online Streaming Segment-Level Memory for Multi-Turn Video Reasoning**
📄 [arXiv:2603.11896](https://arxiv.org/abs/2603.11896) | 💻 暂未开源 | 机构：未详

**问题**
现有多模态 LLM 在视频理解上大多限于离线推理（offline inference）——需要先处理完整视频再回答问题。在线场景（如实时直播分析、视频通话）中，模型需要在视频流播放过程中即时推理，但现有方案的在线推理能力很弱。

**方法**
- 提出 segment-level memory 机制：将视频流切分为片段，对每个片段建立结构化记忆，支持增量式更新
- 实现"边看边想"的在线流式推理，支持多轮视频问答
- 记忆机制允许模型在不重新处理历史片段的情况下回答关于过去内容的问题

**效果**
- 在在线视频推理任务上相比离线模型有显著改进，具体 benchmark 数字详见原文

---

**Beyond Language Modeling: An Exploration of Multimodal Pretraining**
📄 [arXiv:2603.03276](https://arxiv.org/abs/2603.03276) | 💻 暂未开源 | 机构：未详

**问题**
主流多模态模型通常采用"语言模型 + 视觉编码器"的拼接架构，视觉和语言的预训练目标不统一，导致跨模态对齐不够紧密。

**方法**
- 采用 Transfusion 框架：语言部分使用 next-token prediction，视觉部分使用 diffusion
- 在统一架构下训练文本、视频、image-text pairs 乃至 action-conditioned video
- 探索了多模态联合预训练的最佳实践

**效果**
- 具体实验数据详见原文

---

**PaLMR: Towards Faithful Visual Reasoning via Multimodal Process Alignment**
📄 [arXiv:2603.06652](https://arxiv.org/abs/2603.06652) | 💻 暂未开源 | 机构：未详

**问题**
多模态 LLM 在视觉推理中容易产生"幻觉"——最终答案看似合理但推理过程不忠实于视觉输入。现有对齐方法主要关注最终输出的正确性，忽略了推理过程的可靠性。

**方法**
- 提出 Multimodal Process Alignment：不仅对齐最终答案，还对齐视觉推理的中间过程
- 确保模型的每一步推理都"忠实地"参考了视觉输入

**效果**
- 具体效果数字详见原文

---

### 🤖 AI Agent / 工具使用

**Building Effective AI Coding Agents for the Terminal: OPENDEV**
📄 [arXiv:2603.05344](https://arxiv.org/abs/2603.05344) | 💻 暂未开源 | 机构：未详

**问题**
现有终端 AI 编码代理大多采用单 agent 串行执行架构，在复杂项目中面临以下瓶颈：单一模型难以同时优化成本、延迟和能力；不同子任务（代码生成 vs. 测试 vs. 审查）的最优模型选择不同；串行执行导致长任务耗时过长。

**方法**
- 提出 OPENDEV 架构：将工作组织为并发 session，每个 session 包含多个专化子 agent
- 子 agent 执行类型化的 workflow（typed workflows），支持针对每个 workflow 独立选择最优模型
- 实现成本/延迟/能力三维度的细粒度 per-workflow 优化
- 与单 agent 方案的本质区别：从"一个大模型做所有事"转为"多个专化模型并行协作"

**效果**
- 具体性能数字详见原文

---

**AEGIS: No Tool Call Left Unchecked — A Pre-Execution Firewall for AI Agents**
📄 [arXiv:2603.12621](https://arxiv.org/abs/2603.12621) | 💻 暂未开源 | 机构：未详

**问题**
AI Agent 越来越多地通过外部工具执行操作（数据库查询、shell 命令、文件读写、网络请求），但在大多数当前 agent 框架中，模型生成的 tool call 直接传递给执行层，中间没有与框架无关的控制点——任何恶意或错误的 tool call 都会被直接执行。

**方法**
- 提出 AEGIS：一个位于模型输出和工具执行之间的预执行防火墙（pre-execution firewall）和审计层
- 对每个 tool call 进行安全检查，包括权限验证、参数校验、恶意行为检测
- 框架无关设计，可插入任何 agent 架构

**效果**
- 具体实验数据详见原文

---

**AgentAssay: Token-Efficient Regression Testing for Non-Deterministic AI Agent Workflows**
📄 [arXiv:2603.02601](https://arxiv.org/abs/2603.02601) | 💻 暂未开源 | 机构：未详

**问题**
AI Agent 的行为具有非确定性（non-deterministic），传统回归测试方法不适用——同一输入可能产生不同的合理输出。且每次测试都需要完整运行 agent workflow，token 消耗巨大。

**方法**
- 提出首个面向非确定性 AI agent workflow 的 token-efficient 回归测试框架
- 通过统计保证（statistical guarantees）在大幅减少 token 消耗的情况下验证 agent 行为的一致性

**效果**
- 实现 78-100% 的成本降低，同时保持严格的统计保证

---

### 🦾 具身智能 / 机器人

**ACE-Brain-0: Spatial Intelligence as a Shared Scaffold for Universal Embodiments**
📄 [arXiv:2603.03198](https://arxiv.org/abs/2603.03198) | 💻 暂未开源 | 机构：未详

**问题**
当前具身智能模型通常为特定形态（manipulator、自动驾驶、人形机器人）单独训练，缺乏跨形态的通用基础模型。不同物理形态需要不同的空间推理能力，但这些能力的底层结构是否存在共性？

**方法**
- 提出 ACE-Brain-0：一个通用基础"大脑"模型，在单一多模态 LLM 内统一空间推理、自动驾驶和具身操控
- 核心洞察：空间智能（spatial intelligence）是跨不同物理形态的通用脚手架（universal scaffold）
- 不同形态共享空间推理层，在此基础上分化出形态特定的动作策略

**效果**
- 具体 benchmark 数据详见原文

---

**Embodied Human Simulation for Quantitative Design and Analysis of Interactive Robotics**
📄 [arXiv:2603.09218](https://arxiv.org/abs/2603.09218) | 💻 暂未开源 | 机构：未详

**问题**
物理人-机器人交互（pHRI）的研究受限于真人实验的成本和安全风险，缺乏可规模化的定量分析手段。

**方法**
- 提出基于仿真的可扩展框架：以全身肌骨模型（full-body musculoskeletal model）作为人体动力学系统的预测代理
- 可在仿真中大规模测试不同机器人设计方案与人体的交互效果

**效果**
- 具体实验数据详见原文

---

### 🔬 AI for Science

**MMAI Gym for Science: Training Liquid Foundation Models for Drug Discovery**
📄 [arXiv:2603.03517](https://arxiv.org/abs/2603.03517) | 💻 暂未开源 | 机构：未详

**问题**
药物发现中的分子推理任务种类繁多（2D 分子任务、3D 分子任务、蛋白质任务、药物-基因交互等），现有通用 LLM 和化学领域 LLM 缺乏统一的训练和评测环境。

**方法**
- 构建包含 200+ 任务的训练/评测环境（数据+训练+评估一体），覆盖 2D 分子、3D 分子、2D 蛋白质、3D 蛋白质、药物-基因交互、跨域任务等主要类别
- 目标是训练 Liquid Foundation Model：一个能在多种分子推理任务间灵活迁移的基础模型

**效果**
- 具体 benchmark 数字详见原文

---

**On the Reliability of AI Methods in Drug Discovery: Evaluation of Boltz-2**
📄 [arXiv:2603.05532](https://arxiv.org/abs/2603.05532) | 💻 暂未开源 | 机构：未详

**问题**
尽管 AI 在药物发现领域的热度持续高涨，但至今没有"AI 发现的药物"获得监管批准。Boltz-2 等生物分子基础模型在结构预测上表现出色，但其在实际药物发现流程中的可靠性（尤其是结合亲和力预测）尚未得到严格评估。

**方法**
- 系统评估 Boltz-2 在两个关键任务上的表现：蛋白质结构预测和结合自由能预测
- 将 AI 方法与基于物理模拟的方法（simulation-based approaches）进行直接对比

**效果**
- Boltz-2 在分类任务（识别结合物 vs. 非结合物）上有效，但在预测结合自由能的精度上不如基于模拟的方法
- 为 AI 药物发现方法的能力边界提供了重要的实证参考

---

### 🛡️ AI 安全 / 对齐 / 可解释性

**On the Formal Limits of Alignment Verification**
📄 [arXiv:2603.08761](https://arxiv.org/abs/2603.08761) | 💻 暂未开源 | 机构：未详

**问题**
AI 安全的一个基础问题：对齐是否可以被形式化地验证？即是否存在一个算法能证明某个 AI 系统是"对齐的"？

**方法**
- 从形式化角度证明了一个不可能性定理：没有任何验证程序能同时满足以下三个属性：
  1. Soundness（健全性）：不会将未对齐的系统认证为对齐
  2. Generality（通用性）：在完整输入域上进行验证
  3. Tractability（可行性）：多项式时间内完成验证
- 这本质上是对齐验证领域的"不可能三角"

**效果**
- 理论贡献，为对齐验证的研究框定了基本限制

---

**State-Dependent Safety Failures in Multi-Turn Language Model Interaction**
📄 [arXiv:2603.15684](https://arxiv.org/abs/2603.15684) | 💻 暂未开源 | 机构：未详

**问题**
多轮对话中的安全失败通常被归因于特定的恶意 prompt，但实际情况可能更复杂——对话历史本身作为状态可能导致模型逐步偏移到不安全区域。

**方法**
- 提出对话历史作为"状态转移算子"（state transition operator）的分析框架
- 证明许多多轮安全失败源于确定性的上下文状态演化（deterministic contextual state evolution），而非单一 prompt 的漏洞
- 这意味着安全评估不能只关注单轮 prompt，必须考虑多轮交互的动态过程

**效果**
- 具体案例分析和实验数据详见原文

---

**Intent Laundering: AI Safety Datasets Are Not What They Seem**
📄 [arXiv:2602.16729](https://arxiv.org/abs/2602.16729) | 💻 暂未开源 | 机构：未详

**问题**
当前安全评测数据集是否真的在测试模型的安全能力？还是仅仅在测试模型识别"触发性语言"的能力？

**方法**
- 分析了安全评测中"触发性语言"（triggering cues）的作用
- 实验发现当移除触发性语言后，模型的安全表现急剧下降

**效果**
- 在 AdvBench 上，移除触发性语言后攻击成功率从 5.38% 跃升至 86.79%
- 表明现有安全评测严重依赖表面线索，而非真正评估模型的安全推理能力

---

### ⚡ 高效推理 / 量化 / 压缩

**Leech Lattice Vector Quantization for Efficient LLM Compression**
📄 [arXiv:2603.11021](https://arxiv.org/abs/2603.11021) | 💻 暂未开源 | 机构：未详

**问题**
现有 LLM 量化方法（如 GPTQ、AWQ）主要是标量量化，信息论效率受限。向量量化（VQ）通过联合编码参数块可以突破标量量化的信息论上限，但实际实现面临查找表（lookup table）存储和检索开销的问题。

**方法**
- 引入 Leech 格（Leech lattice）——一种 24 维最优球堆积格——进行向量量化
- Leech 格在 24 维空间中同时拥有最优的球堆积密度和 kissing number，是已知最高维度具有此双重最优性的格
- 利用格的代数结构避免显式码本存储（explicit codebook storage），通过格点解码（lattice decoding）替代查找表
- 与 Quip#、QTIP、PVQ 等最新向量量化方法进行对比

**效果**
- 在 LLM 量化性能上超越 Quip#、QTIP、PVQ 等近期方法，达到 SOTA
- 具体 perplexity 和 task accuracy 数字详见原文

---

### 🌐 其他新兴方向

**Truth as a Trajectory: What Internal Representations Reveal About LLM Reasoning**
📄 [arXiv:2603.01326](https://arxiv.org/abs/2603.01326) | 💻 暂未开源 | 机构：未详

**问题**
LLM 的推理过程是"真的在推理"还是"表面模式匹配"？从外部行为难以区分。

**方法**
- 提出 Truth as a Trajectory（TaT）：将 transformer 推理建模为迭代精化的展开轨迹（unfolded trajectory）
- 分析表示在各层间的位移（displacement），发现区分有效推理和虚假行为的几何不变量（geometric invariants）
- 相当于为 LLM 推理提供了一种"内窥镜"——通过观察内部表示的轨迹形状来判断推理质量

**效果**
- 发现了可区分有效推理和模式匹配的几何特征，具体量化结果详见原文

---

**Swap-guided Preference Learning for Personalized RLHF (SPL)**
📄 [arXiv:2603.12595](https://arxiv.org/abs/2603.12595) | 💻 暂未开源 | 机构：未详

**问题**
标准 RLHF 假设存在单一普适的 reward 函数，但现实中不同用户的偏好存在根本性差异——同一回复对 A 用户是"最优"，对 B 用户可能"最差"。

**方法**
- 提出 Swap-guided Preference Learning（SPL），允许为不同用户群体学习差异化的偏好模型
- 通过"交换"机制引导模型理解偏好的多样性

**效果**
- 具体实验数据详见原文

---

## 【模块四】开源项目周榜

**[OpenClaw](https://github.com/anthropics/openclaw) ⭐ 250,000+（本周持续增长）**
- 本地运行的个人 AI 助手，支持 50+ 集成（WhatsApp、Telegram、Slack、Discord 等），60 天内从 9K 涨至 250K stars，超越 React 成为 GitHub 最高 star 项目
- 上手难度：⭐☆☆ 简单
- 适用场景：个人 AI 助手、跨平台消息集成

**[karpathy/autoresearch](https://github.com/karpathy/autoresearch) ⭐ ~26,000（本周 +22,983）**
- 630 行代码的自动化 AI 研究框架：AI agent 自主修改代码→训练 5 分钟→评估→保留/丢弃→循环。一夜可运行 ~100 次实验
- 上手难度：⭐⭐☆ 中等（需单 GPU + PyTorch 环境）
- 适用场景：超参搜索、小模型架构探索、教育研究

**[bytedance/DeerFlow](https://github.com/bytedance/DeerFlow) ⭐ 快速增长中**
- 字节跳动开源 SuperAgent 框架，支持沙盒执行、记忆、工具调用、子 agent 协作，设计用于需要数分钟到数小时完成的复杂任务
- 上手难度：⭐⭐⭐ 较难
- 适用场景：复杂多步任务自动化、企业级 agent 编排

**[vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) ⭐ ~3,800（本周新上榜）**
- Agent 记忆层，在 LongMemEval 上达到 91% 准确率。支持 MCP 协议，可接入 Claude、Cursor、Windsurf 等工具；已与 OpenClaw 集成
- 上手难度：⭐⭐☆ 中等
- 适用场景：为任意 AI Agent 添加持久化学习记忆

**[volcengine/OpenViking](https://github.com/volcengine/OpenViking) ⭐ 新上榜**
- 火山引擎开源的 Agent 上下文数据库，通过文件系统范式统一管理 Agent 的记忆、资源和技能，支持层次化上下文交付和自演化
- 上手难度：⭐⭐☆ 中等
- 适用场景：Agent 上下文管理、记忆/技能/资源的统一存储

**[OpenClaw-Medical-Skills](https://github.com/cuhk-medicine/openclaw-medical-skills) ⭐ 新上榜**
- 香港中文大学医学院为 OpenClaw 贡献的医疗 AI Skills 库，标志着 Skills 生态向垂直领域（医疗）延伸
- 上手难度：⭐⭐⭐ 较难（需医疗领域知识）
- 适用场景：医疗 AI 助手、临床辅助决策

---

## 【模块五】行业动态简报

📅 03/03 | [模型发布] Google 发布 Gemini 3.1 Flash-Lite Preview，$0.25/M input tokens 创闭源模型最低价（Google Blog）

📅 03/09 | [融资] Yann LeCun 的 AMI Labs 完成 $1.03B 种子轮融资，估值 $3.5B，投资方包括 Bezos、Nvidia、Samsung、Temasek，押注 JEPA 世界模型路线（TechCrunch）

📅 03/10 | [模型动态] DeepSeek 官网出现疑似 V4 Lite 模型更新，扩展上下文能力，V4 正式发布日期仍未确认（TechNode）

📅 03/11 | [开源] Karpathy 发布 autoresearch，3 天内 GitHub stars 突破 22K，引发"自动化研究"讨论热潮（VentureBeat）

📅 03/13 | [融资] 机器人赛道单周融资超 $1.2B：Mind Robotics $500M、Rhoda AI $450M、Sunday $165M（独角兽）、Oxa $103M（Crunchbase）

📅 03/14 | [产品] Anthropic Memory 功能全量上线，Claude 可跨对话记忆用户偏好和上下文（Anthropic Blog）

📅 03/15 | [开源] Hindsight Agent Memory 发布 MCP 集成 + OpenClaw 集成，LongMemEval 达 91%（GitHub）

📅 03/16 | [基础设施] Big Tech 2026 年 AI 基础设施投资总额预计达 $650B+：Amazon $200B、Alphabet $175-185B、Microsoft $145B、Meta $115-135B（Yahoo Finance）

---

## 【模块六】中文社区热点

**话题：DeepSeek V4 "难产"与国产大模型军备竞赛**
- 为什么热：V4 多次跳票引发社区密切关注，叠加 OpenRouter 数据显示国产模型占据 API 调用量 Top 5 中 4 席（84.4%），"国产平替"话题热度高涨
- 主要观点分歧：正方认为国产开源模型已在实用性上追平甚至超越闭源模型，API 价格仅为 OpenAI 的 3%；反方认为推理能力和长尾场景仍有差距，廉价不等于好用
- 代表性内容：知乎「2026 国内大模型全景排行榜」、CSDN「国产 Coding LLM 深度对比」

**话题：Karpathy autoresearch 引发的"AI 替代研究员"讨论**
- 为什么热：630 行代码一夜跑 100 次实验的概念冲击力极强，多平台热议"AI 做研究是否会替代人类研究员"
- 主要观点分歧：正方认为自动化实验是大势所趋，将极大加速 ML 研究迭代；反方认为 autoresearch 目前仅限于超参搜索层面，真正的科学发现需要创造性假设和领域洞察
- 代表性内容：Medium「Andrej Karpathy's AutoResearch: Bye Bye Researchers」、Data Science Dojo 分析文章

**话题：AI Agent 安全隐患与 OpenClaw 的信任危机**
- 为什么热：OpenClaw 以 250K stars 登顶 GitHub，但 The New Stack 发文质疑其安全性，引发社区对"个人 AI 助手权限过大"的担忧
- 主要观点分歧：正方认为本地运行 + 开源保障了安全；反方担忧 50+ 集成意味着巨大的攻击面，Skills 生态的第三方代码更增加了供应链风险
- 代表性内容：The New Stack「OpenClaw rocks to GitHub's most-starred status, but is it safe?」

**话题：小红书 AI 内容治理与 AI 博主规范化**
- 为什么热：2026 年小红书正式允许合规 AI 博主入驻但要求严格标注 AI 身份，同时上线 AI 内容审核系统，引发"AI 生成内容是否等同于虚假内容"的讨论
- 主要观点分歧：正方认为只要标注透明就无问题，AI 可以提升内容供给效率；反方担忧 AI 生成内容将淹没真实用户体验分享，破坏社区氛围
- 代表性内容：人人都是产品经理「2026 小红书经营趋势预判」

---

## 【模块七】本周实用工具推荐

**autoresearch**（[GitHub](https://github.com/karpathy/autoresearch)）
- 解决什么问题：自动化 ML 实验——AI agent 自主修改代码、训练、评估，一夜运行 ~100 次实验
- 如何快速上手：1) `git clone` 仓库；2) 有一块 GPU + PyTorch 环境即可运行 `python autoresearch.py`
- 适合：开发者
- 费用：免费（MIT License），需自备 GPU

**Hindsight**（[GitHub](https://github.com/vectorize-io/hindsight)）
- 解决什么问题：为 AI Agent 添加持久化记忆层，使 agent 能够跨会话学习和记住信息
- 如何快速上手：1) 安装 MCP server；2) 在支持 MCP 的工具（Claude、Cursor 等）中配置即可使用
- 适合：开发者
- 费用：免费开源

**Gemini 3.1 Flash-Lite API**（[Google AI Studio](https://ai.google.dev/)）
- 解决什么问题：需要大量 API 调用但预算有限的场景（分类、提取、摘要、批量处理）
- 如何快速上手：1) 在 Google AI Studio 获取 API key；2) 替换现有模型调用的 model name 即可
- 适合：开发者
- 费用：$0.25/M input tokens，$1.50/M output tokens

**OpenViking**（[GitHub](https://github.com/volcengine/OpenViking)）
- 解决什么问题：AI Agent 的上下文管理碎片化——记忆、资源、技能散落在不同系统中
- 如何快速上手：1) Docker 部署；2) 通过文件系统 API 接入现有 Agent
- 适合：开发者
- 费用：免费开源

**Cowork（Anthropic）**（[Claude Desktop App](https://claude.ai/)）
- 解决什么问题：非技术用户的桌面任务自动化——文件整理、文档生成、多步工作流执行
- 如何快速上手：1) 下载 Claude 桌面 App；2) 选择工作文件夹即可开始使用
- 适合：两者皆可
- 费用：Claude Pro 订阅

---

## 【数据源与生成说明】

- **报告生成时间**：2026年3月19日
- **论文 arXiv ID 覆盖范围**：2602.16729 – 2603.15914
- **主要数据来源**：
  - 论文：arXiv (cs.CL/cs.AI/cs.LG/cs.CV/cs.RO)、Hugging Face Daily Papers
  - 模型发布：OpenAI Blog、Google Blog、Anthropic News、TechCrunch、TechNode、各厂商官网
  - 开源项目：GitHub Trending（weekly）、相关技术博客
  - 行业动态：TechCrunch、VentureBeat、Crunchbase、Yahoo Finance
  - 中文社区：知乎、CSDN、人人都是产品经理、量子位、机器之心
- **数据截止时间**：2026年3月19日

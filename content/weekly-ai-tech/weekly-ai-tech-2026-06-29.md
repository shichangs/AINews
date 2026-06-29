# AI 技术周报 · 2026-06-29

> 面向算法研究员的每周 AI 技术进展报告 ｜ 覆盖周期：2026-06-22 ~ 2026-06-29
> 论文收录约束：仅 arXiv ID 前缀为 **2606**（本月）或 **2605**（上月）的预印本

---

## 【模块一】本周导读

🔴 **最重要的变化**：国产开源模型把"性价比"卷成了护城河本身。本月中旬 MiniMax M3、Kimi K2.7-Code、智谱 GLM-5.2 在两周内密集开源，HuggingFace 趋势榜上中国开源权重模型一度占据前十的半数席位；叠加 6/1 GA 的 Qwen3.7-Plus（多模态 Agent，价格约为 Qwen3.7-Max 的 1/6）与 DeepSeek 把 V4-Pro 的 75% 降价永久化，"前沿能力 + 极低 token 价格"已成为中国厂商的统一打法。对算法研究员而言，可自托管、可微调的高质量底座从未如此充裕。

🟡 **值得关注但尚未明朗**：闭源前沿的节奏出现错位。Anthropic 的 Claude Opus 4.8 登顶 Artificial Analysis 智能指数、并于 6/9 放出 Mythos 级的 Claude Fable 5，但 Mythos 5 因国家安全审查经历"下架—有限放开"的反复（CNBC 6/26 报道行政部门允许向部分企业/政府机构发布）；Google 的 Gemini 3.5 Pro 在 I/O（5/19）预告"下个月"后，到 6 月底仍处有限预览，预测市场对"6/30 前 GA"的概率仅给到约 50–55%。前沿闭源的"发布即可用"假设正在松动。

🟢 **对开发者/研究者最具实用价值**：本周 arXiv 的主线是 **on-policy 后训练**——ReSum（自摘要压缩 reasoning 轨迹）、DanceOPD（流匹配模型的 on-policy 生成场蒸馏）、OPID（on-policy 技能蒸馏）几乎同时把"在模型自身分布上做稠密监督"推到台前；配合 JetSpec（并行树投机解码，编程/数学任务 1000+ TPS）这类推理加速工作，"训练侧稠密化 + 推理侧并行化"是本周最值得跟进的两条工程主线。

**下周预告**
- **Gemini 3.5 Pro**：Google 已确认但未给定档期，主打 200 万 token 上下文与 Deep Think 推理；6/30 前能否 GA 是最大悬念（部分来源称已推迟至 7 月）。
- **国产编程模型横评**：GLM-5.2 "完全开源权重"是否如期放出、与 Kimi K2.7-Code / MiniMax M3 的硬 benchmark 对决，是下周中文社区的主线。
- **ICML 2026**（7 月，温哥华）临近，下周起预计有一波"会前"放榜与开源。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**Claude Fable 5 / Mythos 5 — Anthropic**
- **核心能力亮点**：Mythos 级前沿模型。Fable 5 与 Mythos 5 共享同一套权重与训练，区别仅在于 Fable 5 外层包裹了安全层、面向通用可用场景；官方称 Fable 5 的能力"超过 Anthropic 以往任何对外通用发布的模型"。
- **与上一代对比**：定位在 Claude Opus 4.8 之上的更前沿序列（Opus 4.8 本周仍居 Artificial Analysis 智能指数榜首，为首次在该指数上压过 GPT-5.5）。
- **访问方式**：6/9 起在 Claude API、AWS Bedrock、Google Cloud、Microsoft Foundry 上线 Fable 5；Mythos 5 因国家安全审查一度受限，CNBC 6/26 报道行政部门已允许向部分企业与政府机构发布。
- **适合**：需要最高上限推理/写作能力、且能接受闭源与合规约束的团队。

**Gemini 3.5 Flash（已 GA）/ Gemini 3.5 Pro（待发）— Google**
- **核心能力亮点**：3.5 Flash 已成为 Gemini App 与 Search AI Mode 默认模型；3.5 Pro 预告 200 万 token 上下文 + Deep Think 推理。
- **定价/访问**：Gemini 3.5 Flash API 约 \$1.50 / \$9.00 每百万 token（输入/输出）；3.5 Pro 截至 6 月底仍限量预览。
- **适合**：需要超长上下文与原生多模态、且已在 Google 生态的用户。

**GPT-5.5 — OpenAI（背景项，4/23 发布）**
- 本月无新旗舰发布。GPT-5.5 于 4/23 上线，ChatGPT 免费可用、API 按官方价目计费，仍是 OpenAI 当前主力。

> 说明：ByteDance 的 Seed 2.1 Pro / Turbo（6/24，闭源）虽为商业模型，但归属中国厂商，列入下节。

### ② 国内大模型（含开源与闭源）

**GLM-5.2 — 智谱 AI（Zhipo/Z.ai）｜开源权重**
- **核心能力亮点**：744B 参数 MoE，单次前向激活约 40B；**100 万 token 上下文 + 131K 最大输出**，可"吞下整个大型代码库并一次生成多文件改动"。社区评测称其编码能力较上一代提升明显、口碑最响。
- **与国际同类对比**：中文社区给出的口径是"逼近 Opus 4.x 量级"（属社区评测口径，非官方 benchmark）；前端动画生成略逊于 Kimi K2.7-Code。
- **获取方式**：发布于 6 月中旬（各来源记为 6/13–6/16）；权重开放/计划开放，见 [llm-stats 收录页](https://llm-stats.com/models/glm-5.2)。

**Kimi K2.7-Code — 月之暗面 Moonshot AI｜开源权重**
- **核心能力亮点**：面向编程的版本，主打效率——达到与 K2.6 相同答案所需的 reasoning token **减少约 30%**，等价输出下更快、更省。前端动画生成被中文社区评为"国内最佳、接近 GPT-5.5"。
- **获取方式**：6/12 发布，开源权重，[llm-stats 收录页](https://llm-stats.com/models/kimi-k2.7-code)。

**MiniMax M3 — MiniMax｜开源权重**
- **核心能力亮点**：6/1 开源，与 GLM-5.2、Kimi K2.7-Code 并称本月"国产编码三强"。
- **获取方式**：开源权重，详见中文横评（见模块六）。

**Qwen3.7-Plus — 阿里通义千问｜闭源（API）**
- **核心能力亮点**：6/1 GA 的多模态 Agent 模型，在 Qwen3.7 文本骨干上加入图像/视频理解、深度推理与工具调用，输入支持 文本/图像/视频、输出为文本；100 万 token 上下文。
- **与国际同类对比**：定位"预算敏感型 Agent 流水线"的默认选择，单 token 价格约为 Qwen3.7-Max 的 **1/6**。
- **获取方式**：阿里云百炼（Bailian）平台；5/20 Apsara 大会先发文本旗舰 Qwen3.7-Max。

**ByteDance Seed 2.1 Pro / Turbo — 字节豆包｜闭源**
- **核心能力亮点**：6/24 发布的 Pro（高性能）与 Turbo（低延迟）双版本，见 [Seed 2.1 Pro 收录页](https://llm-stats.com/models/seed-2.1-pro)。

**DeepSeek V4-Pro / V4-Flash — DeepSeek｜开源权重（背景项）**
- 本月无新模型，但 5/31 把 V4-Pro 的 **75% 降价永久化**：V4-Pro（1.6T 总参 / 49B 激活）、V4-Flash（284B 总参 / 13B 激活），均 MIT 协议、1M 上下文，仍为 4/24 的 preview 状态。第三方 API（Novita/Fireworks）上 V4-Flash-Max 约 \$14/M、V4-Pro-Max 约 \$160–174/M。

> 文心（百度）、混元（腾讯）本周无对外旗舰 LLM 发布——但腾讯混元有重要**研究**产出（见模块三 ViQ）。

### ③ 其他重要开源模型

**DiffusionGemma 26B-A4B — Google｜开源（6/10）**
- **参数规模**：26B 总参、约 4B 激活（A4B）的扩散式语言模型，是 Gemma 家族向 diffusion LM 的延伸。
- **获取方式**：[llm-stats 收录页](https://llm-stats.com/models/diffusiongemma-26b-a4b-it)（HuggingFace 同步）。
- **适合场景**：研究扩散式文本生成、并行解码范式的团队。

**Gemma 4 系列 — Google｜开源（4/2，背景项）**
- **参数规模**：约 5B dense / 8B dense / 26B-A4B MoE / 31B dense 四档；256K 上下文、Apache 2.0、原生多模态（31B Dense 旗舰含视频）。
- **运行硬件**：31B dense 约需 24–48GB 显存（取决于量化）；8B dense 单张 16GB 卡可跑。
- **获取方式**：HuggingFace / Ollama（`ollama run gemma4`）。第三方 API（DeepInfra/Together）上 Gemma 4 31B 约 \$13–39/M。

**Cohere North Mini Code 1.0 — Cohere｜开源（6/9）**
- 轻量级编码模型，见 [收录页](https://llm-stats.com/models/north-mini-code-1.0)。

> Llama 4（Scout 17B-A、10M 上下文 / Maverick）与 Mistral Small 4（119B MoE / 6B 激活，Apache 2.0）为今年早些时候发布，本周无新版本。

---

## 【模块三】热门论文精选

> 时间合规：以下论文 arXiv ID 前缀均为 **2606**（2026 年 6 月）。关注度参考 HuggingFace Daily Papers（2026-06-26 当日榜）点赞数。

### 🧠 大语言模型（LLM）/ 推理能力

**ReSum: Synergizing LLM Reasoning and Summarization with Reinforcement Learning**
📄 https://arxiv.org/abs/2606.13316 ｜ 💻 暂未开源 ｜ 🤗 HF Daily ｜ 机构：高德/阿里（Xiangxiang Chu 等）

**问题**
RLVR（Reinforcement Learning with Verifiable Rewards）是提升 LLM 长程推理的核心手段，但现有 RLVR 倾向于鼓励**不必要的超长 rollout**：一方面退化推理连贯性，另一方面耗尽上下文预算。已有的长上下文组织方法多依赖**外部机制**来整理 rollout，而不是让模型自己管理推理轨迹。

**方法**
- 核心思想是让模型通过**自摘要（self-summarization）**主动压缩、组织自身的推理轨迹。先导实验给出两个关键观察：自摘要会**降低 token 级熵**从而稳定生成；在轨迹中插入一句"summarization"提示，能显著抑制由错误前缀传播下来的错误。
- 据此设计 **summarization-aware adaptive rollout**：当模型自发触发自摘要时，**mask 掉摘要短语**构造对照分支；在非摘要位置则**随机注入摘要短语**构造匹配分支，从而对"摘要是否有益"做对比评估。
- 进一步设计 **summarization-aware advantage**，在对照 rollout 轨迹间做更细粒度的优势比较——与 PPO/GRPO 仅在结果层面分配优势不同，ReSum 把"是否摘要"作为一个可对比的内生干预变量纳入优势估计。

**效果**
- 在多基准上平均**提升 4%**，同时把 **rollout 长度缩短 18.6%**（论文摘要原文）。核心价值在于：用更短的轨迹拿到更好的结果，直接改善长程推理的上下文经济性。

---

**Why Multi-Step Tool-Use Reinforcement Learning Collapses and How Supervisory Signals Fix It**
📄 https://arxiv.org/abs/2606.26027 ｜ 💻 https://github.com/hypasd-art/Tool-RL-Box ｜ 🤗 HF ⭐ 13 ｜ 机构：中科院自动化所（CASIA）

**问题**
在多步工具调用任务上，纯 agentic RL 常常**不稳定甚至灾难性崩溃**：性能骤降、工具调用结构失效。作者定位到崩溃根因——**特定控制 token（control tokens）上出现意外的概率尖峰**，破坏了结构化执行；但底层工具使用能力其实**仍然完好，只是被特定格式"遮蔽"**。

**方法**
- 系统性地考察一组监督信号：off-policy 监督、hint-based 引导、erroneous-example 监督等，并在**同步（synchronous）与交错（interleaved）**两种训练调度下分别施加。
- 关键发现是机制层面的：把 **SFT 与 RL 交错（interleaving SFT with RL）**能显著改善稳定性——本质上是用稠密监督周期性"复位"被 RL 推高的控制 token 概率分布，避免格式塌缩。
- 同时给出代价：交错方案在**格式与内容 OOD**评测下性能会退化，说明稳定性与泛化之间存在权衡，并非免费午餐。

**效果**
- 论文以"崩溃—修复"的机理分析为主，给出学习率、跨设定泛化的系统消融；核心结论是控制 token 概率尖峰可被监督信号抑制，从而支撑复杂多步工具使用的稳健训练（具体数值见原文，代码已开源）。

### 👁️ 多模态（图像 / 视频 / 表征）

**DanceOPD: On-Policy Generative Field Distillation**
📄 https://arxiv.org/abs/2606.27377 ｜ 💻 暂未开源（论文附伪代码，代码审批中）｜ 🌐 https://danceopd.github.io ｜ 🤗 HF Daily **#1（⭐ 52）** ｜ 机构：字节跳动 Seed

**问题**
现代图像生成要求**单一模型统一多能力**：text-to-image（T2I）、局部编辑、全局编辑等。但这些能力天然冲突——编辑会退化 T2I，局部与全局编辑互相干扰；传统的**数据混合 / 权重合并**常导致"学了新技能、旧技能退化"的相互干扰。

**方法**
- 把每个专家能力视为**共享 flow 状态空间上的一个 velocity field（速度场）**，提出 on-policy 生成场蒸馏：student 在**自身 rollout 状态**上把样本**路由（hard routing）到某一能力场**，仅查询一次低噪声 student 诱导状态，用一个简单的 **velocity-MSE** 目标训练。
- 关键设计决策：①**单次 teacher 查询即足够**完成能力吸收；②该形式还能**吸收算子定义的场**，如 classifier-free guidance（CFG）；③与 DiffusionOPD / FlowOPD 的本质区别在于——不是去合并来自不同 reward model 的 RL 模型，而是研究"生成能力本身如何在共享 flow 空间中被稳定吸收与组合"。

**效果**（作者在 HF 论文页公布）
- T2I+Edit 组合：**GEditBench 5.347**（较最优 OPD 基线 **+8.1%**），同时 **GenEval 0.849**；
- 更冲突的 Local+Global Edit：**GEditBench 5.498**（较最强基线 **+16.1%**），**GenEval 0.848**；
- 相对 DiffusionOPD 约 **10× 训练效率**（dense vs single-query 设计分析）。

---

**ViQ: Text-Aligned Visual Quantized Representations at Any Resolution**
📄 https://arxiv.org/abs/2606.27313 ｜ 💻 https://github.com/yuxumin/ViQ ｜ 🤗 HF Daily **#2（⭐ 34）** ｜ 机构：腾讯混元

**问题**
统一文本与视觉表征很诱人，但把图像像文本一样离散化必然带来严重信息损失。已有工作难以在离散表征中兼顾**低层细节与高层语义**：偏重建的表征缺语义，偏语义的特征又丢细节。

**方法**
- 把量化学习拆成两阶段：**text-aligned pre-training** 与 **feature discretization**。前者用预训练语言模型给视觉编码器提供语义丰富的监督，并使其能处理**原生分辨率**输入。
- 离散化阶段提出 **proximal representation learning** 渐进压缩特征空间，配合 **position-aware head-wise quantization**，从而灵活处理任意分辨率——这是与固定分辨率 VQ/tokenizer 的本质差异。

**效果**
- 在多模态任务上与采用连续高维视觉特征的 SOTA 编码器**性能相当**，同时在低层重建上保持高精度；
- 用 ViQ 做多模态训练带来 **20%–70% 的训练加速**（随不同 base LLM 与训练配方而变）。权重见 [HuggingFace](https://huggingface.co/XuminYu/ViQ_weights)。

### 🤖 AI Agent / 工具使用

**OPID: On-Policy Skill Distillation for Agentic Reinforcement Learning**
📄 https://arxiv.org/abs/2606.26790 ｜ 💻 https://github.com/jinyangwu/OPID ｜ 🤗 HF Daily **#2（⭐ 15）** ｜ 机构：中科院自动化所 / 清华等

**问题**
基于结果（outcome-based）的 RL 给语言 Agent 提供了稳定的优化骨架，但其**稀疏的轨迹级奖励**几乎不指示"哪些中间决策该被强化/抑制"。已有的 on-policy 自蒸馏虽能给出稠密 token 级监督，但**skill-conditioned 变体**多依赖外部技能记忆或检索特权上下文，维护成本高、且与当前策略在多轮交互中诱导的状态分布**失配**。

**方法**
- 直接从**已完成的 on-policy 轨迹**中抽取技能监督，避免外部记忆。把轨迹 hindsight 表示为**层级技能**：episode-level 技能刻画全局工作流 / 失败规避规则，step-level 技能刻画关键时刻的局部决策知识。
- **critical-first routing**：识别到关键决策时用 step-level 技能，否则回退到 episode-level 技能作为默认引导。
- 将所选技能注入交互历史，让 old policy 在**原始上下文**与**技能增强上下文**下分别对同一采样响应重新打分；二者的 **log-probability 偏移**即构成 token 级自蒸馏优势，再与 outcome advantage 组合做策略优化——从而**保留 RL 为主目标**，同时引入稠密、分布匹配的 hindsight 监督。

**效果**
- 在 **ALFWorld、WebShop、Search-based QA** 上，相对 outcome-only RL 与已有 skill-distillation 基线，普遍改善 Agent 性能、样本效率与稳健性（代码已开源；具体数值见原文）。

---

**The Verification Horizon: No Silver Bullet for Coding Agent Rewards**
📄 https://arxiv.org/abs/2606.26300 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 14 ｜ 机构：阿里通义千问 Qwen

**问题**
"验证比生成更容易"的经典直觉正在被编程 Agent 反转：当基础模型推理更强、工程 harness 更复杂，生成复杂候选解已不难，**可靠地验证它们反而成了更难的问题**。任何 verifier 都只是**人类意图的代理**：意图本身就欠定，且训练优化会**拉大 proxy 与意图的差距**（表现为 reward hacking 或 signal saturation）。

**方法**
- 沿三个维度刻画验证信号质量：**scalability、faithfulness、robustness**，并论证三者同时满足是核心难点。
- 系统研究四类奖励构造：通用编码的 **test verifier**、前端任务的 **rubric verifier**、真实 Agent 任务中的 **user-as-verifier**、长程任务的 **automated agent verifier**；跨任务类型与策略能力层级做深入分析。
- 与"设计一个固定 reward function"的范式本质不同，论文的核心主张是：**没有固定奖励能随策略能力增长而长期有效，验证必须与生成器协同进化（co-evolve）**。

**效果**
- 实验表明有针对性的验证设计能有效抑制 reward hacking、提升任务完成质量，并在多个内部与公开 benchmark 上取得提升（论文以方法论与机理分析为主）。

### 🦾 具身智能 / 机器人

**In-Context World Modeling for Robotic Control（ICWM）**
📄 https://arxiv.org/abs/2606.26025 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 8 ｜ 机构：复旦 OpenMOSS（邱锡鹏等）

**问题**
现代 VLA（Vision-Language-Action）模型常**无法泛化到新设置**（改变相机视角、机器人形态等），因为它们通常只 condition 于当前观测与语言指令，**忽略了底层系统配置这一变量**，隐式假设了训练时遇到的固定执行上下文——于是任何新环境都需要数据密集的微调。

**方法**
- 把**系统辨识（system identification）当作 in-context 适应问题**：让机器人策略从一段**自生成的、任务无关的交互历史**中自主推断关键系统变量。
- 与传统 In-Context Learning 用示范来"指定做什么任务"不同，ICWM 用上下文窗口来"理解系统**如何运作**"：在执行任务前先处理这些交互，**隐式捕获当前系统的世界动力学**，从而**无需参数更新**即可适应新配置。

**效果**
- 在仿真与真实机器人平台上，于**新相机视角**设置下显著优于标准 VLA 基线（论文摘要口径；具体数值见原文）。

### 🔬 AI for Science

**How Post-Training Shapes Biological Reasoning Models**
📄 https://arxiv.org/abs/2606.16517 ｜ 💻 暂未开源 ｜ 🤗 HF ｜ 机构：Harvard / Google DeepMind（Marinka Zitnik、Sham Kakade 等）

**问题**
生物科学推理模型把语言模型与在 DNA/RNA/蛋白质等多模态生物数据上训练的 foundation model 结合，但**后训练各阶段如何塑造推理与泛化**仍不清楚——何时提升性能、何时导致过度专精，缺乏受控研究。

**方法**
- 在基因组学、转录组学、蛋白质三大领域，**训练并评估 100+ 个生物推理模型**，在 backbone、CPT（continued pre-training）、SFT、RL 上做受控变化，同时测量 in-domain（ID）与 out-of-domain（OOD）。
- 核心机理发现是**非单调**的：CPT 通过让模型对齐"生物语言"提升下游；**SFT 持续抬高 ID，却使 OOD 早早见顶并随过拟合下滑**（"泛化坍缩"）；**RL 在对齐良好的强 SFT checkpoint 上施加时，能恢复并部分挽回 OOD 泛化**。

**效果**
- 结论指向一个可操作的"科学推理配方"：固定后训练预算下，最佳 ID-OOD 折中来自**短 SFT + 更大 RL 配额 + 跨阶段非对称的适配容量**。对"加更多监督/算力就一定更好"的直觉是有力反例。

### 🛡️ AI 安全 / 世界模型可靠性

**Hallucination in World Models is Predictable and Preventable**
📄 https://arxiv.org/abs/2606.27326 ｜ 💻 https://github.com/nicklashansen/mmbench2 ｜ 🌐 https://www.nicklashansen.com/mmbench2 ｜ 🤗 HF ⭐ 6 ｜ 机构：UC San Diego（Nicklas Hansen、Xiaolong Wang）

**问题**
生成式世界模型能渲染越来越逼真、动作可控的未来，却频繁**幻觉**：rollout 在视觉上流畅，动力学上却偏离真值。作者假设**幻觉集中在 state-action 空间的低覆盖区域**，可用轻量的数据中心信号同时检测与缓解。

**方法**
- 构建 **MMBench2**：427 小时、210 任务的视觉世界建模数据集，带 ground-truth 动作、奖励与实时模拟器；并训练一个 **350M 参数**的世界模型。
- 识别三种不同的幻觉模式——**perceptual、action-marginalized、scene-diverging**，各自锚定在 pipeline 的不同阶段，并设计三个信号准确预测"模型将在哪里失败"。
- 训练时用 **coverage-aware sampling** 补覆盖缺口；在线时把幻觉预测器当作 **curiosity reward** 做定向数据采集，得到一个数据高效的微调配方——**仅用约 50 条真实环境轨迹**即可把预训练世界模型适配到全新环境。

**效果**
- 核心结论：世界模型的幻觉本质是**数据覆盖问题**，且"用于检测它的同一信号也能用于缓解"。数据集与模型已开源。

### ⚡ 高效推理 / 投机解码

**JetSpec: Breaking the Scaling Ceiling of Speculative Decoding with Parallel Tree Drafting**
📄 https://arxiv.org/abs/2606.18394 ｜ 💻 https://github.com/hao-ai-lab/JetSpec ｜ 🌐 https://jetspec-project.github.io/jetspec-web ｜ 🤗 HF ⭐ 31 ｜ 机构：UCSD Hao AI Lab

**问题**
投机解码（speculative decoding）通过"草拟多 token、并行验证"加速自回归 LLM，但存在**scaling ceiling**：只有当接受率高、草拟开销低时，增大 draft budget 才换来加速。已有 head-based 方法陷入**因果性—效率两难**——自回归 drafter 产生 path-conditioned 候选、接受长度高但草拟成本随树深增长；双向 block-diffusion drafter 一次产出所有位置、但其 branch-agnostic 边缘分布会拼出"各自合理却相互不一致"的树，浪费预算、降低接受率。

**方法**
- 提出 **causal-parallel draft head**：一次前向提出一棵 token 树，冻结的 target 模型在 **tree-causal attention mask** 下**一次前向验证整棵树**；接受路径严格依据 target 自身 logits 选取，因而**构造上无损（lossless）**。
- 本质区别：把"一次前向草拟"的效率与"分支级因果条件"的高接受率结合，既不像自回归 drafter 那样随树深线性增本，也不像 block-diffusion 那样产生互不一致分支。

**效果**
- 接受长度最高约 **10×**；在编程与数学任务上、B200 GPU 上达到 **1000+ TPS**。代码与 checkpoint 均已开源（论文 6/16 提交、6/25 修订）。

---

## 【模块四】开源项目周榜

> 数据来源：GitHub Trending **当日榜**实时抓取（2026-06-29，© 2026 GitHub）。说明：本次 `?since=weekly` 视图返回了缓存的历史数据（明显过时），为保证数据真实，本榜采用**当日榜实时数据并按当日 star 增量排序**；星标为抓取时刻总数。

**[Lum1104/Understand-Anything](https://github.com/Lum1104/Understand-Anything) ⭐ 36,028（当日 +4,697）**
- 把任意代码库转成可探索、可搜索、可问答的交互式知识图谱，兼容 Claude Code / Codex / Cursor / Copilot / Gemini CLI。
- 上手难度：⭐⭐☆ 中等
- 适用场景：陌生代码库快速上手、架构理解、Onboarding。

**[rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) ⭐ 20,808（当日 +2,155）**
- 从零构建 AI 工程能力的实战教程（learn it, build it, ship it）。
- 上手难度：⭐☆☆ 简单
- 适用场景：AI 工程系统性学习、教学/带新。

**[affaan-m/ECC](https://github.com/affaan-m/ECC) ⭐ 194,448（当日 +1,915）**
- Agent harness 性能优化系统：skills、instincts、memory、security 与 research-first 开发，适配 Claude Code / Codex / Opencode / Cursor。
- 上手难度：⭐⭐⭐ 较难
- 适用场景：搭建/优化生产级编码 Agent harness。

**[anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) ⭐ 16,700（当日 +1,718）**
- Anthropic 官方仓库，面向知识工作者在 Claude Cowork 中使用的插件集合。
- 上手难度：⭐☆☆ 简单
- 适用场景：用 Cowork 做文件/任务自动化，开箱即用的插件起点。

**[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) ⭐ 21,891（当日 +1,430）**
- 一个"给 AI 好品味"的 skill 文件，抑制模型产出泛泛而无味的内容。
- 上手难度：⭐☆☆ 简单
- 适用场景：提升生成内容质量/风格的轻量插件。

**[mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) ⭐ 10,147（当日 +880）**
- 754 个结构化网络安全 skills，映射到 MITRE ATT&CK、NIST CSF 2.0、MITRE ATLAS、D3FEND、NIST AI RMF 五大框架，Apache 2.0。
- 上手难度：⭐⭐☆ 中等
- 适用场景：安全 Agent、合规自动化、红蓝队工具链。

**[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) ⭐ 78,691（当日 +352）**
- 为各类 Agent 提供跨会话持久上下文：捕获会话行为、AI 压缩、回注相关上下文，兼容 Claude Code / OpenClaw / Codex / Gemini / Copilot。
- 上手难度：⭐⭐☆ 中等
- 适用场景：长期项目中的 Agent 记忆、上下文连续性。

**[hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) ⭐ 5,050（当日 +539）**
- 一个去除文本"AI 味"的 skill 文件。
- 上手难度：⭐☆☆ 简单
- 适用场景：写作润色、去模板化表达。

---

## 【模块五】行业动态简报

```
📅 06/09 | [产品发布] Anthropic 发布 Claude Fable 5 与 Mythos 5（共享权重，Fable 5 为安全可用版），上线 API/Bedrock/Google Cloud/Foundry（Anthropic News）
📅 06/10 | [开源发布] Google 开源 DiffusionGemma 26B-A4B，Gemma 家族延伸至扩散式语言模型（llm-stats）
📅 06/12 | [行业会议] 2026 北京智源大会开幕，主题"从悟道到悟界"，发布悟界系列大模型与 SpikePingPong 具身系统（智源社区）
📅 06/12 | [开源发布] 月之暗面 Kimi K2.7-Code 开源，reasoning token 较 K2.6 减少约 30%（llm-stats）
📅 06/中 | [开源发布] 智谱 GLM-5.2（744B MoE/40B 激活，1M 上下文）开源，与 MiniMax M3、Kimi K2.7 组成"国产编码三强"（各来源日期记为 6/13–6/16）
📅 06/24 | [产品发布] 字节跳动发布 Seed 2.1 Pro / Turbo 双版本（llm-stats）
📅 06/26 | [政策监管] CNBC 报道：美行政部门允许 Anthropic 向部分企业与政府机构发布 Mythos 5（此前因国家安全审查受限）（CNBC）
📅 06/上 | [基础设施] Anthropic 签下 12+ 处美国数据中心租约、合计 >1GW 算力，部分由 Google 资金合作支持（行业报道）
📅 本周 | [资本/宏观] 摩根士丹利预测 2026 年全球 AI 相关债务将近翻倍至约 5700 亿美元；典型案例含 Apollo-Blackstone 360 亿美元为 Google TPU（供 Anthropic）融资、微软 1900 亿美元 capex、OpenAI Stargate 目标 10GW（行业报道）
```

> 注：上述基础设施/资本类数字来自二手行业报道，量级供参考；具体口径请以各公司官方披露为准。

---

## 【模块六】中文社区热点

**话题：2026 北京智源大会——"从悟道到悟界"，AI 走向物理世界与生命科学**
- 为什么热：6/12 开幕，智源一口气发布"悟界"系列——悟界·Physis-v0.1（号称全球首个通用世界基座模型）、悟界·Brainμ1.0（理解与生成统一的多模态神经科学大模型）、悟界·OpenComplex2.5（AI 驱动药物发现），并展示与北大联合的 SpikePingPong（全球首个跨本体人形机器人全自主乒乓球对打，已适配智元灵犀 X2、远征 A3、宇树 G1）。
- 主要看点：把大模型范式（Next-Token Prediction）外推到神经科学/物理世界，是国内"具身 + AI4S"叙事的集中爆发。
- 代表性内容：[智源社区报道](https://hub.baai.ac.cn/view/55492)

**话题：国产开源编码"三强"混战——GLM-5.2 / Kimi K2.7-Code / MiniMax M3**
- 为什么热：6 月中旬三家在两周内密集开源，且都"全部或计划开放权重"，社区开始做横评。
- 主要观点分歧：正方认为 GLM-5.2"上限最高、姿态最开放、口碑最响"，百万上下文 + 多文件输出实用；反方指出 GLM-5.2"硬数据最缺、价格最贵、且尚未真正开源"，而 Kimi K2.7-Code 在前端动画生成上被评为"国内最佳、接近 GPT-5.5"、性价比更稳。
- 代表性内容：[国产 Coding 三强对比（威易网）](https://www.weste.net/2026/06-14/Coding-Agent.html)

**话题：DeepSeek 把降价"永久化"，国产 token 价格战进入深水区**
- 为什么热：5/31 DeepSeek 将 V4-Pro 的 75% 折扣永久化，叠加 Qwen3.7-Plus（约为 Qwen3.7-Max 的 1/6 价）GA，"前沿能力 + 极低价格"成为国产统一打法。
- 主要观点分歧：正方认为这是"靠能力挣钱"取代"靠闭源护城河"的信心体现；反方担忧持续低价对厂商商业可持续性与生态的长期影响。
- 代表性内容：[量子位](https://www.qbitai.com/)、[机器之心](https://www.jiqizhixin.com/)

---

## 【模块七】本周实用工具推荐

**Ollama**（https://ollama.com）
- 解决什么问题：在本地一条命令跑开源大模型，隐私可控、成本近零。
- 如何快速上手：安装后 `ollama run gemma4`（或 `qwen3`、`deepseek-r1` 等）即对话。
- 适合：开发者 / 两者皆可
- 费用：免费（开源）。

**Understand-Anything**（https://github.com/Lum1104/Understand-Anything）
- 解决什么问题：把陌生代码库转成可问答的交互式知识图谱，快速理解架构。
- 如何快速上手：克隆仓库→指向目标代码库生成图谱→在图谱里搜索/提问；兼容 Claude Code、Cursor、Gemini CLI。
- 适合：开发者
- 费用：免费（开源）；接入的底层模型按各自计费。

**Qwen3.7-Plus（阿里云百炼 API）**（https://qwen.ai）
- 解决什么问题：预算敏感的多模态 Agent 流水线——文本+图像+视频输入、工具调用、100 万上下文。
- 如何快速上手：百炼平台开通后用 OpenAI 兼容接口调用 `qwen3.7-plus`。
- 适合：开发者
- 费用：付费（约为 Qwen3.7-Max 的 1/6 单价）。

**DeepSeek V4-Flash API**（https://api-docs.deepseek.com）
- 解决什么问题：超低价的推理/编码后端，1M 上下文，适合高并发批处理。
- 如何快速上手：注册取 API key→OpenAI 兼容接口指定 `deepseek-v4-flash`。
- 适合：开发者
- 费用：免费额度 + 付费（第三方 V4-Flash-Max 约 \$14/M，5/31 起 V4-Pro 75% 折扣永久化）。

**claude-mem**（https://github.com/thedotmack/claude-mem）
- 解决什么问题：给编码 Agent 加"跨会话长期记忆"，自动压缩并回注上下文。
- 如何快速上手：按 README 安装为插件→在 Claude Code/Codex/Gemini 等会话中自动启用。
- 适合：开发者
- 费用：免费（开源）。

---

## 【数据源与生成说明】

- **报告生成时间**：2026-06-29（周一）
- **论文 arXiv ID 覆盖范围**：2606.13316 – 2606.27377（全部为 2026 年 6 月提交，符合"本月/上月"时间约束）
- **主要数据来源**：
  - 论文：HuggingFace Daily Papers（2026-06-26 当日榜）、arXiv 摘要页（cs.AI/cs.CL/cs.LG/cs.CV/cs.RO）
  - 模型：llm-stats.com/llm-updates（结构化发布追踪）、各厂商/报道
  - 开源项目：GitHub Trending 当日榜实时抓取（2026-06-29）
  - 行业/社区：CNBC、Anthropic News、智源社区（BAAI）、量子位、机器之心、威易网及中文技术社区横评
- **数据截止时间**：2026-06-29 报告生成时刻
- **可靠性标注（编者按）**：
  - **高可信**：论文标题/arXiv ID/摘要与数字（来自 arXiv 与 HF 论文页原文）、GitHub 当日 star 数（实时抓取）、Qwen3.7-Plus / Kimi K2.7-Code / GLM-5.2 / DeepSeek 定价与发布事实（多源一致）。
  - **中等可信/需复核**：GLM-5.2 等模型的具体发布日期（各来源记 6/13–6/16，本文已标注区间）；DanceOPD 的 benchmark 数字来自作者在 HF 论文页公布（非独立第三方复现）；"GLM-5.2 达 Opus 4.x 水平"为中文社区评测口径，非官方 benchmark。
  - **仅供参考**：模块五的基础设施/资本类金额（摩根士丹利预测、各融资/capex 数字）来自二手行业报道，量级供参考，未逐一回溯官方披露。
  - 本报告未对每篇论文做全文级复现核验；OPID / Verification Horizon / ICWM / Tool-Use Collapse 等以摘要+作者说明给出的"效果"未含独立第三方数字，已在正文注明"具体数值见原文"。

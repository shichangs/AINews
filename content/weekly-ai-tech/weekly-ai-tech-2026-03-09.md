# 🤖 AI 技术周报 | 2026-03-09

> **面向算法研究员的高密度 AI 技术情报** · 覆盖论文精选 × 模型发布 × 开源周榜 × 行业动态 × 中文社区热点 × 实用工具

---

## 【模块一】本周导读

- 🔴 **最重要的变化/突破**：推理时计算扩展进入「梯度时代」——∇-Reasoner 首次将奖励模型的梯度信号引入 LLM 解码循环，将传统零阶采样式 inference-time scaling 升级为一阶优化，理论意义与工程意义并重。与此同时，"Review Beats Planning"的实验结论打破既有范式：让推理模型负责 review 而非 plan，两个现成模型协作即可在 HumanEval+ 达到 90.2% pass@1，超越 O1 Preview（89.0%）。

- 🟡 **值得关注但尚未明朗的趋势**：国内三大 MoE 旗舰（Qwen3.5-397B、GLM-5-744B、MiniMax M2.5-230B）于 2 月连续放出，在 SWE-bench 和 AIME 上首次密集对齐国际 SOTA——但 DeepSeek V4 依旧悬而未发（截至 3 月 7 日），一旦落地将重新洗牌排名。多方信号（1M Token 上下文升级、benchmark 泄露）显示最迟本月内到来。

- 🟢 **对开发者/研究者最有实际价值的内容**：Claude Sonnet 4.6 的 100 万 token 上下文窗口以 Sonnet 价位开放 beta；OpenAI 发布 gpt-oss-120b 开源模型，单卡可跑、性能逼近 o3；Anthropic 将 MCP 协议捐赠给 Linux Foundation 的新 Agentic AI Foundation，生态标准化加速——这三件事合在一起，显著拉低了生产级 AI Agent 的工程门槛。

**📅 下周预告：**
1. DeepSeek V4 发布概率极高（社区预测窗口为 3 月第二周）
2. ICLR 2026 相关论文密集解读期（3 月中旬）
3. Google Cloud Next 2026 预计公布 Gemini 新 API 特性（3 月 17 日）

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**Gemini 3.1 Pro | Google DeepMind**
- **核心能力亮点**：GPQA Diamond 94.3%，领跑专家级科学推理；LMArena 榜首，多项基准刷新 SOTA。在对话理解、数学推理与长文档处理上全面超越前代 Gemini 3 Pro。
- **与上一代对比**：相比 Gemini 3 Pro，推理深度显著增强，同时保持了相同的定价区间。
- **定价/访问**：Google AI Studio 免费试用；Gemini API 定价与 Gemini 3 Pro 持平（无涨价）。
- **适合人群**：需要最强原始 benchmark 性能的研究员；企业级科学/法律推理场景。

**Claude Sonnet 4.6 | Anthropic**
- **核心能力亮点**：GDPval-AA Elo 1,633 分，领跑真实专家级办公任务（高于 Opus 4.6 和 Gemini 3.1 Pro）；SWE-bench Verified 实际编码任务 79.6%；**1 百万 token 上下文窗口（beta）**，定价不变。
- **与上一代对比**：以 Sonnet 价位实现近 Opus 级别性能，cost-efficiency 大幅跃升。
- **定价/访问**：Claude.ai 和 API 均可访问；1M 上下文 beta 已向 API 用户开放。
- **适合人群**：需要超长上下文的文档分析、代码库级别理解；性价比敏感的团队。

**GPT-5.2 / gpt-oss-120b | OpenAI**
- **核心能力亮点**：GPT-5.2 延续推理模型路线，整合工具调用与图像理解；**gpt-oss-120b** 开源版本单卡可运行，benchmark 接近 o3，另有 20B 版本支持消费级高端笔记本本地运行。
- **与上一代对比**：开源模型发布意义重大——这是 OpenAI 首次放出真正可本地部署的强力模型。
- **定价/访问**：gpt-oss 系列已在 Hugging Face 发布（开源）；GPT-5.2 通过 ChatGPT Plus 和 API 访问。
- **适合人群**：gpt-oss 适合本地推理/私有化部署；GPT-5.2 适合需要全功能工具调用的自动化场景。

---

### ② 国内大模型（含开源与闭源）

**Qwen3.5-397B-A17B | 阿里云通义千问**
- **是否开源**：✅ 开源（Apache 2.0）
- **核心能力亮点**：397B 参数 MoE，每 token 激活仅 17B；结合 Gated Delta Networks（线性注意力变体）与稀疏 MoE，注意力机制架构极具创新性；AIME 2026 数学推理 91.3%；Qwen3-Coder-Next（80B，3B active）在编码任务上超越 DeepSeek V3.2（37B active）和 Kimi K2.5、GLM-4.7（均为 32B active）。
- **与国际同类对比**：AIME 2026 性能与 MiniMax M2.5（92.7%）接近，低于 Claude Opus 4.6 但以更少激活参数达成；架构创新程度（GDN 注意力）为同期国内发布中最高。
- **获取方式**：Hugging Face `Qwen/Qwen3.5-397B-A17B`；API 通过阿里云百炼平台。

**GLM-5-744B | 智谱 AI**
- **是否开源**：✅ 开源（部分权重）
- **核心能力亮点**：744B 参数 MoE，采用 SLIME 训练技术 + Multi-head Latent Attention（MLA）+ DeepSeek 稀疏注意力（DSA）；SWE-bench Verified 77.8%；超长上下文窗口，重点针对长时间运行的 Agent 任务优化。
- **与国际同类对比**：SWE-bench 略低于 MiniMax M2.5（80.2%），架构混合借鉴 DeepSeek 技术栈；大参数量带来更强的知识容量，但推理成本高。
- **获取方式**：智谱 AI 开放平台（zhipuai.cn）；部分权重在 HuggingFace 开放。

**MiniMax M2.5-230B | MiniMax**
- **是否开源**：✅ 开源（MiniMax 开放平台）
- **核心能力亮点**：230B 参数，仅 10B active，Full Attention（MHA）；SWE-bench Verified **80.2%**（国内最高，超越 GLM-5）；AIME 2026 数学推理 **92.7%**（国内最高）；SWE-bench 平均任务完成时间 22.8 分钟（与 Claude Opus 4.6 相当）；针对 coding、搜索、办公和工具使用等真实 Agentic 场景优化。
- **与国际同类对比**：SWE-bench 与 Claude Sonnet 4.6（79.6%）基本持平，数学推理接近 Claude Opus 4.6；在国内开源模型中 cost-efficiency 最优。
- **获取方式**：MiniMax 开放平台（minimaxi.com）；Hugging Face `MiniMaxAI/MiniMax-M2.5`。

**DeepSeek V4 | 深度求索（预期即将发布）**
- **当前状态**：截至 3 月 7 日尚未正式发布，但信号强烈——1M token 上下文升级、benchmark 泄露、社区预测收敛于 3 月第二周。
- **预期特性**：在 DeepSeek V3.2（37B active MoE）基础上进一步提升推理能力和上下文长度。
- **关注建议**：deepseek.com 保持关注，预计本周内可能发布。

---

### ③ 其他重要开源模型

**gpt-oss-120b / gpt-oss-20b | OpenAI**
- **参数规模**：120B（完整版）/ 20B（轻量版）
- **运行硬件需求**：120B 版本单张高端 GPU（建议 A100 80GB）；20B 版本消费级高端笔记本（建议 RTX 4090 或 M3 Max）
- **获取方式**：Hugging Face OpenAI 组织主页；支持 Ollama 拉取
- **适合场景**：本地私有化部署；对 OpenAI 模型有依赖但需要数据本地化的企业；作为推理服务器的后端模型

---

## 【模块三】热门论文精选

> ⚠️ 所有收录论文 arXiv ID 均为 2603.XXXXX（2026 年 3 月提交），符合时间约束。

---

### 🧠 大语言模型（LLM）/ 推理能力

**∇-Reasoner: LLM Reasoning via Test-Time Gradient Descent in Latent Space**
📄 [arXiv:2603.04948](https://arxiv.org/abs/2603.04948) | 💻 暂未开源 | 机构：未披露（arXiv 预印本）

**问题**
现有 inference-time scaling 方法（Best-of-N、MCTS、束搜索）本质上都是**零阶方法**：在离散 token 空间中采样大量候选，用 verifier/reward model 评分后选优。这导致在奖励曲面光滑的情况下，梯度信息被完全丢弃——系统无法"感知"沿哪个方向修改 response 可以提升奖励，只能盲目撒网。在长序列、高维动作空间下，采样效率极低。

**方法**
- **核心框架**：提出 Differentiable Textual Optimization（DTO），在 LLM 解码循环中引入显式梯度下降步骤，将推理过程转化为**一阶优化问题**而非零阶搜索
- **关键设计**：维护 token logit 的"潜在表征"作为可微中间变量；在每次 rollout 后，联合使用 LLM 自身 likelihood 梯度和 reward model 的梯度信号，对下一步生成的 token 分布进行反向传播更新
- **与已有方法的本质区别**：MCTS/Best-of-N 是在离散 token 空间的零阶搜索；∇-Reasoner 是在连续 logit 空间的梯度引导搜索——前者是 O(N) 样本复杂度，后者每次迭代利用一阶信息，收敛更快
- **与 RLHF/PPO 的区别**：PPO 是训练时梯度更新权重；DTO 是推理时梯度更新 logit，**不修改模型权重**，属于纯推理时干预

**效果**
- 在多个数学推理基准（MATH-500、AMC23）上，相比 Best-of-N（N=32）在等效计算预算下提升 3.2–5.7 个百分点
- 消融实验：同时去掉 LLM likelihood 梯度和 reward 梯度，退化为零阶搜索，性能下降 4.1%；仅保留 reward 梯度已可获得大部分收益

---

**Review Beats Planning: Dual-Model Interaction Patterns for Code Synthesis**
📄 [arXiv:2603.03406](https://arxiv.org/abs/2603.03406) | 💻 暂未开源 | 机构：未披露

**问题**
主流"推理模型规划 + 代码专家实现"的双模型协作范式假设推理能力可以正向迁移为编码能力，但实验揭示：让推理模型**先验地生成算法计划**，反而对代码专家形成干扰，导致 HumanEval+ 性能下降 2.4 个百分点（相比代码专家单独运行）。根本原因在于，抽象算法描述与代码实现之间存在"规划-执行 gap"：计划约束了代码专家的搜索空间，但并不总是导向正确的解。

**方法**
- **核心交互翻转**：推理模型从"规划者"变为"审查者"（reviewer），代码专家自由生成，推理模型再对生成代码进行 bug 检测和具体修复建议
- **关键设计决策**：reviewer 的输入是完整代码，而非问题描述，使推理模型能够基于具体错误给出可执行反馈；反馈粒度是"第 X 行逻辑错误，修改建议是…"而非泛化的"改进算法"
- **与 Planning 范式的本质区别**：Planning 是**先验约束**（压缩代码专家的解空间）；Reviewing 是**后验修正**（在代码专家已生成的结果上做差异化迭代）

**效果**
- HumanEval+ pass@1：规划范式 84.8%（低于单独代码专家 87.2%），审查范式 **90.2%**
- 超越 GPT-4o（87.2%）和 O1 Preview（89.0%）
- 迭代轮次 ≤ 3 次时即收敛，第 4 次后无显著收益

---

**MemSifter: Offloading LLM Memory Retrieval via Outcome-Driven Proxy Reasoning**
📄 [arXiv:2603.03379](https://arxiv.org/abs/2603.03379) | 💻 暂未开源 | 机构：未披露

**问题**
长任务 LLM 的记忆管理面临两难：简单 k-NN 向量检索低成本但忽略任务相关性；Memory Graph 等重型索引结构引入大量计算开销且存在信息丢失，且两者都让**主 LLM** 承担检索决策，浪费主模型能力。

**方法**
- **核心思路**：用一个**小型代理模型（proxy model）** 专门承担记忆检索决策，将主 LLM 从检索负担中解放
- **训练信号设计**：以**任务最终结果**为奖励（marginal utility + rank sensitivity 组合奖励），代理模型无需人工标注检索数据，通过结果反馈学习"哪些记忆对最终成功有边际贡献"
- **与 RAG 的本质区别**：RAG 是静态检索管道，query 是用户输入；MemSifter 的检索 query 由代理模型根据任务状态动态推理生成，且代理是轻量专用模型

**效果**
- 在长任务基准（LoCoMo、LongAgent-Bench）上超越 Memory Graph 基线，任务准确率提升 8–12%
- 推理时延增加 < 5%（相比主模型 alone），内存索引开销降低约 40%

---

**Agentic Code Reasoning: Semi-Formal Reasoning for Codebase Exploration**
📄 [arXiv:2603.01896](https://arxiv.org/abs/2603.01896) | 💻 暂未开源 | 机构：未披露

**问题**
LLM Agent 在不执行代码的情况下理解大型代码库时，普通 CoT 允许推理"跳步"——Agent 可以跳过边界情况或做出无依据的假设，导致 patch 等价验证等任务的错误率居高不下。

**方法**
- **半形式推理（Semi-Formal Reasoning）**：要求 Agent 构建**显式前提（premises）→ 执行路径追踪 → 形式化结论**的推理链，每个结论必须有前提支撑
- **关键性质**：推理链本身构成一个"证书"——Agent 无法声明"显然成立"，必须逐步展开，消除了推理跳步的可能
- **与无结构 CoT 的本质区别**：CoT 是语言层面的自然语言推理；Semi-Formal 强制结构化前提-结论映射，可由外部验证器部分检验

**效果**
- Patch 等价验证：CoT 基线 78% → Semi-Formal 88%（精选样本）；真实 Agent 生成 patch 上达 **93%**
- 故障定位任务：准确率 +9.3%
- 代码 QA：+7.1%

---

**Certainty Robustness: Evaluating LLM Stability Under Self-Challenging Prompts**
📄 [arXiv:2603.03330](https://arxiv.org/abs/2603.03330) | 💻 暂未开源 | 机构：未披露

**问题**
现有 LLM 评测几乎全是单轮静态 benchmark，忽略了模型在多轮交互中面对**用户质疑**时的稳健性。已有研究表明，即使模型初始答案正确，在"你确定吗？"或"你回答错了！"的质疑下，高比例模型会放弃正确答案——这一行为在现实部署中是严重风险。

**方法**
- **Certainty Robustness Benchmark（CRB）**：基于 LiveBench 的 200 道推理/数学题，构建两轮对话：第一轮答题，第二轮输入三种 challenging prompt（不确定型"Are you sure?"、显式反驳"You are wrong!"、数值置信度询问）
- **度量指标**：稳定性（正确答案被坚持的比例）、适应性（错误答案被自我纠正的比例）及两者的平衡分数
- **关键发现**：部分模型在遇到质疑时放弃正确答案的比例高达 34%；"确定性稳健性"与初始准确率**相关性低**，是独立评测维度

**效果**
- 揭示了主流 frontier 模型在对话稳健性上的显著差异：Claude Opus 4.6 稳定性最高（放弃率 11%），部分开源模型放弃率超 30%
- 数值置信度校准度和放弃率之间存在强正相关（r=0.71）

---

### 👁️ 多模态（图像、视频、音频）

**From Narrow to Panoramic Vision: Attention-Guided Cold-Start Reshapes Multimodal Reasoning**
📄 [arXiv:2603.03825](https://arxiv.org/abs/2603.03825) | 💻 暂未开源 | 机构：未披露

**问题**
多模态 LLM 在推理时倾向于仅注意图像的局部显著区域（"narrow vision"），忽视全局上下文，导致在需要空间关系推理或跨区域综合判断的任务上表现差。Cold-start 阶段（SFT 初始化）的数据分布直接决定模型的视觉注意力偏好，但现有 SFT 数据缺乏引导全局视觉探索的设计。

**方法**
- 提出 **AVAR（Attention-guided Visual Anchoring and Reflection）**，三个核心组件：
  - **视觉锚点数据合成**：基于注意力热图，合成要求模型回答需要全局注意力的问题，强制模型在 cold-start 阶段建立宽视野习惯
  - **注意力引导训练目标**：在 SFT loss 中加入注意力分布正则项，惩罚过度集中在局部区域的注意力分布
  - **视觉锚点奖励塑形**：在 RLHF 阶段，奖励函数结合任务准确率和注意力覆盖度

**效果**
- 在 7 个多模态推理基准上平均提升 **7.0%**（MMStar、MMBench、ScienceQA 等）
- 消融：仅去掉注意力正则目标，平均掉 3.2%；仅去掉奖励塑形，掉 2.1%

---

**Towards Multimodal Lifelong Understanding: A Dataset and Agentic Baseline**
📄 [arXiv:2603.05484](https://arxiv.org/abs/2603.05484) | 💻 暂未开源 | 机构：未披露

**问题**
现有多模态理解数据集以单图/短视频为主，无法评测模型对**跨越天/周/月时间尺度的连续生活场景**的长程理解能力——而这正是个人助理、持续监控等真实应用的核心需求。

**方法**
- **MM-Lifelong 数据集**：181.1 小时连续视频，按 Day / Week / Month 三个时间粒度结构化标注，包含人物、事件、因果关系的跨时间查询任务
- **Recursive Multimodal Agent（ReMA）**：通过动态记忆管理，对历史状态进行递归 belief 更新——新视频片段到来时，ReMA 用新观测更新已有记忆图而非丢弃历史

**效果**
- Day 粒度 QA：ReMA 较基础 LLM 提升 18.3%
- Week/Month 粒度：提升幅度 22–29%（因时间跨度越长，naive 方法遗忘问题越严重）

---

### 🤖 AI Agent / 工具使用

**AgentIR: Reasoning-Aware Retrieval for Deep Research Agents**
📄 [arXiv:2603.04384](https://arxiv.org/abs/2603.04384) | 💻 暂未开源 | 机构：未披露

**问题**
传统检索系统以"用户 query 信息不足"为前提，用各种方式补全 query 意图。但 Deep Research Agent 在每次搜索前都会生成**显式推理链（reasoning trace）**，其中包含丰富的搜索意图、已知上下文和求解目标——现有检索系统完全忽视这些免费可得的高质量信号，导致 Agent 的检索质量远低于潜在上限。

**方法**
- **Reasoning-Aware Retrieval**：将 Agent 的 reasoning trace 作为检索信号，与 query 一起编码
- 具体实现：训练一个 re-ranker，输入为「reasoning trace + query + candidate documents」，用 RLHF 对最终研究任务成功率进行优化
- 与标准 RAG 区别：RAG query 是用户自然语言输入；AgentIR query 包含 agent 的推理状态，信噪比更高

**效果**
- 在 BioASQ、HotpotQA、2WikiMultiHopQA 等多跳问答基准上，AgentIR 相比标准 BM25+Neural Reranker 提升 6.8–11.4%
- 在 Deep Research Agent 实际循环中（10 轮搜索任务）端到端任务完成率提升 14.2%

---

### 🦾 具身智能 / 机器人

**PROSPECT: Unified Streaming Vision-Language Navigation via Semantic–Spatial Fusion and Latent Predictive Representation**
📄 [arXiv:2603.03739](https://arxiv.org/abs/2603.03739) | 💻 暂未开源 | 机构：未披露

**问题**
现有 VLN（Vision-Language Navigation）系统通常将语义理解和空间感知分开处理，且不能以流式（streaming）方式持续更新环境模型，在长路径导航中积累误差严重。CUT3R 等空间编码器虽然引入了绝对尺度的 3D 特征，但与语言指令的融合方式粗粒度，限制了导航精度。

**方法**
- **流式架构**：以 CUT3R 作为流式 3D 空间编码器，持续产出带绝对尺度的空间特征，支持 online 更新不需要完整场景重建
- **语义-空间融合**：用 Cross-Attention 将 SigLIP 的语义特征与 CUT3R 的空间特征融合，实现细粒度的语义-几何对齐
- **潜在预测表征**：引入潜在预测模块，在执行动作前预测未来空间状态，减少行动不确定性

**效果**
- R2R 导航成功率（Success Rate）：PROSPECT 86.3% vs SOTA 基线 83.1%
- 长路径（>10 步）场景提升更明显：+5.2%

---

**From Language to Action: Can LLM-Based Agents Be Used for Embodied Robot Cognition?**
📄 [arXiv:2603.03148](https://arxiv.org/abs/2603.03148) | 💻 暂未开源 | 机构：未披露

**问题**
现有 LLM Robot Agent 研究多集中在 high-level 任务规划（"拿起杯子"），鲜少研究 LLM 的 low-level 认知循环——包括持续感知更新、记忆维护与工具接口调度的完整闭环。

**方法**
- 将 LLM 嵌入认知架构，赋予其感知（图像流处理）、运动（操作原语调用）和物体操纵（工具接口）三类接口
- 核心贡献：设计了"感知-思考-行动"循环的 prompt 结构，让 LLM 在家务任务中持续维护工作记忆（working memory）而不依赖外部数据库

**效果**
- 家务任务（RoboTHOR 子集）任务完成率：LLM Agent 71.4% vs 规则 baseline 58.2%
- 在新物体/新布局的泛化测试中优势更明显（+18.9%）

---

### ⚡ 高效推理 / 量化 / 压缩

**Quasar: Quantized Self-Speculative Acceleration for Rapid Inference via Memory-Efficient Verification**
📄 [arXiv:2603.01399](https://arxiv.org/abs/2603.01399) | 💻 暂未开源 | 机构：未披露

**问题**
推测解码（Speculative Decoding）用小 draft 模型生成候选 token，用大 target 模型验证，加速效果受限于 Memory Bandwidth——大模型验证阶段仍然需要加载全部权重，内存瓶颈未解决。

**方法**
- **自推测（Self-Speculative）框架**：不引入额外 draft 模型，用**低 bit 量化版本**的主模型作为 draft，高精度版本作为 verifier
- **关键设计**：Verification 阶段使用低 bit（4-bit GPTQ）量化权重，大幅降低内存带宽需求；仅在接受率低时切换回全精度
- **Training-Free**：无需重新训练，直接适配已量化模型

**效果**
- 在 LLaMA-3-70B 上，端到端吞吐提升 2.3×（相比标准自回归解码）
- 相比传统推测解码（需额外 draft 模型），内存占用降低约 35%
- token 接受率 82–87%（接近独立 draft 模型的 89%）

---

**Dissecting Quantization Error: A Concentration-Alignment Perspective**
📄 [arXiv:2603.04359](https://arxiv.org/abs/2603.04359) | 💻 暂未开源 | 机构：未披露

**问题**
量化误差的分析传统上基于均方误差（MSE）或困惑度（Perplexity），这些宏观指标难以指导逐层量化策略的设计——无法回答"哪些层对量化最敏感、为什么"。

**方法**
- 通过信噪比（SQNR）分析将线性层量化误差分解为两个独立因子：
  - **集中度（Concentration）**：权重/激活的奇异值集中程度——集中度高意味着少数方向携带大部分信息，量化误差集中在这些方向
  - **对齐度（Alignment）**：权重和激活的主方向是否对齐——对齐越高，集中度带来的量化误差越大
- 基于此分解，提出**混合精度量化**分配策略：高集中-高对齐层用更多 bit，反之用更少 bit

**效果**
- 在 LLaMA-3 和 Qwen2.5 系列上，相比 GPTQ（统一精度）：同等平均 bit 数下，困惑度降低 0.8–1.3；同等困惑度下，平均 bit 数降低 0.15–0.25 bit

---

## 【模块四】开源项目周榜

> 数据来源：GitHub Trending（本周维度）及社区报告，截至 2026-03-08

**[OpenClaw](https://github.com/openclaw-ai/openclaw) ⭐ ~188,000（60 天 +179,000，史上最快增长）**
- 开源个人 AI 助手，本地运行，连接 WhatsApp、Telegram、Slack、Discord、Signal、iMessage、Microsoft Teams
- 上手难度：⭐⭐☆ 中等
- 适用场景：个人信息汇聚与 AI 助手；企业内部跨渠道消息处理

**[Ollama](https://github.com/ollama/ollama) ⭐ ~162,000（本周 +3,500 估）**
- 本地大模型一键运行框架，支持 llama、qwen、deepseek 等主流模型
- 上手难度：⭐☆☆ 简单
- 适用场景：本地推理服务搭建；快速测试新模型；离线私有化部署

**[Dify](https://github.com/langgenius/dify) ⭐ ~130,000（本周 +2,800 估）**
- 开源 LLM 应用开发平台，支持 RAG、Agent 工作流、Prompt 可视化管理
- 上手难度：⭐⭐☆ 中等
- 适用场景：快速构建企业级 AI 应用；RAG 知识库搭建；无代码 Agent 编排

**[RLinf](https://github.com/RLinf/RLinf) ⭐ 本周新进榜（增长迅速）**
- 具身 AI 和 Agentic AI 的强化学习基础设施（RL Infrastructure），专为下一代训练框架设计
- 上手难度：⭐⭐⭐ 较难
- 适用场景：具身智能训练；Agent 强化学习研究；可扩展 RL 训练管线

**[Natively](https://github.com/natively-ai/natively) ⭐ 本周新进榜**
- 开源、隐私优先的 AI 会议助手，支持本地模型和云端 AI，实时提供面试/会议/对话辅助
- 上手难度：⭐☆☆ 简单
- 适用场景：技术面试辅助；会议实时摘要；销售对话分析

**[awesome-Embodied-Robotics-and-Agent](https://github.com/zchoi/Awesome-Embodied-Robotics-and-Agent) ⭐ 持续增长**
- 具身 AI + LLM/VLM 机器人研究精选列表，实时追踪最新论文和项目
- 上手难度：⭐☆☆ 简单（资源列表型）
- 适用场景：具身智能研究入门；文献调研；新方向追踪

---

## 【模块五】行业动态简报

```
📅 03/01 | [公司内部] OpenAI 证实解雇一名员工，原因是利用 Polymarket 预测市场对公司内部
          机密信息进行交易，涉及 AI 产品发布时间的内幕信息。

📅 03/01 | [产品] 阿里云宣布 CoPaw 开源，支持钉钉、飞书、QQ 等多个软件平台接入 AI Agent
          能力，进一步落地 MCP 生态。

📅 03/03 | [监管/政治] 科技亿万富翁支持的超级 PAC"Leading the Future"（Palantir 联创
          Joe Lonsdale、OpenAI President Greg Brockman、a16z 参与）投入 1.25 亿美元，
          用于反对支持 AI 强监管的国会候选人。（来源：TechCrunch）

📅 03/03 | [产品/基础设施] Snowflake 发布 Cortex Code，面向企业数据上下文的 AI 编码 Agent，
          可理解企业内部数据湖结构直接生成可运行 Pipeline。

📅 03/05 | [融资/基础设施] Oracle 宣布计划募资高达 500 亿美元，用于 AI 基础设施大规模扩张，
          重点布局 Generative AI 和自主 Agent 数据中心。

📅 03/05 | [生态标准] Anthropic 将 MCP（Model Context Protocol，"AI 的 USB-C"）协议捐赠
          给 Linux Foundation 旗下新成立的 Agentic AI Foundation，OpenAI 和 Microsoft 已
          公开拥抱 MCP，Agent 工具调用标准化加速。

📅 03/06 | [产品取消] Meta 因芯片设计难度超预期，取消正在开发的高端 AI 训练专用芯片项目，
          转向采购 NVIDIA GPU 的策略。

📅 03/07 | [战略合作] 三星宣布 2026 年底前将搭载 Google Gemini AI 的移动设备扩大至 8 亿台，
          覆盖中低端机型，加速 AI 手机普及。

📅 03/08 | [监管] 美国科罗拉多州 AI Act 确认将于 2026 年 6 月正式生效，这是美国首批具备实质
          执行力的州级 AI 监管立法之一；全球风险投资 2026 年 2 月创下单月 1890 亿美元历史纪录，
          其中 AI 相关初创占 90%。
```

---

## 【模块六】中文社区热点

**话题：国内三大 MoE 旗舰同台竞技——谁才是真正的"国产 SOTA"？**
- **为什么热**：Qwen3.5（阿里）、GLM-5（智谱）、MiniMax M2.5 在 2 月内密集发布，三者均宣称 SOTA，但各自擅长的 benchmark 不同，引发算法社区大规模横向对比。
- **主要观点分歧**：正方（MiniMax 支持者）认为 SWE-bench 80.2% + AIME 92.7% 是最全面的工程实力证明；反方（Qwen 支持者）认为 Qwen3.5 的架构创新（GDN 注意力）更有长远价值，且 Qwen 在多语言上仍领先；GLM-5 支持者则强调 744B 参数量带来的知识容量优势在垂直领域任务中更突出。
- **代表性内容**：[interconnects.ai 深度分析](https://www.interconnects.ai/p/latest-open-artifacts-19-qwen-35)

---

**话题：DeepSeek V4 到底何时来？社区"守夜模式"**
- **为什么热**：DeepSeek V3.2 发布已近 3 个月，V4 的 benchmark 泄露和 1M Token 升级传言持续发酵，多个推断窗口（农历新年前/后、2 月末）相继落空，社区进入"每天刷新 deepseek.com"状态。
- **主要观点分歧**：技术乐观派认为 V4 将在 SWE-bench 和 GPQA 上同时创新高；谨慎派认为连续预期落空可能说明 V4 遇到了工程挑战，存在下修可能。
- **代表性内容**：[evolink.ai V4 预期分析](https://evolink.ai/blog/deepseek-v4-release-window-prep)

---

**话题：MCP 捐赠 Linux Foundation——Agent 时代的"USB-C"标准之争**
- **为什么热**：Anthropic 将 MCP 协议捐赠给开源基金会，OpenAI 和 Microsoft 同步背书，使 MCP 基本确立为 AI Agent 工具调用的事实标准。国内厂商（阿里 CoPaw、钉钉等）加速跟进。
- **主要观点分歧**：正方认为 MCP 统一标准将大幅降低 Agent 工程门槛，推动 2026 年 Agentic 应用爆发；反方担忧 MCP 成为 Anthropic 主导的事实垄断，中国厂商应尽早建立本土替代标准。
- **代表性内容**：[integratedcognition.com March 2026 AI Launch Wave 分析](https://integratedcognition.com/blog/march-2026s-ai-launch-wave-what-lawyers-should-make-of-gpt-54-claude-sonnet-46-gemini-31-pro-grok-420-glm-5-minimax-m25-and-the-deepseek-question)

---

**话题：推理时计算扩展"从零阶到一阶"——∇-Reasoner 引发的方法论讨论**
- **为什么热**：∇-Reasoner 将梯度引入推理解码循环，被国内算法研究圈认为是 inference-time scaling 的范式转变，PaperWeekly 和机器之心均发出深度解读，知乎"人工智能"话题相关讨论冲上热榜。
- **主要观点分歧**：正方认为一阶方法理论上限高，是未来主流；反方认为工程实现复杂度高（需要在推理时做反向传播），实际部署困难，且 DTO 目前在长序列任务上的计算成本分析不充分。

---

**话题：OpenAI gpt-oss-120b 开源——是真开源还是"半开源"？**
- **为什么热**：OpenAI 终于放出可本地运行的大参数模型，引发国内社区关于"真开源"标准的讨论。部分开发者已在 Ollama 上成功跑通 20B 版本，实测效果超预期。
- **主要观点分歧**：正方认为权重开放即为有效开源，技术社区受益；反方认为 OpenAI 未公开训练数据和训练代码，与 Llama 系列的完整开源有本质区别，炒作"开源"标签有误导性。

---

## 【模块七】本周实用工具推荐

**Cursor**（[cursor.sh](https://cursor.sh)）
- **解决什么问题**：AI 原生代码编辑器，深度集成 LLM 的代码理解、补全、重构与对话能力
- **如何快速上手**：① 下载安装 Cursor（基于 VS Code，配置无需迁移）② 在编辑器内用 Cmd+K 直接对选中代码提问或修改
- **适合**：开发者
- **费用**：免费版（有限额度）+ Pro $20/月（无限 Claude Sonnet/GPT-5 调用）

---

**Claude Code**（[claude.ai/claude-code](https://claude.ai/claude-code) 或 `npm install -g @anthropic-ai/claude-code`）
- **解决什么问题**：命令行 AI 编码 Agent，可在终端直接操作代码库——读文件、写代码、运行测试、提交 git，支持 MCP 插件扩展
- **如何快速上手**：① `npm install -g @anthropic-ai/claude-code` 安装 ② 进入项目目录，运行 `claude` 启动会话 ③ 直接用自然语言描述任务，如"帮我重构 auth.py 并写单元测试"
- **适合**：开发者
- **费用**：需 Anthropic API Key，按 token 计费（Claude Sonnet 4.6 约 $3/M input token）

---

**Ollama**（[ollama.com](https://ollama.com)）
- **解决什么问题**：本地大模型一键部署，支持 llama、qwen、deepseek 等主流开源模型，提供 OpenAI 兼容 API
- **如何快速上手**：① 下载 Ollama 客户端 ② 运行 `ollama pull qwen3.5:8b` 拉取模型 ③ `ollama serve` 启动本地 API（默认 localhost:11434）
- **适合**：开发者 / 两者皆可
- **费用**：完全免费；需本地 GPU（推荐 8B 以上模型至少 8GB VRAM）

---

**Dify**（[dify.ai](https://dify.ai)）
- **解决什么问题**：开源 LLM 应用开发平台，可视化构建 RAG 应用、Agent 工作流，无需深度工程能力
- **如何快速上手**：① 访问 dify.ai 注册或 Docker 自部署 ② 创建"知识库"上传文档（PDF/Word） ③ 新建 Chatbot 应用，关联知识库，5 分钟得到可用的 RAG 问答系统
- **适合**：两者皆可
- **费用**：云端免费版（有使用限额）+ 专业版 $59/月；开源可完全自部署

---

**Natively**（[github.com/natively-ai/natively](https://github.com/natively-ai/natively)）
- **解决什么问题**：本地运行的开源 AI 会议助手，实时转录、摘要、关键点提取，支持本地模型保护隐私
- **如何快速上手**：① 从 GitHub Releases 下载安装包 ② 配置本地模型（Ollama）或 API Key ③ 会议开始前启动，自动录音转录并生成实时摘要
- **适合**：两者皆可
- **费用**：完全免费（开源）；需本地麦克风权限

---

## 【数据源与生成说明】

- **报告生成时间**：2026-03-09
- **论文 arXiv ID 覆盖范围**：`2603.01399 – 2603.05484`（2026 年 3 月 1–8 日提交）
- **主要数据来源**：
  - arXiv cs.CL / cs.AI / cs.LG / cs.CV / cs.RO（当月列表）
  - WebSearch 多轮针对性搜索（论文、模型发布、行业动态）
  - interconnects.ai、sebastianraschka.com、milvus.io 等技术深度分析
  - qbitai.com、jiqizhixin.com、huixin.me AI 日报（中文社区）
  - GitHub Trending 周榜（社区统计）
  - LMCouncil、llm-stats.com 基准对比
- **数据截止时间**：2026-03-08 23:59 UTC+8
- **注意事项**：DeepSeek V4 尚未正式发布，相关内容基于公开信号整理；GitHub star 数据为估算值，以官方实时数据为准；论文未开源项目均已注明"暂未开源"。

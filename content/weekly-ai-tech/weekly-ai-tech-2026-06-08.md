# AI 技术周报 · 2026 年第 23 周

**报告周期：2026-06-01 → 2026-06-08（周一发布）｜面向：算法研究员**

---

## 【模块一】本周导读

- 🔴 **最重要的变化：物理 AI 的"开放前沿"被 NVIDIA 一把推到台前。** NVIDIA 在 GTC Taipei（5/31，6/1 起全面铺开）发布 **Cosmos 3**——首个以 Mixture-of-Transformers 把"视觉推理 + 世界生成 + 动作预测"统一进单一模型的**开源**世界基础模型，权重 / 代码 / 数据集 / 后训练资源全开（OpenMDW-1.1）。这意味着具身智能与自动驾驶的数据飞轮，第一次有了一个 frontier 级、可自由微调的公共底座。叠加同周 Gemma 4 12B 开放、Huawei KVarN 开源，本周的主线是"开放权重继续向 frontier 收敛"。

- 🟡 **值得关注但尚未明朗：闭源三巨头的"空窗与蓄势"。** GPT-5.6（Codex 后端已被发现路由引用，Polymarket 押注 6 月底前发布概率约 89%）、Gemini 3.5 Pro（Google I/O 上 Sundar 亲口"再给我们一个月"）、Anthropic Claude Mythos（Project Glasswing 已向约 50 家合作方开放预览）三条线都箭在弦上但本周均未正式 GA。本周闭源侧是"预期管理"而非"产品落地"，下周或为兑现窗口。

- 🟢 **对研究者最有实际价值：两篇"反共识"的训练 / 推理论文。** 一是 **《Rethinking RL for LLM Reasoning》**（2605.06241）用 token 级分析论证 RLVR 的增益其实是"稀疏策略选择"而非"能力学习"，并给出 RL-free、单卡数分钟、便宜约 3 个数量级的替代法 ReasonMaxxer；二是 Huawei **KVarN**（2606.03458）指出现有 KV-cache 量化在自回归解码下会逐步累积误差，用 Hadamard 旋转 + 双轴方差归一化在 2-bit 下刷新 SOTA，且已落地 vLLM 后端、一个 flag 即可用。两者都"今天就能复现"。

**下周预告**
1. **GPT-5.6 / Gemini 3.5 Pro / Claude Mythos 1**：三大闭源旗舰任意一款都可能在 6 月中下旬落地，关注是否在 Terminal-Bench / SWE 类 agentic 评测上再拉开身位。
2. **ICML 2026（7 月，温哥华）**：camera-ready 与 workshop 名单陆续公布，预计本月底起出现一波"中稿即挂 arXiv"的高质量预印本。
3. **国产开源**：DeepSeek V4 正式版（4/24 为 preview）、Qwen 3.6 后续小版本均有补发可能，留意是否跟进开放权重。

---

## 【模块二】模型发布追踪

> 说明：本周（6/1–6/8）真正的"新权重"集中在**开源侧**（Cosmos 3、Gemma 4 12B）；闭源旗舰处于发布前夜。国内厂商本周无新旗舰，下文同时给出近 6 周（4 月底以来）的关键基线，便于研究者对齐参照系。

### ① 国际商业模型（闭源）

**Google Gemini 3.5 Flash**（Google）
- 核心亮点：上月 Google I/O（5/19）GA，主打"frontier 级智能 + 约 4× 速度"，原生 1M 上下文；Terminal-Bench 2.1 报告 76.2%，编码 / agent 能力超过上一代 Gemini 3.1 Pro。
- 与上一代对比：定位"用 Flash 的价格吃掉 Pro 的活"，性价比是主卖点。
- 定价 / 访问：API \$1.50 / \$9.00 每百万 token（输入 / 输出）；AI Studio、Vertex AI、Gemini App 均可用。
- 适合：对延迟 / 成本敏感的 agent 与高并发线上推理。
- 备注：**Gemini 3.5 Pro 本周仍未发布**，官方口径为"下月"。

**OpenAI GPT-5.x**（OpenAI）
- 现状：当前线上旗舰为 GPT-5.4；**GPT-5.6 本周未发布**，但安全研究者在 Codex 后端发现了对 `gpt-5.6` 的路由引用，预测市场对"6 月底前发布"给出约 89% 概率。
- 适合：关注其是否把 agentic coding 作为主升级方向（与本周 CNBC 报道的"微软 / 谷歌入局编码模型"正面对撞）。

**Anthropic Claude（Opus 4.8 / Mythos 预览）**（Anthropic）
- 现状：线上旗舰 Claude Opus 4.8；下一代 **Claude Mythos** 通过 Project Glasswing（4/7）向约 50 家合作方开放预览，本周未公开 GA。
- 生命周期提示：Claude Opus 4.1 计划 **8/5 在 API 下线**，官方建议迁移至 Opus 4.8。
- 适合：长上下文推理、Computer Use、agent 规划等重度场景的企业用户。

### ② 国内大模型（含开源与闭源）

> 本周无国产新旗舰发布。以下为 4 月底以来的关键基线，国内动态与国际同等重要。

**DeepSeek V4 / V4-Pro / V4-Flash**（深度求索，开源权重）
- 亮点：4/24 放出 V4 preview，V4-Pro 在多项评测对标 Claude Opus 4.6 / GPT-5.4 / Gemini 3.1；新架构显著拉长可处理上下文、提升长文本效率。
- 与国际对比：多份 5 月中立榜单将 **DeepSeek V4-Pro 列为开源第一**。
- 获取：Hugging Face `deepseek-ai/DeepSeek-V4-Pro`；官网 API。

**通义千问 Qwen 3.5 / 3.6**（阿里，Apache-2.0 开源）
- 亮点：Qwen 3.5（2/16）为 397B MoE、原生 256K 上下文、201 语言、强 math-vision；春季后续迭代到 Qwen 3.6，稳居开源第一梯队。
- 与国际对比：开源综合榜常年第二，全球化部署（多语言）是差异化优势。
- 获取：Hugging Face / ModelScope / 通义 API。

**文心 5.1**（百度，闭源）
- 亮点：5/9 发布，采用"多维弹性预训练"，宣称预训练成本仅为同规模业界约 6%，LMArena 搜索榜登顶国内第一。
- 获取：文心一言 / 千帆平台 API。

**Kimi K2.6**（月之暗面）
- 亮点：GPQA Diamond 进入前十，\$0.95 / 百万输入 token，被称为"最便宜的 frontier 级"。编码能力是重点。
- 获取：Kimi 开放平台 API。

**GLM-5.1 / GLM-4.7-Flash**（智谱）
- 亮点：GLM-5.1（4 月）开放权重、编码能力逼近 Opus 4.6 一个身位以内；GLM-4.7-Flash **永久免费不限量**，适合日常对话 / 文本 / 代码辅助。
- 获取：bigmodel.cn / Hugging Face。

**其他近月动态**：MiniMax 开源 M2.7、小米 MiMo-V2.5-Pro、字节豆包 Seed / Seedance（视频）/ Seedream（图像）系列持续迭代。

### ③ 其他重要开源模型

**NVIDIA Cosmos 3**（本周重点 🌟）
- 参数 / 架构：开放前沿"物理 AI"世界基础模型，基于 Mixture-of-Transformers，将文本 / 图像 / 视频 / 环境声 / 动作的原生视觉推理与多模态生成统一进单一 omnimodel；训练数据约 20 万亿多模态 token（近 10 亿图像、4 亿真实 + 合成视频）。
- 版本与硬件：本周即放出 **Super**（高物理精度，用于训练机器人 / 自动驾驶）与 **Nano**（亚秒级生成）两档；可本地运行的 **Edge** 版稍后跟进。
- 获取：权重 / 代码 / 数据集 / 后训练资源全开，OpenMDW-1.1 许可（NVIDIA 官网 / NGC / Hugging Face）。
- 适合：具身智能、自动驾驶、合成数据生成、世界模型 / 策略模型研究。

**Google Gemma 4 12B**
- 参数 / 硬件：Gemma 4 家族（4/2 起）Apache-2.0；含 2B/4B 有效尺寸、31B dense、26B MoE（3.8B 激活）；**12B 版本 6/3 落地**，适合单卡（约 24GB 显存可跑量化版）。
- 获取：Hugging Face / Ollama（`gemma4`）。
- 适合：本地推理、端侧 / 中小团队微调。

**参照：Mistral Large 3**（Apache-2.0）为 Mistral 自 Mixtral 以来首个 MoE，675B 总参 / 41B 激活；**Llama 4**（Scout 1M、Maverick 10M 上下文）继续占据"超长上下文开源"心智。本周二者无新版本。

---

## 【模块三】热门论文精选

> ⚠️ 时间合规：以下论文 arXiv ID 前四位均为 **2606（本月）或 2605（上月）**，逐篇核验通过。方法部分为重点，数字均取自论文摘要 / 原文。

### 🧠 大语言模型 / 推理能力

**Rethinking RL for LLM Reasoning: It's Sparse Policy Selection, Not Capability Learning**
📄 https://arxiv.org/abs/2605.06241 | 💻 暂未开源 | 机构：多家（跨模型族实验）｜提交 2026-05-07

**问题**
RLVR（以 GRPO/PPO 为代表）已是提升推理的"标准后训练"，但越来越多证据表明：RL 并没有教会模型新策略，只是在 base model 已有的解空间上**重新分配概率质量**。若如此，RL 这套昂贵的在线采样 + 优化回路是否必要本身就成疑——现有工作缺乏 token 级的因果定位来回答"RL 究竟改了哪些位置"。

**方法**
- 跨多个模型族、多种 RL 算法做 **token 级归因分析**，定位 RL 的"有效足迹"。
- 关键发现：RL 的正向作用是一种**稀疏、可预测的修正**，集中在模型不确定该走哪条分支的**高熵决策点**；只有 **1–3% 的 token 位置**被实质改变，且被提升的 token **始终落在 base model 的 top-5 候选之内**。
- 据此把"推理增强"重新表述为**稀疏策略选择（sparse policy selection）**而非能力获取，并提出 **ReasonMaxxer**：一个 RL-free 的极简方法，仅在"熵门控"的决策点施加对比损失（contrastive loss），无需在线 rollout。

**效果**
- ReasonMaxxer 在匹配或超过完整 RL 性能的同时，**只需数十道题、单卡数分钟训练**，训练成本约降低 **3 个数量级**。
- 含义：对算法研究者而言，这是一条"用极小数据 + 监督式对比"替代重型 RL 管线的可复现路径，也为"后训练能否真正增加能力"的争论提供了机制级证据。

### ⚡ 高效推理 / 量化 / 压缩

**KVarN: Variance-Normalized KV-Cache Quantization Mitigates Error Accumulation in Reasoning Tasks**
📄 https://arxiv.org/abs/2606.03458 | 💻 https://github.com/huawei-csl/KVarN（原生 vLLM 后端） | 机构：Huawei（含 Zurich 团队，Müller / Cavigelli 等）｜提交 2026-06-02

**问题**
test-time scaling 让长链推理更强，但**长程解码下 KV-cache 持续膨胀，成为显存瓶颈**。现有 KV-cache 量化方法大多在"类 prefill"设定下评测，而**自回归解码阶段的误差行为完全不同**：作者证明在解码场景下，量化误差会**沿时间步累积**，主因是**错误的 token 尺度（token-scale）**。

**方法**
- 提出 **KVarN**，免校准（calibration-free）的 KV-cache 量化器，核心是两步：
  - **Hadamard 旋转**：沿通道维做旋转混合，把 per-channel 离群值"摊平"分散，避免单通道主导量化误差。
  - **双轴方差归一化（dual-scaling variance normalization）**：在 log 空间交替做列向 / 行向标准差归一化，跨 tile 拉平方差、压缩量化误差——这一步专门修正"离群 token 尺度"。
- 与已有方法的本质区别：不在 prefill 静态分布上做校准，而是直面**解码期误差累积**这一被忽视的 regime；且无需任何校准数据。

**效果**
- 在 **MATH500、AIME24、HumanEval** 等生成式基准上，于 **2-bit 精度**刷新 KV-cache 量化 SOTA；社区复现报告称可在保持 FP16 级精度与吞吐的前提下提供 **3–5× 上下文容量**。
- 工程价值：已实现为 **vLLM 原生后端，一个 flag 启用**，对线上长上下文推理几乎零接入成本。

### 🤖 AI Agent / 工具使用

**ToolChoiceConfusion: Causal Minimal Tool Filtering for Reliable LLM Agents**
📄 https://arxiv.org/abs/2606.06284 | 💻 暂未开源 | 机构：（Babu, Iyer 等）｜提交 2026-06-04

**问题**
工具菜单越大，agent 越不可靠：错调工具、过早动作、token 成本飙升。主流工具选择只优化**语义相关性**——把名字 / 描述与请求匹配的工具都暴露出来。作者指出：**相关 ≠ 必要**，一个工具可能与任务相关，但在当前步骤既非必要也"为时过早"。

**方法**
- 提出 **CMTF（Causal Minimal Tool Filtering）**，免训练，按**因果充分性**而非语义相关性选工具。
- 用轻量的 **precondition-effect 契约**（前置条件—效果）刻画每个工具，只暴露"从当前状态推进到目标所需的**最小下一步工具前沿**"。
- 与 keyword retrieval / state-aware filtering / causal-path 消融逐一对比，度量任务成功率、错调次数、过早动作、工具暴露量与 token 成本。

**效果**
- 主基准：**102 个任务、100 个工具、4 个 LLM 后端、共 2448 次 task-method-model 运行**。
- CMTF 在总体成功率上**追平最强因果基线**，同时把每步可见工具从 **100 个压到 1 个**，相对"全工具暴露"**降低约 90% token 用量**。

**Agent Planning Benchmark (APB): A Diagnostic Framework for Planning Capabilities in LLM Agents**
📄 https://arxiv.org/abs/2606.04874 | 💻 暂未开源 | 机构：（Sun, Cheng 等）｜提交 2026-06-03

**问题**
现有 agent 评测多只报"端到端成功率"，无法区分失败到底来自**规划**还是**执行**。规划（目标分解、选工具、约束推理、判定不可行）缺少专门的诊断基准。

**方法**
- 构建 **APB**：规划专用诊断基准，**4209 个多模态用例、22 个领域、5 种设定**，覆盖整体规划、反馈条件下的逐步规划，以及"冗余工具 / 损坏工具 / 不可解任务"三类鲁棒性压力测试。
- 评测 **12 个 MLLM**，并在 **200 个 ToolSandbox 任务 + 200 个 τ²-bench 任务**上验证。

**效果**
- APB 揭示系统性短板：**长程规划、工具噪声鲁棒性、校准化拒答（calibrated refusal）、推理时自我修正**。
- "APB 引导的修正"在三个代表性模型上**一致提升 plan correctness、plan grade 与下游执行指标**——即作为执行类基准的"上游诊断补充"。

> 同周可一并关注：**RAMPART**（2606.04628，面向 agent 的注册表式可编程记忆）、**Agent libOS**（2606.03895，长时运行、能力受控的 agent 运行时）。

### 👁️ 多模态（图像 / 视频 / 音频）

**LoomVideo: Unifying Multimodal Inputs into Video Generation and Editing**
📄 https://arxiv.org/abs/2606.06042 | 💻 暂未开源 | 机构：北大 / 阿里等（Wu, Jiang 等）｜提交 2026-06-04

**问题**
统一视频生成 + 编辑模型多依赖 13B 以上大模型，且为支持"源视频条件编辑"普遍采用 **token 拼接**——这会使序列长度翻倍、把 self-attention 复杂度推到平方级，开销难以承受。

**方法**
- **5B 参数**统一架构，同时做生成与编辑：
  - 用 **MLLM 替换标准文本编码器**，配合 **Deepstack 注入**把 MLLM 多层特征对齐到 DiT。
  - **零开销 Scale-and-Add 条件注入**：把干净源视频 latent 缩放后**直接加到**带噪目标 latent 上，**彻底取消 token 拼接**，在保持复杂非刚性编辑能力的同时大幅降算力。
  - **Negative Temporal RoPE** 处理多张参考图。
- 与已有方法的本质区别：编辑条件不再"拼进序列"，而是"加进 latent"——这是降本的关键设计。

**效果**
- 紧凑的 5B 模型在多项综合基准上达到 **SOTA 或高度竞争**，电商 / 时尚生成场景尤其突出。
- 受益于零开销条件机制，相对同等能力模型推理**至少加速 5.41×**。

> 同方向可关注：**Inference-Time Scaling for Joint Audio-Video Generation**（2606.03183，首个面向音视频联合生成的推理时扩展研究，强调多 verifier 框架）、**AdaCodec**（2606.02569，面向视频 MLLM 的预测式视觉编码 P-token）。

### 🦾 具身智能 / 机器人

**TempoVLA: Learning Speed-Controllable Vision-Language-Action Policies**
📄 https://arxiv.org/abs/2606.06491 | 💻 暂未开源 | 机构：人大 / UNC / 港大等（Jing, Ding 等）｜提交 2026-06-04

**问题**
机器人操作在"低风险转移段（要快）"与"高风险接触段（要慢且精）"之间交替，但现有 VLA **只能继承训练演示里的单一固定速度**。此前的加速手段（模型压缩、KV-cache 复用、RL）只是把策略从一个固定速度换到另一个固定速度，**对"减速"几乎没有探索**。

**方法**
- 关键观察：**每个预测动作的幅值本身就决定机器人走多快**——这给"可控执行速度"开了一条直接通路。
- 单一 VLA 模型，由一个**显式条件**控制执行速度。
- 数据侧 **VSTA（Variable-Speed Trajectory Augmentation）**：通过合并 / 拆分动作把演示**重定时到任意目标速度**，同时保持运动语义不变，从而让模型学到"同一任务的快 / 慢两端"。

**效果**
- 论文给出在标准操作任务上"按风险分段自适应快慢"的可控性结果（详见原文实验），核心贡献是把"执行速度"从隐式固定项变为**可显式调控的策略维度**，对接触密集型精细操作尤为关键。

> 同方向综述可参考：**From Human Videos to Robot Manipulation**（2606.00054，用以人为中心的视频数据做可扩展 VLA 学习）。

### 🔬 AI for Science

**DeltaDiff: Training-Free, Physics-Guided Machine Learning for Predicting Mutant Protein Structures**
📄 https://arxiv.org/abs/2606.04452 | 💻 暂未开源 | 机构：（Cai, Wang, Chen）｜提交 2026-06-03

**问题**
突变体蛋白结构对理解突变的机制作用至关重要，但实验表征与传统理论建模都昂贵耗时。直接用结构预测模型处理"单点 / 少点突变"很难，因为**突变序列与野生型高度相似**，模型往往"看不出差别"。

**方法**
- 提出 **DeltaDiff**：一个**训练-free 的物理引导推理框架**，把"突变感知的物理引导（mutation-aware physical guidance）"注入一个**基线扩散模型**，无需对基线模型重训或微调。
- 与已有方法的本质区别：不靠"再训练专门的突变模型"，而是在**推理阶段**用物理先验引导扩散采样去捕捉突变诱导的构象变化。

**效果**
- 在三个代表性体系上评测：**Chignolin T8P、Novispirin G-10、BBL D162N**——三者都涉及**非局域结构变化**，是公认的硬骨头。
- DeltaDiff 在不重训 / 不微调的前提下**捕捉到关键的突变诱导构象变化**，以远低于传统方法的成本实现突变体结构预测，为理性突变设计提供了可扩展路径。

---

## 【模块四】开源项目周榜

> 数据来源：GitHub Trending 实时快照（抓取于 **2026-06-08 ~01:18 UTC**）。GitHub Trending 默认给出"当日新增 star"，下列为该快照的真实今日增量；当周累计普遍为其数倍。仅筛选 AI / Agent 相关项目。

**[Lum1104 / Understand-Anything](https://github.com/Lum1104/Understand-Anything) ⭐ 今日 +4,697**
- 把任意代码库转成可探索 / 可搜索 / 可问答的交互式知识图谱，适配 Claude Code、Codex、Cursor、Copilot、Gemini CLI。
- 上手难度：⭐⭐☆ 中等
- 适用场景：大型陌生代码库的快速理解与导览。

**[affaan-m / ECC](https://github.com/affaan-m/ECC) ⭐ 今日 +1,915**
- "agent harness 性能优化系统"：为 Claude Code / Codex / OpenCode / Cursor 提供 skills、instincts、memory、security 与 research-first 工作流。
- 上手难度：⭐⭐☆ 中等
- 适用场景：给现有编码 agent 叠加记忆 / 安全 / 技能层。

**[rohitg00 / ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) ⭐ 今日 +2,155**
- 从零手撕 AI Engineering 的实战教程（Learn it. Build it. Ship it）。
- 上手难度：⭐☆☆ 简单
- 适用场景：系统补齐 AI 工程化能力。

**[anthropics / knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) ⭐ 今日 +1,718**
- Anthropic 官方开源的知识工作者插件库（面向 Claude Cowork）。
- 上手难度：⭐☆☆ 简单
- 适用场景：把 Cowork 接入日常知识工作流。

**[Leonxlnx / taste-skill](https://github.com/Leonxlnx/taste-skill) ⭐ 21,891（今日 +1,430）**
- 一个"给 AI 审美"的 skill 文件，抑制模型生成空洞、套路化内容。
- 上手难度：⭐☆☆ 简单
- 适用场景：提升 LLM 写作 / 文案输出质量。

**[mukul975 / Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) ⭐ 今日 +880**
- 754 个结构化网络安全 skill，映射 MITRE ATT&CK / NIST CSF 2.0 / ATLAS / D3FEND / NIST AI RMF；Apache 2.0。
- 上手难度：⭐⭐☆ 中等
- 适用场景：安全运营 agent、合规对齐。

**[hardikpandya / stop-slop](https://github.com/hardikpandya/stop-slop) ⭐ 5,050（今日 +539）**
- 去除 AI 行文"机翻味 / 八股味"的 skill 文件。
- 上手难度：⭐☆☆ 简单
- 适用场景：润色 LLM 生成文本。

**[thedotmack / claude-mem](https://github.com/thedotmack/claude-mem) ⭐ 今日 +352**
- 跨会话持久记忆：捕获 agent 会话过程并用 AI 压缩，再把相关上下文注入后续会话；适配 Claude Code、OpenClaw、Codex、Gemini、Copilot、OpenCode 等。
- 上手难度：⭐⭐☆ 中等
- 适用场景：长期项目的 agent 记忆持久化。

> 趋势观察：本周榜单几乎被 **"Claude Code / 多 agent 通用 skill 与 harness"** 主题包揽（Understand-Anything、ECC、taste-skill、stop-slop、claude-mem、knowledge-work-plugins）——agent 生态的竞争正从"模型"下沉到"技能 / 记忆 / 工具治理"这一层。

---

## 【模块五】行业动态简报

> 时间线聚焦 2026-06-01 → 06-08 的可核实事件；个别近月里程碑作为背景标注。

- 📅 **05/31–06/01｜[产品 / 开源] NVIDIA 在 GTC Taipei 发布 Cosmos 3**：首个开放前沿物理 AI 世界基础模型，Super / Nano 双版本即时开放权重（OpenMDW-1.1）。（[NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai) / [Axios](https://www.axios.com/2026/06/01/nvidia-ai-push-cosmos-3-world-model)）
- 📅 **06/01｜[产品 / 竞争] 微软与谷歌入局 AI 编码模型**，正面挑战 Anthropic 与 OpenAI 在 coding 赛道的统治。（[CNBC](https://www.cnbc.com/2026/06/01/microsoft-and-google-take-on-anthropic-and-openai-in-ai-coding-models.html)）
- 📅 **06/02｜[开源 / 研究] Huawei 开源 KVarN**：原生 vLLM KV-cache 量化后端，2-bit 下刷新 SOTA。（[arXiv](https://arxiv.org/abs/2606.03458) / [GitHub](https://github.com/huawei-csl/KVarN)）
- 📅 **06/03｜[开源] Google 放出 Gemma 4 12B**（Apache-2.0），补齐家族单卡甜点尺寸。
- 📅 **本周｜[资本 / IPO] Anthropic 据报申请 IPO**，估值传超 1 万亿美元；其 run-rate 收入已从 2025 年底约 90 亿美元升至约 300 亿美元级别。（[周报汇总](https://medium.com/@davidakpovi/ai-news-week-of-june-1-to-june-7-2026-7957940c805a)）
- 📅 **本周｜[企业] OpenAI 成立专注大型商用客户的企业部署公司**，推进商业化落地。（[MarketingProfs 周回顾](https://www.marketingprofs.com/opinions/2026/54909/ai-update-june-5-2026-ai-news-and-views-from-the-past-week)）
- 📅 **本周｜[机器人 / 自动驾驶] Uber × WeRide × AVOMO 在西班牙马德里启动该国首个商业 Robotaxi 服务**；同期 BYD 宣布进军人形机器人。（[同上周报]）
- 📅 **背景｜[政策] 欧盟 AI 法案"Digital Omnibus"** 于 5/7 达成临时协议，意在简化合规、降低落地摩擦；但业界仍抱怨缺乏明确"合规检查器"、高风险条款界定模糊。（[EU AI Act 月报](https://blog.mean.ceo/eu-ai-act-news-june-2026/)）
- 📅 **背景｜[算力] Anthropic × Google × Broadcom** 4/6 公布多吉瓦级 TPU 合作（含 3.5 GW，2027 起上线）。（[TechCrunch](https://techcrunch.com/2026/04/07/anthropic-compute-deal-google-broadcom-tpus/)）

---

## 【模块六】中文社区热点

> 来源：量子位、机器之心、新智元、知乎「人工智能」话题及 AI 早报等本周讨论。

**话题一：NVIDIA Cosmos 3 与"物理 AI 开源底座"**
- 为什么热：frontier 级世界模型首次全量开源权重 + 数据，被视为具身智能 / 自动驾驶数据飞轮的"公共地基"。
- 主要观点分歧：乐观方认为这会像当年 Llama 之于 NLP 一样催生一波物理 AI 创业；谨慎方认为 20T token 级的世界模型微调门槛与算力成本仍把多数团队挡在门外。
- 代表性内容：[NVIDIA 官方博客](https://blogs.nvidia.com/blog/cosmos-3-physical-ai-open-world-foundation-model/)

**话题二："后训练到底能不能增加能力"**
- 为什么热：与本周《Rethinking RL for LLM Reasoning》(2605.06241) 的结论共振——社区热议"RL 只是把 base model 已有的解重新排序，要真正长能力必须重新预训练"。
- 观点分歧：一派认为这宣判了重型 RLHF/RLVR 管线的"性价比死刑"；另一派强调 RL 在对齐、稳健性与可控性上的价值无法被纯监督替代。
- 代表性内容：[arXiv 2605.06241](https://arxiv.org/abs/2605.06241)

**话题三：国产开源"4 月底以来的密集发版"如何选型**
- 为什么热：DeepSeek V4-Pro / V4-Flash、Qwen 3.6、Kimi K2.6、GLM-5.1、MiniMax M2.7 在短窗口内集中放出，开发者在"编码 / 长文 / 多语言 / 成本"维度上反复横评。
- 实务共识：编码选通义灵码 / DeepSeek Coder / Kimi；长文档选 Kimi；多语言与全球部署选 Qwen；日常免费选智谱 GLM-4.7-Flash。
- 代表性内容：[量子位](https://www.qbitai.com/) / [知乎国内外大模型盘点](https://zhuanlan.zhihu.com/p/670574382)

**话题四：闭源旗舰"发布前夜"的预期博弈**
- 为什么热：GPT-5.6、Gemini 3.5 Pro、Claude Mythos 三线同时"蓄势"，社区围绕谁先落地、谁在 agentic coding 上更强展开押注。
- 观点分歧：有人认为闭源仍将靠 agent / 工具链拉开身位；也有人认为开源（DeepSeek/Qwen/Cosmos）正快速抹平差距。
- 代表性内容：[知乎 AI 早报 2026-06-02](https://zhuanlan.zhihu.com/p/2045078283709149281)

---

## 【模块七】本周实用工具推荐

**KVarN**（https://github.com/huawei-csl/KVarN）
- 解决什么问题：长上下文 / 长链推理时 KV-cache 爆显存；2-bit 量化又怕掉点。
- 如何快速上手：① `pip` 安装后在 vLLM 启动时加上 KVarN 的单个 flag；② 直接跑你的长上下文负载，享受约 3–5× 上下文容量且近 FP16 精度。
- 适合：开发者（LLM 服务 / 推理工程）。
- 费用：免费开源。

**智谱 GLM-4.7-Flash**（https://bigmodel.cn）
- 解决什么问题：想要稳定、免费、国内直连的对话 / 文本 / 代码辅助 API。
- 如何快速上手：① 注册 bigmodel.cn 获取 API Key；② 选择 `glm-4.7-flash` 模型即可调用。
- 适合：两者皆可（开发者 + 非技术用户）。
- 费用：永久免费不限量（旗舰版另计费）。

**Ollama**（https://ollama.com）
- 解决什么问题：本地一行命令跑开源模型，数据不出本机。
- 如何快速上手：① 装好后执行 `ollama run gemma4`（或 `qwen`、`deepseek-r1` 等）；② 直接对话或通过本地 REST API 接入应用。
- 适合：开发者（注重隐私 / 离线）。
- 费用：免费（消耗本地算力）。

**Google Gemini API（免费层）**（https://ai.google.dev）
- 解决什么问题：低成本做原型，免费额度在主流闭源里最慷慨。
- 如何快速上手：① 在 AI Studio 用 Google 账号生成 API Key；② 调用 Flash 模型（未付费 Key 约每天 250 次、10 次/分钟；认证账户可达约每天 1000 次）。
- 适合：开发者。
- 费用：免费额度 + 按量付费（如 Gemini 3.5 Flash \$1.50 / \$9.00 每百万 token）。

**NVIDIA Cosmos 3（开放权重）**（https://www.nvidia.com/en-us/ai/cosmos/）
- 解决什么问题：机器人 / 自动驾驶缺高质量世界模型与合成数据。
- 如何快速上手：① 从 NGC / Hugging Face 下载 Nano 版做亚秒级世界生成试跑；② 用 Super 版 + 自有演示数据做策略 / 合成数据后训练。
- 适合：开发者（具身智能 / 自动驾驶 / 仿真）。
- 费用：免费开源（OpenMDW-1.1）。

---

## 【数据源与生成说明】

- **报告生成时间**：2026-06-08 ~01:18 UTC（北京时间 09:18 左右）。
- **论文 arXiv ID 覆盖范围**：主收录 **2606.00001 – 2606.06500** 区间（截至 6 月 4 日提交），并纳入 1 篇高相关的上月论文 **2605.06241**；所有收录论文 ID 前四位均经逐篇核验为 2606 或 2605。
- **主要数据来源**：
  - 论文：arXiv（cs.CL / cs.AI / cs.LG / cs.CV / cs.RO、physics.chem-ph）、Hugging Face Daily Papers。
  - 模型：NVIDIA Newsroom / Blog、Google（Gemini / Gemma）、Anthropic News、各厂商官网，及 llm-stats / codersera 等横评。
  - 开源项目：GitHub Trending 实时快照（2026-06-08）。
  - 行业 / 社区：CNBC、TechCrunch、Axios、MarketingProfs 周回顾、量子位、机器之心、新智元、知乎。
- **数据截止时间**：2026-06-08 约 01:18 UTC。
- **可靠性提示**：GitHub star 为当日实时增量快照（非当周累计）；闭源旗舰（GPT-5.6 / Gemini 3.5 Pro / Claude Mythos）截至发稿尚未正式 GA，相关表述基于官方预告与公开预测市场，请以官方发布为准。

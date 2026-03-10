# 🤖 AI 技术周报 · 2026 年第 10 周（3 月 1–8 日）

---

## 【模块一】本周导读

- 🔴 **CoT 是"表演"还是"真实推理"？** Reasoning Theater（2603.05488）用激活探针发现：在大量简单问题上，DeepSeek-R1 和 GPT-OSS 的 CoT 生成阶段早在最终答案输出前就已固化内部信念，后续 token 是"表演性"延续而非真实推理。这一发现让"CoT 越长越可信"的假设受到根本性质疑，也为推理时剪枝（早退出节省 30–80% token）提供了新方向。
- 🟡 **视频生成进入实时时代：** Helios（北京大学 + 字节跳动）发布 14B 参数的实时视频生成模型，单张 H100 达到 19.5 FPS；RealWonder（Stanford + USC）则将物理仿真与视频 Diffusion 融合，在 480p 分辨率下实现 13.2 FPS 的物理感知视频生成——两者宣告"一秒内出画面"在单卡上成为现实。
- 🟢 **"审查胜于规划"颠覆代码 Agent 设计直觉：** Review Beats Planning（2603.03406）发现，"规划模型 → 代码专家实现"这一主流 Coding Agent 范式在 HumanEval+ 上反而降低 2.4%，而"代码专家先写、推理模型后审"的逆向模式将 pass@1 提升至 90.2%，超越 GPT-4o 和 o1 Preview。Agent 工程师值得重点关注这一实验结论。

**📅 下周预告**
- Meta Llama 4 正式发布窗口（预计 3 月中旬，MoE 架构）
- ICLR 2026 Camera-Ready 截止（3 月 10 日）
- DeepSeek V4 多模态版本预期发布（社区爆料，待官方确认）

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**GPT-OSS / GPT-5.4**（OpenAI，3 月初）
- **亮点**：整合推理、编程与 Operator 桌面操控能力为单一模型端点；OpenAI 同期拿下美国国防部分类网络合同，成为首个进入 DoD 机密环境的商业 LLM。本周多篇 arXiv 论文（包括 Reasoning Theater）将其列为对比基线。
- **访问方式**：API 及 ChatGPT Plus/Pro 订阅。

**Gemini 3.1 Pro**（Google DeepMind，2 月底）
- **亮点**：原生 100 万 token 上下文，ARC-AGI-2 达 77.1%，多模态原生支持（文本/图像/音频/视频/代码）；Gemini Robotics（2503.20020）即基于 Gemini 2.0 延伸至具身 VLA 控制。
- **访问方式**：Google AI Studio、Vertex AI。

---

### ② 国内大模型

**Qwen3.5**（阿里通义，2 月 16 日）
- **是否开源**：是（Apache 2.0）
- **规模**：397B 总参数，17B 激活参数，MoE 架构；原生 256K 上下文，支持 201 种语言，含视觉能力。
- **亮点**：本周已整合进 Ollama、Transformers 等主流推理框架；Math-Vision 基准超越 GPT-5.2；与 DeepSeek 合计全球 AI 市场份额升至 15%（去年同期 1%）。
- **获取方式**：HuggingFace、魔搭（ModelScope）；API ≈ ¥0.5/M token（输入）。

**DeepSeek V4**（深度求索，预计 3 月初发布）
- **是否开源**：社区爆料为是，官方尚未确认
- **规模**：传闻 1T 总参数，32B 激活参数；支持 1M token 多模态上下文（含图像/视频/文本）
- **亮点**：定价约 $0.14/M input tokens，约为 GPT-5 的 1/20；本周国内 AI 社区对其多模态能力预期热度极高。
- **获取方式**：DeepSeek 官网 API（正式发布后）。

**GLM-5 / Ling-Plus**（智谱 + 商汤，2 月发布）
- **是否开源**：Ling-Plus（290B/A28.8B，商汤）开源；GLM-5（744B/A40B，智谱）闭源
- **亮点**：本周 arXiv 论文 "Every FLOP Counts"（2503.05139）详细披露了 Ling-Plus 在受限硬件（无高端 GPU）下的训练优化策略，是 MoE 高效训练的工程参考案例。
- **获取方式**：HuggingFace（Ling-Plus）；智谱 API（GLM-5）。

**春节窗口补录**：Kimi K2.5（月之暗面，视频 + Agent 能力）、豆包 Seed-1.6 系列（字节，含 Seedance 1.0 视频生成）于 2 月集中发布，本周社区对这批模型的使用评测持续涌现。

---

### ③ 其他重要开源模型

**Helios-Base / Helios-Distilled**（北京大学 + 字节跳动，3 月 4 日）
- **规模**：14B 自回归 Diffusion 模型，已开源权重和训练/推理代码
- **最低显存**：80GB（全精度 14B）；量化/Distilled 版本进行中
- **亮点**：单 H100 达 19.5 FPS；支持 T2V、I2V、V2V；无需 KV-cache / 稀疏注意力 / 量化等加速技巧即实现实时推理。
- **获取**：GitHub `PKU-YuanGroup/Helios`；HuggingFace `BestWishYsh/Helios-Base`

**VisionPangu 1.7B**（本周新发布）
- **规模**：1.7B，专注高精度图像描述
- **最低显存**：~4GB
- **亮点**：通过高质量多模态对齐监督在细粒度描述任务上超越多个更大模型，是端侧多模态的有力候选。
- **获取**：HuggingFace（arXiv 2603.04957）

---

## 【模块三】热门论文精选

### 🧠 大语言模型（LLM）/ 推理能力

---

**Reasoning Theater: Disentangling Model Beliefs from Chain-of-Thought**
📄 https://arxiv.org/abs/2603.05488 | 💻 暂未开源 | 🤗 HF ⭐ 621 | 机构：MIT、Anthropic、Redwood Research

**问题**
"CoT 透明地反映了模型的推理过程"是当前可解释性研究的基本假设，但真的如此吗？研究者发现：在 DeepSeek-R1 671B 和 GPT-OSS 120B 上，模型对最终答案的内部信念（通过激活探针检测）往往在 CoT 生成早期就已确定，随后的 token 序列是在"表演"推理——尤其在简单的 MMLU 事实性问题上，此现象最为显著。

**方法**
- **激活探针（Activation Probe）**：在 CoT 生成的每个 token 位置，用线性探针解码 Transformer 残差流中的"最终答案信念"，无需等到模型生成答案 token。
- **强制早退出对比**：在不同位置强制模型输出答案（early exit），与探针读数对比，确认信念固化时间点。
- **CoT 监控器（CoT Monitor）**：对比探针与显式文本监控器的检测灵敏度，发现探针比文本监控器早 2–4 倍检测到信念转变（如"aha moment"）。

**效果**
- 探针在 MMLU 上可比最终答案早 **80%** 的 token 就读出正确答案，GPQA-Diamond 上为 **30%**
- 探针引导的早退出策略在 MMLU 上节省 **80%** token，GPQA-Diamond 节省 **30%**，准确率基本持平
- 消融：信念"转折点"（backtracking/aha 时刻）几乎只出现在激活探针显示大幅信念偏移的样本中，说明 CoT 中的"顿悟"语言并非偶发

---

**∇-Reasoner: LLM Reasoning via Test-Time Gradient Descent in Latent Space**
📄 https://arxiv.org/abs/2603.04948 | 💻 暂未开源 | 🤗 HF ⭐ 412 | 机构：未披露（arXiv 预印本）

**问题**
主流推理时扩展方法（Best-of-N、MCTS、CoT 采样）均在离散 token 空间操作，搜索粒度受词表约束，无法对连续表示空间进行细粒度优化。

**方法**
- **Differentiable Textual Optimization（DTO）**：在 token logits 层面引入可微优化循环，在解码过程中对当前 logit 分布执行小批量梯度下降（以目标奖励函数为损失），让模型在连续潜空间内迭代修正输出分布，而非依赖随机采样的多次尝试。
- 推理时无需修改模型权重，梯度只作用于当前 decoding step 的 logit 缓冲区。
- 与标准 MCTS 的区别：MCTS 在树结构中枚举离散路径；∇-Reasoner 在连续空间中"下山"，搜索效率更高。

**效果**
- 在数学推理（AIME 24）上比 Best-of-N@32 提升 **+6.3%**，推理 token 消耗降低 **42%**
- GPQA-Diamond 提升 **+3.8%**
- 消融：去掉 DTO 退化为贪心解码，性能下降 **−11.2%**，说明梯度优化的核心贡献

---

**Review Beats Planning: Dual-Model Interaction Patterns for Code Synthesis**
📄 https://arxiv.org/abs/2603.03406 | 💻 暂未开源 | 🤗 HF ⭐ 388 | 机构：未披露（arXiv 预印本）

**问题**
当前 Coding Agent 主流设计是"推理模型规划 → 代码专家实现"，直觉上合理，但实测中"先规划再实现"在 HumanEval+ 上比代码专家单独运行反而**降低 2.4%**。这一反直觉结论的成因是什么？

**方法**
系统对比四种双模型交互模式：
- 规划先行（Plan → Code）：推理模型生成伪代码/步骤，代码专家按图实现
- 代码先行+审查（Code → Review）：代码专家自由生成，推理模型做代码审查和错误定位
- 联合规划（Joint）：两模型并行生成，投票选优
- 迭代修正（Iterative Debug）：代码专家生成 → 测试 → 推理模型修复 → 循环

实验跨 GPT-4o（代码专家）+ o1/o3（推理）、Claude Sonnet + Claude Opus、DeepSeek-Coder + DeepSeek-R1 三组模型对。

**效果**
- Code → Review 模式：HumanEval+ pass@1 达 **90.2%**，超越 GPT-4o 单独（87.2%）和 o1 Preview（89.0%）
- Plan → Code 模式：HumanEval+ **84.8%**，低于 GPT-4o 单独 2.4%
- 根因分析：推理模型的规划输出引入了额外的"格式约束噪声"，使代码专家不能自由发挥；而代码专家的自由生成为推理模型审查提供了充分信息

---

### 👁️ 多模态（图像 / 视频 / 音频）

---

**Helios: Real Real-Time Long Video Generation Model**
📄 https://arxiv.org/abs/2603.04379 | 💻 https://github.com/PKU-YuanGroup/Helios | 🤗 HF ⭐ 1,243 | 机构：北京大学、字节跳动、Canva、成都阿努智能

**问题**
当前主流视频生成模型（DiT 类）在单卡上推理速度远低于实时（通常需要数十秒到数分钟生成 few-second 视频），原因是模型参数量大、扩散步数多、注意力计算开销随分辨率平方增长。现有加速技巧（KV-cache、稀疏注意力、量化）各有代价，且难以同时满足长视频 + 高质量 + 实时的三重需求。

**方法**
- **自回归 Diffusion 统一架构**：Helios 以自回归方式逐帧生成，将历史帧高度压缩后作为条件输入，而非全量保留——历史帧压缩率约 **10×**，大幅降低 KV 计算量。
- **无并行化训练**：不依赖模型并行 / 管道并行 / 张量并行，在 80GB GPU 内可同时容纳 4 个 14B 模型实例，使 batch size 达到图像 Diffusion 规模，训练稳定性大幅提升。
- **统一任务表示**：同一模型架构原生支持 T2V（文生视频）、I2V（图生视频）、V2V（视频到视频），无需任务特定微调。
- 无需任何常规加速技巧（KV-cache / 稀疏注意力 / 量化）即达到实时。

**效果**
- 单张 NVIDIA H100：**19.5 FPS**（480p，14B 参数）
- 在 VBench / EvalCrafter 等基准上与 CogVideoX-5B 等强 baseline 持平或更优
- 模型权重（Helios-Base、Helios-Mid、Helios-Distilled）及训练代码已开源

---

**RealWonder: Real-Time Physical Action-Conditioned Video Generation**
📄 https://arxiv.org/abs/2603.05449 | 💻 https://github.com/liuwei283/RealWonder | 🤗 HF ⭐ 567 | 机构：斯坦福大学、南加州大学

**问题**
现有 World Model 类视频生成方法无法真正理解物理规律（只做视觉插值），难以响应具体物理动作（施加力、抓取、移动相机）的实时交互需求，且推理速度远低于实时。

**方法**
- **物理仿真桥接**：不直接让视频模型学习物理，而是引入物理仿真器作为中间层：给定输入图像 → 单图 3D 重建 + 材质估计 → 物理仿真器计算动态演化（光流 + RGB 渲染）→ 蒸馏后的 Diffusion 模型（仅 **4 步**）生成最终视频帧。
- **3D 重建 + 材质估计**：支持刚体、可变形体、流体、颗粒物等四类物理材质的自动识别与参数估计。
- **4 步蒸馏 Diffusion**：通过 Consistency Distillation 将原始多步 Diffusion 压缩至 4 步，实现实时推理。

**效果**
- **13.2 FPS**（480×832 分辨率）
- 支持力施加、机器人抓取、相机移动等多类交互动作
- 在物理准确性评估（PhysScore）和感知质量（LPIPS）上超越 DreamerV3 和 GWM 等 World Model 基线

---

### 🤖 AI Agent / 工具使用 / 代码

---

**Vibe Code Bench: Evaluating AI Models on End-to-End Web Application Development**
📄 https://arxiv.org/abs/2603.04601 | 💻 暂未开源 | 🤗 HF ⭐ 334 | 机构：未披露（arXiv 预印本）

**问题**
现有 Coding Benchmark（HumanEval、SWE-Bench 等）评测孤立函数或单文件任务，无法衡量"从零需求描述到可运行 Web 应用"的全流程能力——即"Vibe Coding"范式。

**方法**
- **100 个 Web 应用规格书**（50 公开验证集 + 50 封闭测试集），覆盖 SaaS 工具、数据可视化、游戏、企业后台等场景。
- **964 个浏览器工作流**，包含 **10,131 个子步骤**，由自主浏览器 Agent 对生成的实际部署应用执行评测（而非静态代码检查）。
- **16 个前沿模型**参与评测，含 GPT-5.4、Claude Opus 4.6、Gemini 3.1、Qwen3.5 等。
- **人类对齐验证**：跨模型和人类标注员的成对对齐研究，发现评估器选择对结果影响显著（步骤级一致率 31.8–93.6%）。

**效果**
- 最优模型测试集准确率仅 **61.8%**，说明端到端 Web 开发是当前 LLM 的重大能力边界
- **自测试**（生成过程中主动运行测试）是性能的最强预测指标（Pearson r = **0.72**）
- 错误分析：最常见失误是 UI 状态管理（30%）和 API 集成边界处理（22%）

---

**AgentIR: Reasoning-Aware Retrieval for Deep Research Agents**
📄 https://arxiv.org/abs/2603.04384 | 💻 暂未开源 | 🤗 HF ⭐ 298 | 机构：未披露（arXiv 预印本）

**问题**
Deep Research Agent（类 Perplexity Deep Research / Gemini Deep Research）的检索质量严重影响最终输出，但现有检索模型（BM25、Dense Retrieval）不理解 Agent 的推理意图——它们只看查询文本的语义相似度，忽略了 Agent 生成查询前的多步推理上下文。

**方法**
- **推理感知检索（Reasoning-Aware Retrieval）**：在每次检索调用前，Agent 先生成一段显式的自然语言推理（"我当前的目标是X，已知Y，需要找到Z"），将该推理上下文编码进检索 query embedding，而非仅用用户原始问题。
- 与标准 RAG 的区别：标准 RAG 用问题文本作为检索 query；AgentIR 用 Agent 当前推理状态的压缩表示，使检索与多步 Agent 任务目标对齐。

**效果**
- 在 FRAMES、MultiHop-RAG、BRIGHT 三个多跳检索基准上，平均提升 **+9.2%**（MRR@10）
- 在 Deep Research 完整流程评测（研究报告质量）上，事实准确率提升 **+12.4%**，幻觉率降低 **−18%**

---

### ⚡ 高效推理 / 量化 / 压缩

---

**Sparse-BitNet: 1.58-bit LLMs are Naturally Friendly to Semi-Structured Sparsity**
📄 https://arxiv.org/abs/2603.05168 | 💻 https://github.com/AAzdi/Sparse-BitNet | 🤗 HF ⭐ 445 | 机构：Microsoft Research、北京大学、华南理工大学

**问题**
1-bit / 1.58-bit 量化（如 BitNet）与 N:M 结构化稀疏（如 NVIDIA 2:4 稀疏）是两条独立的模型压缩路线，将两者结合时通常出现严重的精度损失，且训练稳定性差。

**方法**
- **联合量化+稀疏化训练**：首次在训练阶段同步引入 1.58-bit 量化（三值权重：-1/0/+1）和动态 N:M 稀疏（如 2:4 每组 4 个权重中保留 2 个），通过渐进式稀疏调度（从密集到稀疏逐步过渡）保证训练稳定性。
- **核心发现**：1.58-bit BitNet 天然比 BF16 全精度模型更耐受 N:M 稀疏——在 2:4 稀疏下，BF16 性能下降 **+18.8%**，而 BitNet 仅下降 **+5.7%**，提供了理论解释（三值权重分布使 N:M 选择更均匀）。
- **自定义稀疏张量核**：利用 NVIDIA Sparse Tensor Core 实现联合加速内核。

**效果**
- 训练和推理速度同步提升 **1.30×**（与密集 BitNet 对比）
- 在 perplexity 和下游任务中，Sparse-BitNet 与等计算量的密集基线性能持平
- 消融：去掉渐进式稀疏调度后，训练 loss 发散，说明这一设计的必要性

---

### 👁️ 可解释性 / 对齐 / 安全

---

**MC-Search: Evaluating and Enhancing Multimodal Agentic Search with Structured Long Reasoning Chains**
📄 https://arxiv.org/abs/2603.00873 | 💻 暂未开源 | 🤗 HF ⭐ 267 | 机构：未披露（arXiv 预印本）

**问题**
多模态 Agentic Search（MM-RAG，Agent 自主调用搜索工具获取多模态证据）缺乏专用的评测基准——现有 RAG benchmark 只有单次检索，无法评测多轮搜索 + 跨模态推理链的质量。

**方法**
- **MC-Search 基准**：首个面向 Agentic MM-RAG 的 benchmark，包含 5 类推理链结构（顺序推理、树状推理、循环推理、假设验证、因果链），每个问题附有逐步标注的推理链 ground truth。
- **评测维度**：不仅评最终答案正确性，还评推理链结构合理性、检索必要性、跨模态对齐质量。

**效果**
- 当前最优 Agent 在 MC-Search 上的推理链结构正确率仅 **47.3%**，揭示 MM-RAG 与"真实推理搜索"之间的巨大差距
- 针对该 benchmark 的训练数据扩充方案，使 GPT-4o 上推理链质量提升 **+18.6%**

---

## 【模块四】开源项目周榜

**[Helios](https://github.com/PKU-YuanGroup/Helios) ⭐ 8,400（本周 +8,200，本周新发布）**
- 14B 实时视频生成模型，单 H100 达 19.5 FPS，权重和代码已开源，是本周 GitHub 增速最快的 AI 视频项目
- 上手难度：⭐⭐☆ 中等
- 适用场景：实时视频生成、T2V/I2V 推理、视频生成研究

**[OpenClaw](https://github.com/openclaw/openclaw) ⭐ 250,000（60 天 +241,000，史上增速最快）**
- 开源个人 AI 助手，运行于自有硬件，连接 WhatsApp / Telegram / Slack / Discord / iMessage 等主流渠道；本周 Peter Steinberger 宣布加入 OpenAI，项目将迁入开源基金会
- 上手难度：⭐☆☆ 简单
- 适用场景：个人 AI 助手、私有化部署、多渠道消息统一接入

**[Sparse-BitNet](https://github.com/AAzdi/Sparse-BitNet) ⭐ 3,100（本周 +3,000，本周新发布）**
- Microsoft Research 开源的 1.58-bit + N:M 稀疏联合压缩框架，训推双加速 1.30×
- 上手难度：⭐⭐⭐ 较高（需了解量化+稀疏训练）
- 适用场景：超低比特 LLM 训练、端侧部署、推理加速研究

**[RealWonder](https://github.com/liuwei283/RealWonder) ⭐ 2,800（本周 +2,700，本周新发布）**
- Stanford + USC 开源的实时物理感知视频生成系统，物理仿真 + 4 步 Diffusion，13.2 FPS
- 上手难度：⭐⭐⭐ 较高（依赖物理仿真器配置）
- 适用场景：具身 AI 仿真、机器人 World Model、交互式视频生成

**[Ollama](https://github.com/ollama/ollama) ⭐ 163,200（本周 +2,700）**
- 本地运行 LLM 的标准工具，本周新增 Helios、Qwen3.5、VisionPangu 等模型支持
- 上手难度：⭐☆☆ 简单
- 适用场景：本地推理、离线 AI、开发调试

**[Mem0](https://github.com/mem0ai/mem0) ⭐ 31,200（本周 +2,400）**
- 图数据库驱动的 LLM 持久化记忆层，支持 OpenAI / Anthropic / Ollama；AgentIR 论文验证了推理感知记忆的价值，Mem0 是工程实现的最快路径
- 上手难度：⭐☆☆ 简单
- 适用场景：跨会话记忆 AI 助手、客服 Bot、个人知识库

**[KDFlow](https://github.com/trending) ⭐ 1,900（本周 +1,800，本周新发布）**
- MoE Teacher 模型的知识蒸馏框架，解耦教师推理（SGLang）与学生训练（FSDP2），MoE 教师训练速度提升超 10×
- 上手难度：⭐⭐⭐ 较高（需分布式训练环境）
- 适用场景：MoE 模型蒸馏、大规模 LLM 训练优化

---

## 【模块五】行业动态简报

📅 03/03 | [政治事件] 美国联邦政府（国务院、财政部、HHS）将 AI 合同从 Anthropic 批量转移至 OpenAI，起因是 Anthropic 拒绝为军事自主致命武器系统提供服务；Trump 政府随后下令在六个月内完成全联邦机构的 Anthropic 替换（[technology.org](https://www.technology.org/2026/03/03/us-government-dumps-anthropic-state-treasury-and-hhs-jump-ship-to-openai/)）

📅 03/03 | [产品] Claude 逆势登顶美国 App Store 生产力榜首，失去政府合同反而引发大量 C 端用户对 Anthropic 立场产生认同，形成"负面政治事件 → 正面品牌效应"的罕见转化（[Axios](https://www.axios.com/2026/03/01/anthropic-claude-chatgpt-app-downloads-pentagon)）

📅 03/01 | [政策] 中国工信部正式发布《人形机器人与具身智能标准体系（2026版）》，首个覆盖人形机器人全产业链、全生命周期的国家级顶层设计；2025 年国内整机企业超 140 家，产品超 330 款，整机成本已降至 $2–3 万区间

📅 03/04 | [开源] OpenClaw 项目开发者 Peter Steinberger 宣布加入 OpenAI，项目将迁入开源基金会管理，250,000 stars 历史记录不受影响；OpenClawd 托管平台同步发布重大更新（[Yahoo Finance](https://finance.yahoo.com/news/openclawd-releases-major-platform-openclaw-150000544.html)）

📅 03/03 | [竞争] DeepSeek 和 Qwen 合计全球 AI 市场份额升至 **15%**（去年同期 1%），API 单价约 $0.14/M input tokens，约为 GPT-5 的 1/20（[particula.tech](https://particula.tech/blog/deepseek-v4-qwen-open-source-ai-disruption)）

📅 03/05 | [融资] 全球 AI 行业 2026 年度融资总额突破 **$110B** 里程碑，Agentic 金融工具、信用 AI、具身智能为主要流向；OpenAI 本轮（Amazon / Nvidia / SoftBank 联合）目标估值 $730–850B（[MLQ.ai](https://mlq.ai/news/ai-roundup/2026-03-05/ai-funding-frenzy-hits-110b-milestone)）

📅 03/01 | [产业] 智元机器人主办首届具身智能机器人竞赛正式开启，总奖池 **$53 万**，聚焦操作任务泛化能力评测，倪光南等院士领衔技术委员会

---

## 【模块六】中文社区热点

**话题：CoT 是"表演"？Reasoning Theater 论文引发解释性讨论**
- 为什么热：论文直接挑战"长 CoT = 透明推理"的主流假设，且数据来自 671B DeepSeek-R1 和 120B GPT-OSS，难以以"模型太小"反驳。机器之心、PaperWeekly 均有深度解读，知乎"AI 可解释性"话题下出现大量讨论。
- 主要观点分歧：研究派认为这说明当前 RLHF 训练产生了"表演性 CoT"的对齐副作用，需要在训练层面纠正；工程派认为早退出节省 80% token 的实用价值更直接，可立即用于部署优化；乐观派则认为 CoT 即便部分是表演，对人类审查和调试仍有价值。
- 代表性内容：[arXiv 2603.05488](https://arxiv.org/abs/2603.05488)

**话题：实时视频生成来了，Helios 和 RealWonder 双发**
- 为什么热：两篇论文同在本周发布，Helios 是工程路线（14B 单卡实时），RealWonder 是物理感知路线（4 步 Diffusion），代表视频生成的两条截然不同的技术方向，即刻和小红书出现大量效果对比视频。
- 主要观点分歧：工程派更看好 Helios 的可扩展性（模型已开源，适合微调和商业化）；研究派更看好 RealWonder 的物理理解能力（对具身 AI 和机器人更有意义）；质疑派指出两者的帧率都在人机交互可用的临界线，生成质量仍有提升空间。
- 代表性内容：[Helios GitHub](https://github.com/PKU-YuanGroup/Helios) | [RealWonder GitHub](https://github.com/liuwei283/RealWonder)

**话题："审查胜于规划"——Coding Agent 的反直觉实验**
- 为什么热：Review Beats Planning 的结论直接颠覆了当前大量 Coding Agent 产品的设计假设（很多商业产品都在做"规划→实现"架构），在程序员社区引发"这是不是说明我们的 Agent 架构都错了"的大讨论。
- 主要观点分歧：正方认为推理模型的规划干扰了代码专家的自由发挥，审查分工更符合人类 Code Review 实践；反方认为结论依赖特定的模型组合，换用较弱的代码专家（如开源模型）结论未必成立；中间派认为两种策略都有场景，关键是任务复杂度——简单任务不需要规划，复杂架构设计仍需先规划。
- 代表性内容：[arXiv 2603.03406](https://arxiv.org/abs/2603.03406)

**话题：国内具身智能热度持续升温，政策+资本+技术三驾马车齐发**
- 为什么热：工信部标准体系、智元机器人 $53 万竞赛、国内多家具身 AI 初创获融资，加上本周具身相关论文（EmCoop、Keyframe RL 等）集中出现在 arXiv，量子位和 AIbase 持续追踪具身赛道。
- 代表性内容：[工信部标准体系原文](https://www.miit.gov.cn/) | [智元竞赛公告](https://m.163.com/dy/article/KMSPKL0A0550WHYR.html)

---

## 【模块七】本周实用工具推荐

**[Helios 推理框架](https://github.com/PKU-YuanGroup/Helios)**
- 解决什么问题：本周新发布的实时视频生成工具，支持 T2V/I2V/V2V，14B 参数单 H100 达 19.5 FPS，适合需要快速出视频原型的研究和工程团队。
- 如何快速上手：`git clone github.com/PKU-YuanGroup/Helios`，按 README 配置依赖，使用 Helios-Distilled 权重可在更低显存下运行。
- 适合：研究者、视频生成工程师
- 费用：完全开源免费；GPU 成本自理

**[AgentIR 检索增强模式](https://arxiv.org/abs/2603.04384)**（工程模式参考，非工具包）
- 解决什么问题：让 Deep Research Agent 的检索质量大幅提升——在调用搜索 API 前，让 Agent 先输出一段显式推理，再将推理上下文编码进检索 query，提升多跳检索准确率 9.2%。
- 如何快速上手：在现有 RAG 管线中，在构建检索 query 前插入一个"推理步骤"prompt，如 `"当前任务目标：{goal}，已知信息：{context}，需要检索："`，将整段作为 query embedding 输入。
- 适合：开发者（构建 Deep Research Agent）
- 费用：工程模式参考，不额外收费

**[KDFlow 知识蒸馏框架](https://github.com/trending)**
- 解决什么问题：MoE 大模型作为教师进行蒸馏时，传统框架速度极慢（36s/it），KDFlow 通过 SGLang 驱动教师推理、FSDP2 驱动学生训练，速度提升超 10×。
- 如何快速上手：替换现有蒸馏框架中的教师推理后端，无需修改模型架构。
- 适合：开发者（做模型压缩和蒸馏）
- 费用：开源免费；需多卡环境

**[Jina Reader API](https://jina.ai/reader)**
- 解决什么问题：将任意网页（包括 arXiv 论文页）转化为 LLM 友好的干净 Markdown，适合构建论文追踪 RAG 管线。
- 如何快速上手：在目标 URL 前加 `https://r.jina.ai/`，如 `https://r.jina.ai/https://arxiv.org/abs/2603.05488`，直接返回 Markdown。
- 适合：开发者
- 费用：每天 200 次免费；付费版 $0.02/1,000 次

**[秘塔 AI 搜索](https://metaso.cn)**
- 解决什么问题：国内可用的无广告 AI 搜索引擎，直接生成带来源的长答案，快速定位国内论文和产业信息。
- 如何快速上手：访问 metaso.cn，选"详细"模式，输入论文标题或技术问题。
- 适合：两者皆可
- 费用：基础版免费；Pro 版 ¥49/月

---

## 数据源与生成说明

- **报告生成时间**：2026 年 3 月 8 日（周日）
- **数据截止时间**：2026 年 3 月 7 日 24:00 CST
- **论文 arXiv ID 范围**：本期重点覆盖 2603.00001–2603.05499（2026 年 3 月 1–5 日提交），兼收 2602.xxxxx（2026 年 2 月末）
- **主要数据来源**：arXiv cs.CL / cs.AI / cs.LG / cs.CV / cs.RO，Hugging Face Daily Papers（via 搜索），Papers With Code，GitHub Trending，llm-stats.com，Bloomberg，TechCrunch，Axios，CNBC，technology.org，MLQ.ai，particula.tech，新浪财经，MarkTechPost，量子位，机器之心，AIbase

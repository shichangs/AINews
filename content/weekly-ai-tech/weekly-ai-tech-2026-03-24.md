# AI 技术周报 · 2026 年第 12 周（03/18–03/24）

> 面向算法研究员的高密度技术摘要，聚焦论文机制、模型能力与产业动态。

---

## 【模块一】本周导读

- 🔴 **最重要的变化：** RLVR 训练范式正在经历系统性反思。本周多篇 arXiv 论文（2603.09117、2603.08660、2603.10535）从不同角度指出 RLVR/GRPO 的根本性缺陷——校准退化、无监督可扩展性上限、奖励长度通胀——并提出针对性修正机制。这标志着社区从"照单全收 RLVR"进入"批判性改良 RLVR"的新阶段。

- 🟡 **值得关注但尚未明朗的趋势：** DeepSeek V4 持续"跳票"，已错过多个预期窗口（截至 3/23 仍未发布），但"V4 Lite"已于 3/9 悄然上线；国内开源模型（Qwen 3.5 / GLM-5 / Kimi K2.5）在 Chatbot Arena 排行榜挤入全球前三，开源/闭源性价比差距正在急剧压缩。

- 🟢 **对开发者/研究者最有实际价值的内容：** 高效推理方向出现多个可落地工具：ZipServ（无损压缩加速 vLLM 推理 1.22×）、TTQ（无需微调的测试时量化）、BEAVER（结构感知 Prompt 压缩）；同时 Gemini Code Assist 本月起对开发者免费开放，MiMo-V2-Pro API 提供一周免费额度。

**下周预告：**
1. DeepSeek V4 正式版被多方信源预测将于本月底发布（已存在 V4-Lite 测试版），若发布将是本季度最重要的开源事件。
2. ICLR 2026 将于 4 月底召开，大批论文将提前上线。
3. OpenAI 据报道正在测试 GPT-5.4 的「Computer Use API」公开版，预计 4 月上旬向开发者开放。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**GPT-5.4（OpenAI）**
- **核心能力亮点：** 1M token 上下文，支持自主执行多步工作流（OSWorld-V benchmark 75%），5 档推理力度控制（quick → deep），新增 Computer Use API 用于桌面任务自动化。
- **与上一代对比：** GPT-5 的扩展版，coding 与 agent 任务均有提升，SWE-Bench Verified 达 77.2%（GPT-5 约 72%）。
- **定价/访问：** 输入 $2.50/M tokens，输出 $15/M tokens；标准 ChatGPT Plus 用户可访问，API 公开。
- **适合用户：** 需要桌面自动化、长上下文工作流的企业级开发者。

**Claude Opus 4.6（Anthropic）**
- **核心能力亮点：** SWE-Bench Verified 80.8%（高于 GPT-5.4 的 77.2%），1M token 上下文，支持 Agent Teams（多智能体协作）、Adaptive Thinking 和 Effort Control。
- **与上一代对比：** Opus 4.6 首次为 Opus 级别模型提供 1M 上下文（前代为 200K），coding precision 全球第一。
- **定价/访问：** 输入 $5/M tokens，输出 $25/M tokens；Claude Pro 用户可访问。
- **适合用户：** 需要最高代码精度和复杂推理的研究人员。

**Gemini 3.1 Pro / Flash-Lite（Google DeepMind）**
- **核心能力亮点：** GPQA Diamond 94.3%（全球最高），ARC-AGI-2 77.1%，支持全视频处理和 24 语言语音，1M 上下文。Flash-Lite 定价 $0.25/M input tokens，响应速度比前代提升 2.5×。
- **与上一代对比：** Gemini 3.1 Pro ARC-AGI-2 得分超 Gemini 3 Pro 一倍，推理能力大幅跃升。
- **定价/访问：** Pro 版输入 $2/M tokens，输出 $12/M tokens；Flash-Lite $0.25/$0.75。
- **适合用户：** 成本敏感的生产环境部署、多模态任务、长文档处理。

---

### ② 国内大模型（含开源与闭源）

**Kimi K2.5（月之暗面 Moonshot AI）** ⭐ 本周焦点
- **是否开源：** 是（Modified MIT License）
- **核心能力亮点：** 1T 参数 MoE 架构，在约 15T 混合视觉-文本 token 上持续预训练，支持 K2.5 Instant / Thinking / Agent / Agent Swarm 四种运行模式；Agent Swarm 模式最多可自主调度 100 个并行子智能体，每个子智能体独立使用工具执行搜索、生成、分析任务。GPQA Diamond 达 87.6%，Chatbot Arena ELO 1447（全球第二）。
- **与国际同类对比：** GPQA Diamond 仅略低于 Qwen 3.5（88.4%），在代理任务上接近 Claude Opus 4.6；但以开源免费形式提供，具有显著性价比优势。
- **获取方式：** GitHub（MoonshotAI/Kimi-K2.5）、HuggingFace（moonshotai/Kimi-K2.5），API 通过 platform.moonshot.ai 访问。

**Qwen 3.5（阿里通义）**
- **是否开源：** 是（Apache 2.0）
- **参数规模：** 397B 总参数 / 17B 激活参数（MoE）
- **核心能力亮点：** GPQA Diamond **88.4%**（全球开源最高），IFEval 92.6%，SWE-Bench 76.4%；Qwen 3.5 Small（更小版本）在 GPQA Diamond 上已追平 120B 级别模型；2B 变体可在搭载 4GB RAM 的 iPhone 上离线运行。
- **与国际同类对比：** GPQA Diamond 超过 GPT-5.4（92.8%？注：该指标 Gemini 3.1 Pro 以 94.3% 领先，Qwen 3.5 在开源模型中居首）。指令跟随（IFEval 92.6%）超过多数闭源模型。
- **获取方式：** HuggingFace（Qwen/Qwen3.5-397B-A17B），Ollama 可运行较小变体。

**GLM-5（智谱 AI）**
- **是否开源：** 是
- **参数规模：** 744B 总参数 / 40B 激活参数（MoE）
- **核心能力亮点：** SWE-Bench Verified ~77.8%，Terminal-Bench ~56.2，Chatbot Arena ELO **1451**（全球最高，以人类偏好为标准居首）；超大上下文窗口，coding 和 agentic 任务表现突出。
- **与国际同类对比：** Chatbot Arena 人类偏好评分超过 GPT-5.4、Claude 4.6、Gemini 3.1 Pro，在真实用户评测中占据首位。
- **获取方式：** HuggingFace（THUDM/GLM-5），API 通过 bigmodel.cn 访问。

**MiMo-V2-Pro（小米 MiMo 团队）** ⭐ 本周新发布
- **是否开源：** 部分开源（MiMo-V2-Flash 开源，V2-Pro 和 V2-Omni 商业 API）
- **参数规模：** 1T 参数，专为 Agentic 工作流设计
- **核心能力亮点：** coding 能力超越 Claude Sonnet 4.6，Agent 任务接近 Claude Opus 4.6，API 成本仅为 Opus 4.6 的 33%；此前以"Hunter Alpha"匿名测试身份在 OpenRouter 上累计运行 1T tokens。同步发布 MiMo-V2-Omni（全模态）和 MiMo-V2-TTS（语音合成）。
- **获取方式：** API 通过 platform.xiaomimimo.com 访问，发布后一周内免费；GitHub: XiaomiMiMo/MiMo-V2-Flash（Flash 版本开源）。

**DeepSeek V3.2（DeepSeek）**
- **是否开源：** 是（MIT）
- **核心能力亮点：** SWE-Bench Verified 73.1%，在中文知识、代码生成方面维持领先，DeepSeek Chat 网页端持续高并发运行。
- **说明：** DeepSeek **V4 截至 3/23 仍未正式发布**（V4 Lite 于 3/9 已上线），预计 V4 将采用约 1T 参数 MoE，集成多模态预训练，百万 token 级上下文准确率达 97%。V4 正式发布将是近期最大事件，持续关注。

**Seedance 2.0（字节跳动豆包团队）**
- **是否开源：** 否
- **核心能力亮点：** 音视频联合生成架构，支持文本/图像/音频/视频多模态输入，具备导演级镜头控制和物理真实感渲染，可生成带有原生音频的电影级视频。
- **重要动态：** 由于生成了涉及 Tom Cruise、Brad Pitt 等真人演员的 deepfake 视频，遭好莱坞主要制片公司（包括 Disney）发出停止函，ByteDance 已暂停其全球扩张计划（仅向中国用户开放国内剪映 App）。

---

### ③ 其他重要开源模型

**Llama 4（Meta AI）**
- **说明：** Meta 已确认 Llama 4 处于测试阶段，本周无重大独立发布，期待 Q2 2026。

**本周无其他重大开源基础模型发布**（Mistral、Phi、Gemma 系列本周均无新版本）。

---

## 【模块三】热门论文精选

> arXiv ID 覆盖范围：2603.XXXXX（2026年3月），全部经过时间验证。

---

### 🧠 大语言模型（LLM）/ 推理与训练

---

**Decoupling Reasoning and Confidence: Resurrecting Calibration in Reinforcement Learning from Verifiable Rewards**
📄 [arXiv:2603.09117](https://arxiv.org/abs/2603.09117) | 💻 暂未开源 | 机构：未明确

**问题**
RLVR（如 GRPO）在显著提升 LLM 推理准确率的同时，引发严重的校准退化（calibration degeneration）：模型对错误答案的置信度异常偏高（过度自信），而理论分析表明这源于准确率优化目标（policy gradient）与校准误差最小化目标（ECE）之间存在根本性的梯度冲突——二者梯度方向相反，标准 RLVR 框架在单目标优化下无法同时满足两者。

**方法**
- 提出 **DCPO**（Decoupled Confidence-Policy Optimization），将推理（accuracy）与置信度（calibration）解耦为两个独立的优化目标并行训练
- 推理头继续使用 GRPO 式的 verifiable reward 训练；置信度头通过对模型输出分布施加额外约束（calibration loss）独立优化
- 关键设计决策：使用正交投影梯度手术（gradient surgery）确保两个目标的梯度不相互干扰，避免原始 GRPO 的梯度消除问题

**效果**
- 在数学推理 benchmark 上准确率与标准 GRPO 持平
- Expected Calibration Error（ECE）大幅降低，显著缓解过度自信问题
- 消融实验证明，去掉梯度解耦模块后 ECE 退化至 GRPO 水平

---

**How Far Can Unsupervised RLVR Scale LLM Training?**
📄 [arXiv:2603.08660](https://arxiv.org/abs/2603.08660) | 💻 暂未开源 | 机构：未明确

**问题**
标准 RLVR 依赖人工标注的可验证答案（ground truth label）作为奖励信号，这形成了一个监督瓶颈——高质量标注稀缺、难以大规模扩展。无监督 RLVR（URLVR）尝试在没有 ground truth 的情况下派生奖励信号，但其可扩展性边界和失效机制尚不清晰。

**方法**
- 将 URLVR 方法系统分类为两大类：**内在奖励**（intrinsic rewards，基于模型自身置信度/熵/一致性）和**外部奖励**（external rewards，基于外部模型或系统评判）
- 建立统一理论框架：证明所有内在奖励方法在数学上等价于对模型初始分布进行**尖锐化**（sharpening）——当初始置信度与正确性对齐时，尖锐化有效提升准确率；但当初始置信度与正确性错位时，尖锐化会灾难性强化错误。
- 通过大规模实验验证：内在奖励方法的训练曲线呈现**先升后降**（rise-then-fall）的规律性现象，崩溃时间点由模型先验质量决定，与工程选择（学习率、batch size）无关

**效果**
- 系统性实验跨越多种内在/外部 URLVR 方法，验证理论预测的崩溃模式
- 外部奖励方法（如用强模型作 judge）具备更强的可扩展性，但引入新的分布偏移问题
- 结论：URLVR 存在固有上限，无法完全替代 ground-truth 监督，为社区合理规划标注资源提供理论依据

---

**Tackling Length Inflation Without Trade-offs: Group Relative Reward Rescaling for Reinforcement Learning**
📄 [arXiv:2603.10535](https://arxiv.org/abs/2603.10535) | 💻 暂未开源 | 机构：未明确

**问题**
GRPO 训练中存在长度通胀（length inflation）问题：模型倾向于生成冗长推理链以获取更高奖励，因为更长的输出在 verifiable reward 框架下往往与更高准确率相关。已有长度惩罚方法（如 length penalty term）在抑制长度的同时会损害准确率，存在精度-长度 trade-off。

**方法**
- 提出 **GR3**（Group Relative Reward Rescaling），通过对 GRPO 奖励进行组内相对尺度变换，在不引入额外惩罚项的情况下调节推理长度
- 核心：将每个 rollout group 的奖励按照组内长度分位数进行 multiplicative 重缩放，使得同等准确率下较短答案获得更高归一化奖励
- 区别于现有方法：不在奖励函数中直接减去长度惩罚（加法式）而使用乘法式相对重缩放，保持奖励分布的 group-relative 特性，与 GRPO 的 clip-norm 机制兼容

**效果**
- 在 RLHF 和 RLVR 两种设置下，GR3 生成的输出长度显著短于标准 GRPO（具体缩减百分比未披露）
- 同时准确率（downstream accuracy）与标准 GRPO 持平，验证"无 trade-off"声明
- 消融实验证明组内相对归一化是关键，去掉后效果退化至有 trade-off 状态

---

**HyEvo: Self-Evolving Hybrid Agentic Workflows for Efficient Reasoning**
📄 [arXiv:2603.19639](https://arxiv.org/abs/2603.19639) | 💻 暂未开源 | 机构：未明确

**问题**
现有自动化 Agentic 工作流生成方法的两个核心缺陷：（1）依赖预定义算子库（operator library），限制了工作流多样性和适应性；（2）工作流中所有计算节点均为 LLM 概率推理节点，把规则性强的确定性操作（如格式转换、数值计算）也交给 LLM 执行，导致推理成本高且执行速度慢。

**方法**
- 提出 **HyEvo**，核心创新是**异质原子合成**（heterogeneous atomic synthesis）：将工作流节点分为两类——**LLM 概率节点**（语义理解、复杂推理）和**代码确定性节点**（规则执行、结构化处理）；确定性操作从 LLM 推理中卸载（offload），降低推理成本与延迟
- 采用 **LLM 驱动的多岛进化策略**（multi-island evolutionary strategy），引入 reflect-then-generate 机制：每次迭代先对当前工作流执行反思（analyze failure modes），再生成改进方案，通过执行反馈迭代优化工作流拓扑和节点逻辑
- 工作流优化目标同时覆盖：节点类型选择、节点逻辑实现、拓扑连接关系

**效果**
- 在多个复杂推理 benchmark 上均超过纯 LLM 工作流的 baseline
- 相比 homogeneous LLM-only 工作流，推理成本和执行延迟均有明显降低（具体数字论文中详述）
- 消融实验证明：混合节点设计和反思机制缺一不可，单独去掉任一成分均导致性能下降

---

**Entropy Trajectory Shape Predicts LLM Reasoning Reliability**
📄 [arXiv:2603.18940](https://arxiv.org/abs/2603.18940) | 💻 暂未开源 | 机构：未明确

**问题**
LLM Chain-of-Thought（CoT）推理过程中，如何在不依赖外部验证（ground truth 或 verifier）的情况下，预判当前推理链是否最终会得到正确答案？现有不确定性估计方法多基于最终输出的置信度，缺乏对推理中间过程动态的建模。

**方法**
- 提出**熵轨迹单调性**（entropy trajectory monotonicity）作为可靠性诊断指标：追踪 CoT 各步骤的 token-level 熵序列，分析其形态（单调递减、U 型、震荡等）与最终答案正确性的相关性
- 发现：正确推理链的熵轨迹倾向于呈**单调递减**特征（推理逐步收敛到确定性高的状态）；错误推理链则更多表现为震荡或 U 型（推理过程存在不确定性高峰）
- 该指标可作为无需额外模型的内置诊断工具，实时监控推理可靠性

**效果**
- 在多个数学推理 benchmark 上验证熵轨迹单调性与答案准确性的正相关
- 基于该指标的 early-stopping 策略可在保持准确率的同时减少推理步骤
- 提供一种低成本的推理可靠性估计方法，无需 verifier 模型

---

### 🤖 AI Agent / 工具使用

---

**MA-CoNav: A Master-Slave Multi-Agent Framework with Hierarchical Collaboration and Dual-Level Reflection for Long-Horizon Embodied VLN**
📄 [arXiv:2603.03024](https://arxiv.org/abs/2603.03024) | 💻 暂未开源 | 机构：未明确

**问题**
长时域具身视觉语言导航（VLN）中，单一智能体架构面临感知-规划-执行-记忆功能耦合的挑战：任务越长，状态空间越大，单智能体的 context 利用效率越低，且难以维持长期一致的导航目标。

**方法**
- 提出**主从多智能体协作导航框架**（Master-Slave Multi-Agent Framework），将导航职责分解并分配给专用智能体：
  - **Master Agent**：负责高层次任务分解、子目标规划和全局导航历史维护
  - **Slave Agents**：负责局部感知、短期动作执行和低层次工具调用
- 引入**双层反思机制**（Dual-Level Reflection）：Step-level 反思（每步动作后检查局部一致性）和 Episode-level 反思（导航失败后触发全局路径回溯）
- 层次化协作通过结构化通信协议实现，避免 context 无限累积

**效果**
- 在 R2R、REVERIE 等长时域 VLN benchmark 上超过单智能体 baseline
- 双层反思机制在长路径（>10 步）任务上提升尤为显著
- 消融实验证明 Master-Slave 分工和双层反思缺一不可

---

**When Should a Robot Think? Resource-Aware Reasoning via Reinforcement Learning for Embodied Robotic Decision-Making**
📄 [arXiv:2603.16673](https://arxiv.org/abs/2603.16673) | 💻 暂未开源 | 机构：未明确

**问题**
具身机器人在使用 LLM 进行高层推理时面临计算资源分配难题：并非所有决策步骤都需要深度推理，但现有方法对每个决策步骤一律调用全量推理，导致推理延迟高、计算预算快速耗尽，实时控制频率受限。

**方法**
- 提出 **RARRL**（Resource-Aware Reasoning via Reinforcement Learning），通过强化学习训练一个**元策略**（meta-policy），决定：（1）当前步骤是否需要调用推理；（2）若需要，应调用哪种推理角色（轻量 / 深度）；（3）分配多少 token 预算
- 元策略的状态输入包含：当前观测、执行历史、剩余计算预算，实现资源感知的动态调度
- 与已有方法（如固定步长调用推理、基于规则触发推理）的根本区别：元策略通过 RL 自适应学习触发条件，而非依赖手工设计规则

**效果**
- 在模拟机械臂操作和导航任务中，RARRL 相比固定频率调用推理节省约 40-60% 的 LLM 调用次数（具体数字见论文）
- 任务完成率与全量调用推理相当
- 剩余计算预算越少时，元策略越趋向于跳过非关键步骤的推理，显示出合理的资源管理行为

---

### ⚡ 高效推理 / 量化 / 压缩

---

**ZipServ: Fast and Memory-Efficient LLM Inference with Hardware-Aware Lossless Compression**
📄 [arXiv:2603.17435](https://arxiv.org/abs/2603.17435) | 💻 暂未开源 | 机构：未明确

**问题**
现有 LLM 推理框架（如 vLLM）的 GPU 内存瓶颈限制了部署规模，而现有压缩方法（量化、剪枝）均为有损压缩，导致模型精度下降。无损压缩虽然保留精度，但传统方案（如 zstd）由于解压需要逐元素串行操作，无法与 CUDA Tensor Core 的并行矩阵计算流水线融合，导致解压成为新的推理瓶颈。

**方法**
- 提出 **TCA-TBE**（Tensor-Core-Aware Triple Bitmap Encoding）：一种专为 GPU Tensor Core 设计的固定长度编码格式，支持常数时间（constant-time）并行解码，与 CUDA 的 warp-level 并行结构完美对齐
- 设计**融合解压-GEMM 内核**（fused decompression-GEMM kernel）：将权重解压操作与矩阵乘法（GEMM）在单个 CUDA kernel 内流水线执行，消除解压-计算之间的内存读写往返
- 无损特性通过数学证明保证：TCA-TBE 为无损编码方案，模型精度与原始 FP16/BF16 权重完全一致

**效果**
- 模型存储体积减少最高 **30%**
- 内核级加速最高 **2.21×**（vs NVIDIA cuBLAS）
- 端到端推理（vs vLLM）平均加速 **1.22×**
- 无任何精度损失（无损压缩）

---

**RAMP: Reinforcement Adaptive Mixed Precision Quantization for Efficient On-Device LLM Inference**
📄 [arXiv:2603.17891](https://arxiv.org/abs/2603.17891) | 💻 暂未开源 | 机构：未明确

**问题**
均匀位宽量化（uniform bit-width quantization）在给定 bit budget 下存在次优的精度-效率 trade-off：某些对精度敏感的层（如 attention 的 QK 层）需要更高位宽，而其他层可以安全降低位宽，但手工搜索最优混合位宽配置的代价是指数级的（层数 × 位宽选项）。

**方法**
- 提出 **RAMP**，将每层位宽分配问题建模为一个带全局 bit budget 约束的马尔可夫决策过程
- 使用**离线策略 Soft Actor-Critic（SAC）**框架训练位宽分配策略，以最小化 perplexity 为目标，在全局 bit budget 约束下联合优化各层位宽
- 与已有方法（HAQ、ENAS 等）的关键区别：使用 SAC 的软值函数代替硬约束，允许策略在训练中探索更宽的位宽组合空间；且基于 off-policy 数据，样本效率高

**效果**
- 在 Llama-2-7B 上：perplexity **5.54**（3.68 GB，3.65 effective bits），超过均匀 4-bit AWQ（同等压缩率下 perplexity 更低）
- 在端侧推理场景（edge device）中实现更优的精度-延迟 trade-off

---

**TTQ: Activation-Aware Test-Time Quantization to Accelerate LLM Inference On The Fly**
📄 [arXiv:2603.19296](https://arxiv.org/abs/2603.19296) | 💻 暂未开源 | 机构：未明确

**问题**
传统量化方案需要在部署前对特定数据集进行校准（calibration），导致量化参数固定、无法适应运行时不同 prompt 的激活分布变化。在 out-of-distribution 输入或多任务场景下，离线校准的量化误差显著偏高。

**方法**
- 提出 **TTQ**（Test-Time Quantization），在推理时为每个 prompt 实时执行激活感知量化校准
- 核心算法：利用单个 prompt 的前向传播激活统计（均值、方差、outlier 分布）计算当前 prompt 专属的量化参数（scale、zero-point），校准成本通过批处理优化压缩至可接受范围
- 与激活感知 offline 量化（如 AWQ、SmoothQuant）的区别：TTQ 在推理时逐 prompt 动态调整，而非训练/校准阶段一次性确定

**效果**
- 在多种 LLM 和下游任务上，相比固定校准集量化方案，perplexity 更低
- 推理速度相比 FP16 baseline 有所提升（无需等待预先校准）
- 对 domain shift 场景（如专业医疗/法律文本）鲁棒性显著优于 offline 量化

---

### 🛡️ AI 安全 / 对齐 / 可解释性

---

**Safety Alignment in Large Reasoning Models（CRAFT）**
📄 [arXiv:2603.17305](https://arxiv.org/abs/2603.17305) | 💻 暂未开源 | 机构：未明确

**问题**
大型推理模型（如 DeepSeek-R1、o3-mini）即使经过标准 RLHF 或 DPO 对齐，仍表现出**浅层对齐失败**（superficial safety alignment failures）：模型在显式输出层拒绝有害请求，但在 CoT 推理过程（latent reasoning）中仍产生有害内容，随后通过输出层"过滤"——这种表面拒绝掩盖了潜在的推理层安全问题。

**方法**
- 提出 **CRAFT**（Constraint-guided Reasoning Alignment via Feedback Tuning），在潜在推理层（latent level）进行对齐，而非仅约束最终输出
- 核心机制：通过在 CoT 推理链的中间步骤注入安全约束信号，引导推理过程朝向价值一致的方向演化
- 与标准 RLHF 对齐的区别：标准 RLHF 只约束模型最终答案，CRAFT 直接干预推理中间状态，实现"推理层对齐"而非"输出层过滤"

**效果**
- 在多个安全评测 benchmark 上，CRAFT 对齐的模型相比标准 RLHF 对齐模型显著减少推理层有害内容的出现
- 保持推理任务（数学、代码）准确率的前提下实现更深层的安全约束
- 为"思维链对齐"方向提供了首个系统性框架

---

## 【模块四】开源项目周榜

从 GitHub Trending（本周维度）选取 AI 相关高增长项目，按本周 star 增量排序：

**[superpowers](https://github.com/obra/superpowers) ⭐ 108,562（本周 +19,621）**
- 一句话描述：AI 辅助软件开发方法论框架，将智能体能力模块化为可组合、可版本控制的技能（skills）包，定义"AI 原生"的软件开发工作流。
- 上手难度：⭐⭐☆ 中等
- 适用场景：团队研发流程改造、AI Agent 能力扩展、个人开发提效

**[MiroFish](https://github.com/666ghj/MiroFish) ⭐ 41,073（本周 +11,768）**
- 一句话描述：通用群体智能引擎（swarm intelligence engine），面向预测类应用场景，通过多智能体协同实现复杂时序预测任务。
- 上手难度：⭐⭐⭐ 较难
- 适用场景：金融预测、供应链优化、多智能体协同决策

**[project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) ⭐ 13,710（本周 +10,479）**
- 一句话描述：完全离线运行的"生存计算机"，集成关键工具、知识库和本地 AI，无需网络即可使用 AI 能力，面向极端环境部署场景。
- 上手难度：⭐⭐☆ 中等
- 适用场景：边缘计算、离线 AI 部署、灾难响应场景

**[claude-hud](https://github.com/jarrodwatts/claude-hud) ⭐ 12,144（本周 +7,069）**
- 一句话描述：Claude Code 插件，实时显示 context 使用量、活跃工具列表、运行中的 Agent 和任务进度追踪，提升 AI 编码的可观测性。
- 上手难度：⭐☆☆ 简单
- 适用场景：Claude Code 用户、AI Agent 开发调试、context 窗口管理

**[MoneyPrinterV2](https://github.com/FujiwaraChoki/MoneyPrinterV2) ⭐ 23,467（本周 +6,512）**
- 一句话描述：基于 AI 的自动化内容创作和变现工具，支持视频脚本生成、语音合成、字幕生成的全流程自动化。
- 上手难度：⭐☆☆ 简单
- 适用场景：内容创作者自动化、视频批量生产

**[agency-agents](https://github.com/agency-agents/agency-agents) ⭐ 53,404（本周 +5,200，月增 +29,160）**
- 一句话描述：多智能体框架，每个 AI Agent 被定义为具有专业角色、性格和明确输出物的专业化角色，类似于一个虚拟团队。
- 上手难度：⭐⭐☆ 中等
- 适用场景：复杂任务分解、多角色协作自动化、企业流程自动化

---

## 【模块五】行业动态简报

```
📅 03/23 | [融资] Nebius Group 完成 43 亿美元可转换票据融资（2031年和2033年两期票据），宣布"充分融资"以推进 2026 年 160-200 亿美元资本支出计划。此前 Nebius 已与 Meta 签署价值 270 亿美元的数据中心供应合同，并向 Nvidia 出售 20 亿美元认股权证。（来源：Yahoo Finance、TechFundingNews）

📅 03/22 | [产品发布] 小米 MiMo 团队正式揭晓"Hunter Alpha"身份，命名为 MiMo-V2-Pro，同步发布 MiMo-V2-Omni（全模态）和 MiMo-V2-TTS；V2-Pro 在 OpenRouter 匿名测试阶段已累计运行 1 万亿 tokens。（来源：APIdog、Creati.ai）

📅 03/17 | [政策/法律] 美国参议员 Marsha Blackburn 和 Peter Welch 致函 ByteDance，要求"立即关闭"Seedance AI 视频应用，理由是其可生成好莱坞演员 deepfake 内容；Disney、主要制片公司已发出停止函。ByteDance 宣布暂停全球扩张。（来源：CNBC、TechCrunch）

📅 03/15 | [产品更新] 中国 AI 大模型周调用量达 4.69 万亿 Token，连续第二周超越美国，全球调用量前三名均为中国模型（DeepSeek、Qwen、GLM），标志着中国在大模型实际使用规模上首次实现领先。（来源：量子位）

📅 03/13 | [战略投资] Nebius 与 Meta 签署价值 270 亿美元 AI 数据中心容量供应协议，继此前与 Microsoft 签署 173 亿美元合同后，Nebius 成为当前 AI 基础设施赛道最大赢家之一。（来源：TechCrunch）

📅 03/09 | [模型更新] DeepSeek "V4 Lite" 悄然上线 DeepSeek 官网，支持多模态输入，推测为 V4 正式版的过渡性测试版本。V4 正式版持续延迟发布，社区预测窗口推至 3 月底至 4 月。（来源：PromptZone、Manifold Markets）

📅 03/xx | [融资] Anthropic 完成 300 亿美元 G 轮融资，估值达 3800 亿美元。同期 Advanced Machine Intelligence（Yann LeCun 创立）完成 10.3 亿美元融资，估值 35 亿美元。AI 机器人公司 Mind Robotics（5 亿美元）、Rhoda AI（4.5 亿美元）等在一周内合计融资超 12 亿美元。（来源：TechCrunch、Intellizence）
```

---

## 【模块六】中文社区热点

**话题：DeepSeek V4"跳票"引发的开源大模型竞争格局讨论**
- 为什么热：V4 已错过数个预测发布窗口（二月、春节、三月初），而 Qwen 3.5、GLM-5、Kimi K2.5 趁虚而入，在 Chatbot Arena 排行榜拿下前三，引发社区对"DeepSeek 是否会被超越"的广泛讨论。
- 主要观点分歧：正方认为 V4 发布后凭借多模态和更大参数规模仍将重夺榜首；反方认为竞争格局已发生根本变化，开源生态从 DeepSeek 一家独大演变为多极格局，且 Qwen 3.5 的 Apache 2.0 许可证更具商业友好性。
- 代表性内容：[量子位 DeepSeek 报道](https://www.qbitai.com/)、[Kimi K2.5 vs GLM-5 vs Qwen 3.5 对比](https://recodechinaai.substack.com/p/glm-5-qwen35-and-the-ai-race-that)

**话题：中国大模型调用量首超美国，国内 AI 应用爆发**
- 为什么热：3 月 15 日数据显示中国 AI 调用量已连续两周超过美国，且前三名均为国内模型，打破此前"中国擅长训练，不擅长应用"的论断，引爆国内 AI 从业者圈子。
- 主要观点分歧：正方认为这是中国 AI 生态成熟的标志，开源路线功不可没；反方认为调用量统计口径可能存在差异，ToC 应用（如短视频推荐）贡献了大量调用，与研究/开发调用量性质不同。
- 代表性内容：[魔搭社区报道](https://www.163.com/dy/article/KON5BPVQ0511DTVV.html)

**话题：Seedance 2.0 好莱坞风波与 AI 视频生成的版权红线**
- 为什么热：ByteDance 视频生成模型因生成 Tom Cruise、Brad Pitt 等演员 deepfake 内容遭到好莱坞集体抵制，美国参议员直接要求关停，引发国内 AI 从业者对"出海合规"的高度警觉。
- 主要观点分歧：正方认为技术本身中性，版权问题应通过授权机制解决；反方认为 AI 视频生成模型在面部相似性和声音克隆上存在天然的法律灰色地带，仅靠"技术手段"无法规避风险。
- 代表性内容：[TechCrunch Seedance 报道](https://techcrunch.com/2026/03/15/bytedance-reportedly-pauses-global-launch-of-its-seedance-2-0-video-generator/)

**话题：Karpathy 回归引发"研究自动化"新浪潮**
- 为什么热：Andrej Karpathy 重新活跃于开源社区后（GitHub Open Source Weekly 3/11 报道），其公开评论和项目引发大规模关注，多个"自动化科研"项目（AutoResearchClaw、MoRI 等）随之爆火，在知乎和即刻引发"AI 能否替代研究员"的热烈讨论。
- 主要观点分歧：正方认为 AI for Science 已进入"idea 生成"阶段，研究人员角色将从执行者变为评审者；反方认为现有模型的"研究"仍停留在模式匹配，缺乏真正的科学直觉。
- 代表性内容：[MoRI 论文](https://arxiv.org/html/2603.19044)、[知乎 AI 研究员话题热榜](https://www.zhihu.com/)

**话题：AI 情感陪伴的伦理争议**
- 为什么热：一段老人与 AI 聊天被安慰到落泪的视频在抖音和微博爆火，随即引发机器之心、量子位等媒体的深度报道，以及关于"AI 情感价值是真正疗愈还是情感操控"的广泛伦理争论。
- 主要观点分歧：正方认为 AI 陪伴填补了老龄化社会的情感服务缺口，有积极社会价值；反方认为 AI 提供的是"精心设计的温柔陷阱"，可能加剧用户对真实人际关系的疏离。
- 代表性内容：[新浪新闻 Seedance 2.0 报道](https://k.sina.com.cn/article_7857201856_1d45362c001903i6sg.html)

---

## 【模块七】本周实用工具推荐

**MiMo-V2-Pro API**（[platform.xiaomimimo.com](https://platform.xiaomimimo.com/)）
- 解决什么问题：以极低成本（约为 Claude Opus 4.6 的 1/3）实现 coding 和 agentic 任务的高质量输出，适合生产环境的 cost-down 替换。
- 如何快速上手：（1）注册 platform.xiaomimimo.com 获取 API Key；（2）按 OpenAI 兼容格式调用，model 字段填 `mimo-v2-pro`，本周内免费调用额度充足。
- 适合：开发者
- 费用：发布后一周免费，后续定价参考官网

**Gemini Code Assist**（[cloud.google.com/gemini/code-assist](https://cloud.google.com/gemini/code-assist)）
- 解决什么问题：集成 Gemini 3.1 能力的 IDE 编程助手（支持 VS Code、JetBrains），支持 1M token 上下文的代码理解，可分析整个大型代码库。
- 如何快速上手：（1）在 VS Code 扩展市场搜索"Gemini Code Assist"并安装；（2）使用 Google 账号登录即可，个人版完全免费。
- 适合：开发者
- 费用：个人版免费（2026 年 3 月起）

**Kimi K2.5 Agent Swarm API**（[platform.moonshot.ai](https://platform.moonshot.ai/)）
- 解决什么问题：将复杂多步任务分解为可并行执行的子任务，由最多 100 个专用子 Agent 协同处理，大幅缩短长任务完成时间。
- 如何快速上手：（1）注册 platform.moonshot.ai；（2）在 API 调用中指定 `mode: "agent-swarm"` 并描述目标任务，系统自动分解并调度子任务。
- 适合：开发者
- 费用：按 token 计费，详见官网；开源权重可免费自部署（Modified MIT License）

**ZipServ**（[arXiv:2603.17435](https://arxiv.org/abs/2603.17435)，待开源）
- 解决什么问题：在不损失任何精度的情况下，将 LLM 模型文件压缩 30%，端到端推理速度在 vLLM 基础上再提升 1.22×，直接降低 GPU 成本。
- 如何快速上手：论文代码尚未公开，可持续关注 arXiv 更新；原理上兼容任何基于 CUDA Tensor Core 的推理框架。
- 适合：开发者（尤其是 LLM 推理基础设施工程师）
- 费用：学术论文，代码预计开源后免费

**Ollama + Qwen 3.5 Small（边缘/离线部署）**（[ollama.com](https://ollama.com/)）
- 解决什么问题：在消费级硬件（包括 iPhone）上本地运行达到 120B 级别推理能力的小型模型（2B 参数），实现完全隐私、无需联网的 AI 推理。
- 如何快速上手：（1）安装 Ollama：`curl -fsSL https://ollama.com/install.sh | sh`；（2）拉取模型：`ollama pull qwen3.5:2b`；（3）运行：`ollama run qwen3.5:2b`。
- 适合：两者皆可（开发者本地测试 + 隐私敏感的非技术用户）
- 费用：完全免费，模型权重 Apache 2.0 开源

---

## 【数据源与生成说明】

**报告生成时间：** 2026-03-24

**论文 arXiv ID 覆盖范围：** 2603.00001–2603.20185（2026 年 3 月），所有收录论文均经过 ID 前四位时间验证，未收录任何 2502 之前的旧论文。

**主要数据来源：**
- arXiv cs.CL / cs.AI / cs.LG / cs.RO 月度列表
- Hugging Face Papers（受网络限制，通过 WebSearch 间接访问）
- Papers With Code Trending
- GitHub Trending（本周维度）
- WebSearch 覆盖：llm-stats.com、interconnects.ai、labla.org、techcrunch.com、siliconangle.com、infoq.com、qbitai.com、evolink.ai、buildfastwithai.com

**数据截止时间：** 2026-03-24 UTC

**说明：** 本报告为自动生成，模型发布信息、GitHub star 数据和行业动态来源于搜索结果聚合，建议读者点击原文链接验证关键数据；HuggingFace Papers 直接访问受网络限制，部分论文点赞数未能实时获取，以论文质量和研究影响为主要筛选标准。

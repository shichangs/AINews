# AI 技术周报 · 2026-05-11

> 覆盖周期：2026-05-04 — 2026-05-11
> 受众：算法研究员 / AI 工程师
> 论文 arXiv ID 范围：`2604.XXXXX`（4 月）/ `2605.XXXXX`（5 月）

---

## 【模块一】本周导读

- 🔴 **最重要的变化**：本周一（5/5）三家旗舰同日落子——OpenAI 把 ChatGPT 默认模型换成 **GPT-5.5 Instant**（高风险领域幻觉降低 52.5%），Google 端开源 **Gemma 4** 系列（E2B/E4B/26B-A4B/31B，256K 上下文 + 140 种语言），Zhipu 扩展 **GLM-5.1** 订阅。AI 基础模型的"日历驱动"竞争节奏越来越像智能手机发布会。
- 🟡 **值得关注但未明朗**：豆包于 5/4 推出 **¥68/¥200/¥500 三档付费订阅**——中国第一家大规模消费级 AI 走出免费模式；同周 Tencent Cloud 跟随阿里、百度上调 AI 算力价格。"中国大模型免费时代是否终结" 成为本周中文社区最大议题。免费仍是 DeepSeek/Qwen/Wenxin 的护城河，但是商业化压力正在累积。
- 🟢 **对开发者最有价值**：算法研究员请重点看 **HeavySkill**（2605.02396，Meituan LongCat，把 Best-of-N 升级为模型内化的"并行+串行"双阶段技能）和 **TSCG**（2605.04107，零依赖工具 schema 编译器，让 Phi-4 14B 工具调用从 0%→84.4%）。两个都是即插即用的工程性突破。

**下周预告**
- **5/19 Google I/O**：业界共识 Gemini 3.5 将在大会主题演讲发布。
- **5/14-15 微软 Build 2026**：预计 Copilot Agent SDK 与 OpenAI 集成更新。
- **EU AI Act 高风险条款**：8/2 正式生效前，本月将出台一批配套指南。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

#### OpenAI · GPT-5.5 Instant（5/5 发布）
- **核心能力**：取代 GPT-5.3 Instant 成为 ChatGPT 默认模型。在医疗、法律、金融等高风险提示下，幻觉断言下降 **52.5%**。低延迟保持不变，支持引用过往对话/文件/Gmail 的个性化记忆。
- **与上一代对比**：延迟与 GPT-5.3 Instant 持平，但在敏感领域的事实可靠性显著提升。
- **访问方式**：ChatGPT（含免费层）/ API（`chat-latest`）。GPT-5.3 对付费用户保留 3 个月。
- **适合**：主流 ChatGPT 用户；需要低延迟对话端点的开发者。
- 来源：[openai.com/index/gpt-5-5-instant](https://openai.com/index/gpt-5-5-instant/)

#### OpenAI · GPT-5.5-Cyber（受限预览）
- **核心能力**：网络安全方向的前沿模型，本周内通过了 32 步端到端红队靶场——与 Anthropic 3 周前的 Claude Mythos Preview 持平。
- **访问方式**：仅向受审核的关键基础设施防御方开放。
- 来源：[axios.com / OpenAI Cyber model](https://www.axios.com/2026/05/07/openai-gpt-55-cybersecurity-model)

#### OpenAI · Realtime 语音三件套（5/7）
- **GPT-Realtime-2** / **GPT-Realtime-Translate** / **GPT-Realtime-Whisper**：实时语音推理、实时多语种口译、流式 ASR。仅 API。详见模块七定价。

#### Anthropic · 本周以"Code w/ Claude"开发者大会为主，无新模型
- 大会发布：**多智能体编排**（协调员 + 并行子代理）、**Dreaming**（跨会话学习）、**Outcomes**（运行至目标达成）、**Code Review** 产品、**Remote Agents**（手机操控笔记本）、**CI 自动修复**。Claude Security 进入 Enterprise 公测；Pro/Max/Team 速率上限翻倍（依托 SpaceX Colossus 算力合同）。
- 来源：[simonwillison.net / Code w/ Claude 2026](https://simonwillison.net/2026/May/6/code-w-claude-2026/)

#### xAI · Grok 语音 API GA + Grok Imagine Quality Mode
- STT/TTS API 转 GA，支持 25 种语言、批量与流式、说话人 diarization；TTS 价格 $4.20 / 百万字符。Grok Imagine 增加图像生成 Quality Mode。
- 来源：[releasebot.io / xAI updates](https://releasebot.io/updates/xai)

#### Mistral · Mistral Medium 3.5（4/29 发布，本周持续推广）
- 128B Dense / 256K 上下文 / 24 语种 / 单模型融合聊天+推理+编程。**SWE-Bench Verified 77.6%**，τ³-Telecom **91.4**。可配置 reasoning effort + 原生函数调用 + JSON 模式。自部署最低 4 GPU。
- **价格**：$1.50/M input · $7.50/M output（Mistral Vibe / Le Chat 集成）。
- 来源：[mistral.ai / Vibe + Medium 3.5](https://mistral.ai/news/vibe-remote-agents-mistral-medium-3-5)

#### Google DeepMind · 本周无新闭源模型
- Gemini 3.5 业界共识发布日：**2026-05-19 Google I/O**。

#### Meta · 本周无新模型发布

---

### ② 国内大模型

#### ByteDance Doubao · Doubao-Seed-2.0-lite（5/6 发布）
- **是否开源**：闭源（火山引擎平台调用）。
- **核心能力**：豆包 Seed 2.0 家族中**首个全模态理解模型**——单系统原生统一理解视频/图像/音频/文本。
- **与国际同类对比**：全模态理解层面对标 Gemini 2.0 Flash 与 GPT-4o 的视觉+音频，但价格定位更低。
- **获取/使用**：火山引擎 API；同时驱动 C 端豆包 App（3.45 亿 MAU；首次推出 ¥68/月付费档）。
- **适合**：移动端 + 企业开发者，需要低成本多模态理解。
- 来源：[news.aibase.com / 27723](https://news.aibase.com/news/27723)

#### Zhipu · GLM-5.1（5/5 订阅扩展）
- **是否开源**：开源（4/8 已开源）。
- **核心能力**：GQA 长上下文、企业 NLP 强化、多模态适配器友好。5/5 的动作是企业订阅版本扩展，而非新变体。
- **获取/使用**：Z.ai 订阅 + HuggingFace 开源权重。
- 来源：[printenqrcode.com / GLM-5.1](https://www.printenqrcode.com/blog/zhipu-glm-5-1-release/)

#### DeepSeek · 本周无重大发布
- DeepSeek-V4 Preview 已于 4/24 发布——V4-Pro（1.6T MoE / 49B 激活）+ V4-Flash（284B / 13B 激活），均 1M 上下文，全开源。本周处于 V4 预览迭代期。
- 行业关注点：DeepSeek 据传正进行**首轮外部融资**，目标 $3-4B、估值最高 $50B，国家 AI 基金（¥600亿）与腾讯为领投候选。

#### Alibaba Qwen · 本周无重大发布
- 最近一次：Qwen3.6-27B Dense（4/22，Apache 2.0）+ Qwen3.6-35B-A3B MoE（4/16）。

#### Moonshot Kimi · 本周无重大发布
- 4/20 K2.6（1T MoE / 32B 激活），Agent Swarm 支持 300 子代理 / 4000 步。

#### Tencent Hunyuan · 本周无新模型，但 Hy3 token 使用量 vs Hy2 增长 >10×（CodeBuddy/WorkBuddy 主导）

#### 百度 Wenxin · 本周无重大发布
- ERNIE 5.1 Preview 当前 LMArena Text 中国厂商第一。

#### MiniMax / 零一万物 · 本周无重大发布

---

### ③ 其他重要开源模型

#### Google · Gemma 4 家族（5/5 发布）
- **参数规模**：E2B / E4B / 26B-A4B（MoE）/ 31B。
- **核心能力**：多模态（文本+图像 in / 文本 out），**256K 上下文**，**140+ 种语言**；可配置 thinking modes；原生 system role。Google 自称 "intelligence-per-parameter 最高的开源 Gemma 世代"。
- **硬件需求**：E2B 可单卡 8GB 部署（手机/边缘），E4B 16GB，26B-A4B（激活 4B）24GB 可推，31B 推荐 80GB。
- **获取**：HuggingFace（`google/gemma-4-E4B-it`）/ Ollama（`ollama pull gemma4`）/ LM Studio / Google Cloud。Gemma 系列累计下载已突破 4 亿次。
- **适合**：从端侧到服务器级、需要宽松开源协议的开发者。
- 来源：[blog.google / gemma-4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)

#### NVIDIA · Nemotron Speech / RAG / Safety（本周开源）
- **Nemotron Speech**：榜单第一的 ASR，延迟比同类降低约 10×。
- **Nemotron RAG**：多语言+多模态 embed/rerank VLM。
- **Nemotron Safety**：Llama-Nemotron 内容安全（扩展语言）+ Nemotron PII 检测器。
- **获取**：HuggingFace + [developer.nvidia.com/nemotron](https://developer.nvidia.com/nemotron)。
- 来源：[nvidianews.nvidia.com / Nemotron 3](https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models)

#### NVIDIA · Ising（本周）
- 全球首个面向**量子计算**的开源 AI 模型族——辅助构建可运行实用应用的量子处理器。
- 来源：[nvidianews.nvidia.com / Ising](https://nvidianews.nvidia.com/news/nvidia-launches-ising-the-worlds-first-open-ai-models-to-accelerate-the-path-to-useful-quantum-computers)

---

## 【模块三】热门论文精选

> **时间核验**：本节所有 arXiv ID 前四位均为 `2604` 或 `2605`，符合本月/上月约束。

### 🧠 大语言模型 / 推理能力

#### HeavySkill: Heavy Thinking as the Inner Skill in Agentic Harness
📄 [arxiv.org/abs/2605.02396](https://arxiv.org/abs/2605.02396) | 💻 [github.com/wjn1996/HeavySkill](https://github.com/wjn1996/HeavySkill) | 🤗 [HF Paper](https://huggingface.co/papers/2605.02396) | 机构：Meituan LongCat Team

**问题**
当前 agentic "harness" 技巧（Best-of-N、self-consistency、debate）都活在模型外部——只是推理时的脚手架，没有内化为模型能力。理论上 Pass@N >> BoN，因为 BoN 无法合成 K 个采样中不存在的新正确答案，而仅能在已有候选中挑选。这导致经典的"采样规模上去了但天花板不变"的退化曲线。

**方法**
把 heavy thinking 重构为**模型内部的两阶段可移植技能**：
- **阶段一 · 并行推理**：高温采样生成 K 条独立轨迹（与 BoN 同构）。
- **阶段二 · 顺序审议**：第二轮 forward 对 K 条轨迹做批判性综合——识别错误，**合成一个不一定出现在原候选集合中的新答案**。
- 与 PPO/GRPO 的本质区别：不重写优化循环，而是把审议阶段的**深度与宽度都作为 RL 可学习的技能**，让模型内化原先依赖外部编排层完成的能力。

**效果**
- 在 STEM（AIME 风格）/ 编程 / 通用任务上**全面优于 Best-of-N**。
- 模型能力越强，越接近 **Pass@N 天花板**——证实"审议阶段确实在制造原 K 条采样中不存在的正确答案"。

---

#### Can RL Teach Long-Horizon Reasoning to LLMs? Expressiveness Is Key
📄 [arxiv.org/abs/2605.06638](https://arxiv.org/abs/2605.06638) | 💻 暂未开源 | 机构：未披露

**问题**
"RL 扩展长程推理"的经验性结论混淆了**证明深度（horizon length）**与**逻辑表达力（operator complexity）**两个变量。我们既无法独立改变其一，也就无从判断 RL 究竟在学"更长的推理链"还是"更复杂的逻辑"。这直接动摇了 long-horizon RL scaling law 的方法论基础。

**方法**
- 设计合成基准 **ScaleLogic**，独立控制两条轴：
  - (a) 证明深度 D（horizon）；
  - (b) 逻辑表达力：implication-only → conjunction/disjunction/negation → universal quantification。
- 在 (D, expressiveness) 网格上跑 GRPO 风格 RL，拟合 **T ∝ D^γ**（T 为 RL 训练计算量）。
- 与已有 scaling law 工作的核心区别：以前的 RL 难题都用真实数学题，无法解耦深度与表达力；本文用合成集第一次给出**正交分解的训练计算 vs 性能曲线**。

**效果**
- Power law 拟合 **R² > 0.99**。
- Scaling 指数 γ 从 1.04（if-then）单调升到 **2.60（完整一阶逻辑）**。
- 在更高表达力上训练，可在下游数学/通用推理上多拿 **+10.66 分**，且 transfer 时的算力效率更高。

---

### 👁️ 多模态

#### Let ViT Speak: Generative Language-Image Pre-training (GenLIP)
📄 [arxiv.org/abs/2605.00809](https://arxiv.org/abs/2605.00809) | 💻 [github.com/YanFangCS/GenLIP](https://github.com/YanFangCS/GenLIP) | 🤗 [HF Paper](https://huggingface.co/papers/2605.00809) | 机构：北京交通大学 / ByteDance / NTU

**问题**
CLIP 类对比学习预训练需要**巨大 batch** + **独立文本解码器**。下游接入 MLLM 时还要再叠一个生成式 LM——表征空间与生成空间被割裂，预训练成本被重复计算。

**方法**
- **彻底放弃对比学习**：单一 ViT 直接用标准 LM（next-token）目标从视觉 token 预测语言 token。
- 视觉 + 文本 token 共享同一个 Transformer，无独立文本解码器，无 batch-级负例采样。
- 与 CLIP 的本质区别：纯生成式预训练；与 PaLI/BLIP 的本质区别：预训练阶段就**不存在独立 LM 解码器**，预训练目标 = MLLM 目标。
- 后续支持原始宽高比的多分辨率持续预训练，OCR 与图表理解类细粒度任务受益。

**效果**
- 仅用 **8B 样本（Recap-DataComp-1B 子集）**——远少于 CLIP-class 基线——可达到或超过其表现。
- 作为 MLLM 视觉编码器接入后，在 OCR、图表理解类任务上有可量化的提升。

---

#### Continuous Latent Diffusion Language Model (Cola DLM)
📄 [arxiv.org/abs/2605.06548](https://arxiv.org/abs/2605.06548) | 💻 暂未开源 | 🤗 [HF Paper](https://huggingface.co/papers/2605.06548) | 机构：ByteDance Seed / HKU / 北大 / 人大 / ANU

**问题**
已有 diffusion LM（LLaDA / SEDD / Diffusion-LM）依然在**离散 token 状态**上跑——所谓的"扩散" 只是换了一种生成顺序，**生成空间未变**。这压制了 non-AR 归纳偏置的真实潜能。

**方法**
- 三阶段层次化管线：
  1. **Text VAE** 学习稳定的 text ↔ latent 双向映射；
  2. **Block-causal DiT** 在**连续 latent 空间**对全局语义 prior 建模——扩散过程发生在 latent 上，不再是 token 观测空间；
  3. 条件解码器把 latent 回渲为文本。
- 统一 Markov-path 视角：本方法做的是 **latent prior transport**，而非 **token observation recovery**——把"全局语义组织"与"局部文本实现"解耦；并且**天然可扩展到连续模态**（音频/图像）。
- 与 LLaDA 的本质区别：不是离散去噪，而是连续 latent 扩散。

**效果**
- 在 4 类研究问题 / 8 项 benchmark 上，与同规模 ~2B 参数 AR / LLaDA 基线持平或更好。
- Scaling 曲线覆盖到 ~2000 EFLOPs。作者明确论证 PPL 与生成质量在 Cola DLM 中相关性较弱——传统 PPL 评估对此类模型可能失效。

---

### 🤖 AI Agent / 工具使用

#### TSCG: Deterministic Tool-Schema Compilation for Agentic LLM Deployments
📄 [arxiv.org/abs/2605.04107](https://arxiv.org/abs/2605.04107) | 💻 [npmjs.com/package/pi-tscg](https://www.npmjs.com/package/pi-tscg) | 机构：University of Helsinki AI Programme（独立作者 Furkan Sakizli）

**问题**
生产级 agent 框架（含 MCP）把 JSON Schema 当作机器解析格式扔给 LLM。对 4B-14B 小模型而言，**"protocol mismatch"** 是工具目录超过 ~20 个之后工具调用失败的主因——大括号、嵌套、`additionalProperties` 等结构对模型来说像噪声而非提示。现有修复要么需要微调（贵），要么需要运行时 LLM 重写（慢且不确定）。

**方法**
- **8 个可组合算子**组成的确定性、训练自由编译器：JSON Schema → token 高效的结构化文本。
- 形式化压缩下界：在 well-formed schema 上 **≥ 51%** token 缩减。
- 与 RAG 风格工具检索的本质区别：**不访问模型、不需要 embedding 模型、不在运行时做搜索**；与微调的本质区别：**零参数变动**。
- 子毫秒级执行——可嵌在请求路径上。

**效果**
- TSCG-Agentic-Bench（19K 调用 × 12 模型 × 5 场景）：
  - **Phi-4 14B 从 0% → 84.4% 准确率（20 工具目录）**；50 工具目录达 90.3%。
- BFCL：3 个模型上 **108–181% Accuracy-Retained Ratio**。
- 真实生产 MCP schema：在 ~10.5K input token 下 **+5.0pp 准确率 + 52–57% token 节省**。

---

#### Skill¹: Unified Evolution of Skill-Augmented Agents via Reinforcement Learning
📄 [arxiv.org/abs/2605.06130](https://arxiv.org/abs/2605.06130) | 💻 暂未开源 | 🤗 [HF Paper](https://huggingface.co/papers/2605.06130) | 机构：HF Papers 当周热门（机构未在 snippet 中披露）

**问题**
Skill-augmented agent 实际涉及三种紧耦合能力——技能**选择**、**使用**、**蒸馏**。Voyager / SkillRL 等过往工作把它们当作独立目标分别用奖励驱动，结果**部分能力提升，另一些退化**：模型挑技能越来越准，但蒸馏出的技能本身越来越烂。

**方法**
- 用**统一 RL 目标**联合训练同一策略——选择 / 使用 / 蒸馏共享**任务最终奖励**。
- 与 PPO/GRPO 多 critic 基线的本质区别：单 critic、共享 reward signal，迫使三种能力共演化。
- 与 RAG 风格静态技能库的本质区别：技能库本身是策略的**学习产物**，会随着 RL 不断演化（自蒸馏新技能、淘汰冗余技能）。

**效果**
- **ALFWorld 平均成功率 97.5%**——比 SOTA（RetroAgent）**+2.6pp**。
- WebShop 击败已有 skill 与 RL 基线；最终技能库的多样性与有效性同步提升。

---

### 🦾 具身智能 / 机器人

#### PhysForge: Physics-Grounded 3D Asset Generation (ICML 2026)
📄 [arxiv.org/abs/2605.05163](https://arxiv.org/abs/2605.05163) | 💻 [github.com/HKU-MMLab/PhysForge](https://github.com/HKU-MMLab/PhysForge) | 🤗 [HF Paper](https://huggingface.co/papers/2605.05163) | 机构：HKU MMLab + Tencent

**问题**
3D 资产生成（diffusion / GAN）能产出**视觉合理**但**物理不可用**的网格——缺材料参数、运动学约束、关节定义。直接训练 "physics-aware diffusion" 会把几何合成与物理推理纠缠在一起，无法 scale。

**方法**
- **解耦两阶段**：
  - **阶段一 · 物理架构师**：VLM 输出 **Hierarchical Physical Blueprint**——结构化指定材料 / 功能 / 运动学约束；
  - **阶段二 · 物理 grounded 扩散**：通过 **KineVoxel Injection** 机制，把 blueprint 渲为可仿真几何 + 精确运动学参数。
- **PhysDB**：150K 资产、4 级物理标注的新数据集。
- 与已有 3D-gen 的本质区别：物理参数不是后处理标注，而是**生成目标的一部分**。

**效果**
- ICML 2026 接收。
- 产出**可仿真且可交互**的资产；与 PhysX-3D 等基线在材料 / 运动学一致性上有定量优势。

---

#### TriRelVLA: Triadic Relational Structure for Generalizable Embodied Manipulation
📄 [arxiv.org/abs/2605.05714](https://arxiv.org/abs/2605.05714) | 💻 暂未开源 | 机构：NUS / HUST

**问题**
当前 VLA（OpenVLA / RT-2 / π₀）把视觉观测编码为**整张特征**——把物体外观、背景、场景 layout 都缠在一起。结果就是**条件落在"视觉相关"特征上而非"关系结构"上**，跨场景跨物体迁移性差。

**方法**
- 强加显式的 **object–hand–task 关系图**作为感知与动作之间的中间表征：
  - 视觉编码器产出 object node + hand node embedding；
  - 语言编码器产出 task node embedding；
  - **Task-guided cross-attention** 组织 pairwise edge，再由 **relation-aware graph transformer** 更新。
- 动作预测在关系图上做，而非原始视觉特征。
- 与 OpenVLA/RT-2（单视觉流）以及 TriVLA（多系统 + episodic world model）的本质区别：TriRelVLA 的新意在于**结构先验**——把动作建模成"关系函数"而非"外观函数"。

**效果**
- 数据效率和组合泛化能力（跨场景 / 跨物体 / 跨任务组合）上均有显式提升。

---

### 🔬 AI for Science

#### SciResearcher: Scaling Deep Research Agents for Frontier Scientific Reasoning
📄 [arxiv.org/abs/2605.01489](https://arxiv.org/abs/2605.01489) | 💻 暂未开源 | 机构：HKUST

**问题**
前沿科学推理同时需要 (a) 在稀疏异构学术证据中检索 + (b) 重度计算/工具使用。OpenAI Deep Research / Gemini Deep Think 训练用的是 web-search 轨迹——**无法激发计算推理**；KG-based 管线又缺少长程工具集成能力。

**方法**
- **全自动 agentic 数据构造框架**——从真实学术文献出发合成多样化的概念性 + 计算性任务，built-in 三种能力的激发：
  - (i) 信息获取；
  - (ii) 工具集成推理；
  - (iii) 长程规划。
- 与 search-only RAG 的本质区别：要求多步计算验证；与 AI Scientist-v2 等推理时 tree-search 的本质区别：本工作训练的是**模型本身**，而不是 inference scaffolding。

**效果**
- **SciResearcher-8B 在 HLE-Bio/Chem-Gold 上 19.46%**——8B 量级新 SOTA。
- SuperGPQA-Hard-Biology 与 TRQA-Literature 上 **+13–15pp 绝对增益**。

---

#### ProtDBench: A Unified Benchmark of Protein Binder Design and Evaluation
📄 [arxiv.org/abs/2605.04118](https://arxiv.org/abs/2605.04118) | 💻 暂未开源 | 机构：作者署名包括 Helixon/ByteDance Research 风格的研究人员

**问题**
RFdiffusion / Chroma / EvoDiff 等蛋白质 binder 设计的 in-silico 指标**互不可比**——不同 verifier（AlphaFold2 / ESMFold / Boltz）、不同过滤器、不同成功标准，结果是 leaderboard 被 "verifier bias" 污染。

**方法**
- 标准化 + throughput-aware 评估框架：
  - 用大规模**湿实验标注数据集**作为锚；
  - 系统分析 verifier 选择对 reported 成功率的影响——首次量化 "verifier roulette" 效应。
- **把计算吞吐**列为显式评估维度（真实 binder design 同时优化质量与成本）。

**效果**
- 在相同过滤协议下，不同 verifier 间的一致性显著低于此前业界假设。
- 在统一任务上给出 RFdiffusion 类方法的基线数字。

---

### 🛡️ AI 安全 / 对齐

#### SKOP: Activation Steering via Key-Orthogonal Projections
📄 [arxiv.org/abs/2605.06342](https://arxiv.org/abs/2605.06342) | 💻 暂未开源 | 机构：University of Cambridge / University of Oxford

**问题**
Activation steering 通过向激活加一个向量来控制 LLM 行为，但**会显著掉点**（CAA / ITI / RepE 普遍 5-10× 的 utility hit）。本文定位主因：steering 向量扰动了 **query-key 内积**，导致注意力被错误路由到不重要的 token——"attention rerouting" 现象。

**方法**
- 把 steering 向量**投影到关键 focus token keys 的正交补空间**：
  - 模型用于推理的关键 token 集合上，注意力分布保持不变；
  - steering 信号仅可在尾部 token 上重分布。
- 与 CAA（无约束加性）的本质区别：闭式几何约束；
- 与 flow-based steering（2605.05892）的本质区别：训练自由、单步计算，不需要学习干预。

**效果**
- 在多项 steering 基准上，将 utility degradation **降低 5-7×**；
- 同时保留 **>95% 的 vanilla steering 效力**——近 Pareto 最优。

---

#### NeWTral: Automatic Safety Alignment Restoration through Neural Weight Translation
📄 [arxiv.org/abs/2605.04992](https://arxiv.org/abs/2605.04992) | 💻 暂未开源 | 机构：University of Pavia / Radboud / University of Zagreb

**问题**
第三方 LoRA adapter 即插即用时会**灾难性遗忘安全对齐**。事后的安全 SFT 又会**摧毁 adapter 的专业知识**。没有 zero-resource 方案同时保留两者。

**方法**
- **Neural Weight Translation**：学一个**权重张量映射函数**，把"不安全"领域 adapter 投影到 weight space 中的**安全 alignment manifold**——保留 adapter 的任务子空间，恢复对齐 invariance。
- 与 NLSR（神经元级再对齐，需安全数据）的本质区别：在权重空间做投影，无需任何安全样本；
- 与传统 safety fine-tuning 的本质区别：**零安全训练数据**。

**效果**
- 在 **4 个架构家族**（Llama / Mistral / Qwen / Gemma）× 最大 **72B** × 8 个专业领域上验证——在恢复安全护栏的同时保留 adapter 专业知识。

---

### ⚡ 高效推理 / 量化

#### WindowQuant: Mixed-Precision KV Cache Quantization for VLMs
📄 [arxiv.org/abs/2605.02262](https://arxiv.org/abs/2605.02262) | 💻 暂未开源 | 🤗 [HF Paper](https://huggingface.co/papers/2605.02262) | 机构：华中科技大学 / 平安科技 / 清华深圳

**问题**
VLM 视觉 token 序列（尤其长视频）使 KV cache 占内存巨大，decode 延迟不可忍受。现有 mixed-precision KV 量化（KVQuant / KIVI）做 **token 级 bit-width 搜索**——搜索慢，且 GPU 上 mixed precision 破坏 coalesced load。

**方法**
- **window 粒度**而非 token 粒度：
  - **Window-level quantization search**：用窗口内视觉 token 与 prompt 的相似度，给与文本相关的窗口分配高 bit-width；
  - **Window-level KV cache computation**：按精度对窗口重排，再量化——每个 kernel 看到的是同精度块，**恢复内存合并访问**。
- 与 KVQuant 的本质区别：token-granular 无 prompt awareness vs window-granular + prompt-aware；
- 与 AWQ 的本质区别：weight-only vs KV。

**效果（具体数字）**
- LLaVA-OneVision-Qwen2：**NExT-QA 67.8 → 78.9** / EgoSchema 59.8 → 64.1 / IntentQA 64.9 → 69.4。
- InternVL2：**NExT-QA 68.7 → 76.1** / EgoSchema 48.8 → 55.8 / IntentQA 67.5 → 75.9 / MVBench 53.5 → 58.2。
- Qwen2-VL 上保持 ~74.6 NExT-QA。
- 同时减少 KV 内存 + 提升 decode 吞吐 vs SOTA KV 量化基线。

---

### 🌐 其他值得追踪的 4 月论文（2604.XXXXX）

#### Fast NF4 Dequantization Kernels for LLM Inference
📄 [arxiv.org/abs/2604.02556](https://arxiv.org/abs/2604.02556)
- 在 Gemma 27B / Qwen3 32B / Llama 3.3 70B 上**核 2.0-2.2× 加速**——HF 生态可即插即用的小改动。

#### MoBiE: Binary Experts for MoE LLMs
📄 [arxiv.org/abs/2604.06798](https://arxiv.org/abs/2604.06798)
- 在 Qwen3-30B-A3B 上 PPL ↓ **52.2%**、zero-shot 平均 ↑ **43.4%**、推理 **>2× 加速**——首个面向 MoE 的二值化框架。

#### PolyKV: Shared KV Cache for Multi-Agent LLM Inference
📄 [arxiv.org/abs/2604.24971](https://arxiv.org/abs/2604.24971)
- Llama-3-8B + 15 agent 共享 4K 上下文：**KV 19.8 GB → 0.45 GB（-97.7%）**，PPL 仅退化 +0.57%。

#### BenchGuard: Auto-Auditing of Agent Benchmarks
📄 [arxiv.org/abs/2604.24955](https://arxiv.org/abs/2604.24955)
- 在 ScienceAgentBench 中自动定位作者承认的 12 项问题；BIXBench Verified-50 上与专家发现的 issue 重合 **83.3%**。

---

## 【模块四】开源项目周榜

> 数据来源：Trendshift、Shareuhack、askglitch Weekly 18 综合报道（5/4-5/11 区间）。

#### [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) ⭐ ~110k（本周 +6,000~8,000）
- 一句话描述：把 Andrej Karpathy 关于 LLM 编程陷阱的 4 条原则浓缩进单文件 `CLAUDE.md`，让 Claude Code 等编程 agent 输出更靠谱。
- 上手难度：⭐☆☆ 简单
- 适用场景：往任何项目根目录一放就生效，无需配置复杂 prompt。

#### [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐ ~141k（本周 +5,000~7,000）
- 一句话描述：自我改进型开源 AI agent——从交互中学习，跨会话累积技能。5/7 发布 v2026.5.7（+864 commits / +588 PRs）。
- 上手难度：⭐⭐☆ 中等
- 适用场景：希望 agent 累积"机构记忆"而非每次重新开始的高频 power user。

#### [warpdotdev/warp](https://github.com/warpdotdev/warp) ⭐ ~52.8k（本周 +5,000~8,000）
- 一句话描述：开源的 agentic 终端开发环境，原生编排 Claude Code / Codex / Gemini CLI agent。
- 上手难度：⭐⭐☆ 中等
- 适用场景：希望终端原生并行运行多个编程 agent、替代 tmux + 手动 CLI 拼接的开发者。

#### [badlogic/pi-mono](https://github.com/badlogic/pi-mono) ⭐ ~35.9–43.9k（本周 +3,000~5,000）
- 一句话描述：模块化 AI agent 工具箱——编程 agent CLI / 多 provider LLM API / TUI + Web UI / Slack bot / vLLM pods 自托管。
- 上手难度：⭐⭐☆ 中等
- 适用场景：要"乐高式"装配 agent 产品而非用单体框架的工程师。

#### [AIDC-AI/Pixelle-Video](https://github.com/AIDC-AI/Pixelle-Video) ⭐ ~10.4k（本周 +4,000，单日曾 +1,011）
- 一句话描述：端到端短视频自动化生成引擎——给定主题，自动生成脚本、视觉素材、旁白、BGM、最终成片。
- 上手难度：⭐⭐☆ 中等
- 适用场景：TikTok / Shorts / Reels 内容批量生产；教育/产品讲解视频管线。

#### [zilliztech/claude-context](https://github.com/zilliztech/claude-context) ⭐ ~10.6k（本周 +1,500~2,000）
- 一句话描述：把代码库索引到 Milvus/Zilliz 的语义代码搜索 MCP server——让 Claude Code / Cursor / Windsurf / Codex CLI / Gemini CLI 都能用 BM25 + 向量混合检索。
- 上手难度：⭐⭐☆ 中等
- 适用场景：大代码库下，希望编程 agent 不把整个 repo 塞进上下文（成本+延迟双杀）的团队。

#### [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) ⭐ ~103k（本周 +1,500）
- 一句话描述：100+ 即用型 AI agent / RAG / 多 agent / 语音 / MCP 应用 cookbook——provider-agnostic（Claude / Gemini / GPT / Llama / Qwen）。
- 上手难度：⭐☆☆ 简单
- 适用场景：克隆模板换 API key 即可上线，是 LLM 应用快速起步的最佳学习库。

#### [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) ⭐ ~73.2k（本周 +2,000~3,000）
- 一句话描述：多 agent LLM 交易框架——模拟真实交易公司：基本面分析师、情绪分析师、技术分析师、交易员、风控经理通过 debate + vote 给出交易决策。
- 上手难度：⭐⭐⭐ 较难
- 适用场景：量化研究员、金融科技团队原型化 LLM 驱动策略 / 多 agent debate 系统。

---

## 【模块五】行业动态简报

📅 **05/04** | [融资] **Sierra 完成 $950M 融资，估值 >$150 亿**：Tiger Global + GV 领投。企业 agent 平台赛道加剧。([TechCrunch](https://techcrunch.com/2026/05/04/sierra-raises-950m-as-the-race-to-own-enterprise-ai-gets-serious/))

📅 **05/04** | [产品/定价] **豆包推出 ¥68 / ¥200 / ¥500 三档付费订阅**：聚焦 PPT、数据分析、视频制作。日 token 用量超 120 万亿（vs 启动时 +1000×）。中国媒体广泛解读为"免费时代终结"。([澎湃](https://m.thepaper.cn/newsDetail_forward_33096657))

📅 **05/05** | [产品] **ServiceNow Knowledge 2026 发布 Autonomous Workforce**：AI specialist 端到端完成业务流程；与 Microsoft、Nvidia 合作。([Fortune](https://fortune.com/2026/05/05/servicenow-knowledge-2026-autonomous-workforce-microsoft-nvidia-ai-announcements/))

📅 **05/05** | [并购] **SAP ~ $1.16B 收购德国 Prior Labs**：18 个月初创，押注欧洲前沿 AI 人才。([TechCrunch](https://techcrunch.com/2026/05/05/sap-bets-1-16b-on-18-month-old-german-ai-lab-and-says-yes-to-nemoclaw/))

📅 **05/05** | [政策] **美国 CAISI 与 Google DeepMind / Microsoft / xAI 签预发布评估协议**：将前沿模型测试范围从 OpenAI/Anthropic 扩展到所有前沿实验室。([CNBC](https://www.cnbc.com/2026/05/05/ai-oversight-trump-google-microsoft-xai.html))

📅 **05/06** | [机器人] **Genesis AI 全栈具身演示**：Khosla 系初创，硬件 + 基础模型同步发布，具身 AI 赛道升温。([TechCrunch](https://techcrunch.com/2026/05/06/khosla-backed-robotics-startup-genesis-ai-has-gone-full-stack-demo-shows/))

📅 **05/07** | [法规] **EU AI Act Omnibus 简化方案达成临时一致**：监管沙盒截止延至 2027/8/2；AI 生成内容透明度宽限期由 6 月缩为 3 月（新截止 2026/12/2）；新增"nudification 应用"明文禁令；明确 AI Office 与各国当局职责。高风险系统规则按计划 2026/8/2 生效。([Consilium](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/))

📅 **05/08** | [基础设施] **中国移动上线国家级大模型聚合平台（300+ 模型）**：首创 token 合并计费 + 任务自动路由。同周 Tencent Cloud AI 算力价格上调（5/9 生效），加入阿里、百度的提价队伍。([Chinaz](https://www.chinaz.com/ainews/27812.shtml))

📅 **本周** | [产品+合作] **Anthropic Claude Opus 4.7 GA + SpaceX 算力合同**：SWE-bench 80.9%；Pro/Max/Team 速率上限翻倍；与 Blackstone / Hellman & Friedman / Goldman Sachs 组建企业 AI 服务合资。([Anthropic](https://www.anthropic.com/news/claude-opus-4-7))

---

## 【模块六】中文社区热点

### 话题 1：大模型"免费时代"是否终结？
- **为什么热**：豆包 5/4 三档付费上线，引爆 36 氪、量子位、澎湃、人人都是产品经理的多日讨论；Zhipu 一年内连续提价 3 次（累计 +83%）形成对比。
- **正方（商业化必然）**：算力成本不可持续；豆包日均 120 万亿 token，纯免费无以为继；为生产力场景付费是合理路径。
- **反方（免费仍是基本盘）**：DeepSeek / Qwen / Wenxin 坚持免费作为核心竞争力；豆包自己也承诺"基础功能永久免费"，C 端用户感受不到本质变化。
- 代表性内容：[澎湃 / 豆包付费档](https://m.thepaper.cn/newsDetail_forward_33096657)、[人人都是产品经理](https://www.woshipm.com/share/6391822.html)

### 话题 2：GPT-5.5 vs Claude Opus 4.7 编程王座之争
- **为什么热**：5/5 GPT-5.5 Instant 发布距 Claude Opus 4.7 仅 8 天；36 氪、知乎、SegmentFault 整周都是头对头评测。
- **正方 GPT-5.5**：Terminal-Bench 2.0 **82.7%**（Opus 4.7: 69.4%）；GDPval **84.9%**（80.3%）。
- **正方 Claude Opus 4.7**：SWE-bench 仍守 **80.9%** 历史高位；视觉 2576px 高分辨率；实操日常驾驶仍首选。
- 代表性内容：[36 氪评测](https://www.36kr.com/p/3780018156311810)、[腾讯云开发者](https://cloud.tencent.com/developer/article/2659979)

### 话题 3：国产 AI 编程工具大爆发 — TRAE SOLO / Cursor 3 / Claude Code 三国杀
- **为什么热**：字节 TRAE SOLO 独立版、Cursor 3（Glass + Agent Workspace）、Claude Code GA（1M token 上下文）连续登场；知乎、CSDN 横评文章井喷。
- **主要观点分歧**：
  - "国产能打"：TRAE SOLO 免费 + SOLO Builder + Coder 双 agent 工作流；
  - "西方仍领先"：Cursor 3 + Claude Code 在复杂 agent 任务和稳定性上仍胜出。
- 代表性内容：[知乎评测](https://zhuanlan.zhihu.com/p/1999804779141030200)、[CSDN 横评](https://blog.csdn.net/weixin_44822948/article/details/160746765)

### 话题 4：DeepSeek 巨额融资与战略转向
- **为什么热**：长期"自筹自建"的 DeepSeek 据传寻求 $3-4B 融资，估值最高 $50B；国家 AI 基金（¥600 亿）+ 腾讯为领投候选。叠加 V4 评价两极。
- **主要观点分歧**：
  - 乐观：资本是与字节 ¥2000 亿 AI 预算抗衡、推进华为 Ascend 950 部署的必要条件；
  - 怀疑：拿了"国资属性"的钱后，DeepSeek 是否还能维持低价开源精神？V4 评价分化是否预示路线问题？
- 代表性内容：[IDNFinancials](https://www.idnfinancials.com/news/63578/deepseek-targets-about-us4-billion-to-take-on-bytedance-and-alibaba)、[Fortune V4 评测](https://fortune.com/2026/04/24/deepseek-v4-ai-model-price-performance-china-open-source/)

### 话题 5：小红书 AI 治理与"劣质假人"之争
- **为什么热**：小红书内部宣布顶层组建 AI 部门 Dots + 企业智能单元；披露 2026 年已治理 100 万+ AI 滥用案例（80 万+ AI 操控账号、15 万+ 假 AI 笔记）；同周估值传到 ¥3500 亿。
- **主要观点分歧**：
  - "AI 放大创意"：贴标 AI 内容是创作者生产力工具；
  - "AI 制造垃圾"：AI 在掏空社区"人感"，故有此次大整治。
- 代表性内容：[新浪 / AI 劣质假人](https://finance.sina.com.cn/jjxw/2026-04-28/doc-inhwaawe7238075.shtml)、[新浪 / 3500 亿小红书](https://finance.sina.com.cn/cj/2026-05-08/doc-inhxerwi4246819.shtml)

---

## 【模块七】本周实用工具推荐

### OpenAI Voice Intelligence API（GPT-Realtime-2 / Translate / Whisper）
- 链接：[openai.com / advancing voice intelligence](https://openai.com/index/advancing-voice-intelligence-with-new-models-in-the-api/)
- 解决什么问题：可即插即用的语音层——自然语音 agent、实时多语种同传、流式 ASR 用于字幕/会议记录。
- 如何快速上手：1）`platform.openai.com` 拿 API key，选择 `gpt-realtime-2` / `-translate` / `-whisper`；2）通过 Realtime API 的 WebSocket 启动会话，官方 Voice Agents SDK 提供可直接复制的 starter。
- 适合：开发者
- 费用：按用量计费——`gpt-realtime-2` 音频 $32/M input token（缓存 $0.40）/ $64/M output；`-translate` $0.034/分钟；`-whisper` $0.017/分钟（70+ 输入语言 / 13 输出语言）。

### Cursor 3（Agents Window）
- 链接：[cursor.com](https://cursor.com)
- 解决什么问题：并行运行多个 AI 编程 agent——本地 repo / git worktrees / 云端 / 远程 SSH 同时编排。`/worktree` 隔离 agent 改动，`/best-of-n` 让多个模型 race 同一任务。
- 如何快速上手：1）从 cursor.com 安装 Cursor 3（VS Code fork，可导入设置）；2）`Cmd+Shift+P` → "Agents Window" 派发首个并行任务。
- 适合：开发者
- 费用：Freemium——Hobby 免费 / Pro $20/月 / Pro+ $60/月 / Ultra $200/月 / Teams $40/座位月。

### Kimi K2.6（Moonshot AI）
- 链接：[kimi.com](https://www.kimi.com) · API [platform.kimi.ai](https://platform.kimi.ai)
- 解决什么问题：长程编程 / 前端设计 / agent swarm；256K 上下文 + 原生多模态——可丢截图驱动代码编辑。开源（modified MIT），允许自托管。
- 如何快速上手：1）`kimi.com` 登录直接免费聊；2）需要 API/自托管时去 `platform.kimi.ai` 拿 key，或从 HF 拉权重用 vLLM/SGLang。
- 适合：两者皆可（C 端聊天体验友好，API + agent swarm 面向开发者）
- 费用：聊天有免费层；订阅 Moderato $19 / Allegretto $39 / Allegro $99 / Vivace $199 月（高档解锁最多 300 并行子代理）；API $0.60/M input、$2.50/M output；自托管免费。

### Google AI Studio + Antigravity（全栈 Vibe Coding）
- 链接：[aistudio.google.com](https://aistudio.google.com)
- 解决什么问题：从一句话生成可部署的全栈应用——前端 + Firebase 后端 + Auth + 数据库，全程浏览器内完成。可并行运行多个编程 agent，可选 8 个模型（Gemini 3.1 Pro / Gemini 3 Flash / Claude Sonnet 4.6 / Opus 4.6 / GPT-OSS 120B 等）。
- 如何快速上手：1）Google 账号登录；2）点 "Build"，描述应用，Antigravity 自动生成前端 + 配置 Firebase。
- 适合：两者皆可（非技术构建者做原型；开发者做生产脚手架）
- 费用：公测期免费，Gemini 3 Pro 速率宽松；上线 Firebase 按正常用量计费。

### Claude Design（Anthropic Labs）
- 链接：[anthropic.com / claude-design-anthropic-labs](https://www.anthropic.com/news/claude-design-anthropic-labs)
- 解决什么问题：对话驱动设计——生成原型、提案 deck、落地页、应用 mockup，输出是**代码驱动的活画布**（不是平图），可直接交给 Claude Code 实现。底座 Claude Opus 4.7。
- 如何快速上手：1）任一 Claude 付费档（Pro $20/月+）；2）从 Labs / 侧栏入口打开 Claude Design 描述目标。
- 适合：两者皆可（尤其 PM、创始人、运营无 Figma 用户）
- 费用：捆绑于 Claude 订阅，独立周用量预算。无免费档；Pro $20/月 / Max $100 或 $200/月 / Team & Enterprise 商谈。

---

## 【数据源与生成说明】

- **报告生成时间**：2026-05-11
- **论文 arXiv ID 覆盖范围**：`2604.02556` – `2605.06638`
- **主要数据来源**：
  - 论文：Hugging Face Daily Papers、Papers With Code Trending、arXiv cs.CL / cs.AI / cs.LG / cs.CV / cs.RO
  - 模型：OpenAI Blog / Anthropic News / Google blog / Mistral News / ByteDance Volcano Engine / Z.ai / AIbase / HuggingFace Models trending
  - 开源项目：Trendshift / askglitch Trending Week 18 / Shareuhack GitHub Weekly
  - 行业新闻：TechCrunch / Fortune / CNBC / Axios / Consilium EU / IAPP / 36Kr / 量子位 / 澎湃 / 新浪科技
  - 中文社区：机器之心 / 量子位 / 新智元 / PaperWeekly / AIbase / 知乎 / 小红书
- **数据截止时间**：2026-05-11 01:00 UTC
- **arXiv ID 校验**：本报告全部 13 篇主推论文 + 4 篇延伸论文 ID 已逐一核对前四位 = `2604` 或 `2605`。

---

*本报告由 AI 自动生成，事实数据来自公开来源，可能存在传讹或时效误差，敬请以原文为准。*

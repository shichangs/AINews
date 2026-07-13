# AI 技术周报 · 2026-07-13

覆盖周期：2026-07-06 ~ 2026-07-13 ｜ 面向读者：算法研究员

---

## 【模块一】本周导读

- 🔴 **最重要的变化：前沿闭源模型进入"价格-效率战"深水区。** OpenAI 7/9 全量发布 GPT-5.6 三档家族（Sol/Terra/Luna，Terra 性能对标 GPT-5.5 但便宜 2 倍），xAI 7/8 发布 Grok 4.5（$2/$6，SWE Marathon 29.0% 登顶且 token 效率约为 Opus 4.8 的 4 倍），叠加上周末 Claude Sonnet 5（$2/$10 介绍价）——三家在同一周把"Opus 级能力"打到 $2 输入价位。判断：模型能力边际差距缩小后，单位智能成本与 token 效率正取代跑分成为主战场。
- 🟡 **值得关注但尚未明朗：实时交互视频/世界模型集中爆发。** 本周 HF 论文榜前列几乎被该方向占据——生数 Vidu S1（消费级 GPU 540p@42FPS 实时语音驱动）、AlayaWorld（全栈开源可玩世界）、蚂蚁灵波 LingBot 三连发、阿里达摩院 RynnWorld-4D。技术路线（AR+Diffusion 混合、MoE 视频预训练）在收敛，但商业形态（游戏？数字人？机器人训练场？）仍未明朗。
- 🟢 **对开发者最有实际价值：agent 运行成本全面跳水。** 腾讯混元 Hy3 开源（295B MoE 激活仅 21B，API ¥1/¥4 每百万 tokens）、GLM-5.2 持续霸榜 HF、OmniRoute 免费网关聚合 231+ 提供商；另注意 DeepSeek V4 将引入峰谷定价（高峰时段翻倍），批处理任务建议提前改造成错峰调用。

**下周预告：**
1. WAIC 2026 世界人工智能大会，7/17–20 上海，"三地四馆"、140+ 场论坛；
2. DeepSeek V4 正式版官宣 7 月中旬上线（V4-Pro 1.6T/激活 49B），且 7/24 起 deepseek-chat / deepseek-reasoner 旧模型名废弃，接入方需尽快迁移；
3. Mistral 新一代开放权重 MoE 旗舰（"fat but sparse"）本月进入 early access；Grok 4.5 预计 7 月中旬登陆欧盟区。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**GPT-5.6 家族：Sol / Terra / Luna（OpenAI，7/9 全量发布）**
- 核心亮点：三档定位——Sol（旗舰）、Terra（均衡）、Luna（低价快速）；新增 `max` reasoning effort 与 `ultra` 模式（多子代理协作处理复杂任务）；Terminal-Bench 2.1 编码 SOTA；上下文 150 万 tokens；7 月起 Sol 在 Cerebras 上以最高 750 tokens/s 提供。
- 与上一代对比：Terra 性能对标 GPT-5.5 但价格便宜 2 倍；官方称 Sol 编码任务 token 效率提升 54%。
- 定价/访问：每百万 tokens Sol $5/$30、Terra $2.50/$15、Luna $1/$6，缓存读取九折；经 ChatGPT、Codex、API 提供，已进入 Microsoft 365 Copilot。
- 适合用户：企业级编码/agent 工作流选 Sol，日常办公选 Terra，高并发低成本场景选 Luna。
- 来源：[OpenAI 官方](https://openai.com/index/previewing-gpt-5-6-sol/)、[TechCrunch](https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6/)

**GPT-Live-1 / GPT-Live-1 mini（OpenAI，7/8）**
- 全双工语音模型（边说边听、可被打断），对话轮替更自然；ChatGPT 语音模式默认启用（Go/Plus/Pro 用完整版，免费用户用 mini）；发布时暂无 API。
- 来源：[TechCrunch](https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/)

**Grok 4.5（xAI，7/8）**
- 核心亮点：面向编码、agentic 任务与知识工作；SWE Marathon 29.0% 第一、Terminal Bench 2.1 83.3%；80 TPS 输出速度 + 约 2 倍 token 效率（SWE Bench Pro 平均输出 15,954 tokens，对比 Opus 4.8 max 的 67,020）；与 Cursor 联合训练，Office 场景（Excel 多表建模、PPT 原生图形）表现突出。
- 对比：Musk 称"Opus 级但更快更省"；系 xAI 上市并收购 Cursor 后首个发布。第三方报道称基于 1.5T 参数底座（官方未确认，存疑）。
- 定价/访问：$2/$6 每百万 tokens；Grok Build、Cursor 全计划、xAI API 可用（前两者限时免费）；EU 暂不可用（预计 7 月中）。
- 来源：[x.ai 官方](https://x.ai/news/grok-4-5)、[TechCrunch](https://techcrunch.com/2026/07/08/spacexai-releases-grok-4-5-which-elon-describes-as-an-opus-class-model/)

**Claude Sonnet 5（Anthropic，6/30，窗口边缘）**
- 1M token 上下文、128K 最大输出；接近 Opus 性能但价格减半，主打低成本 agent 运行；介绍价 $2/$10（至 8/31，之后 $3/$15）；Free/Pro 默认模型。
- 来源：[Anthropic 官方](https://www.anthropic.com/news/claude-sonnet-5)

**Google DeepMind / Meta：本周无重大模型发布。** Google 仅有产品功能更新（Gemini Enterprise 加入 AlphaEvolve GA 等）；有传闻称 Gemini 3.5 Pro 推迟至 7 月，来源较弱仅供参考。

### ② 国内大模型

**腾讯混元 Hy3（7/6，开源）—— 本周国内最大发布**
- 是否开源：是，[HF: tencent/Hy3](https://huggingface.co/tencent)（现为 HF trending 第一）。
- 核心能力：MoE 架构，总参 295B / 激活 21B，192 专家 top-8 路由，3.8B MTP 层，256K 上下文，快慢思考融合。内部 270 位专家盲测 2.67/4，优于 GLM-5.1（2.51/4），前端/数据/CI-CD 类别优势显著。
- 与国际对比：官方称比肩 2–5 倍参数量的旗舰模型；激活参数仅 21B，推理成本优势明显。
- 获取方式：HF 权重直接下载；API 输入 ¥1 / 输出 ¥4 每百万 tokens；元宝等近 50 个腾讯业务已接入。
- 来源：[新华网](http://www.news.cn/tech/20260706/d611426ecba54475b2dd94920e4e3557/c.html)、[财新](https://companies.caixin.com/m/2026-07-06/102461428.html)

**阶跃星辰 Step Edge 端侧全家桶（7/12）**
- 是否开源：来源未明确，经终端厂商合作与[阶跃开放平台](https://platform.stepfun.com/)获取。
- 核心能力：四款端侧模型——Edge 基础（文本视觉融合理解）、Edge Audio（语音交互）、Edge GUI（屏幕操作/手机 Agent）、Edge Gen（端侧图像生成编辑），面向手机与汽车终端，补齐"Pro+Flash+Edge"三层布局。
- 与国际对比：国际厂商端侧多为单一小模型（如 Gemma 端侧版），Step Edge 以"场景全家桶"形式打包是差异点。
- 来源：[ITBear](https://www.itbear.com.cn/html/2026-07/1441199.html)

**DeepSeek V4（官宣定档 7 月中旬，截至 7/13 正式版尚未上线）**
- 规格：V4-Pro 总参 1.6T/激活 49B；V4-Flash 总参 284B/激活 13B；全系 1M 上下文；官方称推理计算量仅为 V3.2 的 27%，显存占用降至前代 10%。预览版权重 MIT 开源。
- 重要变化：首次引入 API 峰谷定价（高峰 9:00–12:00、14:00–18:00 价格翻倍）；旧模型名 7/24 废弃。
- 本周动态：[unsloth/DeepSeek-V4-Flash-GGUF](https://huggingface.co/unsloth)（7/6）进入 HF trending，本地部署热度高。
- 来源：[TechNode](https://technode.com/2026/06/30/deepseek-to-launch-v4-in-mid-july-with-new-peak-time-api-pricing/)、[DeepSeek API 文档](https://api-docs.deepseek.com/news/news260424/)

**智谱 Z.ai：发布 ZCode agent harness（7 月上旬）**
- GLM-5.2 本体为 6/13 发布（744B MoE、1M 上下文、MIT 开源，agentic 基准逼近 Opus 4.8 而成本约 1/5），本周新动作是发布 ZCode 执行框架对标 Anthropic 的 agent harness；GLM-5.2 仍居 HF trending 前三。
- 来源：[SCMP](https://www.scmp.com/tech/tech-trends/article/3359170/zhipu-ai-releases-harness-glm-52-model-chinese-firm-takes-aim-anthropic)、[HF: zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)

**MiniMax：官宣 M3 Pro（7/8，预告性质）**
- 计划中的 2.7 万亿参数新模型；现役主力 M3（6/1 发布，1M 上下文、稀疏注意力）已在 HF。
- 来源：[GuruFocus](https://www.gurufocus.com/news/8948951/minimax-develops-new-ai-model-with-27-trillion-parameters)

**美团 LongCat-2.0（7/5，开源）**
- [HF: meituan-longcat/LongCat-2.0](https://huggingface.co/meituan-longcat/LongCat-2.0) 上架并进入 trending；开源文本生成模型，详细规格建议查阅模型卡。

**本周无重大发布：** 阿里 Qwen（旗舰 Qwen3.7 为 5 月发布，衍生微调模型仍霸榜 HF）、月之暗面 Kimi（最近为 6/12 的 K2.7 Code，K3 仍是传闻）、百度文心（5 月发布文心 5.1 后无官方新动作）、字节豆包（Seedance 2.5 官宣 7 月上线，截至 7/13 未见正式上线确认）、零一万物（已转向企业方案业务）。

### ③ 其他重要开源模型

**Gemma 4 技术报告发布（arXiv 2607.02770，7 月上旬）**
- 参数规模：2.3B–31B 稠密 + MoE 套件（E2B/E4B/26B-A4B/31B）；模型权重此前已发布，本周技术报告公开是研究者关注点。
- 亮点：12B 版采用统一 encoder-free 架构直接摄入原始音频与图像 patch；集成 thinking mode；256K 上下文、140+ 语言。
- 获取：[HF: google/gemma-4-31B-it](https://huggingface.co/google/gemma-4-31B-it) 等；适合需要开源多模态+推理能力的场景。

**Mistral 两款垂类开源发布**
- Robostral Navigate（7/8）：机器人单目视觉导航模型，硬件无关、纯仿真训练。[官方](https://mistral.ai/news/robostral-navigate/)
- Leanstral 1.5（7/2）：Lean 4 形式化定理证明模型。[官方](https://mistral.ai/news/leanstral-1-5/)

**其他 HF 本周热门**：nvidia/Nemotron-Labs-Audex-30B-A3B（30B MoE 激活 3B，音频方向，7/6）、lingbot-video-moe-30b-a3b（具身视频，7/8）、ThinkingCap-Qwen3.6-27B（7/6）等。
- 注：本周来源中除 DeepSeek 官方"显存占用降至前代 10%"外，各模型均未给出明确最低显存数字，此处不做估算。

---

## 【模块三】热门论文精选

> 时间核验：以下论文 arXiv ID 前四位均为 2607（2026 年 7 月）或 2606（2026 年 6 月），已逐篇在 arXiv abs 页核验。HF 点赞数为 7/13 抓取值。效果数字均摘自论文摘要原文；摘要未给数字处如实标注。

### 🧠 LLM / 推理与训练

**The Mirage of Optimizing Training Policies: Monotonic Inference Policies as the Real Objective for LLM Reinforcement Learning**
📄 [arXiv 2606.29526](https://arxiv.org/abs/2606.29526) | 💻 暂未开源 | 🤗 HF ⭐ 161（本周期最高）| 机构：未标注（作者含 Jing Liang、Hongyao Tang、Weixun Wang 等）

**问题**
LLM RL 训练普遍采用分离的推理引擎（rollout 采样）与训练引擎（梯度计算），即使参数严格同步，同一轨迹在两侧的对数概率也不一致——这构成一种"始终存在"的 off-policy 污染。更关键的是以往 mismatch 校正类工作忽略的目标错位：对训练引擎策略的有效梯度更新，并不保证部署端推理策略的性能改进。

**方法**
- 提出新优化目标 MIPI（Monotonic Inference Policy Improvement）：把优化对象从训练引擎策略显式改为推理（部署）策略的单调改进；
- 两步框架 MIPU：先构造以 sampler 策略为参照的候选更新，再用"推理侧差距代理量"对同步后的候选更新做选择性接受；
- 与 PPO/GRPO 系方法的本质区别：后者默认训练策略 = 部署策略，在 train/inference 引擎数值行为分离的现实工程栈下该假设不成立；MIPU 直接对部署侧目标做单调性约束，而非事后做重要性采样校正。

**效果**
- 两个模型规模、高 mismatch 设定下提升平均推理性能与训练稳定性；摘要未给出具体 benchmark 数字。

**OmniOpt: Taxonomy, Geometry, and Benchmarking of Modern Optimizers**
📄 [arXiv 2607.04033](https://arxiv.org/abs/2607.04033) | 💻 [GitHub](https://github.com/OpenRaiser/OmniOpt) | 🤗 HF ⭐ 74 | 机构：未标注 | 91 页综述+基准

**问题**
Adam 之后出现 100+ 优化器（Muon/Shampoo 类矩阵预条件方法等），大规模训练中的优化器选择受算力、显存、调参预算、任务多样性的联合约束，但领域缺乏统一坐标系，实践者只能靠零散对比实验。

**方法**
- 把任意优化器的更新规则拆解为五阶段元流水线，指出多数方法只修改其中 1–2 个阶段；
- 用范数约束的线性最小化 oracle（LMO）为各类优化器提供统一几何视角；
- 建立"机制族 × 目标效果"的双维分类法，并在 LM 预训练到图像分类的跨域统一基准上系统分析各族权衡。

**效果**
- 综述/基准型工作，价值在于分类框架与跨域基准本身；摘要未给出单一 benchmark 数字。

### 👁️ 多模态

**Gemma 4 Technical Report**
📄 [arXiv 2607.02770](https://arxiv.org/abs/2607.02770) | 💻 权重开源（HF google/gemma-4 系列）| 🤗 HF ⭐ 59 | 机构：Google DeepMind

**问题**
开源模型在计算效率、原生多模态与推理能力上与前沿闭源模型仍有系统性差距，且多数开源多模态方案依赖外挂视觉/音频编码器。

**方法**
- 2.3B–31B 稠密 + MoE 套件（E2B/E4B/26B-A4B/31B），全系升级视觉/音频编码器；
- 12B 模型采用统一 encoder-free 架构，直接摄入原始音频与图像 patch，取消模态专用编码器；
- 集成 thinking mode 生成推理轨迹；针对推理速度/显存/长上下文（256K）做架构设计。

**效果**
- 摘要称在 STEM、多模态、长上下文基准上"跃升"，人评任务可与更大的前沿开源模型抗衡；摘要未给出具体数字。

**Vision as Unified Multimodal Generation（SenseNova-Vision）**
📄 [arXiv 2607.06560](https://arxiv.org/abs/2607.06560) | 💻 [GitHub](https://github.com/OpenSenseNova/SenseNova-Vision) | 🤗 HF ⭐ 44 | 机构：商汤 SenseNova

**问题**
检测、OCR、关键点、分割、深度、法向、点图、相机位姿等 CV 任务各需专用预测头与架构，无法并入通用基础模型统一训练与推理。

**方法**
- 将全部视觉任务重新表述为统一多模态模型原生的"文本+图像生成"：语言指令+可选视觉提示指定任务；符号类输出走文本通道，稠密空间预测走图像生成通道，组合任务走图文混合输出；
- 把海量 CV 标注转换为指令-响应语料（SenseNova-Vision Corpus），从现成统一多模态预训练模型继续训练，零任务专用头；
- 与传统"共享 backbone + 多头"范式的本质区别：任务接口完全由生成格式定义，新任务无需改架构。

**效果**
- 单一模型在结构化视觉理解、稠密几何预测、分割、多视几何上匹配领先的任务专用系统；摘要未给出具体数字。模型与语料已公开。

### 🤖 AI Agent / 工具使用

**UI-MOPD: Multi-Platform On-Policy Distillation for Continual GUI Agent Learning**
📄 [arXiv 2607.04425](https://arxiv.org/abs/2607.04425) | 💻 [GitHub](https://github.com/EliSpectre/UI-MOPD) | 🤗 HF ⭐ 68 | 机构：未标注（[项目页](https://elispectre.github.io/UI-MOPD/)）

**问题**
跨平台 GUI 轨迹数据稀缺且平台覆盖窄；不同平台（桌面/移动/Web）交互惯例差异大，联合或持续训练会出现行为模式混杂、平台专属能力退化与灾难性遗忘。

**方法**
- 构建高质量跨平台数据集 Uni-GUI；
- 首个把"多教师 on-policy 蒸馏"引入 GUI Agent 持续学习：按当前环境动态选择平台专属教师，通过平台条件化蒸馏把平台行为先验注入共享策略；
- 与普通 SFT/离线蒸馏的本质区别：蒸馏信号在学生自身 on-policy 轨迹上产生（教师对学生实际到达的状态给出监督），同时兼顾新平台适应与旧平台保持，直接针对分布漂移。

**效果**
- OSWorld 任务成功率 38.2%，MobileWorld 12.0%（摘要原文数字）。

**UniClawBench: A Universal Benchmark for Proactive Agents on Real-World Tasks**
📄 [arXiv 2607.08768](https://arxiv.org/abs/2607.08768) | 💻 [GitHub](https://github.com/HKU-MMLab/UniClawBench) | 🤗 HF ⭐ 27 | 机构：香港大学 MMLab

**问题**
现有 agent 基准依赖沙盒环境与单轮评测，且按"场景"分类把多种模型能力混入同一任务类，无法定位失败根因（是基座能力不足还是 agent 框架设计问题）。

**方法**
- 首个能力驱动的主动式 agent 基准：按技能使用、探索、长上下文推理、多模态理解、跨平台协同五项基础能力设计 400 个双语真实任务；
- 实时 Docker 容器中以细粒度分步检查点评测（而非仅终态判定）；
- executor–hidden supervisor–user 三 agent 闭环模拟多轮人类反馈且不泄露评分标准；
- 同一模型跨多个 agent 框架评测，解耦基座能力与框架设计的贡献。

**效果**
- 评测框架型工作，摘要未给出各模型具体分数。

### 🦾 具身智能 / 机器人

**RynnWorld-4D: 4D Embodied World Models for Robotic Manipulation**
📄 [arXiv 2607.06559](https://arxiv.org/abs/2607.06559) | 💻 [GitHub](https://github.com/alibaba-damo-academy/RynnWorld-4D) | 🤗 HF ⭐ 89 | 机构：阿里达摩院

**问题**
2D 像素视频世界模型与机器人低层末端执行器动作之间存在表征鸿沟（像素演化 ≠ 可执行控制信号）；且基于扩散的世界模型出动作需昂贵的多步去噪，无法满足闭环控制频率。

**方法**
- 以同步 RGB+深度+光流（RGB-DF）为物理接地的 4D 表征；
- 单一扩散过程从一张 RGB-D 图+语言指令联合生成未来 RGB/深度/光流：三分支架构 + 跨模态注意力 + 逐帧 3D RoPE，保证外观-几何-运动一致演化；
- 配套 Rynn4DDataset 1.0：2.544 亿帧，带深度/光流伪标签；
- RynnWorld-4D-Policy：逆动力学头直接消费世界模型内部 4D 表征，单次前向输出动作，绕过多步去噪实现闭环控制——这是与"世界模型生成视频再反解动作"路线的本质区别。

**效果**
- 真实世界灵巧双臂操作任务 SOTA，尤其空间精度与时序协同类任务；摘要未给出具体数字。

**Scaling Mixture-of-Experts Video Pretraining for Embodied Intelligence（LingBot-Video）**
📄 [arXiv 2607.07675](https://arxiv.org/abs/2607.07675) | 💻 [GitHub](https://github.com/robbyant/lingbot-video) | 🤗 HF ⭐ 49 | 机构：蚂蚁灵波 LingBot

**问题**
现有视频生成模型为内容创作设计，优先视觉保真与创意而非计算效率与物理真实，直接用于机器人控制存在域失配。

**方法**
- 面向具身智能的 DiT 视频预训练范式：架构上从零训练并扩展 MoE（而非稠密 DiT），以平衡容量与推理效率；
- 数据上用 profiling 引擎在互联网视频基础上大规模补充操作/导航/第一视角机器人素材；
- 训练上引入多维奖励系统对齐物理合理性与任务完成度，超越美学/指令跟随/运动一致性等内容创作指标；
- 自称首个大规模开源 MoE 视频基础模型。

**效果**
- 摘要未给出具体数字。

### 🔬 AI for Science

**SciReasoner: Accurate, Interdisciplinary and Transparent Structure-property Understanding with Deep Native Structural Reasoning**
📄 [arXiv 2607.07708](https://arxiv.org/abs/2607.07708) | 💻 [GitHub](https://github.com/SpectrAI-Initiative/SciReasoner) | 🤗 HF ⭐ 84 | 机构：上海人工智能实验室（参与）

**问题**
结构-性质关系建模面临表征与推理双重挑战：模型须保留领域原生结构信息（立体化学、成键、对称性、能量学、周期序），同时要能展示具体结构证据如何支撑预测（可解释性），现有方法把结构压缩为不可寻址的隐向量。

**方法**
- 跨蛋白质/小分子/无机晶体的多模态科学基础模型；
- 把坐标、拓扑、周期连接离散化为统一的结构感知词表（structure-aware vocabulary）；
- 推理时将结构 token 作为可寻址的证据单元，使结构本身成为可检查的推理基底——与"隐向量 + 事后归因"范式的本质区别。

**效果**
- 同源控制 GO 预测中低同源/

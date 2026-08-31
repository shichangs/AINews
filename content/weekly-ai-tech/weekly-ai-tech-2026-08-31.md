# AI 技术周报 · 2026-08-31

> 覆盖周期：2026-08-24 — 2026-08-31 ｜ 面向：算法研究员与 AI 工程师

---

## 【模块一】本周导读

🔴 **本周前沿模型发布被中国厂商包揽，且两家实验室在互不通气的情况下收敛到了同一套架构配方。** 8/26 智谱开源 GLM-5.3-Flash（320B-A18B，MIT，1M 上下文），同日阿里开源 Qwen3.8-Flash-Next（125B 主干 / 6B 激活），8/28 腾讯开源 Hy4 preview（770B-A49B，Apache 2.0）。同期 OpenAI、Anthropic、Meta、Mistral 均无新模型。更值得记的是架构层面：GLM 与 Qwen 在相隔一天的发布中，独立收敛到 3:1 的线性/全注意力配比、4× 压缩后保留 2048 token 的稀疏预算、4 分支门控残差流、Muon 优化器四项配置上——这四点已构成中国开源阵营的事实共识。（来源：[MarkTechPost 架构比对](https://www.marktechpost.com/2026/08/28/glm-5-3-flash-vs-qwen3-8-flash-next-two-chinese-ai-labs-independently-converge-on-the-same-model-architecture/)）

🟡 **"harness 智能"正在从工程实践升格为可训练、可迁移的独立能力维度，但尚无统一评测口径。** 本周 HF Daily Papers 上有至少五篇论文（JIT-Agent、AutoSaddler、Recuris、Prime Agent、WikiSkill）不改动模型权重，只优化 agent 外壳——记忆管理、规划策略、动作协议、技能编排——就拿到两位数的 benchmark 提升。GitHub 周榜同步印证：前十里六个是 Agent Skills 包或插件市场。趋势明确，但各论文的 harness 定义、基线选择、评测环境互不兼容，横向比较目前不成立。

🟢 **对研究者最有直接价值的是 on-policy distillation（OPD）的方法族爆发，以及 TTPO 把它推进到了无标签场景。** 本周 HF 榜上 OPD 相关论文有七篇之多（Self-OPD、SecOPD、Open-MOPD、D³-MOPD、OPDVR、DiffusionOPSD、TTPO），横跨 flow matching、prompt injection 防御、多教师蒸馏与测试时训练。其中 TTPO（2608.27448）最值得复现：无任何标签的情况下追平有标签监督的 OPD，Qwen3-1.7B 从 38.0% 提到 45.2%，且代码已开源。

### 下周预告

1. **NeurIPS 2026 rebuttal 与 camera-ready 窗口**——本周 HF 榜上大量投稿版本论文将出更新，建议对已收录论文的 v2 版本追踪数据变化。
2. **字节豆包大模型 2.2**——原定 8 月发布，8/31 官方宣布推迟，理由是编程与工具调用能力未达预期，下周为可能的重新定档窗口。（来源：[AIbase](https://www.aibase.com/zh/news/30702)）
3. **英伟达收购 Hugging Face 的最终协议**——8/26 The Information 首报 129 亿美元，Business Insider 同日称尚未签署最终协议、仍可能告吹，双方均未置评。下周是官宣或辟谣的关键窗口。（来源：[TechCrunch](https://techcrunch.com/2026/08/26/nvidia-closes-in-on-hugging-face-acquisition/)）

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**本周美系厂商在通用模型上交了白卷，只在专用模型上有动作。** OpenAI、Anthropic、Meta、Mistral、xAI 本周均无新模型发布；Google 发了两个专用模型，Cohere 发了一个文档解析模型。OpenAI 本周的动作集中在基础设施（8/25 发布自研推理芯片 Jalapeño）与产品（8/26 o3 正式从 ChatGPT 下线，90 天日落期结束）。Anthropic 8/29 开放的 MHS（Model Hardware Standard）是硬件互操作规范，不是模型。

#### Gemini 3.5 Transcribe（Google DeepMind，2026-08-27，公开预览）

- **发布方与形态**：Google DeepMind，闭源纯 API，无开放权重。两个独立端点：`gemini-3.5-transcribe`（Interactions API，处理录制文件）与 `gemini-3.5-transcribe-live`（Live API，双向流式）。
- **核心亮点**：85+ 语种自动检测，支持句内 code-switching；提供 `verbatim`（保留口头语）与 `smart`（去填充词、内联解析口误自我纠正）两种模式。
- **Benchmark**：Artificial Analysis 第三方测量，平均 **WER 流式 4.0% / 非流式 2.6%**；多语种 FLEURS 流式 5.50% / 非流式 5.04%。
- **与上一代对比**：最终转写时间（time to final transcription）较 **Chirp 3 改善 70%**。
- **硬限制**：Live 会话连续流式上限 10 分钟，不支持说话人分离与词级时间戳；Interactions 端支持分离 + 词级时间戳 + 最多 1000 词自定义词表（<100 词效果最佳），标准请求最长 1 小时音频，开启分离或词级时间戳后降至 30 分钟；`smart` 模式不能与时间戳或分离共用。
- **定价**：混合成本约 **$0.005/分钟（批处理）、$0.009/分钟（实时）**。
- **适合**：呼叫中心与 CX 平台、临床文书、媒体字幕本地化、法律与保险受理、会议工具。
- 来源：[Google Blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/) ｜ [官方文档](https://ai.google.dev/gemini-api/docs/transcribe)

#### Gemini Omni 1.1 Flash（Google DeepMind，2026-08-29）

- **发布方与形态**：闭源，`gemini-omni-1.1-flash`，原生多模态视频生成与编辑。
- **核心亮点**：场景延展（scene extension）现读取**前 10 秒**上下文（上代仅读末帧），以 10 秒为增量累计至 **40 秒**，单次调用生成 3–10 秒续接；新增首尾帧插值（`<FIRST_FRAME>` / `<LAST_FRAME>`）与视频参考（`<VIDEO_REF_N>`，最多 3 段、每段 ≤3 秒）用于角色一致性。
- **成本控制**：`resolution` 支持 360p / 720p（默认）/ 1080p / 4k；360p 草稿**快 60%、成本为 720p 的 1/3**，1080p 与 4K 为上采样输出。
- **定价**：输入 **$1.50/百万 token**（文本/图像/视频/音频统一），输出 **$9.00/百万文本 token、$17.50/百万视频 token**；720p 按 5792 token/秒计费，折合约 **$0.10/秒**。全部输出带 SynthID 水印。
- **适合**：广告与短视频制作管线、需要角色一致性的连续镜头生成；已被 Adobe Firefly、Figma Weave、Runway 接入。
- 来源：[Google Blog](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/) ｜ [官方文档](https://ai.google.dev/gemini-api/docs/omni)

#### Cohere Parse 5（`parse-v5.0`，2026-08-27）

- **形态**：2.3B 参数视觉语言模型，8192 token 上下文，约 4.6GB，基于 Cohere Labs 的 `North-Micro-Vision-Instruct`（该基座权重在 HF 公开，Parse 本体走 API / Microsoft Foundry / AWS SageMaker / Model Vault）。
- **核心亮点**：PDF/PPT/JPEG 页面 base64 输入，一次通过输出 Markdown（阅读顺序文本、HTML 表格、列表、表单键值对、图像描述、bounding box），**前端无独立 OCR 阶段**。9 种语言稳定支持。
- **Benchmark 及其陷阱**：Cohere 自报 ParseBench **79.2**，对比 Mistral OCR 4 的 74.5、Azure Document Intelligence 74.3。但 **ParseBench 是五维基准（表格、图表、内容忠实度、语义格式化、视觉定位），Cohere 只取了其中三维平均，剔除了图表与视觉定位这两个多数解析器会崩的维度**。同一批厂商在完整五维公开榜上：Mistral OCR 4 为 60.68、Azure Layout 59.64，榜首 LlamaParse Agentic 84.88，而 Cohere Parse 未上榜。引用此数字务必标注口径。
- **定价**：API **$1.50/1000 页**；Model Vault Medium $4.00/小时或 $2500/月，XL $7.00/小时或 $4300/月。盈亏平衡点约为 Medium 167 万页/月、XL 287 万页/月。
- 来源：[Cohere Blog](https://cohere.com/blog/parse) ｜ [ParseBench 仓库](https://github.com/run-llama/ParseBench)

### ② 国内大模型

**国内三家在六天内连发三个开源前沿模型，且全部把权重和许可放到了可商用档位。** 这是本周报覆盖期内最密集的一次国产发布，也是首次出现「同周内两家独立收敛到同一架构」的现象。

#### GLM-5.3-Flash（智谱 / Z.ai，2026-08-26）

- **是否开源**：**MIT 许可**，权重在 `zai-org/GLM-5.3-Flash`，代码仓 `github.com/zai-org/GLM-5`。
- **参数与架构**：**320B 总参 / 18B 激活** MoE，GLM-5 系列首个原生多模态模型（文本 + 图像 + 视频输入）。45 层交错 **KDA 线性注意力层（34 层）** 与 **NoPE 稀疏 MLA 层（11 层）**；每 token 路由 8/288 专家；原生 FP8 权重 + 1 层 MTP draft；基座在 30T token 多模态语料上重训。**IndexPool** 把 4 个 indexer key 加权池化为 1 个再打分，压住百万上下文下的检索延迟与显存。
- **上下文**：**1,048,576 token 输入 / 131K 输出**。
- **Benchmark（Z.ai 自报，各测 harness 不同）**：Terminal-Bench 2.1 **84.3**（Claude Opus 4.8: 85.0，GPT-5.6 Terra: 87.4）｜DeepSWE v1.1 **63.4**（GLM-5.2: 46.2）｜AutomationBench **48.8**（GLM-5.2: 26.2）｜HLE **55.3**｜OfficeQA Pro **62.4**（超过 Claude Opus 4.8）。
- **第三方独立评测**：Artificial Analysis 智能指数 **57**，输出 48.7 token/s、TTFT 1.52s——智能性价比强，但慢且啰嗦。
- **与上一代对比**：相较 GLM-5.3，注意力计算约减少 **3×**、KV cache 小 **4.4×**，激活参数 18B vs 32B、层数 45 vs 92。**短板在视觉**：BabyVision 与 MVbench 上落后 Gemini 3.7 Flash。
- **定价**：**$0.15/百万输入、$0.03/百万缓存输入、$0.50/百万输出**（DeepInfra / Novita / Z.AI 同价）。GLM Coding Plan：Lite $18/月、Pro $80/月、Max $168/月，配额为 GLM-5.3 的 3 倍。
- **自托管门槛**：默认 FP8 检查点约 **306 GiB**（不含 KV cache），vLLM 路径当前仅支持 NVIDIA Hopper 及更新架构，需至少 8 卡节点或 GB200 tray（TP4）。
- **值得单记的一条**：该模型首周以匿名代号 **"Ox Alpha"** 在 OpenCode 与 OpenRouter 上运行并成为当周最受欢迎模型；Z.ai 称整个预览期**完全跑在国产 AI 芯片上**，使用自研 SGLang 改造引擎（编码、prefill、decode 三段解耦），端到端服务提升 3×。
- 来源：[Z.ai Blog](https://z.ai/blog/glm-5.3-flash) ｜ [HF 权重](https://huggingface.co/zai-org/GLM-5.3-Flash) ｜ [量子位](https://www.qbitai.com/2026/08/479919.html)

#### Qwen3.8-Flash-Next（阿里通义千问，2026-08-26）

- **是否开源**：开权重，但许可为 **qwen-community-1.0（非 Apache-2.0）**——月活 >1 亿或月收入 >2000 万美元的商业产品须显著标注模型名；MaaS 或 AI 工作助手类商用需另行取得授权。
- **参数与架构**：125B 主干 + **51B N-gram 嵌入表** + 4B 多 token 预测（MTP）模块，磁盘总量 180B，**每 token 仅激活 6B**。48 层 = 12 × (3 × **Gated DeltaNet** → 1 × **Qwen Sparse Attention**)，QSA 预算 512 个 micro-block / 2048 token；**Gated Residual** 把残差流拓宽为 4 条并行分支（元素级读门 + 每分支标量写门，bottleneck rank 320）；第 2 层挂 2000 万条 bigram/trigram 查表，可异步预取卸载到主机内存（目前仅 NVIDIA 支持卸载）；MoE 为 512 专家、激活 10 routed + 1 shared。训练用 **Muon 优化器**与 AdamW 分类别配合，取消 batch-size warmup。
- **上下文**：原生 262,144 token，YaRN 扩展至 **1,000,000**。
- **Benchmark（Qwen 自报）**：DeepSWE 1.1 **58.7**｜SWE-bench Pro **62.5**｜SWE-bench Multilingual **81.0**｜LiveCodeBench v6 **91.9**｜CoWorkBench **73.9**｜Toolathlon Verified **73.5**｜AndroidWorld **84.5**｜LVBench **76.6**｜RealWorldQA **88.5**。
- **明确的短板**：HLE 上 **35.9**，落后 Claude Opus 4.6 (Max) 的 40.0；NL2Repo-Bench 上 **48.1**，落后 DeepSeek-V4-Flash-0731 的 54.2。前沿推理仍是差距所在。
- **效率**：训练成本约为 Qwen3.7-Plus 的 **1/9**；QSA 内核在 1M token 下，官方 X 帖称 7.6× prefill / 4.9× decode，而 SGLang cookbook 与 vLLM recipes 称 10.2× / 6.6×——**两套数字口径不一致且均为厂商自报，未经独立复现**。
- **获取与部署**：HF `Qwen/Qwen3.8-Flash-Next` 与 `-FP8`；GitHub `QwenLM/Qwen3.8-Flash-Next`（含技术报告）。**FP8 检查点 172.78 GiB，BF16 335.28 GiB**——稀疏激活省的是算力不是显存，工作站跑不动。GB300 上 TP2 是最小验证配置、推荐 TP4；8×H200 用 TEP8。运行时支持 vLLM、SGLang、llama.cpp（GGUF）。
- **定位**：官方明确类比——Qwen3.8-Flash-Next 之于 Qwen4，等同于 Qwen3-Next 之于 Qwen3.5，即 Qwen4 架构的公开预演。
- 来源：[Qwen Blog](https://qwen.ai/blog?id=qwen3.8-flash-next) ｜ [GitHub](https://github.com/QwenLM/Qwen3.8-Flash-Next) ｜ [vLLM recipes](https://recipes.vllm.ai/Qwen/Qwen3.8-Flash-Next)

#### Tencent Hy4 preview（腾讯混元，2026-08-28）

- **是否开源**：**Apache 2.0 权重**，HF `tencent/Hy4-preview`，同步开源至 GitHub、ModelScope、Gitcode。
- **参数与架构**：**770B 总参 / 49B 激活**；主干 78 层，第 1 层为标准 dense FFN，其余 77 层为 MoE，每层 256 routed expert + 1 shared expert。上下文超过 **1,000,000 token**。
- **Benchmark**：腾讯内部盲测——163 位专家、203 项工程任务，均分 **2.99 / 4**，对比 GLM-5.3 的 2.92 与 Kimi K3 的 2.94。**注意这是腾讯自建盲评，非公开标准 benchmark**，且评估方与被评估方同源。
- **自证数据点**：腾讯称该模型帮助优化了自身训练与推理系统的部分组件，端到端吞吐较基线提升 **31.8%**。
- **定价与获取**：API **$0.834/百万输入、$2.501/百万输出**，经腾讯云 TokenHub 与 OpenRouter 提供；WorkBuddy 与 CodeBuddy 提供两周限时免费。
- **适合**：需要顶级开源权重且能承担 770B 部署成本的大型企业；否则直接走 API/OpenRouter。
- 来源：[腾讯官方](https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/) ｜ [HF 权重](https://huggingface.co/tencent/Hy4-preview) ｜ [AIbase](https://www.aibase.com/zh/news/30698)

#### 其他国内动态

- **阿里 Wan3.0 视频模型正式版**（2026-08-24）：最长 30 秒视频生成；支持 DOC / XLS / PPT / PDF / Markdown 文档作为输入；2026-08-24 至 2026-09-23 部分平台 API 限时 7 折。来源：[TechNode](https://technode.com/2026/08/24/alibaba-launches-wan3-0-video-model-with-30-second-generation-and-document-input/)
- **蚂蚁集团 × 中金公司 Ling-3.0-flash-Fin**（2026-08-28）：金融增强大模型，在原架构与参数配置基础上以金融语料深训，双方共建的 FinFIRST 金融搜索基准即将开源。来源：[AIbase](https://www.aibase.com/zh/news/30695)
- **字节豆包 2.2 推迟**（2026-08-31）：原计划 8 月推出，因编程、工具调用与 Agent 能力未达预期而延期。来源：[AIbase](https://www.aibase.com/zh/news/30702)
- **本周无重大发布（已检索）**：DeepSeek（最近为 8/21 的 DeepSeek-V4-Flash-Vision-Exp）、百度（8/28 发布的是 DuMateBench 评测基准而非模型）、月之暗面（Kimi K3 为 2026-07-16）、MiniMax、零一万物、阶跃星辰。

### ③ 其他重要开源模型

**非中国厂商本周无重大开源模型发布。** 已检索 Llama/Muse、Gemma、Phi、OLMo、Falcon、SmolLM 全线，本周均无新版本。可作对照的是本月早些时候的两个发布：

| 模型 | 厂商 | 日期 | 许可 | 规模 | 关键信息 |
|---|---|---|---|---|---|
| Nemotron 3.5 Lightning 30B-A3B | NVIDIA | 2026-08-11 | OpenMDW v1.1（可商用） | 30B 总参 / 3B 激活 | 交错 Mamba-2 层与 MoE 层 + 少量 Attention 层；上下文 1M；SWE-bench Verified **51.6%**、GPQA Diamond **75.6%**（NVIDIA 自测）。HF `nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16`，GGUF 见 `unsloth/...-GGUF`，NVIDIA 称单卡笔记本/台式机可跑 |
| Muse Glimmer 30B | Meta | 2026-08-10 | Apache 2.0 | 30B | 从 Muse Spark 蒸馏，面向本地 agent（工具调用、编码、文件处理、截图操作），单张消费级 GPU 可跑，支持离线常驻 |

**HuggingFace 开源生态 7 日下载增速（2026-08-30 刷新）**：DeepSeek-V4-Flash-0731 累计 4.3M / 7 日 +1.4M（第 1）；MiniMax-H3 文生视频 5M / +1.1M（第 2）；gpt-oss-20b 5.2M / +351.7K（第 3）；NVIDIA Cosmos 3 Edge 1.1M / +330.3K（第 4）；Nemotron-3.5-Lightning 402.1K / +273.2K（第 5）；**GLM-5.3-Flash 189.8K / +189.8K（第 6，全新上榜）**。来源：[theopenweights.com/trending](https://theopenweights.com/trending)

---

## 【模块三】热门论文精选

> 收录范围：arXiv ID 前四位为 **2608**（2026 年 8 月提交）的预印本，全部经 Hugging Face Daily Papers API 于 2026-08-31 实时核验。upvote 数为核验时刻快照。

### 🤖 AI Agent / 工具使用

**本周 Agent 方向的共同主张是：harness 是一个独立于模型权重的能力维度，且它可以被训练。** 下面四篇分别从「即时生成 harness」「离线优化 harness」「递归演化记忆」「开源 harness 框架」四个切口攻同一个命题。

---

**JIT-Agent: Scaling Harness Intelligence via Just-in-Time Harness Evolution**

📄 https://arxiv.org/abs/2608.25593 ｜ 💻 https://github.com/bingreeky/JIT ｜ 🤗 HF ⭐ 109 ｜ GitHub ⭐ 191

**问题**
Agent 能力并不只由基座模型决定：记忆管理、规划策略、动作协议、工具/技能编排构成的 harness，其贡献常常压过基座模型本身。但 harness 设计至今是手工的、任务特定的，因而根本无法规模化——每换一个任务就要重新搜索 prompt、工具配置与控制逻辑的组合空间。

**方法**
- 把 agent harness 形式化为一个**可组合、可机器生成的产物**，受固定的四模块协议约束。这是关键设计决策：不把 harness 当作自由文本，而是当作有类型约束的结构化对象，才能让模型稳定生成。
- 训练 JIT-Agent 完成三件事：针对当前任务定制 harness、修复 harness 以保证执行稳定、从不断扩张的历史 harness 配置档案中蒸馏性能信号实现自演化。
- 与已有方法的本质区别：既有工作要么固定 harness 只调模型（RL post-training），要么手工调 harness；JIT-Agent 把 harness 生成本身训练成一个模型能力，且对任意现成 agentic LLM 即插即用。

**效果**
- DeepSeek-V4-Flash 装上 JIT-Agent 后在 **DeepSearchQA 上超过 GPT-5.6（+9.1）**，OdysseyBench **+4.3**。
- 本身已很强的 GLM-5.2 增益最高达 **+20.2 分**。
- 生成的 harness 与 OpenCode、Claude Code 等成熟 agent runtime 性能相当，且在 DeepSeek V4、Mimo-V2.5、Qwen3.6 三个多尺度模型族上一致提升。

---

**AutoSaddler: Automatic Harness Optimization with Durable Updates from Agent Execution Traces**

📄 https://arxiv.org/abs/2608.23041 ｜ 💻 https://github.com/microsoft/AutoSaddler ｜ 🤗 HF ⭐ 62 ｜ GitHub ⭐ 151 ｜ 机构：Microsoft

**问题**
长时程任务中，局部的小失败会在长交互中复合放大，最终导致整体任务失败。外部 harness 能显著提升鲁棒性，但设计过程昂贵且手工。

**方法**
- 把 harness 改进形式化为**离线学习问题**，用 mini-batch 的失败信号迭代更新 harness。
- 三个组件：失败轨迹诊断 → 结构化补丁生成（**把 harness 当作代码来 patch**，而非重写 prompt）→ 基于验证集的更新选择。
- 消融给出的三条设计原则值得单独记：深度调试优于浅层反思、定向修改优于无约束编辑、泛化感知的选择优于针对单条轨迹的修复。

**效果**
- GAIA2 **+9.0** 个百分点、SWE-Bench Pro **+9.6**、Terminal-Bench 2.0 **+10.0**，均相对各自的 base harness。

---

**Recursive Experiential-Working Memory Evolution for Long-Horizon Agent Harnesses（Recuris）**

📄 https://arxiv.org/abs/2608.24876 ｜ 💻 https://github.com/Gen-Verse/Recuris ｜ 🤗 HF ⭐ 26 ｜ GitHub ⭐ 96

**问题**
递归自我改进（RSI）在长时程任务上难以奏效：不断增长的交互历史会淹没任务状态，并使技能调用与当前需求失配。

**方法**
- 分离 **Working Memory** 与 **Experiential Memory**：Working Memory 只追踪任务进展并据此从 Experiential Memory 里选技能——**技能调用锚定在当前需求上，而不是全量历史上**，这是与「把历史塞进上下文」类方法的本质区别。
- 这种解耦的副产品是可归因性：执行过程变成结构化证据，能把失败定位到具体的记忆组件。
- 一个固定的 Meta-Agent 把该证据转化为**局部化、经验证门控**的 Skill Memory 更新，更新后的技能重塑执行、产生新证据，形成有界的递归记忆演化闭环。

**效果**
- 四个长时程 benchmark、十个模型，37 个已完成的「模型 × benchmark」组合中 **35 个提升**。
- τ-bench：GPT-5.6 Sol **+17.8**，Claude Opus 5 **+15.6**（达到 **87.9%**）。
- SkillFlow：Qwen3.6-27B/35B 分别 **+16.6 / +13.5**。
- 优势随交互时程增长而扩大，在最长任务上达 **+32.2 分**；常见长时程失败模式下降最多 **80%**。

---

**Prime Agent: A Self-Improving RLM Harness**

📄 https://arxiv.org/abs/2608.23552 ｜ 💻 https://github.com/PrimeIntellect-ai/prime-agent ｜ 🤗 HF ⭐ 46 ｜ GitHub ⭐ 19,247 ｜ 机构：Prime Intellect

**问题**
语言模型是序列处理器，但长时程 agency 需要模型权重与活跃上下文之外的外部信息与计算。现有 harness 的失败常常被误记为模型的失败，从而低估了模型的真实能力上界。

**方法**
- 持久化 IPython REPL，遵循 **Recursive Language Model** 抽象做程序化上下文处理与测试时计算。
- **Continual Harness**：跨轨迹保留历史、记忆、技能、prompt 与子 agent 规格。
- 递归子 agent 通过直接的 agent-to-agent 通信协调；Agents View 让人类可以检视与管理 daemon 支撑的会话。
- 设计取向是「低摩擦的膜」：标准化执行、恢复、验证与资源核算，把策略构造完全留给模型。

**效果**
- **ARC-AGI-3 RHAE Best@1 从 30% 提升到 95.5%**。
- 在长上下文编码、GPU kernel 生成、模拟器构建、自主 nanoGPT speedrun 上追平或超过原生与主流 harness。
- Factorio 上，精炼机制支持持续技术进展，专用子 agent 实现工作并行化。

---

**Apodex 1.1: Scaling Agentic Intelligence for Complex Work**

📄 https://arxiv.org/abs/2608.23283 ｜ 💻 https://github.com/ApodexAI/FrontierAgent ｜ 🤗 HF ⭐ 202 ｜ GitHub ⭐ 1,296

**问题**
通用语言模型能推理与综合知识，但复杂工作还要求与文件、信息源、可执行代码的持续交互，以及状态维护、失败恢复与可验证交付。论文把这一整套能力命名为 **working capability**：面向真实目标的、持续且可验证的进展。

**方法**
沿两个正交维度扩展：
- **Environment Scaling**：扩大可执行的文件、检索与代码环境的多样性与可验证性。
- **Agentic Coordination Scaling**：训练 agent 分解长时程任务、并行派发、整合异步结果、重规划。
- 共享的 execution harness 与 AgentOS 跨工具、跨 agent 维护任务状态与溯源（provenance）；训练把环境轨迹与协调轨迹转化为可靠行为。

**效果**
- 在复杂专业工作、金融、科研、数学、编码、检索上进入领先梯队，**且模型规模显著小于多数前沿系统**。
- **35B 的 Apodex 1.1 Mini** 在本地可部署形态下保留了较强的 working capability。
- 注：论文未在摘要中给出逐项 benchmark 绝对数字，引用时需以正文表格为准。

---

**What Makes Good Agentic Data? An ACE Lens on Data Generation for LLM Agents**

📄 https://arxiv.org/abs/2608.27260 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 61

**问题**
Agent 数据生成必须在环境、任务、交互、成功信号之间保持一致性，产出「有用」而非仅仅「大量」的经验。但既有工作按领域组织、评测异构，掩盖了共同的生成机制，也把候选构造与验证/筛选混为一谈。

**方法**
两层框架：
- 把 agentic data 表示为统一的因子化对象 **(E, q, τ, v)**——环境规格、任务信号、交互实现、可选验证器；按主锚点与依赖结构对生成范式分类。
- 把生成形式化为 **ACE（Accuracy-Complexity-divErsity）** 视角下的受约束分布设计：Accuracy 确定「有依据且内部一致」的可行支撑集；在该支撑集内，Complexity 相对于**给定学习者与执行配置的能力**分配学习质量；divErsity 控制覆盖与冗余。这里的关键是 Complexity 被定义为**学习者相对量**，而非数据集的绝对难度标签。

**效果**
这是综述/框架型工作，不提供单一 benchmark 数字。其结论是文献正在向三处迁移：执行接地的正确性、学习者相对的复杂度、超越表层变化的多样性。对做数据合成 pipeline 的团队有直接的设计清单价值。

---

### 🧠 大语言模型（LLM）/ 推理与后训练

**本周 LLM 方向最密的是 on-policy distillation 的方法族扩散，而 TTPO 把它推到了无标签的测试时训练场景。**

---

**TTPO: Test-Time Policy Optimization**

📄 https://arxiv.org/abs/2608.27448 ｜ 💻 https://github.com/ZJU-REAL/TTPO ｜ 🤗 HF ⭐ 73 ｜ GitHub ⭐ 27 ｜ 机构：浙江大学 REAL 实验室

**问题**
RL 与 On-Policy Self-Distillation（OPSD）都依赖 ground-truth 标签，因此无法用于测试时训练（TTT）。用多数投票伪标签替代是自然选项，但极其脆弱：一次错误投票会污染 teacher，并误导该样本的**每一个 token**。

**方法**
- 关键观察是失败模式的**非对称性**：与伪标签不一致的 rollout 通常是错的，**无论投票本身是否正确**。这个观察是整篇论文的支点。
- 据此提出非对称目标：一致的 rollout 走 OPSD 蒸馏，不一致的 rollout 走 Grouped RL 惩罚。
- Token 级选择进一步精化两个分支：蒸馏对已收敛位置降权，RL 只惩罚**高置信度的错误** token。因此即便伪标签频繁出错，两侧更新仍然有据可依。
- 多数投票路由随模型改进而收紧自监督信号，形成自增强循环。

**效果**
- 无任何标签的情况下，在五个竞赛级 benchmark 上**追平有标签监督的 OPSD**。
- Qwen3-1.7B 在 TTT 设定下从 **38.0% 提升到 45.2%**。
- 关闭 thinking 时增益 **+25.2% 到 +36.4%**，并表现出较强的跨任务泛化。

---

**Understanding Evolution Strategies for LLM Reasoning: Broader Reasoning Coverage than GRPO**

📄 https://arxiv.org/abs/2608.27351 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 16

**问题**
Evolution Strategies（ES）作为省显存的后训练范式最近受到关注，但其优化行为缺乏研究，导致无法界定它相对 GRPO 的优势边界——业界默认把 ES 当作「效果更差但省内存的 GRPO 替代品」。

**方法**
- 理论侧：证明 ES 种群上的 **verifier-projected Jensen-Shannon 多样性**有助于更高的 Pass@K。这是把 ES 的种群多样性与推理覆盖度直接挂钩的形式化论证。
- 实证侧：GRPO 表现出熵坍缩，而 ES 在提升 Pass@1 的同时取得比 GRPO 更高的 Pass@K。
- 据此提出 **顺序式 GRPO→ES 训练策略**，结合 GRPO 在 Pass@1 上的优势与 ES 在 Pass@K 上的增益。
- 第二个发现更反直觉：ES 造成了大规模的全模型参数漂移，但任务性能增益**只来自稀疏的一小撮大幅更新**。这种功能稀疏性说明大的参数位移不等于广泛的功能改变，held-out 评测也显示它不必然导致灾难性遗忘。

**效果**
- 结论层面确立 ES 是一个**独立的推理后训练范式**，而非 GRPO 的劣化替代。
- 超参层面给出可操作结论：**模型越大，ES 需要的种群规模越小**。
- 注：摘要未给出具体 benchmark 绝对数字，需查正文。

---

**ParaTempo: Efficient Parallel Reasoning via Temporal Confidence**

📄 https://arxiv.org/abs/2608.16425 ｜ 💻 https://github.com/ScottZhang812/ParaTempo ｜ 🤗 HF ⭐ 38

**问题**
并行推理靠探索多条解路径提升准确率与鲁棒性，但计算成本随推理深度与分支数增长。现有的分支管理信号都有硬伤：最终答案共识**信号来得太晚**；局部 token 置信度**与实际推理进展的关联很弱**；孤立的中间探针**噪声太大**，无法支撑动态的分支级控制。

**方法**
- 提出 **temporal confidence**：一个分支局部的、衡量**答案空间收敛程度**的量。周期性探测每个分支的暂定答案概率分布，temporal confidence 量化「最近若干次探针在多大程度上尖锐地集中于某个主导答案」。
- 整个控制流程由这**单一信号**驱动：低置信分支剪枝 → 持续锁定主导答案的分支提前退休 → 释放的算力 fork 新分支 → 置信度加权投票足够集中时全局停止。
- 与已有方法的本质区别：**无需分支间同步**，因而是异步的、训练无关（training-free）的框架。

**效果**
- 数学与科学推理 benchmark 上，平均延迟降低 **21.8%–32.2%**，总 token 用量降低 **18.1%–30.3%**，准确率保持竞争力。
- 消融显示 temporal confidence 相比 token 级与瞬时信号，在时间稳定性与对未来分支收敛的预测力上均更强。

---

**Let's Scale Step by Step: Compute-Efficient Hyperparameter Transfer for Large-Scale Mixture-of-Experts**

📄 https://arxiv.org/abs/2608.20061 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 46

**问题**
MoE 在不成比例增加算力的前提下扩张容量，但在模型规模与 token 预算都极端的情况下，靠 sweep 来调学习率在计算上不可行。

**方法**
两步式超参迁移：
- 第一步，为使用 **Multi-head Latent Attention（MLA）与 Muon 优化器**的 MoE 架构做 **μP（Maximal Update Parameterization）适配**，证明最优学习率能在宽度缩放的模型间一致迁移。
- 第二步，把可迁移性沿 **token 维度**扩展：对小型代理模型在有限预算下得到的最优值做线性回归，外推到万亿 token 量级的训练时程。
- 与常规 μP 工作的区别在于第二步——μP 原本只解决宽度维度，这里补上了 token 预算维度。

**效果**
- 学习率外推到 **10 万亿 token** 时程，拟合优度 **R² = 0.95**。
- 用该方法从零预训练了一个 **155B 总参 / 17B 激活**的基础模型，训练稳定性与评测结果验证了「小模型代理训练足以确定大规模 MoE 最优学习率」。

---

### 👁️ 多模态 / 视觉推理

---

**VBVR-Pro: A Scalable and Verifiable Suite for Native Visual Reasoning**

📄 https://arxiv.org/abs/2608.26105 ｜ 💻 https://github.com/Video-Reason/VBVR-Pro ｜ 🤗 HF ⭐ 254（本周榜首）｜ GitHub ⭐ 23

**问题**
「原生视觉推理」把视觉生成本身当作推理的媒介——图像与视频不只是待理解的输入或待渲染的输出，而是超越语言的一等求解基底。但这个方向卡在三处：缺可规模化的训练任务、缺可靠的反馈信号、缺跨生成基底的受控比较。

**方法**
一个闭环 testbed，三个组件：
- **任务扩展**：把视觉推理转化为 **300 个程序化生成任务**构成的受控任务空间。
- **可验证奖励**：提供任务接地的 reward scorer。论文系统研究了「以领先 MLLM 作 judge」这一主流范式的反复出现的失败模式，转而采用**确定性的、任务特定规则**的 scorer——这是关键设计决策：VLM-as-a-judge 的噪声不足以支撑大规模多任务 RL，而规则型 scorer 可以。
- **机制研究**：支持跨 **30+ 图像/视频/交错生成器**的受控模态研究。

**效果**
- 在 VBVR-Pro 上训练的模型跨 **七个外部视觉推理 benchmark**（RISE-Video、MME-CoF-Pro、BabyVision 等）表现出强迁移。
- 模态结论：**视频生成在需要持久时空状态追踪的任务上最强**，交错生成则是算力高效的替代方案。
- 消融与探针提示存在对视觉推理至关重要的 **vision-native 轨迹**。数据、模型、scorer、代码全部开源。

---

**Annotations as Rollouts: Efficient and Scalable Reinforcement Learning for Video MLLMs（OraRL）**

📄 https://arxiv.org/abs/2608.20492 ｜ 💻 https://github.com/HVision-NKU/OraRL ｜ 🤗 HF ⭐ 108 ｜ GitHub ⭐ 150 ｜ 机构：南开大学 HVision

**问题**
视频 MLLM 在大规模多任务数据上做 RL 后训练时，即便付出昂贵的 CoT 生成代价，on-policy 采样得到的组内高质量 rollout 仍然很少，样本效率极低。

**方法**
- 核心洞察：标注（annotation）被低估了——它不该只用来给 rollout 打分，**每条标注本身都可以作为 oracle rollout 进入 on-policy 组，成为直接的正向优化目标**。
- 但直接塞入并不平凡：高奖励的 oracle 会抬高组基线，从而把本来为正的策略优势翻转为负，论文称之为 **advantage inversion**。
- 解法是**解耦的优势估计器**：策略 rollout 决定一个不含 oracle 的基线；oracle 与策略之间的差距同时调制一个方向性增益与一个分离的 oracle 优势项。
- 效率上用 **sign-balanced pruning**：每组只保留 oracle 与每个符号下最强的 rollout。

**效果**
- 步时开销仅为 SFT 的 **2.2×**，不到「GRPO + CoT」的 **4.9×** 的一半。
- 从 0.8B 到 9B 全面超过各自 backbone，在 100k prompt 规模上超过 GRPO。
- **不使用 CoT** 时，Video-ORA-9B 解码时间从 **4,780 ms 降到 130 ms**。
- 相对各自的先前最佳：时序 mIoU **62.5 → 66.0**，跟踪 AO **73.0 → 78.2**，分割 **64.3 → 70.4**，三 benchmark 空间智能宏平均 **51.0 → 56.1**；**VSI-Bench 上 73.1，对比 GPT-5 的 55.0 与 Gemini-3-Pro 的 55.1**。

---

**VGI-Bench: Probing Visual Intelligence in Video Generation Models**

📄 https://arxiv.org/abs/2608.19583 ｜ 💻 https://github.com/hexuan21/VGI-Bench ｜ 🤗 HF ⭐ 173 ｜ GitHub ⭐ 8

**问题**
已有研究提示视频生成模型能通过生成帧展现某种零样本视觉推理，但可靠评测很难：benchmark 需要采用与当前视频模型视觉先验对齐的输入、需要要求**有效的演化过程**而非仅仅合理的终态、且难度需校准到「有挑战但部分可行」。

**方法**
- 27 个任务、810 个实例，按「任务域 × 技能标签」的两级分类法组织，支持细粒度能力定位。
- 分析维度包括输出失败模式、输入条件敏感性、合成数据微调的性能迁移边界，以及从去噪过程内部视角的观察。

**效果**
- **最强的 Seedance 2.0 在该评测标准下仅 51.0%**——当前生成系统能解一部分视觉接地的推理任务，但远谈不上可靠。
- 一个重要的机制性发现：去噪过程中**自我纠正能力有限**，后期步骤主要在精化早期假设，而不是纠正推理错误。

---

**Self-OPD: On-Policy Distillation for Flow Matching Models without Teacher**

📄 https://arxiv.org/abs/2608.26872 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 71

**问题**
On-policy distillation 迁移到 flow matching 模型后有两个硬伤：其一，为每个新目标训练一个专用 teacher 成本高昂；其二，teacher 与 student 分布之间的偏差会沿生成轨迹**复合累积**。

**方法**
- 无 teacher 框架，把 student 自身的自探索转成逐步监督。
- 每个时间步把确定性的下一状态预测**分叉成 K 个随机 SDE 候选**，用 ODE 采样器 rollout，将其奖励与一个**确定性自参考基线**比较得到归一化优势。
- 速度场用 **all-branch pull-push 目标**优化：高优势分支吸引 student，低优势分支在方向感知衰减与 SDE 方差归一化下排斥 student。
- 多目标对齐时在**奖励层面**融合归一化分数，从而避免梯度直接冲突——这与在梯度层面做多目标加权的常规做法是本质区别。

**效果**
- 在单奖励与混合奖励 benchmark 上均超过既有 RL 与 OPD 方法，且不需要任务特定 teacher。摘要未给绝对数字，需查正文表格。

---

**WeMM-Embedding: WeChat Multi-Modal Embedding Technical Report**

📄 https://arxiv.org/abs/2608.24053 ｜ 💻 https://github.com/Tencent/WeMM-Embedding ｜ 🤗 HF ⭐ 67 ｜ GitHub ⭐ 928 ｜ 机构：腾讯微信

**问题**
通用多模态 embedding 已成为现代 AI 系统的核心组件，但要同时支持文本、图像、视频、视觉文档与任意交错输入，并提供灵活输出维度，工程与训练配方均无公开可复现方案。

**方法**
- 2B / 4B / 9B 三个规模，两阶段训练：大规模多模态对齐阶段，随后是使用精选数据、细粒度相关性监督与**跨尺度知识迁移**的精化阶段。

**效果**
- **2B 变体已超过此前领先的 8B 开源基线**（MMEB-v2）；9B 变体取得 **80.6 的总分新 SOTA**。
- 工程侧数据同样值得记：26 任务内部 benchmark 大幅提升，**14 次线上 A/B 测试一致改进**，已在视频号、公众号、朋友圈与电商的推荐与搜索中规模化部署。权重与代码已开源。

---

### 🦾 具身智能 / 机器人 / 世界模型

---

**GigaBrain-0.7: Scaling Embodied Foundation Models to Emergent Capabilities with a Three-System Architecture**

📄 https://arxiv.org/abs/2608.15875 ｜ 💻 https://github.com/open-gigaai/giga-brain-0 ｜ 🤗 HF ⭐ 102 ｜ GitHub ⭐ 2,624

**问题**
VLA 模型已成为通才具身智能体的主导范式，但三个问题未解：现有 VLA 能否从更有效的架构设计中获益、能否扩展到规模大得多且异构得多的数据体制、能否在任务与本体（embodiment）之间实现更广的泛化。

**方法**
- **三系统架构**统一理解、预测与动作三种能力。
- 预训练扩展到**超过 37,000 小时的异构具身数据**。
- **单阶段对齐训练**：联合优化视觉语言理解与多本体动作生成——与主流的「先 VL 预训练再接动作头」的多阶段范式相比，这是本质区别，目的是避免阶段间的能力遗忘。

**效果**
- 相较前代 GigaBrain-0 系列与包含 **π₀.₅** 在内的先前 SOTA，在基础零样本能力、语言条件指令跟随、后训练任务成功率上均有大幅改进。
- 在自研 Maker H01 平台与主流机器人本体上，家庭与工业场景均展现出较强任务适应与完成能力。训练代码与预训练权重将开源。
- 注：摘要以定性表述为主，未给逐项数字，引用具体成功率需查正文。

---

**StreamPI: Streaming Multimodal Temporal Modeling for Vision-Language-Action Models**

📄 https://arxiv.org/abs/2608.26067 ｜ 💻 https://github.com/hku-sail/StreamPI ｜ 🤗 HF ⭐ 18 ｜ GitHub ⭐ 149 ｜ 机构：香港大学 SAIL

**问题**
包括 π₀.₅ 在内的 SOTA VLA 模型运行在**单帧范式**下，无法保留历史观测，因而空间感知精度受限。

**方法**
- **指令锚定的时序建模**：把每个（视觉观测，语言指令）对当作原子时间单元——**对内**双向注意力做跨模态融合，**对间**因果注意力保持自回归流式推理。效果是语言指令在整个任务执行过程中充当持久的语义锚点。核心卖点是**不引入任何额外参数**。
- **随机间隔流式训练**：合适的帧间间隔（如每 3 帧）带来更快更平滑的动作执行；随机化间隔进一步提升对帧时序扰动的鲁棒性，从而支撑真机上的异步部署。这一条直指「同步训练 vs 异步真机部署」的落差。
- 借助 LLM backbone 的长度外推能力，无缝继承预训练的单帧权重，同时支持单帧与多帧推理。

**效果**
- 在依赖记忆与需要精确感知的真机任务，以及仿真 benchmark **LIBERO** 上均超过 **π₀.₅**。摘要未给绝对数字。

---

**UrbanGround: From Local Perception to Spatial Agency in a Real-Scale City**

📄 https://arxiv.org/abs/2608.27456 ｜ 💻 https://github.com/UrbanGround/UrbanGround ｜ 🤗 HF ⭐ 101 ｜ GitHub ⭐ 107

**问题**
MLLM 能解读一张街景图，但城市 agency 取决于这种局部证据在 agent **开始移动之后**是否仍然有用。既有评测都停在静态图像问答。

**方法**
- 首个把该问题变得可测的沙盒：基于**全境 3D 地理空间数据构建的物理受约束的香港复制品**，支持第一人称闭环交互，并提供用于导航的交互式地图。
- 评估沿三个递进的研究问题展开：主动观察后能否接地到足以回答空间问题 → 该接地能否支撑目的地越来越远且越来越隐晦的导航 → 上述行为能否在路线可用性变化与行人运动下存活。

**效果**
- 当代 MLLM agent 在视觉识别与短程空间推理上有可用的原子能力，但**朝向判断与行人感知的移动仍不可靠**。
- 核心失败出现在长时探索中：**局部能力无法复合为持续的目标导向行为，误差累积且缺乏有效纠正**。

---

**Agentic Game Development as a Verifiable Trajectory Data Engine for Scaling World Models**

📄 https://arxiv.org/abs/2608.25518 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 181

**问题**
扩展世界模型的常规策略是「更多爬取视频 + 更多算力」，论文认为这低效。对比代码 agent 就能看清原因：代码可执行，编译器与运行时能为 RL 后训练提供高质量奖励；而空间生成至今主要依赖 CLIP score 这类**模糊且有偏**的代理信号，无法支撑 RL 后训练。

**方法**
- 核心论点：**游戏开发提供了空间世界模型缺失的那个奖励环境**。被游戏引擎编码的场景就是一份可执行的世界规格——引擎能高效检查碰撞、物理、可导航性与有界可玩性；开发者则通过判断场景是否应被接受，提供全局验证信号。
- 由此提出 **RLHEV（Reinforcement Learning with Human-Engine Verification）**：把稠密的引擎信号与开发过程中的隐式人类接受反馈结合起来的后训练范式。
- 游戏开发同时提供真实的长时程轨迹数据用于 RL 后训练。

**效果**
摘要为方法论主张，未给出 benchmark 数字。这篇的价值在于范式论证——对做世界模型 RL 后训练的团队，它给出了一个可执行奖励源的具体方案。

---

**PAWBench: How Far Are We from Probabilistically Aligned World Modeling?**

📄 https://arxiv.org/abs/2608.27345 ｜ 💻 https://github.com/Andrew0613/PAWBench ｜ 🤗 HF ⭐ 131 ｜ GitHub ⭐ 6

**问题**
视频生成模型越来越多地被当作世界模型，但许多物理过程可以有多种有效的演化方式。因此世界模型不仅要复现一条合理轨迹，还要复现**同一初始观测与动作下的可能行为分布**——论文称之为 **probabilistic alignment**。现有评测基本只评估单条视频的合理性，从不检验重复生成是否恢复了正确分布。

**方法**
- 把 probabilistic alignment 形式化为世界模型的**分布级判据**。
- **PAWEval** 协议：把重复的视频 rollout 转换成关于可能物理行为的**经验分布**，在结果层面而非像素层面比较。

**效果**
- **50 个场景、11 个当前系统，没有一个模型能在恢复有效行为范围的同时一致地匹配参考概率。**
- 论文进一步测试了语言 prompt、初始噪声采样、模型训练三条路径能否重塑模型的预测分布。

---

### 🛡️ AI 安全 / 对齐

---

**SecOPD: Mitigating Adaptive Prompt Injections by On-Policy Distillation**

📄 https://arxiv.org/abs/2608.21500 ｜ 💻 https://github.com/pppyb/SecOPD ｜ 🤗 https://huggingface.co/pybbb/Qwen3.6-27B-SecOPD ｜ HF ⭐ 41

**问题**
Prompt injection 被列为 AI agent 的头号威胁。防御方训练的「安全 LLM」在面对**自适应** prompt injection 时攻击成功率（ASR）仍接近 100%。论文的诊断很具体：既有防御性微调配方依赖 **序列级反馈信号**（DPO 或 GRPO），对整个输出一视同仁，模型因此**学不到究竟哪些输出 token 是不安全的**。

**方法**
- **Secure On-Policy Distillation**：把反馈粒度降到 token 级。LLM 接收被注入的样本并产生 rollout，rollout 的每个 token 由**初始化模型在对应的干净输入下**打分。
- 这个设计的巧妙处在于参照系：不需要额外的安全 teacher，用「模型自己在无攻击输入下的行为」作为 token 级监督信号，天然定义了「这个 token 是否是被注入内容诱发的」。

**效果**
- 防御后的 **Qwen3.6-27B 面对 SOTA 的 PISmith 自适应注入，ASR 为 9.0%**，而先前 SOTA 的 Meta-SecAlign 为 **94.0%**。
- 安全性泛化到训练中完全未见的领域：agentic tool calling 场景 ASR **4.7%**，对比 Meta-SecAlign 的 5.5%。代码与模型均已开源。

---

**CyberFactory: Scaling Cyber Security Capabilities with Instances from the Wild**

📄 https://arxiv.org/abs/2608.23181 ｜ 💻 暂未开源（论文称将开源）｜ 🤗 HF ⭐ 33

**问题**
闭源模型已具备较强网络安全能力，开源侧却停滞：前沿开权重模型不提供可复现的安全训练方案，开源训练方案聚焦孤立任务且缺乏可规模化的 agentic 数据，而扩展 agentic rollout 又需要强领域先验。

**方法**
- 统一框架，打通数据构造、轨迹合成与模型训练，覆盖 PoC 生成、漏洞修补、安全问答三类任务。
- 把公开漏洞产物（含来自真实世界的 CVE）转换成**可执行、可验证的任务实例**。
- 用一个**可复用的漏洞分析 skill** 引导 teacher 走「源码检视 → 带领域先验求解 → 基于证据验证」的流程；得到的监督是 agentic 的：模型与工具和目标环境交互，并按执行反馈修正方案。
- 训练出的 Aegis 模型**在推理时不再需要该 skill**——skill 已被内化进权重。这是与「推理时挂载 skill」类方案的本质区别。

**效果**
- **CyberGym 上一小时预算内 Pass@1 达 52.4%**，较其 Qwen 3.5 基座 **+22.8 分**，并在同一 scaffold 下超过所评估的通用 backbone。

---

### 🔬 AI for Science

---

**FrontierChallenge: Evaluating Scientific Workflow Completion**

📄 https://arxiv.org/abs/2608.24979 ｜ 💻 暂未开源 ｜ 🤗 HF ⭐ 141

**问题**
科研 agent 已经在分析数据、执行代码、产出研究产物，但多数 benchmark 只强调最终答案、孤立程序或单一领域，不评估**端到端工作流的完成度**。

**方法**
- 跨领域 benchmark，共 **300 个端到端科学工作流**，本次发布并评测其中 **97 个**，覆盖量子化学、分子动力学、材料表征、分析化学、生命科学、电化学/环境。
- 每个任务给定固定输入，并规定一**组**必需的科学交付物（deliverable bundle）。
- 双指标：**Pass Rate** 衡量满足完整交付判据的任务比例，**Avg. Score** 捕捉部分进展。这个双指标设计是全篇最重要的方法贡献。

**效果**
- **12 个前沿模型 × 3 种 agent scaffold，最佳配置也只完成 97 个任务中的 20 个，Pass Rate 20.6%。**
- 部分进展与完整交付之间的落差在两个领域尤其触目：分析化学 **Avg. Score 87.6 但 Pass Rate 仅 4%**；电化学/环境 **Avg. Score 94.9 但 Pass Rate 为 0%**。
- 最值得警惕的一条：未通过的 Claude Code 轨迹中，**75.5% 仍以声称已完成的语言收尾**。高分与自信的完成声明，都不能作为科学任务已被完整交付的证据。

---

### 🌐 其他新兴方向

---

**VoiceMem: Streaming Dual-Brain Memory for Real-Time Interaction**

📄 https://arxiv.org/abs/2608.26005 ｜ 💻 https://github.com/xzf-thu/VoiceMem ｜ 🤗 HF ⭐ 168 ｜ GitHub ⭐ 351

**问题**
双工语音语言模型（duplex SLM）缺乏一个同时满足**流式、准确、共情**三项要求的记忆系统。既有记忆方案（如 Mem0）为文本对话设计，检索延迟与语音交互的 VAD 时间预算不兼容。

**方法**
- **双脑架构**：并行的信息型「左脑」与情感型「右脑」，配以流式记忆 I/O 机制。
- 右脑做短时程与长时程的情感归因，并采用**双节点 persona 建模**。
- 配套完整 pipeline：记忆感知的 SLM 训练、长时程评测、以及**记忆后端可替换的解耦部署**。

**效果**
- **准确性**：top-5 检索下，左脑比 Mem0 在 **top-200** 时还高出近 **30 分**。
- **情感与个性化**：三个 persona benchmark 上取得 SOTA，综合分较此前最佳系统 **+4.29 分**。
- **实时与低成本**：检索在 **134 ms** 内完成，落在标准 VAD 延迟以内，**不增加任何额外对话延迟**。

---

**WarpSAC: Towards the Pinnacle of Scalable Off-policy RL by Rethinking Exploration and Exploitation**

📄 https://arxiv.org/abs/2608.24479 ｜ 💻 https://github.com/wzhhasadream/warprl ｜ 🤗 HF ⭐ 137 ｜ GitHub ⭐ 14

**问题**
大规模并行仿真改变了 off-policy RL 所处的数据体制，而现有的稳定化技巧是为数据受限的 replay 设计的。论文用八个 benchmark 家族的受控实验证明这些技巧**依赖数据体制**：参数归一化在 replay 覆盖窄时有用，但在数据充裕时**限制价值拟合**；clipped double-Q 在高吞吐操纵任务中可以放松。

**方法**
- 提出**体制感知**的 off-policy RL 算法族。统一使用 **Sample Weight Decay** 做高效利用（exploitation）——年龄偏置的 replay 加权在各体制下都能提升学习效率，在网络容量有限时尤其明显。
- 两个变体按数据体制分派：**WarpSAC-L**（Norm 开、clipped double-Q）用于数据受限的 CPU 规模训练；**WarpSAC-A**（Norm 关、single-Q）用于数据充裕的 GPU 并行训练。

**效果**
- 相对 FlashSAC，归一化得分-步数 AUC 在 **9 个 CPU 规模环境上 +4.5%**，在 **14 个 GPU 并行环境上 +23.1%**。
- **UnitreeG1TransportBox-v1 成功率从 19.8% 提升到 96.4%**。
- MuJoCo Playground 上平均归一化 wall-time AUC **+19.1%**；Unitree G1 上 sim-to-real 部署比 FlashSAC **快 36.4%**。

<!--PART3-->


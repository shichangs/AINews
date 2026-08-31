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

<!--PART2-->

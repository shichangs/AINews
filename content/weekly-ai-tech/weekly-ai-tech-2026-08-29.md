# AI 技术周报 · 2026 年第 35 周

**覆盖窗口**：2026-08-17 – 2026-08-29（上期 8/17 发布后至今，双周窗口；重点为 8/22–8/29）
**目标读者**：算法研究员
**论文时间约束**：仅收录 arXiv ID 前缀为 `2608` / `2607` 的预印本，本期实际收录全部为 `2608`

---

## 【模块一】本周导读

**🔴 最重要的变化：frontier 级开源权重在 72 小时内三连发，开源分发层本身开始被资本重新定价。**
8/26 晚智谱开源 **GLM-5.3-Flash**（320B-A18B、MIT、GLM-5 系首个原生多模态），8/28 智谱按承诺放出 **GLM-5.3** 完整权重（744B-A40B、MIT），同日腾讯意外开源 **Hy4 preview**（770B-A49B、Apache 2.0），加上 8/26 阿里的 **Qwen3.8-Flash-Next**（Qwen4 架构预览），中国四家在三天内把旗舰或次旗舰权重全部摆上 Hugging Face——且智谱证实 GLM-5.3-Flash 就是 OpenRouter 匿名榜首 **Ox Alpha**、推理"完全跑在国产芯片上"。同一周，NVIDIA 被曝拟以 **$129 亿** 收购 Hugging Face（The Information 8/27，未签约）：当权重本身不再稀缺，**分发与托管层正在成为下一个被争夺的战略资产**。

**🟡 值得关注但尚未明朗：agent harness 正从工程细节升格为可训练、可交易的独立能力维度。**
本周 HF 周榜前十里有三篇把 harness 当研究对象：**JIT-Agent**（2608.25593）训练专门模型即时生成任务自适应 harness，给 GLM-5.2 带来最高 **+20.2 分**；**Apodex 1.1**（2608.23283）把"执行 harness + AgentOS"写进模型技术报告的核心贡献；**AutoSaddler**（2608.23041）从执行轨迹自动优化 harness。GitHub 侧 "harness-engineering" 成为 topic 标签（munder-difflin 周增 1,853 star）。这延续了上期 OpenART 的论断——runtime 实现能解释超出模型能力的安全性差异；而 **FrontierChallenge** 给出反面印证：非通过轨迹中 **75.5%** 仍在宣称"任务已完成"。方向是清晰的，但 harness 能力如何标准化评测，目前没有共识。

**🟢 对开发者最有实际价值：「一张卡跑 frontier」本周从研究方向变成可操作的现实。**
拼图三块同时到位：其一，**FreeToken**（2608.16157，Berkeley/MIT，HF ⭐100）开源边缘 MoE 推理系统——8GB 笔记本 GPU 跑 35B 模型 **39.3 token/s**，单张 RTX PRO 6000 跑 **753B** 的 GLM-5.2 达 14.9 token/s；其二，本周三个新旗舰权重全部宽松许可（MIT / Apache 2.0），unsloth 的 GLM-5.3 Dynamic 1–2 bit GGUF 当天跟进（1-bit 体积缩小 85%、保留约 76% 准确率）；其三，IBM **Granite 4.2**（3B/8B/30B、Apache 2.0）把企业级工具调用下放到本地可部署档位。本地 agent 栈的模型、系统、量化三层，这周全部有了新的默认选项。

### 下周预告

1. **Anthropic 公开版 S-1** — 据 The Information（8/28），公开招股书预计 Labor Day（9/7）后发布，上市窗口指向 9 月底–10 月初，银行家讨论估值约 **$1.5 万亿**。确认性 S-1 已于 6/1 保密递交。
2. **9/2–9/3 密集节点** — Grok 4.7 传 9/2 前发布（仅 Musk 及二手信源，未经 xAI 官方确认）；9/3 Broadcom Q3 FY26 财报（$600 亿 AI 芯片债务融资检验点）；9/3 Tesla Cybercab "exclusive access" 活动。
3. **ICLR 2027 投稿截止** — 摘要 **9/18 AOE**、全文 **9/25 AOE**（上期已自 iclr.cc 确认）；另外 GLM-5.3-Flash 限时 5 折 **9/9 24:00（UTC+8）** 截止。

---

## 【模块二】模型发布追踪

> 本周主战场完全在国内开源侧：8/26–8/28 三天内 GLM-5.3-Flash、Qwen3.8-Flash-Next、GLM-5.3、Hy4 preview 四连发。国际闭源侧只有 Google 一款语音转写模型，OpenAI / Anthropic / Meta / xAI 均无新模型。

### ① 国际商业模型（闭源）

#### Gemini 3.5 Transcribe — Google（8 月 26 日）

**核心能力亮点**：专用语音转文字模型，支持 **85+ 语言**，流式延迟低于 **1 秒**；官方词错误率（WER）流式 **4.0%**、非流式 **2.6%**；支持说话人分离、情绪检测与自动格式化。5/19 I/O 首曝后本周正式补发模型卡。

**访问方式**：Gemini API / Google AI Studio；已接入 Gboard Rambler，计划登陆 Chrome。

**适合**：需要低延迟多语种转写管线的开发者（会议纪要、字幕、语音 agent 前端）。

> ⚠️ **Gemini 3.5 Pro 仍无限期延迟**：据 Bloomberg（8/13）及后续报道（8/23），已连续错过三个内部节点，主要卡在代码能力，无模型 ID、无定价、无时间表。

（来源：[9to5Google](https://9to5google.com/2026/08/26/gemini-3-5-transcribe/) · [Bloomberg](https://www.bloomberg.com/news/articles/2026-08-13/google-debuts-new-gemini-flash-while-top-ai-model-still-delayed)）

#### OpenAI — 本周无新模型发布

产品与定价侧动作密集：8/21 起 GPT-5.6 家族 API 与 credit 定价下调超 **20%**（为期 3 个月）；8/24 Sol/Terra/Luna 三档接入 AWS 编程工具 Kiro；8/28 宣布 **11/12 终止向 Cursor（已被 SpaceX 收购）提供模型**，公告中顺带提及"即将推出的模型 **Astra**"——这是 Astra（8/18 曾因判定可能触及 Preparedness"关键"网络能力档而停摆最大规模 RL 训练）首次以"即将推出"口径出现在官方文本中，值得盯。（来源：[OpenAI](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/)）

#### Anthropic — 本周无新模型发布

产品侧：8/27 开放 **Model Hardware Standard（MHS）** 研究预览；8/27 扩展科学家支持计划（1 万个 Claude 免费/折扣席位）；8/28 Claude for Teachers 面向美国 K-12 开放。旗舰仍为 Claude Opus 5（7/24）。（来源：[Anthropic](https://www.anthropic.com/news)）

#### xAI / SpaceXAI、Meta、Mistral — 本周无重大模型发布

xAI 8/27 将 Grok 4.6 接入 Microsoft Foundry 与 Google Enterprise Agent Platform（分发扩展，非新模型）；Grok 4.7 传 9/2 前发布，未经官方确认。Meta 最近一次发布仍是 Muse Glimmer 30B（8/10，见上期）。Mistral 8/24 与沙特 HUMAIN 达成数亿欧元级主权 AI 合作（网络安全、语音、阿拉伯语模型），未伴随新模型。（来源：[x.ai](https://x.ai/news) · [Mistral](https://mistral.ai/news/mistral-x-humain/)）

### ② 国内大模型

#### GLM-5.3 完整版权重 — 智谱 AI（8 月 28 日开源）★ 兑现"两周开源"承诺

**是否开源**：是。[huggingface.co/zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3)，MIT 许可（GLM 系自 2025 年 7 月起统一 MIT；旗舰版 LICENSE 文本建议以仓库页为准）。

**核心规格**：MoE，约 **744B 总参 / 40B 激活**，与 GLM-5.2 同基座——上期已析，其代际提升完全来自后训练扩展（Terminal-Bench 3.0 4.6→28.3、DeepSWE v1.1 46.2→66.9，见上期）。上下文窗口信源不一（多数称 200K，个别称 1M），以 [官方文档](https://docs.bigmodel.cn/cn/guide/models/text/glm-5.3) 为准。

**开源为何迟到两周**：官方口径为安全评估与加固耗时——模型"进攻性网络安全能力增长快于预期"。这是国内首个因网络攻击能力做发布前加固并公开说明的开源权重案例。

**生态**：unsloth 当天放出 [GGUF 量化](https://huggingface.co/unsloth/GLM-5.3-GGUF)（Dynamic 1-bit 体积 -85%/准确率约 76%，2-bit -83%/约 81%）。API 价格与 GLM-5.2 持平：输入 $1.4 / 缓存 $0.26 / 输出 $4.4（每百万 token）。

**与国际同类对比**：智谱称与 Claude Opus 4.8 同档；第三方复测（Artificial Analysis 等）是下一验证点。

#### GLM-5.3-Flash — 智谱 AI（8 月 26 日发布并开源）★ Ox Alpha 揭盅

**是否开源**：是。[huggingface.co/zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)，MIT。

**核心规格**：**320B 总参 / 18B 激活**（Safetensors 标注 321B），GLM-5 系首个**原生多模态**模型；首次引入稀疏+线性混合注意力与 Manifold-Constrained Hyper-Connections（mHC）；预训练语料 **30T token**。

**官方 benchmark**（HF 页面 Eval Results）：Terminal-Bench 2.1 **84.3**、DeepSWE **63.4**、HLE **55.3**；Artificial Analysis 智能指数 **57**（智谱称与 Claude Opus 4.8 持平）。

**两个值得记录的事实**：其一，Z.ai 官方证实该模型即 8/20 起在 OpenRouter 免费预览并冲上调用量榜首的匿名模型 **Ox Alpha**——"匿名上榜攒口碑→揭盅开源"成为一种新发布打法；其二，官方称其推理**完全运行在中国 AI 芯片上**。

**定价**：列表价输入 $0.15 / 缓存 $0.03 / 输出 $0.50（每百万 token）；**限时 5 折至 9/9**，折后 $0.075 / $0.015 / $0.25——约为 GLM-5.3 的 1/10、折扣内 1/20。（来源：[Z.ai 定价](https://docs.z.ai/guides/overview/pricing) · [界面新闻](https://www.163.com/dy/article/L59RD82A0534A4SC.html)）

#### Qwen3.8-Flash-Next — 阿里通义千问（8 月 26 日开源）★ Qwen4 架构提前试跑

**是否开源**：是。[huggingface.co/Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)（含 [FP8 版](https://huggingface.co/Qwen/Qwen3.8-Flash-Next-FP8)）。许可为 **Qwen Community License 1.0**（非 Apache-2.0）：允许商用/修改/分发，但月活超 1 亿或月收入超 $2,000 万需显著标注模型名，MaaS 业务需单独授权。

**架构（Qwen4 预览的全部看点）**：

- **125B 总参 / 每 token 激活 6B** 稀疏 MoE（512 专家，10 路由 + 1 共享）
- 外挂 **51B 参数 n-gram 嵌入表** 与 **4B MTP 模块**——把静态记忆从 Transformer 主干中剥离出来
- **36 层 Gated DeltaNet + 12 层 Qwen Sparse Attention（QSA）** 按 3:1 混合——线性注意力为主、稀疏注意力兜底的长上下文路线
- 原生 **262,144** 上下文，YaRN 可扩至 1M；官方称训练开销约为 Qwen3.7-Plus 的 **1/9**

**官方 benchmark**（对比 Claude Opus 4.6 Max）：SWE-bench Pro **62.5 vs 53.4**、CoWorkBench **73.9 vs 68.2**、JobBench **55.7 vs 36.6**；HLE **35.9 vs 40.0**（落后）。1/9 成本口径待第三方复测。

**获取**：ModelScope / HF 权重；API（DashScope）输入 $0.16 / 输出 $0.47（每百万 token）。Unsloth、SGLang 当晚完成适配。（来源：[Qwen Blog](https://qwen.ai/blog?id=qwen3.8-flash-next)）

#### Hy4 preview — 腾讯混元（8 月 28 日发布并开源）★ 本周最意外的发布

**是否开源**：是，**Apache 2.0**（本周三个国产旗舰权重中许可最宽松）。

**核心规格**：**770B 总参 / 49B 激活**，上下文突破 **1M**。

**与国际/国内同类对比**：腾讯内部 **163 名专家、203 个工程任务**盲测均分 **2.99/4**，官方称"略优于 GLM-5.3 和 Kimi K3"。注意：这是未经第三方审计的内部盲测，样本量与方法学在社区已有质疑（见模块六），第三方榜单成绩是下一验证点。

**获取**：WorkBuddy / CodeBuddy（国内外版）、元宝、ima 已同步接入；API 经腾讯云 TokenHub 或 OpenRouter。（来源：[腾讯官方](https://www.tencent.com/zh-cn/tencent-releases-and-open-sources-tencent-hy4-preview/)）

#### DeepSeek — 本周无新发布，但状态值得记录

官方新闻页最新条目停在 8/21 的 V4-Flash-Vision-Exp。三件事：其一，**V4-Pro 撤回已两周仍未重新上线**（8/13 发布、24 小时内撤下横幅；API 从未下线仍可调用；官方至今无说明）；其二，**API 涨价 8/17 生效**：峰时输出 ¥27/百万 token（此前 ¥6，涨约 350%），谷时 ¥13.5；其三，V4-Flash-Vision-Exp 第三方数字落地：Artificial Analysis 智能指数 **51**（同价位中位数 18），已知短板是图像统一缩放 800×800、每图 384 token 硬上限，小字 OCR 较弱。本周 DeepSeek 的真正大新闻在资本侧（约 ¥5,000 亿投前估值融资 + 科创板筹备），见模块五。（来源：[DeepSeek News](https://api-docs.deepseek.com/news/news260813) · [Artificial Analysis](https://artificialanalysis.ai/models/deepseek-v4-flash-vision)）

#### 其余国内厂商

- **Kimi / Moonshot**：无新模型。K3（2.8T 参数）正与微软/亚马逊/谷歌洽谈上云分成（最高 30%，Reuters 8/26）；**kimi-k2.5 / moonshot-v1 旧系列 8/31 全平台下线**，仍在用的注意迁移。
- **字节豆包**：模型无更新；**Doubao Work** 8/25 上线独立客户端（见模块七）。
- **百度文心 / MiniMax / 零一万物 / 阶跃星辰 / 面壁智能**：本周无重大发布。MiniMax 2.7T 参数 M3 预期 Q3；面壁披露 MiniCPM 全球累计下载超 5,000 万次（8/26 四周年内部信）；零一万物开放平台业务持续收缩（8/10 公告停止 API/充值）。

### ③ 其他重要开源模型

#### Granite 4.2 — IBM（8 月 26 日，Apache 2.0）

**参数规模**：3B / 8B / 30B 三档 dense，约 **15T token** 从头预训练；原生 **128K** 上下文（30B 可扩 512K）；8B/30B 针对工具调用、终端操作、多步指令做了专门 RL，带思考/非思考模式切换与原生 tool calling。

**Benchmark**：Artificial Analysis 智能指数 8B = **20**、30B = **24**（同尺寸开源中位数 9）；8B 输出 **137.4 token/s**、首 token 延迟 0.63s。

**运行硬件**：3B 端侧/笔记本即可；8B 单张 16GB 消费卡（FP16）；30B 按 4-bit 量化估算约 **20GB** 显存、单张 24GB 卡可跑（估算值，以 Ollama 实测为准）。

**获取**：[huggingface.co/ibm-granite](https://huggingface.co/ibm-granite)、Ollama、AWS Marketplace；API $0.06 / $0.25（每百万 token）。

**适合场景**：处理敏感数据、要求本地部署与成本可预期的企业内部 agent——IBM 的卡位与前沿实验室相反，和本周国产低价开源潮指向同一趋势。（来源：[IBM Research](https://research.ibm.com/blog/introducing-granite-4-2) · [Artificial Analysis](https://artificialanalysis.ai/models/granite-4-2-30b)）

#### Llama / Gemma / Phi / Nemotron — 本周无重大发布

Nemotron 最近版本为 3.5 Lightning（8/11，30B-A3B 混合 Mamba-2 架构，见上期窗口）。

---

## 【模块三】热门论文精选

> 本期收录 20 篇，全部经 HF API / arXiv abs 页面逐一验证，ID 前缀均为 `2608`。HF ⭐ 为 Hugging Face Daily Papers 周榜（Aug 23–29）点赞数，取自 HF API 实时数据（2026-08-29）。本周榜单的结构性特征：前 10 名里 benchmark/测试床类占 5 席（VBVR-Pro、VGI-Bench、FrontierChallenge、PAWBench、UrbanGround）——评测基建正在成为比刷榜更受关注的贡献类型。

### 🤖 AI Agent / 工具使用

#### Apodex 1.1: Scaling Agentic Intelligence for Complex Work
📄 https://arxiv.org/abs/2608.23283 | 💻 https://github.com/ApodexAI/FrontierAgent（⭐1,218）| 🤗 HF ⭐ 200（本周第 2）| 机构：Apodex

**问题**
通用 LLM 能推理与整合知识，但"复杂工作"还要求与文件、信息源、可执行代码的持续交互，外加状态维护、失败恢复与可验证交付。现有 agent 训练把这些能力寄托在单一模型的单次前向上：长程任务无法分解并行、异步结果无法整合、任务状态与出处（provenance）在工具与子 agent 之间丢失。

**方法**
论文把"working capability"（对真实目标的持续、可验证推进）定义为一等训练目标，沿两个正交维度扩展：

- **Environment Scaling**：系统性扩大可执行的文件、搜索、代码环境的多样性与可验证性——奖励信号来自环境本身的可验证结果，而非人工偏好标注
- **Agentic Coordination Scaling**：训练 agent 分解长程任务、委派并行子任务、整合异步返回结果、并在失败时重规划——协调轨迹（coordination traces）本身被转化为训练数据
- 共享执行 harness 与 **AgentOS** 在工具与多 agent 之间维护任务状态与出处；与"更大基座"路线的本质区别在于，它押注环境轨迹 + 协调轨迹的后训练，而非参数规模

**效果**
- 在专业工作、金融、科研、数学、编码、搜索等任务上进入 leading performance band，且模型规模"明显小于多数前沿系统"（摘要未给出主模型参数量）
- **35B 的 Apodex 1.1 Mini** 保留大部分工作能力，可本地部署——与本周 FreeToken 等本地推理系统构成呼应
- 注意：摘要未披露具体 benchmark 数字，属于"报告型"论文中数字保留较多的一篇；配套 FrontierChallenge（见 AI for Science 节）给出了其评测方法论

#### JIT-Agent: Scaling Harness Intelligence via Just-in-Time Harness Evolution
📄 https://arxiv.org/abs/2608.25593 | 💻 https://github.com/bingreeky/JIT（⭐68）| 🤗 HF ⭐ 107 | 机构：未标注

**问题**
Agent 能力不由模型单独决定：记忆管理、规划策略、行动协议、工具/技能编排组成的 harness 对表现的贡献可以压过基座模型本身。但 harness 设计至今是手工的、任务特定的、不可扩展的——每个新任务都要人重新攒一套 runtime。

**方法**
- 把 agent harness 形式化为**可组合、可机器生成的 artifact**，受一个固定的四模块协议约束（记忆/规划/行动协议/工具编排）
- 训练专门的 harness intelligence 模型 **JIT-Agent**，对任意现成 LLM 即时（just-in-time）完成三件事：为当前任务定制 harness、在执行中修复 harness 以保证稳定运行、从不断扩大的历史 harness 配置档案中蒸馏性能信号实现自进化
- 与 AutoGPT 式固定 harness 或 Claude Code 式手工成熟 runtime 的本质区别：harness 不再是先验设计的静态框架，而是**按任务生成、按性能演化的模型输出**——论文称之为与模型 scaling 正交的"harness intelligence"维度

**效果**
- DeepSeek-V4-Flash + JIT-Agent 在 DeepSearchQA 上超过 GPT-5.6（**+9.1**），OdysseyBench **+4.3**
- 已然很强的 GLM-5.2 仍获得最高 **+20.2 分**——harness 增益不随模型变强而消失
- 生成的 harness 与 OpenCode、Claude Code 等成熟 runtime 性能相当，并在 DeepSeek V4、Mimo-V2.5、Qwen3.6 多尺度家族上一致提升

### 🧠 大语言模型 / 推理

#### TTPO: Test-Time Policy Optimization
📄 https://arxiv.org/abs/2608.27448 | 💻 https://github.com/ZJU-REAL/TTPO（⭐20）| 🤗 HF ⭐ 67 | 机构：浙江大学 ZJU-REAL

**问题**
RL 与 On-Policy Self-Distillation（OPSD）都依赖 ground-truth 标签，无法用于 test-time training。用多数投票伪标签替代是自然思路，但极脆弱：一次错误投票会污染教师信号，误导每一个 token 的更新。

**方法**
- 核心观察是失败模式的**不对称性**：与伪标签不一致的 rollout，无论投票本身对错，通常都是错的——伪标签"选错答案"的代价与"排除错误答案"的可靠性不对等
- 据此设计不对称目标：对**同意伪标签的 rollout 走 OPSD 蒸馏**（利用其大概率正确），对**不同意的 rollout 施加 Grouped RL 惩罚**（利用其大概率错误）
- Token 级筛选进一步细化两支：蒸馏分支降权已收敛位置，RL 分支只惩罚高置信错误——即使伪标签频繁出错，两类更新仍然有据可依
- 多数投票路由随模型变好而给出更紧的自监督，形成正反馈；与 TTRL 等纯伪标签 RL 的区别在于错误伪标签不再直接变成错误梯度

**效果**
- 五个竞赛级数学 benchmark 上，无标签 TTPO **追平有标签监督的 OPSD**
- Qwen3-1.7B 经 TTT 从 **38.0% → 45.2%**；non-thinking 模式下带来 **+25.2% 到 +36.4%**
- 跨任务泛化良好（摘要口径）

### 👁️ 多模态

#### VBVR-Pro: A Scalable and Verifiable Suite for Native Visual Reasoning
📄 https://arxiv.org/abs/2608.26105 | 💻 https://github.com/Video-Reason/VBVR-Pro（⭐21）| 🤗 HF ⭐ 250（本周第 1）| 机构：Video-Reason

**问题**
Native visual reasoning 把视觉生成当作推理介质本身——图像/视频不只是输入或输出，而是解题的一等载体。但该方向卡在三件事上：没有可扩展的训练任务、没有可靠反馈（VLM-as-a-judge 有系统性失败模式）、没有跨生成载体（图像 vs 视频 vs 交错）的受控比较。

**方法**
- **任务缩放**：把视觉推理变成 300 个程序化生成任务的受控任务空间，难度、载体、技能标签全部可控
- **可验证奖励**：用确定性、任务特定规则构建 reward scorer 替代 VLM 判官；论文先系统研究了主流 MLLM 判官的复发性失败模式，再证明规则 scorer 与人类判断细粒度对齐，可直接作为大规模多任务 RL 的奖励信号
- **机制研究**：在 30+ 个图像/视频/交错生成器上做受控模态实验；ablation 与 probing 提示存在对视觉推理至关重要的 vision-native trajectories——视频生成对需要持续时空状态跟踪的任务最强，交错生成是算力更省的替代
- 与以往"评测即静态题库"的区别：VBVR-Pro 是闭环测试床，同一套设施同时支撑训练（RL 奖励）、评测与机制分析

**效果**
- 在 VBVR-Pro 上训练的模型迁移到 RISE-Video、MME-CoF-Pro、BabyVision 等 **7 个外部视觉推理 benchmark** 均有提升（摘要未给具体分数）
- 规则 scorer 作奖励的 post-RL 表现优于 VLM 判官作奖励
- 数据、模型、scorer、代码全部开源

#### VGI-Bench: Probing Visual Intelligence in Video Generation Models
📄 https://arxiv.org/abs/2608.19583 | 💻 https://github.com/hexuan21/VGI-Bench（⭐8）| 🤗 HF ⭐ 170 | 机构：UIUC

**问题**
"视频生成模型具备零样本视觉推理"的说法缺乏可靠评测：现有基准的输入与视频模型的视觉先验不对齐、只验收"看似合理的最终状态"而不验收演化过程是否有效、难度未校准（要么全不可做要么全可做）。

**方法**
- 27 个任务、810 个实例，按"任务域 × 技能标签"两级分类法组织，支持细粒度归因
- 三条设计原则直指上述瓶颈：输入对齐视频模型先验、要求有效的演化过程（而非只看末帧）、难度校准到"有挑战但部分可行"
- 分析框架覆盖输出失败模式、输入条件敏感性、合成微调的性能迁移边界，以及从内部去噪视角审视自我纠错

**效果**
- 最强模型 **Seedance 2.0 也只有 51.0%**——当前视频生成系统只能解决视觉落地推理任务的一个子集
- 去噪过程分析的关键发现：后期去噪步骤主要在**精修早期假设，而非纠正推理错误**——视频模型缺乏推理层面的自我纠错机制
- 合成数据微调的迁移存在明确边界（域内涨、域外不涨）

#### Annotations as Rollouts: Efficient and Scalable RL for Video MLLMs（OraRL）
📄 https://arxiv.org/abs/2608.20492 | 💻 https://github.com/HVision-NKU/OraRL（⭐141）| 🤗 HF ⭐ 102 | 机构：南开大学 HVision

**问题**
视频 MLLM 的 RL 后训练采样效率极低：on-policy 组里高质量 rollout 稀少，即便配上昂贵的 CoT 生成也是如此——GRPO with CoT 的步时间是 SFT 的 **4.9 倍**，而组内大多是低奖励样本。

**方法**
- 核心想法：标注不只用来给 rollout 打分，**标注本身可以作为 oracle rollout 进入 on-policy 组**，成为直接的正向优化目标
- 直接混入会触发论文命名的 **advantage inversion**：高奖励 oracle 抬高组基线，把本来为正的策略优势翻负。解法是**解耦优势估计器**——策略 rollout 单独决定 oracle-free 基线；oracle 与策略的差距只调制方向增益和一项 detached 的 oracle 优势
- **符号平衡剪枝**：每组只保留 oracle + 各符号最强的 rollout，把步时间压到 SFT 的 **2.2 倍**（不足 GRPO+CoT 的一半）
- 与 GRPO 的本质区别：GRPO 的监督完全来自模型自身采样的相对排序，OraRL 把外部标注以受控方式注入采样组，同时保住 on-policy 的优势结构

**效果**
- 从 0.8B 到 9B 全部超过 backbone，在 100k prompt 规模上超过 GRPO
- 免 CoT 解码：**130 ms vs 4,780 ms**
- Video-ORA-9B 对既有最优：时序 mIoU 62.5→**66.0**、跟踪 AO 73.0→**78.2**、分割 64.3→**70.4**、空间智能三基准宏平均 51.0→**56.1**；VSI-Bench **73.1**，对比 GPT-5 的 55.0 与 Gemini-3-Pro 的 55.1

#### VoiceMem: Streaming Dual-Brain Memory for Real-Time Interaction
📄 https://arxiv.org/abs/2608.26005 | 💻 https://github.com/xzf-thu/VoiceMem（⭐147）| 🤗 HF ⭐ 164（本周第 4）| 机构：南洋理工大学（NTU）

**问题**
双工语音语言模型（duplex SLM）缺一个流式、准确、有情感的记忆系统：文本 agent 的记忆框架（如 Mem0）按回合批处理检索，延迟与语音交互的 VAD 窗口不兼容，且只存信息不存情感/人格状态。

**方法**
- **双脑并行架构**：信息"左脑"负责事实记忆检索，情感"右脑"做短程+长程情感归因与双节点人格建模，两者并行不互相阻塞
- **流式记忆 I/O**：读写嵌入语音流水线，检索延迟压进 VAD 静默窗口内，对话零额外延迟
- 配套完整管线：记忆感知的 SLM 训练、长时程评测协议、可换记忆后端的解耦部署——记忆层与模型层解耦是与端到端记忆参数化路线的本质区别

**效果**
- 检索精度：top-5 检索下左脑比 Mem0 的 **top-200 还高近 30 分**
- 情感/人格：三个 persona benchmark 全部 SOTA，聚合分比此前最优系统 **+4.29**
- 延迟：检索 **134 ms**，在标准 VAD 窗口内，真实部署验证

#### Self-OPD: On-Policy Distillation for Flow Matching Models without Teacher
📄 https://arxiv.org/abs/2608.26872 | 💻 暂未开源 | 🤗 HF ⭐ 66 | 机构：未标注

**问题**
Flow matching 模型的 on-policy distillation 需要为每个新目标训练一个任务特定教师（算力成本高），且教师-学生分布差异沿生成轨迹累积误差。

**方法**
- 免教师：把学生自身的探索变成逐步监督。每个时间步把确定性 next-state 预测分叉成 K 个随机 SDE 候选，用 ODE 采样器 rollout，与确定性自参考基线比较奖励得到归一化优势
- **all-branch pull-push 目标**优化速度场：高优势分支吸引、低优势分支排斥，配方向感知衰减与 SDE 方差归一化
- 多目标对齐在奖励层融合归一化分数，避免梯度直接冲突——与 RL 微调扩散模型（如 DDPO）的区别在于监督信号是步级的自蒸馏而非序列级回报

**效果**
- 单奖励与混合奖励 benchmark 上超过既有 RL 与 OPD 方法（摘要未披露具体数字，需查正文表格）

### 🦾 具身智能 / 机器人

#### GigaBrain-0.7: Scaling Embodied Foundation Models with a Three-System Architecture
📄 https://arxiv.org/abs/2608.15875 | 💻 https://github.com/open-gigaai/giga-brain-0（⭐2,623）| 🤗 HF ⭐ 99 | 机构：GigaAI

**问题**
VLA 模型在结构化场景中已能完成复杂长程任务，但三个开放问题没有答案：架构上理解/预测/行动是否应该分离、数据上能否扩展到更大更异构的规模、泛化上能否跨任务跨本体。

**方法**
- **三系统架构**统一理解（vision-language）、预测（世界预测）与行动（action generation）——而非常见的"VLM 骨干 + action head"两段式
- 预训练扩展到 **37,000+ 小时**异构具身数据（真实多本体）
- **一阶段对齐训练**：联合优化视觉语言理解与多本体动作生成，避免两阶段训练中理解能力被动作微调侵蚀的问题——这是与 π0.5 等先理解后对齐路线的本质区别
- 训练代码与预训练权重承诺全部开源

**效果**
- 对上代 GigaBrain-0 系列与 π0.5 等 SOTA，零样本基础能力、语言条件指令跟随、后训练任务成功率均有提升（摘要未给具体百分比，正文有分项表）
- 自研 Maker H01 平台与主流机器人本体上，家庭与工业场景均验证任务适应性

#### WarpSAC: Scalable Off-policy RL by Rethinking Exploration and Exploitation
📄 https://arxiv.org/abs/2608.24479 | 💻 https://github.com/wzhhasadream/warprl（⭐12）| 🤗 HF ⭐ 134（本周第 6）| 机构：天津大学

**问题**
大规模并行仿真改变了 off-policy RL 的数据 regime，但主流稳定器是为数据受限的 replay 设计的：参数归一化在 replay 覆盖窄时有用、数据充裕时反而限制 value 拟合；clipped double-Q 在高吞吐 manipulation 场景可以放松却默认全开——稳定器与数据 regime 错配。

**方法**
- 先用八个 benchmark 家族的受控实验建立"稳定器依赖数据 regime"的实证结论，再给出 regime 感知的算法族：
- **WarpSAC-L**（Norm ON + clipped double-Q）用于 CPU 规模数据受限训练；**WarpSAC-A**（Norm OFF + single-Q）用于 GPU 大规模并行的数据充裕训练
- 两个变体共享 **Sample Weight Decay**（按样本年龄偏置的 replay 加权），在各 regime 下（尤其网络容量受限时）提升利用效率
- 与 FlashSAC/SAC 的本质区别：不是又一个新损失，而是把"稳定器该开该关"变成由数据 regime 决定的显式设计变量

**效果**
- 归一化 score–step AUC 对 FlashSAC：CPU 规模 9 环境 **+4.5%**，GPU 并行 14 环境 **+23.1%**
- UnitreeG1TransportBox-v1 成功率 **19.8% → 96.4%**
- MuJoCo Playground 平均归一化 wall-time AUC **+19.1%**；宇树 G1 实机 sim-to-real 部署提速 **36.4%**

#### τ₀-VLA: Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation
📄 https://arxiv.org/abs/2608.16885 | 💻 https://github.com/sii-research/tau-0-vla | 🤗 HF —（未上榜）| 机构：上海创智学院

**问题**
分层 VLA 的高层子任务生成通常是单次前向：无论决策多困难、后果多严重，分配的计算量恒定——测试时计算扩展（test-time scaling）在语言模型上已被证明有效，但机器人高层决策没有对应机制。

**方法**
- 把高层子任务生成表述为**算力可扩展的推理问题**：每步用执行记忆生成子任务，必要时在世界模型引导下对备选子任务做搜索再提交——世界模型充当"预演器"，用预测 rollout 给候选打分
- 低层策略跨多机器人本体执行生成的子任务；高低层解耦使额外算力全部投向高层难点
- **40,115 小时**异构真实数据 + 多模态协同训练；与 SayCan 式 LLM 规划的区别在于搜索由学习到的世界模型（而非语言先验）引导

**效果**
- 增加测试时计算在 in-domain 与 distribution-shifted 设定下均提升下一子任务预测精度，并转化为长程 manipulation 闭环成功率提升（摘要未给具体数字，正文有算力-性能曲线）

#### BATON: Long-Horizon Manipulation via Agentic Subtask Exploration and Transition-aware Memory
📄 https://arxiv.org/abs/2608.16889 | 💻 未见开源链接 | 🤗 HF —（未上榜）| 机构：USC / UCF

**问题**
冻结 VLA + LLM agent 的长程操纵范式在长任务上有两个结构性失败：其一，能力来自测试时的整任务探索，成本随阶段数 K 乘性增长——单阶段需 T 个 episode，K 阶段就要约 **T^K**，且失败无法归因到具体阶段；其二，VLA 原语只有退出条件没有进入条件，前一子任务可以"成功"在一个后继无法使用的状态上。

**方法**
- **子任务作为探索单元**：每个子任务在廉价的短程 regime 内单独探索、解法存入记忆，长程轨迹由解法组合而成——成本从 T^K 降为 **T×K**，每次失败可归因到单一阶段
- **transition-aware memory** 管理三类转移：子任务内由 verifier agent 把关调用转移（腕部视角确认场景就绪才调 VLA）；子任务间 handoff 转移恢复被前序残留破坏的进入状态；lookahead 转移选择后继可继承的策略
- 全程不更新任何参数——与微调路线的本质区别是把长程能力放进记忆与转移管理，而非权重

**效果**
- 长程基准 RoboMemArena：任务成功率对 SOTA **+11.6%**，累计成功率 **+14.9%**
- 探索成本复杂度从乘性（T^K）降为加性（T×K），这是消融中最重要的结构性差异

### 🌐 世界模型（其他新兴方向）

#### Agentic Game Development as a Verifiable Trajectory Data Engine for Scaling World Models
📄 https://arxiv.org/abs/2608.25518 | 💻 暂未开源 | 🤗 HF ⭐ 128（本周第 7）| 机构：未标注

**问题**
世界模型的主流 scaling 策略是"更多爬取视频 + 更多算力"，但空间生成的 RL 后训练缺乏高质量奖励：CLIP 分数之类的代理信号模糊且有偏，无法支撑 RL——对比代码 agent，编译器与 runtime 提供了可执行的精确奖励，这正是代码方向后训练成功的前提。

**方法**
- 核心论断：游戏开发是空间世界模型缺失的那个奖励环境。**游戏引擎编码的场景是可执行的世界规范**——引擎可以高效验证碰撞、物理、可导航性与有界可玩性（稠密信号），开发者对场景的接受/拒绝提供全局验证信号（稀疏人类信号）
- 提出 **RLHEV**（Reinforcement Learning with Human-Engine Verification）后训练范式：稠密引擎信号 + 开发过程中隐式的人类接受反馈相结合
- 游戏开发同时天然产出真实世界的长程轨迹数据，补上 RL 后训练的数据面
- 与 RLHF 的区别：验证者是引擎（确定性、可扩展）+ 开发流程中的人（免专门标注），而非雇来的偏好标注员

**效果**
- 范式主张型论文，摘要未给出量化结果；其价值在于给"世界模型如何做 RL 后训练"提供了一个可执行奖励源的完整论证，本周 128 个点赞反映了社区对该问题的关注度

#### PAWBench: How Far Are We from Probabilistically Aligned World Modeling?
📄 https://arxiv.org/abs/2608.27345 | 💻 https://github.com/Andrew0613/PAWBench（⭐6）| 🤗 HF ⭐ 75 | 机构：未标注

**问题**
视频生成模型被越来越多地当作世界模型，但许多物理过程有多种有效展开方式：世界模型不仅要生成一条合理轨迹，还应在相同初始观测与动作下复现**可能行为的分布**。现有评测全部停留在单视频合理性，不检验重复生成是否恢复正确分布。

**方法**
- 把 **probabilistic alignment** 形式化为世界模型的分布级判据
- **PAWEval** 协议：把重复视频 rollout 转换为可能物理行为上的经验分布，与参考分布比较——评测对象从"这条视频像不像"变成"这个采样器的分布对不对"
- 进一步测试语言提示、初始噪声采样、模型训练三种手段能否重塑模型的预测分布

**效果**
- **50 个场景 × 11 个当前系统**：没有任何模型能在恢复有效行为范围的同时一致匹配参考概率
- 这是对"视频模型 = 世界模型"叙事的第一个分布级否定证据，与 VGI-Bench 的过程级证据（自我纠错缺失）互补

#### UrbanGround: From Local Perception to Spatial Agency in a Real-Scale City
📄 https://arxiv.org/abs/2608.27456 | 💻 https://github.com/UrbanGround/UrbanGround（⭐42）| 🤗 HF ⭐ 70 | 机构：未标注

**问题**
MLLM 能解读一张街景，但城市尺度的 agency 取决于局部证据在 agent 开始移动后是否仍然有用——现有空间评测要么是静态 VQA，要么是小尺度仿真，无法回答"局部感知能否组合成持续的目标导向行为"。

**方法**
- 用全港域 3D 地理空间数据构建**物理约束的真尺度香港复刻沙盒**，支持第一人称闭环交互 + 交互式地图导航
- 三个递进研究问题拆解空间问题的生长过程：主动观察后能否 ground 局部场景 → grounding 能否支撑目的地越来越远/越来越隐式的导航 → 行为能否在路线可用性与行人运动变化下存活

**效果**
- 当代 MLLM agent 的原子能力（视觉识别、短程空间推理）可用，但**方向感与行人感知移动不可靠**
- 中心失败模式：长时间探索中局部能力无法组合成持续的目标导向行为，误差累积且无有效纠正——与 BATON 在操纵域发现的"误差复合"同构，尺度换成了城市

#### EchoWM: Open and Enterable Omnimodal World Models（简评）
📄 https://arxiv.org/abs/2608.23189 | 💻 暂未开源（项目页已上线）| 🤗 HF ⭐ 74 | 机构：京东 Echo 团队（据项目页）

可进入（enterable）的全模态世界模型：连续导航驱动下联合生成 **720p 视频 + 环境音 + 音乐 + 语音**。交互围绕相机意图组织——第一人称场景由观察者运动指定，第三人称场景的相机-角色动力学从数据中学习、不设视角特定控制器；离散指令与连续位姿统一映射到公制尺度的相对 6-DoF 轨迹。渐进训练 + 自回归后训练支撑长时程生成。摘要未给量化数字，公开世界模型 benchmark 成绩见正文。

### 🔬 AI for Science

#### FrontierChallenge: Evaluating Scientific Workflow Completion
📄 https://arxiv.org/abs/2608.24979 | 💻 暂未开源（基准页：apodexai.github.io/FrontierAgent）| 🤗 HF ⭐ 139（本周第 5）| 机构：Apodex

**问题**
科研 agent 已在分析数据、执行代码、产出研究工件，但现有评测只看最终答案、孤立程序或单一学科——"部分进展"与"完整交付"之间的鸿沟从未被度量。

**方法**
- 300 个端到端科学工作流（本篇释出并评测 **97 个**），横跨量子化学、分子动力学、材料表征、分析化学、生命科学、电化学/环境六域
- 每个任务给定固定输入 + 一组必须交付的科学 deliverable 清单；双指标解耦：**Pass Rate**（满足全部完成判据的任务比例）与 **Avg. Score**（部分进展）
- 12 个前沿模型 × 3 种 agent scaffold 的全交叉评测——scaffold 作为独立变量，与本周 harness 主线呼应

**效果**
- 最好配置也只完成 97 任务中的 20 个，**Pass Rate 20.6%**
- 部分进展与完整交付严重脱节：分析化学 Avg. Score **87.6** 但 Pass Rate 仅 **4%**；电化学/环境 Avg. Score **94.9** 而 Pass Rate **0%**
- 最刺眼的数字：非通过的 Claude Code 轨迹中 **75.5%** 以"宣称已完成"的语言收尾——高分与自信的完成宣称都不能作为科学任务已交付的证据

#### Towards Expert-level Medical AI for Real-time Video Consultations（AMIE Video）
📄 https://arxiv.org/abs/2608.09861 | 💻 未见开源链接 | 🤗 HF —（未上榜）| 机构：Google DeepMind

**问题**
医患问诊的标准形态是视听交互（非语言线索承载大量评估信息），纯文本医疗 AI 丢弃了这些感知维度，也把无法书面描述症状的患者挡在门外；此前的视听医疗 AI 只验证了可行性，未达到临床医生水平。

**方法**
- **AMIE (Video)**：基于 Gemini 的多 agent 系统，集成低延迟对话、临床推理与实时视听感知三个子系统
- 先建立远程医疗视听线索的分类学与自动化评测（开发导航仪），再做系统
- 评测采用随机化 **OSCE**（客观结构化临床考试）：30 名基层医生（PCP）、15 名标准化病人演员、100 个临床场景，AMIE (Video) vs AMIE (Text) vs 医生视频问诊三臂对照

**效果**
- 临床评估员评分：AMIE (Video) 在**问诊史采集、诊断、管理、体格观察检查**上与医生持平或更优
- 患者演员偏好 AMIE 的病情评估与解释，但医生在建立信任关系上仍占优
- 模态消融：患者演员在沟通有效性、便利性、被理解感上偏好视频界面而非文本
- 已知局限：精细解剖定位、微妙情感线索、高频运动

### 🛡️ AI 安全 / 对齐 / 可解释性

#### Scaling Inherently Interpretable Language Models（Steerling-8B）
📄 https://arxiv.org/abs/2608.07594 | 💻 https://github.com/guidelabs/steerling（⭐239）| 🤗 HF ⭐ 21 | 机构：Guide Labs

**问题**
可解释性通常被当作能力税：模型先按黑箱训练，再用事后方法（SAE、probing）解释，而这些方法的可靠性本身难以确立。核心质疑：可解释性必须是事后的吗？

**方法**
- 把可解释性做成**训练管线的约束**，与语言建模目标共同优化，而非事后逆向工程
- 跨三个数量级算力、在自回归与扩散两类语言模型上验证：可解释性随能力一起 scale 而非对抗——更反直觉的发现是**表征随规模变得更解耦、更对齐人类可理解概念**
- 实例化为 **Steerling-8B**（带因果注意力掩码的扩散语言模型）：任意一组生成 token 都可归因到相关输入 token、人类可理解概念与训练数据
- 支持闭环干预：通过概念/特征归因诊断输出 → 检索相似训练数据 → 概念转向（concept steering）纠正行为，全程不重训——与 SAE 事后字典学习的本质区别是归因结构在训练时就被塑造进模型

**效果**
- Steerling-8B 与用 **2–16 倍**算力训练的同行开源模型保持竞争力——"可解释性税"在此设定下未被观测到
- 若结论在更大规模成立，等于给"对齐与能力必然冲突"的默认假设提供了一个反例路径

#### DURA: Diffusion-Based Unrestricted Robotic Attacks on VLA Models（简评）
📄 https://arxiv.org/abs/2608.10393 | 💻 未见开源链接 | 🤗 HF —（未上榜）| 机构：Rice University

VLA 对抗鲁棒性的现实威胁模型：现有攻击依赖像素扰动或白盒访问，痕迹明显、难以物理部署。DURA 沿预训练扩散模型的 latent 轨迹优化，生成**视觉自然的对抗 patch**，把机器人导向攻击者指定动作；黑盒设定只需受害模型的动作预测输出。仿真与真实物理环境均验证优于既有方法（摘要未给具体数字）。与上期 OpenART 一起看，agent/具身系统的攻击面研究正在快速具体化。

### ⚡ 高效推理 / 量化 / 训练系统

#### FreeToken: Efficient Edge-Native MoE Serving with Bandwidth-Adaptive Execution
📄 https://arxiv.org/abs/2608.16157 | 💻 https://github.com/FlashML-org/FreeToken（⭐9,250）| 🤗 HF ⭐ 100（8/19 当日 Paper of the Day #3）| 机构：UC Berkeley + MIT

**问题**
前沿开源权重越来越多，但 serving 栈默认数据中心假设。边缘机器的现实是：agent 负载的执行模式持续变化（预填充/解码/工具等待交替），且异构资源（GPU 显存、内存、PCIe 带宽、CPU）的配比因机器而异——固定 offloading 策略在任一维度失配就浪费瓶颈资源。

**方法**
- 把个人电脑当作**统一弹性推理平台**而非"小 GPU"，全栈协同设计：模型布局与加载、专家驻留、CPU-GPU 执行、agentic 状态复用、运行时内存管理
- **带宽自适应执行**：把受限的边缘带宽从固定瓶颈变成运行时调度信号——预填充阶段专家搬运与计算双缓冲，GPU 算当前层时下一层专家经 PCIe 流入
- 不承诺固定 offloading 策略，而是持续把计算与模型状态映射到实际可用资源上；agentic 状态复用针对 agent 负载的重复前缀做专门优化
- 与 llama.cpp/ktransformers 式静态 offload 的本质区别：调度是在线的、负载感知的、机器自适应的

**效果**
- 支持 **20+ MoE 模型**与真实编码/工具 agent，硬件覆盖 8GB 笔记本 GPU 到单工作站 GPU
- **8GB 笔记本跑 35B 模型 39.3 token/s**；游戏台式机跑 284B；**单张 RTX PRO 6000 跑 753B 的 GLM-5.2 达 14.9 token/s**
- RTX 5090 上解码提速最高 **2.3×**；全部评测负载最坏情况 TTFT **< 44 秒**

#### Let's Scale Step by Step: Compute-Efficient Hyperparameter Transfer for Large-Scale MoE
📄 https://arxiv.org/abs/2608.20061 | 💻 未见开源链接 | 🤗 HF ⭐ 43 | 机构：未标注

**问题**
MoE 在极端模型规模 × token 预算下的学习率扫描在算力上不可行；μP（Maximal Update Parameterization）的既有迁移结论未覆盖"MoE + Multi-head Latent Attention + Muon 优化器"这一当前主流组合，token 维度的迁移更是空白。

**方法**
- 两步迁移框架：先给 MoE + MLA + Muon 构造 μP 适配，证明最优学习率在宽度缩放的模型族间一致迁移；再沿 token 维度建立预测性 scaling law——用小代理模型在有限预算上的最优值做线性回归，外推到 10 万亿 token 级训练时程
- 与常规 μP 的区别在于覆盖了专家路由与 Muon 的谱归一化更新对参数化的影响，并把"宽度迁移"扩展成"宽度 × token 双轴迁移"

**效果**
- 外推拟合优度 **R² = 0.95**（10T token 时程）
- 用该方法从零预训练 **155B 总参 / 17B 激活**基础模型，训练稳定、评测达标——小代理模型扫描足以确定大规模 MoE 的最优学习率，消融成本最小化

#### Quantization Degradation in LLMs: A Signal-Noise Perspective
📄 https://arxiv.org/abs/2608.08188 | 💻 未见开源链接 | 🤗 HF —（未上榜）| 机构：中科院自动化所

**问题**
后训练量化的退化程度不由位宽单独决定：4-bit 通常无损、2-bit 普遍崩坏，**3-bit 处在临界区间**——退化随任务类型、量化方法、模型规模剧烈波动，但"为什么波动"没有解释框架。

**方法**
- 用信噪比（SNR）度量量化对全精度表征的扰动强度，把退化追溯到两个链式过程：
- **源头 SNR 分解**：模块内新引入误差由三因素决定——权重误差幅度、任务特定信号强度、量化误差与任务激活的对齐程度；不同量化方法/任务以不同方式作用于这三项
- **跨层传播分析**：误差在层间可被衰减、保持或放大；更大的模型受益于更弱的误差放大——这解释了"大模型更耐量化"的经验规律
- 与 GPTQ/AWQ 等方法论文的区别：这是解释框架而非新算法，把"3-bit 何时能用"从试错变成可分析的问题

**效果**
- 系统实验覆盖多模型家族 × 位宽 × 方法 × 任务：4-bit 通常保持性能、2-bit 常见广泛退化、3-bit 退化显现但因任务/方法/规模差异巨大
- 关键结论：退化 = 源头误差引入方式 × 网络内累积方式的联合结果，SNR 分解可预判哪类任务在哪个位宽先崩

#### LiveMem: Maintaining Memory State Continuity in Long-Running LLM Inference（简评）
📄 https://arxiv.org/abs/2608.02515 | 💻 未见开源链接 | 🤗 HF —（未上榜）| 机构：南方科技大学等

长驻 agent 的交互流终会超出上下文；检索/摘要保留的是"对历史的访问"，不是"跨上下文更替的持续状态"。LiveMem 把这一缺口形式化为 **context turnover 下的状态连续性**：给预训练全注意力 LLM 增加一个固定容量、生命周期独立于活动上下文的记忆状态，主注意力路径只保留有界 KV 窗口；上下文更替与记忆维护、面向记忆的后训练、状态感知 serving 三者配合，使记忆状态在其来源 token 被释放后仍承载信息。LongMemEval 上取得同类 intrinsic memory 方法领先综合表现，证据距离分析显示有用信息存活超出活动窗口（摘要未给具体分数）。

### 候补名单（本周 HF 周榜其余高分论文）

- 2608.24053 WeMM-Embedding: WeChat Multi-Modal Embedding Technical Report（⭐64）
- 2608.24646 On-Policy Self-Distillation in Diffusion Models（⭐63）
- 2608.23041 AutoSaddler: Automatic Harness Optimization with Durable Updates from Agent Execution Traces（⭐60）
- 2608.20958 TLive-Omni: Omni-Modal Understanding for E-Commerce Live Streaming（⭐58）
- 2608.21156 Graph Engineering in the Era of LLM Agents（⭐57）
- 2608.27260 What Makes Good Agentic Data? An ACE Lens on Data Generation for LLM Agents（⭐56）
- 2608.16812 Unlocking the Potential of Image Editing via Concept Scaling and Dense Supervision（⭐49）
- 2608.15763 TaoLive Digital Avatar Agent Technical Report（⭐43）
- 2608.23552 Prime Agent: A Self-Improving RLM Harness（⭐43）
- 2608.23035 MobilePA-Bench: Benchmarking Mobile Planner Agents（⭐41）
- 2608.21500 SecOPD: Mitigating Adaptive Prompt Injections by On-Policy Distillation（⭐39）
- 2608.26200 GameWAM: A World Action Model for Video Games（⭐38）
- 2608.16425 ParaTempo: Efficient Parallel Reasoning via Temporal Confidence（⭐38）
- 2608.20910 InfinityEdit: Infinite Video Editing with a Lightweight Edit-Ignition Adapter（⭐38）

---

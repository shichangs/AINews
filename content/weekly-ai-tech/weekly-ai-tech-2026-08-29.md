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

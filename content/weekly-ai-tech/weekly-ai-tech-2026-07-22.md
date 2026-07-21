# AI 技术周报 · 2026-07-22

覆盖周期：2026-07-14 ~ 2026-07-22 ｜ 面向读者：算法研究员

---

## 【模块一】本周导读

- 🔴 **最重要的变化：前沿"开放权重"竞赛全面 T 级化，且本周由中国厂商 + Thinking Machines 主导，国际六大闭源厂商集体静默。** 5 天内落地三个万亿参数级模型——月之暗面 **Kimi K3**（2.8T MoE，7/16，全球最大开源模型，权重承诺 7/27 前放出）、**DeepSeek V4 满血版**（V4-Pro 1.6T/激活 49B，7/20 正式 GA、MIT 开源）、阿里 **Qwen3.8-Max-Preview**（2.4T 多模态，7/19 WAIC 预览），外加 Mira Murati 的 Thinking Machines 首个模型 **Inkling**（975B MoE，Apache 2.0，7/15）。与此同时，OpenAI / Google / Anthropic / xAI / Meta / Mistral **本周无一发布新模型**（GPT-5.6、Grok 4.5、Muse Spark 1.1 均属上周 7/8–9；Gemini 3.5 Pro 再度跳票）。判断：万亿参数稀疏 MoE + 百万上下文正在成为开放权重旗舰的"新基线"，而这条线上的节奏本周握在中国实验室手里。
- 🟡 **值得关注但尚未明朗：WAIC 2026 把 AI 叙事从"大模型秀场"扭向具身智能 / Agent / 国产算力，但"去表演化"言过其实。** 现场 200+ 机器人厂商同台、腾讯混元一次发三个具身基座（RxBrain / VLM / VLA），评判标准口头上从"能不能后空翻"变成"能不能连续干 8 小时"；但业内直言**模型仍是最大瓶颈**（多数机器人仍靠遥控、极少数能语音驱动做简单指令），本体高度同质化、散热等工程问题无解。世界模型、物理智能的商业形态（游戏 / 数字人 / 机器人训练场 / 端侧）仍未收敛。
- 🟢 **对开发者 / 研究者最有实际价值：API 经济学出现结构性分化，且本周论文极度"评测 / 诊断向"。** DeepSeek V4 引入国内首个**大模型峰谷分时定价**（每日 9–12 时、14–18 时 API 翻倍），批处理任务应改为错峰调用；**deepseek-chat / deepseek-reasoner 旧模型名 7/24 停用**，接入方需立即迁移。Kimi K3 开源却把 API 涨价约 3 倍（"很强但很贵"）。研究侧，本周高质量论文里评测 / 诊断基准扎堆——PolyWorkBench（多语长程 Agent）、ToolFailBench（工具使用失败四分类）、Apple-π（物理定律接地的视频世界模型评测），对做 Agent / 世界模型评估的团队是现成的基础设施。

**下周预告（~7/23–7/29）：**
1. **Kimi K3 完整权重 + 技术报告承诺 7/27 前开放**（届时可验证 Kimi Delta Attention 等架构细节是否属实）；
2. **DeepSeek 旧模型名 `deepseek-chat` / `deepseek-reasoner` 于 7/24 15:59 UTC 停用**，需迁移至 `deepseek-v4-pro` / `deepseek-v4-flash`；
3. **Qwen3.8-Max 正式版与开源待发**（阿里预告将打破 Max 档一贯闭源惯例）；Gemini 3.5 Pro 跳票后重新排期、Mistral "fat but sparse" 开放 MoE 旗舰 early access 进展值得盯。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）——**本周无重大发布**

六大国际闭源厂商本周（7/14–7/22）均无新模型 GA，这本身是本周一个重要信号。归属上周、易被误记为"本周"的发布：GPT-5.6 家族（OpenAI，7/9）、Grok 4.5（xAI，7/8，$2/$6）、Muse Spark 1.1（Meta，7/9，$1.25/$4.25，Meta 旗舰已转闭源）。

- **Google DeepMind（Gemini）**：**Gemini 3.5 Pro 再度跳票**。业界广传"7/17 上线"，当日无公开发布；据 Bloomberg 7/16 报道因内部质量未达标推迟，仍限少数企业预览，现行公开 GA 仍为 Gemini 3.5 Flash。传闻规格（2M 上下文、Deep Think）无官方 model card，勿作已发布。
- **Anthropic（Claude）**：本周无新模型。最新为 Claude Sonnet 5（6/30）、Claude Fable 5（7/1 全球恢复）。本周仅产品 / 定价层动态（如为印度本地化定价，7/13）。
- **xAI（Grok）**：本周无新模型，且**"7 月中旬登陆欧盟"未落地**（受 EU AI Act 系统性风险合规评估所阻，官方改口"本月晚些"）。
- **OpenAI**：本周无新模型。非模型动态：7/17 宣布停用 Atlas 浏览器、收拢入 ChatGPT 单一 App。
- **Mistral**：本周无正式发布。CEO Arthur Mensch 约 7/4 预告的"fat but sparse"开放权重 MoE 旗舰仍处**预告 / 合作伙伴早期访问**，未公布名称 / 参数 / 基准 / 许可 / 日期。（注："Le Chaton Fat 24–30T"为已辟谣的假消息。）

来源：[TechCrunch·GPT-5.6](https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6/)｜[Gemini 3.5 Pro 跳票](https://tech.yahoo.com/ai/gemini/articles/where-gemini-3-5-pro-200026497.html)｜[Grok 4.5 未入欧盟](https://www.trendingtopics.eu/spacexai-and-cursor-launch-grok-4-5-not-yet-in-the-eu/)｜[Mistral·NVIDIA blog](https://blogs.nvidia.com/blog/mistral-frontier-open-models/)

### ② 国内大模型（含开源与闭源）

**Kimi K3（月之暗面 Moonshot AI，7/16 正式发布）—— 本周最重磅**
- 是否开源：**将开放权重**（承诺 7/27 前放出完整权重 + 技术报告）；发布时 API 先行。
- 核心亮点：**2.8T 总参 MoE**（每 token 从 896 个 expert 中激活 16 个），**1M 上下文**，原生视觉理解，常开 thinking（当前仅 "max" 一档）；**目前全球参数量最大的开源模型**。据 Artificial Analysis：长程知识工作 Elo 1547（较 K2.6 +732，仅次于 Fable 5）；据媒体报道前端代码（WebDev / Arena.ai 前端榜）反超部分闭源旗舰。两变体：K3 Max（聊天 / agent）、K3 Swarm Max（大规模并行）。
- 与国际同类对比：厂商自述多数基准超 Claude Opus 4.8 max、GPT-5.5 high，不及 Claude Fable 5、GPT-5.6 Sol（竞品版本号为厂商 / 媒体口径，未独立核实）。
- 定价 / 获取：API 约 **$3/M 输入、$15/M 输出、$0.3 缓存命中**（人民币口径输入约 20 元 / 百万、输出约 100 元 / 百万，较 K2.6 涨约 3–3.5 倍，系中国厂商迄今最贵）。kimi.com、官方 API、OpenRouter（`moonshotai/kimi-k3`）。发布数日后因需求过载**暂停新增消费者订阅**（TechNode 7/20）。
- 来源：[新华网](http://www.xinhuanet.com/tech/20260717/da893d3a5e1b429ea79d928e02847744/c.html)｜[Simon Willison](https://simonwillison.net/2026/Jul/16/kimi-k3/)｜[TechNode·暂停订阅](https://technode.com/2026/07/20/kimi-k3-overwhelms-capacity-just-days-after-launch-suspends-new-consumer-subscriptions/)

**DeepSeek V4 满血版（DeepSeek 深度求索，7/20 正式 GA）**
- 是否开源：**是，MIT，完整权重开放**、适配国产芯片。（澄清：1.6T/49B、284B/13B 的参数在 4/24 预览版即公布，但预览版仅具基础对话 / 简单编码；7/20 满血版补齐工程优化与企业级能力。）
- 核心亮点：**V4-Pro 1.6T 总 / 激活 49B**、**V4-Flash 284B 总 / 激活 13B**，全系 **1M 上下文**，强化 agent、数学推理、代码。
- 与国际同类对比：预览版技术报告称 SWE-bench 接近 Claude Opus 级而价格为其数分之一（具体分值多经二次聚合，以官方报告为准）。
- 定价 / 获取：引入国内首个**峰谷分时定价**——平峰 V4-Pro 每百万 tokens ¥3（输入未命中缓存）/ ¥6（输出）、V4-Flash ¥1 / ¥2；高峰段（每日 9–12、14–18 时）翻倍至 ¥6/¥12、¥2/¥4；缓存命中约 ¥0.02–0.025。DeepSeek API（`deepseek-v4-pro` / `deepseek-v4-flash`）、HF 开放权重。**旧 alias `deepseek-chat` / `deepseek-reasoner` 于 7/24 15:59 UTC 停用。**
- 来源：[unwire·满血版登场](https://unwire.hk/2026/07/21/deepseek-v4-official-release-api-price-performance/software/)｜[TechNode·峰谷定价](https://technode.com/2026/06/30/deepseek-to-launch-v4-in-mid-july-with-new-peak-time-api-pricing/)｜[HF·DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)

**Qwen3.8-Max-Preview（阿里通义千问，7/19 WAIC 预览）—— 预览，非正式版**
- 是否开源：预览版闭源；官方称正式版"将开源"（预告，无日期 / 许可，将打破 Max 档闭源惯例）。
- 核心亮点：**2.4T 总参多模态**（文 / 图 / 视频 / 文档），Qwen 首个 >1T 多模态模型；主打全栈开发（WebDev）、数据分析、Office 办公流程等复杂 / 多 Agent / 长程任务，厂商称"仅次于 Fable 5"（未附基准表、未证实）。激活参数未公开。
- 定价 / 获取：预览经 Token Plan（按标准价 10% 计）、千问 PC/Web、Qoder / QoderWork；标准 API 价未公布。第三方估算 4-bit 下仅权重约 1.2TB。
- 附：阿里 Tongyi Lab 7/20 另发 **Qwen-Audio-3.0-TTS**（托管 TTS，Flash/Plus 两档，16 语言，非开源）。
- 来源：[IT之家 7/19](https://www.ithome.com/0/978/738.htm)｜[MarkTechPost](https://www.marktechpost.com/2026/07/19/alibaba-previews-qwen3-8-max-a-2-4-trillion-parameter-multimodal-model-days-after-moonshots-kimi-k3-open-weight-launch/)｜[TechNode 7/21](https://technode.com/2026/07/21/alibaba-outlines-qwen3-8-with-2-4-trillion-parameters/)

**腾讯混元 · 三大具身基座模型（7/18 WAIC 首秀）**
- 是否开源：配套 **Tairos（钛螺丝）平台**升级并持续开源（模型 / 智能体 / 开发工具）。
- 模型矩阵：**Hy-Embodied-RxBrain-1.0**（认知"大脑"，首创文本推理 + 视觉想象在连续认知序列协同）、**Hy-Embodied-VLM-1.0**（感知，约 1/10 计算量达上代旗舰性能）、**Hy-Embodied-VLA-0.5**（视觉-语言-动作统一建模，超万小时数据、跨本体部署）。具体参数官方未公布。
- 背景：语言基座混元 Hy3 于 7/6 正式版发布（窗口外，295B MoE / 激活 21B）。
- 来源：[新浪财经·文汇报](https://finance.sina.com.cn/stock/t/2026-07-19/doc-iniihcxs1434209.shtml)

**其余重点厂商本周状态（仅 WAIC 展示 / 生态动态，无新基座模型）：**
- **百度文心 ERNIE**：无新基座。WAIC 展"芯云模体"全栈矩阵（昆仑芯天池 256、文心 5.1、智能体全家桶）；文心 5.1 为 5/9 发布。
- **智谱 GLM**：无新模型。旗舰 GLM-5.2 为 6 月发布；WAIC 主要为算力动态（Z.ai 建成 1GW 级国产芯片数据中心）。
- **MiniMax**：无新基座 LLM。M3（6/1，约 428B/23B、自研 MSA 稀疏注意力）WAIC"首发首秀"，上新 MiniMax Code 2.0 桌面端（产品）。
- **字节豆包 Doubao**：无新基座。豆包 2.1 Pro 为 6/23 发布；视频模型 Seedance 2.5 预告"7 月上线"，本周是否落地未能核实。
- **零一万物**：无新基座。7/7 发布"一号位 AI"决策产品矩阵（应用，非模型）。
- **其他 WAIC 首发**：阶跃星辰"大模型原生智能体手机"、商汤 SenseNova U1 Pro（7/18，细节建议二次核实）、京东 JoyAI-Talker / JoyAI-Video-Edit。

### ③ 其他重要开源模型

**Inkling（Thinking Machines Lab，美国，7/15）—— 本周旗舰级开源发布**
- 参数规模：MoE **975B 总 / ~41B 激活**；另发 Inkling-Small（276B 总 / 12B 激活，预览）。
- 运行硬件需求：官方**未公布最低显存**；975B 权重需多卡 / 数据中心级（训练于 NVIDIA GB300 NVL72），精确最低显存未能核实。
- 核心亮点：**1M 上下文**、原生多模态（文 / 图 / 音）并原生推理、可调 thinking-effort、校准式回答（标注不确定性）；预训练 45T tokens。厂商称某编码基准达 NVIDIA Nemotron 3 Ultra 同等表现仅用 1/3 tokens，并明确表示"并非当前最强"，定位"可自定义的最佳开源基座"。
- 获取方式：HuggingFace 下载权重（Apache 2.0）；Tinker 平台微调；第三方 API：Databricks / Together / Fireworks / Modal / Baseten。
- 适合场景：需私有化 / 可定制基座、重视校准与长上下文的研究与企业。
- 来源：[TechCrunch](https://techcrunch.com/2026/07/15/thinking-machines-amps-up-its-bet-against-one-size-fits-all-ai-with-its-first-open-model-inkling/)｜[Thinking Machines model card](https://thinkingmachines.ai/model-card/inkling/)

**明确排除（本周无新版本）**：Meta Llama（旗舰已转闭源）、Google Gemma（最新 Gemma 4 为 3/31）、Microsoft Phi（最新为 3 月）、Mistral 开放 MoE 旗舰（仍预告 / 早期访问）。

---

## 【模块三】热门论文精选

> 收录纪律：所有论文 arXiv ID 前四位均已逐篇核验为 **2607 或 2606**；检索中出现的 2604 / 2603 / 2602 / 2512 等旧论文一律排除。数字均取自论文摘要 / 正文；凡未能从原文取到的具体分数，标注"未能核实"，不作填充。以下论文实验中出现的 Claude Opus 4.8、GPT-5.5、Qwen3.6、Grok-4.3 等模型名为论文原文表述。

### 🧠 大语言模型（LLM）/ 推理能力

**Understanding Reasoning from Pretraining to Post-Training**
📄 https://arxiv.org/abs/2607.16097 | 💻 暂未开源 | 🤗 HF 点赞未查到 | 机构：NYU / Columbia 一系（RL / 理论方向，单位系推断）

**问题**
RLVR（可验证奖励强化学习）后训练几乎总是脱离预训练单独研究，导致两个基本问题无解：(1) 预训练选择（模型规模、数据量）如何决定 RL compute 的边际收益；(2) RL 到底改变了模型什么。标准 LLM 设定下预训练语料庞大不可控，无法把行为干净归因到"预训练 vs RL"，且跨两阶段做系统性 compute 扫描代价过高。

**方法**
- 用**国际象棋作为可控试验台**，完整复刻"预训练 → SFT → RL"标准管线：在人类棋局上预训练 5M–1B 参数模型，用合成推理轨迹做 SFT，再在带可验证奖励的残局上做 RL。
- 与常规"推理科学"研究的本质区别：把整条管线放进一个**奖励可精确验证、compute 可精确扫描的封闭域**，从而定量刻画 pretraining-to-RL 接口，而非在开放语料上做不可控的归因。

**效果**
- 给定 RL compute 下，**post-RL 性能可由预训练 loss 很好预测**；RL 奖励曲线斜率随预训练 token 数近似线性提升。
- RL 并非简单"锐化"SFT 策略：简单残局上放大 SFT 已偏好的正确着法；**难残局上会 surface 出 SFT 下几乎不存在的正确着法**。
- 在 1B 模型 + 数学域文本上复现同一规律（预训练越久 → post-RL 越高、RL 提升越快）。此文为机理 / 规律型论文，结论为定量规律而非单一 benchmark 排名。

**Beyond Penalizing Mistakes: Stabilizing Efficiency Training in Large Reasoning Models via Adaptive Correct-Only Rewards（ACOER）**
📄 https://arxiv.org/abs/2606.22716 | 💻 暂未开源 | 🤗 HF 点赞未查到 | 机构：高丽大学 + 崇实大学

**问题**
高效推理常把"长度惩罚"塞进 GRPO 奖励以压缩冗长 CoT，但频繁触发 **reward collapse**（初期变好后退化成"短到无法推理"、准确率骤降）。根因在 GRPO 组内归一化 Â_i =(r_i−mean)/std：当**错误答案也吃连续长度惩罚**时会产生发散 advantage。两条崩溃通路——(1) β-loop（结构性）：混合组里对错误样本长度梯度 ∂Â/∂ℓ≈−β/C<0 恒为负持续累积，全错同质组里 σ_r→0 使 |Â|→∞ 爆炸，**即便 β=0.01（比正确项信号弱 30 倍）也会在约 800 步触发崩溃**；(2) 随机压缩崩溃：即使 β=0（仅惩罚正确答案），正确子组仍可能过度压缩而随机崩溃。

**方法**
- **β=0，仅正确项加简洁奖励**：错误 completion 不给长度惩罚，斩断 β-loop 主通路。
- **自适应预算归一化 B_t=max(B_min, γ·EMA_t)（γ=0.85）**：用正确答案长度的 EMA 动态预算替代固定上限，抑制"越短奖励越大"的失控正反馈。
- **控制回路 α 自适应**：准确率稳定则 α×1.02，掉超 δ=0.02 则 α×0.95（涨慢跌快），把效率压力与准确率保持挂钩。
- 与 Short-RL / L1 / GRPO-LEAD / ReCut 的本质区别：后者或对错误 rollout 施加连续惩罚、或用固定归一化 → 结构性 / 随机崩溃；ACOER 给出崩溃的形式化理论（Prop.1）并对症下药。

**效果（Qwen3-1.7B，NuminaMath-TIR，GRPO G=16，1200 步）**
- MATH-500：88.4%（base 88.8%），2,134 tokens，**token↓62%**；MATH-Hard：78.1%（base 76.4%），token↓56%。
- **AIME 2025：36.7%（base 30.0%，反而提升），token↓33%**；OlympiadBench：55.3%（=base），token↓46%。
- **崩溃二分性**：连续 β>0 方法崩溃率 100%（8/8）；correct-only / binary 方法仅 17%（1/6）。作者自陈局限：仅 1.7B 单尺度、AIME n=30 方差大、准确率增益非统计显著，主卖点是 token 大幅下降。

### 🤖 AI Agent / 工具使用

**PolyWorkBench: Benchmarking Multilingual Long-Horizon LLM Agents**
📄 https://arxiv.org/abs/2607.06008 | 💻 随基准发布任务清单（正文未给确切 URL）| 🤗 HF 点赞未查到 | 机构：北京交通大学 + 腾讯 Weixin AI

**问题**
现有长程 agent 基准隐含**单语假设**（指令、推理、工具调用、输出同一语言）；真实企业工作流是"指令一种语言、材料另一种、产出又一种"的**跨语言轨迹耦合**，多语性 × agentic 执行的交互几乎无人系统评测。

**方法**
- **67 个纯手工任务**，5 个企业域（Commerce / Knowledge / Legal / Localization / Manufacturing），覆盖 10 种语言；**"三语构造"**（指令 / 源材料 / 期望输出可分属不同语言），88%（59/67）任务涉及 ≥3 种语言；平均 9.3 个输入文件、8.5 个工具步、30–60 分钟预算。
- **三轴混合评测**：Grade（结构化打分，可给部分分）+ Pytest（可执行验证）+ LLM-as-Judge（语义质量），主指标 Pass@1 = 67 任务平均 Grade。
- 统一 4 种 agent harness（ClaudeCode / OpenClaw / Hermes / Codex），把 harness 作为一等变量与模型解耦。

**效果**
- 榜首 **Claude Opus 4.8 + ClaudeCode = 0.921 Pass@1**；全表仅 3 个条目 >0.79。
- **harness 影响 8–21 分**：同一 Opus 4.8 从 0.921（ClaudeCode）降到 0.712（OpenClaw）。
- **Commerce 塌陷**：强模型在 Knowledge/Legal/MFG 保持 0.85–0.90，Commerce 掉到 0.50–0.65（单个算术 / schema 错误即整单作废）。**跨语言差距可 >30 个 Grade 点**（Qwen3.6-35B-A3B/Hermes：ZH 0.951 vs DE 0.352）。Grade–Judge 相关 r=0.18，在 Grade≥0.5 后塌到 r=−0.04。

**ToolFailBench: Diagnosing Tool-Use Failures in LLM Agents**
📄 https://arxiv.org/abs/2607.04686 | 💻 https://github.com/SoHarshh/ToolFailBench | 🤗 HF 点赞未查到 | 机构：Harsh Soni（单一作者）

**问题**
聚合分（最终任务准确率）掩盖了工具使用"在哪一步坏掉"——"从不调用所需工具"的模型和"调用了却无视返回结果"的模型，最终准确率看起来一样。BFCL 只看函数调用正确性、τ-bench / SWE-bench 只看终态，都把不同失败折叠成一个数。

**方法**
- **1,000 个单轮任务**，5 个专业域（finance / medicine / law / cybersecurity / real estate）。
- **参数化陷阱**：mock 工具返回值故意与模型记忆先验矛盾，逼模型必须用工具返回值；另设 control 任务（挂同样工具但应直接作答）测"过度调用"。
- **失败模式分类学**：Tool-Skip / Result-Ignore / Output-Fabrication / Unnecessary-Tool-Use，用 1 个规则分类器 + 2 个 LLM judge 多数表决打标。本质区别：不评"调没调 / 成没成"，而是评"拿到工具结果后有没有忠实使用"。

**效果**
- 19 个头部模型，**最佳 Grok-4.3 = 86.33% Clean Tool-Use Rate**（远未饱和），前列：Grok-4-1-Fast-Reasoning 84.11、Qwen2.5-32B-Instruct 82.68、Qwen3.6-27B 79.33、Claude-Sonnet-4.5 79.28。
- **同规模、相反行为**：Llama-3.1-70B 与 Qwen2.5-72B 在 control-task 准确率上相差 89 个百分点；Llama-3.1 系呈"Always-Call"过度调用模式 → 工具纪律不能只用规模解释，强依赖模型家族与训练。

### ⚡ 高效推理 / 量化 / 压缩

**KronQ: LLM Quantization via Kronecker-Factored Hessian**
📄 https://arxiv.org/abs/2607.07964 | 💻 未查到（COLM 2026 接收）| 🤗 HF 点赞未查到 | 机构：耶鲁大学
> 注：该 arXiv ID 已确认返回本标题，但正文 PDF 非机读，以下数字取自 arXiv 索引摘要，建议查原文复核。

**问题**
补偿型 PTQ（GPTQ 及后继）用的 Hessian 只基于**输入激活**（∝ XᵀX），忽略"哪些输出通道对下游 loss 更重要"；在 **2-bit、超大模型**上 GPTQ / GPTAQ 会发散或产出退化输出（困惑度 >2000）。

**方法**
- 把**梯度协方差**引入量化目标，用 **Kronecker 因子化的 Hessian 近似**判断哪些**输出通道**对重建更关键（相当于把 Fisher / 梯度信息补进只看输入的 Hessian）。
- 结合补偿型（GPTQ 家族）与旋转型（正交变换）两条范式。
- 提出 **bidirectional incoherence processing**：在输入和输出两侧都施加随机旋转，压低权重幅值方差。本质区别：从"仅输入 Hessian"升级为"含输出侧 / 梯度协方差信息"。

**效果**
- **LLaMA-3-70B，2-bit weight-only → 7.93 困惑度**，而 GPTQ / GPTAQ 在同设置下发散（ppl >2000）。

**CompressKV: Semantic-Retrieval-Guided KV-Cache Compression for Long-Context LLM Inference**
📄 https://arxiv.org/abs/2606.24467 | 💻 https://github.com/TUDa-HWAI/CompressKV | 🤗 HF 点赞未查到 | 机构：TU Darmstadt + Notre Dame

**问题**
长上下文推理受 KV cache 显存 / 解码成本制约；现有驱逐法在 GQA LLM 上**对所有 head 统一做启发式 token 打分**，忽略 head 功能差异，导致误逐关键 token、掉性能。

**方法**
- 识别 **Semantic Retrieval Heads（SRHs）**——能同时抓住 prompt 首尾 token 与中段语义关键证据的注意力头，**只用 SRHs（而非聚合全部 head）**选择需保留的 KV。
- 按**离线估计的逐层驱逐误差**在层间分配 cache 预算。

**效果**
- LongBench QA：**仅用 3% KV cache 保留 >97% 全 cache 性能**；Needle-in-a-Haystack：**仅 0.7% KV 存储达 90% 准确率**；跨内存预算一致优于既有驱逐法。（arXiv admin note 标注为 2508.02401 的更新版。）

### 👁️ 多模态（图像 / 视频 / 音频）

**TimeLens2: Generalist Video Temporal Grounding with Multimodal LLMs**
📄 https://arxiv.org/abs/2607.17423 | 💻 https://github.com/MCG-NJU/TimeLens2 | 🤗 HF ⭐19 | 机构：南京大学 MCG-NJU

**问题**
视频 MLLM 能说"发生了什么"却说不出"证据发生在何时"。通用时序定位本质是预测**变基数的区间集合**，但现有训练与该"集合值"任务错配：长视频标注依赖脆弱的一遍式标注；RL 奖励要么无法区分**不重叠**的预测、要么需脆弱的分段匹配。

**方法**
- 全程把时序证据当作**区间集合**监督与优化，而非单区间回归。
- **TimeLens2-93K**：93,232 条已验证定位实例 / 23,793 段视频，经"字幕派生候选 → 独立 / 双智能体定位 → 跨智能体共识 → 语义校验 → 边界精修"多级构建。
- **Temporal Wasserstein 奖励**：在合并区间支撑集上对均匀分布计算精确一维 W₁，提供**稠密、免匹配**反馈，天然处理基数不等与等价碎片化；再以 temporal IoU 补充精确重叠反馈。与依赖分段匹配 / IoU 阈值的 RL 奖励有本质区别。

**效果**
- 跨 7 个 benchmark，TimeLens2-2B 每个上均超同规模基线；4B/8B 达 SOTA，超越参数量高达 397B 的开源模型。
- 相对各自 Qwen3-VL 骨干，2B/4B/8B 分别提升 **14.2 / 13.0 / 18.1 mIoU**；**TimeLens2-4B 每个 benchmark 平均超 Qwen3.5-397B-A17B 达 7.5 mIoU**。

**Apple-π: Benchmarking Thinking with Video Towards Law-Grounded Physical Intelligence**
📄 https://arxiv.org/abs/2607.16401 | 💻 https://github.com/21yrm/Apple-PI | 🤗 HF ⭐19 | 机构：南洋理工大学 MMLab@NTU

**问题**
视频生成模型被视作"世界模型"，但现有 benchmark 只在**输出层**评估物理合理性，无法验证模型是否经由**忠于物理定律的推理过程**得到结果。

**方法**
- 首个把视频模型评测显式锚定到物理定律的 benchmark。**Orchard 数据集**：400 段视频、覆盖经典力学 10 个标准任务，分"单定律（去混淆诊断）"与"多定律（考察泛化）"。
- **三阶段协议 Perception → Formulation → Deduction**，基于"信息图标注首帧 + chain-of-frames 提示"，把生成视频当作模型可见的推理轨迹。
- **混合评测**：MLLM 主观打分 + 物理定律客观度量，实现"不仅知道失败、还能定位在哪一阶段失败"。

**效果**
- 评测 11 个模型，最好的视频模型仅得 **0.473**，远未达可靠"定律级世界模拟器"。分阶段分析暴露 Perception→Formulation→Deduction 瓶颈、多定律状态迁移弱、以及持续存在的 Sim-to-Real gap。

**Audio-Visual Flamingo: Open Audio-Visual Intelligence for Long and Complex Videos**
📄 https://arxiv.org/abs/2607.16107 | 💻 https://github.com/NVIDIA/audio-flamingo | 🤗 HF 发布较新 | 机构：NVIDIA

**问题**
既有 AV-LLM 多聚焦短片段，缺乏对**长时、复杂真实音视频**的联合理解与推理，且推理步骤缺乏时间戳级定位。

**方法**
- **Audio-Visual-Skills 数据**：约 7M caption + QA 训练实例，强调时序 / 组合 / 跨模态音视频推理。
- **三阶段课程**：从短程感知渐进到长时程多事件推理。
- **Temporal Audio-Visual Interleaved Chain-of-Thought**：将中间推理步骤显式对齐到长音视频流时间戳，提升时间对齐与可解释性。

**效果**
- 跨 15+ 个音视频 / 全模态 / 音频 / 视觉 benchmark 超同规模开源模型，长复杂真实音视频上可与更大的开源 / 闭源模型竞争。**逐项 benchmark 具体数字未能核实**（摘要未给出、正文表格未取到）。

### 🦾 具身智能 / 机器人

**GigaWorld-1: A Roadmap to Build World Models for Robot Policy Evaluation**
📄 https://arxiv.org/abs/2607.02642 | 💻 https://github.com/open-gigaai/giga-world-1 | 🤗 经 arXiv 检索 | 机构：GigaAI

**问题**
具身策略评估依赖昂贵、缓慢的真机 rollout；用世界模型作"评估器"很有吸引力，但业界并不清楚**什么样的世界模型才是好的策略评估器**——尤其"画面最逼真"≠"评估最准"。

**方法**
- **WMBench**：由真机遥操作数据 + 匹配的策略 rollout 构建，支持跨模型族 / 动作编码 / rollout 时长 / 评测指标的受控对比。
- 系统研究 **7 个世界模型 × 4 种动作表示 × 324,000+ 条"仿真 rollout 配对真机执行"**。
- 关键结论：好的评估器不是帧最逼真的，而是**长时程动作忠实**、机器人域适配后**保留预训练世界知识**、且具备**稳定迭代 rollout 架构路径**的模型。

**效果**
- GigaWorld-1 相较有竞争力的 SOTA 基线，将**评估器-对齐指标提升 14.9%**。

**RynnBrain 1.1: Towards More Capable and Generalizable Embodied Foundation Model**
📄 https://arxiv.org/abs/2607.17977 | 💻 https://github.com/alibaba-damo-academy/RynnBrain | 🤗 HF ⭐8 | 机构：阿里巴巴达摩院

**问题**
具身基础模型需在统一时空、物理接地的框架下同时支持感知 / 空间推理 / 定位 / 规划，并让输出（接触点、3D 定位）**直接对齐机器人操作**、且能跨本体迁移。

**方法**
- 模型族 **2B / 9B / 122B-A10B**，统一时空 + 物理接地训练。
- 相比 1.0 新增：全族**接触点（contact-point）预测**、2B/9B **原生 3D grounding**。
- **RynnBrain-VLA**：统一跨本体动作空间 + 本体特定掩码，已部署于 Unitree G1、Astribot-S1、Tianji-Wuji。

**效果**
- 122B-A10B 在 VSI-Bench、MMSI、RefSpatial-Bench 上超过所有受测的专有与开源模型；真机中 RynnBrain 初始化的策略优于 Qwen 系及代表性通用 VLA。**注：1.1 版各 benchmark 具体分数未能核实**（网络流传的 VSI-Bench 71.0 等属 1.0 版 2602.14979 的分数，不采纳）。

### 🔬 AI for Science

**Spectral Diffusion for Protein Dynamics（DynaMode）**
📄 https://arxiv.org/abs/2607.04134 | 💻 https://github.com/HPuntu/DynaMode | 🤗 经 arXiv 检索 | 机构：牛津大学 OPIG（Charlotte M. Deane 团队）

**问题**
用生成模型替代昂贵的分子动力学（MD）查询蛋白质动力学时，多数方法把系综当作**无序快照**而非时间连贯轨迹，或**随蛋白尺寸扩展性差**；动力学生成需采样长、时间自相关强、受温度影响的轨迹，与结构预测本质不同。

**方法**
- **谱域表示（物理先验）**：用 Fourier / 离散余弦变换 DCT 把轨迹表示为"谱体积"，作为多尺度时间动力学的归纳偏置。
- **谱域扩散**：对"结构 + 温度"条件化的谱体积去噪，**将慢构象模态与快原子抖动解耦**，低频分量直接编码每残基柔性。
- 训练于 mdCATH，处理 <576 残基单体、300K–450K 温区，可泛化到分布外温度。

**效果**
- mdCATH 留出测试集 **RMSF Pearson r=0.844**；分布外 ATLAS 数据集 **r=0.734**；GH200 上生成 250 帧轨迹约 1 秒。诚实局限：正文标明存在**空间位阻冲突（steric clashes）**。

**Cura 1T: Specialized Model for Agentic Healthcare**
📄 https://arxiv.org/abs/2607.15314 | 💻 https://github.com/actava-ai/Cura | 🤗 HF ⭐1 | 机构：actAVA AI

**问题**
医疗需同时覆盖高风险沟通、专家推理（文本 + 图像）、交互式诊断、EHR 工具调用；这些能力失败模式各异，**针对单一任务的窄更新会拖累其他任务**。

**方法**
- **人类把关的自演化循环（human-gated self-evolution loop）**：每轮由训练智能体规划目标能力、训练模型、评估 benchmark 轨迹、并从观测到的失败中精炼数据配比，以**数据为中心**的定向合成 + 精选样本改进，而非一次性通用医疗数据更新。

**效果**
- 在医疗评测套件上"位居 / 接近 frontier 基线前列"，同时在域外推理与 agentic benchmark 上保持竞争力。**具体数字未能核实**（摘要未给出量化分数）。

### 🛡️ AI 安全 / 对齐 / 可解释性

**Not All Refusals Are Equal: How Safety Alignment Fails Cybersecurity at Scale**
📄 https://arxiv.org/abs/2607.02714 | 💻 未公开（攻防安全性质，abliterated 模型未释出）| 🤗 经 arXiv 检索 | 机构：Cracken AI

**问题**
安全对齐在概念上**不区分领域与危害等级**，导致网络安全等场景中，合法授权操作也被"安全电路"误拒。近期研究表明拒绝方向占据**多维子空间**——原则上应能只移除代表某一危害域的"切片"，但标准 abliteration 能否**在规模上做到域选择性移除**尚未知。

**方法**
- 对每层用"有害 / 无害配对"提取均值差**拒绝方向 r̂**，再对权重做正交投影 **W′=W−α·r̂(r̂ᵀW)**（作用于 down_proj 与 o_proj）；α>1.0 用于 MoE（冗余专家会部分补偿投影）。
- **域特定提取数据集是关键**：配对刻意区分"进攻意图 vs 网络安全知识"（如 SQL 注入攻击 vs 预处理语句防护），而非"危险话题 vs 安全话题"——用通用有害数据会导致全局安全崩塌。
- 规模化：24 个开源 LLM（0.6B–1T，来自 10 家机构），8×H200、约 600 GPU-小时。

**效果**
- 在 **Kimi K2（1T）** 上首次实现域特定 abliteration：网络安全拒绝率 **100% → 7%**，同时显式内容拒绝保持 100%、其他域拒绝保持 44–88%。
- 30% abliteration 下（跨 24 模型）：**误信息受影响最大，均值 −22.3pp**；能力几乎无损（**MMLU 最大退化仅 0.028**）。核心洞见：**易感性是"模型特定"而非"尺寸相关"**，安全训练方法与架构是最可靠预测因子。

**Subspace-Aware Sparse Autoencoders for Effective Mechanistic Interpretability（SASA）**
📄 https://arxiv.org/abs/2606.06333 | 💻 未见代码链接 | 🤗 经 arXiv 检索 | 机构：宾夕法尼亚州立大学

**问题**
SAE 给每个潜在特征只分配**单个解码方向**（隐含"特征是一维"），与模型特征的**多维结构**不符，并可证明地诱发**特征分裂**：几何上，把内在维度 dᵢ≥2 的特征重构到误差 ε 需要的原子数随 dᵢ 指数增长；从端到端优化看，ℓ₁ 正则目标存在从真实 dᵢ 维基到更低风险的连续下降路径，**主动偏好**分裂，恶化样本复杂度。

**方法**
- **子空间解码器**：用"学习到的解码子空间"替代单向量解码器。
- **Top-s 组门控**实现块稀疏（把稀疏性从单元级移到组级，消除撕裂多维特征的结构性压力）。
- **核范数正则**自适应每组有效秩；当块大小 r≥dᵢ，单个组即为 SASA 目标的全局最小值。

**效果（GPT-2 Small d=768、Mistral-7B-v0.1 d=4096，1×A100）**
- **仅用一半 token 预算**即在 KL / CE / 解释方差 / 稀疏度上匹配或超过标准 SAE（Mistral KL 93.2%→95.3%，稀疏度 ℓ₀ 285→80）。
- **特征吸收（first-letter 基准，越低越好）**：GPT-2 mean 37.2%→**6.6%**、full 49.6%→**4.7%**；Mistral mean 24.0%→18.3%、full 23.3%→11.9%。在减半训练成本的同时显著降低特征分裂与吸收、提升单义性。

> 关于 MoE 专门方法论文：本周（2606/2607 窗口内）未找到高质量、可核实的 MoE 方法论文，命中的 MoBiE、Expert Upcycling、MELINOE 等前四位均为 2604/2602，已排除，故不列。

---

## 【模块四】开源项目周榜

> 数据说明：抓取 GitHub 官方 `github.com/trending?since=weekly` 时返回的是约 2017 年的过期缓存快照，无法作为实时数据。为满足"实时、不编造"，本榜改用 **findarepo.com**（基于 GitHub REST API、每日测 7 天 star 增量，数据刷新于 2026-07-19 / 07-21），并与 Analytics Vidhya（7/19）及逐项搜索交叉核对。star 总数为按 API 读取的取整值，凡精度受限者已标注。

**[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐ ~9.3 万（本周 +8.2K）**
- 把整个代码库连同文档 / SQL schema / 配置 / PDF 转成可查询"知识图谱"，作为技能供 Claude Code、Codex、Cursor 等编码 Agent 调用，减少反复扫文件的 token 消耗。
- 上手难度：⭐⭐☆ 中等
- 适用场景：大型代码库 RAG 问答、AI 编码助手的"代码理解"底座、跨文档检索。

**[usestrix/strix](https://github.com/usestrix/strix) ⭐ ~4.2 万（本周 +7K~10K）**
- 开源 AI 渗透测试工具，用自主多 Agent 像真实红队一样发现、验证并给出漏洞 PoC，内置 HTTP 代理、浏览器利用、Python 沙箱、CI/CD 集成。（总星与周增量存在来源差异，已标区间，排名可能与 graphify 并列第一。）
- 上手难度：⭐⭐⭐ 较难
- 适用场景：把 AI 渗透测试接进 CI/CD、需可验证漏洞而非噪声告警的安全团队。

**[Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) ⭐ ~12.4 万（本周 +5.8K）**
- 100+ 个可直接运行的 LLM / RAG / AI Agent 应用示例，克隆即用、可改造上线。
- 上手难度：⭐☆☆ 简单
- 适用场景：AI 应用快速起步、教学、Demo 参考、团队脚手架。

**[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) ⭐ ~2.3 万（本周 +5.5K）**
- 免费 AI 网关，一个端点聚合 268+ 家供应商（50+ 免费）、500+ 模型（Claude / GPT / Gemini / Kimi / GLM 等），支持 token 压缩、自动降级回退、多模态。
- 上手难度：⭐⭐☆ 中等
- 适用场景：想用一个端点管理多家模型、省 key 管理与 token 成本的开发者 / 团队。

**[stablyai/orca](https://github.com/stablyai/orca) ⭐ ~2.4 万（本周 +5.5K）**
- 管理"一支并行 Agent 舰队"的 ADE（Agent 开发环境），可用自己的订阅跑任意编码 Agent，桌面 + 移动端可用。
- 上手难度：⭐⭐☆ 中等
- 适用场景：需同时编排多个编码 Agent 并行干活、随时监控的重度 AI 编程用户。

**[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐ ~21.7 万（本周 +3.4K）**
- 一个"越用越懂你"的个人 AI Agent，随使用持续学习偏好与上下文（出自 Nous Research）。
- 上手难度：⭐⭐☆ 中等
- 适用场景：个人助理、长期记忆型 Agent、偏好自适应的自动化工作流。

**[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐ ~15.4 万（本周 +3.1K）**
- 把任意网站转成干净、可喂给 LLM 的数据——搜索 / 抓取 / 提取一体的 API，RAG / Agent 联网取数常用底座。
- 上手难度：⭐☆☆ 简单（托管 API）/ ⭐⭐☆（自托管）
- 适用场景：RAG 数据管道、Agent 联网检索、批量网页结构化抓取。

**[JustVugg/colibri](https://github.com/JustVugg/colibri) ⭐ ~1.47 万（本周增量未精确获取，约数千 / 周）**
- 纯 C、零依赖推理引擎，通过"从磁盘流式加载专家"让 744B MoE 大模型 GLM-5.2 跑在约 25GB 内存的消费级电脑上（单 token 实际激活约 40B）。
- 上手难度：⭐⭐⭐ 较难
- 适用场景：本地 / 私有化跑前沿级大模型、重隐私与成本控制的极客与研究者。

---

## 【模块五】行业动态简报

📅 07/14 |〔产品更新·国外〕**苹果向全体用户开放全新 Siri AI**：随 iOS 27 公测版推出，重构后的 Siri 首次面向公众。（[TechCrunch](https://techcrunch.com/2026/07/14/apple-opens-its-new-siri-ai-to-everyone-with-the-ios-27-public-beta/)）

📅 07/15 |〔重要合作·国内×国外〕**Apple Intelligence 获批入华，接入阿里通义千问 Qwen**：中国网信办批准，Qwen 将集成进 iOS/iPadOS/macOS/visionOS，阿里向 CNBC 确认，其美股当日涨超 6%；此前苹果接触百度、DeepSeek、字节均未果。（[TechCrunch 引 Reuters](https://techcrunch.com/2026/07/15/apple-intelligence-approved-for-launch-in-china-with-alibabas-qwen-ai/)）

📅 07/15 |〔产品更新·国外〕**Thinking Machines Lab 发布首个自研模型 Inkling**（Mira Murati 创办），开源权重、主打"反对一刀切"的定制路线。（[TechCrunch](https://techcrunch.com/2026/07/15/thinking-machines-amps-up-its-bet-against-one-size-fits-all-ai-with-its-first-open-model-inkling/)）

📅 07/15 |〔行业战略·国外〕**Anthropic 携手 Blackstone 押注"AI 落地实施"**：与 OpenAI 各自设立独立业务线，派 AI 工程师进驻客户办公室，押注"帮企业用好模型"是下一个万亿美元赛道。（[TechCrunch](https://techcrunch.com/2026/07/15/anthropic-blackstone-bet-the-next-trillion-dollar-ai-business-is-implementation-not-models/)）

📅 07/16 |〔政策法规·国内〕**世界人工智能合作组织（WAICO）在上海成立**：签署仪式于 7/16 举行，外长王毅代表中国签署，哈萨克斯坦、老挝、巴基斯坦、俄罗斯、印尼等 29 国为创始成员，联合国秘书长古特雷斯出席，总部设于上海。（[财新](https://companies.caixin.com/2026-07-17/102465317.html)）

📅 07/16 |〔融资·国外〕**Databricks 以 1880 亿美元估值启动战略融资**（Coatue 领投）；同期 Fireworks 15.05 亿美元 D 轮（估值 175 亿）、Wonder 6.5 亿美元 D 轮、Walden Robotics 携 3 亿美元出隐身。（[Databricks 新闻室](https://www.databricks.com/company/newsroom/press-releases/databricks-raising-strategic-round-funding-188-billion-valuation)）

📅 07/16 |〔产品 / API·国内〕**月之暗面发布 Kimi K3**：约 2.8 万亿参数、号称全球最大开源模型；同时 API 大幅涨价（输入约涨 3 倍、输出约涨 3.5 倍）。（[新浪科技](https://k.sina.com.cn/article_7880068204_1d5b04c6c06801dasy.html)）

📅 07/17–20 |〔行业大会·国内〕**WAIC 2026 开幕**：主题"智能伙伴 共创未来"，"三地四馆"，1100+ 企业、3000+ 展品、300+ 全球首发、140+ 论坛；增量主要来自具身智能赛道，机器人成绝对焦点。（[CGTN](https://news.cgtn.com/news/2026-07-17/AI-conference-opens-in-Shanghai-with-over-300-global-product-debuts-1OQQf08iaqs/p.html)、[钛媒体](https://www.tmtpost.com/8069915.html)）

📅 07/20 |〔产品 / API·国内〕**DeepSeek V4 满血版正式 GA**：V4-Pro 1.6T/激活 49B、V4-Flash 284B/13B，MIT 开源、1M 上下文，引入国内首个大模型峰谷分时定价。（[unwire](https://unwire.hk/2026/07/21/deepseek-v4-official-release-api-price-performance/software/)）

---

## 【模块六】中文社区热点

**话题：WAIC 具身智能"去表演化"——从 DEMO 到量产落地**
- 为什么热：具身智能抢走大模型 C 位，200+ 机器人厂商同台，评判标准口头上从"能不能后空翻"变成"能不能连续干 8 小时"。
- 观点分歧：正方认为产业化拐点已至（蚂蚁灵波"机器人药房"已在国大药房上海门店运营、零次方一年做到 1 亿收入 / 在手订单超 3 亿、行业称 2026 为"量产元年"）；反方认为本体千篇一律、**模型仍是最大瓶颈**（现场多为遥控、极少数能语音驱动做简单指令）、散热等工程难题无解，泡沫质疑仍在。
- 代表性内容：[钛媒体《2026 WAIC，具身首次走上神坛》](https://www.tmtpost.com/8069915.html)、[新浪《WAIC 2026 观察：具身智能的"去表演化"之年》](https://finance.sina.com.cn/jjxw/2026-07-19/doc-iniiiwie8200614.shtml)

**话题：Kimi K3 开源登顶 + API 大涨价争议**
- 为什么热：2.8 万亿参数开源模型硬指标反超顶级闭源，却在发布同时把 API 价格翻了 3 倍多。
- 观点分歧：正方认为国产开源终于在代码等硬榜反超 Claude/GPT，"不可替代就敢涨价"证明商业价值；反方认为开源却大涨价、数万亿参数私有部署门槛极高，普通开发者"用不起也跑不动"，涨价或反噬竞争力。
- 代表性内容：[新浪《Kimi K3 发布：输入价涨 3 倍，为何前端性能反超闭源旗舰？》](https://k.sina.com.cn/article_7880068204_1d5b04c6c06801dasy.html)、[知乎专栏](https://zhuanlan.zhihu.com/p/2061814639923614333)

**话题：苹果 AI 入华绑定通义千问**
- 为什么热：网信办放行 Apple Intelligence，阿里 Qwen 击败百度 / DeepSeek / 字节拿下苹果这块全球顶级终端入口，阿里股价大涨。
- 观点分歧：正方认为国产大模型能力与合规双重获认可、"上桌"全球最高端硬件；讨论侧聚焦苹果为何弃 DeepSeek 选阿里、数据与体验本地化如何落地、对其他厂商的挤出效应。
- 代表性内容：[TechCrunch 引 Reuters](https://techcrunch.com/2026/07/15/apple-intelligence-approved-for-launch-in-china-with-alibabas-qwen-ai/)

**话题：大模型"不再拼参数"，端侧 AI 与"走向物理世界"成新主线**
- 为什么热：WAIC 上大模型话题从"堆参数"转向端侧部署、世界模型、具身落地，端侧 AI 被称为"第二次结构性跃迁"。
- 观点分歧：正方认为端云分工是普惠 AI 必经之路（AI 手机 / 眼镜 / 玩具成新热点）；反方认为端侧算力与能力受限，"世界模型 / 物理智能"更多仍是概念，规模落地尚早。
- 代表性内容：[新浪《WAIC 大模型观察：不再拼参数大小，AI 加速走向物理世界》](https://finance.sina.com.cn/stock/t/2026-07-20/doc-iniikpet3203042.shtml)

---

## 【模块七】本周实用工具推荐

**Agnes Code / Agnes-2.5-Flash**（https://agnes-ai.com/ ｜ 平台 https://platform.agnes-ai.com/ ）
- 解决什么问题：Coding 能力号称进入"全球第一梯队"且不限期免费；配套 Agnes Code 桌面端（类 Claude Code/Codex，但可处理代码 / 图片 / 视频 / PPT 多模态），带定时任务、跨 AI 导入记忆。
- 如何快速上手：① 官网下载 Agnes Code 桌面端；② 选用免费 2.5-Flash 开始改 Bug / 建应用。
- 适合：开发者为主，也适合多模态创作者。
- 费用：免费（2.5-Flash 不限期免费；旗舰 2.5-Pro 后续付费）。

**Lovable**（https://lovable.dev）
- 解决什么问题：用一句话描述需求，自动生成并托管全栈 Web 应用，可视化编辑，适合快速做 MVP。
- 如何快速上手：① 打开 lovable.dev 用一句话描述你要的 App；② 对话里迭代并一键发布到 `*.lovable.app`。
- 适合：两者皆可（尤其非技术用户 / 独立开发者）。
- 费用：免费额度 + 付费——Free $0（每日 5 credits、约每月 30、可托管 5 项目）；Pro $25/月、Business $50/月；学生 / 教师 5 折。

**ElevenLabs**（https://elevenlabs.io）
- 解决什么问题：高质量文本转语音、语音克隆、语音识别、音效及可对话语音 Agent，低延迟、多语言、有 API。
- 如何快速上手：① 在 Studio 粘贴文本、选 / 克隆音色一键生成；② 或调用其 TTS / Agents API。
- 适合：两者皆可（创作者 / 开发者）。
- 费用：免费额度 + 付费——Free 每月约 10,000 credits（约 10–15 分钟、仅限非商用且需署名）；付费自约 $5–6/月（Starter，解锁商用）起。

**Photoroom**（https://www.photoroom.com）
- 解决什么问题：一键去背景、批量白底图、模板化产品图、消除杂物、放大修图，面向电商 / 营销素材。
- 如何快速上手：① 网页 / App 上传照片一键去背景 / 套模板；② 需自动化则接 API。
- 适合：两者皆可（电商卖家 / 运营为主，开发者可用 API）。
- 费用：免费额度 + 付费——Free 每月 250 次导出（带水印、非商用）；Pro 自 $7.99/月起；API 去背景约 $0.02/张。

**Hugging Face 免费 Spaces**（https://huggingface.co/spaces）
- 解决什么问题：无需安装 / 付费即可在线试用海量 AI 模型 Demo（抠图、TTS、图像生成、语音增强等），2026 年已托管约 70 万个 Space，并有 ZeroGPU 免费 GPU 推理。
- 如何快速上手：① 打开对应 Space 页面；② 上传图片 / 输入文本直接运行（如 [remove-background-web](https://huggingface.co/spaces/Xenova/remove-background-web) 在浏览器本地跑、文件不上传服务器）。
- 适合：两者皆可（尤其非技术用户"用完即走"）。
- 费用：免费（多数 Space 免费；ZeroGPU 提供免费额度）。

---

## 【数据源与生成说明】

- **报告生成时间**：2026-07-22（周三）
- **覆盖周期**：2026-07-14 ~ 2026-07-22
- **论文 arXiv ID 覆盖范围**：2606.06333 – 2607.17977（全部经逐篇核验前四位为 2607 或 2606；旧论文一律排除）
- **主要数据来源**：
  - 论文：Hugging Face Daily Papers、arXiv（cs.CL / cs.AI / cs.LG / cs.CV / cs.RO）、各论文 arXiv 页 / GitHub 仓库
  - 模型：Thinking Machines / Moonshot / DeepSeek / Alibaba Qwen / Tencent 官方渠道，HuggingFace Model Hub，TechCrunch、TechNode、SCMP、MarkTechPost、新华网、财联社、IT之家、量子位
  - 开源榜：findarepo.com（GitHub REST API，7/19 / 7/21 刷新）+ Analytics Vidhya + 逐项核对（GitHub 官方 trending 页返回过期缓存，未采用）
  - 行业 / 社区：TechCrunch、Databricks 新闻室、财新、CGTN、钛媒体、新浪财经 / 科技、知乎
- **数据截止时间**：2026-07-22
- **可信度与纪律说明**：
  - 本周**国际六大闭源厂商无新模型发布**，GPT-5.6 / Grok 4.5 / Muse Spark 1.1 属上周（7/8–9），未计入本周。
  - 论文中出现的竞品模型名（Claude Opus 4.8、GPT-5.5、Qwen3.6、Grok-4.3 等）为论文原文表述，未做改动。
  - 厂商自述基准 / 排名（Kimi K3、Qwen3.8-Max、DeepSeek V4 的对比分数）均标注"厂商 / 媒体口径"，未经独立复现。
  - 明确标注"未能核实"的项：KronQ 具体数字（arXiv 索引摘要，非直读原文）、Audio-Visual Flamingo / Cura 1T / RynnBrain 1.1 的逐项 benchmark 分数、colibri 精确周增量、Qwen3.8-Max 激活参数与定价、豆包 Seedance 2.5 / MiniMax H3 本周落地情况。
  - Kimi K3 权重开放为"承诺 7/27 前"（截至生成日尚未到期）；Qwen3.8-Max 为预览版，正式版与开源待发。

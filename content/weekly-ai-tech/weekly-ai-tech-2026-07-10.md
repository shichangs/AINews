# AI 技术周报 · 2026-07-10

> 面向算法研究员的每周 AI 技术进展报告 ｜ 覆盖周期：2026-07-03 ~ 2026-07-10
> 论文收录约束：仅 arXiv ID 前缀为 **2607**（本月）或 **2606**（上月）的预印本
> 数据来源可信度：模型发布与论文均带一手来源；GitHub star 实时增量本周接口异常，为近似值，已在模块四逐项标注

---

## 【模块一】本周导读

🔴 **最重要的变化**：闭源前沿进入"编码 Agent 军备竞赛"的正面对撞。一周之内 **OpenAI GPT-5.6 家族（Sol/Terra/Luna，7/9 GA）** 与 **xAI Grok 4.5（7/8）** 同台竞技，两者不再比"最高智能"，而是把战线压到 **token 效率与单位成本**：OpenAI 引用 Artificial Analysis Coding Agent Index 称 Sol 得分 80、输出 token 不到 Fable 5 的一半、成本约低三分之一；xAI 则宣称 Grok 4.5 在 SWE-Bench Pro 单任务平均只用 15,954 输出 token（约为 Opus 4.8 的 1/4.2）。"同等能力下谁更省"正取代"谁更强"成为本周主旋律。

🟡 **值得关注但尚未明朗**：中国开源模型的"渗透"从叙事变成了硬数据。CNBC 7/7 援引 OpenRouter 口径称中国模型已占美国企业 API token 用量的 **30–46%**，GLM-5.2 在 Vercel 上首周日 token 量约 27 倍、客户数约 80 倍增长。与此同时，**阿里 7/10 起全面禁用 Claude 全系** 与 Anthropic 对"工业级蒸馏"的指控叠加，把技术性价比问题推向地缘与合规的灰区——渗透率还能否维持、会不会触发对等封锁，本周尚无定论。

🟢 **对开发者/研究者最具实用价值**：本周 arXiv 的主线仍是 **on-policy 后训练的"精细化"** 与 **推理侧的结构化加速**。TREK（把蒸馏当作 on-policy 支撑集扩张而非模仿）、TurnOPD（给 on-policy 蒸馏加 turn 级预算控制）把"在模型自身分布上做稠密、且分布得当的监督"继续做深；DSpark（半自回归 + 置信度调度投机解码，DeepSeek-V4 真实流量 60–85% 提速）与 PadCaptioner（跨事件弱依赖并行解码）则是推理加速两条可直接落地的工程路线。

**下周预告**
- **Google Gemini 3.5 Pro**：多来源称已推迟至 **7/17** 前后完整发布（宣称 2M 上下文 + Deep Think），AI Studio 白名单预览约 7/8–12，企业级 Vertex 约 7/15——具体档期仍待官方确认。
- **DeepSeek V4 正式版**：官方口径"7 月中旬"，预览态"毕业"，首次引入高峰时段翻倍定价，是下周最受关注的国产发布。
- **2026 世界人工智能大会（WAIC）**：7/17–20 上海举行，主题"智能伙伴，共创未来"，本周已进入媒体预热，预计伴随一波国产模型与论文放榜。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**GPT-5.6 家族（Sol / Terra / Luna）— OpenAI｜7/9 GA**
- **核心能力亮点**：三档产品线——Sol（旗舰，前沿推理与长程 agent）、Terra（日常均衡）、Luna（最快最省）。新增 "max reasoning effort" 深度推理档与 "ultra mode"（子代理并行加速复杂任务），官方称为"迄今最强网络安全模型"，Sol 编码任务 token 效率提升 54%；同时发布企业办公工具 ChatGPT Work。
- **与上一代对比**：据 OpenAI 引用的 Artificial Analysis Coding Agent Index，Sol 得分 80，较 Anthropic Fable 5 高 2.8 分，且输出 token 不到一半、耗时不到一半、成本约低三分之一；Terra 略高于 Fable 5，Luna 超过 Opus 4.8。
- **定价（每百万 token）**：Sol \$5 / \$30，Terra \$2.50 / \$15，Luna \$1 / \$6（输入/输出）。已上线 ChatGPT、Codex、API。
- **适合用户**：企业开发/编码（Sol）、日常高频（Terra）、成本敏感的大规模调用（Luna）。
- 来源：[TechCrunch 7/9](https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6/)

**GPT-Live-1 / GPT-Live-1 mini（语音）— OpenAI｜7/8**
- 全双工语音模型，可边说边听、自然打断，支持实时翻译，主打更自然的实时对话与轮流发言。来源：[TechCrunch 7/8](https://techcrunch.com/2026/07/08/openai-releases-new-voice-models-for-more-natural-live-conversations/)

**Grok 4.5 — xAI｜7/8**
- **核心能力亮点**：首款专为编码与 agent 工作打造的模型，与 Cursor 联合训练（真实开发者会话数据）。服务速度约 80 TPS，宣称 token 效率约为同级领先模型 2 倍（SWE-Bench Pro 单任务平均 15,954 输出 token，约 Opus 4.8 的 1/4.2）；已成为 Grok Build 默认模型，擅长 Excel/PPT/Word 办公。
- **与上一代对比**：xAI 定位为"Opus 级能力，但更快、更省 token、更低成本"；据其引用的 Artificial Analysis Intelligence Index 位列第四，高于所有开源权重模型与全部 Gemini 模型（厂商口径）。
- **定价/访问**：\$2 / \$6 每百万 token。已上线 Grok Build、Cursor（全套餐）、xAI API console；**欧盟暂不可用**，预计 7 月中旬开放。
- **适合用户**：开发者、编码与长程 agent、追求性价比的团队。
- 来源：[x.ai 官方 7/8](https://x.ai/news/grok-4-5) · [Axios 7/8](https://www.axios.com/2026/07/08/spacexai-grok-new-model)（注：官方站点署名为 "SpaceXAI"，本报如实转述来源用词）

**Muse Image / Muse Spark 1.1 — Meta｜7/7、7/9**
- **核心能力亮点**：Muse Image 是重建 AI 实验室后首个图像生成模型，嵌入 Meta AI、Instagram、WhatsApp，驱动 30+ 新 AI 特效，面向广告主营销素材；Muse Spark 1.1（语言模型）Meta 称在若干基准上超越 OpenAI 与 Anthropic、与 GPT-5.5 有竞争力（厂商口径，未给公开 benchmark）。
- **定价/访问**：消费级产品内嵌，未公布 API 定价。
- **适合用户**：社交/内容创作者、广告主。
- 来源：[about.fb.com](https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/) · [Bloomberg 7/7](https://www.bloomberg.com/news/articles/2026-07-07/meta-debuts-new-ai-image-generation-model-inside-chatbot-instagram) · [Fortune 7/9](https://fortune.com/2026/07/09/meta-muse-spark-1-1-release-alexandr-wang-superintelligence-labs-mark-zuckerberg/)
- 注：Meta 本周**未**发布新的 Llama 开源权重模型。

**Google / Anthropic — 本周无新模型**
- **Gemini 3.5 Pro**：本周仅小范围白名单预览，GA 推迟至 **7/17** 前后（宣称 2M 上下文 + Deep Think），时间线来自聚合媒体、待官方确认。来源：[CryptoBriefing](https://cryptobriefing.com/google-delays-gemini-35-pro-launch-to-july-2026/)
- **Anthropic**：最新模型 Claude Sonnet 5 发布于 6/30（\$2/\$10、1M 上下文、128k 输出），在本周窗口之前；本周为产品侧更新（Cowork 扩展、Microsoft 365 连接器写入、月度回顾等），无新模型。来源：[Anthropic Newsroom](https://www.anthropic.com/news)

### ② 国内大模型（含开源与闭源）

**混元 Hunyuan Hy3（HunYuan 3.0）— 腾讯｜开源（Apache 2.0）｜本周重点，7/6**
- **核心能力亮点**：295B 参数 MoE、21B 激活、256K 上下文；强化自主 agent 能力，官方称多个内部应用任务完成率达 90%。已集成进消费级助手"元宝"，开发者调用大幅降价并带免费 AI-agent 功能。
- **与国际同类对比**：定位对标国际前沿的开源权重 agent 模型，参数规模小于旗舰但接近旗舰性能（据 Winbuzzer）；**具体基准对比待核实**。
- **获取方式**：权重开源（HuggingFace 等），并移除了此前对欧盟、英国、韩国的使用限制；产品端集成于元宝，API 降价。
- 来源：[TechNode 7/7](https://technode.com/2026/07/07/tencent-launches-hunyuan-hy3-integrates-model-across-multiple-products/) · [Caixin Global 7/6](https://www.caixinglobal.com/2026-07-06/tencent-launches-upgraded-hunyuan-3-ai-model-with-free-agent-feature-102461489.html) · [Winbuzzer 7/6](https://winbuzzer.com/2026/07/06/tencent-releases-hy3-a-smaller-model-approaching-larger-flagship-performance-xcxwbn/)

**GLM-5.2 — 智谱 AI（Z.ai）｜开源（MIT）｜配套工具更新**
- 模型本体发布于 6/16（1M 上下文、专注 Coding/长程任务、Day0 适配华为昇腾等国产算力）。本周（7 月初）推出配套编码 harness **ZCode** 并促销（老用户配额 +50%、新用户 500 万免费 token）。GLM-5.2 在 Intelligence Index v4.1 得 51 分，高于 MiniMax-M3、DeepSeek V4 Pro、Kimi K2.6；CodeArena 长程任务表现介于 Claude Opus 4.7 与 4.8 之间，为排名最高的开源模型。
- 来源：[SCMP 7 月](https://www.scmp.com/tech/tech-trends/article/3359170/zhipu-ai-releases-harness-glm-52-model-chinese-firm-takes-aim-anthropic) · [智谱官方](https://www.zhipuai.cn/zh/research/161)

**DeepSeek V4 正式版 — 临近但本周未发布**
- 计划"7 月中旬"上线，截至 7/10 尚未正式发布（deepseek-v4-pro / v4-flash 自 4 月起为预览态）。将带来全系 1M 上下文；V4 Pro（1.6T 总参 / 49B 激活，重推理）、V4 Flash（284B 总参 / 13B 激活，快速低成本）；首次引入高峰时段翻倍定价（工作日 9–12、14–18 点）。DeepSeek 历来开源权重（V4 许可待正式发布确认）。来源：[TechNode 6/30](https://technode.com/2026/06/30/deepseek-to-launch-v4-in-mid-july-with-new-peak-time-api-pricing/)

**其余厂商 — 本周无新模型**
- **通义千问 Qwen**：最新 Qwen 3.7 系列（3.7-Max 5/20、3.7-Plus 6/1，API-only），本周无新发布。
- **Kimi/月之暗面**：Kimi K2.7 Code（开源，最强编码款）为 6/12，本周无新发布。
- **文心/字节豆包/MiniMax**：文心 Ernie 5.x（5/8，API-only）、字节 Seed 2.1 Pro/Turbo（6/24）、MiniMax M3 均无本周新发布。
- 来源：[llm-stats 更新日志](https://llm-stats.com/llm-updates)

### ③ 其他重要开源模型（非中国厂商）

**Leanstral 1.5 — Mistral AI｜Apache-2.0｜本周重点，7/2**
- **参数规模**：119B 总参 / **6B 激活**（MoE），专攻 Lean 4 形式化证明与代码验证。
- **能力**：完全 saturate miniF2F（100%），PutnamBench 解出 587/672，FATE-H 87% / FATE-X 34%（SOTA）；在 57 个真实代码库中自动发现 5 个此前未报告的 bug，成本约 \$4/题。
- **最低显存**：官方未给出；6B 激活但 119B 总参，全量加载需较大显存，量化后可显著降低（**具体需求待核实**）。
- **获取方式**：[HuggingFace mistralai/Leanstral-1.5-119B-A6B](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B)，或免费 API 端点 `leanstral-1-5`。
- **适合场景**：形式化数学证明、Lean 4 工程、代码正确性验证。
- 来源：[mistral.ai 7/2](https://mistral.ai/news/leanstral-1-5/)

**Robostral Navigate — Mistral AI｜机器人，7/8**
- 让机器人用单摄像头 + 语言提示导航复杂环境，硬件无关、纯仿真训练，属物理 AI 方向（非文本 LLM）。另：Mistral CEO 确认本月有一款新开源权重模型进入早期试用（研究/政府/产业伙伴），参数与许可未披露（待官方确认）。来源：[mistral.ai/news](https://mistral.ai/news/robostral-navigate) · [Bloomberg 7/8](https://www.bloomberg.com/news/articles/2026-07-08/mistral-ai-releases-robotics-model-to-support-physical-ai-push)

**Gemma / Llama / Phi — 本周无新版本**
- Gemma 4 系列主发布于 4 月（26B-A4B 被推荐为本地部署性价比之选，[HF google/gemma-4-26B-A4B](https://huggingface.co/google/gemma-4-26B-A4B)），本周无新版本；Meta 本周精力在 Muse 系列，无新 Llama；Phi 系列无新版本（Phi-4-mini 3.8B 仍是小模型标杆）。

---

## 【模块三】热门论文精选

> 目标读者：算法研究员。所有 arXiv ID 前四位均为 **2607**（本月），已逐篇核对。数字取自 HF 论文页 / arXiv 摘要；少数论文摘要未给单一汇总数值者已明确标注，未做估算。本周 🛡️ 安全/对齐方向未检索到确凿的 2607/2606 高质量新作，按要求不强凑。

### 🧠 大语言模型（LLM）/ 推理能力

**TREK: Distill to Explore, Reinforce to Refine**
📄 https://arxiv.org/abs/2607.05339 | 💻 暂未开源 | 🤗 HF ⭐ 6 | 机构：LinkedIn

**问题**
GRPO 只在当前策略已能采样到有用推理轨迹时有效；对于正确解模态落在学生模型 on-policy support 之外的难题，GRPO 会"卡住"——采样不到成功轨迹就没有正向优势信号，无法探索到该模态。

**方法**
- 提出 TREK（Teacher-Routed Exploration via Forward KL），把蒸馏用于"探索支撑集扩张"而非模仿——这是与传统 SFT 蒸馏的本质区别：不是让学生逐 token 复刻 teacher，而是把 teacher 已验证的正确解模态"注入"学生分布，再交回 RL 精修。
- 分阶段流程：定位学生 pass 率极低的难 prompt → 用 teacher（可黑盒/白盒/同模型+推理期上下文）生成可验证候选解 → 按学生似然保留 top-r → 短暂 forward-KL 阶段把这些已验证模态拉进学生支撑集 → 回到标准 on-policy GRPO 精修。
- 仅消费"已验证输出轨迹"，因此 teacher 内部不可见（黑盒 API）时同样适用。

**效果**
- Qwen3-8B，avg@16：AIME 2025 36.9→40.3、AIME 2024 47.9→51.1（用 DeepSeek-V4 作 proposal）；无外部 teacher 的 self-context 变体达 38.5 / 49.6。
- Agent 任务：ALFWorld 成功率 75.8→82.8，ScienceWorld 12.5→26.7。

**Hierarchical Sparse Attention Done Right: Toward Infinite Context Modeling**
📄 https://arxiv.org/abs/2607.02980 | 💻 https://github.com/Tencent-Hunyuan/HiLS-Attention | 🤗 HF ⭐ 27 | 机构：Tencent Hunyuan

**问题**
稠密注意力二次复杂度且长度外推差；已有 chunk-wise 稀疏注意力因 chunk 选择依赖启发式或独立训练的检索器（选择不准），始终逊于 full attention。

**方法**
- HiLS（Hierarchical Landmark Sparse）Attention 把 chunk 选择在 LM loss 下端到端学习，而非依赖启发式或独立训练检索器。
- 分层分解注意力：每个 query 与每个被检索 chunk 独立做注意力提取 chunk-specific 信息，再按检索分数融合——从而把检索分数直接纳入前向注意力计算、用 LM loss 直接优化，实现原生稀疏训练（本质区别于"检索器与注意力两段式解耦"）。
- 现有 full-attention 模型可通过轻量续训转为 HiLS。

**效果**
- in-domain 上达到甚至超过 full attention。
- 外推超过训练上下文长度 **64 倍**且保持 **90% 检索准确率**，远超 full attention 基线。

### 👁️ 多模态（图像 / 视频 / 视觉理解）

**Vision as Unified Multimodal Generation（SenseNova-Vision）**
📄 https://arxiv.org/abs/2607.06560 | 💻 https://github.com/OpenSenseNova/SenseNova-Vision | 🤗 HF ⭐ 23 | 机构：商汤 SenseNova

**问题**
CV 任务长期依赖任务专用架构与预测头（检测头、分割头、深度头各一套），难以统一进通用基础模型。

**方法**
- 把异构视觉任务统一表述为"多模态生成"：用自然语言指令 + 可选视觉 prompt 指定任务/区域/解码约定，输出为文本（符号型）、图像（稠密空间预测）或图文混合（组合任务）。
- 无需任务专用预测头或架构改动；从现成预训练统一多模态模型出发，主要在自建 SenseNova-Vision Corpus（已开源 50M 规模）上训练。
- 覆盖检测、OCR、关键点、分割、深度、法向、point map、相机位姿等。

**效果**
- 单一统一模型在结构化视觉理解、稠密几何预测、分割、多视图几何等任务上"可匹配领先的任务专用系统"（论文以匹配 SOTA 专用系统为主张，摘要未给单一汇总数字）；已开源 7B 模型与基准数据集。

**Light-Omni: Reflex over Reasoning in Agentic Video Understanding**
📄 https://arxiv.org/abs/2607.05511 | 💻 https://github.com/Clare-Nie/Light-Omni | 🤗 HF ⭐ 18 | 机构：南京大学

**问题**
长视频 agent 依赖"侦探式"迭代推理（反复搜索 + 证据聚合）做动作控制，延迟和成本极高；作者认为这主要是在补偿全局上下文缺失与检索语义错配。

**方法**
- 双上下文状态，单次前向即时构建上下文以消除迭代推理。Global state：从 episodic memory 持续整合的有限大小多模态脚本，分层合并（保留近期细节 + 总结历史）。
- Parametric latent state：以全局上下文为条件生成，直接驱动自主动作并产出检索 embedding，低延迟且语义对齐——用"反射式"单次前向取代"推理式"多轮检索。

**效果**
- 相较 M3-Agent：平均准确率 +2.4%、**12.1× 加速、2.6× 显存效率**。
- VideoMME-long / LVBench / HippoVlog 平均准确率 64.8%，延迟近乎恒定（约 2.3s，与视频长度无关）。

**Parallelized Autoregressive Decoding for Omni-Modal Dense Video Captioning（PadCaptioner）**
📄 https://arxiv.org/abs/2607.02963 | 💻 https://github.com/showlab/PadCaptioner | 🤗 HF ⭐ 16 | 机构：新加坡国立大学 Show Lab

**问题**
密集视频字幕在 token-by-token 自回归下，随视频长度/事件密度增加，推理效率严重受限。

**方法**
- 利用"时间上不同事件之间弱局部依赖"重构因果依赖图，实现无损并行生成：跨事件弱依赖 token 并行解码，事件内紧耦合 token 保持顺序解码。
- Latent global planning：学习事件级结构、生成编码全局事件间因果的紧凑 token，指导依赖重构。
- Event-factorized parallel decoding：平衡局部聚焦与全局事件间感知。

**效果**
- 3B 的 PadCaptioner 在效率与 grounded 字幕质量上均优于 7B 对照（摘要陈述 "outperforming 7B counterparts"，具体分项数字见论文正文，摘要未逐项列出）。

### 🤖 AI Agent / 工具使用

**SkillOpt-Lite: Better and Faster Agent Self-evolution via One Line of Vibe**
📄 https://arxiv.org/abs/2607.03451 | 💻 https://github.com/EvolvingLMMs-Lab/SkillOpt-Lite | 🤗 HF ⭐ 14 | 机构：LMMs-Lab

**问题**
现有 agent 技能优化（skill optimization）依赖复杂 pipeline，缺乏"最小可行 pipeline 且每个组件都有理论/实证依据"的答案。

**方法**
- 用零阶优化（ZO）形式化技能优化，把经典 ZO（中心差分、trust region）映射到近期文献；关键区别：技能轨迹不是盲目数值扰动，而是可解释的调试反馈。
- 基于 PAC 学习给出收敛与泛化的三原则：文件系统式轨迹探索、共识属性挖掘、独立验证门控；剔除冗余得到 SkillOpt-Lite。
- 泛化到 harness 优化（HarnessOpt），把所有 agent 组件视为可编辑代码。

**效果**
- LiveMath：GPT-5.5 +8.8 分，GPT-5.4-nano +25.4 分（使 nano 超过被完整 SkillOpt 优化的标准 GPT-5.4）。
- SpreadsheetBench：HarnessOpt 使 GPT-5.4-nano 达 0.7758，超过跑标准 pipeline 的更大 GPT-5.5（0.7620）。

**TurnOPD: Making On-Policy Distillation Turn-Aware for Long-Horizon Agent Training**
📄 https://arxiv.org/abs/2607.05804 | 💻 暂未开源 | 🤗 HF ⭐ 8 | 机构：Tencent Hunyuan

**问题**
on-policy 蒸馏（OPD）在长程 agent 任务上两大低效：(1) 全程 rollout 把 wall-clock 浪费在只提供弱噪声 KL 监督的尾部 turn；(2) 轨迹级 KL 目标把大部分 loss 集中在浅层 token，深层决策 turn 一旦初始行为对齐后就欠训练。

**方法**
- Turn-level budgeting，两个预算控制器。Adaptive rollout-depth budgeting：用 probe-based turn 统计决定 rollout 长度，不为弱监督尾部浪费算力。
- Progressive turn-normalized loss budgeting：把 KL 权重从 token 级逐步转向 turn-balanced 监督，让深层决策 turn 得到充分训练。
- 与 GRPO 等纯 RL 不同，这是对 OPD 的 turn 感知改造（监督信号仍来自 teacher 分布的 KL）。

**效果**
- ALFWorld、WebShop、Multi-Hop Search 上，同等 wall-clock 训练预算下验证准确率优于 vanilla OPD，推进 accuracy–time 前沿（摘要以相对提升与前沿推进为主张，未给单一绝对数字）。

### 🦾 具身智能 / 世界模型

**From Foundation to Application: Improving VLA Models in Practice（LingBot-VLA 2.0）**
📄 https://arxiv.org/abs/2607.06403 | 💻 https://github.com/robbyant/lingbot-vla-v2 | 🤗 HF ⭐ 8 | 机构：Robbyant

**问题**
VLA 基础模型在实验室条件与真实部署之间存在鸿沟：数据构型单一、动作空间受限、时序推理弱。

**方法**
- 泛化性：重构数据处理 pipeline，整理约 **60,000 小时**预训练数据（含 50,000 小时机器人轨迹、覆盖 20 种机器人构型，10,000 小时第一视角人类视频）。
- 扩展动作空间：除双臂外纳入头/腰/移动底盘/灵巧手自由度，支持全身控制。
- 预测式动力学建模：把未来预测作为代理任务，用视频表征模型提供语义先验、深度估计模型提供几何线索，改善时序推理。

**效果**
- 在 GM-100 benchmark（generalist 设定）上验证上述改动的有效性，并展示跨本体长程移动操作能力（摘要给出数据规模等硬数字；GM-100 具体分数见论文正文，摘要未列具体数值）。

**AlayaWorld: Long-Horizon and Playable Video World Generation**
📄 https://arxiv.org/abs/2607.06291 | 💻 https://alaya-lab.github.io/AlayaWorld/ | 🤗 HF ⭐ 49（**当日 #1**）| 机构：ALAYA Lab

**问题**
传统游戏世界靠人工流水线构建，成本高、难定制、部署后难修改；视频世界模型可自回归在线合成可玩世界，但长时程一致性是瓶颈。

**方法**
- 全栈开源框架：自回归地根据当前世界状态 + 用户交互合成未来观测，支持实时开放交互（导航、战斗、施法、召唤怪物等）。
- 统一数据准备→模型架构→训练→推理加速→部署的模块化可扩展架构，训练数据兼含游戏录像与真实视频。
- 同时开源可复现 pipeline、参考实现、评测工具。

**效果**
- 本周 HF 榜首。属框架/系统开源发布，摘要未给出量化 benchmark 数字（据外部报道其交互可玩时长突破 60 秒级，为报道数字、非论文摘要，标注"数字未在摘要中核实"）。

### 🔬 AI for Science

**SciReasoner: Deep Native Structural Reasoning**
📄 https://arxiv.org/abs/2607.07708 | 💻 暂未开源 | 🤗 HF ⭐ — | 机构：上海 AI Lab（Lei Bai / Wanli Ouyang / Bowen Zhou 等，提交 2026-07-08）

**问题**
结构-性质关系的机理解释需要同时"保留领域原生结构信息"和"展示具体证据如何在物理约束下支持预测"，即表示与推理的联合挑战。

**方法**
- 多模态科学基础模型，跨蛋白质、小分子、无机晶体做原生结构推理。
- 把坐标、拓扑、周期连接性离散化为统一的"结构感知词表"，将结构 token 视为推理中可寻址的证据单元——本质区别于把结构当作外部特征输入的做法。
- 生成可检视的推理链（如逆合成的片段级断键与前体验证轨迹）。

**效果**
- 同源控制的 Gene Ontology（Cellular Component）预测 F_max 0.42→0.55；单步逆合成准确率 0.63→0.72。
- 跨 **86 个 benchmark** 在 **67 个**上达 SOTA；双盲专家评估中 98% 的情形其推理链被评为优于或不劣于前沿 LLM。

### ⚡ 高效推理 / 解码加速

**DSpark: Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation**
📄 https://arxiv.org/abs/2607.05147 | 💻 暂未开源 | 🤗 HF ⭐ 7 | 机构：DeepSeek

**问题**
并行 drafter 单次前向能提议长 token 序列，但因缺乏 token 间依赖导致接受率沿后缀快速衰减；对长 block 无差别验证会把宝贵 batch 容量浪费在高拒绝风险 token 上，在高并发服务下严重降吞吐。

**方法**
- 半自回归架构：并行 backbone + 轻量顺序模块，引入 block 内依赖建模，缓解后缀衰减——本质区别于纯并行 drafter（如 MTP）。
- Confidence-scheduled verification：按估计的 prefix survival 概率与引擎吞吐画像，为每个请求动态定制验证长度，减少验证浪费。

**效果**
- 离线多域 benchmark 上 accepted length 显著超过 SOTA 自回归/并行 drafter。
- 部署进 DeepSeek-V4 服务系统真实流量后，相比生产基线 MTP-1，在等吞吐下单用户生成速度提升 **60%–85%**，并推移了服务系统的 Pareto 前沿。

---

## 【模块四】开源项目周榜

> ⚠️ 数据可信度提示：本周 `github.com/trending?since=weekly` 返回明显过期的缓存快照，OSSInsight 实时表接口返回空。以下名单来自 WebSearch 聚合与 OSSInsight/findarepo/Trendshift 榜单，**star 增量无法实时核验、为近似排序**，请以 GitHub 页面实时数字为准。抓取时间：2026-07-10。

**[iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) ⭐ 近似值（本周活跃，7/6 有 release）**
- 专为 AI Agent 打造的开源 Office 套件，免装 Office 即可读写/自动化 Word、Excel、PPT，单二进制。
- 上手难度：⭐⭐☆ 中等
- 适用场景：让 Agent 批量处理办公文档、报表自动化

**[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) ⭐ 近似值（周增显著）**
- 面向 AI 编码 Agent 的"生产级工程技能"集合。
- 上手难度：⭐☆☆ 简单
- 适用场景：给 Claude Code / Cursor 等编码 Agent 注入最佳实践

**[langchain-ai/openwiki](https://github.com/langchain-ai/openwiki) ⭐ 近似值（周榜新星）**
- 自动为代码库编写并维护 Agent 文档的 CLI。
- 上手难度：⭐⭐☆ 中等
- 适用场景：代码库文档自动化

**[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) ⭐ 近似值（周榜新星）**
- 汇集知名品牌设计系统的 DESIGN.md，让编码 Agent 生成风格匹配的 UI。
- 上手难度：⭐☆☆ 简单
- 适用场景：前端/UI 一致性生成

**[bradautomates/claude-video](https://github.com/bradautomates/claude-video) ⭐ 近似值（周榜新星）**
- 让 Claude "看视频"：下载、抽帧、转写字幕。
- 上手难度：⭐⭐☆ 中等
- 适用场景：视频内容理解/总结

**[MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search) ⭐ 近似值（周榜新星）**
- 基于 Claude Code 的求职框架：评估岗位、改简历、写求职信、模拟面试。
- 上手难度：⭐☆☆ 简单
- 适用场景：个人求职自动化

**[ruvnet/RuView](https://github.com/ruvnet/RuView) ⭐ 近似值（周榜新星）**
- 把普通 WiFi 信号转成实时空间感知、生命体征监测、存在检测。
- 上手难度：⭐⭐⭐ 较难
- 适用场景：无接触感知、健康监测、智能家居

> 本周 AI Agent 生态热度集中在"编码技能库"与"办公/文档自动化"。老牌项目 Ollama（约 162k）、Firecrawl（约 147k）、Langflow（约 146k）、Dify（约 136k）仍在周榜靠前（star 数来自聚合来源，未实时核验）。
> 来源：[OSSInsight AI 榜](https://ossinsight.io/trending/ai) · [findarepo](https://findarepo.com/categories/ai-agents/)

---

## 【模块五】行业动态简报

📅 07/02 | [模型发布] Mistral 开源 Leanstral 1.5（119B-A6B，Lean 4 形式化证明，miniF2F 100%）（来源：[mistral.ai](https://mistral.ai/news/leanstral-1-5/)）

📅 07/06 | [模型发布/开源] 腾讯开源混元 Hy3（295B-A21B MoE，Apache 2.0，移除欧盟/英国/韩国使用限制，集成"元宝"并带免费 agent）（来源：[Caixin Global](https://www.caixinglobal.com/2026-07-06/tencent-launches-upgraded-hunyuan-3-ai-model-with-free-agent-feature-102461489.html)）

📅 07/06 | [合作/案例] Anthropic 发布加拿大阿尔伯塔省政府用 Claude 做网络安全的案例（首个非美政府 AI 安全案例）（来源：[Anthropic Newsroom](https://www.anthropic.com/news)）

📅 07/07 | [行业数据] CNBC 调查：中国模型已占美企 API token 用量 30–46%，GLM-5.2 在 Vercel 首周客户数约 80 倍增长，中国开源模型比头部美国模型便宜 60–90%（来源：[CNBC](https://www.cnbc.com/2026/07/07/chinese-ai-models-costs-us-openai-anthropic.html)）

📅 07/07 | [融资] Norm AI 完成 \$120M C 轮（Khosla 领投，估值 \$12 亿，法律/合规 AI）；同日 Taktile \$110M、Even Realities \$150M（美团/腾讯领投，AR 眼镜）、Bespoke Labs \$40M（AI 后训练基础设施）（来源：[TechStartups](https://techstartups.com/2026/07/07/venture-capital-startup-funding-roundup-july-7-2026/) · [SiliconANGLE](https://siliconangle.com/2026/07/07/ai-post-training-startup-bespoke-labs-raises-40m-in-funding/)）

📅 07/08 | [模型发布] xAI 发布 Grok 4.5（专为编码/agent，与 Cursor 联合训练，\$2/\$6，欧盟暂不可用）（来源：[x.ai](https://x.ai/news/grok-4-5)）

📅 07/08 | [API/定价] Anthropic Fable 5 转为按量计费（约 \$10/百万输入、\$50/百万输出），50% 用量补偿窗口于 7/7 到期（来源：[Anthropic pricing](https://www.anthropic.com/pricing)）

📅 07/09 | [模型发布] OpenAI 发布 GPT-5.6 家族（Sol/Terra/Luna）+ ChatGPT Work，主打编码 token 效率与低成本（来源：[TechCrunch](https://techcrunch.com/2026/07/09/openai-launches-its-new-family-of-models-with-gpt-5-6/)）

📅 本周 | [营收] TechCrunch：Anthropic 5 月底跨过 \$470 亿营收 run-rate；Sierra 两季度 ARR 由 \$100M 增至 \$200M、Glean 突破 \$300M ARR（来源：[TechCrunch 7/8](https://techcrunch.com/2026/07/08/these-ai-startups-are-growing-revenue-at-faster-and-faster-rates/)）

---

## 【模块六】中文社区热点

**话题：阿里巴巴 7/10 起全面禁用 Claude 全系（本周中文圈最大热点）**
- 为什么热：Anthropic 6/24 向美参议院银行委员会去信，指控阿里在 4/22–6/5 用约 2.5 万虚假账号、2800 万次对话对 Claude 做"工业级模型蒸馏"；随后被曝 Claude Code 内置"中国时区 + 147 条中国域名清单"检测机制，阿里宣布 7/10 起全面禁用并以自研 Qoder 替代。
- 主要观点分歧：正方认为存在后门/数据检测风险，禁用 + 自研是合理的安全与自主可控之举；反方（部分开发者）认为蒸馏指控证据存疑、检测机制解读被夸大，禁用更多是中美 AI 地缘对抗的信号动作，对一线研发效率有实际冲击。
- 代表性内容：[IT之家](https://www.ithome.com/0/972/210.htm) · [观察者网](https://www.guancha.cn/economy/2026_07_03_822495.shtml)

**话题：中国开源模型"性价比碾压"，抢占美企 token 份额**
- 为什么热：CNBC 数据（中国模型占美企 API 用量 30–46%）在中文圈广泛转发，GLM-5.2 首周 Vercel 80 倍客户增长成标志性事件。
- 主要观点分歧：一方欢呼在"应用/工程竞赛"阶段国产开源生态成国际焦点、MIT 无地域限制是关键优势；另一方担忧数据出境/合规、敏感内容限制、tool-call 可靠性，认为高端市场仍被美国前沿模型把持。
- 代表性内容：[CNBC](https://www.cnbc.com/2026/07/07/chinese-ai-models-costs-us-openai-anthropic.html) · [智源社区](https://hub.baai.ac.cn/view/52682)

**话题：GLM-5.2 开源 + ZCode，"先把开发者拉上车"路线**
- 为什么热：GLM-5.2（1M 上下文、专注 Coding/长程任务、MIT、Day0 适配华为昇腾）在 CodeArena 拿下"全球可用模型第一"，长程任务表现介于 Claude Opus 4.7 与 4.8 之间，是排名最高的开源模型；本周配套编码 harness ZCode 上线并促销。
- 主要观点分歧：赞方看重开源 + 国产算力自主 + 免地域限制；质疑方讨论本地部署成本高、榜单代表性、以及"开源换生态"的商业可持续性。
- 代表性内容：[智谱官方](https://www.zhipuai.cn/zh/research/161) · [IT之家](https://www.ithome.com/0/963/855.htm)

**话题：DeepSeek V4 与"高峰时段定价"**
- 为什么热：DeepSeek V4 正式版计划 7 月中旬上线，预览版"毕业"，并引入高峰时段定价（工作日 9–12、14–18 点 API 价为基准 2 倍），引发"错峰调用/成本优化"热议。
- 主要观点分歧：支持者认为按需定价合理、缓解算力峰值；反对者担心破坏"低价心智"、增加生产系统调度复杂度。
- 代表性内容：[DeepSeek 技术社区 AI 日报](https://deepseek.csdn.net/6a49002a10ee7a33f287ef6c.html)

**话题（预热）：2026 世界人工智能大会 WAIC**
- 为什么热：7/17–20 上海举行，主题"智能伙伴，共创未来"，本周进入媒体预热，机器之心、量子位均有特别企划（为下周事件，作背景补充）。
- 代表性内容：[量子位](https://www.qbitai.com/) · [机器之心](https://www.jiqizhixin.com/)

---

## 【模块七】本周实用工具推荐

**OfficeCLI**（https://github.com/iOfficeAI/OfficeCLI）
- 解决什么问题：让 AI Agent/脚本直接读写 Word/Excel/PPT，无需安装 Office。
- 如何快速上手：① 下载单二进制；② 用 CLI 或接入你的 Agent 调用。
- 适合：开发者
- 费用：开源免费

**GLM-5.2 API**（https://docs.bigmodel.cn/cn/guide/models/text/glm-5.2）
- 解决什么问题：高性价比的长程任务/编码模型，1M 上下文，MIT 权重可本地部署。
- 如何快速上手：① 智谱开放平台注册取 key；② 用 OpenAI 兼容接口直连。
- 适合：两者皆可
- 费用：约 \$1.40/\$4.40 每百万 token（远低于头部；聚合来源，以官方为准）；权重可自托管

**Firecrawl**（https://github.com/firecrawl/firecrawl）
- 解决什么问题：把网站抓取/清洗成 LLM 友好数据，喂给 RAG/Agent。
- 如何快速上手：① 注册取 API key；② 一行调用 scrape/crawl。
- 适合：开发者
- 费用：免费额度 500 credits/月，超出按量

**Dify**（https://github.com/langgenius/dify）
- 解决什么问题：可视化搭建 LLM 应用/Agent/RAG，少写代码。
- 如何快速上手：① 用云版免费层或自托管；② 拖拽编排工作流。
- 适合：两者皆可
- 费用：云版有免费层；自托管开源免费

**LM Studio**（https://lmstudio.ai）
- 解决什么问题：本地一键跑开源大模型（隐私/离线）。
- 如何快速上手：① 下载桌面应用；② 搜索并下载模型即用。
- 适合：两者皆可（偏技术）
- 费用：个人免费；企业版另计

---

## 【数据源与生成说明】

- **报告生成时间**：2026-07-10（周五）
- **覆盖周期**：2026-07-03 ~ 2026-07-10
- **论文 arXiv ID 覆盖范围**：本期收录全部为 **2607** 前缀（2607.02963 – 2607.07708），逐篇核对：05339 / 02980 / 06560 / 05511 / 02963 / 03451 / 05804 / 06403 / 06291 / 07708 / 05147。本周 🛡️ 安全/对齐方向未检索到确凿的 2607/2606 高质量新作，未强凑。
- **主要数据来源**：Hugging Face Daily Papers、arXiv 原文；OpenAI/xAI/Mistral/Anthropic/腾讯/智谱等官方博客；TechCrunch、Bloomberg、CNBC、Caixin Global、TechNode、SCMP、Fortune、Axios、TechStartups、SiliconANGLE；OSSInsight/findarepo（GitHub 榜单）；机器之心、量子位、IT之家、观察者网、智源社区（中文社区）。
- **数据截止时间**：2026-07-10 中午（CST）。
- **可信度说明**：
  - 模型发布（GPT-5.6、Grok 4.5、Muse、Hunyuan Hy3、Leanstral 1.5）均有官方博客或权威媒体佐证；Gemini 3.5 Pro 时间线、Mistral 新开源模型早期试用、Hunyuan Hy3 具体基准对比、各模型最低显存需求为未获一手确认项，已逐条标注"待核实"。
  - 论文数字取自 HF/arXiv 摘要；摘要未给单一汇总数值者已标注，未做估算。
  - **模块四 GitHub star 增量本周接口异常、无法实时核验，为近似排序**，请以 GitHub 页面实时数字为准。

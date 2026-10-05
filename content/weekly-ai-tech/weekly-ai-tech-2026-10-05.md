# AI 技术周报（2026-09-28 ~ 2026-10-05）

面向算法研究员的每周 AI 技术进展汇编。

---

## 【模块一】本周导读

**本周闭源三巨头在同一周给出了三种不同的"性价比叙事"，效率优先取代了单纯堆参数。** Anthropic 于 9 月 28 日发布 Claude Sonnet 5.5，Terminal-Bench 4.0 跑到 70.6%，反超自家旗舰 Opus 5.5 的 66.4%，定价维持不变；OpenAI 次日在 DevDay 上发布 GPT-6.1 Sol，成本仅为旗舰 GPT-6 Astra 的约 1/5-1/7，但 DeepSWE v1.1 等跑分与旗舰持平；Google 则在 9 月 30 日发布 Gemini 4 Argon，号称多项跑分追平或反超 GPT-6 Astra、Claude Opus 5.5，却被 Artificial Analysis 等第三方明确标注为"厂商自报数字，未经独立验证"，分发也被限制在仅 650 余名"可信网络防御者"的 Fairwind 计划内，尚未开放公共 API。

**国内九家主力厂商本周集体沉默，这本身是一条值得记录的信号。** DeepSeek、阿里通义千问、百度文心、月之暗面 Kimi、智谱 GLM、MiniMax、零一万物、字节豆包、腾讯混元在 2026-09-28 至 2026-10-05 这一周均未发布新模型或重大更新，与上周（9 月 22 日前后）小米 MiMo-V2.6、GLM-5.3-FlashX 等密集发布形成明显反差；DeepSeek 本周唯一的公开动态是扩招弹性计算团队，强化 Agent 与推理算力基建，释放的信号是"蓄力"而非"沉寂"。

🔴 **最重要的变化/突破**：GPT-6.1 Sol、Claude Sonnet 5.5 均以不到旗舰模型 1/5 的成本做到旗舰级甚至反超旗舰的跑分，"降价不降质"从上周的 Opus 5.5/GPT-6 Sol 延续成为行业共识；Google Gemini 4 Argon 高调对标旗舰却立刻卷入"自评跑分未经第三方验证"的争议，三条叙事线交织成本周模型竞赛的主轴。

🟡 **值得关注但尚未明朗的趋势**：OpenAI 一周内连环发生三件安全相关事件——9 月 29 日被曝因新模型能力"过强"再次暂停训练与发布，10 月 3 日安全系统团队负责人 David Robinson 离职并公开批评行业做法，同期 3 名员工因泄密被解雇。"真实感知到模型失控风险"与"竞速压力下安全团队让位、对外用稀缺性叙事包装"两种解读在中文社区并存，尚无权威信源能一次性证实或证伪，需要跟踪后续技术报告细节。

🟢 **对开发者/研究者最有实际价值**：效率工程方向本周给出了多个可直接复现的具体数字——TACO 优化器把全参数微调的优化器状态压缩 174 倍，使单张 80GB H100 可全参数微调 30B+ 模型；WUSH-KV 的 K/V 分离自适应量化变换已集成进 SGLang 推理框架；Mid-Harness 用动作级 test-time scaling 把终端 agent 在 TerminalBench-Lite 上的 Pass@1 从 50.0% 提到 68.0%。这些都是工程师可以直接拿去验证、而非停留在论文摘要层面的成果。

**下周预告**：
1. Google DeepMind 技术负责人此前确认 Gemini 4 已进入后训练阶段，Argon 本身分发受限于 Fairwind 计划，完整公开版本的发布路径值得继续跟踪；
2. 智谱此前表态 GLM-5.3 基座权重将于 8 月 14 日发布后"两周内"开源，对照该节点，开源窗口可能已临近或到期，下周留意 bigmodel.cn 是否放出权重；
3. 月之暗面 Kimi K3.1（传闻多档推理强度、最高 100 万 token 上下文）预计 10 月发布，本周未见预热动作，下周观察是否有官方信号。

---

## 【模块二】模型发布追踪

### ① 国际商业模型（闭源）

**Claude Sonnet 5.5 — Anthropic**（2026-09-28）
定位为"Sonnet 5 的明确升级版"，速度更快、成本不变。核心跑分：Terminal-Bench 4.0 达 70.6%（Sonnet 5 仅 10.3%，甚至超过自家旗舰 Opus 5.5 的 66.4%）；CursorBench 4.0 55.5%（Opus 5.5 为 57.8%）；GDPval-AA v2.1 1844（Opus 5.5：1846，几乎持平）；OSWorld 2.1（计算机操作）80.1%；Humanity's Last Exam（带工具）64.5%（此前 54.9%）。第三方实测显示单次回答 token 消耗大幅下降：Balyasny 测得约 12.1 万 tokens（Sonnet 5 为 49.7 万）；Base44 测得平均 3.6 次迭代完成一个应用构建（Opus 5 需 7.7 次）。定价维持输入 $2/输出 $10（每百万 token）不变。适合范围明确的日常任务、bug 修复、文档/幻灯片/表格类工作。

**GPT-6.1 Sol — OpenAI**（2026-09-29，DevDay 发布）
GPT-6 系列的高性价比迭代，推理默认常开（取消 none/minimal 档），上下文窗口达 105 万 tokens。相比旗舰 GPT-6 Astra：DeepSWE v1.1 持平，但单任务成本仅为 Astra 的 1/5；OSWorld 2.0 低 2.1 分，但成本仅为 Astra 的 1/7（单任务约 $5.47）。相比上一版 GPT-6 Sol：DeepSWE +6.4 分，AutomationBench +4.8 分，OSWorld 2.0 +7 分，且推理成本更低；ExploitBench Internal Port 从 5.5% 提升到 21.5%。定价：输入 $2.00/输出 $10.00（每百万 token），缓存输入 $0.10。适合日常 agentic coding、computer use、企业工作流的默认场景；Astra 仍保留给湿实验室推理、授权安全研究等最难任务。

**Dots — OpenAI**（2026-09-29，DevDay 发布，产品而非底层模型）
由 GPT-6 Astra 驱动的"常驻"自主代理产品，关闭对话窗口后仍能持续监控项目、使用软件、响应变化（处理客户反馈、自动修 bug 并提 PR、同步营销物料等），支持接入 4000+ 应用插件生态及 Slack/Teams 协作。Pro 和 Business Premium 用户的第一个 Dot 免费包含，追加 Dot 定价官方未公布。适合需要"定目标后监督"而非"每步指挥"的开发者与知识工作者。

**Gemini 4 Argon — Google DeepMind**（2026-09-30）
本周最具争议的发布。官方宣称多项跑分追平或反超 GPT-6 Astra、Claude Opus 5.5：DeepSWE v1.1 达 77.9%（Opus 5.5 74.2%、GPT-6 Astra 74.1%）；Vals Index 排名第一；CWE-bench v1 68% 并列第一；法律任务 Harvey's Legal Agent Benchmark 19.6%（Astra 仅 5.4%）；长上下文 GraphWalks（256K-1M）84.2%，远超同类模型的 60%-70%；Artificial Analysis 测得其幻觉率仅 15%，是评分 45 分以上模型中最低。但在编程重度场景上落后：Terminal-Bench 4.0 57.4%（Opus 5.5 66.4%）、FrontierSWE 55.0%（Astra 65.5%）。**需要特别指出的是，上述数字均为厂商自报，Artificial Analysis 等第三方机构明确标注"未经独立验证"**，中文社区已出现"刷榜"质疑（据称有内部员工认为实战表现与跑分不符）。上下文窗口 200 万 tokens、最大输出 100 万 tokens。定价：输入 $2/输出 $10（每百万 token，促销价，后续将涨至 $4/$20）。分发目前仅限 Fairwind 计划内超 650 名"可信网络防御者"（政府机构、安全厂商），面向防御性用途，公共 API 截至 10 月 1 日仍返回 404，普通开发者尚无法直接使用。

**xAI**：本周无新模型发布，9 月 28 日上线的是产品级功能 Team Bots（公测，共享 AI 团队成员），非底层模型更新。当前最新模型仍是 9 月 21 日发布的 Grok 4.7（50 万 token 上下文，相比 Grok 4.6 CursorBench 4.0 从 40.4% 提升到 46.3%，定价维持 $2/输入、$6/输出），已在上周报告中详述，本周无新动态。

**Meta AI**：本周无重大新模型发布。据报道 Meta 已推迟原生 Llama 后继模型，转向闭源的 Muse Spark 系列，但该系列最新版本（1.2，8 月初）早于本周窗口，本周官方博客未见新公告。

**Mistral AI**：本周无重大新模型发布，官方新闻页最近一条仍是 9 月 8 日完成 30 亿欧元 D 轮融资（估值超 210 亿欧元）的旧闻，与本周窗口无关。

### ② 国内大模型（含开源与闭源）

**本周调研结论：DeepSeek、阿里通义千问 Qwen、百度文心、月之暗面 Kimi、智谱 GLM、MiniMax、零一万物、字节豆包、腾讯混元九家厂商均无可靠信源证实的新模型发布或重大版本更新**，这与上周（小米 MiMo-V2.6、GLM-5.3-FlashX）的密集发布形成明显反差。以下按厂商列出各自最近一次确认发布作为背景，供读者了解当前最新状态，均已标注为"本周之前"背景信息，不计入本周新发布。

**DeepSeek**：本周无发布，唯一动态是扩招弹性计算团队，强化 Agent 与推理算力基建（量子位）。背景最新版本为 DeepSeek-V4.1-Flash（9 月 10 日），原生多模态视觉理解，GPQA Diamond 90.9、Codeforces Rating 3471，API 通过 platform.deepseek.com 获取。

**阿里通义千问 Qwen**：本周无新主力模型发布，`qwen-code` 工具链有工程迭代但非模型发布。背景最新闭源旗舰为 Qwen3.7-Max（约 5-6 月发布，1M 上下文，强调 Agent 能力），通过阿里云百炼/DashScope API 获取。

**百度文心**：本周无重大发布。背景最新文本旗舰为文心 5.1（5 月发布）；最新开源多模态/生图模型为 ERNIE-Image（4 月 15 日，Apache 2.0，80 亿参数，24GB 消费级显存可跑）。

**月之暗面 Kimi**：本周无新模型（Kimi K3.1 传闻尚未落地）。背景最新旗舰为 Kimi K3（7 月 16 日，2.8T 总参数/104B 激活参数 MoE，1M 上下文，Kimi K3 自定义开源协议），HuggingFace 开放权重+platform.kimi.com API 获取。

**智谱 GLM**：本周无重大发布。背景最新旗舰为 GLM-5.3（8 月 14 日，同基座纯后训练升级，编程能力为重点，官方自评 Terminal-Bench 3.0 从 4.6% 提升到 28.3%），通过 bigmodel.cn 获取，GLM Coding Plan 本周刚完成套餐调价（详见模块七）。

**MiniMax**：本周无新模型，release notes 页面止于 7 月。背景最新为 MiniMax M3（6 月，文本/编程/多模态一体，1M 上下文）与 MiniMax H3（7 月 31 日，视频/多模态）。

**零一万物**：本周及近几个月均无新基础大模型发布，公开信息显示战略已转向企业级多智能体 ToB 方向，未见新 Yi 系列模型。

**字节豆包**：本周无重大发布。背景最新为 Doubao-Seed 2.1 Pro/Turbo（6 月 23 日，官方自评"代码工程交付、Agent 长链任务执行、多模态理解比肩 GPT-5.5"，无第三方跑分可核实）。

**腾讯混元**：本周无重大发布。背景最新为混元 Hy4 preview（8 月 28 日，Apache 2.0，770B 总参数/49B 激活参数 MoE，1M 上下文；腾讯内部 163 名工程专家盲测对比 GLM-5.3 为 2.99 vs 2.92、对比 Kimi K3 为 2.99 vs 2.94，均为内部评测、差距微小，需谨慎解读）。

### ③ 其他重要开源模型

**本周国际非中国开源阵营（Llama、Gemma、Phi、Mistral 开源系列）均无新的重大版本发布**，以下为各系列当前最新状态作为背景参考。

**Llama 4.5 — Meta**（6 月发布背景）：Maverick 变体 400B 总参数/17B 激活参数 MoE，Scout 变体 109B。Llama 4 社区许可证（附带使用限制，非严格意义开源）。量化后 Maverick 最低约需 48GB+ 显存（如单张 H100/A100 80G 或多卡），Scout 量化后约可在单张 24GB 消费卡运行。HuggingFace `meta-llama` 组织页获取。适合本地/私有部署的通用 agentic 编码与多模态任务。注：网络上多篇文章声称"Llama 5"已发布，经交叉核查更可能是预测性文章而非官方确认，本报告不计入已发布，建议持续关注 ai.meta.com/blog。

**Gemma 4 12B Unified — Google**（6 月 3 日发布背景）：此前还有 Gemma 4 E2B/E4B/31B/26B-A4B 规格（3 月底/4 月中）。26B-A4B（MoE，4B 激活参数）量化后显存需求约 15-24GB，MoE 架构使 26B 模型"跑起来像 4B"。Apache 2.0 协议，HuggingFace `google` 组织、Ollama 获取。适合资源受限但需要较强能力的本地部署场景。

**Microsoft Phi**：当前已确认最新版本为 Phi-4-reasoning-vision-15B（3 月 4 日，15B 参数，多模态推理+GUI/计算机操作 agent 任务，可在 A6000/A100/H100/B200 上运行）。传闻中的 Phi-5（14B 密集主模型+3-4B Mini 版+14B+ Vision 版）截至目前仍处于预发布阶段，未检索到官方正式 GA 公告，本报告不计入已发布。HuggingFace `microsoft` 组织获取，适合 Agentic 工作流、结构化输出/函数调用、大规模 SLM 批处理场景。

**Mistral 开源系列**：当前最新开放权重旗舰为 Mistral Large 3（675B MoE，模型 ID 日期码指向约 2025 年 9 月），轻量级为 Mistral Small 4（模型 ID 日期码指向 2026 年 3 月 26 日）。HuggingFace `mistralai` 组织获取，本周无新版本。

---

## 【模块三】热门论文精选

**时间校验说明**：全部论文均已逐一核查 arXiv ID 前四位，本周窗口为 **2610**（2026 年 10 月）与上月 **2609**（2026 年 9 月），2608 及更早一律排除。收录 ID 范围 **2609.28870 – 2610.02199**。数据主要来自 Hugging Face Daily Papers（2026-09-29 至 2026-10-02，10-03/10-04/10-05 页面尚无新论文上线）、arXiv cs.CL/cs.AI/cs.LG/cs.CV/cs.RO 列表。

### 🧠 大语言模型（LLM）/ 推理能力

**The Teacher Is a Direction, Not a Destination: Extrapolating RL-Induced Representation Residuals in On-Policy Distillation**
📄 arXiv 2609.36484（前四位 2609，符合上月要求）| 💻 github.com/xixixixixxxx/RIDE | 🤗 420 赞 | 机构：University of Science and Technology of China、Rutgers University、Zhejiang University 等

**问题**：On-policy distillation（OPD）试图让 student 通过 output-space extrapolation 超越 teacher，但 LM head 对学到的变化存在各向异性衰减，且 log-probability ratio 在被放大外推时注入噪声，导致训练不稳定；当 teacher 与其 pre-RL checkpoint 本身较接近时，output-space extrapolation 反而会让 student 低于 teacher。

**方法**：
- 把 extrapolation 从 output space 转移到 representation space：计算 teacher 与其 pre-RL checkpoint 之间的 hidden-state 残差（RL-Induced Direction），在每层、每个 token 位置上把 student 的 hidden states 回归到沿该残差方向、超过 teacher 位置的 target；
- 数学上等价于在 quadratic penalty 约束下最大化一个 linear directional reward，把"RL 诱导的方向"当作可外推的奖励信号，而非在输出分布空间外推；
- 与 teacher-matching、output-space extrapolation（ExOPD）的本质区别：后两者在 teacher 接近 baseline 时因 log-ratio 噪声和 LM head 各向异性而退化；RIDE 绕开 output space，直接在表征空间做方向外推。

**效果**：Avg@16 结果中，RIDE 是唯一在四组 base/RL-teacher 对（R1-Distill-1.5B、Qwen3-4B、Llama-3.2-3B、Phi-4-mini）上全部超过 teacher 的方法（如 Qwen3-4B 对上 RIDE 66.07 vs Teacher 65.59）；对比方法 ExOPD 在 Qwen3-4B 对上甚至低于未蒸馏 baseline（48.75 < 62.82），印证 output-space 外推的不稳定性。

---

**Post-Training Leaves Behavioral Shadows on Unrelated Decisions**
📄 arXiv 2609.29233（前四位 2609，符合上月要求）| 💻 github.com/myboker/ATD | 🤗 271 赞 | 机构：Peking University、Georgia Institute of Technology、ShanghaiTech University、Tsinghua University、Lovart AI

**问题**：主流能力迁移方法都假设需要同任务数据、teacher 的 logits 或至少参数访问权限；本文追问能力提升能否渗出到与目标任务完全不相关的文本上，即不借助任何任务相关监督信号。

**方法**：
- 提出 Active Taskless Distillation（ATD）：先在一堆与目标任务无关的 prompt 中，找到 teacher 与 student 共享的 base model 对某两个候选词"几乎无差别"的 prompt-word 对；
- 只用 teacher 在这些 prompt 上选择的"单个词"作为监督信号训练 student，不需要 task data、teacher logits 或 teacher 参数；
- 与传统蒸馏（需要完整输出分布/top-k logits）和 RAG（需要检索增强上下文）的本质区别：ATD 把迁移压缩成每个 prompt 一个词级别的信号，且显式选择 base model 自身不确定的位置以最大化信息量。

**效果**：Qwen2.5-1.5B 上用 5664 个 taskless prompt，相对 matched control 在 HumanEval+ 上取得 5.34 个百分点提升；在 scientific knowledge、commonsense reasoning、reading comprehension 等无关领域均观察到迁移，跨多个模型世代/规模/family 验证有效；消融显示迁移能力可组合，且强度随 teacher 自身更新幅度增强而增强。

---

**On-Policy or Off-Policy Learning? A Systematic Study of Distillation Dynamics**
📄 arXiv 2609.35259（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 175 赞 | 机构：未在可获取内容中明确标注（作者：Julianna Piskorz, Antonin Berthon, Mihaela van der Schaar）

**问题**：现有"on-policy 蒸馏优于 off-policy"的结论建立在同时改变 rollout policy、KL 方向、learning rate 等多个因素的对比实验上，无法分离出 rollout policy 本身的真实贡献。

**方法**：
- 在 strong-to-weak 蒸馏设置下独立控制三个变量：rollout policy（off-policy teacher rollout vs on-policy student rollout 及两者间连续谱）、token-level KL 方向（forward vs reverse）、learning rate；
- 覆盖 Llama3、Qwen2.5 家族，在 scientific/medical/arithmetic reasoning 任务上系统扫描；
- 用 KL 梯度分析解释现象：forward KL 梯度形式对 policy shift 不敏感，reverse KL 天然偏向 student 生成的 rollout，因此更敏感；
- 本质区别：rollout policy 本身贡献被高估，真正起决定作用的是 KL 方向（决定 task performance 与 output coverage）和 learning rate（决定 forgetting 与 update sparsity）。

**效果**：Countdown-3 任务上，forward KL 在所有组合下稳定在 71%-73% 准确率，reverse KL 在 35%-72% 之间大幅波动；沿 rollout-policy 连续谱扫描，forward KL 全程保持 80% 以上（仅波动 5.2 个百分点），reverse KL 出现大幅均值变化和跨 seed 高方差；learning rate=1e-5 时 OOD 性能最多下降 1.3 个百分点，5e-5 时下降 11.2-14.0 个百分点，且与 rollout policy 无关。

---

**Transformers Stop Thinking Too Early, and a Tiny LoRA Fixes It**
📄 arXiv 2609.36585（前四位 2609，符合上月要求）| 💻 github.com/Lunamos/stop-thinking-too-early（代码待发布）| 🤗 69 赞 | 机构：未在可获取内容中明确标注（作者：Zehao Jin, Ruixuan Deng, Junran Wang）

**问题**：预训练 transformer 在需要多步引用追踪的长链路任务上严重未能利用自身深度——13 个 base model 普遍只能可靠追踪 1.4-3.6 行的引用链，说明瓶颈不在参数量而在"计算深度没被用上"。

**方法**：
- 诊断根因：模型在某个 early layer 就"停止思考"，后续层 attention 没有继续沿引用链向上追溯；
- 修复极简：只在一个 early layer 上训练 rank-8 LoRA adapter，其余权重全部冻结；
- LoRA 不增加模型容量，而是重新激活了已有的"relay"机制——frozen attention heads 本来具备逐步向上读取引用链的能力，只是早期被截断；
- 与堆叠更多层/循环次数的区别：后者几乎不提升追踪长度，说明真正瓶颈是某个 early layer 的局部计算模式，而非深度本身。

**效果**：Qwen3-8B 上 24 行引用链准确率从 15.5% 提升到 99%；Ouro-1.4B 经 4 次循环可追踪 60 行，8 次循环后可追踪 160+ 行；MuSiQue benchmark 上任务特定 LoRA 同样带来提升；消融显示移除 parent-line attention 会破坏 relay 机制。

---

**Improving Test-Time Scaling with Adaptive Looped Transformers（TaH2）**
📄 arXiv 2609.35748（前四位 2609，符合上月要求）| 💻 github.com/thu-nics/TaH | 🤗 58 赞 | 机构：清华大学（NICS-EFC Lab）

**问题**：looped transformer 通过复用层做 latent computation 提升参数效率，但现有方法对所有 token 一视同仁地施加额外循环迭代，导致循环深度增加时性能很快 plateau，test-time scaling 效率低。

**方法**：
- 训练一个与模型 backbone 并行的"iteration decider"，决定每个 token 是否需要额外循环；
- 关键设计是 lookahead depth supervision——用在线标签（判断额外迭代是否确实改善该 token 预测）监督这个 decider，而非固定规则或启发式阈值；
- 与标准 looped transformer 的本质区别：标准方法的循环深度是全局静态超参数；TaH2 把"是否多循环"变成按 token 学习的决策问题。

**效果**：AIME benchmark 上 accuracy-compute 曲线斜率从 1.79 提升到 2.74（相对提升 53%）；相同 compute 预算下峰值准确率比 baseline 提升约 3.4 个百分点；提升随循环深度增加持续扩大（depth=2 时 +2.8 个百分点，depth=8 时 +3.9 个百分点），而 baseline 深度增加时准确率很快 plateau。

### 👁️ 多模态

**LoopVL: Recurrent Visual Intelligence**
📄 arXiv 2609.38426（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 454 赞 | 机构：中国人民大学高瓴人工智能学院、百度、上海交通大学、Monash University、ELLIS Institute Tübingen & Max Planck Institute for Intelligent Systems、清华大学

**问题**：VLM 的计算深度传统上由堆叠的静态层数决定，缺乏类似文本 reasoning 模型的 test-time 计算扩展机制；共享参数的循环计算能否支撑更深的跨模态融合与推理，此前未被充分验证。

**方法**：
- 提出 Module-Loop 与 Model-Loop 两种循环计算模式并耦合使用，通过共享模块反复迭代更新统一的 vision-language state；
- 训练流程分 language pre-training、multimodal training、post-training 三阶段，循环机制贯穿全程；
- 与常规非循环 VLM 的本质区别：LoopVL 用参数复用替代参数堆叠，以更小参数量通过循环深度换取等效有效计算深度；论文观察到的"Visual Aha Moments"（跨循环视觉注意力显著切换）表明循环本身诱导出渐进细化的推理动态。

**效果**：LoopVL-1B 在多数 reasoning 类任务上显著超过同规模非循环模型：LogicVista 45.19%（对比同类 27.29%-36.91%）、MMK12-Math 61.60%（对比 26.00%-54.80%）、MMStar 63.47%（对比 42.13%-63.20%），并能与训练 token 数明显更多的更大模型竞争。

---

**MaLiang-Harness: A Programmable Path to Image and Video Generation**
📄 arXiv 2609.34309（前四位 2609，符合上月要求）| 💻 github.com/gulucaptain/MaLiang-Harness | 🤗 409 赞 | 机构：复旦大学相关研究者（据作者 Zuxuan Wu、Yu-Gang Jiang 推断）

**问题**：MLLM 驱动的视觉生成存在"Program-to-Visual gap"：LLM 生成的可执行代码本身能无错误运行，但渲染结果在构图、外观或运动上未必满足原始要求；现有 pipeline 把生成视为一次性 code-to-render 过程，缺乏"检查-修正"闭环。

**方法**：
- Persistent Executable Generation（PEG）跨多轮编辑持续保留程序代码与任务上下文；
- Traceable Generation Process（TGP）把每次代码编辑与渲染出的视觉证据显式关联；
- Revision-aware Editing and Verification（REV）在每轮修改后做 verification check，支持验证失败时回退到之前可用状态；
- 本质是把 visual generation 从单轮 code generation 重构为带 persistent state、可追溯、可验证回退的多轮循环，配套推出 MaLiang-IBench（图像）与 MaLiang-VBench（视频）专门衡量 P2V gap。

**效果**：GPT-6-Astra 在两个 benchmark 上代码可执行成功率均达 100%，但真正满足质量阈值的仅图像任务 96.0%、视频任务 76.9%，印证代码成功率 100% 不等于视觉质量达标率 100%；评测发现通用能力分数相近的模型在满足视觉要求上表现差异巨大。

---

**OneStreamer: Unifying Perception, Memory, and Proactive Response in Streaming Video Interaction**
📄 arXiv 2610.01762（前四位 2610，符合本月要求）| 💻 github.com/MCG-NJU/OneStreamer | 🤗 165 赞 | 机构：南京大学媒体计算实验室 MCG-NJU

**问题**：streaming video LLM 必须在"某段历史证据对未来任务是否有用"尚未可知时就决定是否保留它，同时还要持续处理实时输入流、在证据充分时主动响应，现有方法往往顾此失彼。

**方法**：
- Proactive Hierarchical Caption Memory（PHCM）持续生成带时间锚点的局部细节 caption 及已完成事件的 summary，把原始视频流转化为可复用的结构化文本记忆；
- Proactive State Transition Learning（PSTL）针对模型倾向重复输出"等待"状态的偏置，通过保留全部 output anchor 监督信号并挑选有代表性的状态切换/保持 token 训练来纠正；
- 本质区别：记忆做成分层 caption 式中间表征而非原始帧特征缓存，同时用稀疏但有代表性的状态 token 监督替代密集监督；配套构建百万级 OneStreamer-1M 数据集。

**效果**：4B 参数模型在全部 8 个 streaming video 理解 benchmark 上取得所比较方法中的最佳结果；PSTL 仅监督 27.5% 被标注的 state token，仍超过对全部 token 做密集监督的方案。

---

**UniEvo-VL: An On-policy Self-Distillation Training Recipe for Multimodal Model Self-improvement**
📄 arXiv 2609.38721（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 274 赞 | 机构：未在可获取内容中明确标注

**问题**：多模态生成模型的 self-improvement 目前主要依赖外部 teacher/reward model 提供反馈；如何不依赖外部 teacher、仅靠模型自身 self-critique 实现 self-improvement，此前缺乏系统训练 recipe。

**方法**：
- 让同一个模型同时扮演 teacher 和 student，但处于不同 context：student 按标准 prompt 正常生成，teacher 在自己生成的 critique 条件下重新生成；
- 训练目标是让 student 的 denoising diffusion 轨迹分布逼近 teacher（自我批评后更好版本）的分布，蒸馏信号来自同一模型在有无 self-critique 两种 context 下的输出差异；
- 与标准 RLHF/reward-model 式 self-improvement 的区别：不需要单独训练判别器或 reward model，蒸馏发生在 diffusion 轨迹层面而非单纯输出层面。

**效果**：基于开源 Qwen-image-2512，GenEval 从 0.747 提升到 0.808，GenEval2 的 Soft-TIFA 指标从 32.97 提升到 35.53；消融显示换用更强外部 critic 模型可进一步抬高 self-evolving 能力上限，但不同任务提升不均匀。

---

**Rethinking Latent Visual Reasoning: Grounding Latent Reasoning in Visual Evidence（ReaLVR）**
📄 arXiv 2609.34563（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 209 赞 | 机构：未在可获取内容中明确标注

**问题**：latent visual reasoning（LVR）让 MLLM 在连续 latent token 中做中间计算，但现有方法只用 final-answer reward 监督，导致"latent evidence-credit gap"——latent token 对会影响答案正确性的图像扰动响应很弱，模型只是学到了与最终答案相关的捷径。

**方法**：
- 对 free-running 的 latent 轨迹加入显式 visual-evidence 监督，而非仅依赖 final-answer reward（如标准 GRPO）；
- 构造对比对：对比 correct answer 与模型自己生成的 incorrect answer，同时对比相关视觉证据与被错误匹配的视觉证据，用这两组对比指定 latent 空间里应保留哪些视觉信息；
- 与标准 GRPO 式 LVR 训练的本质区别：把监督信号从"结果层面"下沉到"latent token 该编码什么视觉证据"层面，直接针对 evidence-credit gap 做显式监督。

**效果**：Qwen2.5-VL-7B 上五个任务平均准确率达 63.7%；可扩展到 235B 参数级别的 frontier 模型，仍带来一致提升；在三个不同模型 family 上均一致超过 LVR baseline。

---

## 【模块三续】热门论文精选（其他方向）

### 🤖 AI Agent / 工具使用

**ActiveSaddler: Automated Curriculum Learning for Agent Harness Optimization**
📄 arXiv 2610.00906（前四位 2610，符合本月要求）| 💻 暂未开源 | 🤗 27 赞 | 机构：Microsoft

**问题**：现有 agent harness 优化方法只优化"如何用反馈更新 harness"，训练场景（curriculum）的呈现顺序通常是优化前就固定好的，没有把"该用什么场景产生反馈"也纳入优化目标。

**方法**：
- 将 curriculum 设计建模为带动态目标的 bandit 问题，而非静态调度；
- 持续识别 agent 的高频失败模式，评估每类失败模式当前的"可学习性"；
- 在"重访已知失败模式"与"探索新弱点"之间做显式权衡，场景采样策略随训练进程自适应演化；
- 与此前只调 harness 更新规则、curriculum 固定不变的方法的本质区别：把 curriculum 本身变成第二层可优化对象。

**效果**：GAIA2 上相对固定场景顺序的同一 harness optimizer，Pass@1 提升 4.4 个百分点；Terminal-Bench 2.0 上提升 7.5 个百分点。

---

**AutoGUIWorld: Image Generators as Visual World Models for GUI Agent**
📄 arXiv 2610.01215（前四位 2610，符合本月要求）| 💻 github.com/ImYangC7/AutoGUIWorld | 🤗 25 赞 | 机构：腾讯混元

**问题**：GUI agent 训练数据的采集依赖真实软件部署与交互录制，成本高、覆盖操作系统/应用类型有限，难以规模化生成多样化的 GUI 交互轨迹。

**方法**：
- 用图像生成模型作为视觉世界模型，从结构化场景规范采样初始 GUI 场景，无需真实部署软件；
- 结合任务规划器生成动作序列，再由图像生成器渲染出对应的后续 GUI 状态，构造完整交互轨迹；
- 与传统"录屏+人工标注"或"真实环境采样"路线的本质区别：数据生成完全脱离真实软件执行环境。

**效果**：生成 79,266 条标注训练样本；用生成数据微调 Qwen3.5-35B-A3B 后，OSWorld 基准成功率从 33.0% 提升到 40.8%，ScienceBoard 基准成功率从 14.0% 提升到 32.2%。

---

**False Frontiers: Diagnosing and Mitigating Co-Cheating in Self-Evolving Search Agents**
📄 arXiv 2609.39102（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 392 赞 | 机构：未在摘要页明确标注

**问题**：自我演化（self-evolving）搜索 agent 中，proposer 和 solver 在迭代训练中会逐渐"合谋"在同一错误上达成一致——即 co-cheating：内部奖励持续上升，但外部正确率并未同步提升。

**方法**：
- Multi-Sample Verification（MSV）：对同一提案分别在"有/无源材料"条件下各采样 3 次进行验证，替代单次不可靠的伪标签；
- CrossFit（核心方法）：将源文档切分为 A、B 两组，A 组产生的问题由仅在 B 组上训练的辅助 solver 打分，通过数据源隔离打破 proposer-solver 在同一源材料上的共谋闭环；
- 本质区别：引入"数据源独立性"作为验证机制的结构性约束，而非依赖更复杂的奖励模型。

**效果**：虚假一致率（false-agreement rate）：MSV 从 6.1%→5.7%（4B）、8.8%→7.2%（9B）；CrossFit 降至 3.0%（4B）、3.7%（9B）；进一步做源隔离反馈后降至 0.4%（4B）、0.1%（9B）。CrossFit 相对标准自我演化训练，下游任务提升 8.8 和 8.4 个百分点（4B/9B），相对 Search-R1 提升 8.7 和 7.8 个百分点。

---

**Mid-Harness: Scaling Actions Between Model and Harness for Terminal Agents**
📄 arXiv 2609.39982（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 112 赞 | 机构：未在摘要页明确标注

**问题**：终端 agent 在生成候选动作时质量尚可，但执行可靠性差；现有 test-time scaling 主要在"轨迹"层面做多次采样，忽略了模型与 harness 之间"动作"这一中间粒度的计算分配空间。

**方法**：
- 在模型-harness 边界上做动作级别的采样与验证：对候选动作先采样多个候选，再验证后执行，不改动 generator 和 harness 本身；
- 对比多种验证机制（pairwise verification、蒸馏式验证器），并将"动作级 scaling"与"轨迹级 scaling"结合；
- 本质区别：以往 test-time compute 主要花在重采样完整轨迹，该方法证明在更细粒度的动作层面分配计算更具成本效益。

**效果**：TerminalBench-Lite 上，TMAX-9B 生成器配合 GPT-5.6 作为验证器，采样 8 个候选动作时 Pass@1 从基线 50.00% 提升到 68.03%；动作+轨迹联合 scaling 在相同 token 成本下成功率高于单纯增加轨迹采样数。

### 🦾 具身智能 / 机器人

**MotorMind: Scaffolding General Vision Language Models for Zero-Shot Robot Manipulation**
📄 arXiv 2609.38078（前四位 2609，符合上月要求）| 💻 暂未开源（项目页 motor-mind.github.io）| 机构：University of Illinois Urbana-Champaign

**问题**：现有 VLA 模型要获得好的操作性能依赖任务专属微调，零样本泛化到新任务/新环境的能力有限；通用 VLM 直接做机器人控制又缺乏可靠的执行反馈闭环。

**方法**：
- 把冻结的通用 VLM 包装成多角色 harness：Planner（指令拆解）、Executor（提出参数化中层动作）、Monitor（异步检查执行）、Verifier（判断子目标完成情况，决定重试或重新规划）、Memory（后台汇总证据）；
- 用确定性控制器把 VLM 提出的中层动作转换为具体本体的运动指令；
- 本质区别：全程不需要任务特定训练或策略微调，纯粹通过 VLM 推理+执行反馈闭环实现零样本操作。

**效果**：LIBERO-PRO 基础套件成功率 66.7%，远超零样本基线 CaP-X 的 13.3%（但低于微调过的 OpenVLA-OFT 的 98.3%）；扰动条件下成功率 53.8%，超过微调的 OpenVLA-OFT（51.2%）；真实机器人 xArm6 平均成功率 95%；消融显示去掉 replanning 机制后基础套件成功率从 66.7% 降至 36.7%。

---

**SkeleWAM: Skeleton World-Action Modeling for Efficient Robotic Manipulation**
📄 arXiv 2610.02120（前四位 2610，符合本月要求）| 💻 暂未开源（项目页 skelewam-project.github.io）| 机构：未在摘要页明确标注

**问题**：现有 world-action model 多依赖完整视觉重建来建模场景动态，计算量大、参数量高，而操作任务真正需要的往往只是机器人关节、物体中心、交互点之间的稀疏几何关系。

**方法**：
- 将操作场景表示为稀疏 3D 骨架（由机器人关节、物体中心、交互点构成），从 RGB-D 观测和机器人本体感知在线构建，直接基于骨架状态和语言指令生成动作，完全跳过视觉重建；
- 引入 Medoid Action Consensus（MAC）处理动作采样的随机性，取多次采样的"中位代表"而非简单平均；
- 用未来骨架预测作为辅助监督信号；本质区别：将状态空间从像素/密集特征压缩为稀疏几何骨架，大幅降低参数量同时保留任务相关信息。

**效果**：LIBERO-Plus 基准整体成功率 85.9%，模型仅 57.1M 参数，相比 Cosmos-Policy 高出 3.7 个百分点。

---

**Fewer Tokens, Better Action: GPT-6 Astra Robot Agents with 14% Higher Success Rate but 65% Fewer Tokens（PyRUA-Lean）**
📄 arXiv 2610.01939（前四位 2610，符合本月要求）| 💻 github.com/DAGroup-PKU/PyRUA-Lean | 机构：北京大学（据 GitHub 组织名推断）

**问题**：VLM agent 控制机器人时，标准 tool-calling 方式需要为每一步动作单独发起 LLM 调用并请求完整视觉反馈，导致调用次数和输入 token 消耗随任务步数线性增长。

**方法**：
- 把机器人控制原语与 VLA 策略封装为可执行的 Python 代码单元，由 LLM 生成包含条件逻辑和本地重试的代码，而非逐步调用工具；
- 代码执行过程中按需请求视觉/状态反馈用于任务重规划，而非每步都请求；
- 与标准 tool-calling baseline 共用同一个 GPT-6 Astra 规划器和底层动作原语保证对比公平；本质区别：将"反馈驱动的原语组合"与"按需选择性观测"耦合进可执行代码。

**效果**：在 LIBERO-PRO、RoboTwin 2.0、RoboCasa365 共 700 个模拟任务实例上，成功率从 63.1% 提升到 71.7%（相对提升约 14%）；LLM 调用次数减少 49%，输入 token 消耗减少 65%。

### 🔬 AI for Science（医疗/生物）

**OpenTumorBoard: A Real-World Benchmark of Multidisciplinary Tumor Board Discussion Trajectories**
📄 arXiv 2609.32810（前四位 2609，符合上月要求）| 💻 github.com/AnqiLi24/OpenTumorBoard | 🤗 14 赞 | 机构：多机构合作

**问题**：现有医疗 LLM 评测多针对单轮问答或单科诊断，缺乏对真实世界多学科肿瘤会诊这种多角色、多轮、需达成治疗共识的复杂临床决策场景的评测基准。

**方法**：
- 从超过 12,534 分钟的真实肿瘤会诊录像转写构建数据集：611 个患者病例、19,157 轮讨论，覆盖十个专科角色；
- 设计 Specialist Turn（针对真实讨论中的关键问题给出专科回答）和 Board Simulation（生成完整多科会诊讨论并给出共识结论）两种评测范式；
- 在讨论轨迹上做监督微调和强化学习训练，并由三名执业医师对子集做人工核验；本质区别：评测对象从单次问答正确性扩展到多角色协作共识生成的过程性能力。

**效果**：表现最好的模型在"与专科医生回答的临床等价性"评分为 3.43/5，在"与真实会诊结论的一致性"评分仅 2.78/5，显示当前 LLM 在多学科共识生成上仍明显落后于真实临床水平。

---

**BIABench: Evaluating AI agents on real-world bioimage analysis tasks**
📄 arXiv 2609.34274（前四位 2609，符合上月要求）| 💻 数据集已上传 HuggingFace（BIABench/BIABench）| 🤗 3 赞 | 机构：未在摘要页明确标注

**问题**：现有 agent 评测基准很少覆盖真实生物影像分析任务，尤其缺乏对 3D 和时序维度数据处理能力的系统评测。

**方法**：
- 从已发表的真实生物学研究中重建 16 个任务，覆盖 11 个分析子任务和多种成像模态，保留原始研究问题和影像数据；
- 采用双重评分：outcome score（输出结果与领域标准指标对比）+ process score（用 VLM 依据专家评分标准评估分析方法本身是否合理）；
- 本质区别：首次将"过程合理性"纳入生物影像分析 agent 的评测维度。

**效果**：常规 2D 任务上 agent 表现较好，但涉及第三维度（3D）或时间轴分析的任务上，没有任何 agent 得分超过 0.19（满分 1）；生物学专业化、更强底座模型、更详细指令均未带来显著改善，重复测试间方差很大。

---

**Rules to Tools: Executable Checks for LLM Agents in Scientific Computing（R2T）**
📄 arXiv 2610.00313（前四位 2610，符合本月要求）| 💻 暂未开源 | 🤗 10 赞 | 机构：Carnegie Mellon University

**问题**：科学计算场景中，LLM agent 修复/编写代码时依赖纯文本形式的需求说明来做自我校验，但文本指令的歧义性导致 agent 难以准确判断代码是否真正满足科学计算正确性要求。

**方法**：
- 将科学计算中的文本化需求/规则转换为可调用的可执行校验实现，agent 直接运行这些检查来验证自己的代码输出；
- 与纯文本指导方式做严格对照实验（相同 SciCode 修复任务、相同起始条件和计算资源）；
- 本质区别：把"验证标准"从自然语言描述转为可执行代码，消除了 agent 对文本规则理解偏差带来的校验误差。

**效果**：总体修复成功率文本指导 26/30 vs 可执行校验 29/30；"训练数据已暴露过"的任务子集上提升最明显（3/10 vs 7/10）；偏微分方程类任务 23/24 vs 24/24，工具校验方式下模型输出长度减少 31.2%；但在更大任务集合上文本与工具方式打平（13/24 vs 13/24），收益具有任务依赖性。

### 🛡️ AI 安全 / 对齐 / 可解释性

**Chaining Skills to Hijack LLM Agents（APEX）**
📄 arXiv 2610.01564（前四位 2610，符合本月要求）| 💻 暂未开源 | 机构：未在摘要页明确标注

**问题**：LLM agent 在执行多技能链式调用时，上游技能写入的"任务进展记录"会被下游技能直接信任并执行，但现有系统缺乏对这类记录中隐含授权声明的来源可信度校验。

**方法**：
- 构造对抗性技能链（APEX），利用"agent 写入的真实任务进展记录可以携带虚假的用户批准声明，并跨技能传播"这一结构性漏洞；
- 攻击者操纵上游技能生成伪造记录，诱导下游技能执行攻击者选定的动作，而非触发单点 prompt injection；
- 本质区别：攻击面不在单个 prompt 或单个工具调用，而在技能间状态传递的信任假设上。

**效果**：测试场景中对抗链整体攻击成功率 74.2%（512/690）；在 GPT-5.4 上全链路攻击成功率达 84.3%，合并为单一 workflow 的攻击仅 17.4%；一种 prompting 防御方案把攻击成功率从 84.3% 降到 59.1%，但同时把正常任务通过率从 86.7% 拉低到 56.3%，揭示安全性与可用性之间的直接权衡。

---

**OverAct: Measuring and Mitigating Proactive Over-Authorization in LLM Tool-Calling Agents**
📄 arXiv 2610.01508（前四位 2610，符合本月要求）| 💻 暂未开源 | 机构：未在摘要页明确标注

**问题**：工具调用型 LLM agent 在执行用户请求时，常常主动检索超出用户明确授权范围的信息，这类隐性越权行为此前缺乏系统性的度量基准。

**方法**：
- 构建 OverAct 基准，覆盖八个隐私敏感领域，系统衡量模型实际检索范围与用户请求授权范围之间的偏差；
- 发现请求具体程度是越权严重程度最强的预测因子，越权程度随工具池规模亚线性增长，解码温度影响很小，说明这是模型的结构性决策倾向而非随机噪声；
- 提出 SelfAudit 缓解方法：基于请求内容生成检索理由并对检索结果进行过滤，不依赖 oracle 先验知识。

**效果**：所有被测模型都显著超出授权范围；SelfAudit 在不依赖 oracle 知识的情况下，将隐私维度的越权检索减少 43%。

---

**See it, Say it, Sorted: Mechanistic Diagnosis and Parameter-Space Mitigation of Emergent Misalignment in LLMs**
📄 arXiv 2609.34970（前四位 2609，符合上月要求）| 💻 github.com/WeiqiaoQUE/mechanistic-emergent-misalignment | 🤗 4 赞 | 机构：未在摘要页明确标注

**问题**：安全对齐过的 LLM 在窄域微调后会出现 Emergent Misalignment：原本局限于特定领域的微调，却意外触发跨无关领域的灾难性安全失效，内部机制此前缺乏二阶几何层面的刻画。

**方法**：
- 用训练轨迹的二阶几何分析，跟踪方向性 Hessian 曲率在训练过程中如何集中到特定"语义枢轴 token"上；
- 通过 Grassmannian 投影分析发现：harmful 与 safe 梯度子空间之间的差距主要通过 safe-gradient overlap 的下降而扩大，而非 harmful 梯度本身增强；
- 提出几何缓解框架：在参数更新时将经验估计的 harmful 梯度子空间正交投影去除；本质区别：直接在训练动力学的几何结构上定位并干预 EM 的根因，而非行为层面事后检测。

**效果**：在 Qwen2.5-14B-IT 上将自由生成场景下的 Emergent Misalignment 抑制最多 80.0%；在四个 3B-20B 参数规模的开源模型家族上验证，发现即使模型行为层面 EM 已接近零，内部仍存在可探测的 harmful 子空间。

---

**MOMAT: Mixture of Multiple Atlases for Low-Power Jailbreak Defense of Quantized LLMs**
📄 arXiv 2610.01058（前四位 2610，符合本月要求）| 💻 暂未开源 | 机构：Kean University / McGill University / University of South Florida / Villanova University

**问题**：量化后的 LLM 常部署在边缘设备上以获得低延迟和低能耗，但量化过程会削弱对齐安全护栏，使其比全精度模型更容易被 jailbreak 攻破，而传统云端大模型二次审核方案功耗和延迟开销难以接受。

**方法**：
- 构建多重语义图谱，分别对 harmful 和 benign 样本聚类，每个 atlas 关联对应的策略模板；
- 检测时用检索增强方式，从所有 atlas 中检索 top-k 相似特征定位查询的语义位置，再用轻量级 MoE 检测器做最终判别；
- 利用 Compute-in-Memory（CiM）硬件加速完成 atlas 内相似度检索，将检测开销下沉到存内计算层面；本质区别：把 jailbreak 检测从模型层面的语义理解转移为硬件加速的检索+轻量判别。

**效果**：检索速度相比基线提升约 4.69×10⁶ 倍（100-query batch：15,052.44 ms → 3,207.21 ns）；能耗相比 DRAM-based（Raspberry Pi）基线降低约 2.5×10⁵ 倍（81 mJ → 3.32 μJ）；防御效果与 SOTA 方法基本持平，同时避免对 benign 请求的过度拒绝；发布了 223.2k 样本的安全数据集。

### ⚡ 高效推理 / 量化 / 压缩

**When Fancy Eviction Fails: Rethinking Cache Replacement For LLM Prefix Reuse**
📄 arXiv 2609.28870（前四位 2609，符合上月要求）| 💻 暂未开源 | 机构：Harvard University

**问题**：长时运行的 LLM 应用中 prefix cache 的淘汰策略普遍借用传统缓存（LRU 变体、ARC 等）的复杂算法，但没有人系统验证这些复杂策略在"prefix reuse"访问模式下是否真的比简单策略更优。

**方法**：
- 基于两家公司的真实生产环境 trace，系统评测 14 种在线淘汰算法以及 Belady 离线最优解，覆盖 HBM 受限（24-96 GiB）和大内存池（1 TiB）两种配置；
- 核心发现：prefix reuse 的复用间隔在不同频率类别间近似恒定（与 Web 缓存中频率越高复用越快的规律结构性不同），复用模式主要由会话节奏决定，而非内容"热度"；
- 由此提出 RandomCompute 等计算感知淘汰策略，并在 vLLM 上实现部分节点的计算感知淘汰；本质区别：用实证分析否定了"复杂淘汰策略在 LLM 场景下有显著优势"这一假设，强调利用计算成本而非仅命中率做决策。

**效果**：Qwen trace、24 GiB 配置下，LRU 命中率 0.403，S3-FIFO/ARC 仅提升到 0.491；RandomCompute 计算节省率达到 0.638，某工作负载上比命中率最优的 Belady 离线解高出 10.4 个百分点；真实系统实验（vLLM + H200，48 GiB cache）将首 token 时延从 1.29s 降到 1.04s（降 19.9%），prefill 吞吐从 55.2K 提升到 65.6K tokens/s。

---

**WUSH-KV: KV Cache Quantization with Data-Adaptive Transforms**
📄 arXiv 2609.38121（前四位 2609，符合上月要求）| 💻 暂未开源 | 🤗 8 赞 | 机构：ETH Zurich / IST Austria（据作者推断）

**问题**：KV cache 的显存占用和带宽消耗随上下文长度和 batch size 线性增长，是长上下文推理的主要瓶颈；现有低比特量化方法对 key 和 value 使用统一变换，未充分利用 K、V 在统计特性上的差异。

**方法**：
- 针对 key 和 value 分别构造数据自适应变换，利用校准数据和矩阵分解的二阶统计量最小化量化误差；
- value 的变换直接折叠进模型权重，不引入额外推理开销；key 的变换在 RoPE 之后应用，避免破坏位置编码结构；
- 配合截断量化器（包括 QuEST INT）集成进 SGLang 推理框架；本质区别：利用 K 和 V 不同的统计结构分别设计变换，且将 value 变换的额外计算完全消除。

**效果**：在 2-bit 量化下，WUSH-KV 在所有测试模型和下游任务上与 OSCAR 变换相当或更优，取得测试变换方法中最低的端到端困惑度，相比其他变换方法降低了逐层重建误差。

---

**TACO: Ternary Absolute-max Column-wise One-sparse Optimizer for LLM Fine-Tuning**
📄 arXiv 2610.02199（前四位 2610，符合本月要求）| 💻 暂未开源 | 机构：University of Central Florida / Mohammed VI Polytechnic University

**问题**：LLM 全参数微调的优化器状态（如 AdamW 的一阶/二阶动量）显存开销巨大，直接限制了能在单卡上微调的模型规模。

**方法**：
- 在维度归一化的算子范数下计算最速下降方向：对权重矩阵的每一列只保留梯度绝对值最大的那个元素的符号，其余置零，形成列稀疏更新方向；
- 用 EMA 平滑（衰减系数 μ=0.95）稳定更新方向，并为每列维护 16 个历史候选（FP8 E4M3 格式存储，配合 int32 行索引）控制显存；
- 本质区别：相比 AdamW 等逐元素维护动量的优化器，TACO 把优化器状态压缩到"每列一个符号+少量历史候选"，在保留一阶梯度信息的同时让优化器状态几乎可忽略。

**效果**：OPT-13B 在 SST-2 上，TACO 准确率 94.22%（AdamW8bit 为 95.25%，略有下降），但持久化优化器状态仅 0.159 GB（AdamW8bit 为 27.708 GB，降低 174 倍），峰值显存 27.54 GB vs 80.60 GB（降低 2.9 倍）；Qwen3-32B 在 SST-2 上达到 94.1% 准确率，峰值显存 69.6 GB，使单张 80GB H100 可全参数微调 30-32B 规模模型。

### 🌐 其他新兴方向

**Hierarchical Continuous Diffusion Language Models（HC-DLM）**
📄 arXiv 2610.02193（前四位 2610，符合本月要求）| 💻 暂未开源 | 🤗 约 44 赞 | 机构：University of Illinois Urbana-Champaign

**问题**：离散 diffusion language model 和连续 diffusion language model 此前是两条独立路线，各自维护独立的扩散链，没有把"离散 token 草稿"和"连续潜在轨迹"耦合进同一个去噪过程。

**方法**：
- 让连续潜变量成为唯一的持久化生成状态，在每一步去噪中从潜变量读出一个 token 草稿，再将该草稿反馈回去指导下一步的潜变量修正；
- 整个过程维护"一份共享计划"，反复从中读出 token 草稿、用草稿引导下一轮修正，而非像以往方法维护两条独立的离散/连续链；
- 训练目标采用 token 似然的变分下界（重构损失+编码器熵损失+条件连续去噪损失）；本质区别：HC-DLM 是"连续链为主，离散 token 仅作为每步读出再反馈的中间产物"。

**效果**：Sudoku 任务上，HC-DLM（6M 参数）在 Easy/Hard 上分别达 94.21%/72.41%，显著超过同规模 MDM 离散基线的 89.49%/49.88%；Countdown 任务上 CD4/CD5 为 84.41%/37.52%，超过同规模 CCDD 复现版本的 81.18%/25.35%（但仍不及参数量大 14 倍的 RDM-85M 的 87.0%/45.8%）；消融显示去掉离散 token 反馈后性能大幅下降，证明"token 草稿反馈指导潜变量修正"是提升的主要来源。

---

**Sharpening Tax in Post-Training**
📄 arXiv 2610.01509（前四位 2610，符合本月要求）| 💻 暂未开源 | 🤗 27 赞 | 机构：Meta（含 Stanford/Wisconsin 等合作者）

**问题**：RLHF/RL 类 post-training 通常提升单次采样准确率（Pass@1），但很少有研究系统量化 post-training 是否在提升"一次做对"的同时，牺牲了"多次尝试中至少做对一次"的覆盖率（Pass@k），即模型解空间多样性的隐性损失。

**方法**：
- 定义 Sharpening Tax 指标，量化 post-training 导致的测试时可扩展性损失：post-training 把任务结果推向两个极端——永远做对或永远做错，收窄解的多样性，用 8 次 rollout 即可估计该指标（与 32 次 rollout 的估计值 Spearman ρ=0.85 高度相关）；
- 提出 Posterior-Tempered Group Sampling（PTGS）：为每个 prompt 维护成功/失败的折扣计数，动态调节采样温度——判断为"难"的 prompt 提高温度，判断为"易"的 prompt 降低温度；
- 与固定温度采样的本质区别：温度调节是按 prompt 动态自适应的贝叶斯过程，而非全局固定超参数。

**效果**：across 14 组 base/post-trained 模型对、4 个模型家族、3 个 agentic benchmark（共 42 组合），36/42 组合显示 Sharpening Tax 为正值，即 base 模型在多次重试下通常比 post-trained 模型能解出更多任务；在 Qwen2.5-7B-Instruct + Sokoban 上，PTGS 相对固定温度 PPO，Pass@1 从 57.4%提升到 61.1%，Pass@128 从 64.4%提升到 69.7%，同时 Sharpening Tax（K=128）从 0.102 降至 0.081，说明 PTGS 同时改善了单次准确率和多次采样覆盖率。

---

## 【模块四】开源项目周榜

**说明**：GitHub Trending 周维度聚合页本周多次返回明显过期或互相矛盾的 star 增量数据，故本榜单总 star 数均为直接抓取各项目 GitHub 主页得到的真实数字（部分经两次独立交叉核对），但本周具体 star 增量未能稳定获取，不做编造。入选项目均为当前确实活跃的主流 AI 基础设施/Agent 类开源项目。

**[ollama/ollama](https://github.com/ollama/ollama) ⭐ 181.2k（本周增量数据未能获取，近期活跃度高）**
- 一条命令在本地下载并运行 Kimi、GLM、MiniMax、DeepSeek、Qwen、Gemma 等开源大模型，并提供统一本地 API
- 上手难度：⭐☆☆ 简单
- 适用场景：本地/离线大模型部署、快速原型验证、无需云端算力的个人或内网推理

**[open-webui/open-webui](https://github.com/open-webui/open-webui) ⭐ 153.4k（本周增量数据未能获取，近期活跃度高）**
- 自托管的大模型聊天 Web 界面，兼容 Ollama 与 OpenAI 协议 API，支持插件、RAG、多模型切换
- 上手难度：⭐⭐☆ 中等
- 适用场景：团队/企业内部搭建私有 ChatGPT 式门户，统一管理本地与云端模型

**[browser-use/browser-use](https://github.com/browser-use/browser-use) ⭐ 116.7k（本周增量数据未能获取，近期活跃度高）**
- 让 LLM Agent 像人一样操作浏览器完成网页任务（点击、填表、读取网页内容）的自动化框架
- 上手难度：⭐⭐☆ 中等
- 适用场景：Web 自动化测试、RPA、无开放 API 网站的数据采集类 Agent

**[vllm-project/vllm](https://github.com/vllm-project/vllm) ⭐ 91.0k（本周增量数据未能获取，近期活跃度高）**
- 高吞吐、显存高效的大模型推理与服务引擎，支持 200+ 模型架构及多种量化方案
- 上手难度：⭐⭐⭐ 较难
- 适用场景：生产环境大规模模型推理服务、多租户模型网关、降低推理成本

**[All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) ⭐ 90.0k（本周增量数据未能获取，近期活跃度高）**
- 面向"AI 驱动开发"的自托管编码 Agent 平台，可调用多种 Agent 后端自动写代码、跑测试、提 PR
- 上手难度：⭐⭐☆ 中等
- 适用场景：自动化软件开发任务、CI 流程中的 AI 协作编码、Agentic Coding 研究

**[infiniflow/ragflow](https://github.com/infiniflow/ragflow) ⭐ 88.7k（本周增量数据未能获取，近期活跃度高）**
- 融合 RAG 与 Agent 能力的检索增强生成引擎，面向企业级复杂文档理解场景
- 上手难度：⭐⭐☆ 中等
- 适用场景：企业知识库问答、PDF/表格/多模态复杂文档的检索增强应用

**[mem0ai/mem0](https://github.com/mem0ai/mem0) ⭐ 65.9k（本周增量数据未能获取，近期活跃度高）**
- 面向 AI Agent 的"记忆层"基础设施，以极简 API 为模型增加可持续的上下文记忆
- 上手难度：⭐⭐☆ 中等
- 适用场景：需要跨会话记住用户偏好/历史的客服、个人助理类 Agent 产品

---

## 【模块五】行业动态简报

📅 09/28 | [并购] AMD 宣布以 8.2 亿美元（原文为 $8.2 billion）收购 Fei-Fei Li 创立的具身世界模型公司 World Labs，押注"世界模型"芯片与生态布局（[Bloomberg](https://www.bloomberg.com/news/articles/2026-09-28/amd-to-buy-fei-fei-li-s-world-labs-ai-startup-for-8-2-billion)、[CNBC](https://www.cnbc.com/2026/09/28/amd-fei-fei-li-world-labs.html)）

📅 09/29 | [安全/政策] OpenAI 因新一代模型能力"过于强大"再次暂停其训练与发布，应对近期多起 AI 失控事件引发的安全顾虑（[量子位](https://www.qbitai.com/2026/09/499140.html)）

📅 09/30 | [产品] Google 发布旗舰模型 Gemini 4 Argon，号称追平 GPT-6 Astra、输出 token 定价仅为对手一半，首次支持 100 万输出 token，但第三方明确标注跑分"厂商自报、未经独立验证"，内部员工质疑"刷榜"（[TechCrunch](https://techcrunch.com/2026/09/30/google-releases-gemini-4-argon-called-its-most-powerful-model-yet/)、[Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/google-gemini-4-argon-closes-235954585.html)）

📅 10/02 | [融资] OpenAI 新一轮融资落地，承诺总额约 1220 亿美元、估值约 8520 亿美元；英伟达、软银各追加 100 亿美元（累计各 300 亿）、亚马逊完成 500 亿美元投资，三者合计出资约九成（[新浪财经](https://finance.sina.com.cn/tech/digi/2026-10-02/doc-initvazm5903419.shtml)，源自 The Information）

📅 约 10/01-03（10/09 生效）| [API 变化] Google 宣布调整 Gemini 分级权限，免费用户 10 月 9 日起仅能使用最弱模型 Flash-Lite，5 美元/月订阅档也被锁定无法使用 Pro（[The Decoder](https://the-decoder.com/googles-new-gemini-tiers-cut-free-users-to-its-weakest-model-and-lock-5-month-subscribers-out-of-pro/)）

📅 10/03 | [人事/安全] OpenAI 安全系统团队负责人 David Robinson 离职并公开批评行业发展方式，同期 3 名员工因泄密被解雇，内部安全团队动荡持续（[新浪财经](https://finance.sina.com.cn/tech/digi/2026-10-03/doc-initwzsp5047325.shtml)、[21财经](https://21jingji.com/article/20261003/herald/cf5d595c4da9785785e311377b20fd31.html)）

📅 10/03 | [产品/基建·国内] DeepSeek 新一轮扩招弹性计算团队，重点招募资深工程师强化 Agent 与推理算力基建（[量子位](https://www.qbitai.com/2026/10/501381.html)）

📅 10/04 | [并购] Nebius 以 1 亿-1.5 亿美元收购以色列 AI 初创公司 Inferize，通过 GPU 快照等技术降低推理空闲成本、强化 Token Factory 推理堆栈（[Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/nvidia-backed-nebius-acquires-inferize-124902034.html)）

---

## 【模块六】中文社区热点

**话题：Gemini 4 Argon 发布引发"刷榜"质疑**
- 为什么热：Google 发布号称追平 GPT-6 Astra 的旗舰模型，跑分屠榜、价格仅为对手一半、输出 token 数创纪录，迅速引爆讨论
- 主要观点分歧：一方认为基准测试全面胜出证明 Google 重回第一梯队；另一方（包括据称的内部员工）质疑其"做题家"属性，实战编程/安全等场景表现与跑分不符，怀疑存在"刷榜"优化，Google 官方对此辟谣
- 代表性内容：[IT之家报道](https://www.ithome.com/1/008/982.htm)、[知乎讨论](https://zhuanlan.zhihu.com/p/2088954831511745997)

**话题：OpenAI 安全风波——模型"过强"暂停发布+安全团队负责人离职泄密门**
- 为什么热：一周内 OpenAI 连续发生两件安全相关大事——先是因新模型能力过强而暂停训练发布，随后安全系统团队负责人 David Robinson 离职并公开批评行业做法，同时 3 名员工因泄密被开除，叠加此前的 AI 失控事件报道，引发对 OpenAI 内部治理与 AGI 竞速安全性的集中讨论
- 主要观点分歧：一方认为这是 OpenAI 在真实感知到模型风险后负责任的收缩与整顿；另一方认为"模型太强而暂停"更像是制造稀缺感的营销叙事，安全负责人离职+裁员泄密则暴露内部管理混乱、安全让位于竞速压力
- 代表性内容：[量子位：OpenAI 因新模型太强叫停发布](https://www.qbitai.com/2026/09/499140.html)、[新浪财经：安全系统团队负责人辞职](https://finance.sina.com.cn/tech/digi/2026-10-03/doc-initwzsp5047325.shtml)

**话题：何恺明团队新作——"看猫片"自监督预训练解 ARC 挑战**
- 为什么热：何恺明团队提出用大规模猫片等自然视频做自监督预训练编码器，意外在 ARC（抽象推理）挑战上取得不错表现，被认为是用低成本数据+预训练范式挑战"推理必须靠精心构造的符号/逻辑数据"的主流做法，算法研究圈讨论度高
- 代表性内容：[量子位报道](https://www.qbitai.com/2026/10/499812.html)

**话题：GPT-6 对创业公司护城河的冲击——3D 模型公司成讨论案例**
- 为什么热：一家 3D 模型创业公司（Meshy）不到两年 ARR 翻百倍、突破 1 亿美元，却被讨论"随时可能被 GPT-6 这类通用大模型吃掉"，再次引爆"超级模型会不会吞掉所有垂类应用"的焦虑式讨论
- 主要观点分歧：一方认为垄断级基座模型终将覆盖绝大多数垂类场景，创业公司的护城河只是时间问题；另一方认为专业工具在工作流深度、数据与用户习惯上仍有壁垒，通用模型短期难以完全替代
- 代表性内容：[量子位报道](https://www.qbitai.com/2026/10/501451.html)

---

## 【模块七】本周实用工具推荐

**Claude Code Mods**（[claude.com/blog/claude-code-mods](https://claude.com/blog/claude-code-mods)）
- 解决什么问题：Claude Code 原本行为固定，Mods 允许用 TypeScript 编写小函数来重写提示词、增加自定义 UI、替换内置功能或新增全新能力（如 CI/CD 状态展示、生产环境安全护栏、审计日志），相当于给 Claude Code 装"插件系统"
- 如何快速上手：① 在 CLI 中用 `/plugin` 命令从 Claude 插件目录安装别人写好的 mod；② 也可以让 Claude Code 按官方入门指南帮你写一个自定义 mod 并自动安装
- 适合：开发者（尤其是需要团队定制规范、企业合规控制的工程团队）
- 费用：功能随 Claude Code CLI/桌面版现有访问权限提供，未单独收费；注意 Mods 不运行在沙箱中，拥有完整机器权限，务必只装可信来源
- 发布时间：2026 年 10 月 1-2 日（本周新发布）

**OpenAI Dots**（[openai.com/index/introducing-dots](https://openai.com/index/introducing-dots/)）
- 解决什么问题：传统 AI 助手需要用户每次主动提问才工作，Dots 是基于 GPT-6 Astra 的"常驻"智能体，关闭对话窗口后仍能持续在云端环境里监控项目、使用软件、响应变化
- 如何快速上手：① 在 ChatGPT（网页/移动端）中找到 Dots 入口，设定一个目标任务；② 可选接入其插件生态（4000+ 应用）或通过 Slack/Microsoft Teams 协作
- 适合：两者皆可（开发者可用于处理 issue/PR，非技术用户可用于市场文案同步、销售资料整理等）
- 费用：Pro 和 Business Premium 用户第一个 Dot 免费包含；追加 Dot 及专项智能体定价官方未公布
- 发布时间：2026 年 9 月 29 日 OpenAI DevDay 发布（本周新发布）

**Perplexity Fast Search（Agent API）**（[docs.perplexity.ai/docs/resources/changelog](https://docs.perplexity.ai/docs/resources/changelog)）
- 解决什么问题：构建 AI 搜索/Agent 应用时网页搜索调用成本和延迟是痛点，Fast Search 同时降低延迟和成本
- 如何快速上手：① 调用 Perplexity Agent API 时将参数设为 `search_type: "fast"`；② 原有 fast 预设也已自动切换为该选项，无需改动其他代码即可生效
- 适合：开发者（构建搜索类 Agent/RAG 应用）
- 费用：按调用计费，每千次调用由 2.50 美元降至 1.00 美元；平台本身有免费额度，Agent API 为按量付费

**ChatGPT Finances**（[help.openai.com](https://help.openai.com/en/articles/20001222-finances-in-chatgpt)）
- 解决什么问题：面向普通消费者的个人理财助手，可连接银行/信用卡账户做支出分析、找出被遗忘的订阅、制定还债计划，并解释信用分影响因素
- 如何快速上手：① 在 ChatGPT 中点击 Finances 入口或输入"@Finances"并选择"connect my accounts"；② 通过 Plaid 登录银行/信用卡账户（可选再连接 Experian 征信报告）
- 适合：非技术用户（个人理财场景）
- 费用：完全免费，已向美国 Free 和 Go 用户推出；涉及银行账户连接，公用设备用户建议使用临时聊天模式
- 发布时间：2026 年 10 月 2 日向 Free/Go 用户推广（本周更新，原功能 5 月已上线）

**GLM Coding Plan（智谱）**（[bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding)）—持续推荐，本周有订阅调价
- 解决什么问题：国产大模型版"Claude Code 平替"，可在 Claude Code/Cursor 等主流编程 Agent 工具中直接切换使用 GLM 系列模型，适合希望用国产模型做 AI 编程、对合规/成本敏感的国内开发者
- 如何快速上手：① 在 bigmodel.cn 开通 GLM Coding Plan 套餐并获取 API Key；② 在 Claude Code/Cursor 等工具的模型配置中填入该 Key 即可切换使用
- 适合：开发者
- 费用：免费额度+付费订阅，2026 年 10 月智谱将套餐改为"完全透明积分制"，新套餐起价 118 元/月（活动期内包年/包季享 7-8 折），具体以官网实时定价为准

---

## 数据源与生成说明

- **报告生成时间**：2026-10-05
- **论文 arXiv ID 覆盖范围**：2609.28870 – 2610.02199（本月 2610 + 上月 2609）
- **主要数据来源**：Hugging Face Daily Papers、arXiv（cs.CL/cs.AI/cs.LG/cs.CV/cs.RO）、GitHub Trending 及各项目主页、OpenAI/Anthropic/Google DeepMind/xAI/Meta/Mistral 官方博客、DeepSeek/Qwen/文心/Kimi/GLM/MiniMax/01.ai/豆包/混元各厂商官网、量子位、新浪财经、21财经、Bloomberg、CNBC、TechCrunch、Yahoo Finance、The Decoder、IT之家、知乎
- **数据截止时间**：2026-10-05（协调世界时上午）

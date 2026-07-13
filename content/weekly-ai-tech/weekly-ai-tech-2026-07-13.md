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

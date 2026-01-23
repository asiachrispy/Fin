## Skill 实战分享

### P1｜封面
Agent Skills 内部实战分享
让 AI Agent 真正“会干活”的方法
- 分享人：CTO
- 适用对象：IT / 研发 / AI 团队
- 目标：把“经验 & 规范”变成 Agent 可复用能力
我们不是教大家“写 Prompt”，而是教大家把经验沉淀成资产

---
### P2｜我们现在用 AI 的真实问题
现状痛点（真实场景）
- Prompt 每个人都不一样
- AI 输出不稳定、不可复现
- 新同事 ≠ 老同事的经验
- AI 会写代码，但不懂我们的业务
💡 关键一句话：
AI 很聪明，但它不知道我们公司是怎么干活的

---
### P3｜什么是 Agent Skills（一句话版）
什么是 Agent Skills？
Agent Skills = 可被 Agent 调用的“工作说明书”
它不是模型能力，而是：
- 📦 结构化的业务知识
- 📜 标准化的操作流程
- 🧠 可复用的团队经验

---
### P4｜Agent Skills 解决了什么问题
Agent Skills 能解决什么？
- 让 AI 按我们的方法做事
- 把个人经验 → 团队资产
- Prompt 从“聊天”升级为“能力模块”
- 不同 Agent / 工具 通用

---
### P5｜一个 Skill 的本质结构
一个 Skill 里面有什么？
一个 Skill = 一个文件夹：
- SKILL.md（核心）
- 示例 / 模板
- 可选：脚本、工具说明、API 约定
👉 核心永远是：SKILL.md

---
### P6｜SKILL.md 最小结构（重点）
SKILL.md 最小必备结构
1. Skill 是干嘛的
2. 适用场景
3. 使用前提（输入）
4. 执行步骤（流程）
5. 输出格式（必须明确）
6. 约束 & 注意事项
你可以强调：
没有输出格式 = 不叫 Skill

---
### P7｜实战示例：代码审查 Skill
（这里和你前面「跨境电商 ERP 代码审查」强相关，非常加分）
实战示例：代码审查 Skill
Skill 名称：code_review
能力：
- 统一代码审查标准
- 自动输出评分（0–100）
- 给出风险 & 修改建议
适用：
- PR Review
- 架构评审
- 新人代码检查

---
### P8｜Skill 的执行流程示意
Skill 是如何被 Agent 使用的？
1️⃣ Agent 接到任务
2️⃣ 判断：是否需要某个 Skill
3️⃣ 加载 Skill 内容
4️⃣ 严格按 Skill 步骤执行
5️⃣ 按 Skill 规定格式输出
你可以类比：
Skill ≈ Agent 的 SOP

---
### P9｜在 Claude / Cursor 中怎么用
在现有工具中如何用 Skill？
通用做法：
- 把 Skill 文件夹加入项目
- 在对话中声明：
- “使用 skill: xxx 执行任务”
Claude / Cursor 都已支持
👉 不是未来，是现在

---
### P10｜团队内推荐的 Skill 类型
我们团队最值得先做的 Skill
优先级建议：
1️⃣ 代码审查 / 架构评估
2️⃣ 需求拆解 / 技术方案模板
3️⃣ 数据分析 / 报表生成
4️⃣ 运维 / 排障 SOP
5️⃣ 文档 & 规范自动生成

---
### P11｜Skill vs Prompt 的区别
Skill ≠ Prompt

Prompt	    Skill
一次性	    可复用
随意	    有结构
不可控	    可评估
属于个人	    属于团队

---
### P12｜落地方式（非常关键）
我们内部如何落地？
建议机制：
- 建立 skills/ 仓库
- 每个 Skill 有 Owner
- Skill 版本化（v1 / v2）
- 新项目 必须优先用 Skill

---
### P13｜Agent Skills vs Spec-Kit（核心区别）
Agent Skills vs Spec-Kit：不是对立，而是分工
一句话区分：
- Agent Skills：教 Agent「怎么干活」
- Spec-Kit：教人和 Agent「怎么把活拆清楚」
它们解决的是 不同阶段的问题

---
### P14｜详细对比表（团队最容易理解）
Agent Skills vs Spec-Kit 对比表
暂时无法在飞书文档外展示此内容

---
### P15｜两者如何组合使用（强烈推荐）
推荐组合用法（我们内部最佳实践）
👉 Spec-Kit 在前，Agent Skills 在后
流程示例：
1️⃣ 用 Spec-Kit
- 把需求拆清楚
- 明确目标、约束、验收标准
2️⃣ 用 Agent Skills
- 按既定规范执行
- 自动化产出结果
- 保证质量一致性

---
### P16｜一句 CTO 级总结（收尾非常稳）
Spec-Kit 决定：做什么、为什么做
Agent Skills 决定：怎么稳定地把事做完
两者结合，AI 才真正进入「工程化」

---
### P17｜团队行动清单
每个技术小组：
- 本周：提交 1 个 Skill
- 下周：在真实任务中使用

---
### P18｜总结
Agent 的上限 ≠ 模型能力
Agent 的上限 = 我们给它多少 Skills

---

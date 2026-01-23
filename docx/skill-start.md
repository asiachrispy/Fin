# VibeCode


## create a skill

```
skill-name/            <-- 根目录（名字要规范，下面细说）
├── SKILL.md           # 【必须】核心文件！没它不行
├── scripts/           # 【可选】放代码脚本（Python/Bash等）
├── references/        # 【可选】放参考文档（大段文字放这）
└── assets/            # 【可选】放图片、模版、数据表

```
---

### SKILL.md

```
---
name:pdf-processing
description:提取PDF文本和表格，填写表单，合并文档。当用户提到PDF处理时使用。
license:Apache-2.0
metadata:
author:your-name
version:"1.0"
---

# 技能标题

## 第一步：准备工作
这里写准备步骤...

## 第二步：核心操作
1. 如果用户要提取表格，运行 `scripts/extract.py`
2. 引用文件要这样写：[查看参考文档](references/guide.md)

## 常见问题
如果报错了怎么办...

```

---


## ⚠️ 避坑指南（重点考点）：
1. name（名字）：
只能用： 小写字母（a-z）、数字、连字符（-）。
千万别用： 大写字母、下划线、空格。
长度： 最长 64 个字符。
例子： ✅ data-analysis | ❌ Data_Analysis

2. description（描述）：
作用： 它是写给 AI 看的“自荐信”。AI 会根据这句话判断“我是不是该用这个技能”。
怎么写： 既要说清楚“能干啥”，也要说清楚“啥时候用”。
长度： 最长 1024 个字符。
例子：❌ “处理 PDF。”（太短，AI 容易忽略）✅ “从 PDF 提取文本和表格。当用户需要分析文档或合并文件时使用。”

3. compatibility（兼容性 - 选填）：
如果你这技能必须联网，或者必须要在装了 Docker 的电脑上跑，就在这写清楚。普通技能一般不需要写。

4、官方建议的“省流”技巧：
如果你的说明书特别长（超过 500 行），千万别全塞在 SKILL.md 里！把详细的表格格式、行业术语解释，扔到 references/ 文件夹里，然后在正文里加个链接引用它。这样 AI 脑子更清醒，反应也更快。

5、就是**“按需取用”**。
AI 处理你的技能是分三步走的：
第一眼（Metadata）：启动时，AI 只看 name 和 description。所以这俩一定要写得精准！
细看（Instructions）：确定要用这个技能了，AI 才会加载 SKILL.md 的全文。
动手（Resources）：只有当 SKILL.md 里说“去运行那个脚本”或者“去查那个文档”时，AI 才会去加载 scripts/ 或 references/ 里的文件。
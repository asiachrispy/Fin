# OpenCode 技能系统使用指南

## 技能包调用方式

### 方式 1：使用 /skill 命令（推荐）

OpenCode 的标准技能调用方式是通过 `/skill` 命令：

```bash
/skill <skill-name>
```

**示例**：
```bash
# 调用产品经理技能包
/skill product-spec-builder

# 调用 UI 提示词生成器
/skill ui-prompt-generator

# 调用全栈开发工程师
/skill dev-builder

# 调用 UI/UX 设计智能
/skill ui-ux-pro-max

# 调用 AI 开发流程主控
/skill ai-workflow-controller
```

### 方式 2：通过主控调用

通过主控技能包的指令路由：

```bash
# 先调用主控
/skill ai-workflow-controller

# 然后在对话中使用指令
/prd
/ui
/dev
```

### 方式 3：直接使用指令（需要配置）

如果想要直接使用 `/prd`、`/ui`、`/dev` 等指令，需要在 OpenCode 的配置文件中添加指令别名映射。

**配置示例**（假设有这样的配置文件）：
```json
{
  "commandAliases": {
    "/prd": "product-spec-builder",
    "/ui": "ui-prompt-generator",
    "/dev": "dev-builder"
  }
}
```

**注意**：OpenCode 可能不支持这样的配置，需要使用方式 1 或方式 2。

---

## 当前可用的技能包

| 技能包名称 | 目录路径 | 指令调用 |
|-----------|---------|---------|
| product-spec-builder | `.claude/skills/product-spec-builder/` | `/skill product-spec-builder` |
| ui-prompt-generator | `.claude/skills/ui-prompt-generator/` | `/skill ui-prompt-generator` |
| dev-builder | `.claude/skills/dev-builder/` | `/skill dev-builder` |
| ui-ux-pro-max | `.claude/skills/ui-ux-pro-max/` | `/skill ui-ux-pro-max` |
| ai-workflow-controller | `.claude/skills/ai-workflow-controller/` | `/skill ai-workflow-controller` |
| code-reviewer | `.claude/skills/code-reviewer/` | `/skill code-reviewer` |
| code-simplifier | `.claude/skills/code-simplifier/` | `/skill code-simplifier` |

---

## 推荐使用流程

### 0-1 模式（新建项目）

```bash
# 1. 生成产品需求文档
/skill product-spec-builder

# 2. 生成 UI 提示词
/skill ui-prompt-generator

# 3. 开发代码
/skill dev-builder

# 4. 运行项目
# 手动运行项目（npm run dev, python app.py 等）

# 5. 检查完整度
# 手动对照 Product-Spec.md 检查
```

### 迭代模式（已有项目）

```bash
# 1. 更新产品文档
/skill product-spec-builder

# 2. 更新代码
/skill dev-builder

# 3. 运行项目
# 手动运行项目
```

---

## 通过主控使用（推荐）

如果你想要更自动化的流程，可以通过主控技能包：

```bash
# 1. 调用主控
/skill ai-workflow-controller

# 2. 在对话中，主控会根据你的输入自动调用相应的技能包
```

**示例对话**：

```
你：/prd

主控：检测到 /prd 指令
     正在调用 product-spec-builder...
     [产品经理开始工作]

你：/ui

主控：检测到 /ui 指令
     正在调用 ui-prompt-generator...
     [UI 提示词生成器开始工作]

你：/dev

主控：检测到 /dev 指令
     正在调用 dev-builder...
     [全栈开发工程师开始工作]
```

---

## 为什么找不到 `/prd` 等指令？

### 原因 1：OpenCode 技能系统不支持指令别名

OpenCode 的技能系统可能只支持 `/skill <name>` 格式，不支持自定义指令别名。

### 原因 2：需要先加载主控

`/prd`、`/ui`、`/dev` 等指令是由主控（ai-workflow-controller）处理的，需要先调用主控。

### 原因 3：配置文件缺失

如果 OpenCode 支持指令别名配置，可能缺少配置文件。

---

## 解决方案

### 方案 A：使用 /skill 命令（最简单）

```bash
/skill product-spec-builder      # 代替 /prd
/skill ui-prompt-generator       # 代替 /ui
/skill dev-builder              # 代替 /dev
```

### 方案 B：通过主控使用

```bash
/skill ai-workflow-controller

# 然后在对话中使用
/prd
/ui
/dev
```

### 方案 C：创建指令别名（如果支持）

如果 OpenCode 支持指令别名配置，可以创建配置文件。

**检查 OpenCode 是否支持**：
1. 查看OpenCode文档
2. 查看是否有配置文件（如 `oh-my-opencode.json`）
3. 如果不支持，使用方案 A 或 B

---

## 快速参考

### 常用命令

| 功能 | 命令 |
|------|------|
| 生成产品文档 | `/skill product-spec-builder` |
| 生成 UI 提示词 | `/skill ui-prompt-generator` |
| 开发代码 | `/skill dev-builder` |
| UI/UX 设计 | `/skill ui-ux-pro-max` |
| 代码审查 | `/skill code-reviewer` |
| 代码简化 | `/skill code-simplifier` |

### 主控指令（通过 ai-workflow-controller）

| 指令 | 功能 | 等价命令 |
|------|------|---------|
| `/prd` | 需求收集 | `/skill product-spec-builder` |
| `/ui` | 生成 UI 提示词 | `/skill ui-prompt-generator` |
| `/dev` | 开发代码 | `/skill dev-builder` |
| `/run` | 本地运行 | 手动运行 |
| `/check` | 完整度检查 | 手动检查 |
| `/status` | 查看进度 | 查看 Product-Spec.md |

---

## 总结

**当前可用的调用方式**：
- ✅ `/skill <name>` - OpenCode 标准方式，推荐使用
- ✅ `/skill ai-workflow-controller` + 指令 - 通过主控使用

**目前不支持**：
- ❌ 直接使用 `/prd`、`/ui`、`/dev` 等指令（除非 OpenCode 支持指令别名）

**推荐**：
- 使用 `/skill product-spec-builder` 代替 `/prd`
- 使用 `/skill ui-prompt-generator` 代替 `/ui`
- 使用 `/skill dev-builder` 代替 `/dev`

如果想要更便捷的体验，可以通过 `/skill ai-workflow-controller` 调用主控，然后在对话中使用简化指令。

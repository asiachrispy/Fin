# 文档指南

## 📚 核心文档

1. **DATA-PROTOTYPE-WORKFLOW.md** - 完整工作流程指南
2. **DATA-PROTOTYPE-QUICKSTART.md** - 快速启动模板

## 🛠️ 专用 SKILL

### 快速产品经理（推荐用于需求收集）
- **名称**：`quick-product-manager`
- **用途**：快速生成需求方案，一次性输出完整规划
- **优势**：1-2 轮对话完成，2-5 分钟完成需求定义

### 数据报表原型构建专家
- **名称**：`data-prototype-builder`
- **用途**：基于需求方案快速创建交互式原型
- **优势**：懂数据报表场景，提供测试数据

### UI/UX 设计智能工具
- **名称**：`ui-ux-pro-max`
- **用途**：创建美观的 UI 组件
- **优势**：专业视觉设计，响应式布局

---

## 📁 代码模板

### 目录结构
```
data-prototype-templates/
├── lib/
│   ├── types.ts           # TypeScript 类型定义
│   ├── utils.ts           # 工具函数（格式化）
│   └── mock-data.ts       # 测试数据生成器
└── components/
    ├── StatCard.tsx       # 指标卡片
    ├── TrendChart.tsx      # 趋势图表（折线）
    ├── BarChartComponent.tsx # 对比图表（柱状）
    └── DataDashboard.tsx  # 完整看板示例
```

---

## 🚀 团队使用方式

### 步骤 1：培训团队
给团队介绍以下文档：
1. 阅读 `DATA-PROTOTYPE-WORKFLOW.md`（了解完整流程）
2. 阅读 `DATA-PROTOTYPE-QUICKSTART.md`（快速上手）
3. 阅读 `QUICK-PRODUCT-MANAGER-GUIDE.md`（了解快速产品经理）

### 步骤 2：数据产品经理（DPM）快速创建需求

**推荐方式**：使用 `quick-product-manager`（快速、高效）

```bash
/skill quick-product-manager

# 描述你的需求（简单描述即可，AI 会主动推断）
"我需要一个销售数据看板，展示最近30天的销售趋势、
关键指标（总销售额、订单量、转化率）、分类对比图表
和详细数据表格，支持导出功能"
```

**预期结果**：
- AI 会在 1-2 轮对话中给出完整方案
- 包含：MVP 功能、增强功能、页面结构、数据结构、技术栈建议
- 耗时：2-5 分钟

**替代方式**：使用 `product-spec-builder`（适合复杂需求）
```bash
/skill product-spec-builder

# 适用于高复杂度或有严格合规要求的需求
```

### 步骤 3：数据开发人员快速实现原型

**快速方式**：使用 `data-prototype-builder`（专用技能）

```bash
/skill data-prototype-builder

# 告诉 AI：基于刚才的需求方案，创建原型
"基于刚才生成的需求方案，创建一个完整的销售数据看板原型，
使用 Next.js + shadcn/ui + Recharts，包含测试数据"
```

**替代方式**：使用 `ui-ux-pro-max`（通用 UI 开发）
```bash
/skill ui-ux-pro-max

# 描述具体 UI 需求
"创建一个数据看板页面，展示销售趋势图和关键指标卡片"
```

### 步骤 4：使用模板快速开始（可选）

```bash
# 1. 创建 Next.js 项目
npx create-next-app@latest my-dashboard --typescript --tailwind --app --yes

# 2. 安装依赖
npm install recharts dayjs framer-motion papaparse lucide-react
npx shadcn-ui@latest init -y

# 3. 复制模板文件
# 复制 data-prototype-templates/ 到项目目录

# 4. 运行
npm run dev
```

---

## 📋 推荐使用 SKILL 方式

| 场景 | 推荐方式 | 原因 |
|-------|----------|------|
| 需求收集（快速） | **quick-product-manager** | 1-2 轮对话，2-5 分钟 |
| 需求收集（复杂） | **product-spec-builder** | 标准化文档，严格合规 |
| 原型实现 | **data-prototype-builder** | 专用技能，懂数据报表场景 |
| UI 组件开发 | **ui-ux-pro-max** | 专业视觉设计 |
| 代码优化 | **code-simplifier** | 提高代码质量 |

---

## 🎯 data-prototype-builder 技能的优势

与通用技能相比，这个专用技能具有：

### 1. 场景专业化
- 专门针对数据报表场景
- 预设常见报表类型模板（看板、分析、监控）
- 提供测试数据生成方法

### 2. 技术栈锁定
- Next.js 14 (App Router)
- shadcn/ui
- Recharts
- 避免团队学习多种框架
- 易于交付给前端团队

### 3. 交互功能模板
- 日期范围筛选
- 数据排序
- 下钻功能
- 导出 CSV/Excel

### 4. 完整交付标准
- 提供测试数据
- 提供运行指南
- 提供前端交接文档

---

## 📊 典型项目示例

### 示例 1：销售数据看板（已有模板）

**快速方式**：
```bash
# 步骤 1：快速需求定义
/skill quick-product-manager
"我需要创建一个销售数据看板，展示最近30天的销售趋势、
关键指标（总销售额、订单量、转化率、客单价）、
对比图表（分类、地区）和详细数据表格，支持导出"

# 步骤 2：原型实现
/skill data-prototype-builder
"基于刚才生成的需求方案，创建完整的销售数据看板原型"
```

### 示例 2：用户活跃度分析

**快速方式**：
```bash
# 步骤 1：快速需求定义
/skill quick-product-manager
"我需要创建一个用户活跃度分析报表，展示日活(DAU)、周活(WAU)、
留存率、平均会话时长，需要7天、30天、90天的趋势对比，
还要热力图展示用户24小时活跃分布"

# 步骤 2：原型实现
/skill data-prototype-builder
"基于刚才的需求方案，创建用户活跃度分析原型"
```

### 示例 3：订单状态监控

**快速方式**：
```bash
# 步骤 1：快速需求定义
/skill quick-product-manager
"我需要创建一个订单状态监控看板，展示待发货、运输中、
异常、已完成等状态，有订单趋势图和详细订单列表，
支持自动刷新（每30秒）"

# 步骤 2：原型实现
/skill data-prototype-builder
"基于刚才的需求方案，创建订单状态监控原型"
```

---

## 🔄 与前端团队的协作流程

### 快速流程（推荐）

```
数据产品经理 (DPM)
    ↓ /skill quick-product-manager（2-5 分钟）
    完整需求方案（MVP + 增强功能 + 技术栈）
    ↓
数据开发人员
    ↓ /skill data-prototype-builder（5-10 分钟）
    原型 + 测试数据 (可交互的前端)
    ↓
前端开发人员
    ↓ 实现 API + 接入真实数据
    生产环境报表

总耗时：7-15 分钟（vs 传统方式 30-45 分钟）
```

### 传统流程（复杂需求）

```
数据产品经理 (DPM)
    ↓ /skill product-spec-builder（10-20 分钟）
    Product-Spec.md (详细需求文档）
    ↓
数据开发人员
    ↓ /skill data-prototype-builder
    原型 + 测试数据
    ↓
前端开发人员
    ↓ 实现 API + 接入真实数据
    生产环境报表
```

---

## 📁 项目结构建议

建议在团队中建立标准化项目模板：

```
data-dashboard-templates/
├── sales-dashboard/        # 销售看板模板
├── user-analytics/          # 用户分析模板
├── order-monitoring/        # 订单监控模板
└── content-insights/        # 内容洞察模板
```

---

## 📌 总结

| 问题 | 解决方案 |
|------|----------|
| 如何帮助团队快速使用 AI？ | 使用 **quick-product-manager** + **data-prototype-builder** + 专用文档 |
| 快速需求收集用什么技能？ | **quick-product-manager**（2-5 分钟 vs 传统 15-30 分钟） |
| 复杂需求收集用什么技能？ | **product-spec-builder**（标准化、严格） |
| 原型实现用什么技能？ | **data-prototype-builder**（专用、懂数据报表） |
| 如何快速上手？ | 阅读 DATA-PROTOTYPE-QUICKSTART.md |
| 如何标准化技术栈？ | 使用 data-prototype-builder（锁定 Next.js + shadcn/ui） |

**关键优势**：
- 🚀 快速：需求定义从 15-30 分钟缩短到 2-5 分钟
- 📋 完整：一次性输出完整方案，不是逐个问题
- 🎯 专业：data-prototype-builder 懂数据报表场景
- 🔧 易交付：标准化技术栈，前端团队可直接接手

已为你创建了完整的解决方案，团队可以直接开始使用！

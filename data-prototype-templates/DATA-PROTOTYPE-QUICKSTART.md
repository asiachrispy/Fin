# 数据报表原型 - 快速启动模板

这是一个预配置的数据报表原型模板，帮助数据团队快速创建交互式报表。

---

## 快速开始

### 1. 创建新项目

```bash
# 使用模板创建项目
npx create-next-app@latest my-data-dashboard \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes

cd my-data-dashboard
```

### 2. 安装依赖

```bash
# UI 组件
npx shadcn-ui@latest init -y

# 图表和工具
npm install recharts dayjs framer-motion papaparse lucide-react

# 类型（可选）
npm install -D @types/papaparse
```

### 3. 安装 shadcn/ui 组件

```bash
npx shadcn-ui@latest add card button select input dropdown-menu table badge
npx shadcn-ui@latest add separator dialog calendar popover
```

### 4. 复制模板文件

```bash
# 创建组件目录
mkdir -p app/dashboard/components
mkdir -p lib

# 复制本仓库的模板文件
# (见下文模板文件列表）
```

### 5. 运行项目

```bash
npm run dev
```

访问：http://localhost:3000/dashboard

---

## 项目结构

```
my-data-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # 报表主页面
│   │   └── components/
│   │       ├── StatCard.tsx   # 指标卡片
│   │       ├── TrendChart.tsx  # 趋势图表
│   │       ├── DataFilter.tsx  # 筛选器
│   │       ├── DataTable.tsx   # 数据表格
│   │       └── ExportButton.tsx # 导出按钮
│   └── layout.tsx
├── lib/
│   ├── mock-data.ts          # 测试数据
│   └── utils.ts             # 工具函数
└── public/
```

---

## 使用 AI 辅助开发

### 方式 1：快速工作流程（推荐）

```bash
# 步骤 1：快速需求定义
/skill quick-product-manager

# 描述你的需求
"我需要创建一个销售数据看板，展示最近30天的销售趋势、订单量和转化率"

# AI 会在 1-2 轮对话中给出完整方案
# 确认方案后，进入下一步

# 步骤 2：原型实现
/skill data-prototype-builder

# 告诉 AI：
"基于刚才生成的需求方案，创建完整的销售数据看板原型"
```

**优势**：
- 🚀 需求定义：2-5 分钟完成（vs 传统 15-30 分钟）
- 🎯 一次性方案：不是逐个问题追问
- 📋 完整规划：MVP + 增强功能 + 技术栈

### 方式 2：传统工作流程

```bash
# 适合复杂需求或有严格合规要求的场景
/skill product-spec-builder
# 详细描述需求...（10-15 轮对话）

/skill data-prototype-builder
# 基于 Product-Spec.md 生成原型
``````bash
/skill ui-ux-pro-max

# 描述需求
"创建一个数据看板页面，使用 Next.js + shadcn/ui + Recharts
展示销售趋势图和关键指标卡片"
```

---

## 常见报表类型

### 1. 销售数据看板

**核心指标**：
- 总销售额
- 订单数量
- 转化率
- 客单价

**图表类型**：
- 折线图：销售趋势
- 柱状图：分类对比
- 表格：详细数据

**交互功能**：
- 日期范围筛选
- 分类筛选
- 数据排序
- 导出 CSV

---

### 2. 用户活跃度分析

**核心指标**：
- 日活用户 (DAU)
- 周活用户 (WAU)
- 留存率
- 平均会话时长

**图表类型**：
- 折线图：活跃度趋势
- 热力图：时间分布
- 表格：用户列表

**交互功能**：
- 时间范围切换（日/周/月）
- 用户类型筛选
- 数据下钻

---

### 3. 订单状态监控

**核心指标**：
- 待发货订单
- 运输中订单
- 异常订单
- 已完成订单

**图表类型**：
- 状态卡片：数量统计
- 折线图：订单趋势
- 表格：订单明细

**交互功能**：
- 状态筛选
- 订单号搜索
- 自动刷新

---

### 4. 内容数据分析

**核心指标**：
- 浏览量 (PV)
- 访客量 (UV)
- 停留时长
- 跳出率

**图表类型**：
- 折线图：流量趋势
- 饼图：内容分布
- 表格：内容列表

**交互功能**：
- 时间范围
- 内容类型筛选
- 排序方式

---

## 测试数据生成

### 简单测试数据（硬编码）

```typescript
// lib/mock-data.ts
export const salesData = [
  {
    date: '2026-01-01',
    revenue: 125000,
    orders: 450,
    conversion: 3.6,
    category: '电子产品',
  },
  {
    date: '2026-01-02',
    revenue: 138000,
    orders: 480,
    conversion: 3.5,
    category: '电子产品',
  },
  // ... 更多数据
];
```

### 动态生成测试数据

```typescript
// lib/mock-data.ts
export const generateSalesData = (days: number = 30) => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: dayjs(date).format('YYYY-MM-DD'),
      revenue: Math.floor(Math.random() * 50000) + 100000,
      orders: Math.floor(Math.random() * 200) + 300,
      conversion: parseFloat((Math.random() * 2 + 2).toFixed(1)),
      category: ['电子产品', '服装', '家居', '食品'][Math.floor(Math.random() * 4)],
    });
  }

  return data.reverse();
};
```

---

## 部署原型

### 本地预览

```bash
npm run dev
```

### 部署到 Vercel（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 部署到 Netlify
## 🔥 快速开始示例

### 示例 1：销售数据看板（快速方式）

```bash
# 1. 快速需求定义（2-5 分钟）
/skill quick-product-manager

"我需要一个销售数据看板，展示最近30天的销售趋势、订单量和转化率"

# AI 会给出完整方案：
# - MVP 功能：时间筛选、指标卡片、趋势图、数据表格
# - 页面结构：看板主页 + 详细报表页
# - 技术栈：Next.js + shadcn/ui + Recharts

# 2. 确认方案后快速原型开发（5-10 分钟）
/skill data-prototype-builder

"基于刚才生成的需求方案，创建完整的销售数据看板原型"

# 3. 运行原型
npm run dev
```

### 示例 2：用户活跃度分析（传统方式）

```bash
# 1. 详细需求定义（10-20 分钟）
/skill product-spec-builder

"我需要创建一个用户活跃度分析报表，展示日活、周活、留存率等指标"

# AI 会逐个问题追问细节

# 2. 原型开发
/skill data-prototype-builder

# 3. 运行原型
npm run dev
```

## ⚡ 效率对比

| 方式 | 需求定义时间 | 对话轮次 | 适合场景 |
|------|-------------|---------|---------|
| **快速方式**（推荐） | **2-5 分钟** | **1-2 轮** | 数据报表、MVP、快速原型 |
| 传统方式 | 10-30 分钟 | 5-15 轮 | 复杂需求、严格合规 |

## 📋 推荐流程

**数据团队建议流程**：

```
数据产品经理 (DPM)
    ↓ 使用 /skill quick-product-manager
    快速生成需求方案（2-5 分钟）
    ↓
数据开发人员
    ↓ 使用 /skill data-prototype-builder
    创建可交互原型（5-10 分钟）
    ↓
前端/后端人员
    ↓ 接入真实数据
    生产环境报表
```

**选择建议**：
- ✅ 简单/中等复杂度需求：使用 **quick-product-manager**
- ⚠️ 高复杂度/关键业务需求：使用 **product-spec-builder**
---

## 与前端团队交接

### 交接清单

- [ ] 可运行的原型链接
- [ ] 测试数据文件
- [ ] 组件结构文档
- [ ] 数据接口需求文档
- [ ] 交互功能说明

### 接口需求示例

```markdown
## 数据接口需求

### 1. 获取销售数据

**接口**: `GET /api/sales`

**请求参数**:
```typescript
{
  startDate: string;  // YYYY-MM-DD
  endDate: string;    // YYYY-MM-DD
  category?: string;   // 分类筛选
}
```

**响应数据**:
```typescript
{
  success: boolean;
  data: {
    date: string;
    revenue: number;
    orders: number;
    conversion: number;
    category: string;
  }[];
}
```

### 2. 获取关键指标

**接口**: `GET /api/metrics`

**请求参数**: 同上

**响应数据**:
```typescript
{
  totalRevenue: number;
  totalOrders: number;
  avgConversion: number;
  avgOrderValue: number;
}
```
```

---

## 常见问题

### Q1：如何添加新的图表类型？

**A**：使用 `/skill data-prototype-builder` 告诉 AI 你的需求。

示例：
```
添加一个热力图组件，展示用户在不同时间段的活跃度
```

### Q2：如何优化大数据量性能？

**A**：
- 使用虚拟滚动（react-window）
- 实现分页
- 图表使用聚合数据

### Q3：如何实现多语言支持？

**A**：
```bash
npm install next-intl
```

### Q4：如何添加暗黑模式？

**A**：shadcn/ui 已内置暗黑模式支持。

```typescript
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider';

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

---

## 进阶功能

### 1. 数据下钻

点击图表 → 筛选表格数据 → 显示明细

### 2. 图表联动

修改筛选器 → 同时更新多个图表

### 3. 实时数据

使用 `setInterval` 模拟实时数据推送

### 4. 导出报告

生成 PDF/Excel 格式的完整报告

---

**模板版本**：1.0.0
**最后更新**：2026-01-21

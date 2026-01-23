# 数据报表原型开发工作流程指南

## 目标用户
- 数据产品经理（DPM）
- 数据开发人员

## 目标
快速创建带交互的数据报表原型，使用测试数据展示，不涉及后端接口开发。

---

## 工作流程

### 阶段 1：需求定义（数据产品经理）

**工具**：`/skill quick-product-manager`（推荐）或 `/skill product-spec-builder`（复杂需求）

**推荐使用 quick-product-manager**：快速响应，一次性输出完整方案，适合数据报表场景

**输入示例**：
```
我需要一个销售数据报表页面，展示：
- 时间范围：最近30天
- 核心指标：总销售额、订单量、转化率
- 交互：日期筛选器、数据下钻、导出功能
- 图表：折线图（趋势）、柱状图（对比）、表格（明细）
```

**输出**：
- `Product-Spec.md` - 需求文档
- `Product-Spec-CHANGELOG.md` - 变更记录

---

### 阶段 2：UI 设计参考（数据产品经理或设计协作）

**工具**：`/skill ui-prompt-generator`

**输入**：基于 `Product-Spec.md`

**输出**：
- `UI-Prompts.md` - 原型图提示词（可选，如需设计稿）

---

### 阶段 3：原型实现（数据开发人员）

**工具**：`/skill ui-ux-pro-max` + 手动补充

**技术栈推荐**：
```
前端框架：Next.js 14 (App Router)
UI 组件库：shadcn/ui
图表库：Recharts / Chart.js / Apache ECharts
数据处理：framer-motion (动画) / dayjs (日期)
模拟数据：硬编码 JSON 或 Faker.js
```

**实现步骤**：

#### 步骤 3.1：初始化项目
```bash
npx create-next-app@latest data-dashboard-prototype \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd data-dashboard-prototype
npx shadcn-ui@latest init -y
```

#### 步骤 3.2：安装依赖
```bash
npm install recharts dayjs lucide-react framer-motion
```

#### 步骤 3.3：实现核心组件
- 仪表板布局（侧边栏、顶部导航）
- 数据卡片（关键指标）
- 交互式图表（折线图、柱状图）
- 数据表格（分页、排序、筛选）
- 日期选择器（自定义组件）

#### 步骤 3.4：创建测试数据
```typescript
// lib/mock-data.ts
export const mockSalesData = [
  {
    date: '2026-01-01',
    revenue: 125000,
    orders: 450,
    conversion: 3.6,
  },
  // ... 30 天数据
];
```

#### 步骤 3.5：实现交互逻辑
```typescript
// 组件内部状态
const [dateRange, setDateRange] = useState<[Date, Date]>([
  startOfMonth(new Date()),
  new Date(),
]);

const [filters, setFilters] = useState({
  category: 'all',
  region: 'all',
});

// 数据过滤
const filteredData = mockSalesData.filter(item =>
  filters.category === 'all' || item.category === filters.category
);
```

---

### 阶段 4：原型交付

**交付物**：
1. 可交互的原型页面（Vercel/Netlify 部署或本地运行）
2. 测试数据文件（JSON/TS）
3. 组件说明文档
4. 交互说明文档

**交付给**：
- 前端开发：交互逻辑、组件结构
- 后端开发：数据结构、API 接口定义

---

## 快速开始模板

### 模板 1：基础数据看板

**适用场景**：
- 关键指标展示
- 简单图表（折线、柱状）
- 基础数据表格

**命令**：
```bash
# 方式 1：快速方案（推荐）
/skill quick-product-manager
# 描述：我需要一个销售数据看板，展示最近30天的销售趋势和关键指标

# 确认方案后
/skill data-prototype-builder
# 描述：基于刚才生成的需求方案，创建完整的看板原型

# 方式 2：传统方式（复杂需求）
/skill product-spec-builder
# 描述：我需要一个销售数据看板，展示最近30天的销售趋势和关键指标
```

---

### 模板 2：交互式数据报表

**适用场景**：
- 多维度数据筛选
- 数据下钻
- 导出功能

**关键特性**：
- 多级筛选（日期、分类、地区）
- 图表联动（点击表格更新图表）
- 导出 CSV/Excel

**命令**：
```bash
# 快速方式（推荐）
/skill quick-product-manager
# 描述：我需要一个订单报表，支持按时间、分类、状态筛选，可导出

# 确认方案后
/skill data-prototype-builder
# 实现带交互的报表原型
```

---

### 模板 3：实时数据监控

**适用场景**：
- 实时指标监控
- 告警提示
- 自动刷新

**关键特性**：
- 自动轮询（每 30 秒）
- 异常数据高亮
- 告警通知

**命令**：
```bash
# 快速方式（推荐）
/skill quick-product-manager
# 描述：我需要监控关键业务指标，异常时告警

# 确认方案后
/skill data-prototype-builder
# 实现实时监控看板（使用 setInterval 模拟实时数据）
```

---

## 数据开发人员指南

### 任务清单

#### 必做项（核心功能）
- [ ] 使用 Next.js + shadcn/ui 搭建基础框架
- [ ] 实现数据卡片组件（展示关键指标）
- [ ] 使用 Recharts 实现图表组件
- [ ] 创建测试数据（JSON/TS 格式）
- [ ] 实现基础交互（筛选、排序）

#### 应做项（增强体验）
- [ ] 添加加载状态
- [ ] 添加空状态
- [ ] 添加错误边界
- [ ] 实现数据导出功能
- [ ] 实现图表联动

#### 可选项（优化）
- [ ] 添加动画（framer-motion）
- [ ] 实现暗黑模式
- [ ] 实现响应式布局
- [ ] 实现数据下钻

---

## 常见问题

### Q1：如何让 AI 生成图表代码？

**A**：
```bash
/skill ui-ux-pro-max
# 提示词示例：
# 创建一个销售趋势折线图，使用 Recharts 库
# X 轴：日期
# Y 轴：销售额
# 支持工具提示（tooltip）
# 支持数据点点击
```

### Q2：如何生成测试数据？

**A**：让 AI 生成
```bash
/skill ui-ux-pro-max
# 提示词示例：
# 生成最近30天的销售数据测试数据
# 字段：日期、销售额、订单量、转化率
# 使用 TypeScript 类型定义
```

### Q3：如何实现数据导出？

**A**：使用 papaparse 库
```bash
npm install papaparse
# AI 会生成导出逻辑
```

### Q4：原型如何部署？

**A**：
```bash
# 本地预览
npm run dev

# 部署到 Vercel（推荐）
vercel --prod
```

---

## 交付标准

### 交付物清单
- [ ] 可交互的原型页面
- [ ] 测试数据文件
- [ ] 组件说明文档
- [ ] 交互说明文档
- [ ] 部署链接（或运行指南）

### 质量标准
- [ ] 页面在浏览器中正常运行
- [ ] 所有交互功能可用
- [ ] 图表渲染正确
- [ ] 响应式布局适配
- [ ] 代码结构清晰

---

## 下一步

1. **培训团队**：组织工作流程培训
2. **创建示例**：使用 SKILL 创建 1-2 个示例原型
3. **建立模板库**：基于常见需求创建可复用模板
4. **反馈优化**：收集团队反馈，优化工作流程

---

**文档版本**：1.0.0
**最后更新**：2026-01-21

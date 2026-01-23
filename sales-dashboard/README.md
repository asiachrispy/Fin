# 销售数据看板 (Sales Dashboard)

一个基于 React + Node.js 的销售数据可视化看板，支持多维度分析、AI 智能助手和数据导出。

## 项目概述

### 核心功能

1. **数据看板**
   - 销售趋势图（折线图 + 柱状图组合）
   - 关键指标卡片（销售额、订单量、转化率、客单价）
   - 环比变化显示

2. **多维分析**
   - 产品分类分析（饼图）
   - 地区分布分析（柱状图）
   - 渠道对比分析（堆叠柱状图）
   - 新老客户对比（堆叠面积图）
   - 时段分析（分组柱状图）

3. **数据表格**
   - 支持筛选、排序、搜索
   - 分页显示
   - 导出功能

4. **AI 智能助手**
   - 异常检测与智能提醒
   - 趋势预测
   - 自然语言问答

## 技术栈

### 前端
- React 18
- Vite
- Ant Design 5
- ECharts
- React Router
- Axios
- Day.js

### 后端
- Node.js
- Express
- CORS

## 项目结构

```
sales-dashboard/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── components/       # 可复用组件
│   │   ├── pages/            # 页面组件
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DataAnalysis.jsx
│   │   │   ├── DataTable.jsx
│   │   │   └── AIAssistant.jsx
│   │   ├── services/         # API 服务
│   │   ├── utils/            # 工具函数
│   │   ├── styles/           # 样式文件
│   │   ├── App.jsx           # 主组件
│   │   └── main.jsx          # 入口文件
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                  # 后端项目
│   ├── src/
│   │   ├── controllers/      # 控制器
│   │   ├── routes/           # 路由
│   │   ├── utils/            # 工具函数
│   │   │   └── dataGenerator.js
│   │   └── middleware/       # 中间件
│   ├── server.js
│   └── package.json
└── README.md
```

## 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 前端
cd frontend
npm install

# 后端
cd ../backend
npm install
```

### 启动项目

**启动后端服务**（终端1）:
```bash
cd backend
npm start
```

后端服务将在 `http://localhost:5000` 启动

**启动前端服务**（终端2）:
```bash
cd frontend
npm run dev
```

前端服务将在 `http://localhost:3000` 启动

### 访问应用

打开浏览器访问 `http://localhost:3000`

## API 接口

### 数据看板接口

- `GET /api/trend?days=14` - 获取销售趋势数据
- `GET /api/metrics` - 获取关键指标

### 多维分析接口

- `GET /api/analysis/category` - 获取产品分类数据
- `GET /api/analysis/region` - 获取地区数据
- `GET /api/analysis/channel` - 获取渠道数据
- `GET /api/analysis/customer` - 获取客户数据
- `GET /api/analysis/time` - 获取时间数据

### 数据表格接口

- `GET /api/data?page=1&pageSize=50` - 获取表格数据
- `GET /api/export?format=excel` - 导出数据

### AI 功能接口

- `GET /api/ai/analysis` - AI 异常分析
- `GET /api/ai/prediction` - AI 趋势预测
- `POST /api/ai/chat` - AI 对话

## 功能说明

### 1. 数据看板

**销售趋势图**
- 默认显示最近14天数据
- 支持切换 7天/14天/30天
- 折线图显示销售额趋势
- 柱状图显示订单量
- 自动计算7天移动平均线

**关键指标**
- 总销售额：30天内有效订单总金额
- 订单量：30天内已完成的有效订单数量
- 转化率：订单量 / 访客数 × 100%
- 客单价：总销售额 / 订单量
- 环比变化：与上个周期对比

### 2. 多维分析

- **产品分类**：各产品线销售额占比和排名
- **地区分布**：各地区销售额热力排行
- **渠道对比**：线上/线下各渠道销售额对比
- **新老客户**：新客户vs老客户销售额趋势
- **时段分析**：工作日vs周末、上午vs下午销售额分布

### 3. 数据表格

- 支持按日期、产品名称、分类、地区、渠道筛选
- 支持关键字搜索
- 支持按任意列排序
- 支持分页（10/20/50/100条每页）
- 支持导出Excel

### 4. AI 智能助手

**异常检测**
- 自动识别销售数据异常波动
- 分析可能的原因
- 提供优化建议

**趋势预测**
- 基于历史数据预测未来7天销售趋势
- 显示预测置信度
- 列出主要影响因素

**智能问答**
- 支持自然语言查询
- 快速获取数据答案
- 生成数据图表

## 数据说明

当前版本使用**模拟数据**进行演示：
- 自动生成6个月的测试数据
- 包含4个产品分类、7个地区、3个渠道
- 支持筛选、排序、分页等操作

**未来扩展**：
- 接入真实数据库（MySQL/PostgreSQL）
- 支持实时数据同步
- 添加用户认证和权限控制
- 集成真实 AI API（OpenAI/Claude）

## 产品文档

- 产品需求文档：`/Product-Spec.md`
- 变更记录：`/Product-Spec-CHANGELOG.md`

## 开发说明

### 前端开发

```bash
cd frontend
npm run dev
```

### 后端开发

```bash
cd backend
npm run dev
```

### 构建生产版本

```bash
# 前端
cd frontend
npm run build

# 生成的文件在 dist/ 目录
```

## 注意事项

1. **端口占用**：确保 3000 和 5000 端口未被占用
2. **跨域问题**：后端已配置 CORS，无需额外处理
3. **数据来源**：当前使用模拟数据，实际项目需接入真实数据库
4. **AI 功能**：当前为模拟实现，实际项目需集成真实 AI API

## 许可证

MIT

## 版本信息

- 产品文档版本：1.0.0
- 最后更新：2026-01-22

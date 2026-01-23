# 前端项目完整修复 - 手动操作指南

## 🚀 快速开始（5分钟完成）

### 步骤 1：打开终端并导航到项目目录

```bash
cd /Users/chrispy/codespace/CodeMind/Fin/enterprise-news-analyzer/frontend
```

### 步骤 2：安装依赖

```bash
npm install
```

### 步骤 3：创建缺失的组件文件

#### 3.1 创建 CompaniesView.vue

```bash
cat > src/views/CompaniesView.vue << 'EOF'
<template>
  <div class="companies-view">
    <div class="page-header">
      <h1>企业管理</h1>
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加企业
      </el-button>
    </div>

    <div v-if="loading">
      <el-skeleton :rows="6" animated />
    </div>

    <div v-else-if="companies.length === 0">
      <el-empty description="暂无企业数据">
        <el-button type="primary" @click="handleAdd">添加第一个企业</el-button>
      </el-empty>
    </div>

    <div v-else>
      <el-card v-for="company in companies" :key="company.id" style="margin-bottom: 16px;">
        <template #header>
          <div style="display: flex; justify-content: space-between;">
            <strong>{{ company.name }}</strong>
            <el-tag size="small">{{ company.industry || '未分类' }}</el-tag>
          </div>
        </template>
        <p>{{ company.businessDescription || '暂无描述' }}</p>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { Company } from '@/types'

const loading = ref(true)
const companies = ref<Company[]>([])

onMounted(() => {
  setTimeout(() => { loading.value = false }, 500)
})

const handleAdd = () => ElMessage.info('功能开发中')
</script>

<style scoped>
.companies-view { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 24px; margin: 0; }
</style>
EOF
```

#### 3.2 创建 SettingsView.vue

```bash
cat > src/views/SettingsView.vue << 'EOF'
<template>
  <div class="settings-view">
    <div class="page-header">
      <h1>系统设置</h1>
    </div>

    <el-card style="max-width: 800px;">
      <el-tabs type="border-card">
        <el-tab-pane label="基本设置">
          <div style="padding: 20px;">
            <h3>基本设置</h3>
            <p>系统名称: 企业新闻分析系统</p>
            <p>版本: 1.0.0</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="显示设置">
          <div style="padding: 20px;">
            <h3>显示设置</h3>
            <p>主题模式: 浅色</p>
            <p>每页显示: 20条</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.settings-view { padding: 24px; }
.page-header { margin-bottom: 24px; }
.page-header h1 { font-size: 24px; margin: 0; }
</style>
EOF
```

#### 3.3 创建 Mock 数据服务

```bash
cat > src/api/mock.ts << 'EOF'
import type { Event, Company, PaginatedResponse } from '@/types'

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '全球供应链紧张局势加剧',
    content: '由于地缘政治因素和疫情持续影响，全球供应链面临前所未有的挑战...',
    source: 'BBC',
    publishedAt: new Date().toISOString(),
    url: 'https://example.com/news1',
    impactScore: 8,
    impactSummary: '该事件可能严重影响公司的原材料采购和产品交付。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '央行宣布降息0.25个百分点',
    content: '为刺激经济增长，中央银行决定下调基准利率...',
    source: 'CNN',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    url: 'https://example.com/news2',
    impactScore: 5,
    impactSummary: '降息可能降低企业融资成本。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  }
]

export const mockApi = {
  getEvents: async (): Promise<PaginatedResponse<Event>> => {
    await new Promise(r => setTimeout(r, 500))
    return { items: mockEvents, total: 2, page: 1, pageSize: 20, totalPages: 1 }
  },

  getEventById: async (id: string): Promise<Event> => {
    const event = mockEvents.find(e => e.id === id)
    if (!event) throw new Error('Not found')
    return event
  },

  getCompanies: async (): Promise<Company[]> => {
    await new Promise(r => setTimeout(r, 500))
    return []
  }
}
EOF
```

#### 3.4 配置环境变量

```bash
# 创建 .env 文件
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
echo "VITE_USE_MOCK=true" >> .env

# 创建 .env.development 文件
echo "VITE_API_BASE_URL=http://localhost:8000" > .env.development
echo "VITE_USE_MOCK=true" >> .env.development
```

### 步骤 4：启动开发服务器

```bash
npm run dev
```

---

## ✅ 验证清单

启动后检查以下内容：

- [ ] 终端显示 "Local: http://localhost:5173/"
- [ ] 浏览器能访问 http://localhost:5173
- [ ] 首页显示事件列表（有Mock数据）
- [ ] 点击导航菜单"企业管理"能切换页面
- [ ] 点击导航菜单"设置"能切换页面
- [ ] 控制台没有错误信息

---

## 🔧 如果遇到问题

### tsconfig.node.json 错误
这个文件已经在之前创建了，如果还报错，确认文件存在：
```bash
ls tsconfig.node.json
```

### 模块找不到错误
运行：
```bash
npm install
```

### 端口被占用
修改 `vite.config.ts` 或关闭占用5173端口的程序

### 没有Mock数据显示
检查 `.env` 文件中是否设置了 `VITE_USE_MOCK=true`

---

## 📝 完整的文件清单

确保以下文件都存在：

```
frontend/
├── src/
│   ├── views/
│   │   ├── EventsView.vue       ✅ (已存在)
│   │   ├── EventDetailView.vue  ✅ (已存在)
│   │   ├── CompaniesView.vue    📝 (需要创建)
│   │   └── SettingsView.vue     📝 (需要创建)
│   ├── api/
│   │   ├── index.ts             ✅ (已存在)
│   │   └── mock.ts              📝 (需要创建)
│   ├── components/
│   │   ├── EventCard.vue        ✅ (已存在)
│   │   ├── FilterPanel.vue      ✅ (已存在)
│   │   └── ImpactBadge.vue      ✅ (已存在)
│   ├── router/
│   │   └── index.ts             ✅ (已存在)
│   ├── store/
│   │   ├── events.ts            ✅ (已存在)
│   │   └── companies.ts         ✅ (已存在)
│   ├── types/
│   │   └── index.ts             ✅ (已存在)
│   ├── styles/
│   │   └── main.css             ✅ (已存在)
│   ├── App.vue                  ✅ (已存在)
│   └── main.ts                  ✅ (已存在)
├── .env                         📝 (需要创建)
├── .env.development             📝 (需要创建)
├── package.json                 ✅ (已存在)
├── tsconfig.json                ✅ (已存在)
├── tsconfig.node.json           ✅ (已存在)
└── vite.config.ts               ✅ (已存在)
```

---

## 🎯 预期效果

完成所有步骤后，你将看到：

1. **首页** - 显示2个示例事件卡片
2. **事件详情** - 点击卡片可以查看详情
3. **企业管理** - 显示空状态
4. **设置页面** - 显示基本设置和显示设置

所有页面都有正确的：
- 导航菜单
- 响应式布局
- Element Plus样式
- TypeScript类型支持

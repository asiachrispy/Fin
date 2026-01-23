#!/bin/bash
# 前端项目完整修复脚本
# 请在项目根目录执行此脚本

echo "🚀 开始修复前端项目..."
echo ""

# 设置项目路径
PROJECT_ROOT="/Users/chrispy/codespace/CodeMind/Fin/enterprise-news-analyzer"
FRONTEND_SRC="$PROJECT_ROOT/frontend/src"

# 检查目录是否存在
if [ ! -d "$FRONTEND_SRC" ]; then
  echo "❌ 错误：frontend/src 目录不存在"
  echo "   请先运行项目初始化命令"
  exit 1
fi

echo "✅ 项目目录确认"
echo ""

# 1. 创建 CompaniesView.vue
echo "📝 [1/5] 创建 CompaniesView.vue..."
cat > "$FRONTEND_SRC/views/CompaniesView.vue" << 'COMPANIES_VUE_EOF'
<template>
  <div class="companies-view">
    <div class="page-header">
      <h1 class="page-title">企业管理</h1>
      <el-button type="primary" @click="handleAddCompany">
        <el-icon><Plus /></el-icon>
        添加企业
      </el-button>
    </div>

    <div v-if="loading" class="loading-state">
      <el-skeleton :rows="6" animated />
    </div>

    <div v-else-if="companies.length === 0" class="empty-state">
      <el-empty description="暂无企业数据">
        <el-button type="primary" @click="handleAddCompany">添加第一个企业</el-button>
      </el-empty>
    </div>

    <div v-else class="companies-list">
      <el-card v-for="company in companies" :key="company.id" class="company-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span class="company-name">{{ company.name }}</span>
            <el-tag size="small">{{ company.industry || '未分类' }}</el-tag>
          </div>
        </template>
        <div class="company-content">
          <p v-if="company.businessDescription">{{ company.businessDescription }}</p>
          <p v-else class="text-muted">暂无描述</p>
        </div>
        <template #footer>
          <el-button-group>
            <el-button size="small" @click="handleEdit(company)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(company)">删除</el-button>
          </el-button-group>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { Company } from '@/types'

const loading = ref(true)
const companies = ref<Company[]>([])

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})

const handleAddCompany = () => {
  ElMessage.info('添加企业功能开发中')
}

const handleEdit = (company: Company) => {
  ElMessage.info(`编辑企业: ${company.name}`)
}

const handleDelete = (company: Company) => {
  ElMessageBox.confirm(
    `确定要删除企业 "${company.name}" 吗？`,
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(() => {
      // 用户取消
    })
}
</script>

<style scoped>
.companies-view {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.loading-state {
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.empty-state {
  margin-top: 60px;
}

.companies-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.company-card {
  transition: all 0.2s;
}

.company-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.company-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.company-content {
  color: #606266;
  font-size: 14px;
}

.text-muted {
  color: #909399;
}
</style>
COMPANIES_VUE_EOF

if [ -f "$FRONTEND_SRC/views/CompaniesView.vue" ]; then
  echo "   ✅ CompaniesView.vue 创建成功"
else
  echo "   ❌ CompaniesView.vue 创建失败"
fi
echo ""

# 2. 创建 SettingsView.vue
echo "📝 [2/5] 创建 SettingsView.vue..."
cat > "$FRONTEND_SRC/views/SettingsView.vue" << 'SETTINGS_VUE_EOF'
<template>
  <div class="settings-view">
    <div class="page-header">
      <h1 class="page-title">系统设置</h1>
    </div>

    <el-card class="settings-card">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基本设置" name="general">
          <div class="tab-content">
            <h3>基本设置</h3>
            <el-form :model="generalForm" label-width="120px">
              <el-form-item label="系统名称">
                <el-input v-model="generalForm.systemName" placeholder="请输入系统名称" />
              </el-form-item>
              <el-form-item label="语言">
                <el-select v-model="generalForm.language" placeholder="请选择语言">
                  <el-option label="简体中文" value="zh-CN" />
                  <el-option label="English" value="en-US" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="显示设置" name="display">
          <div class="tab-content">
            <h3>显示设置</h3>
            <el-form :model="displayForm" label-width="120px">
              <el-form-item label="主题模式">
                <el-radio-group v-model="displayForm.theme">
                  <el-radio label="light">浅色</el-radio>
                  <el-radio label="dark">深色</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="每页显示">
                <el-select v-model="displayForm.pageSize">
                  <el-option label="10条/页" :value="10" />
                  <el-option label="20条/页" :value="20" />
                  <el-option label="50条/页" :value="50" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="关于" name="about">
          <div class="tab-content">
            <h3>关于系统</h3>
            <p><strong>版本</strong>: 1.0.0</p>
            <p><strong>描述</strong>: 全球突发事件影响分析系统</p>
            <p>为企业高管提供全球突发事件的智能监控和业务影响分析服务。</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('general')
const generalForm = ref({
  systemName: '企业新闻分析系统',
  language: 'zh-CN'
})
const displayForm = ref({
  theme: 'light',
  pageSize: 20
})

const saveSettings = () => {
  ElMessage.success('设置已保存')
}
</script>

<style scoped>
.settings-view {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.settings-card {
  max-width: 900px;
}

.tab-content {
  padding: 24px;
  max-width: 600px;
}

.tab-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 24px;
}

.tab-content p {
  line-height: 1.6;
  color: #606266;
}
</style>
SETTINGS_VUE_EOF

if [ -f "$FRONTEND_SRC/views/SettingsView.vue" ]; then
  echo "   ✅ SettingsView.vue 创建成功"
else
  echo "   ❌ SettingsView.vue 创建失败"
fi
echo ""

# 3. 创建 Mock 数据服务
echo "📝 [3/5] 创建 Mock 数据服务..."
cat > "$FRONTEND_SRC/api/mock.ts" << 'MOCK_EOF'
import type { Event, Company, PaginatedResponse } from '@/types'

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '全球供应链紧张局势加剧',
    content: '由于地缘政治因素和疫情持续影响，全球供应链面临前所未有的挑战。多家跨国企业报告称，原材料采购和产品交付出现延迟，预计这种情况将在未来几个月内持续。专家建议企业应立即评估供应链风险，寻找替代供应商和备选方案。',
    source: 'BBC',
    publishedAt: new Date().toISOString(),
    url: 'https://example.com/news1',
    impactScore: 8,
    impactSummary: '该事件可能严重影响公司的原材料采购和产品交付，建议立即寻找替代供应商，评估库存水平并制定应急计划。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '央行宣布降息0.25个百分点',
    content: '为刺激经济增长，中央银行决定下调基准利率。这一举措旨在降低企业融资成本，促进投资和消费。市场分析师普遍认为这将对多个行业产生积极影响，特别是制造业和房地产行业。',
    source: 'CNN',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    url: 'https://example.com/news2',
    impactScore: 5,
    impactSummary: '降息政策可能降低企业融资成本，对扩张计划有正面影响。建议关注相关行业的投资机会，并评估现有贷款的再融资可能性。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '人工智能技术取得重大突破',
    content: '研究团队在人工智能领域取得重大突破，新算法在多个基准测试中表现优异。这一突破有望加速AI技术在各行业的应用，包括自动化、数据分析、客户服务等领域。',
    source: 'Reuters',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    url: 'https://example.com/news3',
    impactScore: 6,
    impactSummary: 'AI技术突破可能为公司带来新的技术机会和效率提升。建议评估将AI技术集成到现有产品或服务中的可行性，关注竞争对手的AI布局。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: '新能源政策调整影响分析',
    content: '政府宣布调整新能源补贴政策，将对电动汽车、太阳能等行业产生深远影响。新政策将在下季度生效，企业需要提前做好准备。',
    source: 'Bloomberg',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    url: 'https://example.com/news4',
    impactScore: 7,
    impactSummary: '新能源政策调整可能直接影响相关企业的盈利模式和市场份额。建议立即评估政策变化对产品定价、市场需求的影响，调整业务策略。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  }
]

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: '示例科技公司',
    industry: '科技',
    businessDescription: '从事软件开发和云服务',
    mainMarkets: '全球',
    competitors: '竞争对手A, 竞争对手B',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: '示例制造企业',
    industry: '制造',
    businessDescription: '电子产品制造商',
    mainMarkets: '北美、欧洲',
    competitors: '其他制造商',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const mockApi = {
  getEvents: async (): Promise<PaginatedResponse<Event>> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      items: mockEvents,
      total: mockEvents.length,
      page: 1,
      pageSize: 20,
      totalPages: 1
    }
  },

  getEventById: async (id: string): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const event = mockEvents.find(e => e.id === id)
    if (!event) throw new Error('Event not found')
    return event
  },

  getCompanies: async (): Promise<Company[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockCompanies
  },

  createCompany: async (data: Partial<Company>): Promise<Company> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newCompany: Company = {
      id: Date.now().toString(),
      name: data.name || '',
      industry: data.industry,
      businessDescription: data.businessDescription,
      mainMarkets: data.mainMarkets,
      competitors: data.competitors,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockCompanies.push(newCompany)
    return newCompany
  },

  updateCompany: async (id: string, data: Partial<Company>): Promise<Company> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockCompanies.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Company not found')
    mockCompanies[index] = {
      ...mockCompanies[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    return mockCompanies[index]
  },

  deleteCompany: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockCompanies.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Company not found')
    mockCompanies.splice(index, 1)
  }
}
MOCK_EOF

if [ -f "$FRONTEND_SRC/api/mock.ts" ]; then
  echo "   ✅ mock.ts 创建成功"
else
  echo "   ❌ mock.ts 创建失败"
fi
echo ""

# 4. 配置环境变量
echo "⚙️ [4/5] 配置环境变量..."

# 创建 .env
cat > "$PROJECT_ROOT/frontend/.env" << 'ENV_EOF'
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK=true
ENV_EOF

# 创建 .env.development
cat > "$PROJECT_ROOT/frontend/.env.development" << 'ENV_DEV_EOF'
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK=true
ENV_DEV_EOF

if [ -f "$PROJECT_ROOT/frontend/.env" ] && [ -f "$PROJECT_ROOT/frontend/.env.development" ]; then
  echo "   ✅ 环境变量配置成功"
else
  echo "   ❌ 环境变量配置失败"
fi
echo ""

# 5. 总结
echo "✅ 前端项目修复完成！"
echo ""
echo "📦 已创建的文件："
echo "   ✓ frontend/src/views/CompaniesView.vue"
echo "   ✓ frontend/src/views/SettingsView.vue"
echo "   ✓ frontend/src/api/mock.ts"
echo "   ✓ frontend/.env"
echo "   ✓ frontend/.env.development"
echo ""
echo "🚀 下一步操作："
echo ""
echo "   cd $PROJECT_ROOT/frontend"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "🌐 访问地址："
echo "   http://localhost:5173"
echo ""
echo "📚 API文档："
echo "   http://localhost:8000/docs (需要先启动后端)"
echo ""

#!/bin/bash

# 前端项目修复和优化脚本
# 用法: bash fix-frontend.sh

set -e

FRONTEND_DIR="/Users/chrispy/codespace/CodeMind/Fin/enterprise-news-analyzer/frontend/src"
VIEWS_DIR="$FRONTEND_DIR/views"
COMPONENTS_DIR="$FRONTEND_DIR/components"
API_DIR="$FRONTEND_DIR/api"

echo "🔧 开始修复前端项目..."

# 1. 创建 CompaniesView.vue
echo "📝 创建 CompaniesView.vue..."
cat > "$VIEWS_DIR/CompaniesView.vue" << 'EOF'
<template>
  <div class="companies-view">
    <div class="page-header">
      <h1 class="page-title">企业管理</h1>
      <el-button type="primary" :icon="Plus" @click="handleAddCompany">
        添加企业
      </el-button>
    </div>

    <div v-if="loading" class="skeleton-container">
      <el-skeleton :rows="6" animated />
    </div>

    <div v-else-if="companies.length === 0" class="empty-state">
      <el-empty description="暂无企业数据">
        <el-button type="primary" @click="handleAddCompany">添加第一个企业</el-button>
      </el-empty>
    </div>

    <div v-else class="companies-grid">
      <el-row :gutter="20">
        <el-col
          v-for="company in companies"
          :key="company.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <el-card class="company-card" shadow="hover">
            <div class="company-header">
              <el-avatar :size="60">
                {{ company.name.charAt(0) }}
              </el-avatar>
              <h3 class="company-name">{{ company.name }}</h3>
            </div>
            <div class="company-info">
              <p class="company-description">{{ company.businessDescription || '暂无描述' }}</p>
              <div class="company-meta">
                <el-tag size="small">{{ company.industry || '未分类' }}</el-tag>
              </div>
            </div>
            <div class="company-actions">
              <el-button-group>
                <el-button size="small" @click="handleEdit(company)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(company)">删除</el-button>
              </el-button-group>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Company } from '@/types'

const loading = ref(true)
const companies = ref<Company[]>([])

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})

const handleAddCompany = () => {
  ElMessage.info('添加企业功能开发中，敬请期待！')
}

const handleEdit = (company: Company) => {
  ElMessage.info(`编辑企业: ${company.name}`)
}

const handleDelete = (company: Company) => {
  ElMessageBox.confirm(`确定要删除企业 "${company.name}" 吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<style scoped>
.companies-view { padding: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 600; color: #303133; margin: 0; }
.skeleton-container { padding: 20px; background: #fff; border-radius: 4px; }
.empty-state { margin-top: 60px; }
.companies-grid { margin-top: 24px; }
.company-card { margin-bottom: 20px; height: 100%; display: flex; flex-direction: column; }
.company-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 16px; }
.company-name { font-size: 18px; font-weight: 600; color: #303133; margin: 12px 0 0 0; }
.company-info { flex: 1; margin-bottom: 16px; }
.company-description { color: #606266; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0; min-height: 48px; }
.company-meta { display: flex; gap: 8px; flex-wrap: wrap; }
.company-actions { border-top: 1px solid #ebeef5; padding-top: 16px; text-align: center; }
</style>
EOF

# 2. 创建 SettingsView.vue
echo "📝 创建 SettingsView.vue..."
cat > "$VIEWS_DIR/SettingsView.vue" << 'EOF'
<template>
  <div class="settings-view">
    <div class="page-header">
      <h1 class="page-title">系统设置</h1>
    </div>

    <el-card class="settings-card">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基本设置" name="general">
          <el-form :model="generalForm" label-width="120px" class="settings-form">
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
        </el-tab-pane>

        <el-tab-pane label="通知设置" name="notification">
          <el-form :model="notificationForm" label-width="120px" class="settings-form">
            <el-form-item label="邮件通知">
              <el-switch v-model="notificationForm.emailEnabled" />
            </el-form-item>
            <el-form-item label="浏览器通知">
              <el-switch v-model="notificationForm.browserEnabled" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="显示设置" name="display">
          <el-form :model="displayForm" label-width="120px" class="settings-form">
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('general')
const generalForm = ref({ systemName: '企业新闻分析系统', language: 'zh-CN' })
const notificationForm = ref({ emailEnabled: false, browserEnabled: false })
const displayForm = ref({ theme: 'light', pageSize: 20 })

const saveSettings = () => {
  ElMessage.success('设置已保存')
}
</script>

<style scoped>
.settings-view { padding: 24px; }
.page-header { margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 600; color: #303133; margin: 0; }
.settings-card { max-width: 800px; }
.settings-form { padding: 20px; max-width: 600px; }
</style>
EOF

# 3. 修复 ImpactBadge.vue 添加 size 属性
echo "🔧 修复 ImpactBadge.vue..."
cat > "$COMPONENTS_DIR/ImpactBadge.vue" << 'EOF'
<template>
  <div
    class="impact-badge"
    :class="sizeClass"
    :style="{ backgroundColor: scoreColor }"
    :aria-label="`影响程度: ${score}分`"
  >
    <span class="score">{{ score }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  size?: number
}>()

const scoreColor = computed(() => {
  if (props.score >= 7) return '#DC2626'
  if (props.score >= 4) return '#F59E0B'
  return '#10B981'
})

const sizeClass = computed(() => {
  if (props.size && props.size >= 120) return 'large'
  return 'normal'
})
</script>

<style scoped>
.impact-badge {
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.impact-badge.normal {
  width: 80px;
  height: 80px;
}

.impact-badge.large {
  width: 150px;
  height: 150px;
}

.impact-badge.normal .score {
  font-size: 32px;
  font-weight: bold;
  color: white;
}

.impact-badge.large .score {
  font-size: 48px;
  font-weight: bold;
  color: white;
}
</style>
EOF

# 4. 创建 Mock 数据服务
echo "📦 创建 Mock 数据服务..."
cat > "$API_DIR/mock.ts" << 'EOF'
import type { Event, Company, PaginatedResponse } from '@/types'

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '全球供应链紧张局势加剧',
    content: '由于地缘政治因素和疫情持续影响，全球供应链面临前所未有的挑战。多家跨国企业报告称，原材料采购和产品交付出现延迟...',
    source: 'BBC',
    publishedAt: new Date().toISOString(),
    url: 'https://example.com/news1',
    impactScore: 8,
    impactSummary: '该事件可能严重影响公司的原材料采购和产品交付，建议立即寻找替代供应商。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: '央行宣布降息0.25个百分点',
    content: '为刺激经济增长，中央银行决定下调基准利率。这一举措旨在降低企业融资成本，促进投资和消费...',
    source: 'CNN',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    url: 'https://example.com/news2',
    impactScore: 5,
    impactSummary: '降息可能降低企业融资成本，对业务有正面影响。',
    analysisStatus: 'success',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: '人工智能技术取得重大突破',
    content: '研究团队在人工智能领域取得重大突破，新算法在多个基准测试中表现优异...',
    source: 'Reuters',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    url: 'https://example.com/news3',
    impactScore: 6,
    impactSummary: 'AI技术突破可能为公司带来新的技术机会，建议关注相关应用场景。',
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
    mockCompanies[index] = { ...mockCompanies[index], ...data, updatedAt: new Date().toISOString() }
    return mockCompanies[index]
  },

  deleteCompany: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockCompanies.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Company not found')
    mockCompanies.splice(index, 1)
  }
}
EOF

# 5. 创建环境变量文件
echo "⚙️ 配置环境变量..."
cat > "/Users/chrispy/codespace/CodeMind/Fin/enterprise-news-analyzer/frontend/.env" << 'EOF'
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK=true
EOF

# 6. 创建 .env.development
cat > "/Users/chrispy/codespace/CodeMind/Fin/enterprise-news-analyzer/frontend/.env.development" << 'EOF'
# 开发环境使用Mock数据
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK=true
EOF

echo "✅ 前端项目修复完成！"
echo ""
echo "📝 已创建/更新的文件："
echo "  - frontend/src/views/CompaniesView.vue"
echo "  - frontend/src/views/SettingsView.vue"
echo "  - frontend/src/components/ImpactBadge.vue (已修复)"
echo "  - frontend/src/api/mock.ts (新建)"
echo "  - frontend/.env (已配置)"
echo "  - frontend/.env.development (已配置)"
echo ""
echo "🚀 下一步："
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "🌐 访问: http://localhost:5173"

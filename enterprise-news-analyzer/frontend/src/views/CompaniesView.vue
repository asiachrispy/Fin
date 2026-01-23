<template>
  <div class="companies-view">
    <div class="container">
      <div class="header">
        <div>
          <h1>企业管理</h1>
          <p class="subtitle">
            维护重点企业档案，用于事件影响分析
          </p>
        </div>
        <div class="actions">
          <el-button
            :loading="companiesStore.loading"
            @click="loadCompanies"
          >
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
          <el-button
            type="primary"
            @click="openAdd"
          >
            <el-icon><Plus /></el-icon>
            新增企业
          </el-button>
        </div>
      </div>

      <el-card class="table-card">
        <div
          v-if="!companiesStore.loading && companiesStore.companies.length === 0"
          class="empty-state"
        >
          <el-empty description="暂无企业数据">
            <el-button
              type="primary"
              @click="openAdd"
            >
              立即添加
            </el-button>
          </el-empty>
        </div>
        <el-table
          v-else
          v-loading="companiesStore.loading"
          :data="companiesStore.companies"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="企业名称"
            min-width="180"
          />
          <el-table-column
            prop="industry"
            label="行业"
            min-width="120"
          />
          <el-table-column
            prop="mainMarkets"
            label="主要市场"
            min-width="160"
          />
          <el-table-column
            prop="competitors"
            label="竞争对手"
            min-width="180"
          />
          <el-table-column
            label="更新时间"
            min-width="160"
          >
            <template #default="{ row }">
              {{ formatTime(row.updatedAt) }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="140"
            fixed="right"
          >
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                @click="openEdit(row)"
              >
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button
                link
                type="danger"
                @click="handleDelete(row)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog
        v-model="companiesStore.dialogVisible"
        :title="dialogTitle"
        width="640px"
        @close="handleDialogClose"
      >
        <el-form
          :model="formData"
          label-width="100px"
        >
          <el-form-item label="企业名称">
            <div class="name-row">
              <el-input
                v-model="formData.name"
                placeholder="请输入企业名称"
              />
              <el-button
                :loading="autoFillLoading"
                @click="handleAutoFill"
              >
                <el-icon><Search /></el-icon>
                自动填充
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="行业">
            <el-input
              v-model="formData.industry"
              placeholder="请输入行业"
            />
          </el-form-item>
          <el-form-item label="主营业务">
            <el-input
              v-model="formData.businessDescription"
              type="textarea"
              :rows="3"
              placeholder="请输入主营业务描述"
            />
          </el-form-item>
          <el-form-item label="主要市场">
            <el-input
              v-model="formData.mainMarkets"
              placeholder="请输入主要市场"
            />
          </el-form-item>
          <el-form-item label="竞争对手">
            <el-input
              v-model="formData.competitors"
              placeholder="请输入竞争对手"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="companiesStore.closeDialog">
            取消
          </el-button>
          <el-button
            type="primary"
            :loading="formLoading"
            @click="handleSubmit"
          >
            保存
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import { useCompaniesStore } from '@/store/companies'
import type { Company } from '@/types'
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue'

const companiesStore = useCompaniesStore()
const formLoading = ref(false)
const autoFillLoading = ref(false)

const formData = reactive({
  name: '',
  industry: '',
  businessDescription: '',
  mainMarkets: '',
  competitors: ''
})

const dialogTitle = computed(() =>
  companiesStore.editingCompany ? '编辑企业' : '新增企业'
)

const formatTime = (value: string) => {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
}

onMounted(() => {
  loadCompanies()
})

async function loadCompanies() {
  try {
    await companiesStore.fetchCompanies()
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '加载企业失败')
  }
}

function resetForm() {
  formData.name = ''
  formData.industry = ''
  formData.businessDescription = ''
  formData.mainMarkets = ''
  formData.competitors = ''
}

function openAdd() {
  resetForm()
  companiesStore.openAddDialog()
}

function openEdit(company: Company) {
  formData.name = company.name
  formData.industry = company.industry || ''
  formData.businessDescription = company.businessDescription || ''
  formData.mainMarkets = company.mainMarkets || ''
  formData.competitors = company.competitors || ''
  companiesStore.openEditDialog(company)
}

function handleDialogClose() {
  resetForm()
}

async function handleSubmit() {
  if (!formData.name.trim()) {
    ElMessage.warning('请输入企业名称')
    return
  }
  formLoading.value = true
  try {
    if (companiesStore.editingCompany) {
      await companiesStore.updateCompany(companiesStore.editingCompany.id, formData)
    } else {
      await companiesStore.createCompany(formData)
    }
    companiesStore.closeDialog()
    await loadCompanies()
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '保存失败')
  } finally {
    formLoading.value = false
  }
}

async function handleDelete(company: Company) {
  try {
    await ElMessageBox.confirm(`确定删除 ${company.name} 吗？`, '提示', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消'
    })
    await companiesStore.deleteCompany(company.id)
    await loadCompanies()
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error instanceof Error ? error.message : '删除失败')
    }
  }
}

async function handleAutoFill() {
  if (!formData.name.trim()) {
    ElMessage.warning('请输入企业名称')
    return
  }
  autoFillLoading.value = true
  try {
    const info = await companiesStore.autoFillCompanyInfo(formData.name.trim())
    formData.industry = info.industry || formData.industry
    formData.businessDescription = info.business_description || info.businessDescription || formData.businessDescription
    formData.mainMarkets = info.main_markets || info.mainMarkets || formData.mainMarkets
    formData.competitors = info.competitors || formData.competitors
    if (!info || Object.keys(info).length === 0) {
      ElMessage.warning('未获取到可用的企业信息')
    }
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '自动填充失败')
  } finally {
    autoFillLoading.value = false
  }
}
</script>

<style scoped>
.companies-view {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
}

.subtitle {
  margin: 6px 0 0;
  color: #6B7280;
}

.actions {
  display: flex;
  gap: 12px;
}

.table-card {
  border-radius: 12px;
}

.empty-state {
  padding: 40px 0;
}

.name-row {
  display: flex;
  gap: 12px;
  width: 100%;
}
</style>

<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h3>筛选条件</h3>
      <el-button
        text
        type="primary"
        @click="handleReset"
      >
        重置
      </el-button>
    </div>

    <div class="filter-section">
      <label>关键词搜索</label>
      <el-input
        v-model="localFilters.keyword"
        placeholder="搜索新闻标题或影响说明"
        clearable
        @change="handleFilterChange"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <div class="filter-section">
      <label>影响程度</label>
      <el-checkbox-group
        v-model="localFilters.impactLevels"
        @change="handleFilterChange"
      >
        <el-checkbox label="all">
          全部
        </el-checkbox>
        <el-checkbox label="low">
          低影响 (1-3)
        </el-checkbox>
        <el-checkbox label="medium">
          中等影响 (4-6)
        </el-checkbox>
        <el-checkbox label="high">
          高影响 (7-10)
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="filter-section">
      <label>日期范围</label>
      <el-date-picker
        v-model="localFilters.dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        @change="handleFilterChange"
      />
    </div>

    <div class="filter-section">
      <label>分析状态</label>
      <el-select
        v-model="localFilters.analysisStatus"
        placeholder="全部"
        @change="handleFilterChange"
      >
        <el-option
          label="全部"
          value="all"
        />
        <el-option
          label="分析成功"
          value="success"
        />
        <el-option
          label="分析失败"
          value="failed"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { EventFilters } from '@/types'

const props = defineProps<{
  filters: EventFilters
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: EventFilters): void
  (e: 'reset'): void
}>()

const localFilters = reactive<EventFilters>({
  keyword: '',
  impactLevels: ['all'],
  analysisStatus: 'all',
  dateRange: undefined
})

// Watch for props changes
watch(
  () => props.filters,
  (newFilters) => {
    Object.assign(localFilters, newFilters)
  },
  { immediate: true, deep: true }
)

const handleFilterChange = () => {
  emit('update:filters', { ...localFilters })
}

const handleReset = () => {
  localFilters.keyword = ''
  localFilters.impactLevels = ['all']
  localFilters.analysisStatus = 'all'
  localFilters.dateRange = undefined
  emit('reset')
}
</script>

<style scoped>
.filter-panel {
  width: 280px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 24px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filter-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-section label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.el-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.el-select {
  width: 100%;
}

.el-date-picker {
  width: 100%;
}

@media (max-width: 1024px) {
  .filter-panel {
    width: 100%;
    position: static;
  }
}
</style>

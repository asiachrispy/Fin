<template>
  <div class="settings-view">
    <div class="container">
      <div class="header">
        <div>
          <h1>设置</h1>
          <p class="subtitle">
            管理系统参数与运行状态
          </p>
        </div>
      </div>

      <div class="grid">
        <el-card>
          <template #header>
            <div class="card-header">
              接口配置
            </div>
          </template>
          <el-descriptions
            :column="1"
            border
          >
            <el-descriptions-item label="API 基础地址">
              <span class="mono">{{ apiBaseUrl }}</span>
            </el-descriptions-item>
          </el-descriptions>
          <div class="card-footer">
            <el-button @click="copyApiUrl">
              复制地址
            </el-button>
          </div>
        </el-card>

        <el-card>
          <template #header>
            <div class="card-header">
              使用说明
            </div>
          </template>
          <div class="help-list">
            <div>后台服务默认监听 http://localhost:8000</div>
            <div>可通过 VITE_API_BASE_URL 修改前端请求地址</div>
            <div>企业信息用于生成事件影响分析结果</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function copyApiUrl() {
  try {
    await navigator.clipboard.writeText(apiBaseUrl)
    ElMessage.success('已复制')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}
</script>

<style scoped>
.settings-view {
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
}

.subtitle {
  margin: 6px 0 0;
  color: #6B7280;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.card-header {
  font-weight: 600;
}

.card-footer {
  margin-top: 16px;
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.help-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #374151;
}
</style>

<template>
  <div class="event-detail-view">
    <div class="container">
      <!-- Back Button -->
      <el-button
        class="back-button"
        @click="goBack"
      >
        <el-icon><ArrowLeft /></el-icon>
        返回列表
      </el-button>

      <!-- Loading State -->
      <div
        v-if="eventsStore.loading"
        class="loading-state"
      >
        <el-skeleton
          :rows="10"
          animated
        />
      </div>

      <!-- Event Content -->
      <div
        v-else-if="eventsStore.currentEvent"
        class="event-content"
      >
        <!-- Hero Section with Impact Score -->
        <div
          class="hero-section"
          :class="getImpactClass(eventsStore.currentEvent.impactScore)"
        >
          <div class="hero-content">
            <div class="score-display">
              <ImpactBadge
                :score="eventsStore.currentEvent.impactScore"
                :size="150"
              />
              <div class="score-label">
                影响程度: {{ eventsStore.currentEvent.impactScore }}/10
              </div>
            </div>
            <div class="event-info">
              <h1 class="event-title">
                {{ eventsStore.currentEvent.title }}
              </h1>
              <div class="event-meta">
                <el-tag type="info">
                  {{ eventsStore.currentEvent.source }}
                </el-tag>
                <span class="publish-time">{{ formatFullTime(eventsStore.currentEvent.publishedAt) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-wrapper">
          <!-- Main Article -->
          <div class="main-column">
            <div class="card">
              <div class="card-header">
                <h2>新闻内容</h2>
                <el-button
                  type="primary"
                  text
                  :href="eventsStore.currentEvent.url"
                  target="_blank"
                >
                  <el-icon><Link /></el-icon>
                  查看原文
                </el-button>
              </div>
              <div class="card-body">
                <div class="article-content">
                  {{ eventsStore.currentEvent.content }}
                </div>
              </div>
            </div>

            <!-- Impact Analysis -->
            <div class="card">
              <div class="card-header">
                <h2>AI 影响分析</h2>
                <el-tag :type="eventsStore.currentEvent.analysisStatus === 'success' ? 'success' : 'warning'">
                  {{ eventsStore.currentEvent.analysisStatus === 'success' ? '分析成功' : '分析失败' }}
                </el-tag>
              </div>
              <div class="card-body">
                <div
                  v-if="eventsStore.currentEvent.impactSummary"
                  class="impact-summary"
                >
                  {{ eventsStore.currentEvent.impactSummary }}
                </div>
                <div
                  v-else
                  class="no-analysis"
                >
                  <el-empty description="暂无分析结果" />
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="sidebar">
            <!-- Company Context -->
            <div class="card">
              <div class="card-header">
                <h2>企业信息</h2>
              </div>
              <div class="card-body">
                <el-empty description="未关联企业" />
              </div>
            </div>

            <!-- Related Events -->
            <div class="card">
              <div class="card-header">
                <h2>相关事件</h2>
              </div>
              <div class="card-body">
                <el-empty description="暂无相关事件" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else
        class="error-state"
      >
        <el-result
          icon="error"
          title="加载失败"
          sub-title="事件不存在或已被删除"
        >
          <template #extra>
            <el-button
              type="primary"
              @click="goBack"
            >
              返回列表
            </el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventsStore } from '@/store/events'
import ImpactBadge from '@/components/ImpactBadge.vue'
import { ArrowLeft, Link } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
const eventsStore = useEventsStore()

onMounted(() => {
  const eventId = route.params.id as string
  eventsStore.fetchEventById(eventId)
})

const goBack = () => {
  router.push('/')
}

const formatFullTime = (timestamp: string) => {
  return dayjs(timestamp).format('YYYY年MM月DD日 HH:mm')
}

const getImpactClass = (score: number) => {
  if (score >= 7) return 'high-impact'
  if (score >= 4) return 'medium-impact'
  return 'low-impact'
}
</script>

<style scoped>
.event-detail-view {
  min-height: 100vh;
  padding-bottom: 48px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-button {
  margin: 24px 0;
}

/* Loading State */
.loading-state {
  padding: 48px 24px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  border-radius: 12px;
  padding: 48px;
  margin-bottom: 24px;
  color: white;
}

.hero-section.low-impact {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

.hero-section.medium-impact {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

.hero-content {
  display: flex;
  gap: 48px;
  align-items: center;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.score-label {
  font-size: 16px;
  font-weight: 500;
}

.event-info {
  flex: 1;
}

.event-title {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.event-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.publish-time {
  font-size: 14px;
  opacity: 0.9;
}

/* Content Wrapper */
.content-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.card-body {
  padding: 20px;
}

.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  white-space: pre-wrap;
}

.impact-summary {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
}

.no-analysis {
  text-align: center;
  padding: 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .event-title {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 32px 24px;
  }

  .event-title {
    font-size: 20px;
  }
}
</style>

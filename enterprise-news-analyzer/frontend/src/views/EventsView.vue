<template>
  <div class="events-view">
    <div class="container">
      <div class="content-wrapper">
        <!-- Sidebar Filter -->
        <aside class="sidebar">
          <FilterPanel
            :filters="eventsStore.filters"
            @update:filters="handleFiltersUpdate"
            @reset="handleReset"
          />
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <!-- Statistics Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">
                {{ statistics.totalEvents || 0 }}
              </div>
              <div class="stat-label">
                总事件数
              </div>
            </div>
            <div class="stat-card highlight">
              <div class="stat-value">
                {{ statistics.highImpactEvents || 0 }}
              </div>
              <div class="stat-label">
                高影响事件
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-value">
                {{ statistics.todayEvents || 0 }}
              </div>
              <div class="stat-label">
                今日事件
              </div>
            </div>
          </div>

          <!-- Events List -->
          <div class="events-section">
            <div
              v-if="isRefreshing"
              class="refresh-overlay"
              v-loading="isRefreshing"
              element-loading-text="正在抓取全球新闻并进行 AI 分析，请稍候..."
              element-loading-background="rgba(255, 255, 255, 0.9)"
            ></div>
            <div class="section-header">
              <h2>事件列表</h2>
              <el-button
                :loading="isRefreshing"
                @click="handleRefresh"
              >
                <el-icon><Refresh /></el-icon>
                抓取最新
              </el-button>
            </div>

            <!-- Loading State -->
            <div
              v-if="eventsStore.loading && eventsStore.events.length === 0"
              class="loading-state"
            >
              <el-skeleton
                :rows="5"
                animated
              />
            </div>

            <!-- Empty State -->
            <div
              v-else-if="eventsStore.events.length === 0"
              class="empty-state"
            >
              <el-empty description="暂无事件数据">
                <el-button
                  type="primary"
                  @click="loadEvents"
                >
                  立即加载
                </el-button>
              </el-empty>
            </div>

            <!-- Events Grid -->
            <div
              v-else
              class="events-grid"
            >
              <EventCard
                v-for="event in eventsStore.events"
                :key="event.id"
                :event="event"
              />
            </div>

            <!-- Pagination -->
            <div
              v-if="eventsStore.events.length > 0"
              class="pagination"
            >
              <el-pagination
                v-model:current-page="currentPage"
                :page-size="eventsStore.pagination.pageSize"
                :total="eventsStore.pagination.total"
                layout="prev, pager, next, sizes, total"
                :page-sizes="[10, 20, 50, 100]"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEventsStore } from '@/store/events'
import FilterPanel from '@/components/FilterPanel.vue'
import EventCard from '@/components/EventCard.vue'
import { Refresh } from '@element-plus/icons-vue'

const eventsStore = useEventsStore()
const isRefreshing = ref(false)

const statistics = ref({
  totalEvents: 0,
  highImpactEvents: 0,
  todayEvents: 0
})

const currentPage = computed({
  get: () => eventsStore.pagination.page,
  set: (value) => {
    eventsStore.pagination.page = value
  }
})

onMounted(() => {
  loadEvents()
  loadStatistics()
})

async function loadEvents(page = 1) {
  try {
    await eventsStore.fetchEvents(page)
  } catch (error) {
    console.error('Failed to load events:', error)
  }
}

async function loadStatistics() {
  // TODO: Implement statistics API
  // For now, use computed values from store
  statistics.value = {
    totalEvents: eventsStore.events.length,
    highImpactEvents: eventsStore.highImpactEvents.length,
    todayEvents: eventsStore.events.filter(e => {
      const today = new Date().toDateString()
      return new Date(e.publishedAt).toDateString() === today
    }).length
  }
}

async function handleRefresh() {
  isRefreshing.value = true
  try {
    await eventsStore.refreshEvents()
    await loadStatistics()
  } catch (error) {
    console.error('Failed to refresh events:', error)
  } finally {
    isRefreshing.value = false
  }
}

function handleFiltersUpdate() {
  loadEvents(1)
}

function handleReset() {
  eventsStore.resetFilters()
  loadEvents(1)
}

function handlePageChange(page: number) {
  loadEvents(page)
}

function handleSizeChange(size: number) {
  eventsStore.pagination.pageSize = size
  loadEvents(1)
}
</script>

<style scoped>
.events-view {
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

.sidebar {
  position: sticky;
  top: 24px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Statistics Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card.highlight {
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  color: white;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #6B7280;
}

.stat-card.highlight .stat-label {
  color: rgba(255, 255, 255, 0.9);
}

/* Events Section */
.events-section {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.refresh-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Loading State */
.loading-state {
  padding: 24px;
}

/* Empty State */
.empty-state {
  padding: 48px 24px;
  text-align: center;
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

/* Pagination */
.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>

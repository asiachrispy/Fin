<template>
  <div
    class="event-card"
    :class="{ 'high-impact': isHighImpact }"
    :aria-label="`查看详情：${event.title}`"
    @click="handleClick"
  >
    <div class="card-header">
      <h3 class="title">
        {{ event.title }}
      </h3>
      <ImpactBadge :score="event.impactScore" />
    </div>

    <div class="card-body">
      <div class="meta">
        <el-tag
          size="small"
          type="info"
        >
          {{ event.source }}
        </el-tag>
        <span class="time">{{ formatTime(event.publishedAt) }}</span>
      </div>

      <p
        v-if="event.impactSummary"
        class="summary"
      >
        {{ event.impactSummary }}
      </p>

      <div class="status">
        <el-tag
          :type="event.analysisStatus === 'success' ? 'success' : 'warning'"
          size="small"
        >
          {{ event.analysisStatus === 'success' ? '分析成功' : '分析失败' }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'
import ImpactBadge from './ImpactBadge.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

const props = defineProps<{
  event: Event
}>()

const router = useRouter()
const isHighImpact = computed(() => props.event.impactScore >= 7)

const formatTime = (timestamp: string) => {
  return dayjs(timestamp).fromNow()
}

const handleClick = () => {
  router.push(`/events/${props.event.id}`)
}
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.event-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.event-card.high-impact {
  border-left: 4px solid #DC2626;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.time {
  font-size: 12px;
  color: #6B7280;
}

.summary {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column-reverse;
  }

  .title {
    font-size: 16px;
  }
}
</style>

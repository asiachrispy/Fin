<template>
  <div
    class="impact-badge"
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
}>()

const scoreColor = computed(() => {
  if (props.score >= 7) return '#DC2626'
  if (props.score >= 4) return '#F59E0B'
  return '#10B981'
})
</script>

<style scoped>
.impact-badge {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.score {
  font-size: 32px;
  font-weight: bold;
  color: white;
}
</style>

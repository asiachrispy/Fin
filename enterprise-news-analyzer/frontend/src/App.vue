<template>
  <div id="app">
    <el-container>
      <!-- Top Navigation -->
      <el-header class="app-header">
        <div class="header-content">
          <div class="logo">
            <el-icon :size="24">
              <DataAnalysis />
            </el-icon>
            <span class="logo-text">全球突发事件影响分析系统</span>
          </div>
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            :ellipsis="false"
            class="header-menu"
            router
          >
            <el-menu-item index="/">
              事件列表
            </el-menu-item>
            <el-menu-item index="/companies">
              企业管理
            </el-menu-item>
            <el-menu-item index="/settings">
              设置
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!-- Main Content -->
      <el-main class="app-main">
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DataAnalysis } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 0;
  height: 64px;
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1E3A8A;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
}

.header-menu {
  border-bottom: none;
  flex: 1;
  justify-content: flex-end;
}

.app-main {
  background: #F9FAFB;
  min-height: calc(100vh - 64px);
  padding: 24px;
}

/* Page transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

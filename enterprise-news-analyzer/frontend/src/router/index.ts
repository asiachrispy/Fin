import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'events',
      component: () => import('@/views/EventsView.vue'),
      meta: { title: '事件列表' }
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: () => import('@/views/EventDetailView.vue'),
      meta: { title: '事件详情' }
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('@/views/CompaniesView.vue'),
      meta: { title: '企业管理' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { title: '设置' }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  // Set page title
  const title = to.meta.title as string
  document.title = title ? `${title} - 全球突发事件影响分析系统` : '全球突发事件影响分析系统'
  next()
})

export default router

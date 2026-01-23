import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Event, EventFilters, PaginatedResponse } from '@/types'
import { api } from '@/api'

export const useEventsStore = defineStore('events', () => {
  // State
  const events = ref<Event[]>([])
  const currentEvent = ref<Event | null>(null)
  const loading = ref(false)
  const filters = ref<EventFilters>({
    impactLevels: ['all'],
    analysisStatus: 'all'
  })
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  // Getters
  const highImpactEvents = computed(() =>
    events.value.filter(event => event.impactScore >= 7)
  )

  const lowImpactEvents = computed(() =>
    events.value.filter(event => event.impactScore >= 1 && event.impactScore <= 3)
  )

  const mediumImpactEvents = computed(() =>
    events.value.filter(event => event.impactScore >= 4 && event.impactScore <= 6)
  )

  // Actions
  async function fetchEvents(page = 1) {
    loading.value = true
    try {
      const params = {
        page,
        page_size: pagination.value.pageSize,
        ...filters.value
      }
      const response = await api.getEvents(params)
      if (Array.isArray(response)) {
        events.value = response
        pagination.value = {
          page,
          pageSize: pagination.value.pageSize,
          total: response.length,
          totalPages: 1
        }
      } else {
        const paginated = response as PaginatedResponse<Event>
        events.value = paginated.items || []
        pagination.value = {
          page: paginated.page || page,
          pageSize: paginated.pageSize || pagination.value.pageSize,
          total: paginated.total || events.value.length,
          totalPages: paginated.totalPages || 1
        }
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function fetchEventById(id: string) {
    loading.value = true
    try {
      currentEvent.value = await api.getEventById(id)
    } catch (error) {
      console.error('Failed to fetch event:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function refreshEvents() {
    loading.value = true
    try {
      await api.refreshEvents()
      await fetchEvents(1) // Reload list after refresh
    } catch (error) {
      console.error('Failed to refresh events:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function updateFilters(newFilters: Partial<EventFilters>) {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page
  }

  function resetFilters() {
    filters.value = {
      impactLevels: ['all'],
      analysisStatus: 'all'
    }
    pagination.value.page = 1
  }

  return {
    // State
    events,
    currentEvent,
    loading,
    filters,
    pagination,
    // Getters
    highImpactEvents,
    lowImpactEvents,
    mediumImpactEvents,
    // Actions
    fetchEvents,
    fetchEventById,
    refreshEvents,
    updateFilters,
    resetFilters
  }
})

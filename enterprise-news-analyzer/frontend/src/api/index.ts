import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { Company, Event, EventFilters, PaginatedResponse, Statistics } from '@/types'
import { mockApi } from './mock'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.detail || error.message || '请求失败'
    console.error('API Error:', message)
    return Promise.reject(new Error(message))
  }
)

// API Functions
type EventsResponse = PaginatedResponse<Event> | Event[]

type CompanyPayload = Partial<Company>

type CompanyInfo = {
  industry?: string
  business_description?: string
  businessDescription?: string
  main_markets?: string
  mainMarkets?: string
  competitors?: string
}

type EventsQuery = EventFilters & {
  page?: number
  page_size?: number
}

export const api = {
  // Events
  getEvents: (params?: EventsQuery) => {
    if (USE_MOCK && mockApi) {
      return mockApi.getEvents()
    }
    return apiClient.get<EventsResponse>('/events', { params }) as unknown as Promise<EventsResponse>
  },

  getEventById: (id: string) => {
    if (USE_MOCK && mockApi) {
      return mockApi.getEventById(id)
    }
    return apiClient.get<Event>(`/events/${id}`) as unknown as Promise<Event>
  },

  refreshEvents: () => {
    if (USE_MOCK) {
      return Promise.resolve({ message: 'Mock refresh success' })
    }
    return apiClient.post('/events/refresh')
  },

  // Companies
  getCompanies: () => {
    if (USE_MOCK && mockApi) {
      return mockApi.getCompanies()
    }
    return apiClient.get<Company[]>('/companies') as unknown as Promise<Company[]>
  },

  createCompany: (data: CompanyPayload) => {
    if (USE_MOCK && mockApi) {
      return mockApi.createCompany(data)
    }
    return apiClient.post<Company>('/companies', data) as unknown as Promise<Company>
  },

  updateCompany: (id: string, data: CompanyPayload) => {
    if (USE_MOCK && mockApi) {
      return mockApi.updateCompany(id, data)
    }
    return apiClient.put<Company>(`/companies/${id}`, data) as unknown as Promise<Company>
  },

  deleteCompany: (id: string) => {
    if (USE_MOCK && mockApi) {
      return mockApi.deleteCompany(id)
    }
    return apiClient.delete(`/companies/${id}`)
  },

  getCompanyInfo: (name: string) => {
    // Mock AI auto-fill
    if (USE_MOCK) {
      return Promise.resolve({
        industry: '科技',
        businessDescription: '这是一家科技公司，从事软件开发和云服务。',
        mainMarkets: '全球',
        competitors: '竞争对手A, 竞争对手B'
      })
    }
    return apiClient.get<CompanyInfo>('/companies/auto-fill', { params: { name } }) as unknown as Promise<CompanyInfo>
  },

  // Statistics
  getStatistics: () => {
    if (USE_MOCK) {
      return Promise.resolve({
        totalEvents: 4,
        highImpactEvents: 1,
        todayEvents: 2,
        totalCompanies: 2
      })
    }
    return apiClient.get<Statistics>('/statistics') as unknown as Promise<Statistics>
  }
}

export default apiClient

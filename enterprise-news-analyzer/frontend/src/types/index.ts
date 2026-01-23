// Types for the application

export interface Event {
  id: string
  title: string
  content: string
  source: string
  publishedAt: string
  url: string
  impactScore: number
  impactSummary: string
  analysisStatus: 'success' | 'failed'
  createdAt: string
}

export interface Company {
  id: string
  name: string
  industry?: string
  businessDescription?: string
  mainMarkets?: string
  competitors?: string
  createdAt: string
  updatedAt: string
}

export interface EventFilters {
  keyword?: string
  impactLevels?: string[]
  dateRange?: [string, string]
  analysisStatus?: string
}

export interface Statistics {
  totalEvents: number
  highImpactEvents: number
  todayEvents: number
  totalCompanies: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

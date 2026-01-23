import type { Company, Event, PaginatedResponse } from '@/types'

export const mockApi = {
  getEvents: (): Promise<PaginatedResponse<Event>> => {
    return Promise.resolve({
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0
    })
  },
  getEventById: (_id: string): Promise<Event> => {
    return Promise.reject(new Error('Mock event not found'))
  },
  getCompanies: (): Promise<Company[]> => {
    return Promise.resolve([])
  },
  createCompany: (data: Partial<Company>): Promise<Company> => {
    return Promise.resolve({
      id: 'mock-id',
      name: data.name || 'Mock Company',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data
    } as Company)
  },
  updateCompany: (id: string, data: Partial<Company>): Promise<Company> => {
    return Promise.resolve({
      id,
      name: 'Mock Company',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data
    } as Company)
  },
  deleteCompany: (_id: string): Promise<void> => {
    return Promise.resolve()
  }
}

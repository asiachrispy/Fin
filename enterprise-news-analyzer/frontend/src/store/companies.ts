import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Company } from '@/types'
import { api } from '@/api'

export const useCompaniesStore = defineStore('companies', () => {
  // State
  const companies = ref<Company[]>([])
  const currentCompany = ref<Company | null>(null)
  const loading = ref(false)
  const dialogVisible = ref(false)
  const editingCompany = ref<Company | null>(null)

  // Actions
  async function fetchCompanies() {
    loading.value = true
    try {
      companies.value = await api.getCompanies() as unknown as Company[]
    } catch (error) {
      console.error('Failed to fetch companies:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createCompany(data: Partial<Company>) {
    loading.value = true
    try {
      const newCompany = await api.createCompany(data) as unknown as Company
      companies.value.push(newCompany)
      return newCompany
    } catch (error) {
      console.error('Failed to create company:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateCompany(id: string, data: Partial<Company>) {
    loading.value = true
    try {
      const updatedCompany = await api.updateCompany(id, data) as unknown as Company
      const index = companies.value.findIndex(c => c.id === id)
      if (index !== -1) {
        companies.value[index] = updatedCompany
      }
      return updatedCompany
    } catch (error) {
      console.error('Failed to update company:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteCompany(id: string) {
    loading.value = true
    try {
      await api.deleteCompany(id)
      companies.value = companies.value.filter(c => c.id !== id)
    } catch (error) {
      console.error('Failed to delete company:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function autoFillCompanyInfo(name: string): Promise<Record<string, string>> {
    try {
      const info = await api.getCompanyInfo(name) as unknown as Record<string, string>
      return info
    } catch (error) {
      console.error('Failed to auto-fill company info:', error)
      throw error
    }
  }

  function openAddDialog() {
    editingCompany.value = null
    dialogVisible.value = true
  }

  function openEditDialog(company: Company) {
    editingCompany.value = company
    dialogVisible.value = true
  }

  function closeDialog() {
    dialogVisible.value = false
    editingCompany.value = null
  }

  return {
    // State
    companies,
    currentCompany,
    loading,
    dialogVisible,
    editingCompany,
    // Actions
    fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    autoFillCompanyInfo,
    openAddDialog,
    openEditDialog,
    closeDialog
  }
})

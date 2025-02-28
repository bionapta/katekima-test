import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Berry } from '@/types/berry'

export const useBerryStore = defineStore('berry', () => {
  const berries = ref<Berry[]>([])
  const loading = ref(false)
  const searchQuery = ref('')
  const error = ref<string | null>(null)

  // Computed
  const filteredBerries = computed(() => {
    if (!searchQuery.value) return berries.value
    const query = searchQuery.value.toLowerCase()
    return berries.value.filter((berry) => berry.name.toLowerCase().includes(query))
  })

  // Actions
  const fetchBerries = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://pokeapi.co/api/v2/berry/')
      const data = await response.json()
      berries.value = data.results.sort((a: Berry, b: Berry) => a.name.localeCompare(b.name))
    } catch (err) {
      error.value = 'Failed to fetch berries'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getBerry = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/berry/${id}/`)
      const data = await response.json()
      return data
    } catch (err) {
      error.value = 'Failed to fetch berry details'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBerry = async (name: string) => {
    berries.value = berries.value.filter((berry) => berry.name !== name)
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    berries,
    loading,
    error,
    searchQuery,
    filteredBerries,
    fetchBerries,
    getBerry,
    deleteBerry,
    setSearchQuery,
  }
})

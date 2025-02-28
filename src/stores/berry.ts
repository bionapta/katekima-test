import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Berry } from '@/types/berry'

export const useBerryStore = defineStore('berry', () => {
  const berries = ref<Berry[]>([])
  const berryDetail = ref<Berry | null>(null) // Tambahkan state untuk menyimpan detail berry
  const loading = ref(false)
  const detailLoading = ref(false) // Tambahkan state untuk loading di halaman detail
  const searchQuery = ref('')
  const error = ref<string | null>(null)

  // Computed
  const filteredBerries = computed(() => {
    if (!searchQuery.value) return berries.value
    const query = searchQuery.value.toLowerCase()
    return berries.value.filter((berry) => berry.name.toLowerCase().includes(query))
  })

  // Fetch semua berries
  const fetchBerries = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://pokeapi.co/api/v2/berry/')
      const data = await response.json()
      console.log("Berry Detail Data:", data);
      berryDetail.value = data;
    } catch (err) {
      error.value = 'Failed to fetch berries'
      throw err
    } finally {
      detailLoading.value = false;
    }
  }

  // Fetch detail berry berdasarkan ID
  const fetchBerryById = async (id: string) => {
    detailLoading.value = true
    error.value = null
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/berry/${id}/`)
      const data = await response.json()
      berryDetail.value = data
    } catch (err) {
      error.value = 'Failed to fetch berry details'
      throw err
    } finally {
      detailLoading.value = false
    }
  }

  // Hapus berry dari daftar
  const deleteBerry = async (name: string) => {
    berries.value = berries.value.filter((berry) => berry.name !== name)
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    berries,
    berryDetail, // Pastikan berryDetail tersedia di return
    loading,
    detailLoading, // Pastikan detailLoading tersedia
    error,
    searchQuery,
    filteredBerries,
    fetchBerries,
    fetchBerryById, // Pastikan fetchBerryById tersedia
    deleteBerry,
    setSearchQuery,
  }
})

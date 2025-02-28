<template>
  <div class="flex items-center justify-between py-4">
    <div class="flex items-center space-x-2">
      <span>{{ $t('common.itemsPerPage') }}:</span>
      <select
        v-model="localItemsPerPage"
        @change="changeItemsPerPage"
        class="border rounded px-2 py-1"
      >
        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="flex items-center space-x-2">
      <button
        @click="changePage(1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border"
        :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        &laquo;
      </button>
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border"
        :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        &lsaquo;
      </button>

      <div class="flex space-x-1">
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="changePage(page)"
          class="px-3 py-1 rounded border"
          :class="page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border"
        :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        &rsaquo;
      </button>
      <button
        @click="changePage(totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border"
        :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      >
        &raquo;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  itemsPerPage: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'update:itemsPerPage', itemsPerPage: number): void
}>()

const localItemsPerPage = ref(props.itemsPerPage)
const itemsPerPageOptions = [10, 30, 50]

const displayedPages = computed(() => {
  const pages = []
  const maxPagesToShow = 5

  let startPage = Math.max(1, props.currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(props.totalPages, startPage + maxPagesToShow - 1)

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

const changePage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('update:currentPage', page)
}

const changeItemsPerPage = () => {
  emit('update:itemsPerPage', localItemsPerPage.value)
}

watch(
  () => props.itemsPerPage,
  (newValue) => {
    localItemsPerPage.value = newValue
  },
)
</script>

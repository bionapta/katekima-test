<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-gray-900">{{ $t('berry.title') }}</h1>
            <router-link
              to="/add-product"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              {{ $t('common.add') }}
            </router-link>
          </div>

          <!-- Search -->
          <div class="mt-4">
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                v-model="searchQuery"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :placeholder="$t('common.search')"
                @input="handleSearch"
              />
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t('berry.no') }}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t('berry.name') }}
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ $t('berry.actions') }}
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading" class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(berry, index) in paginatedBerries"
                :key="berry.name"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ calculateItemNumber(index) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 capitalize">{{ berry.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex space-x-2">
                    <button
                      @click="handleEdit(berry)"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                    >
                      <PencilIcon class="h-4 w-4 mr-1" />
                      {{ $t('common.edit') }}
                    </button>
                    <button
                      @click="handleDelete(berry)"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      <TrashIcon class="h-4 w-4 mr-1" />
                      {{ $t('common.delete') }}
                    </button>
                    <router-link
                      :to="`/berry-detail/${getBerryId(berry.url)}`"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      <EyeIcon class="h-4 w-4 mr-1" />
                      {{ $t('common.detail') }}
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="n in itemsPerPage" :key="n">
                <td colspan="3" class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse flex space-x-4">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div class="flex items-center">
            <span class="text-sm text-gray-700">{{ $t('common.itemsPerPage') }}:</span>
            <select
              v-model="itemsPerPage"
              class="ml-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              @change="handleItemsPerPageChange"
            >
              <option v-for="size in [10, 30, 50]" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>

          <div class="mt-4 sm:mt-0">
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="handlePageChange(1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <span class="sr-only">{{ $t('pagination.first') }}</span>
                <ChevronDoubleLeftIcon class="h-5 w-5" />
              </button>
              <button
                @click="handlePageChange(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <span class="sr-only">{{ $t('pagination.previous') }}</span>
                <ChevronLeftIcon class="h-5 w-5" />
              </button>
              <span
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                {{ currentPage }} / {{ totalPages }}
              </span>
              <button
                @click="handlePageChange(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              >
                <span class="sr-only">{{ $t('pagination.next') }}</span>
                <ChevronRightIcon class="h-5 w-5" />
              </button>
              <button
                @click="handlePageChange(totalPages)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              >
                <span class="sr-only">{{ $t('pagination.last') }}</span>
                <ChevronDoubleRightIcon class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <TransitionRoot appear :show="showDeleteModal" as="template">
      <Dialog as="div" @close="closeDeleteModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ $t('berry.confirmDelete') }}
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ $t('berry.deleteConfirmMessage', { name: berryToDelete?.name }) }}
                  </p>
                </div>

                <div class="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="confirmDelete"
                  >
                    {{ $t('common.delete') }}
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    @click="closeDeleteModal"
                  >
                    {{ $t('common.cancel') }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Toast Notifications -->
    <div class="fixed bottom-0 right-0 p-6 z-50">
      <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden mb-2"
        >
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="toast.type === 'success'" class="h-6 w-6 text-green-400" />
                <ExclamationCircleIcon v-else class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ toast.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeToast(toast.id)"
                  class="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XIcon,
} from '@heroicons/vue/solid'
import { useBerryStore } from '@/stores/berry'
import type { Berry } from '@/types/berry'

const router = useRouter()
const berryStore = useBerryStore()

// State
const searchQuery = ref(localStorage.getItem('berrySearchQuery') || '')
const currentPage = ref(parseInt(localStorage.getItem('berryCurrentPage') || '1'))
const itemsPerPage = ref(parseInt(localStorage.getItem('berryItemsPerPage') || '10'))
const showDeleteModal = ref(false)
const berryToDelete = ref<Berry | null>(null)
const toasts = ref<Array<{ id: number; type: 'success' | 'error'; message: string }>>([])

// Computed
const totalPages = computed(() => Math.ceil(berryStore.filteredBerries.length / itemsPerPage.value))
const paginatedBerries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return berryStore.filteredBerries.slice(start, end)
})

// Methods
const calculateItemNumber = (index: number) => {
  return (currentPage.value - 1) * itemsPerPage.value + index + 1
}

const handleSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  berryStore.setSearchQuery(value)
  localStorage.setItem('berrySearchQuery', value)
  currentPage.value = 1 // Reset to first page when searching
}

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    localStorage.setItem('berryCurrentPage', page.toString())
  }
}

const handleItemsPerPageChange = () => {
  localStorage.setItem('berryItemsPerPage', itemsPerPage.value.toString())
  currentPage.value = 1 // Reset to first page when changing items per page
}

const getBerryId = (url: string) => {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? matches[1] : ''
}

const handleEdit = (berry: Berry) => {
  router.push(`/edit-product/${getBerryId(berry.url)}`)
}

const handleDelete = (berry: Berry) => {
  berryToDelete.value = berry
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  berryToDelete.value = null
}

const confirmDelete = async () => {
  if (berryToDelete.value) {
    try {
      await berryStore.deleteBerry(berryToDelete.value.name)
      addToast('success', `Successfully deleted ${berryToDelete.value.name}`)
      closeDeleteModal()
    } catch (error) {
      addToast('error', `Failed to delete ${berryToDelete.value.name}`)
    }
  }
}

const addToast = (type: 'success' | 'error', message: string) => {
  const id = Date.now()
  toasts.value.push({ id, type, message })
  setTimeout(() => removeToast(id), 5000)
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

// Lifecycle
onMounted(async () => {
  try {
    await berryStore.fetchBerries()
  } catch (error) {
    addToast('error', 'Failed to fetch berries')
  }
})
</script>

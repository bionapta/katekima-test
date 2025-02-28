<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-semibold text-gray-900">{{ $t('product.editTitle') }}</h1>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Product Name -->
          <div>
            <label for="title" class="block text-sm font-bold text-gray-700">
              {{ $t('product.name') }}
            </label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors.title
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
              ]"
              :disabled="loading"
            />
            <p v-if="errors.title" class="mt-2 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <!-- Price -->
          <div>
            <label for="price" class="block text-sm font-bold text-gray-700">
              {{ $t('product.price') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              </div>
              <input
                type="number"
                id="price"
                v-model="form.price"
                min="0"
                step="0.01"
                class="pl-7 pr-3 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.price }"
                :disabled="loading"
              />
            </div>
            <p v-if="errors.price" class="mt-2 text-sm text-red-600">{{ errors.price }}</p>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-bold text-gray-700">
              {{ $t('product.description') }}
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.description }"
              :disabled="loading"
            ></textarea>
            <p v-if="errors.description" class="mt-2 text-sm text-red-600">
              {{ errors.description }}
            </p>
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-bold text-gray-700">
              {{ $t('product.category') }}
            </label>
            <select
              id="category"
              v-model="form.category"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.category }"
              :disabled="loading"
            >
              <option value="">{{ $t('-') }}</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <p v-if="errors.category" class="mt-2 text-sm text-red-600">{{ errors.category }}</p>
          </div>

          <!-- Image URL -->
          <div>
            <label for="image" class="block text-sm font-bold text-gray-700">
              {{ $t('product.image') }}
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                type="url"
                id="image"
                v-model="form.image"
                class="flex-1 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.image }"
                :disabled="loading"
              />
            </div>
            <p v-if="errors.image" class="mt-2 text-sm text-red-600">{{ errors.image }}</p>
          </div>

          <!-- Preview Image -->
          <div v-if="form.image" class="mt-4">
            <img
              :src="form.image"
              alt="Product preview"
              class="h-48 w-48 object-cover rounded-lg"
              @error="handleImageError"
            />
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              @click="$router.push('/berry-list')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="loading"
            >
              {{ $t('common.cancel') }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="loading"
            >
              <template v-if="loading">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ $t('common.saving') }}
              </template>
              <template v-else>
                {{ $t('common.save') }}
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>

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
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CheckCircleIcon, ExclamationCircleIcon, XIcon } from '@heroicons/vue/solid'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types/product'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

// Form state
const form = reactive<Product>({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
})

const loading = ref(false)
const errors = reactive({
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
})

const toasts = ref<Array<{ id: number; type: 'success' | 'error'; message: string }>>([])

// Available categories
const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"]

// Methods
const validateForm = () => {
  let isValid = true
  errors.title = ''
  errors.price = ''
  errors.description = ''
  errors.category = ''
  errors.image = ''

  if (!form.title.trim()) {
    errors.title = 'Product name is required'
    isValid = false
  }

  if (!form.price || form.price <= 0) {
    errors.price = 'Price must be greater than 0'
    isValid = false
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required'
    isValid = false
  }

  if (!form.category) {
    errors.category = 'Category is required'
    isValid = false
  }

  if (!form.image.trim()) {
    errors.image = 'Image URL is required'
    isValid = false
  } else {
    try {
      new URL(form.image)
    } catch {
      errors.image = 'Please enter a valid URL'
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await productStore.editProduct(route.params.id, form)
    addToast('success', 'Product updated successfully')
    router.push('/berry-list')
  } catch (error) {
    addToast('error', 'Failed to update product')
  } finally {
    loading.value = false
  }
}

const handleImageError = () => {
  errors.image = 'Invalid image URL'
  form.image = ''
}

const addToast = (type: 'success' | 'error', message: string) => {
  const id = Date.now()
  toasts.value.push({ id, type, message })
  setTimeout(() => removeToast(id), 5000)
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

const loadProduct = async () => {
  loading.value = true
  try {
    const product = await productStore.getProduct(route.params.id)
    form.title = product.title
    form.price = product.price
    form.description = product.description
    form.category = product.category
    form.image = product.image
  } catch (error) {
    addToast('error', 'Failed to load product')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
/* Gaya khusus untuk form input */
input, textarea, select {
  border: 2px solid #d1d5db; /* Border abu-abu */
  padding: 0.5rem; /* Padding */
  border-radius: 0.375rem; /* Sudut membulat */
  outline: none; /* Hilangkan outline default */
  transition: border-color 0.3s; /* Transisi untuk perubahan warna border */
}

input:focus, textarea:focus, select:focus {
  border-color: #4f46e5; /* Border biru saat fokus */
}

input.error, textarea.error, select.error {
  border-color: #e53e3e; /* Border merah untuk error */
}

label {
  font-weight: bold; /* Teks label tebal */
}
</style>
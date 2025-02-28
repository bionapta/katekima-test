<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-for="field in formFields" :key="field.name">
      <label :for="field.name" class="block text-sm font-medium text-gray-700">
        {{ $t(`product.${field.name}`) }}
      </label>
      <input
        v-if="field.type !== 'textarea'"
        :id="field.name"
        v-model="form[field.name]"
        :type="field.type"
        :step="field.step"
        :required="field.required"
        :disabled="loading"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :class="{ 'border-red-500': errors[field.name] }"
      />
      <textarea
        v-else
        :id="field.name"
        v-model="form[field.name]"
        :required="field.required"
        :disabled="loading"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :class="{ 'border-red-500': errors[field.name] }"
      ></textarea>
      <p v-if="errors[field.name]" class="mt-2 text-sm text-red-600">{{ errors[field.name] }}</p>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {{ $t('common.cancel') }}
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ loading ? $t('common.saving') : $t('common.save') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Product } from '@/types/product'

const { t } = useI18n()

const props = defineProps<{
  initialData?: Product
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: Product): void
  (e: 'cancel'): void
}>()

const form = reactive<Product>(
  props.initialData || {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  },
)

const errors = ref<Record<string, string>>({})

const formFields = [
  { name: 'title', type: 'text', required: true },
  { name: 'price', type: 'number', step: '0.01', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'category', type: 'text', required: true },
  { name: 'image', type: 'url', required: true },
]

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.title.trim()) {
    errors.value.title = t('validation.required', { field: t('product.title') })
    isValid = false
  }

  if (form.price <= 0) {
    errors.value.price = t('validation.positiveNumber', { field: t('product.price') })
    isValid = false
  }

  if (!form.description.trim()) {
    errors.value.description = t('validation.required', { field: t('product.description') })
    isValid = false
  }

  if (!form.category.trim()) {
    errors.value.category = t('validation.required', { field: t('product.category') })
    isValid = false
  }

  if (!form.image.trim()) {
    errors.value.image = t('validation.required', { field: t('product.image') })
  } else if (!isValidUrl(form.image)) {
    errors.value.image = t('validation.invalidUrl', { field: t('product.image') })
    isValid = false
  }

  return isValid
}

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...form })
  }
}
</script>

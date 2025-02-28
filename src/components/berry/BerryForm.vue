<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">{{
        $t('berry.name')
      }}</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>

    <div>
      <label for="growthTime" class="block text-sm font-medium text-gray-700">{{
        $t('berry.growthTime')
      }}</label>
      <input
        id="growthTime"
        v-model.number="form.growth_time"
        type="number"
        required
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>

    <div>
      <label for="maxHarvest" class="block text-sm font-medium text-gray-700">{{
        $t('berry.maxHarvest')
      }}</label>
      <input
        id="maxHarvest"
        v-model.number="form.max_harvest"
        type="number"
        required
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>

    <div>
      <label for="size" class="block text-sm font-medium text-gray-700">{{
        $t('berry.size')
      }}</label>
      <input
        id="size"
        v-model.number="form.size"
        type="number"
        required
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ $t('common.cancel') }}
      </button>
      <button
        type="submit"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ $t('common.save') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  initialData?: {
    name: string
    growth_time: number
    max_harvest: number
    size: number
  }
}>()

const emit = defineEmits<{
  (
    e: 'submit',
    data: { name: string; growth_time: number; max_harvest: number; size: number },
  ): void
  (e: 'cancel'): void
}>()

const form = ref(
  props.initialData || {
    name: '',
    growth_time: 0,
    max_harvest: 0,
    size: 0,
  },
)

const submitForm = () => {
  emit('submit', form.value)
}
</script>

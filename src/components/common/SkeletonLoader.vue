<template>
  <div class="animate-pulse">
    <div v-if="type === 'table'" class="space-y-4">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div v-for="i in rows" :key="i" class="space-y-2">
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>

    <div v-else-if="type === 'detail'" class="space-y-4">
      <div class="h-6 bg-gray-200 rounded w-1/4"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>

    <div v-else class="space-y-4">
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'table' | 'detail' | 'default'
  rows?: number
}>()
</script>

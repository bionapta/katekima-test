<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ $t('berry.detailTitle') }}</h1>

    <div class="mb-6 flex items-end space-x-4">
      <div class="w-full max-w-xs">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('berry.selectBerry') }}
        </label>
        <select
          v-model="selectedBerryId"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="berry in berries" :key="berry.name" :value="getBerryIdFromUrl(berry.url)">
            {{ berry.name }}
          </option>
        </select>
      </div>
      <button @click="loadBerryDetail" class="btn btn-primary">
        {{ $t('common.move') }}
      </button>
    </div>

    <div v-if="!detailLoading && berryDetail" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4 capitalize">{{ berryDetail.name }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <div><span class="font-medium">Growth Time:</span> {{ berryDetail.growth_time }}</div>
          <div><span class="font-medium">Max Harvest:</span> {{ berryDetail.max_harvest }}</div>
          <div>
            <span class="font-medium">Natural Gift Power:</span>
            {{ berryDetail.natural_gift_power }}
          </div>
          <div><span class="font-medium">Size:</span> {{ berryDetail.size }}</div>
        </div>

        <div class="space-y-2">
          <div><span class="font-medium">Smoothness:</span> {{ berryDetail.smoothness }}</div>
          <div><span class="font-medium">Soil Dryness:</span> {{ berryDetail.soil_dryness }}</div>
          <div><span class="font-medium">Firmness:</span> {{ berryDetail.firmness.name }}</div>
          <div>
            <span class="font-medium">Natural Gift Type:</span>
            {{ berryDetail.natural_gift_type.name }}
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="font-bold mb-2">Flavors:</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div
            v-for="flavor in berryDetail.flavors"
            :key="flavor.flavor.name"
            class="p-2 bg-gray-100 rounded"
          >
            <span class="font-medium">{{ flavor.flavor.name }}:</span> {{ flavor.potency }}
          </div>
        </div>
      </div>
    </div>

    <SkeletonLoader v-else-if="detailLoading" type="detail" />

    <div v-else class="bg-white p-6 rounded-lg shadow-md text-center">
      <p>{{ $t('berry.selectBerry') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBerryStore } from '@/stores/berry'
import SkeletonLoader from '@/components/common/SkeletonLoader.vue'

const berryStore = useBerryStore()
const route = useRoute()

const selectedBerryId = ref<string | null>(null)

const { berries, berryDetail, detailLoading, getBerryIdFromUrl } = berryStore

onMounted(async () => {
  // Fetch all berries for the dropdown
  if (berries.value.length === 0) {
    await berryStore.fetchAllBerries()
  }

  // Check if we have a berry ID in the route
  const berryId = route.params.id as string
  if (berryId) {
    selectedBerryId.value = berryId
    await berryStore.fetchBerryById(berryId)
  } else if (localStorage.getItem('selectedBerryId')) {
    // Restore from localStorage if available
    selectedBerryId.value = localStorage.getItem('selectedBerryId')
    await berryStore.fetchBerryById(selectedBerryId.value!)
  }
})

watch(selectedBerryId, (newValue) => {
  if (newValue) {
    localStorage.setItem('selectedBerryId', newValue)
  }
})

const loadBerryDetail = async () => {
  if (selectedBerryId.value) {
    await berryStore.fetchBerryById(selectedBerryId.value)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold mb-6">{{ $t('berry.detailTitle') }}</h1>

      <!-- Berry Selection -->
      <div class="flex items-end gap-4 mb-8">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('berry.selectBerry') }}
          </label>
          <select
            v-model="selectedBerryId"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">{{ $t('berry.selectPlaceholder') }}</option>
            <option
              v-for="berry in berries"
              :key="berry.name"
              :value="getBerryIdFromUrl(berry.url)"
            >
              {{ berry.name }}
            </option>
          </select>
        </div>
        <button
          @click="loadBerryDetail"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          :disabled="!selectedBerryId"
        >
          {{ $t('common.move') }}
        </button>
      </div>

      <!-- Berry Detail -->
      <div v-if="!detailLoading && berryDetail" class="space-y-6">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 capitalize">{{ berryDetail.name }}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <span class="font-medium">{{ $t('berry.growthTime') }}:</span>
                {{ berryDetail.growth_time }}
              </div>
              <div>
                <span class="font-medium">{{ $t('berry.maxHarvest') }}:</span>
                {{ berryDetail.max_harvest }}
              </div>
              <div>
                <span class="font-medium">{{ $t('berry.size') }}:</span>
                {{ berryDetail.size }}
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <span class="font-medium">{{ $t('berry.smoothness') }}:</span>
                {{ berryDetail.smoothness }}
              </div>
              <div>
                <span class="font-medium">{{ $t('berry.soilDryness') }}:</span>
                {{ berryDetail.soil_dryness }}
              </div>
              <div>
                <span class="font-medium">{{ $t('berry.firmness') }}:</span>
                {{ berryDetail.firmness.name }}
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="font-medium mb-2">{{ $t('berry.flavors') }}:</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div
                v-for="flavor in berryDetail.flavors"
                :key="flavor.flavor.name"
                class="bg-white p-3 rounded shadow-sm"
              >
                <span class="font-medium capitalize">{{ flavor.flavor.name }}:</span>
                {{ flavor.potency }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <SkeletonLoader v-else-if="detailLoading" type="detail" />

      <!-- Empty State -->
      <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
        <div class="text-gray-500">{{ $t('berry.selectToViewDetails') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBerryStore } from '@/stores/berry'
import SkeletonLoader from '@/components/common/SkeletonLoader.vue'

const route = useRoute()
const router = useRouter()
const berryStore = useBerryStore()
const selectedBerryId = ref(null)

const { berries, berryDetail, detailLoading, getBerryIdFromUrl, fetchAllBerries } = berryStore

const loadBerryDetail = async () => {
  if (selectedBerryId.value) {
    await berryStore.fetchBerryById(selectedBerryId.value)
    router.push(`/berry-detail/${selectedBerryId.value}`)
  }
}

onMounted(async () => {
  // Fetch berries for dropdown if not already loaded
  if (!berries.value || berries.value.length === 0) {
    await fetchAllBerries()
  }

  // If we have an ID in the route, load that berry
  const berryId = route.params.id as string
  if (berryId) {
    selectedBerryId.value = berryId
    await berryStore.fetchBerryById(berryId)
  }
})

// Watch for route changes to update selected berry
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      selectedBerryId.value = newId as string
    }
  }
)

selectedBerryId.value = route.params.id as string

</script>
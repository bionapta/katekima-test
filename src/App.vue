<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600">
              Katekima.
            </router-link>
          </div>
          <div class="flex items-center">
            <!-- Language selector -->
            <select
              v-model="currentLocale"
              @change="changeLocale"
              class="bg-blue-700 text-white px-3 py-2 rounded"
            >
              <option value="en">English</option>
              <option value="id">Indonesia</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'

const { locale } = useI18n()
const uiStore = useUiStore()
const currentLocale = ref(uiStore.locale)

const changeLocale = () => {
  locale.value = currentLocale.value
  uiStore.setLocale(currentLocale.value)
}

watch(
  () => uiStore.locale,
  (newLocale) => {
    currentLocale.value = newLocale
    locale.value = newLocale
  },
)
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}

.min-h-screen {
  min-height: 100vh;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

nav {
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

nav a {
  color: #4a5568;
  text-decoration: none;
}

nav a:hover {
  background-color: #e2e8f0;
}

nav .bg-blue-700 {
  background-color: #2b6cb0;
  color: #ffffff;
}

nav .hover\:bg-blue-700:hover {
  background-color: #2b6cb0;
  color: #ffffff;
}

nav .rounded {
  border-radius: 0.375rem;
}

nav .px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

nav .py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
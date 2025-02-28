<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold text-indigo-600">
              Katekima.
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Navigation links -->
            <router-link
              to="/"
              class="px-3 py-2 rounded hover:bg-blue-700"
              :class="{ 'bg-blue-700': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link
              to="/berry-detail"
              class="px-3 py-2 rounded hover:bg-blue-700"
              :class="{ 'bg-blue-700': $route.path === '/berry-detail' }"
            >
              Berry Detail
            </router-link>
            <router-link
              to="/about"
              class="px-3 py-2 rounded hover:bg-blue-700"
              :class="{ 'bg-blue-700': $route.path === '/about' }"
            >
              About
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
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
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
          >
            <!-- Icon for mobile menu -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
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

<style scoped>
/* Gaya khusus untuk Navbar */
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
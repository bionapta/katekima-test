<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600"
  >
    <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
          {{ $t('home.welcome') }}
        </h1>
        <p class="text-xl text-gray-600">
          {{ $t('home.description') }}
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <router-link
          to="/berry-list"
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          {{ $t('home.viewBerries') }}
        </router-link>
        <router-link
          to="/add-product"
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
        >
          {{ $t('home.addProduct') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

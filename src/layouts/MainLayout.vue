<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue'
</script>

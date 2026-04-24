<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { useAuthStore } from '../stores/authStore'
import { onUnmounted } from 'vue'

const auth = useAuthStore()
auth.initAuth()
onUnmounted(() => auth.destroyAuth())
</script>

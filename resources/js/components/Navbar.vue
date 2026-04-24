<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="container-page py-3 flex items-center justify-between">
      <router-link to="/" class="text-lg font-semibold">TaskVault</router-link>
      <button class="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Toggle menu" @click="open = !open">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <div class="hidden md:flex items-center gap-4">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="text-sm hover:text-primary-700">Login</router-link>
          <router-link to="/register" class="text-sm hover:text-primary-700">Register</router-link>
        </template>
        <template v-else>
          <router-link to="/" class="text-sm hover:text-primary-700">Tasks</router-link>
          <span class="text-sm text-gray-600">{{ userEmail }}</span>
          <Button size="sm" variant="outline" @click="logout">Logout</Button>
        </template>
      </div>
    </div>
    <div v-if="open" class="md:hidden border-t border-gray-200">
      <div class="container-page py-2 space-y-2">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="block text-sm">Login</router-link>
          <router-link to="/register" class="block text-sm">Register</router-link>
        </template>
        <template v-else>
          <router-link to="/" class="block text-sm">Tasks</router-link>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">{{ userEmail }}</span>
            <Button size="sm" variant="outline" @click="logout">Logout</Button>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore'
import Button from './Button.vue'

const open = ref(false)
const auth = useAuthStore()
const { isAuthenticated, userEmail } = storeToRefs(auth)
const logout = () => auth.logout()
</script>
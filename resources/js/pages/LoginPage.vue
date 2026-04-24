<template>
  <div class="container-page py-10">
    <div class="mx-auto max-w-md">
      <Card>
        <h1 class="text-xl font-semibold mb-4">Login</h1>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <TextInput id="login-email" label="Email" type="email" required v-model="email" />
          <TextInput id="login-password" label="Password" type="password" required v-model="password" />
          <Button class="w-full" :disabled="loading" type="submit">Login</Button>
          <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore'
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'
import TextInput from '../components/TextInput.vue'

const email = ref('')
const password = ref('')
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const { loading, error, isAuthenticated } = storeToRefs(auth)

watchEffect(() => {
  if (isAuthenticated.value) {
    const to = route.query.redirect || '/'
    router.replace(String(to))
  }
})

const onSubmit = async () => {
  await auth.login({ email: email.value, password: password.value })
}
</script>
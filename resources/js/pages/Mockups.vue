<template>
  <div class="container-page py-8 space-y-8">
    <section>
      <h2 class="text-xl font-semibold mb-4">Color Scheme</h2>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div class="h-16 rounded bg-primary-50"></div>
        <div class="h-16 rounded bg-primary-100"></div>
        <div class="h-16 rounded bg-primary-300"></div>
        <div class="h-16 rounded bg-primary-600"></div>
        <div class="h-16 rounded bg-primary-900"></div>
      </div>
    </section>
    <section>
      <h2 class="text-xl font-semibold mb-4">Buttons</h2>
      <div class="flex items-center gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="subtle">Subtle</Button>
      </div>
    </section>
    <section>
      <h2 class="text-xl font-semibold mb-4">Form Fields</h2>
      <div class="grid gap-4 max-w-md">
        <TextInput id="m-email" label="Email" type="email" placeholder="name@example.com" />
        <TextInput id="m-password" label="Password" type="password" />
      </div>
    </section>
    <section>
      <h2 class="text-xl font-semibold mb-4">Cards</h2>
      <Card>
        <p class="text-sm text-gray-700">Card example with padded content.</p>
      </Card>
    </section>
  </div>
</template>

<script setup>
import Button from '../components/Button.vue'
import TextInput from '../components/TextInput.vue'
import Card from '../components/Card.vue'
</script>
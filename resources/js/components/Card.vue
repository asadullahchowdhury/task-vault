<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div :class="paddingClass">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padded: { type: Boolean, default: true }
})
const paddingClass = computed(() => (props.padded ? 'p-6' : 'p-0'))
</script>
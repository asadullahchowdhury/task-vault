<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  type: { type: String, default: 'button' },
  full: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none'
  const sizing = props.size === 'sm'
    ? 'px-3 py-2 text-sm'
    : props.size === 'lg'
      ? 'px-5 py-3 text-base'
      : 'px-4 py-2 text-sm'
  const width = props.full ? 'w-full' : ''
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
    subtle: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  }
  return [base, sizing, width, variants[props.variant] || variants.primary].join(' ')
})
</script>
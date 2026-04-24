<template>
  <div class="w-full">
    <label :for="id" class="block text-sm font-medium mb-1">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-600"
      :placeholder="placeholder"
      v-model="model"
      :aria-invalid="!!error || undefined"
      :aria-describedby="error ? id + '-error' : undefined"
      :required="required"
    />
    <p v-if="hint && !error" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
    <p v-if="error" :id="id + '-error'" class="text-xs text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
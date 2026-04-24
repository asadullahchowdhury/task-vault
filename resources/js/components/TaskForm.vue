<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <TextInput id="task-title" label="Title" required v-model="title" />
    <div>
      <label for="task-desc" class="block text-sm font-medium mb-1">Description</label>
      <textarea id="task-desc" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-primary-600" v-model="description" rows="3" />
    </div>
    <div>
      <label for="task-status" class="block text-sm font-medium mb-1">Status</label>
      <select id="task-status" class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-primary-600" v-model="status">
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>
    </div>
    <div class="flex items-center gap-2">
      <Button type="submit">Save</Button>
      <Button v-if="initial" variant="outline" type="button" @click="$emit('cancel')">Cancel</Button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import Button from './Button.vue'
import TextInput from './TextInput.vue'

const props = defineProps({ initial: { type: Object, default: null } })
const emit = defineEmits(['submit', 'cancel'])

const title = ref('')
const description = ref('')
const status = ref('pending')

watch(() => props.initial, (val) => {
  if (val) {
    title.value = val.title || ''
    description.value = val.description || ''
    status.value = val.status || 'pending'
  }
}, { immediate: true })

const onSubmit = () => {
  emit('submit', { title: title.value.trim(), description: description.value.trim(), status: status.value })
}
</script>
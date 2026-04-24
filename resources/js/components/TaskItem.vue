<template>
  <div class="border rounded p-4 bg-white">
    <div v-if="!editing" class="space-y-2">
      <div class="flex items-start justify-between">
        <h3 class="font-semibold">{{ task.title }}</h3>
        <span class="text-xs px-2 py-1 rounded bg-gray-100">{{ task.status }}</span>
      </div>
      <p class="text-sm text-gray-700" v-if="task.description">{{ task.description }}</p>
      <div class="flex items-center gap-2 pt-2">
        <button class="text-blue-600" @click="editing = true">Edit</button>
        <button class="text-red-600" @click="$emit('delete', task.id)">Delete</button>
      </div>
    </div>
    <div v-else>
      <TaskForm :initial="task" @submit="onUpdate" @cancel="editing = false" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskForm from './TaskForm.vue'

const props = defineProps({ task: { type: Object, required: true } })
const emit = defineEmits(['update', 'delete'])
const editing = ref(false)

const onUpdate = (payload) => {
  emit('update', props.task.id, payload)
  editing.value = false
}
</script>
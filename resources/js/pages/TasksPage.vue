<template>
  <div class="container-page py-8">
    <h1 class="text-2xl font-semibold mb-6">Tasks</h1>
    <Card class="mb-6">
      <TaskForm @submit="create" />
    </Card>
    <section>
      <Loader v-if="loading" />
      <p v-if="error" class="text-red-600 text-sm mb-2">{{ error }}</p>
      <div class="grid gap-4" v-if="items.length">
        <TaskItem v-for="t in items" :key="t.id" :task="t" @update="update" @delete="remove" />
      </div>
      <Card v-else>
        <p class="text-sm text-gray-600">No tasks yet</p>
      </Card>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/taskStore'
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'
import Loader from '../components/Loader.vue'
import Card from '../components/Card.vue'

const tasks = useTaskStore()
const { items, loading, error } = storeToRefs(tasks)

onMounted(() => {
  tasks.fetchTasks()
})

const create = async (payload) => {
  await tasks.createTask(payload)
}
const update = async (id, payload) => {
  await tasks.updateTask(id, payload)
}
const remove = async (id) => {
  await tasks.deleteTask(id)
}
</script>
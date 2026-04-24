import { defineStore } from 'pinia'
import { supabase } from '../services/supabaseClient'
import { useAuthStore } from './authStore'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      const auth = useAuthStore()
      const userId = auth.user?.id
      const { data, error } = await supabase
        .from('tasks')
        .select('id,title,description,status,created_at,user_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) {
        this.error = error.message
      }
      this.items = data || []
      this.loading = false
    },
    async createTask(payload) {
      this.error = null
      const auth = useAuthStore()
      const userId = auth.user?.id
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title: payload.title, description: payload.description || '', status: payload.status || 'pending', user_id: userId }])
        .select()
      if (error) {
        this.error = error.message
        return null
      }
      const task = data?.[0] || null
      if (task) this.items.unshift(task)
      return task
    },
    async updateTask(id, payload) {
      this.error = null
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: payload.title, description: payload.description || '', status: payload.status || 'pending' })
        .eq('id', id)
        .select()
      if (error) {
        this.error = error.message
        return null
      }
      const updated = data?.[0] || null
      if (updated) {
        const idx = this.items.findIndex(t => t.id === id)
        if (idx !== -1) this.items.splice(idx, 1, updated)
      }
      return updated
    },
    async deleteTask(id) {
      this.error = null
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
      if (error) {
        this.error = error.message
        return false
      }
      this.items = this.items.filter(t => t.id !== id)
      return true
    }
  }
})
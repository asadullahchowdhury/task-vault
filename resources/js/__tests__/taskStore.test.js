import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

const rows = [
  { id: 1, title: 'A', description: '', status: 'pending', created_at: '2025-01-01', user_id: 'u1' }
]

vi.mock('../services/supabaseClient', () => {
  const api = {
    select: vi.fn(() => ({ eq: (k, v) => ({ order: () => ({ data: rows, error: null }) }) })),
    insert: vi.fn(() => ({ select: () => ({ data: [{ id: 2, title: 'B', description: '', status: 'pending', created_at: '2025-01-02', user_id: 'u1' }], error: null }) })),
    update: vi.fn(() => ({ eq: () => ({ select: () => ({ data: [{ id: 1, title: 'A+', description: '', status: 'done', created_at: '2025-01-01', user_id: 'u1' }], error: null }) }) })),
    delete: vi.fn(() => ({ eq: () => ({ error: null }) }))
  }
  return {
    supabase: { from: vi.fn(() => api) }
  }
})

vi.mock('../stores/authStore', () => {
  return {
    useAuthStore: () => ({ user: { id: 'u1' } })
  }
})

import { useTaskStore } from '../stores/taskStore'

describe('taskStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches tasks', async () => {
    const store = useTaskStore()
    await store.fetchTasks()
    expect(store.items.length).toBe(1)
    expect(store.items[0].title).toBe('A')
  })

  it('creates task', async () => {
    const store = useTaskStore()
    const task = await store.createTask({ title: 'B' })
    expect(task).not.toBeNull()
    expect(store.items[0].title).toBe('B')
  })

  it('updates task', async () => {
    const store = useTaskStore()
    store.items = [...rows]
    const updated = await store.updateTask(1, { title: 'A+', status: 'done' })
    expect(updated.status).toBe('done')
    expect(store.items[0].title).toBe('A+')
  })

  it('deletes task', async () => {
    const store = useTaskStore()
    store.items = [...rows]
    const ok = await store.deleteTask(1)
    expect(ok).toBe(true)
    expect(store.items.length).toBe(0)
  })
})
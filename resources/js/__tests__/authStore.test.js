import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('../services/supabaseClient', () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        signInWithPassword: vi.fn().mockResolvedValue({ data: { session: { user: { id: 'u1', email: 'user@example.com' } } }, error: null }),
        signUp: vi.fn().mockResolvedValue({ data: { user: { id: 'u2', email: 'new@example.com' } }, error: null }),
        signOut: vi.fn().mockResolvedValue({ error: null }),
        onAuthStateChange: vi.fn((cb) => {
          cb('SIGNED_IN', { user: { id: 'u1', email: 'user@example.com' } })
          return { data: { subscription: { unsubscribe: vi.fn() } } }
        })
      }
    }
  }
})

import { useAuthStore } from '../stores/authStore'

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes auth state', async () => {
    const auth = useAuthStore()
    await auth.initAuth()
    expect(auth.isAuthenticated).toBe(true)
    expect(auth.userEmail).toBe('user@example.com')
  })

  it('logs in successfully', async () => {
    const auth = useAuthStore()
    const ok = await auth.login({ email: 'user@example.com', password: 'pass' })
    expect(ok).toBe(true)
    expect(auth.isAuthenticated).toBe(true)
  })

  it('registers successfully', async () => {
    const auth = useAuthStore()
    const ok = await auth.register({ email: 'new@example.com', password: 'pass' })
    expect(ok).toBe(true)
    expect(auth.userEmail).toBe('new@example.com')
  })

  it('logs out', async () => {
    const auth = useAuthStore()
    await auth.logout()
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.user).toBe(null)
  })
})
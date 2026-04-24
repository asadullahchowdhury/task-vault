import { defineStore } from 'pinia'
import { supabase } from '../services/supabaseClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    _subscription: null
  }),
  getters: {
    userEmail: (s) => s.user?.email || ''
  },
  actions: {
    async initAuth() {
      this.loading = true
      const { data: sessionData } = await supabase.auth.getSession()
      this.session = sessionData.session || null
      this.user = this.session?.user || null
      this.isAuthenticated = !!this.user
      const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        this.session = session || null
        this.user = session?.user || null
        this.isAuthenticated = !!this.user
      })
      this._subscription = listener?.subscription || null
      this.loading = false
    },
    async login({ email, password }) {
      this.error = null
      this.loading = true
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        this.error = error.message
      }
      this.session = data.session || null
      this.user = this.session?.user || null
      this.isAuthenticated = !!this.user
      this.loading = false
      return !error
    },
    async register({ email, password }) {
      this.error = null
      this.loading = true
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        this.error = error.message
      }
      this.user = data.user || null
      this.isAuthenticated = !!this.user
      this.loading = false
      return !error
    },
    async logout() {
      this.loading = true
      await supabase.auth.signOut()
      this.user = null
      this.session = null
      this.isAuthenticated = false
      this.loading = false
    },
    destroyAuth() {
      this._subscription?.unsubscribe?.()
      this._subscription = null
    },
    clearError() {
      this.error = null
    }
  }
})
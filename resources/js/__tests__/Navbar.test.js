import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../components/Navbar.vue'

vi.mock('../stores/authStore', () => ({ useAuthStore: () => ({ logout: () => {}, isAuthenticated: false, userEmail: '' }) }))

describe('Navbar', () => {
  it('shows login/register when unauthenticated', () => {
    const w = mount(Navbar, { global: { stubs: ['router-link'] } })
    expect(w.text()).toContain('Login')
    expect(w.text()).toContain('Register')
  })
})
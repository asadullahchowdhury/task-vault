import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../components/Button.vue'

describe('Button', () => {
  it('renders primary by default', () => {
    const w = mount(Button, { slots: { default: 'Click' } })
    expect(w.text()).toContain('Click')
    expect(w.classes()).toContain('rounded-md')
  })
  it('respects disabled state', async () => {
    const w = mount(Button, { props: { disabled: true }, slots: { default: 'Disabled' } })
    expect(w.attributes('disabled')).toBeDefined()
  })
})
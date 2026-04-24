import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '../components/TaskItem.vue'

describe('TaskItem', () => {
  it('renders task and toggles edit', async () => {
    const task = { id: 1, title: 'A', description: 'D', status: 'pending' }
    const wrapper = mount(TaskItem, { props: { task } })
    expect(wrapper.text()).toContain('A')
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('form').exists()).toBe(true)
  })
})
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '../components/TaskForm.vue'

describe('TaskForm', () => {
  it('emits submit with form values', async () => {
    const wrapper = mount(TaskForm)
    await wrapper.find('input').setValue('Title')
    await wrapper.find('textarea').setValue('Desc')
    await wrapper.find('form').trigger('submit.prevent')
    const evt = wrapper.emitted('submit')
    expect(evt).toBeTruthy()
    expect(evt[0][0].title).toBe('Title')
    expect(evt[0][0].description).toBe('Desc')
  })
})
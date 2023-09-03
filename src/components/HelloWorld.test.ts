import { test, expect, describe } from 'vitest'
import HelloWorldVue from './HelloWorld.vue'
import { mount } from '@vue/test-utils'

describe('test hello world', () => {
  test('import', () => {
    expect(HelloWorldVue).toBeTruthy()
  })
  test('props', () => {
    const message = 'message'
    const wrapper = mount(HelloWorldVue, {
      props: {
        msg: message,
      },
    })
    expect(wrapper.get('h1').text()).toEqual(message)
  })
})

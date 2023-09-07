import { describe, expect, test } from 'vitest'
import { showHourMinute } from './display'

describe('showHourMinute', () => {
  test('principal', () => {
    expect(showHourMinute).toBeTruthy()
  })
  //--
  const theArray = []
  theArray.push({ name: '99h', values: [99, 99.01, 99.001] })
  theArray.push({ name: '99h06', values: [99.1] })
  theArray.push({ name: '99h12', values: [99.2] })
  theArray.push({ name: '99h15', values: [99.25] })
  theArray.push({ name: '99h18', values: [99.3] })
  theArray.push({ name: '99h24', values: [99.4] })
  theArray.push({ name: '99h30', values: [99.5] })
  theArray.push({ name: '99h36', values: [99.6] })
  theArray.push({ name: '99h42', values: [99.7] })
  theArray.push({ name: '99h45', values: [99.75] })
  theArray.push({ name: '99h48', values: [99.8] })
  theArray.push({ name: '99h54', values: [99.9] })
  theArray.push({ name: '99h59', values: [99.99, 99.999] })
  //--
  theArray.push({ name: '1h', values: [1, 1.01, 1.001] })
  theArray.push({ name: '1h06', values: [1.1] })
  theArray.push({ name: '1h12', values: [1.2] })
  theArray.push({ name: '1h15', values: [1.25] })
  theArray.push({ name: '1h18', values: [1.3] })
  theArray.push({ name: '1h24', values: [1.4] })
  theArray.push({ name: '1h30', values: [1.5] })
  theArray.push({ name: '1h36', values: [1.6] })
  theArray.push({ name: '1h42', values: [1.7] })
  theArray.push({ name: '1h45', values: [1.75] })
  theArray.push({ name: '1h48', values: [1.8] })
  theArray.push({ name: '1h54', values: [1.9] })
  theArray.push({ name: '1h59', values: [1.99, 1.999] })
  //--
  theArray.push({ name: '0h', values: [0, 0.01, 0.001] })
  theArray.push({ name: '0h06', values: [0.1] })
  theArray.push({ name: '0h12', values: [0.2] })
  theArray.push({ name: '0h15', values: [0.25] })
  theArray.push({ name: '0h18', values: [0.3] })
  theArray.push({ name: '0h24', values: [0.4] })
  theArray.push({ name: '0h30', values: [0.5] })
  theArray.push({ name: '0h36', values: [0.6] })
  theArray.push({ name: '0h42', values: [0.7] })
  theArray.push({ name: '0h45', values: [0.75] })
  theArray.push({ name: '0h48', values: [0.8] })
  theArray.push({ name: '0h54', values: [0.9] })
  theArray.push({ name: '0h59', values: [0.99, 0.999] })
  //--
  theArray.forEach((x) => {
    test(x.name, () => {
      x.values.forEach((y) => {
        expect(showHourMinute(y)).toEqual(x.name)
      })
    })
  })
})

import { describe, expect, test } from 'vitest'
import { createDay } from './day'

describe('createDay', () => {
  test('principal', () => {
    expect(createDay).toBeTruthy()
  })
  test('monday 10h', () => {
    const day = createDay('monday', '10h')

    expect(day.hour).toEqual(10)
    expect(day.name).toEqual('monday')
  })
  test('tuesday 3h', () => {
    const day = createDay('tuesday', 3)

    expect(day.hour).toEqual(3)
    expect(day.name).toEqual('tuesday')
  })
})

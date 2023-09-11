import { describe, expect, test } from 'vitest'
import { createDay, createHour } from './day'
import { Display } from '.'

describe('createDay', () => {
  test('principal', () => {
    expect(createDay).toBeTruthy()
  })
  test('monday 10h', () => {
    const day = createDay('monday', '10h')

    expect(day.hour.planned).toEqual(10)
    expect(day.name).toEqual('monday')
  })
  test('tuesday 3h', () => {
    const day = createDay('tuesday', 3)

    expect(day.hour.planned).toEqual(3)
    expect(day.name).toEqual('tuesday')
  })
})
describe('createHour', () => {
  test('principal', () => {
    expect(createHour).toBeTruthy()
  })
  Array(10)
    .fill(0)
    .map((_, index) => index * 0.5)
    .map((value) => ({ number: value, string: Display.showHourMinute(value) }))
    .forEach((value, index) => {
      test(`Run #${index + 1} - ${value.string}`, () => {
        expect(createHour(value.number).planned).toEqual(value.number)
        expect(createHour(value.number).confirmed).toBeUndefined()
        expect(createHour(value.string).planned).toEqual(value.number)
        expect(createHour(value.string).confirmed).toBeUndefined()
      })
    })
})

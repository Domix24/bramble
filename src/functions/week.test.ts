import { describe, expect, test } from 'vitest'
import { createWeek } from './week'

describe('showHourMinute', () => {
  test('principal', () => {
    expect(createWeek).toBeTruthy()
  })
  describe('createweek with number week', () => {
    test('create week 10h', () => expect(createWeek(10).hour).toEqual(10))
    test('create week 10h15', () =>
      expect(createWeek(10.25).hour).toEqual(10.25))
    test('create week 10h30', () => expect(createWeek(10.5).hour).toEqual(10.5))
    test('create week 10h45', () =>
      expect(createWeek(10.75).hour).toEqual(10.75))
    //--
    test('create week wrong minute', () =>
      expect(() => createWeek(10.7)).toThrow())
  })
  describe('createweek with string week', () => {
    test('create week 10h', () => {
      expect(createWeek('10h').hour).toEqual(10)
      expect(createWeek('10').hour).toEqual(10)
    })
    test('create week 10h15', () =>
      expect(createWeek('10h15').hour).toEqual(10.25))
    test('create week 10h30', () =>
      expect(createWeek('10h30').hour).toEqual(10.5))
    test('create week 10h45', () =>
      expect(createWeek('10h45').hour).toEqual(10.75))
    //--
    test('create week wrong string', () =>
      expect(() => createWeek('afafa')).toThrow())
  })
})

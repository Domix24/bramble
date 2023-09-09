import { describe, expect, test } from 'vitest'
import { createWeek } from './week'

describe('showHourMinute', () => {
  test('principal', () => {
    expect(createWeek).toBeTruthy()
  })
  describe('createweek', () => {
    test('10h', () => expect(createWeek('10h').getWeek().hour).toEqual(10))
    test('3h', () => expect(createWeek(3).getWeek().hour).toEqual(3))
  })
  describe('createweek daychaining', () => {
    test('createweek with 0 days', () => {
      const week = createWeek('10h')

      expect(week.getWeek().days.length).toEqual(0)
    })
    test('createweek with 1 days - method #1', () => {
      const week = createWeek('10h').addDay('a', 1)

      expect(week.getWeek().days.length).toEqual(1)
    })
    test('createweek with 1 days - method #2', () => {
      const week = createWeek('10h')
      week.addDay('a', 1)

      expect(week.getWeek().days.length).toEqual(1)
    })
    test('createweek with 2 days - method #1', () => {
      const week = createWeek('10h').addDay('a', 1).addDay('b', 2)

      expect(week.getWeek().days.length).toEqual(2)
    })
    test('createweek with 2 days - method #2', () => {
      const week = createWeek('10h').addDay('a', 1)
      week.addDay('b', 2)

      expect(week.getWeek().days.length).toEqual(2)
    })
    test('createweek with 2 days - method #3', () => {
      const week = createWeek('10h')
      week.addDay('a', 1)
      week.addDay('b', 2)

      expect(week.getWeek().days.length).toEqual(2)
    })
  })
})

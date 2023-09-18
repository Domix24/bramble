import { describe, expect, test } from 'vitest'
import { createWeek } from './week'
import { createDay } from './day'

describe('createWeek', () => {
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
      const week = createWeek('10h').addDay(createDay('a', 1))

      expect(week.getWeek().days.length).toEqual(1)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1]).toBeUndefined()
    })
    test('createweek with 1 days - method #2', () => {
      const week = createWeek('10h')
      week.addDay(createDay('a', 1))

      expect(week.getWeek().days.length).toEqual(1)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1]).toBeUndefined()
    })
    test('createweek with 2 days - method #1', () => {
      const week = createWeek('10h')
        .addDay(createDay('a', 1))
        .addDay(createDay('b', 2))

      expect(week.getWeek().days.length).toEqual(2)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[1].hour.planned).toEqual(2)
      expect(week.getWeek().days[1].name).toEqual('b')
      expect(week.getWeek().days[2]).toBeUndefined()
    })
    test('createweek with 2 days - method #2', () => {
      const week = createWeek('10h').addDay(createDay('a', 1))
      week.addDay(createDay('b', 2))

      expect(week.getWeek().days.length).toEqual(2)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[1].hour.planned).toEqual(2)
      expect(week.getWeek().days[1].name).toEqual('b')
      expect(week.getWeek().days[2]).toBeUndefined()
    })
    test('createweek with 2 days - method #3', () => {
      const week = createWeek('10h')
      week.addDay(createDay('a', 1))
      week.addDay(createDay('b', 2))

      expect(week.getWeek().days.length).toEqual(2)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[1].hour.planned).toEqual(2)
      expect(week.getWeek().days[1].name).toEqual('b')
      expect(week.getWeek().days[2]).toBeUndefined()
    })
  })
})

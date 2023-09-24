import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { createWeek, dexieToNormal, normalToDexie } from './week'
import { createDay } from './day'
import { IDexieWeek } from '../types'

describe('createWeek', () => {
  test('principal', () => {
    expect(createWeek).toBeTruthy()
  })
  describe('createweek', () => {
    test('10h', () => {
      const week = createWeek('10h').getWeek()
      expect(week.days).toEqual([])
      expect(week.edit.hour).toEqual('10h')
      expect(week.edit.update).toEqual(false)
      expect(week.hour).toEqual(10)
      expect(week.id).toEqual(0)
    })
    test('3h', () => {
      const week = createWeek(3).getWeek()
      expect(week.days).toEqual([])
      expect(week.edit.hour).toEqual('3h')
      expect(week.edit.update).toEqual(false)
      expect(week.hour).toEqual(3)
      expect(week.id).toEqual(0)
    })
  })
  describe('createweek daychaining', () => {
    test('createweek with 0 days', () => {
      const week = createWeek('10h')

      expect(week.getWeek().days.length).toEqual(0)
    })
    test('createweek with 1 days - method #1', () => {
      const week = createWeek('10h').addDay(createDay('a', 1).getDay())

      expect(week.getWeek().days.length).toEqual(1)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1]).toBeUndefined()
    })
    test('createweek with 1 days - method #2', () => {
      const week = createWeek('10h')
      week.addDay(createDay('a', 1).getDay())

      expect(week.getWeek().days.length).toEqual(1)
      expect(week.getWeek().days[0].hour.confirmed).toBeUndefined()
      expect(week.getWeek().days[0].hour.planned).toEqual(1)
      expect(week.getWeek().days[0].name).toEqual('a')
      expect(week.getWeek().days[1]).toBeUndefined()
    })
    test('createweek with 2 days - method #1', () => {
      const week = createWeek('10h')
        .addDay(createDay('a', 1).getDay())
        .addDay(createDay('b', 2).getDay())

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
      const week = createWeek('10h').addDay(createDay('a', 1).getDay())
      week.addDay(createDay('b', 2).getDay())

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
      week.addDay(createDay('a', 1).getDay())
      week.addDay(createDay('b', 2).getDay())

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
  describe('createweek chaining - setid', () => {
    let week = createWeek('8h')
    beforeEach(() => {
      week = createWeek(Math.floor(Math.random() * (10 - 2 + 1) + 2))
      expect(week.getWeek().days).toEqual([])
      expect(week.getWeek().edit.update).toEqual(false)
      expect(week.getWeek().hour).toBeGreaterThan(1)
      expect(week.getWeek().hour).toBeLessThan(11)
      expect(week.getWeek().id).toEqual(0)
    })
    test('setid', () => {
      week.setId(3)

      expect(week.getWeek().id).toEqual(3)
    })
    test('setid', () => {
      week.setId(3).setId(4)

      expect(week.getWeek().id).toEqual(4)
    })
  })
  describe('createweek chaining - setupdated', () => {
    let week = createWeek('8h')
    beforeEach(() => {
      week = createWeek(Math.floor(Math.random() * (10 - 2 + 1) + 2))
      expect(week.getWeek().days).toEqual([])
      expect(week.getWeek().edit.update).toEqual(false)
      expect(week.getWeek().hour).toBeGreaterThan(1)
      expect(week.getWeek().hour).toBeLessThan(11)
      expect(week.getWeek().id).toEqual(0)
    })
    test('setupdated', () => {
      week.setUpdated()
    })
    test('setupdated', () => {
      week.setUpdated().setUpdated()
    })
    afterEach(() => {
      expect(week.getWeek().edit.update).toEqual(true)
    })
  })
})
describe('dexieToNormal', () => {
  let week: IDexieWeek = { hour: 0, id: 0 }
  let convertedWeek = createWeek(0).getWeek()
  beforeEach(() => {
    const hour = Math.floor(Math.random() * (29 - 20 + 1) + 20) // [29,20]
    const id = Math.floor(Math.random() * (19 - 10 + 1) + 10) // [19,10]

    week = { hour, id }

    expect(week.hour).toEqual(hour)
    expect(week.id).toEqual(id)
  })
  Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .forEach((value) => {
      test(`Run #${value}`, () => {
        convertedWeek = dexieToNormal(week)
      })
    })
  afterEach(() => {
    expect(convertedWeek.days).toEqual([])
    expect(convertedWeek.edit.update).toEqual(false)
    expect(convertedWeek.hour).toEqual(week.hour)
    expect(convertedWeek.id).toEqual(week.id)
  })
})
describe('normalToDexie', () => {
  let week = createWeek(0).getWeek()
  let convertedWeek: IDexieWeek = { hour: 0, id: 0 }
  beforeEach(() => {
    const hour = Math.floor(Math.random() * (29 - 20 + 1) + 20) // [29,20]
    const id = Math.floor(Math.random() * (19 - 10 + 1) + 10) // [19,10]

    week = createWeek(hour).setId(id).getWeek()

    expect(week.days.length).toEqual(0)
    expect(week.edit.update).toEqual(false)
    expect(week.hour).toEqual(hour)
    expect(week.id).toEqual(id)
  })
  Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .forEach((value) => {
      test(`Run #${value}`, () => {
        convertedWeek = normalToDexie(week)
      })
    })
  afterEach(() => {
    expect(convertedWeek.hour).toEqual(week.hour)
    expect(convertedWeek.id).toEqual(week.id)
  })
})

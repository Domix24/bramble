import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'
import { WeekFunctions } from '.'
import { Week } from '../functions'

describe('WeekFunctions', () => {
  test('principal', () => {
    expect(WeekFunctions).toBeTypeOf('object')
  })
  describe('setWeek', () => {
    const week = Week.createWeek('37h')
    beforeAll(() => {
      WeekFunctions.days.value = []
    })
    Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .forEach((v) => {
        test(`Run #${v}`, () => {
          WeekFunctions.setWeek(week.getWeek())

          expect(WeekFunctions.days.value.length).toEqual(v - 1)
          expect(
            WeekFunctions.days.value
              .map((v) => v.name)
              .every((v, _, a) => a.filter((vv) => vv == v).length == 1),
          ).toBeTruthy()
        })
      })
    afterEach((context) => {
      week.addDay(
        `Day #${context.task.name.slice(-1)}`,
        Math.floor(Math.random() * (5 - 2 + 1) + 2),
      )
    })
  })
  describe('getHours', () => {
    const week = Week.createWeek('23h')
    let result = 0
    beforeEach(() => {
      WeekFunctions.setWeek(week.getWeek())
      WeekFunctions.days.value = WeekFunctions.days.value.map((v) => {
        v.hour.confirmed = v.hour.planned - 1
        return v
      })
      result = WeekFunctions.days.value.reduce(
        (p, c) => p + c.hour.confirmed,
        0,
      )
    })
    Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .forEach((v) => {
        test(`Run #${v}`, () => {
          expect(WeekFunctions.getHours()).toEqual(result)
        })
      })
    afterEach((context) => {
      const nbHours = Math.floor(Math.random() * (5 - 2 + 1) + 2)

      week.addDay(`Day #${context.task.name.slice(-1)}`, nbHours)
    })
  })
})

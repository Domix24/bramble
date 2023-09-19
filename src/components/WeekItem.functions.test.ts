import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { WeekFunctions } from '.'
import { Day, Week } from '../functions'
import { IDay, IWeekItemFunctions } from '../types'

describe('WeekFunctions', () => {
  test('principal', () => {
    expect(WeekFunctions).toBeTypeOf('object')
  })
  describe('getHours', () => {
    let result = 0
    let main: IWeekItemFunctions
    const days = [] as IDay[]
    beforeEach(() => {
      main = WeekFunctions.main(
        { week: Week.createWeek('23h').getWeek() },
        () => {},
      )
      main.daysC.value = days.map((v) => {
        v.hour.confirmed = v.hour.planned - 1
        return v
      })
      result = main.daysC.value.reduce((p, c) => p + c.hour.confirmed, 0)
    })
    Array(5)
      .fill(0)
      .map((_, i) => i + 1)
      .forEach((v, i) => {
        test(`Run #${v}`, () => {
          expect(main.getHours()).toEqual(result)
          expect(WeekFunctions.getHours(main.daysC.value)).toEqual(result)

          expect(
            main.daysC.value.filter(
              (v0, _i0, a0) =>
                a0.filter((v1) => v0.name == v1.name).length == 1,
            ).length,
          ).toEqual(i)
        })
      })
    afterEach((context) => {
      const nbHours = Math.floor(Math.random() * (5 - 2 + 1) + 2)

      days.push(Day.createDay(`Day #${context.task.name.slice(-1)}`, nbHours))
    })
  })
  describe('getDifference - getSign', () => {
    const random = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min)
    const list = Array(9)
      .fill(0)
      .map(() => random(20, 11))
    const main = WeekFunctions.main(
      { week: Week.createWeek('2h').getWeek() },
      () => {},
    )
    describe('negative', () => {
      list.forEach((v, i) => {
        test(`Run #${i} (${v})`, () => {
          main.hourC.value = (20 + 1) * list.length
          main.daysC.value.splice(0, main.daysC.value.length)

          for (let j = 0; j < i + 1; j++) {
            const day = Day.createDay('', 0)
            day.hour.confirmed = list[i]
            main.daysC.value.push(day)
          }

          expect(main.getHours() - main.hourC.value).toBeLessThan(0)
          expect(main.getDifference()).toBeGreaterThan(0)
          expect(main.getSign()).toEqual('-')

          expect(
            WeekFunctions.getHours(main.daysC.value) - main.hourC.value,
          ).toBeLessThan(0)
          expect(
            WeekFunctions.getDifference(main.daysC.value, main.hourC.value),
          ).toBeGreaterThan(0)
          expect(
            WeekFunctions.getSign(main.daysC.value, main.hourC.value),
          ).toEqual('-')
        })
      })
    })
    describe('positive', () => {
      list.forEach((v, i) => {
        test(`Run #${i} (${v})`, () => {
          main.hourC.value = 10
          main.daysC.value.splice(0, main.daysC.value.length)

          for (let j = 0; j < i + 1; j++) {
            const day = Day.createDay('', 0)
            day.hour.confirmed = list[i]
            main.daysC.value.push(day)
          }

          expect(main.getHours() - main.hourC.value).toBeGreaterThan(0)
          expect(main.getDifference()).toBeGreaterThan(0)
          expect(main.getSign()).toEqual('+')

          expect(
            WeekFunctions.getHours(main.daysC.value) - main.hourC.value,
          ).toBeGreaterThan(0)
          expect(
            WeekFunctions.getDifference(main.daysC.value, main.hourC.value),
          ).toBeGreaterThan(0)
          expect(
            WeekFunctions.getSign(main.daysC.value, main.hourC.value),
          ).toEqual('+')
        })
      })
    })
    describe('zero', () => {
      list.forEach((v, i) => {
        test(`Run #${i} (${v})`, () => {
          main.hourC.value = v
          main.daysC.value.splice(0, main.daysC.value.length)

          const day = Day.createDay('', 0)
          day.hour.confirmed = v
          main.daysC.value.push(day)

          expect(main.getHours() - main.hourC.value).toEqual(0)
          expect(main.getDifference()).toEqual(0)
          expect(main.getSign()).toEqual('-')

          expect(
            WeekFunctions.getHours(main.daysC.value) - main.hourC.value,
          ).toEqual(0)
          expect(
            WeekFunctions.getDifference(main.daysC.value, main.hourC.value),
          ).toEqual(0)
          expect(
            WeekFunctions.getSign(main.daysC.value, main.hourC.value),
          ).toEqual('-')
        })
      })
    })
  })
  describe('emitUpdate', () => {
    test('Run #1', () =>
      new Promise((resolve) => {
        const main = WeekFunctions.main(
          { week: Week.createWeek('2h').getWeek() },
          () => resolve(1),
        )
        main.hourC.value = 2
      }))
    test.fails(
      'Run #2',
      () =>
        new Promise((resolve) => {
          const main = WeekFunctions.main(
            { week: Week.createWeek('2h').getWeek() },
            () => resolve(1),
          )
          main.daysC.value.push(Day.createDay('', 0))
        }),
      20,
    )
    test('Run #3', () =>
      new Promise((resolve) => {
        const main = WeekFunctions.main(
          { week: Week.createWeek('2h').getWeek() },
          () => resolve(1),
        )
        main.daysC.value = ((v) => {
          v.push(Day.createDay('', 0))
          return v
        })(main.daysC.value)
      }))
    test('Run #4', () =>
      new Promise((resolve) => {
        let count = 0
        const main = WeekFunctions.main(
          { week: Week.createWeek('2h').getWeek() },
          () => {
            count++
            if (count == 2) {
              resolve(1)
            }
          },
        )
        main.hourC.value = 2
        main.daysC.value = ((v) => {
          v.push(Day.createDay('', 0))
          return v
        })(main.daysC.value)
      }))
    test.fails(
      'Run #5',
      () =>
        new Promise((resolve) => {
          let count = 0
          const main = WeekFunctions.main(
            { week: Week.createWeek('2h').getWeek() },
            () => {
              count++
              if (count == 3) {
                resolve(1)
              }
            },
          )
          main.hourC.value = 2
          main.daysC.value = ((v) => {
            v.push(Day.createDay('', 0))
            return v
          })(main.daysC.value)
        }),
      20,
    )
  })
})

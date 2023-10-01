import { SpyInstance, beforeEach, describe, expect, test, vi } from 'vitest'
import { AppFunctions } from '.'
import { Database, Day, Week } from '../functions'
import { IAppItemFunctions, IDexieDay, IDexieWeek, IWeek } from '../types'
import { PromiseExtended } from 'dexie'

const editWeekSpyTest = (
  spy: SpyInstance<[week: IDexieWeek], PromiseExtended<number>>,
  week: IDexieWeek,
) => {
  expect(spy).toBeCalled()
  expect(spy).toBeCalledWith(week)
  if (spy.mock.lastCall) {
    dexieWeekCompare(spy.mock.lastCall[0], week)
  } else {
    expect(false).toBeTruthy()
  }
}

const dexieWeekCompare = (week1: IDexieWeek, week2: IDexieWeek) => {
  expect(week1.hour).toEqual(week2.hour)
  expect(week1.id).toEqual(week2.id)
  expect(week1).toEqual(week2)
  expect(week1.days.length).toEqual(week2.days.length)
  week1.days.forEach((value, index) => {
    expect(value).toEqual(week2.days[index])
  })
}

const weekCompare = (week1: IWeek, week2: IWeek) => {
  expect(week1.hour).toEqual(week2.hour)
  expect(week1.id).toEqual(week2.id)
  expect(week1).toEqual(week2)
  expect(week1.days.length).toEqual(week2.days.length)
  week1.days.forEach((value, index) => {
    expect(value.hour.confirmed).toEqual(week2.days[index].hour.confirmed)
    expect(value.hour.planned).toEqual(week2.days[index].hour.planned)
    expect(value.id).toEqual(week2.days[index].id)
    expect(value.name).toEqual(week2.days[index].name)
    expect(value.weekId).toEqual(week2.days[index].weekId)
    expect(value).toEqual(week2.days[index])
    expect(value.weekId).toEqual(week1.id)
  })
}

describe('AppFunctions', () => {
  test('principal', () => {
    expect(AppFunctions).toBeTypeOf('object')
  })
  describe('editWeek', () => {
    test('Run #1', () => {
      const db = new Database.BrambleDatabase()
      db.editWeek = vi.fn()

      const spy = vi.spyOn(db, 'editWeek')

      const week = Week.normalToDexie(Week.createWeek(1).getWeek())

      AppFunctions.editWeek(db, week)

      editWeekSpyTest(spy, week)

      expect(spy).toBeCalledTimes(1)
    })
  })
  describe('main', () => {
    let main: IAppItemFunctions
    beforeEach(() => {
      main = AppFunctions.main(true)
    })
    describe('editWeek', () => {
      test('Run #1', () =>
        new Promise((resolve) => {
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          main.week.value.id = 4
          expect(main.week.value.id).toEqual(4)

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))

            expect(spy).toBeCalledTimes(2) // 1-changed to 4 2-changed to 1
            expect(main.week.value.id).toEqual(1)

            resolve(1)
          }, 1)
        }))
      test('Run #2', () =>
        new Promise((resolve) => {
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          main.week.value.days = [Day.getEmptyDay()]
          expect(main.week.value.days.length).toEqual(1)

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))

            expect(spy).toBeCalledTimes(1) // 1-change number of days
            expect(main.week.value.id).toEqual(1)

            resolve(1)
          }, 1)
        }))
      test('Run #3', () =>
        new Promise((resolve) => {
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          main.week.value.days.push(Day.getEmptyDay())
          main.week.value.days.push(Day.getEmptyDay())
          expect(main.week.value.days.length).toEqual(3)

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))

            expect(spy).toBeCalledTimes(1) // 1-change number of days
            expect(main.week.value.id).toEqual(1)

            resolve(1)
          }, 1)
        }))
      test('Run #4', () =>
        new Promise((resolve) => {
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          expect(main.week.value.id).toEqual(1)

          main.editWeek()

          editWeekSpyTest(spy, Week.normalToDexie(main.week.value))

          expect(spy).toBeCalledTimes(1)
          expect(main.week.value.id).toEqual(1)

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))

            expect(spy).toBeCalledTimes(1) // = not called
            expect(main.week.value.id).toEqual(1) // assure no change on id

            resolve(1)
          }, 1)
        }))
    })
    describe('doUpdateWeek', () => {
      test('Run #1', () => {
        const newWeek = Week.createWeek(3).getWeek()

        expect(main.createdWeek.value).toBeUndefined()

        main.doUpdateWeek(newWeek, false)

        expect(main.createdWeek.value).toBeDefined()
        weekCompare(newWeek, main.createdWeek.value!)
      })
    })
    describe('doCloseWeek', () => {
      test('Run #1', () =>
        new Promise((resolve) => {
          const newWeek = undefined

          main.createdWeek.value = newWeek

          expect(main.createdWeek.value).toBeUndefined()

          main.doCloseWeek()

          expect(main.createdWeek.value).toBeUndefined()

          resolve(1)
        }))
      test('Run #2', () =>
        new Promise((resolve) => {
          const newWeek = Week.createWeek(4).getWeek()

          main.createdWeek.value = newWeek
          main.createdWeek.value.edit.update = false

          expect(main.createdWeek.value).toBeDefined()
          expect(main.createdWeek.value.edit.update).toBeFalsy()

          main.doCloseWeek()

          expect(main.createdWeek.value).toBeUndefined()

          resolve(1)
        }))
      test('Run #3', () =>
        new Promise((resolve) => {
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          const newWeek = Week.createWeek(4).getWeek()

          main.createdWeek.value = newWeek
          main.createdWeek.value.edit.update = true

          expect(main.createdWeek.value).toBeDefined()
          expect(main.createdWeek.value.edit.update).toBeTruthy()

          main.doCloseWeek()

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))

            expect(spy).toBeCalledTimes(1) // update "update"

            expect(main.createdWeek.value).toBeUndefined()
            expect(main.week.value.edit.update).toBeFalsy()

            resolve(1)
          }, 1)
        }))
    })
    describe('doCreateDay', () => {
      beforeEach(() => {
        expect(main.createdDay.value).toBeUndefined()
      })
      Array(5)
        .fill(0)
        .map((_, index) => index)
        .forEach((value) => {
          test(`Run #${value + 1}`, () => {
            main.doCreateDay(Week.createWeek(0).setId(value).getWeek())
            expect(main.createdDay.value).toBeDefined()
            expect(main.createdDay.value!.weekId).toEqual(value)
            expect(main.createdDay.value!.edit.hour).toEqual('0h')
            expect(main.createdDay.value!.edit.name).toEqual('')
            expect(main.createdDay.value!.edit.update).toEqual(false)
            expect(main.createdDay.value!.hour.confirmed).toBeUndefined()
            expect(main.createdDay.value!.hour.planned).toEqual(0)
            expect(main.createdDay.value!.id).toBeUndefined()
            expect(main.createdDay.value!.name).toEqual('')
            expect(main.createdDay.value!.weekId).toEqual(value)
          })
        })
    })
    describe('doCloseDay', () => {
      Array(2)
        .fill(0)
        .map((_, index) => ['doCreateDay', 'doUpdateDay'][index])
        .forEach((value) => {
          describe(`from ${value}`, () => {
            let daySpy: SpyInstance<[day: IDexieDay], PromiseExtended<number>>
            let day0Spy: SpyInstance<[id: number], void>
            let day1Spy: SpyInstance<[], IWeek>
            let day2Spy: SpyInstance<[week: IWeek], void>
            let day3Spy: SpyInstance<[], void>

            beforeEach(() => {
              daySpy = vi.spyOn(main.db, 'editDay').mockResolvedValue(3)
              day0Spy = vi.spyOn(main, 'doCloseDay0').mockResolvedValue()
              day1Spy = vi
                .spyOn(main, 'doCloseDay1')
                .mockResolvedValue(Week.createWeek(0).getWeek())
              day2Spy = vi.spyOn(main, 'doCloseDay2').mockResolvedValue()
              day3Spy = vi.spyOn(main, 'doCloseDay3').mockResolvedValue()

              if (value == 'doCreateDay')
                main.doCreateDay(Week.createWeek(0).setId(3).getWeek())
              else
                main.doUpdateDay(
                  Week.createWeek(0).getWeek(),
                  Day.getEmptyDayManager().setId(3).getDay(),
                  false,
                )
            })
            test('Run #1', () => {
              expect(main.createdDay.value!.edit.update).toBeFalsy()
              main.doCloseDay()
              expect(daySpy).toBeCalledTimes(0)
            })
            test('Run #2', () =>
              new Promise((resolve) => {
                main.createdDay.value!.edit.update = true
                expect(main.createdDay.value!.edit.update).toBeTruthy()

                if (value == 'doCreateDay')
                  expect(main.createdDay.value!.id).toBeUndefined()
                else expect(main.createdDay.value!.id).toEqual(3)

                main.doCloseDay()
                expect(daySpy).toBeCalledTimes(1)
                setTimeout(() => {
                  expect(day0Spy).toBeCalledTimes(1)
                  expect(day1Spy).toBeCalledTimes(1)
                  expect(day2Spy).toBeCalledTimes(1)
                  expect(day3Spy).toBeCalledTimes(1)
                  resolve(1)
                }, 1)
              }))
          })
        })
    })
    describe('_watch', () => {
      test('Run #1', () => {
        main.db.editWeek = vi.fn()
        const spy = vi.spyOn(main.db, 'editWeek')

        expect(main.week.value.id).toEqual(1)

        main._watch()

        editWeekSpyTest(spy, Week.normalToDexie(main.week.value))
        expect(spy).toBeCalledTimes(1)
        expect(main.week.value.id).toEqual(1)
      })
    })
    describe('_mount', () => {
      test('Run #1', () =>
        new Promise((resolve) => {
          main.db.getWeek = vi
            .fn()
            .mockImplementation(
              () => new Promise((resolve) => resolve(undefined)),
            )
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          expect(main.week.value.id).toEqual(1)

          main._mount()

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))
            expect(spy).toBeCalledTimes(1)
            expect(main.week.value.id).toEqual(1)
            resolve(1)
          }, 1)
        }))
      test('Run #2', () =>
        new Promise((resolve) => {
          const dexieWeek = Week.normalToDexie(Week.createWeek(5).getWeek())

          main.db.getWeek = vi
            .fn()
            .mockImplementation(
              () => new Promise((resolve) => resolve(dexieWeek)),
            )
          main.db.editWeek = vi.fn()
          const spy = vi.spyOn(main.db, 'editWeek')

          expect(main.week.value.id).toEqual(1)
          expect(dexieWeek.hour).not.toEqual(main.week.value.hour)

          main._mount()

          setTimeout(() => {
            editWeekSpyTest(spy, Week.normalToDexie(main.week.value))
            expect(spy).toBeCalledTimes(1)
            expect(main.week.value.id).toEqual(1)
            resolve(1)
          })
        }))
    })
  })
})

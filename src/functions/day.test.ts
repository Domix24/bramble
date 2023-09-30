import { afterEach, describe, expect, test } from 'vitest'
import {
  createDay,
  createHour,
  dexieToNormal,
  getEmptyDay,
  getEmptyDayManager,
  getEmptyDexie,
  normalToDexie,
} from './day'
import { Display } from '.'
import { IDay, IDexieDay } from '../types'

describe('createDay', () => {
  test('principal', () => {
    expect(createDay).toBeTruthy()
  })
  test('monday 10h', () => {
    const day = createDay('monday', '10h').getDay()

    expect(day.hour.planned).toEqual(10)
    expect(day.name).toEqual('monday')
  })
  test('tuesday 3h', () => {
    const day = createDay('tuesday', 3).getDay()

    expect(day.hour.planned).toEqual(3)
    expect(day.name).toEqual('tuesday')
  })
  describe('DayManager', () => {
    test('emptyDayManager', () => {
      expect(getEmptyDayManager().getDay().day.start).toBeUndefined()
      expect(getEmptyDayManager().getDay().day.stop).toBeUndefined()
      expect(getEmptyDayManager().getDay().hour.confirmed).toBeUndefined()
      expect(getEmptyDayManager().getDay().hour.planned).toEqual(0)
      expect(getEmptyDayManager().getDay().id).toBeUndefined()
      expect(getEmptyDayManager().getDay().lunch.start).toBeUndefined()
      expect(getEmptyDayManager().getDay().lunch.stop).toBeUndefined()
      expect(getEmptyDayManager().getDay().name).toEqual('')
      expect(getEmptyDayManager().getDay().weekId).toEqual(0)
    })
    test('emptyDay', () => {
      expect(getEmptyDay().day.start).toBeUndefined()
      expect(getEmptyDay().day.stop).toBeUndefined()
      expect(getEmptyDay().hour.confirmed).toBeUndefined()
      expect(getEmptyDay().hour.planned).toEqual(0)
      expect(getEmptyDay().id).toBeUndefined()
      expect(getEmptyDay().lunch.start).toBeUndefined()
      expect(getEmptyDay().lunch.stop).toBeUndefined()
      expect(getEmptyDay().name).toEqual('')
      expect(getEmptyDay().weekId).toEqual(0)
    })
    test('emptyDexie', () => {
      expect(getEmptyDexie().confirmedHour).toBeUndefined()
      expect(getEmptyDexie().dayStart).toEqual(0)
      expect(getEmptyDexie().dayStop).toEqual(0)
      expect(getEmptyDexie().plannedHour).toEqual(0)
      expect(getEmptyDexie().id).toBeUndefined()
      expect(getEmptyDexie().lunchStart).toEqual(0)
      expect(getEmptyDexie().lunchStop).toEqual(0)
      expect(getEmptyDexie().name).toEqual('')
      expect(getEmptyDexie().weekId).toEqual(0)
    })
    test('Run #1 - setConfirmedHour', () => {
      const day = getEmptyDayManager()
      day.setConfirmedHour(3)

      expect(day.getDay().day.start).toBeUndefined()
      expect(day.getDay().day.stop).toBeUndefined()
      expect(day.getDay().hour.confirmed).toEqual(3)
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toBeUndefined()
      expect(day.getDay().lunch.start).toBeUndefined()
      expect(day.getDay().lunch.stop).toBeUndefined()
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(0)
    })
    test('Run #2 - setDayStart', () => {
      const day = getEmptyDayManager()
      day.setDayStart(new Date(1000000000000))

      expect(day.getDay().day.start.valueOf()).toEqual(1000000000000)
      expect(day.getDay().day.stop).toBeUndefined()
      expect(day.getDay().hour.confirmed).toBeUndefined()
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toBeUndefined()
      expect(day.getDay().lunch.start).toBeUndefined()
      expect(day.getDay().lunch.stop).toBeUndefined()
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(0)
    })
    test('Run #3 - setDayStop', () => {
      const day = getEmptyDayManager()
      day.setDayStop(new Date(1000000000000))

      expect(day.getDay().day.start).toBeUndefined()
      expect(day.getDay().day.stop.valueOf()).toEqual(1000000000000)
      expect(day.getDay().hour.confirmed).toBeUndefined()
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toBeUndefined()
      expect(day.getDay().lunch.start).toBeUndefined()
      expect(day.getDay().lunch.stop).toBeUndefined()
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(0)
    })
    test('Run #4 - setId', () => {
      const day = getEmptyDayManager()
      day.setId(4)

      expect(day.getDay().day.start).toBeUndefined()
      expect(day.getDay().day.stop).toBeUndefined()
      expect(day.getDay().hour.confirmed).toBeUndefined()
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toEqual(4)
      expect(day.getDay().lunch.start).toBeUndefined()
      expect(day.getDay().lunch.stop).toBeUndefined()
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(0)
    })
    test('Run #5 - setLunchStart', () => {
      const day = getEmptyDayManager()
      day.setLunchStart(new Date(1000000000000))

      expect(day.getDay().day.start).toBeUndefined()
      expect(day.getDay().day.stop).toBeUndefined()
      expect(day.getDay().hour.confirmed).toBeUndefined()
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toBeUndefined()
      expect(day.getDay().lunch.start.valueOf()).toEqual(1000000000000)
      expect(day.getDay().lunch.stop).toBeUndefined()
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(0)
    })
    test('Run #6 - setLunchStop', () => {
      const day = getEmptyDayManager()
      day.setLunchStop(new Date(1000000000000))

      expect(day.getDay().day.start).toBeUndefined()
      expect(day.getDay().day.stop).toBeUndefined()
      expect(day.getDay().hour.confirmed).toBeUndefined()
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toBeUndefined()
      expect(day.getDay().lunch.start).toBeUndefined()
      expect(day.getDay().lunch.stop.valueOf()).toEqual(1000000000000)
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(0)
    })
    test('Run #7 - setWeekId', () => {
      const day = getEmptyDayManager()
      day.setWeekId(5)

      expect(day.getDay().day.start).toBeUndefined()
      expect(day.getDay().day.stop).toBeUndefined()
      expect(day.getDay().hour.confirmed).toBeUndefined()
      expect(day.getDay().hour.planned).toEqual(0)
      expect(day.getDay().id).toBeUndefined()
      expect(day.getDay().lunch.start).toBeUndefined()
      expect(day.getDay().lunch.stop).toBeUndefined()
      expect(day.getDay().name).toEqual('')
      expect(day.getDay().weekId).toEqual(5)
    })
    describe('getDexie / getDay', () => {
      let dexie: IDexieDay
      let day: IDay
      test('Run #1', () => {
        const dayM = getEmptyDayManager()
        dayM.setConfirmedHour(1)

        day = dayM.getDay()
        dexie = dayM.getDexie()

        expect(day.hour.confirmed).toEqual(1)
        expect(day.id).toBeUndefined()
        expect(day.weekId).toEqual(0)

        expect(dexie.confirmedHour).toEqual(1)
        expect(dexie.id).toBeUndefined()
        expect(dexie.weekId).toEqual(0)
      })
      test('Run #2', () => {
        const dayM = getEmptyDayManager()
        dayM.setId(2)

        day = dayM.getDay()
        dexie = dayM.getDexie()

        expect(day.hour.confirmed).toBeUndefined()
        expect(day.id).toEqual(2)
        expect(day.weekId).toEqual(0)

        expect(dexie.confirmedHour).toBeUndefined()
        expect(dexie.id).toEqual(2)
        expect(dexie.weekId).toEqual(0)
      })
      test('Run #3', () => {
        const dayM = getEmptyDayManager()
        dayM.setWeekId(3)

        day = dayM.getDay()
        dexie = dayM.getDexie()

        expect(day.hour.confirmed).toBeUndefined()
        expect(day.id).toBeUndefined()
        expect(day.weekId).toEqual(3)

        expect(dexie.confirmedHour).toBeUndefined()
        expect(dexie.id).toBeUndefined()
        expect(dexie.weekId).toEqual(3)
      })
      afterEach(() => {
        expect(day.hour.planned).toEqual(0)
        expect(day.name).toEqual('')

        expect(dexie.plannedHour).toEqual(0)
        expect(dexie.name).toEqual('')
      })
    })
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
describe('dexieToNormal', () => {
  test('Run #1', () => {
    const dexie: IDexieDay = {
      confirmedHour: 43,
      dayStart: 22,
      dayStop: 43,
      id: 32,
      lunchStart: 66,
      lunchStop: 47,
      name: 'a name',
      plannedHour: 21,
      weekId: 2,
    }
    const expected: IDay = {
      day: {
        start: new Date(22),
        stop: new Date(43),
      },
      edit: {
        hour: '',
        name: '',
        update: false,
      },
      hour: {
        confirmed: 43,
        planned: 21,
      },
      id: 32,
      lunch: {
        start: new Date(66),
        stop: new Date(47),
      },
      name: 'a name',
      weekId: 2,
    }
    const normal = dexieToNormal(dexie)

    expect(normal.day.start).toEqual(expected.day.start)
    expect(normal.day.stop).toEqual(expected.day.stop)
    expect(normal.hour.confirmed).toEqual(expected.hour.confirmed)
    expect(normal.hour.planned).toEqual(expected.hour.planned)
    expect(normal.id).toEqual(expected.id)
    expect(normal.lunch.start).toEqual(expected.lunch.start)
    expect(normal.lunch.stop).toEqual(expected.lunch.stop)
    expect(normal.name).toEqual(expected.name)
    expect(normal.weekId).toEqual(expected.weekId)
  })
})
describe('normalToDexie', () => {
  test('Run #1', () => {
    const normal: IDay = {
      day: {
        start: new Date(17),
        stop: new Date(37),
      },
      edit: {
        hour: '',
        name: '',
        update: false,
      },
      hour: {
        confirmed: 86,
        planned: 42,
      },
      id: 64,
      lunch: {
        start: new Date(22),
        stop: new Date(49),
      },
      name: 'notaname',
      weekId: 4,
    }
    const expected: IDexieDay = {
      confirmedHour: 86,
      dayStart: 17,
      dayStop: 37,
      id: 64,
      lunchStart: 22,
      lunchStop: 49,
      name: 'notaname',
      plannedHour: 42,
      weekId: 4,
    }
    const dexie = normalToDexie(normal)

    expect(dexie.confirmedHour).toEqual(expected.confirmedHour)
    expect(dexie.dayStart).toEqual(expected.dayStart)
    expect(dexie.dayStop).toEqual(expected.dayStop)
    expect(dexie.id).toEqual(expected.id)
    expect(dexie.lunchStart).toEqual(expected.lunchStart)
    expect(dexie.lunchStop).toEqual(expected.lunchStop)
    expect(dexie.name).toEqual(expected.name)
    expect(dexie.plannedHour).toEqual(expected.plannedHour)
    expect(dexie.weekId).toEqual(expected.weekId)
  })
})

import { describe, expect, test, vi } from 'vitest'
import { DayFunctions } from '.'
import { Day } from '../functions'
import { IDayItemFunctions } from '../types'

const combinate = <A>(arg: Array<A>) => {
  const result = [] as Array<Array<A>>
  const functi = (active: Array<A>, arg2: Array<A>) => {
    for (let i = 0; i < arg2.length; i++) {
      result.push(active.concat([arg2[i]]))
      functi(active.concat([arg2[i]]), arg2.slice(i + 1))
    }
  }

  result.push([])
  functi([], arg)
  return result
}

const aDates = Array(5).fill(new Date())
aDates[0] = new Date(1694380435619)
aDates[1] = new Date(1694385883061)
aDates[2] = new Date(1694389263085)
aDates[3] = new Date(1694400640156)
aDates[4] = new Date(1783521480000)

const aValues0 = Array(4).fill(new Date())
aValues0[0] = (xMain: IDayItemFunctions) => (xMain.dayStart.value = aDates[0])
aValues0[1] = (xMain: IDayItemFunctions) => (xMain.lunchStart.value = aDates[1])
aValues0[2] = (xMain: IDayItemFunctions) => (xMain.lunchStop.value = aDates[2])
aValues0[3] = (xMain: IDayItemFunctions) => (xMain.dayStop.value = aDates[3])
const aValues1 = Array(2).fill(new Date())
aValues1[0] = aValues0[1]
aValues1[1] = aValues0[2]
const aValues2 = Array(3).fill(new Date())
aValues2[0] = aValues0[0]
aValues2[1] = aValues0[1]
aValues2[2] = aValues0[2]

const nDayTotal = 16824513
const nLunchDiff = 3380024

const aCombine0 = combinate(aValues0.map((v, i) => ({ f: v, i })))
const aCombine1 = combinate(aValues1.map((v, i) => ({ f: v, i })))
const aCombine2 = combinate(aValues2.map((v, i) => ({ f: v, i })))

describe('DayFunctions', () => {
  test('principal', () => {
    expect(DayFunctions).toBeTruthy()
  })
  describe('getLunchDiff', () => {
    aCombine1.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const main = DayFunctions.main()
        v.forEach((x) => x.f(main))

        if (v.length < 2) expect(main.getLunchDiff()).toBeNaN()
        else expect(main.getLunchDiff()).toEqual(nLunchDiff)
      })
    })
  })
  describe('getDayTotal', () => {
    aCombine0.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const main = DayFunctions.main()
        v.forEach((x) => x.f(main))
        const ix = v.map((x) => x.i)

        if (v.length < 4) expect(main.getDayTotal()).toBeNaN()
        else expect(main.getDayTotal()).toEqual(nDayTotal)

        if (!(ix.includes(1) && ix.includes(2)))
          expect(main.getLunchDiff()).toBeNaN()
        else expect(main.getLunchDiff()).toEqual(nLunchDiff)
      })
    })
  })
  describe('onStart', () => {
    const main = DayFunctions.main()
    Array(5)
      .fill(0)
      .map((_v, i) => i)
      .forEach((x) => {
        test(`run #${x}`, () => {
          const onStartSpy = vi.fn(main.onStart)
          for (let i = 0; i < x + 1; i++) onStartSpy()

          expect(onStartSpy).toBeCalledTimes(x + 1)
          expect(main.dayStart.value).toBeTruthy()

          if (!x) expect(main.lunchStart.value).toBeFalsy()
          else expect(main.lunchStart.value).toBeTruthy()
        })
      })
  })
  describe('onStop', () => {
    const main = DayFunctions.main()
    Array(5)
      .fill(0)
      .map((_v, i) => i)
      .forEach((x) => {
        test(`run #${x}`, () => {
          const onStopSpy = vi.fn(main.onStop)
          for (let i = 0; i < x + 1; i++)
            onStopSpy({ day: Day.createDay('', 5) })

          expect(onStopSpy).toBeCalledTimes(x + 1)
          expect(main.lunchStop.value).toBeTruthy()

          if (!x) expect(main.dayStop.value).toBeFalsy()
          else expect(main.dayStop.value).toBeTruthy()
        })
      })
  })
  describe('onStopExact', () => {
    aCombine2.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const main = DayFunctions.main()
        v.forEach((x) => x.f(main))

        const oProps = { day: Day.createDay('', 5) }
        main.onStopExact(oProps)

        expect(main.dayStop.value).toBeTruthy()

        if (i == 3)
          expect(oProps.day.hour.confirmed).toEqual(oProps.day.hour.planned)
        else expect(oProps.day.hour.confirmed).toBeNaN()
      })
    })
  })
  describe('getEstimatedTime', () => {
    aCombine2.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const main = DayFunctions.main()
        v.forEach((x) => x.f(main))

        const oProps = { day: Day.createDay('', 5) }

        if (i == 3)
          expect(main.getEstimatedTime(oProps).getTime()).not.toBeNaN()
        else expect(main.getEstimatedTime(oProps).getTime()).toBeNaN()
      })
    })
  })
  describe('trimSeconds', () => {
    aDates.forEach((v, i) => {
      test(`run #${i}`, () => {
        const result = DayFunctions.trimSeconds(v)

        expect(+result).toBeLessThanOrEqual(+v)
        expect(result.getSeconds()).toEqual(0)
        expect(result.getMilliseconds()).toEqual(0)
      })
    })
  })
  describe('addHourMinute', () => {
    aDates.forEach((v, i) => {
      test(`run #${i}`, () => {
        const nbHours = Math.floor(Math.random() * (700 - 100 + 1) + 100) / 100
        const result = DayFunctions.addHourMinute(v, nbHours)

        expect(+result).toBeGreaterThan(+v)
      })
    })
  })
  describe('_updateDayStop', () => {
    aCombine2.forEach((v, i) => {
      aDates.forEach((w, j) => {
        test(`${v.length} - ${i} - ${j}`, () => {
          const main = DayFunctions.main()
          v.forEach((x) => x.f(main))

          const oProps = { day: Day.createDay('', 0) }

          main._updateDayStop(oProps, w)

          expect(main.dayStop.value).toBeTruthy()
          expect(+main.dayStop.value!).toEqual(+w)

          if (i == 3) expect(oProps.day.hour.confirmed).not.toBeNaN()
          else expect(oProps.day.hour.confirmed).toBeNaN()
        })
      })
    })
  })
})

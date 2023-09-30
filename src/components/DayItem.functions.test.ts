import { describe, expect, test, vi } from 'vitest'
import { DayFunctions } from '.'
import { Day } from '../functions'
import { IDayItemProps } from '../types'

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

const updateLunch = (
  type: 'start' | 'stop',
  newValue: Date,
  props: IDayItemProps,
) => {
  if (!props.day.lunch) props.day.lunch = {} as { stop: Date; start: Date }
  if (type === 'start') props.day.lunch.start = newValue
  else props.day.lunch.stop = newValue
}

const updateDay = (
  type: 'start' | 'stop',
  newValue: Date,
  props: IDayItemProps,
) => {
  if (!props.day.day) props.day.day = {} as { stop: Date; start: Date }
  if (type === 'start') props.day.day.start = newValue
  else props.day.day.stop = newValue
}

const aDates = Array(5).fill(new Date())
aDates[0] = new Date(1694380435619)
aDates[1] = new Date(1694385883061)
aDates[2] = new Date(1694389263085)
aDates[3] = new Date(1694400640156)
aDates[4] = new Date(1783521480000)

const aValues0 = Array(4).fill(new Date())
aValues0[0] = (props: IDayItemProps) => updateDay('start', aDates[0], props)
aValues0[1] = (props: IDayItemProps) => updateLunch('start', aDates[1], props)
aValues0[2] = (props: IDayItemProps) => updateLunch('stop', aDates[2], props)
aValues0[3] = (props: IDayItemProps) => updateDay('stop', aDates[3], props)
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
        const props = { day: Day.getEmptyDay() }
        v.forEach((x) => x.f(props))

        if (v.length < 2)
          expect(DayFunctions.main(props).getLunchDiff()).toBeNaN()
        else expect(DayFunctions.main(props).getLunchDiff()).toEqual(nLunchDiff)
      })
    })
  })
  describe('getDayTotal', () => {
    aCombine0.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const props = { day: Day.getEmptyDay() }
        v.forEach((x) => x.f(props))
        const ix = v.map((x) => x.i)

        if (v.length < 4)
          expect(DayFunctions.main(props).getDayTotal()).toBeNaN()
        else expect(DayFunctions.main(props).getDayTotal()).toEqual(nDayTotal)

        if (!(ix.includes(1) && ix.includes(2)))
          expect(DayFunctions.main(props).getLunchDiff()).toBeNaN()
        else expect(DayFunctions.main(props).getLunchDiff()).toEqual(nLunchDiff)
      })
    })
  })
  describe('onStart', () => {
    const props = { day: Day.getEmptyDay() }
    const main = DayFunctions.main(props)
    Array(5)
      .fill(0)
      .map((_v, i) => i)
      .forEach((x) => {
        test(`run #${x}`, () => {
          const onStartSpy = vi.fn(main.onStart)
          for (let i = 0; i < x + 1; i++) onStartSpy()

          expect(onStartSpy).toBeCalledTimes(x + 1)
          expect(props.day.day.start).toBeTruthy()

          if (!x) expect(props.day.lunch).toBeFalsy()
          else expect(props.day.lunch.start).toBeTruthy()
        })
      })
  })
  describe('onStop', () => {
    const props = { day: Day.getEmptyDay() }
    const main = DayFunctions.main(props)
    Array(5)
      .fill(0)
      .map((_v, i) => i)
      .forEach((x) => {
        test(`run #${x}`, () => {
          const onStopSpy = vi.fn(main.onStop)
          for (let i = 0; i < x + 1; i++) onStopSpy()

          expect(onStopSpy).toBeCalledTimes(x + 1)
          expect(props.day.lunch.stop).toBeTruthy()

          if (!x) expect(props.day.day).toBeFalsy()
          else expect(props.day.day.stop).toBeTruthy()
        })
      })
  })
  describe('onStopExact', () => {
    aCombine2.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const props = { day: Day.getEmptyDay() }
        v.forEach((x) => x.f(props))

        DayFunctions.main(props).onStopExact()

        expect(props.day.day.stop).toBeTruthy()

        if (i == 3)
          expect(props.day.hour.confirmed).toEqual(props.day.hour.planned)
        else expect(props.day.hour.confirmed).toBeNaN()
      })
    })
  })
  describe('getEstimatedTime', () => {
    aCombine2.forEach((v, i) => {
      test(`${v.length} - ${i}`, () => {
        const props = { day: Day.getEmptyDay() }
        v.forEach((x) => x.f(props))

        if (i == 3)
          expect(
            DayFunctions.main(props).getEstimatedTime().getTime(),
          ).not.toBeNaN()
        else
          expect(
            DayFunctions.main(props).getEstimatedTime().getTime(),
          ).toBeNaN()
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
          const props = { day: Day.getEmptyDay() }
          v.forEach((x) => x.f(props))

          DayFunctions.main(props)._updateDayStop(w)

          expect(props.day.day.stop).toBeTruthy()
          expect(+props.day.day.stop).toEqual(+w)

          if (i == 3) expect(props.day.hour.confirmed).not.toBeNaN()
          else expect(props.day.hour.confirmed).toBeNaN()
        })
      })
    })
  })
  describe('', () => {
    test('Run #1', () => {
      expect(DayFunctions.isEmpty(new Date(0))).toBeTruthy()
    })
    test('Run #2', () => {
      expect(DayFunctions.isEmpty(new Date(1))).toBeFalsy()
    })
    test('Run #3', () => {
      expect(DayFunctions.isEmpty(new Date(-1))).toBeFalsy()
    })
    test('Run #4', () => {
      const test = {} as { info: Date }
      expect(test.info).toBeTypeOf('undefined')
      expect(DayFunctions.isEmpty(test.info)).toBeTruthy()
    })
  })
})

import { describe, expect, test } from 'vitest'
import { checkHour, checkHourMinute, getHour, getHourMinute } from './time'

const quarters = ['15', '30', '45']

describe('checkhour', () => {
  test('principal', () => {
    expect(checkHour).toBeTruthy()
  })
  //--
  const theArray0 = (Array(100).fill(0) as number[]).map((_, i) => ({
    name: `${i}h`,
    values: [`${i}h`, `${i}`],
  }))
  theArray0.forEach((x) => {
    test(`${x.name} - valid hour`, () => {
      x.values.forEach((y) => {
        expect(checkHour(y)).toBeTruthy()
      })
    })
  })
  //--
  const theArray1 = (Array(10).fill(0) as number[]).map((_, i) => ({
    name: `0${i}h`,
    values: [`0${i}h`, `0${i}`],
  }))
  theArray1.forEach((x) => {
    test(`${x.name} - start with 0`, () => {
      x.values.forEach((y) => {
        expect(checkHour(y)).toBeFalsy()
      })
    })
  })
  //--
  const theArray2 = []
  theArray2.push({ name: `100h`, values: [`100h`, `100`] })
  theArray2.push({ name: `100h3`, values: [`100h3`] })
  theArray2.push({ name: `100hx`, values: [`100hx`] })
  theArray2.forEach((x) => {
    test(`${x.name} - invalid`, () => {
      x.values.forEach((y) => {
        expect(checkHour(y)).toBeFalsy()
      })
    })
  })
})
describe('checkhourminute', () => {
  test('principal', () => {
    expect(checkHourMinute).toBeTruthy()
  })
  //--
  const theArray0 = (Array(100).fill(0) as number[])
    .map((_, i) =>
      (Array(3).fill(i) as number[]).map((__, ii) => ({
        name: `${i}h${quarters[ii]}`,
        values: [`${i}h${quarters[ii]}`],
      })),
    )
    .flatMap((x) => x)
  theArray0.forEach((x) => {
    test(`${x.name} - valid hour-minute`, () => {
      x.values.forEach((y) => {
        expect(checkHourMinute(y)).toBeTruthy()
      })
    })
  })
  //--
  const theArray1 = (Array(10).fill(0) as number[])
    .map((_, i) =>
      (Array(3).fill(i) as number[]).map((__, ii) => ({
        name: `${i}h${quarters[ii]}`,
        values: [`0${i}h${quarters[ii]}`],
      })),
    )
    .flatMap((x) => x)
  theArray1.forEach((x) => {
    test(`${x.name} - start with 0`, () => {
      x.values.forEach((y) => {
        expect(checkHourMinute(y)).toBeFalsy()
      })
    })
  })
  //--
  const theArray2 = (Array(10).fill(0) as number[])
    .map((_, i) => i)
    .filter((x) => x % 15)
    .map((x) => ({ name: `0h${x}`, values: [`0h${x}h`] }))
  theArray2.forEach((x) => {
    test(`${x.name} - invalid minute`, () => {
      x.values.forEach((y) => {
        expect(checkHourMinute(y)).toBeFalsy()
      })
    })
  })
  //--
  const theArray3 = (Array(10).fill(0) as number[]).map((_, i) => ({
    name: `${i}h`,
    values: [`${i}h`],
  }))
  theArray3.forEach((x) => {
    test(`${x.name} - no minute`, () => {
      x.values.forEach((y) => {
        expect(checkHourMinute(y)).toBeFalsy()
      })
    })
  })
  //--
  const theArray4 = (Array(3).fill(0) as number[]).map((_, i) => ({
    name: `h${i}`,
    values: [`h${quarters[i]}`],
  }))
  theArray4.forEach((x) => {
    test(`${x.name} - no hour`, () => {
      x.values.forEach((y) => {
        expect(checkHourMinute(y)).toBeFalsy()
      })
    })
  })
})
describe('gethour', () => {
  test('principal', () => {
    expect(getHour).toBeTruthy()
  })
  //--
  const theArray0 = (Array(100).fill(0) as number[]).map((_, i) => ({
    name: `${i}h`,
    values: [`${i}h`, `${i}`],
    value: i,
  }))
  theArray0.forEach((x) => {
    test(`${x.name} - valid hour`, () => {
      x.values.forEach((y) => {
        expect(getHour(y)).toEqual(x.value)
      })
    })
  })
  //--
  const theArray1 = (Array(10).fill(0) as number[]).map((_, i) => ({
    name: `0${i}h`,
    values: [`0${i}h`, `0${i}`],
  }))
  theArray1.forEach((x) => {
    test(`${x.name} - start with 0`, () => {
      x.values.forEach((y) => {
        expect(() => getHour(y)).toThrow()
      })
    })
  })
  //--
  const theArray2 = []
  theArray2.push({ name: `100h`, values: [`100h`, `100`] })
  theArray2.push({ name: `100h3`, values: [`100h3`] })
  theArray2.push({ name: `100hx`, values: [`100hx`] })
  theArray2.forEach((x) => {
    test(`${x.name} - invalid`, () => {
      x.values.forEach((y) => {
        expect(() => getHour(y)).toThrow()
      })
    })
  })
})
describe('gethourminute', () => {
  test('principal', () => {
    expect(getHourMinute).toBeTruthy()
  })
  //--
  const theArray0 = (Array(100).fill(0) as number[])
    .map((_, i) =>
      (Array(3).fill(i) as number[]).map((__, ii) => ({
        name: `${i}h${quarters[ii]}`,
        values: [`${i}h${quarters[ii]}`],
        value: i + (ii + 1) * 0.25,
      })),
    )
    .flatMap((x) => x)
  theArray0.forEach((x) => {
    test(`${x.name} - valid hour-minute`, () => {
      x.values.forEach((y) => {
        expect(getHourMinute(y)).toEqual(x.value)
      })
    })
  })
  //--
  const theArray1 = (Array(10).fill(0) as number[])
    .map((_, i) =>
      (Array(3).fill(i) as number[]).map((__, ii) => ({
        name: `${i}h${quarters[ii]}`,
        values: [`0${i}h${quarters[ii]}`],
      })),
    )
    .flatMap((x) => x)
  theArray1.forEach((x) => {
    test(`${x.name} - start with 0`, () => {
      x.values.forEach((y) => {
        expect(() => getHourMinute(y)).toThrow()
      })
    })
  })
  //--
  const theArray2 = (Array(10).fill(0) as number[])
    .map((_, i) => i)
    .filter((x) => x % 15)
    .map((x) => ({ name: `0h${x}`, values: [`0h${x}h`] }))
  theArray2.forEach((x) => {
    test(`${x.name} - invalid minute`, () => {
      x.values.forEach((y) => {
        expect(() => getHourMinute(y)).toThrow()
      })
    })
  })
  //--
  const theArray3 = (Array(10).fill(0) as number[]).map((_, i) => ({
    name: `${i}h`,
    values: [`${i}h`],
  }))
  theArray3.forEach((x) => {
    test(`${x.name} - no minute`, () => {
      x.values.forEach((y) => {
        expect(() => getHourMinute(y)).toThrow()
      })
    })
  })
  //--
  const theArray4 = (Array(3).fill(0) as number[]).map((_, i) => ({
    name: `h${i}`,
    values: [`h${quarters[i]}`],
  }))
  theArray4.forEach((x) => {
    test(`${x.name} - no hour`, () => {
      x.values.forEach((y) => {
        expect(() => getHourMinute(y)).toThrow()
      })
    })
  })
})

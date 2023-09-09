import { describe, expect, test } from 'vitest'
import {
  checkHour,
  checkHourMinute,
  getHour,
  getHourMinute,
  toNumber,
} from './time'

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
describe('tonumber', () => {
  test('principal', () => {
    expect(toNumber).toBeTruthy()
  })

  describe('number, test % 25', () => {
    Array(100)
      .fill(0)
      .map((_, i) => i / 100)
      .forEach((x) => {
        if (x % 0.25) {
          test(`error`, () => {
            expect(() => toNumber(x)).toThrow()
          })
        } else {
          test(`ok`, () => {
            expect(toNumber(x)).toEqual(x)
          })
        }
      })
  })

  describe('string', () => {
    describe('hour only', () => {
      Array(100)
        .fill(0)
        .map((_, i) => i)
        .forEach((x) => {
          test('single hour, ok', () => {
            expect(toNumber(`${x}h`)).toEqual(x)
            expect(toNumber(`${x}`)).toEqual(x)
          })
          if (`${x}`.length == 1) {
            test('single hour starting with zero, error', () => {
              expect(() => toNumber(`0${x}h`)).toThrow()
              expect(() => toNumber(`0${x}`)).toThrow()
            })
          } else {
            test('3 digit hour, error', () => {
              expect(() => toNumber(`${x % 9}${x}h`)).toThrow()
              expect(() => toNumber(`${x % 9}${x}`)).toThrow()
            })
          }
        })
    })
    describe('hour minute only', () => {
      Array(7)
        .fill(0)
        .map((_, i) => i + 1)
        .forEach((x) => {
          const m1 = x * 0.125
          const m2 = (x * 7.5 + '').split('.')[0].padStart(2, '0')
          Array(100)
            .fill(0)
            .map((_, i) => i)
            .forEach((y) => {
              if (m1 % 0.25) {
                // `${x}`
                test(`${y}h${m2}, error (wrong minute)`, () => {
                  expect(() => toNumber(`${y}h${m2}`)).toThrow()
                })
              } else {
                test(`${y}h${m2}, ok`, () => {
                  expect(toNumber(`${y}h${m2}`)).toEqual(y + m1)
                })
              }
              if (`${y}`.length == 1) {
                test(`0${y}h${m2}, error (two length starting with zero)`, () => {
                  expect(() => toNumber(`0${y}h${m2}`)).toThrow()
                })
              } else {
                test(`${y % 10}${y}h${m2}, error (three length)`, () => {
                  expect(() => toNumber(`0${y}h${m2}`)).toThrow()
                })
              }
            })
        })
    })
  })
})

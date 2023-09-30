import { describe, expect, test } from 'vitest'
import { DayFunctions } from '.'

describe('DayFunctions', () => {
  test('principal', () => {
    expect(DayFunctions).toBeTypeOf('object')
  })
})

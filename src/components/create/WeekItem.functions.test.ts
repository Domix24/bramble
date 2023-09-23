import { describe, expect, test } from 'vitest'
import { WeekFunctions } from '.'

describe('WeekFunctions', () => {
  test('principal', () => {
    expect(WeekFunctions).toBeTypeOf('object')
  })
})

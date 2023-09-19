import { describe, expect, test } from 'vitest'
import { AppFunctions } from '.'

describe('AppFunctions', () => {
  test('principal', () => {
    expect(AppFunctions).toBeTypeOf('object')
  })
})

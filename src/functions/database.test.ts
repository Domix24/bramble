import { describe, expect, test } from 'vitest'
import { BrambleDatabase } from './database'

describe('BrambleDatabase', () => {
  test('principal', () => {
    expect(BrambleDatabase).toBeTypeOf('function')
  })
})

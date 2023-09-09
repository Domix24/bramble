import { Time } from '.'
import { IDay } from '../types'

export const createDay = (name: string, hour: number | string) => {
  const dayObject = {} as IDay
  dayObject.hour = Time.toNumber(hour)
  dayObject.name = name

  return dayObject
}

import { Time } from '.'
import { IDay } from '../types'

export const createDay = (name: string, hour: number | string) => {
  const dayObject = {} as IDay
  dayObject.hour = createHour(hour)
  dayObject.name = name

  return dayObject
}

export const createHour = (planned: number | string) => {
  const object = {} as { planned: number; confirmed: number }
  object.planned = Time.toNumber(planned)

  return object
}

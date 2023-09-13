import { Time } from '.'
import { IWeek } from '../types'
import { createDay } from './day'

export const createWeek = (hour: number | string) => {
  const weekObject = {} as IWeek
  weekObject.days = []
  weekObject.hour = Time.toNumber(hour)

  const returnFn = (theWeek: IWeek) => ({
    addDay: (dayName: string, dayHour: number | string) => {
      theWeek.days.push(createDay(dayName, dayHour))
      return returnFn(theWeek)
    },
    getWeek: () => theWeek,
  })

  return returnFn(weekObject)
}

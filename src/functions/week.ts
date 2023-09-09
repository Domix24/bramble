import { Time } from '.'
import { IWeek } from '../types'
import { createDay } from './day'

export const createWeek = (hour: number | string) => {
  const weekObject = {} as IWeek
  weekObject.days = []
  weekObject.hour = Time.toNumber(hour)

  const returnFn = (theWeek: IWeek) => ({
    addDay: (dayName: string, dayHour: number | string) =>
      returnFn(addDay(theWeek, dayName, dayHour)),
    getWeek: () => theWeek,
  })

  return returnFn(weekObject)
}

const addDay = (week: IWeek, dayName: string, dayHour: number | string) => {
  week.days.push(createDay(dayName, dayHour))

  return week
}

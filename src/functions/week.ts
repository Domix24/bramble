import { Time } from '.'
import { IDay, IWeek } from '../types'

export const createWeek = (hour: number | string) => {
  const weekObject = {} as IWeek
  weekObject.days = []
  weekObject.hour = Time.toNumber(hour)

  const returnFn = (theWeek: IWeek) => ({
    addDay: (day: IDay) => {
      theWeek.days.push(day)
      return returnFn(theWeek)
    },
    getWeek: () => theWeek,
  })

  return returnFn(weekObject)
}

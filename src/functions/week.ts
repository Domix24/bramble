import { Database, Day, Display, Time } from '.'
import { IDay, IWeek } from '../types'

export const createWeek = (hour: number | string) => {
  const weekObject = {} as IWeek
  weekObject.days = []
  weekObject.hour = Time.toNumber(hour)
  weekObject.edit = { hour: '', update: false, id: 0 }
  weekObject.edit.hour = Display.showHourMinute(weekObject.hour)

  const returnFn = (theWeek: IWeek) => ({
    addDay: (dayName: string, dayHour: number | string) => {
      theWeek.days.push(Day.createDay(dayName, dayHour).getDay())
      return returnFn(theWeek)
    },
    addDayDirect: (day: IDay) => {
      theWeek.days.push(day)
      return returnFn(theWeek)
    },
    getWeek: () => theWeek,
    setUpdated: () => {
      theWeek.edit.update = true
      return returnFn(theWeek)
    },
    setId: (id: number) => {
      theWeek.edit.id = id
      return returnFn(theWeek)
    },
  })

  return returnFn(weekObject)
}

export const getWeeks = async (database: Database.BrambleDatabase) => {
  console.log(database)
}

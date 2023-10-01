import { Day, Display, Time } from '.'
import { IDay, IDexieWeek, IWeek } from '../types'

export const createWeek = (hour: number | string) => {
  const weekObject: IWeek = {
    days: [],
    edit: {
      hour: Display.showHourMinute(Time.toNumber(hour)),
      update: false,
    },
    hour: Time.toNumber(hour),
    id: 0,
  }

  const returnFn = (theWeek: IWeek) => ({
    addDay: (day: IDay) => {
      theWeek.days.push(day)
      return returnFn(theWeek)
    },
    getWeek: () => theWeek,
    setUpdated: () => {
      theWeek.edit.update = true
      return returnFn(theWeek)
    },
    setId: (id: number) => {
      theWeek.id = id
      return returnFn(theWeek)
    },
  })

  return returnFn(weekObject)
}

export const dexieToNormal = (week: IDexieWeek) => {
  return ((): IWeek => ({
    days: week.days.map((value) =>
      Day.getEmptyDayManager().setId(value).setWeekId(week.id).getDay(),
    ),
    edit: {
      hour: Display.showHourMinute(Time.toNumber(week.hour)),
      update: false,
    },
    hour: week.hour,
    id: week.id,
  }))()
}

export const normalToDexie = (week: IWeek) => {
  return ((): IDexieWeek => ({
    hour: week.hour,
    id: week.id,
    days: week.days.map((value) => value.id),
  }))()
}

export const resetDays = (week: IWeek) => {
  const weekObject = week

  weekObject.days = week.days.map(Day.resetDay)

  return weekObject
}

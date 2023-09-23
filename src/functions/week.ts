import { Display, Time } from '.'
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
  return createWeek(week.hour).setId(week.id).getWeek()
}

export const normalToDexie = (week: IWeek) => {
  return ((): IDexieWeek => ({
    hour: week.hour,
    id: week.id,
  }))()
}

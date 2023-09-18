import { Display, Time } from '.'
import { DayFunctions } from '../components'
import { IDay } from '../types'

export const createDay = (name: string, hour: number | string) => {
  const dayObject = {} as IDay
  dayObject.hour = createHour(hour)
  dayObject.name = name
  dayObject.edit = { hour: '', update: false, id: 0 }
  dayObject.edit.hour = Display.showHourMinute(dayObject.hour.planned)
  dayObject.startDay = undefined
  dayObject.startLunch = undefined
  dayObject.stopDay = undefined
  dayObject.stopLunch = undefined

  const returnFn = (theDay: IDay) => ({
    getDay: () => theDay,
    setUpdated: () => {
      theDay.edit.update = true
      return returnFn(theDay)
    },
    setId: (id: number) => {
      theDay.edit.id = id
      return returnFn(theDay)
    },
    setStartDay: (day: number) => {
      theDay.startDay = new Date(day)
      return returnFn(theDay)
    },
    setStartLunch: (day: number) => {
      theDay.startLunch = new Date(day)
      return returnFn(theDay)
    },
    setStopDay: (day: number) => {
      theDay.stopDay = new Date(day)
      return returnFn(theDay)
    },
    setStopLunch: (day: number) => {
      theDay.stopLunch = new Date(day)
      return returnFn(theDay)
    },
    setConfirmed: () => {
      if (
        theDay.startDay &&
        theDay.startLunch &&
        theDay.stopDay &&
        theDay.stopLunch
      )
        theDay.hour.confirmed = DayFunctions.getConfirmed(
          theDay.startDay,
          theDay.stopDay,
          theDay.startLunch,
          theDay.stopLunch,
        )

      return returnFn(theDay)
    },
  })

  return returnFn(dayObject)
}

export const createHour = (planned: number | string) => {
  const object = {} as { planned: number; confirmed: number }
  object.planned = Time.toNumber(planned)

  return object
}

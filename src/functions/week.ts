import { Time } from '.'
import { IWeek } from '../types'

export const createWeek = (hour: number | string) => {
  const weekObject = {} as IWeek

  if (typeof hour == 'number') {
    if ((hour * 100) % 25) throw new Error()
    weekObject.hour = hour
  } else {
    if (!Time.checkHour(hour) && !Time.checkHourMinute(hour)) throw new Error()
    if (Time.checkHour(hour)) weekObject.hour = Time.getHour(hour)
    else weekObject.hour = Time.getHourMinute(hour)
  }

  return weekObject
}

import { ref } from 'vue'
import { IDay, IWeek } from '../types'

export const days = ref([] as IDay[])

export const setWeek = (week: IWeek) => {
  days.value = week.days
}

export const getHours = () => {
  const result = days.value.reduce(
    (p, c) => p + (c.hour.confirmed ? c.hour.confirmed : 0),
    0,
  )

  return result ? result : 0
}

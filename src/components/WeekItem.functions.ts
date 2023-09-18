import { ref } from 'vue'
import { IWeek } from '../types'

export const main = (week: IWeek) => {
  const inside = {
    hour: ref(week.hour),
    days: ref(week.days),

    /*update: (week: IWeek) => {
      return main(week)
    },*/

    getHours: () => {
      const result = inside.days.value.reduce(
        (p, c) => p + (c.hour.confirmed ? c.hour.confirmed : 0),
        0,
      )

      return result ? result : 0
    },
    getDifference: () => Math.abs(inside.getHours() - inside.hour.value),
    getSign: () => (inside.getHours() - inside.hour.value > 0 ? '+' : '-'),
  }

  return inside
}

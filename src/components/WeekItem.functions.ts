import { computed, ref } from 'vue'
import {
  IDay,
  IWeekItemEmits,
  IWeekItemFunctions,
  IWeekItemProps,
} from '../types'
import { Week } from '../functions'

export const getHours = (days: IDay[]) => {
  const result = days.reduce(
    (p, c) => p + (c.hour.confirmed ? c.hour.confirmed : 0),
    0,
  )

  return result ? result : 0
}

export const getDifference = (days: IDay[], hour: number) =>
  Math.abs(getHours(days) - hour)

export const getSign = (days: IDay[], hour: number) =>
  getHours(days) - hour > 0 ? '+' : '-'

export const main = (props: IWeekItemProps, emits: IWeekItemEmits) => {
  const inside: IWeekItemFunctions = {
    days: ref(props.week.days),
    hour: ref(props.week.hour),

    daysC: computed({
      get: () => inside.days.value,
      set: (v) => {
        inside.days.value = v
        inside.emitUpdate()
      },
    }),
    hourC: computed({
      get: () => inside.hour.value,
      set: (v) => {
        inside.hour.value = v
        inside.emitUpdate()
      },
    }),

    getHours: () => {
      return getHours(inside.daysC.value)
    },

    getDifference: () => {
      return getDifference(inside.daysC.value, inside.hourC.value)
    },

    getSign: () => {
      return getSign(inside.daysC.value, inside.hourC.value)
    },

    emitUpdate: () => {
      const week = Week.createWeek(inside.hourC.value)
        .setId(props.week.id)
        .getWeek()
      week.days = inside.daysC.value
      emits('update:week', Week.createWeek(0).getWeek())
    },
  }

  return inside
}

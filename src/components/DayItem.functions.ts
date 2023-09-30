import { IDayItemEmits, IDayItemFunctions, IDayItemProps } from '../types'
import { Time } from '../functions'

export const trimSeconds = (date: Date) =>
  new Date(parseInt(+date / 60000 + '') * 60000)

export const addHourMinute = (date: Date, hour: number) =>
  +date + hour * 3600000

export const isEmpty = (date: Date) => !date || !date.valueOf()

export const main = (props: IDayItemProps, emits?: IDayItemEmits) => {
  const inside: IDayItemFunctions = {
    onStart: () => {
      if (isEmpty(props.day.day.start))
        props.day.day.start = trimSeconds(new Date())
      else props.day.lunch.start = trimSeconds(new Date())
      if (emits) emits('update:day:direct', props.day)
    },
    onStop: () => {
      if (isEmpty(props.day.lunch.stop))
        props.day.lunch.stop = trimSeconds(new Date())
      else inside._updateDayStop(trimSeconds(new Date()))
      if (emits) emits('update:day:direct', props.day)
    },
    onStopExact: () => {
      inside._updateDayStop(inside.getEstimatedTime())
      if (emits) emits('update:day:direct', props.day)
    },

    getLunchDiff: () => +props.day.lunch.stop - +props.day.lunch.start,
    getDayTotal: () =>
      +props.day.day.stop - +props.day.day.start - inside.getLunchDiff(),
    getEstimatedTime: () =>
      new Date(
        addHourMinute(props.day.day.start, props.day.hour.planned) +
          inside.getLunchDiff(),
      ),

    _updateDayStop: (newDate) => {
      props.day.day.stop = newDate
      props.day.hour.confirmed = Time.toNumber(
        parseInt(inside.getDayTotal() / 900000 + '') * 0.25,
      )
    },
  }

  return inside
}

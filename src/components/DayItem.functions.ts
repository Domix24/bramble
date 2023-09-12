import { ref } from 'vue'
import { IDayItemFunctions, IDayItemProps } from '../types'
import { Time } from '../functions'

export const trimSeconds = (date: Date) =>
  new Date(parseInt(+date / 60000 + '') * 60000)

export const addHourMinute = (date: Date, hour: number) =>
  +date + hour * 3600000

export const main = () => {
  const inside = {
    dayStart: ref(undefined as undefined | Date),
    dayStop: ref(undefined as undefined | Date),

    lunchStart: ref(undefined as undefined | Date),
    lunchStop: ref(undefined as undefined | Date),

    onStart: () => {
      if (!inside.dayStart.value)
        inside.dayStart.value = trimSeconds(new Date())
      else inside.lunchStart.value = trimSeconds(new Date())
    },
    onStop: (dayO: IDayItemProps) => {
      if (!inside.lunchStop.value)
        inside.lunchStop.value = trimSeconds(new Date())
      else inside._updateDayStop(dayO, trimSeconds(new Date()))
    },
    onStopExact: (dayO: IDayItemProps) =>
      inside._updateDayStop(dayO, inside.getEstimatedTime(dayO)),

    getLunchDiff: () => +inside.lunchStop.value! - +inside.lunchStart.value!,
    getDayTotal: () =>
      +inside.dayStop.value! - +inside.dayStart.value! - inside.getLunchDiff(),
    getEstimatedTime: (dayO: IDayItemProps) =>
      new Date(
        addHourMinute(inside.dayStart.value!, dayO.day.hour.planned) +
          inside.getLunchDiff(),
      ),

    _updateDayStop: (dayO: IDayItemProps, newDate: Date) => {
      inside.dayStop.value = newDate
      dayO.day.hour.confirmed = Time.toNumber(
        parseInt(inside.getDayTotal() / 900000 + '') * 0.25,
      )
    },
  } as IDayItemFunctions

  return inside
}

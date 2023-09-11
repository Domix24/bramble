import { ref } from 'vue'
import { IDayItemProps } from '../types'
import { Time } from '../functions'

export const dayStart = ref(undefined as undefined | Date)
export const dayStop = ref(undefined as undefined | Date)

export const lunchStart = ref(undefined as undefined | Date)
export const lunchStop = ref(undefined as undefined | Date)

export const onStart = () => {
  if (!dayStart.value) dayStart.value = trimSeconds(new Date())
  else lunchStart.value = trimSeconds(new Date())
}

export const onStop = (dayO: IDayItemProps) => {
  if (!lunchStop.value) lunchStop.value = trimSeconds(new Date())
  else _updateDayStop(dayO, trimSeconds(new Date()))
}

export const getLunchDiff = () => +lunchStop.value! - +lunchStart.value!
export const getDayTotal = () =>
  +dayStop.value! - +dayStart.value! - getLunchDiff()

export const onStopExact = (dayO: IDayItemProps) =>
  _updateDayStop(dayO, getEstimatedTime(dayO))

export const getEstimatedTime = (dayO: IDayItemProps) =>
  new Date(
    addHourMinute(dayStart.value!, dayO.day.hour.planned) + getLunchDiff(),
  )

export const trimSeconds = (date: Date) =>
  new Date(parseInt(+date / 60000 + '') * 60000)

export const addHourMinute = (date: Date, hour: number) =>
  +date + hour * 3600000

export const _updateDayStop = (dayO: IDayItemProps, newDate: Date) => {
  dayStop.value = newDate
  dayO.day.hour.confirmed = Time.toNumber(
    parseInt(getDayTotal() / 900000 + '') * 0.25,
  )
}

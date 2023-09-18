import { computed, ref } from 'vue'
import { IDay, IDayItemFunctions, IDayItemProps } from '../types'
import { Time } from '../functions'

export const trimSeconds = (date: Date) =>
  new Date(parseInt(+date / 60000 + '') * 60000)

export const addHourMinute = (date: Date, hour: number) =>
  +date + hour * 3600000

export const getDayTotal = (
  dayStart: Date,
  dayStop: Date,
  lunchStart: Date,
  lunchStop: Date,
) => +dayStop - +dayStart - getLunchDiff(lunchStart, lunchStop)

export const getLunchDiff = (lunchStart: Date, lunchStop: Date) =>
  +lunchStop - +lunchStart

export const getConfirmed = (
  dayStart: Date,
  dayStop: Date,
  lunchStart: Date,
  lunchStop: Date,
) =>
  Time.toNumber(
    parseInt(
      getDayTotal(dayStart, dayStop, lunchStart, lunchStop) / 900000 + '',
    ) * 0.25,
  )

export const main = (
  emits: {
    (event: 'update', day: IDay): void
    (event: 'update:day', day: IDay): void
  },
  props: IDayItemProps,
) => {
  const inside = {
    dayStart: ref(props.day.startDay),
    dayStop: ref(props.day.stopDay),

    lunchStart: ref(props.day.startLunch),
    lunchStop: ref(props.day.stopLunch),

    dayStartC: computed({
      get: () => inside.dayStart.value,
      set: (v) => {
        inside.dayStart.value = v
        inside._update()
        emits('update', props.day)
      },
    }),
    dayStopC: computed({
      get: () => inside.dayStop.value,
      set: (v) => {
        inside.dayStop.value = v
        inside._update()
        emits('update', props.day)
      },
    }),
    lunchStartC: computed({
      get: () => inside.lunchStart.value,
      set: (v) => {
        inside.lunchStart.value = v
        inside._update()
        emits('update', props.day)
      },
    }),
    lunchStopC: computed({
      get: () => inside.lunchStop.value,
      set: (v) => {
        inside.lunchStop.value = v
        inside._update()
        emits('update', props.day)
      },
    }),

    onStart: () => {
      if (!inside.dayStartC.value)
        inside.dayStartC.value = trimSeconds(new Date())
      else inside.lunchStartC.value = trimSeconds(new Date())
    },
    onStop: (dayO: IDayItemProps) => {
      if (!inside.lunchStopC.value)
        inside.lunchStopC.value = trimSeconds(new Date())
      else inside._updateDayStop(dayO, trimSeconds(new Date()))
    },
    onStopExact: (dayO: IDayItemProps) =>
      inside._updateDayStop(dayO, inside.getEstimatedTime(dayO)),

    getLunchDiff: () =>
      getLunchDiff(inside.lunchStartC.value!, inside.lunchStopC.value!),
    getDayTotal: () =>
      getDayTotal(
        inside.dayStartC.value!,
        inside.dayStopC.value!,
        inside.lunchStartC.value!,
        inside.lunchStopC.value!,
      ),
    getEstimatedTime: (dayO: IDayItemProps) =>
      new Date(
        addHourMinute(inside.dayStartC.value!, dayO.day.hour.planned) +
          inside.getLunchDiff(),
      ),

    _updateDayStop: (dayO: IDayItemProps, newDate: Date) => {
      inside.dayStopC.value = newDate
      dayO.day.hour.confirmed = getConfirmed(
        inside.dayStartC.value!,
        inside.dayStopC.value!,
        inside.lunchStartC.value!,
        inside.lunchStopC.value!,
      )
    },

    _update: () => {
      const day = props.day
      day.startDay = inside.dayStartC.value
      day.startLunch = inside.lunchStartC.value
      day.stopDay = inside.dayStopC.value
      day.stopLunch = inside.lunchStopC.value

      emits('update:day', day)
    },
  } as IDayItemFunctions

  return inside
}

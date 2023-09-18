import { Ref, WritableComputedRef } from 'vue'
import { IDayItemProps } from '.'

export interface IDayItemFunctions {
  dayStart: Ref<undefined | Date>
  dayStop: Ref<undefined | Date>

  lunchStart: Ref<undefined | Date>
  lunchStop: Ref<undefined | Date>

  dayStartC: WritableComputedRef<undefined | Date>
  dayStopC: WritableComputedRef<undefined | Date>

  lunchStartC: WritableComputedRef<undefined | Date>
  lunchStopC: WritableComputedRef<undefined | Date>

  onStart: () => void
  onStop: (dayO: IDayItemProps) => void
  onStopExact: (dayO: IDayItemProps) => void

  getLunchDiff: () => number
  getDayTotal: () => number
  getEstimatedTime: (dayO: IDayItemProps) => Date

  _updateDayStop: (dayO: IDayItemProps, newDate: Date) => void
  _update: () => void
}

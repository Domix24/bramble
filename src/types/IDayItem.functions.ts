import { Ref } from 'vue'
import { IDayItemEmits, IDayItemProps } from '.'

export interface IDayItemFunctions {
  dayStart: Ref<undefined | Date>
  dayStop: Ref<undefined | Date>

  lunchStart: Ref<undefined | Date>
  lunchStop: Ref<undefined | Date>

  onStart: () => void
  onStop: (dayO: IDayItemProps, emits?: IDayItemEmits) => void
  onStopExact: (dayO: IDayItemProps, emits?: IDayItemEmits) => void

  getLunchDiff: () => number
  getDayTotal: () => number
  getEstimatedTime: (dayO: IDayItemProps) => Date

  _updateDayStop: (
    dayO: IDayItemProps,
    newDate: Date,
    emits?: IDayItemEmits,
  ) => void
}

import { Ref, WritableComputedRef } from 'vue'
import { IDay } from '.'

export interface IWeekItemFunctions {
  days: Ref<IDay[]>
  hour: Ref<number>

  daysC: WritableComputedRef<IDay[]>
  hourC: WritableComputedRef<number>

  getHours: () => number
  getDifference: () => number
  getSign: () => '+' | '-'
  emitUpdate: () => void
}

import { Ref, WritableComputedRef, ComputedRef } from 'vue'
import { IDay } from '.'

export interface IWeekItemFunctions {
  days: Ref<IDay[]>
  hour: Ref<number>

  daysC: WritableComputedRef<IDay[]>
  hourC: WritableComputedRef<number>

  differenceRO: ComputedRef<number>

  getHours: () => number
  getDifference: () => number
  getDifferenceSigned: () => number
  getSign: () => '+' | '-'
  emitUpdate: () => void
  addEmptyDay: () => void
}

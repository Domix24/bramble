import { IDay } from '..'

export interface ICreateDayItemEmits {
  (event: 'close'): void
  (event: 'update:day', day: IDay): void
}

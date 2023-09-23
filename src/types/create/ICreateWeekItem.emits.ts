import { IWeek } from '..'

export interface ICreateWeekItemEmits {
  (event: 'close'): void
  (event: 'update:week', week: IWeek): void
}

import { IWeek } from '.'

export interface IWeekItemEmits {
  (event: 'update:week', week: IWeek): void
}

import { IDay, IWeek } from '.'

export interface IWeekItemEmits {
  (event: 'update:week', week: IWeek): void
  (event: 'update', week: IWeek): void
  (event: 'create', week: IWeek): void
  (event: 'update:day', week: IWeek, day: IDay, mode: boolean): void
}

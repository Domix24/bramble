import { IDay } from '.'

export interface IDayItemEmits {
  (event: 'update:day', day: IDay): void
  (event: 'update', day: IDay): void
}

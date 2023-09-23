import { IDay } from '.'

export interface IWeek {
  days: IDay[]
  hour: number
  id: number
  edit: {
    hour: string
    update: boolean
  }
}

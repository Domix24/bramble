import { IDay } from '.'

export interface IWeek {
  days: IDay[]
  hour: number
  edit: {
    hour: string
    update: boolean
    id: number
  }
}

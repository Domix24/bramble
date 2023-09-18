export interface IDay {
  name: string
  hour: {
    planned: number
    confirmed: number
  }
  edit: {
    hour: string
    id: number
    update: boolean
  }
  startDay: undefined | Date
  startLunch: undefined | Date
  stopDay: undefined | Date
  stopLunch: undefined | Date
}

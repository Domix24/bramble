export interface IDay {
  id: number
  name: string
  weekId: number
  hour: {
    planned: number
    confirmed: number
  }
  edit: {
    hour: string
    name: string
    update: boolean
  }
}

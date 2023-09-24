export interface IDay {
  id: number
  name: string
  weekId: number
  hour: {
    planned: number
    confirmed: number
  }
}

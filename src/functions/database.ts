import Dexie, { Table } from 'dexie'
import { IDexieDay, IDexieWeek } from '../types'

export class BrambleDatabase extends Dexie {
  days!: Table<IDexieDay, number>
  weeks!: Table<IDexieWeek, number>

  constructor() {
    super('bramble-database')

    this.version(1).stores({
      weeks: '++id',
      days: '++id',
    })
  }

  getWeeks() {
    return this.weeks.orderBy('id').toArray()
  }

  getWeek(weekId: number) {
    return this.weeks.get(weekId)
  }

  addWeek(week: IDexieWeek) {
    return this.weeks.add(week)
  }

  editWeek(week: IDexieWeek) {
    return this.weeks.put(week)
  }

  getDay(dayId: number) {
    return this.days.get(dayId)
  }

  addDay(day: IDexieDay) {
    return this.days.add(day)
  }
}

import Dexie from 'dexie'
import { IWeek } from '../types'

export class BrambleDatabase extends Dexie {
  constructor() {
    super('bramble-database')

    this.version(1).stores({
      weeks: '++id',
      days: '++id',
    })
  }
}

let database: BrambleDatabase | undefined = undefined

const getDatabase = () => {
  if (!database) database = new BrambleDatabase()
  return database
}

export const getWeeks = async () => {
  const _getWeeks = async () =>
    await getDatabase().table('weeks').orderBy('id').toArray()
  try {
    return await _getWeeks()
  } catch (error) {
    database = undefined
    return await _getWeeks()
  }
}

export const addWeek = async (week: IWeek) => {
  return await getDatabase().table('weeks').add({
    hour: week.hour,
    days: [],
  })
}

export const updateWeek = async (week: IWeek) => {
  return await getDatabase()
    .table('weeks')
    .put({
      id: week.edit.id,
      hour: week.hour,
      days: week.days.map((v, i) => ({
        id: i,
        hour: v.hour.planned,
        name: v.name,
        startDay: v.startDay ? v.startDay.valueOf() : 0,
        startLunch: v.startLunch ? v.startLunch.valueOf() : 0,
        stopDay: v.stopDay ? v.stopDay.valueOf() : 0,
        stopLunch: v.stopLunch ? v.stopLunch.valueOf() : 0,
      })),
    })
}

export const deleteWeeks = async () => {
  return await getDatabase().table('weeks').clear()
}

export const deleteAll = async () => {
  return await getDatabase().delete()
}

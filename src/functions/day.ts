import { Time } from '.'
import { IDay, IDexieDay } from '../types'

const DayManager = class {
  #day: IDay

  constructor(day: IDay) {
    this.#day = day
  }

  setId(newId: number) {
    this.#day.id = newId

    return this
  }

  setWeekId(newWeekId: number) {
    this.#day.weekId = newWeekId

    return this
  }

  setConfirmedHour(newConfirmedHour: number) {
    this.#day.hour.confirmed = newConfirmedHour

    return this
  }

  getDay() {
    return this.#day
  }

  getDexie() {
    return normalToDexie(this.#day)
  }
}

export const createDay = (name: string, hour: number | string) => {
  const dayObject: IDay = {
    hour: {
      confirmed: createHour(hour).confirmed,
      planned: createHour(hour).planned,
    },
    id: 0,
    name: name,
    weekId: 0,
  }

  return new DayManager(dayObject)
}

export const createHour = (planned: number | string) => {
  const object = {} as { planned: number; confirmed: number }
  object.planned = Time.toNumber(planned)

  return object
}

export const dexieToNormal: (day: IDexieDay) => IDay = (day: IDexieDay) => {
  return {
    hour: {
      confirmed: day.confirmedHour,
      planned: day.plannedHour,
    },
    id: day.id,
    name: day.name,
    weekId: day.weekId,
  }
}

export const normalToDexie: (day: IDay) => IDexieDay = (day: IDay) => {
  return {
    confirmedHour: day.hour.confirmed,
    id: day.id,
    name: day.name,
    plannedHour: day.hour.planned,
    weekId: day.weekId,
  }
}

let emptyDayManager: undefined | InstanceType<typeof DayManager>
export const getEmptyDayManager = () => {
  if (emptyDayManager) emptyDayManager = undefined
  emptyDayManager = createDay('', 0)
  return emptyDayManager
}

let emptyDay: undefined | IDay
export const getEmptyDay = () => {
  if (emptyDay) emptyDay = undefined
  emptyDay = getEmptyDayManager().getDay()
  return emptyDay
}

let emptyDexie: undefined | IDexieDay
export const getEmptyDexie = () => {
  if (emptyDexie) emptyDexie = undefined
  emptyDexie = getEmptyDayManager().getDexie()
  return emptyDexie
}

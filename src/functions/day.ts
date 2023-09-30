import { Display, Time } from '.'
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

  setUpdated() {
    this.#day.edit.update = true

    return this
  }

  setDayStart(newDayStart: Date) {
    this.#day.day.start = newDayStart

    return this
  }

  setDayStop(newDayStop: Date) {
    this.#day.day.stop = newDayStop

    return this
  }

  setLunchStart(newLunchStart: Date) {
    this.#day.lunch.start = newLunchStart

    return this
  }

  setLunchStop(newLunchStop: Date) {
    this.#day.lunch.stop = newLunchStop

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
  const dayObject: Omit<IDay, 'id'> = {
    day: {} as { start: Date; stop: Date },
    edit: {
      hour: Display.showHourMinute(createHour(hour).planned),
      name: name,
      update: false,
    },
    hour: {
      confirmed: createHour(hour).confirmed,
      planned: createHour(hour).planned,
    },
    lunch: {} as { start: Date; stop: Date },
    name: name,
    weekId: 0,
  }

  return new DayManager(dayObject as IDay)
}

export const createHour = (planned: number | string) => {
  const object = {} as { planned: number; confirmed: number }
  object.planned = Time.toNumber(planned)

  return object
}

export const dexieToNormal: (day: IDexieDay) => IDay = (day: IDexieDay) => {
  return {
    edit: {
      hour: Display.showHourMinute(day.plannedHour),
      name: day.name,
      update: false,
    },
    day: {
      start: new Date(day.dayStart),
      stop: new Date(day.dayStop),
    },
    hour: {
      confirmed: day.confirmedHour,
      planned: day.plannedHour,
    },
    id: day.id,
    lunch: {
      start: new Date(day.lunchStart),
      stop: new Date(day.lunchStop),
    },
    name: day.name,
    weekId: day.weekId,
  }
}

export const normalToDexie: (day: IDay) => IDexieDay = (day: IDay) => {
  return {
    confirmedHour: day.hour.confirmed,
    dayStart: day.day.start ? +day.day.start : 0,
    dayStop: day.day.stop ? +day.day.stop : 0,
    id: day.id,
    lunchStart: day.lunch?.start ? +day.lunch.start : 0,
    lunchStop: day.lunch?.stop ? +day.lunch.stop : 0,
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

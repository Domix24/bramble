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
    if (!this.#day.day) this.#day.day = {} as { stop: Date; start: Date }
    this.#day.day.start = newDayStart

    return this
  }

  setDayStop(newDayStop: Date) {
    if (!this.#day.day) this.#day.day = {} as { stop: Date; start: Date }
    this.#day.day.stop = newDayStop

    return this
  }

  setLunchStart(newLunchStart: Date) {
    if (!this.#day.lunch) this.#day.lunch = {} as { stop: Date; start: Date }
    this.#day.lunch.start = newLunchStart

    return this
  }

  setLunchStop(newLunchStop: Date) {
    if (!this.#day.lunch) this.#day.lunch = {} as { stop: Date; start: Date }
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
  const dayObject: Omit<IDay, 'day' | 'edit' | 'id' | 'lunch'> = {
    hour: createHour(hour),
    name: name,
    weekId: 0,
  }

  return new DayManager(dexieToNormal(normalToDexie(dayObject as IDay)))
}

export const createHour = (planned: number | string) => {
  const object = {} as { planned: number; confirmed: number }
  object.planned = Time.toNumber(planned)

  return object
}

export const dexieToNormal: (day: IDexieDay) => IDay = (day: IDexieDay) => {
  const inside = {
    normal: {} as IDay,
    isDay: () =>
      typeof day.dayStart !== 'undefined' || typeof day.dayStop !== 'undefined',
    isLunch: () =>
      typeof day.lunchStart !== 'undefined' ||
      typeof day.lunchStop !== 'undefined',
    getEdit: () => {
      const object = {} as { hour: string; name: string; update: boolean }
      object.hour = Display.showHourMinute(day.plannedHour)
      object.name = day.name
      object.update = false
      return object
    },
    getDay: () => {
      const object = {} as { stop: Date; start: Date }
      if (typeof day.dayStart !== 'undefined')
        object.start = new Date(day.dayStart)
      if (typeof day.dayStop !== 'undefined')
        object.stop = new Date(day.dayStop)
      return object
    },
    getHour: () => {
      const object = {} as { planned: number; confirmed: number }
      if (typeof day.confirmedHour !== 'undefined')
        object.confirmed = day.confirmedHour
      object.planned = day.plannedHour
      return object
    },
    getLunch: () => {
      const object = {} as { stop: Date; start: Date }
      if (typeof day.lunchStart !== 'undefined')
        object.start = new Date(day.lunchStart)
      if (typeof day.lunchStop !== 'undefined')
        object.stop = new Date(day.lunchStop)
      return object
    },
    get: () => {
      if (inside.isDay()) inside.normal.day = inside.getDay()
      inside.normal.edit = inside.getEdit()
      inside.normal.hour = inside.getHour()
      if (typeof day.id !== 'undefined') inside.normal.id = day.id
      if (inside.isLunch()) inside.normal.lunch = inside.getLunch()
      inside.normal.name = day.name
      inside.normal.weekId = day.weekId

      return inside.normal
    },
  }

  return inside.get()
}

export const normalToDexie: (day: IDay) => IDexieDay = (day: IDay) => {
  const inside = {
    dexie: {} as IDexieDay,
    get: () => {
      if (typeof day.hour.confirmed !== 'undefined')
        inside.dexie.confirmedHour = day.hour.confirmed
      if (
        typeof day.day !== 'undefined' &&
        typeof day.day.start !== 'undefined'
      )
        inside.dexie.dayStart = +day.day.start
      if (typeof day.day !== 'undefined' && typeof day.day.stop !== 'undefined')
        inside.dexie.dayStop = +day.day.stop
      if (typeof day.id !== 'undefined') inside.dexie.id = day.id
      if (
        typeof day.lunch !== 'undefined' &&
        typeof day.lunch.start !== 'undefined'
      )
        inside.dexie.lunchStart = +day.lunch.start
      if (
        typeof day.lunch !== 'undefined' &&
        typeof day.lunch.stop !== 'undefined'
      )
        inside.dexie.lunchStop = +day.lunch.stop
      inside.dexie.name = day.name
      inside.dexie.plannedHour = day.hour.planned
      inside.dexie.weekId = day.weekId

      return inside.dexie
    },
  }

  return inside.get()
}

export const resetDay = (day: IDay) => {
  const inside = {
    normal: {} as IDay,
    getEdit: () => ({
      name: Display.showHourMinute(day.hour.planned),
      hour: day.name,
      update: false,
    }),
    getHour: () => createHour(day.hour.planned),
    get: () => {
      inside.normal.edit = inside.getEdit()
      inside.normal.hour = inside.getHour()
      inside.normal.id = day.id
      inside.normal.name = day.name
      inside.normal.weekId = day.weekId

      return inside.normal
    },
  }

  return inside.get()
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

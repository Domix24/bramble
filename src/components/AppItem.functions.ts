import { onMounted, ref, watch } from 'vue'
import { Database, Day, Week } from '../functions'
import { IAppItemFunctions, IDexieWeek } from '../types'

const defaultWeek = Week.createWeek(0).getWeek()

export const editWeek = (
  database: Database.BrambleDatabase,
  week: IDexieWeek,
) => {
  database.editWeek(week)
}

export const main = (bypassMount?: boolean) => {
  const inside: IAppItemFunctions = {
    week: ref(defaultWeek),
    createdWeek: ref(undefined),
    createdDay: ref(undefined),
    db: new Database.BrambleDatabase(),
    editWeek: () => {
      inside.week.value.id = 1
      editWeek(inside.db, Week.normalToDexie(inside.week.value))
    },
    //
    doUpdateWeek: (week) => {
      inside.createdWeek.value = week
    },
    doCloseWeek: () => {
      if (inside.createdWeek.value && inside.createdWeek.value.edit.update) {
        inside.createdWeek.value.days = inside.week.value.days
        inside.week.value = inside.createdWeek.value
        inside.week.value.edit.update = false
      }
      inside.createdWeek.value = undefined
    },
    //
    doCreateDay: (week) => {
      inside.createdDay.value = Day.getEmptyDayManager()
        .setWeekId(week.id)
        .getDay()
    },
    doCloseDay: () => {
      if (inside.createdDay.value && inside.createdDay.value.edit.update)
        inside.db
          .editDay(Day.normalToDexie(inside.createdDay.value))
          .then(inside.doCloseDay0)
          .then(inside.doCloseDay1)
          .then(inside.doCloseDay2)
          .then(inside.doCloseDay3)
    },
    doCloseDay0: (id) => {
      inside.createdDay.value!.id = id
    },
    doCloseDay1: () => {
      return inside._updateWeek(inside.week.value, inside.createdDay.value!)
    },
    doCloseDay2: (week) => {
      inside.week.value = week
    },
    doCloseDay3: () => {
      inside.createdDay.value = undefined
    },
    //
    doUpdateDay: (_, day, mode) => {
      if (!mode) inside.createdDay.value = day
      else {
        inside.db
          .editDay(Day.normalToDexie(day))
          .then(() => inside._updateWeek(inside.week.value, day))
          .then(inside.doCloseDay2)
      }
    },
    //
    _updateWeek: (week, day) => {
      const newWeek = Week.createWeek(week.hour)
      newWeek.setId(week.id)

      let dayUpdated = false
      week.days.forEach((currentDay) => {
        dayUpdated = dayUpdated || day.id == currentDay.id
        if (day.id == currentDay.id) newWeek.addDay(day)
        else newWeek.addDay(currentDay)
      })
      if (!dayUpdated) newWeek.addDay(day)

      return newWeek.getWeek()
    },
    //
    _watch: () => {
      inside.editWeek()
    },
    _mount: () => {
      inside.db.getWeek(1).then((value) => {
        if (value) {
          const week = Week.dexieToNormal(value)
          Promise.all(value.days.map((day) => inside.db.getDay(day))).then(
            (days) => {
              week.days = days.map((day) => Day.dexieToNormal(day!))
              inside.week.value = week
            },
          )
        } else {
          inside.editWeek()
        }
      })
    },
    //
    seconds: ref(parseInt(import.meta.env.VITE_SECONDS_REFRESH_DEBUG) || 0),
    outputDays: ref([]),
    outputWeeks: ref([]),
    outputWeek: ref(undefined),
  }

  watch(inside.week.value, inside._watch)
  watch(inside.week, inside._watch)

  if (!bypassMount) {
    onMounted(inside._mount)
  }

  if (import.meta.env.VITE_SHOW_CUSTOM_DEBUG === 'X') {
    watch(inside.week.value, console.warn)
    watch(inside.week, console.warn)

    if (inside.seconds.value) {
      setInterval(async () => {
        inside.outputDays.value = await window.getDays()
        inside.outputWeek.value = await inside.db.getWeek(1)
        inside.outputWeeks.value = await window.getWeeks()
      }, inside.seconds.value * 1000)
    }
  }

  return inside
}

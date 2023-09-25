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
      if (
        inside.createdDay.value &&
        inside.createdDay.value.edit.update &&
        typeof inside.createdDay.value.id === 'undefined'
      ) {
        inside.db
          .addDay(Day.normalToDexie(inside.createdDay.value))
          .then((dayId) => {
            inside.createdDay.value!.id = dayId

            inside.week.value = ((currentWeek, newDay) => {
              const week = Week.createWeek(currentWeek.hour)
              week.setId(currentWeek.id)

              currentWeek.days.forEach((day) => {
                week.addDay(day)
              })
              week.addDay(newDay)

              return week.getWeek()
            })(inside.week.value, inside.createdDay.value!)
            inside.createdDay.value = undefined
          })
      }
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

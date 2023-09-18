import { onMounted, ref } from 'vue'
import { IWeek } from '../types'
import { Database, Day, Week } from '../functions'

type State = '' | 'week' | 'day'

const _createState = ref('' as State)

export const onCreateWeek = () => {
  _createState.value = 'week'
}

export const getCreateState = (createState?: State) => {
  if (createState && createState.length > 0)
    return _createState.value == createState
  return _createState.value.length > 0
}

export const removeState = () => {
  _createState.value = ''
}

export const main = () => {
  const inside = {
    day: ref(Day.createDay('', 0).getDay()),

    weeks: ref([] as IWeek[]),
    week: ref(Week.createWeek(0).getWeek()),

    getWeeks: () => {
      Database.getWeeks().then((value) => {
        inside.weeks.value = value.map(
          (v: {
            hour: number
            days: {
              id: number
              hour: number
              name: string
              startDay: number
              startLunch: number
              stopDay: number
              stopLunch: number
            }[]
            id: number
          }) => {
            const week = Week.createWeek(v.hour).setId(v.id)

            v.days.forEach((w) => {
              const day = Day.createDay(w.name, w.hour)

              if (w.startDay) day.setStartDay(w.startDay)
              if (w.startLunch) day.setStartLunch(w.startLunch)
              if (w.stopDay) day.setStopDay(w.stopDay)
              if (w.stopLunch) day.setStopLunch(w.stopLunch)

              week.addDayDirect(day.setConfirmed().getDay())
            })

            return week.getWeek()
          },
        )
        console.log(inside.weeks.value)
      })
    },

    closeWeek: () => {
      if (inside.week.value.edit.update) {
        Database.addWeek(inside.week.value).then(() => {
          inside.getWeeks()
          inside.week.value = Week.createWeek(0).getWeek()
        })
      }

      removeState()
    },

    closeDay: () => {
      if (inside.day.value.edit.update) {
        inside.week.value.days.push(inside.day.value)
        Database.updateWeek(inside.week.value).then(() => {
          inside.getWeeks()
          inside.week.value = Week.createWeek(0).getWeek()
          inside.day.value = Day.createDay('', 0).getDay()
        })
      }
      removeState()
    },

    onCreateDay: (week: IWeek) => {
      _createState.value = 'day'
      inside.week.value = week
    },

    onUpdateDay: (week: IWeek) => {
      Database.updateWeek(week).then(() => {
        inside.getWeeks()
      })
    },

    onDeleteDays: (week: IWeek) => {
      week.days.splice(0)
      Database.updateWeek(week).then(() => {
        inside.getWeeks()
      })
    },

    addWeekTest: () => {
      Database.addWeek(Week.createWeek(0).getWeek()).then(() => {
        inside.getWeeks()
      })
    },

    deleteWeeksTest: () => {
      Database.deleteWeeks().then(() => {
        inside.getWeeks()
      })
    },

    deleteAllTest: () => {
      Database.deleteAll().then(() => {
        inside.getWeeks()
      })
    },
  }

  onMounted(() => {
    inside.getWeeks()
  })

  return inside
}

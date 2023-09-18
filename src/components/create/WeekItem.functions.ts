import { ref } from 'vue'
import { IWeek } from '../../types'
import { Week } from '../../functions'

export const main = (
  emits: { (event: 'close'): void; (event: 'update:week', week: IWeek): void },
  props: { week: IWeek },
) => {
  const inside = {
    hour: ref(props.week.edit.hour),

    close: () => {
      emits('close')
    },

    update: () => {
      emits(
        'update:week',
        Week.createWeek(inside.hour.value).setUpdated().getWeek(),
      )
    },
  }

  return inside
}

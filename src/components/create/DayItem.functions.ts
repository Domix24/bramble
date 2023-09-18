import { ref } from 'vue'
import { IDay } from '../../types'
import { Day } from '../../functions'

export const main = (
  emits: { (event: 'close'): void; (event: 'update:day', day: IDay): void },
  props: { day: IDay },
) => {
  const inside = {
    hour: ref(props.day.edit.hour),
    name: ref(props.day.name),

    close: () => {
      emits('close')
    },

    update: () => {
      emits(
        'update:day',
        Day.createDay(inside.name.value, inside.hour.value)
          .setUpdated()
          .getDay(),
      )
    },
  }

  return inside
}

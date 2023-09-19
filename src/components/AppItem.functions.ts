import { ref } from 'vue'
import { Day, Week } from '../functions'
import { IAppItemFunctions } from '../types'

export const main = () => {
  const inside = {
    week: ref(
      Week.createWeek('7h')
        .addDay(Day.createDay('day1', '5h'))
        .addDay(Day.createDay('day2', '6h'))
        .getWeek(),
    ),
  } as IAppItemFunctions

  return inside
}

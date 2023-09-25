import { Ref } from 'vue'
import { IDay, IWeek } from '.'
import { Database } from '../functions'

export interface IAppItemFunctions {
  week: Ref<IWeek>
  createdWeek: Ref<undefined | IWeek>
  createdDay: Ref<undefined | IDay>
  db: Database.BrambleDatabase
  editWeek: () => void
  //
  doUpdateWeek: (week: IWeek) => void
  doCloseWeek: () => void
  //
  doCreateDay: (week: IWeek) => void
  doCloseDay: () => void
  //
  _watch: () => void
  _mount: () => void
}

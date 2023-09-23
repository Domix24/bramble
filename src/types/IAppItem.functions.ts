import { Ref } from 'vue'
import { IWeek } from '.'
import { Database } from '../functions'

export interface IAppItemFunctions {
  week: Ref<IWeek>
  createdWeek: Ref<undefined | IWeek>
  db: Database.BrambleDatabase
  editWeek: () => void
  //
  doUpdateWeek: (week: IWeek) => void
  doCloseWeek: () => void
  //
  _watch: () => void
  _mount: () => void
}

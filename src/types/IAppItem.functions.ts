import { Ref } from 'vue'
import { IDay, IDexieDay, IDexieWeek, IWeek } from '.'
import { Database } from '../functions'

export interface IAppItemFunctions {
  week: Ref<IWeek>
  createdWeek: Ref<undefined | IWeek>
  createdDay: Ref<undefined | IDay>
  db: Database.BrambleDatabase
  editWeek: () => void
  //
  doUpdateWeek: (week: IWeek, mode: boolean) => void
  doCloseWeek: () => void
  //
  doCreateDay: (week: IWeek) => void
  doCloseDay: () => void
  doCloseDay0: (id: number) => void
  doCloseDay1: () => IWeek
  doCloseDay2: (week: IWeek) => void
  doCloseDay3: () => void
  //
  doUpdateDay: (week: IWeek, day: IDay, mode: boolean) => void
  //
  _updateWeek: (week: IWeek, day: IDay) => IWeek
  //
  _watch: () => void
  _mount: () => void
  //
  seconds: Ref<number>
  outputDays: Ref<IDexieDay[]>
  outputWeeks: Ref<IDexieWeek[]>
  outputWeek: Ref<IDexieWeek | undefined>
}

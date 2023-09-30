export interface IDayItemFunctions {
  onStart: () => void
  onStop: () => void
  onStopExact: () => void

  getLunchDiff: () => number
  getDayTotal: () => number
  getEstimatedTime: () => Date

  _updateDayStop: (newDate: Date) => void
}

export interface IDayItemFunctions {
  onStart: () => void
  onStop: () => void
  onStopExact: () => void
  onStopComplete: () => void

  getLunchDiff: () => number
  getDayTotal: () => number
  getEstimatedTime: () => Date
  getCompleteTime: () => Date

  _updateDayStop: (newDate: Date) => void
}

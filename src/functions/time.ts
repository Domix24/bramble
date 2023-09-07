export const regexHour = /^([1-9][0-9]|[0-9])h?$/
export const regexHourMinute = /^([1-9][0-9]|[0-9])h(15|30|45)$/

export const checkHour = (string: string) => regexHour.test(string)
export const checkHourMinute = (string: string) => regexHourMinute.test(string)

export const getHour = (string: string) => parseInt(string.match(regexHour)![1])
export const getHourMinute = (string: string) =>
  parseInt(string.match(regexHourMinute)![1]) +
  parseInt(string.match(regexHourMinute)![2]) / 60

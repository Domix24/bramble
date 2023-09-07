export const showHourMinute = (number: number) => {
  const internalNumber = parseInt(number * 100 + '')
  const internalHour = parseInt(internalNumber / 100 + '')
  const internalMinute = parseInt((internalNumber % 100) * 0.6 + '')

  let text = `${internalHour}h`
  if (internalMinute) text += `${(internalMinute + '').padStart(2, '0')}`

  return text
}

export const showHourMinute = (number: number) => {
  const internalNumber = parseInt(number * 100 + '')
  const internalHour = parseInt(internalNumber / 100 + '')
  const internalMinute = parseInt((internalNumber % 100) * 0.6 + '')

  let text = `${internalHour}h`
  if (internalMinute) text += `${(internalMinute + '').padStart(2, '0')}`

  return text
}

export const showDate = (date: Date | undefined) =>
  date ? date.toLocaleTimeString([], { timeStyle: 'short' }) : ''

export const showMinuteFromOperation = (number: number) =>
  `${parseInt(number / 60000 + '')}m`

export const showHourMinuteFromOperation = (number: number) =>
  `${parseInt(number / 3600000 + '')}h${(
    (parseInt(number / 60000 + '') % 60) +
    ''
  ).padStart(2, '0')}m`

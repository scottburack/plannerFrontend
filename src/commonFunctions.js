
export const parseTime = (dateTime) => {
  let newDate = new Date(dateTime)
  // debugger
  let getHours
  if (newDate.getUTCHours() > 12) {
    getHours = newDate.getUTCHours() - 12
  } else if (newDate.getUTCHours() === 0) {
    getHours = newDate.getUTCHours() + 12
  } else {
    getHours = newDate.getUTCHours()
  }
  let getMinutes = String(newDate.getUTCMinutes())
  getMinutes === '0' ? getMinutes += '0' : getMinutes
  let newTime = getHours + ':' + getMinutes
  newDate.getUTCHours() >= 12 ? newTime += ' PM' : newTime += ' AM'
  return newTime
}

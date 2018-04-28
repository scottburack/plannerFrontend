import React from 'react'

const Event = (props) => {

  const parseTime = (dateTime) => {
    let newDate = new Date(dateTime)
    let getHours = newDate.getUTCHours() > 12 ? newDate.getUTCHours() - 12 : newDate.getUTCHours()
    let getMinutes = String(newDate.getUTCMinutes())
    getMinutes === '0' ? getMinutes += '0' : getMinutes
    let newTime = getHours + ':' + getMinutes
    newDate.getUTCHours() > 12 ? newTime += ' PM' : newTime += ' AM'
    return newTime


  }
  return (
    <li>Name: {props.event.name} |
        Start Date: {props.event.date_start} |
        End Date: {props.event.date_end} |
        Start Time: {props.event.time_start !== null ? parseTime(props.event.time_start) : 'No Time Given'} |
        End Time: {props.event.time_end !== null ? parseTime(props.event.time_end) : 'No Time Given'}  |
        Votes: {props.event.votes}
    </li>
  )
}

export default Event

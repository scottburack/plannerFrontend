import React from 'react'

const Event = (props) => {

  return (
    <li>Name: {props.event.name} |
        Start Date: {props.event.date_start} |
        End Date: {props.event.date_end} |
        Start Time: {props.event.time_start !== null ? new Date(props.event.time_start).getUTCHours() : 'No Time Given'} | 
        End Time: {props.event.time_end} |
        Votes: {props.event.votes}
    </li>
  )
}

export default Event

import React from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux'
require('react-big-calendar/lib/css/react-big-calendar.css')
require('../index.css')



BigCalendar.momentLocalizer(moment)

class GroupCalendar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      events: this.props.eventsToShow
    }
  }

  render() {
    console.log(this.state);
    return (
      <div style={ {height: '50vh', margin: '10px'}}>
        <BigCalendar
          events= {this.state.events}
          startAccessor={this.props.dateStart}
          endAccessor={this.props.dateEnd}
        />
      </div>
    )
  }
}

export default GroupCalendar

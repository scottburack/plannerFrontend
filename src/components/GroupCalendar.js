import React from 'react'
import Moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { parseTime } from '../commonFunctions'
require('react-big-calendar/lib/css/react-big-calendar.css')
require('../index.css')



BigCalendar.momentLocalizer(Moment)

class GroupCalendar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [],
      handleEventClicked: false,
      clickedEventTimeStart: '',
      clickedEventTimeEnd: '',
      clickedEventVotes: '',
      clickedEventName: ''
    }
  }

  componentDidMount = () => {
    let now = new Date(Date.now())
    let today = Moment(now, "MM-DD-YYYY").format().split('T')[0]
    if (this.props.events) {
      let events = this.props.events.filter(event => {
        return event.group_id === this.props.groupId && today <= event.date_end
      })
      this.setState({events: events})
    }
  }

  renderEvents = () => {
    return this.state.events.map(event => {
      return {
        end: Moment(event.date_end).toDate(),
        start: Moment(event.date_start).toDate(),
        title: event.name,
        votes: event.votes,
        timeStart: event.time_start,
        timeEnd: event.time_end,
        eventId: event.id
      }
    })
  }

  handleCancel = (event) => {
    // event.preventDefault()
    this.setState({
      handleEventClicked: false,
      clickedEventTimeStart: '',
      clickedEventTimeEnd: '',
      clickedEventVotes: '',
      clickedEventName: ''
    });
  }

  eventInfo = () => {
    return (
      <div>
      {this.state.clickedEventName}: <span> </span>
      {parseTime(this.state.clickedEventTimeStart)} - {parseTime(this.state.clickedEventTimeEnd)}
      <br/>Votes: {this.state.clickedEventVotes}
      </div>
    )
  }

  handleEventCalenderClick = (event) => {
    // alert(`${this.parseTime(event.timeStart)} - ${this.parseTime(event.timeEnd)} \n Votes: ${event.votes}`)
    this.setState({
      handleEventClicked: true,
      clickedEventTimeStart: event.timeStart,
      clickedEventTimeEnd: event.timeEnd,
      clickedEventVotes: event.votes,
      clickedEventName: event.title
    })

  }

  render() {

    return (
      <div style={ {height: '50vh', width: '100vh', margin: '10px'}}>
        <BigCalendar
          events= {this.renderEvents()}
          onSelectEvent= {(e) => this.handleEventCalenderClick(e)}
          // start='start_date'
          // end='end_date'
        />
        <Modal title="Event Details"
        visible={this.state.handleEventClicked}
        onOk={this.handleCancel}
        onCancel={this.handleCancel}
        >
        {this.eventInfo()}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 return {...state.usersReducer}
}

export default connect(mapStateToProps)(GroupCalendar)

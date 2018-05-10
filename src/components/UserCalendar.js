import React from 'react'
import Moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux'
import { parseTime } from '../commonFunctions'
import { Modal } from 'antd'
require('react-big-calendar/lib/css/react-big-calendar.css')
require('../index.css')



BigCalendar.momentLocalizer(Moment)

class UserCalendar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [],
      handleEventClicked: false,
      clickedEventTimeStart: '',
      clickedEventTimeEnd: '',
      clickedEventVotes: '',
      clickedEventName: '',
      clickedEventGroup: ''
    }
  }

  componentDidMount = () => {
    let now = new Date(Date.now())
    let today = Moment(now, "MM-DD-YYYY").format().split('T')[0]
    if (this.props.events) {
      this.setState({events: this.props.events})
    }
  }

  renderEvents = () => {
    return this.state.events.map(event => {
      let foundGroup = this.props.groups.find(group => event.group_id === group.id)
      return {
        end: Moment(event.date_end).toDate(),
        start: Moment(event.date_start).toDate(),
        title: event.name,
        votes: event.votes,
        timeStart: event.time_start,
        timeEnd: event.time_end,
        groupName: foundGroup.name
      }
    })
  }

  parseTime = (dateTime) => {
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

  handleCancel = (event) => {
    // event.preventDefault()
    this.setState({
      handleEventClicked: false,
      clickedEventTimeStart: '',
      clickedEventTimeEnd: '',
      clickedEventVotes: '',
      clickedEventName: '',
      clickedEventGroup: ''
    });
  }

  eventInfo = () => {
    console.log(this.state.clickedEventTimeStart);
    return (
      <div>
      {this.state.clickedEventGroup} <br/>
      {this.state.clickedEventName}: <span> </span>
      {this.parseTime(this.state.clickedEventTimeStart)} - {this.parseTime(this.state.clickedEventTimeEnd)}
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
      clickedEventName: event.title,
      clickedEventGroup: event.groupName
    })

  }

  render() {

    return (
      <div>
        <div style={ {height: '50vh', width: '100vh', margin: '10px'}}>
          <BigCalendar
            events= {this.renderEvents()}
            onSelectEvent= {(e) => this.handleEventCalenderClick(e)}
          />
        </div>
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

export default connect(mapStateToProps)(UserCalendar)

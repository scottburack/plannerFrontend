import React from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import JournalEvent from './JournalEvent'
import { Card } from 'antd';

class Journal extends React.Component {

  renderEvents = () => {
    const now = new Date(Date.now())
    const today = Moment(now, "MM-DD-YYYY").format().split('T')[0]
    let pastEvents = this.props.events.filter(event => {
      return today > event.date_end
    })

    return pastEvents.map(event => {
      return <JournalEvent key={event.id} event={event} />
    })
  }

  render() {
    console.log(this.props.events);
    return (
      <div>
        {this.props.events ? this.renderEvents() : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default connect(mapStateToProps)(Journal)

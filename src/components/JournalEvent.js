import React from 'react'
import * as actions from '../actions/event'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, Input, Button } from 'antd';
const { TextArea } = Input;

class JournalEvent extends React.Component {

  state = {
    journalEntry: ''
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

  handleJournalChange = (event) => {
    event.preventDefault()
    this.setState({
      journalEntry: event.target.value
    })
  }

  handleAddEntry = (event) => {
    actions.addJournalEntry(this.state.journalEntry, this.props.event.id)
    this.setState({
      journalEntry: ''
    })
  }

  render() {
    return (
      <div className='events'>
        <Card className='journal-entries' title={this.props.event.name} bordered={false} style={{ width: 300 }}>
          <p>Start Date: {this.props.event.date_start}</p>
          <p>End Date: {this.props.event.date_end}</p>
          <p>Start Time: {this.props.event.time_start !== null ? this.parseTime(this.props.event.time_start) : 'No Time Given'}</p>
          <p>End Time: {this.props.event.time_end !== null ? this.parseTime(this.props.event.time_end) : 'No Time Given'}</p>
          <p> Journal Entry: {this.props.event.journal_entry}</p>
          <TextArea placeholder="Journal Entry" autosize value={this.state.journalEntry} onChange={this.handleJournalChange}/>
          <Button onClick={(e) => this.handleAddEntry(e)}>Add Entry</Button>
        </Card>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default connect(mapDispatchToProps)(JournalEvent)

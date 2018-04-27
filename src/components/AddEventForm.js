import React from 'react'
import { connect } from 'react-redux'

class AddEventForm extends React.Component {

  state = {
    name: '',
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
    votes: 0
  }

  render() {
    return (
      <div>
        <form>
          <label>Event Name: </label>
          <input type='text' name='dateEnd' value={this.state.name} onChange={() => this.handleChange()} />
          <label>Start Date: </label>
          <input type='date' name='dateStart' value={this.state.dateStart} onChange={() => this.handleChange}
        </form>
      </div>
    )
  }
}

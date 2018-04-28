import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions/event'

class AddEventForm extends React.Component {

  state = {
    name: '',
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
    votes: 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    },() => console.log(this.state))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addEvent(
      this.props.groupId,
      this.state.name,
      this.state.dateStart,
      this.state.dateEnd,
      this.state.timeStart,
      this.state.timeEnd,
      this.state.votes
    )
    this.setState({
      name: '',
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: ''
    })
  }



  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Event Name: </label>
          <input type='text' name='name' value={this.state.name} onChange={(event) => this.handleChange(event)} />
          <label>Start Date: </label>
          <input type='date' name='dateStart' value={this.state.dateStart} onChange={(event) => this.handleChange(event)} />
          <label>End Date: </label>
          <input type='date' name='dateEnd' value={this.state.dateEnd} onChange={(event) => this.handleChange(event)} />
          <label>Start Time: </label>
          <input type='time' name='timeStart' value={this.state.timeStart} onChange={(event) => this.handleChange(event)} />
          <label>End Time: </label>
          <input type='time' name='timeEnd' value={this.state.timeEnd} onChange={(event) => this.handleChange(event)} />

          <input type='submit' value='Add Event'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default connect(mapStateToProps, {addEvent})(AddEventForm)

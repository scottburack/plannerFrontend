import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Input, Form} from 'antd'
import * as actions from '../actions/group'

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
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.actions.addEvent(
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

    this.props.actions.resetYelpResults()
  }



  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <label>Event Name: </label>
          <Input required type='text' name='name' value={this.state.name} onChange={(event) => this.handleChange(event)} />
          <label>Start Date: </label>
          <Input required type='date' name='dateStart' value={this.state.dateStart} onChange={(event) => this.handleChange(event)} />
          <label>End Date: </label>
          <Input required type='date' name='dateEnd' value={this.state.dateEnd} onChange={(event) => this.handleChange(event)} />
          <label>Start Time: </label>
          <Input type='time' name='timeStart' value={this.state.timeStart} onChange={(event) => this.handleChange(event)} />
          <label>End Time: </label>
          <Input type='time' name='timeEnd' value={this.state.timeEnd} onChange={(event) => this.handleChange(event)} />
          <br/>
          <Input type='submit' value='Add Event'/>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm)

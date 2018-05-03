import React from 'react'
import { connect } from 'react-redux'
import { addEvent, passYelpFormValues } from '../actions/event'
import {Input, Form, Radio} from 'antd'

const RadioGroup = Radio.Group;

class AddYelpEventForm extends React.Component {

  state = {
    name: '',
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
    votes: 0,
    eventUrl: '',
    radioValue: '',
    city: '',
    state: '',
    country: '',
    locationName: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRadioChange = (event) => {
    console.log('radio checked', event.target.value);
    this.setState({
      radioValue: event.target.value,
    });
  }

  handleYelpSubmit = (event) => {
    event.preventDefault()
    console.log(this.state);
    this.props.passYelpFormValues(
      this.state.city,
      this.state.state,
      this.state.country,
      this.state.radioValue,
      this.state.locationName
    )
    this.setState({
      city: '',
      state: '',
      country: '',
      radioValue: '',
      locationName: ''
    })
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
      this.state.votes,
      this.eventUrl
    )
    this.setState({
      name: '',
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      eventUrl: ''
    })
  }



  render() {
    console.log(this.state);
    return (
      <div>
        <Form onSubmit={this.handleYelpSubmit}>

          <label>City: </label>
          <Input onChange={this.handleChange} id="city-input" type="text" name="city" value={this.state.city}/>

          <label>State (if necessary): </label>
          <Input onChange={this.handleChange} id="state-input" type="text" name="state" value={this.state.state}/>

          <label>Country: </label>
          <Input onChange={this.handleChange} id="country-input" type="text" name="country" value={this.state.country}/>

          <label>Category: </label>
          <div id='radio-buttons'>
          <RadioGroup onChange={this.handleRadioChange} radioValue={this.state.radioValue}>
            <Radio type='radio' name="category" value='bars'>Bars</Radio>
            <Radio type='radio' name="category" value='restaurants'>Restaurant</Radio>
            <Radio type='radio' name="category" value='museums'>Museum</Radio>
            <Radio type='radio' name="category" value='parks'>Parks</Radio>
            <Radio type='radio' name="category" value='landmarks'>Landmarks</Radio>
          </RadioGroup>
          </div>

          <label>Know the name? </label>
          <Input onChange={this.handleChange} type='text' name="locationName" value={this.state.locationName} />
        <br></br>
            <Input type="submit" value="Lets Go!" />
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default connect(mapStateToProps, {addEvent, passYelpFormValues})(AddYelpEventForm)

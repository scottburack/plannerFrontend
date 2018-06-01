import React from 'react'
import { connect } from 'react-redux'
import { addEvent, passYelpFormValues } from '../actions/event'
import {Input, Form, Radio} from 'antd'

const RadioGroup = Radio.Group;

class AddYelpEventForm extends React.Component {

  state = {
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
    this.setState({
      radioValue: event.target.value,
    });
  }

  handleYelpSubmit = (event) => {
    // event.preventDefault()
    console.log('hit submit form');
    let yelpResults = this.props.passYelpFormValues(
      this.state.city,
      this.state.state,
      this.state.country,
      this.state.radioValue,
      this.state.locationName
    )

    this.setState({
      radioValue: '',
      city: '',
      state: '',
      country: '',
      locationName: ''
    })


  }

  handleOnCLick = (event) => {
    this.props.handleYelpCancel(event)
    this.handleYelpSubmit(event)
    this.props.yelpFormSubmitted(event)
  }



  render() {

    return (
      <div>
        <Form onSubmit={this.handleYelpSubmit}>

          <label>City: </label>
          <Input required onChange={this.handleChange} id="city-input" type="text" name="city" value={this.state.city}/>

          <label>State (if necessary): </label>
          <Input onChange={this.handleChange} id="state-input" type="text" name="state" value={this.state.state}/>

          <label>Country: </label>
          <Input required onChange={this.handleChange} id="country-input" type="text" name="country" value={this.state.country}/>

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
            <Input type="submit" value="Lets Go!" onClick={(event) => this.handleOnCLick(event)} />
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default connect(mapStateToProps, {addEvent, passYelpFormValues})(AddYelpEventForm)

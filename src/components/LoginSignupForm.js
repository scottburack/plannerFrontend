import React from 'react'
import { connect } from 'react-redux'
import { signInUser, signUpUser } from '../actions/user'
// import { Form, Divider, Header, Container } from 'semantic-ui-react'
import TextField from 'material-ui/TextField';

class LoginSignupForm extends React.Component {

  state = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: '',
    newUsername: '',
    newPassword: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    this.props.signInUser(this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
  }

  handleSignUpSubmit = (event) => {
    event.preventDefault()
    this.props.signUpUser(
      this.state.newUsername,
      this.state.newPassword,
      this.state.firstName,
      this.state.lastName
    )
    this.setState({
      firstName: '',
      lastName: '',
      newUsername: '',
      newPassword: '',
      reEnterPassword: ''
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to Planner</h1>

        <h3>Log In!</h3>
        <form onSubmit={this.handleLoginSubmit}>
          <label>Username: </label>
          <input type='text' name='username' value={this.state.username} onChange={(event) => this.handleChange(event)}/>

          <label>Password: </label>
          <input type='password' name='password' value={this.state.password} onChange={(event) => this.handleChange(event)}/>

          <input type='submit'/>
        </form>

        <h3>Sign Up!</h3>
        <form onSubmit={this.handleSignUpSubmit}>
          <label>Username: </label>
          <input type='text' name='newUsername' value={this.state.newUsername} onChange={(event) => this.handleChange(event)}/>

          <label>First Name: </label>
          <input type='text' name='firstName' value={this.state.firstName} onChange={(event) => this.handleChange(event)}/>

          <label>Last Name: </label>
          <input type='text' name='lastName' value={this.state.lastName} onChange={(event) => this.handleChange(event)}/>

          <label>Password: </label>
          <input type='password' name='newPassword' value={this.state.newPassword} onChange={(event) => this.handleChange(event)}/>

          <label>Re-Enter Password: </label>
          <input type='password' name='reEnterPassword' value={this.state.reEnterPassword} onChange={(event) => this.handleChange(event)}/>

          <input type='submit'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.usersReducer
  }
}

export default connect(mapStateToProps, { signInUser, signUpUser })(LoginSignupForm)

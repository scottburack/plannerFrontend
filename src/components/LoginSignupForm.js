import React from 'react'
import { connect } from 'react-redux'
import '../App.css'
import { signInUser, signUpUser } from '../actions/user'
import { Form, Icon, Input, Button, Checkbox, Layout, Card } from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;


class LoginSignupForm extends React.Component {

  state = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: '',
    newUsername: '',
    newPassword: '',
    // signUpClick: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignUpClick = () => {
    this.setState({
      signUpClick: true
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
      <div id= 'login-signup-form'>
      <Layout>
        <Header>
          <marquee><h1 style={{color: 'white'}}>Welcome to Planner</h1></marquee>
        </Header>
        <Content>
          <div id='login-form'>
          <Card title='Log In!' style={{ width: 300 }} className='signin-form'>
          <form onSubmit={this.handleLoginSubmit} className="login-form">
            <FormItem>
              <label>Username: </label>
              <p><Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type='text' name='username' value={this.state.username} onChange={(event) => this.handleChange(event)}/></p>
            </FormItem>
            <FormItem>
              <label>Password: </label>
              <p><Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' name='password' value={this.state.password} onChange={(event) => this.handleChange(event)}/></p>
            </FormItem>
            <Input type='submit'/>
          </form>
          </Card>
          </div>
          {/*<Button onClick={() => this.handleSignUpClick()}>Create An Account!</Button>*/}


          <div id='signup-form'>
          <Card title='Sign Up!' style={{ width: 300 }} className='signin-form'>
          <form onSubmit={this.handleSignUpSubmit}>
            <label>Username: </label>
            <p><Input type='text' name='newUsername' value={this.state.newUsername} onChange={(event) => this.handleChange(event)}/></p>

            <label>First Name: </label>
            <p><Input type='text' name='firstName' value={this.state.firstName} onChange={(event) => this.handleChange(event)}/></p>

            <label>Last Name: </label>
            <p><Input type='text' name='lastName' value={this.state.lastName} onChange={(event) => this.handleChange(event)}/></p>

            <label>Password: </label>
            <p><Input type='password' name='newPassword' value={this.state.newPassword} onChange={(event) => this.handleChange(event)}/></p>

            <label>Re-Enter Password: </label>
            <p><Input type='password' name='reEnterPassword' value={this.state.reEnterPassword} onChange={(event) => this.handleChange(event)}/></p>

            <Input type='submit'/>
          </form>
          </Card>
          </div>

        </Content>
        <Footer>
          <p>Created by <a href='https://www.linkedin.com/in/scottburack/' target="_blank">Scott Burack</a></p>
        </Footer>
      </Layout>
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

import React, { Component } from 'react';
import LoginSignupForm from './components/LoginSignupForm'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logOutUser, loginUser } from './actions/user'
import authorize from './authorize'
import UserDashboard from './containers/UserDashboard'


class App extends Component {

  componentDidMount() {
    // console.log(localStorage.getItem('jwt'))
    if (localStorage.getItem('jwt')) {
      this.props.getCurrentUser()
    }
  }


  render() {
    const AuthLoginForm = authorize(LoginSignupForm)
    const AuthUserDashboard = authorize(UserDashboard)
    console.log(this.props);

    return (
      <div className="App">
        <Route exact path="/" render={(props) => <AuthLoginForm {...props} />} />
        <Route exact path='/userdashboard' component={AuthUserDashboard} />
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer }) => ({
  usersReducer
})

export default withRouter(
  connect(mapStateToProps, {
    getCurrentUser,
    logOutUser,
    loginUser
  })(App)
)

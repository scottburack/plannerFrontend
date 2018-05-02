import React, { Component } from 'react';
import LoginSignupForm from './components/LoginSignupForm'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logOutUser, loginUser } from './actions/user'
import authorize from './authorize'
import UserDashboard from './containers/UserDashboard'
import GroupDashboard from './containers/GroupDashboard'


class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.props.getCurrentUser()
    }
  }


  render() {
    const AuthLoginForm = authorize(LoginSignupForm)
    const AuthUserDashboard = authorize(UserDashboard)
    const AuthGroupDashboard = authorize(GroupDashboard)
    console.log(this.props);

    return (
      <div className="App">
        <div id="homepage">
          <Route exact path="/" render={(props) => <AuthLoginForm {...props} />}/>
        </div>
        <Route exact path="/userdashboard" component={AuthUserDashboard} />
        <Route exact path="/groupdashboard/:id" component={AuthGroupDashboard} />
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

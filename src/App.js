import React, { Component } from 'react';
import LoginSignupForm from './components/LoginSignupForm'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logOutUser, loginUser } from './actions/user'

class App extends Component {


  render() {
    return (
      <div className="App">
        <LoginSignupForm />
      </div>
    );
  }
}

export default App;

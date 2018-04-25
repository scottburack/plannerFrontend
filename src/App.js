import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { login } from './services/plannerapi'

class App extends Component {

  componentDidMount() {
    login({username: 'scott', password: 'pebbles123'})
      .then(user => console.log(user))
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

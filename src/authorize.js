import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const authorize = RenderedComponent => {
  return class extends React.Component {

    loggedIn = () => {
      return !!localStorage.getItem('jwt')
    }


    render() {
      console.log(this.props);
      const { pathname } = this.props.location

      if ((this.loggedIn() && pathname === "/") || (this.loggedIn() && pathname === "/userdashboard/undefined")) {
        return <Redirect to='/userdashboard' />

      } else if (!this.loggedIn() && pathname !== "/") {
          return <Redirect to='/' />

      } else {
        // debugger
        return <RenderedComponent pathname={pathname}/>
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default authorize

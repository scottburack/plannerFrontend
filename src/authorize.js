import React from 'react'
import { Redirect } from 'react-router-dom'

const authorize = RenderedComponent => {
  return class extends React.Component {

    loggedIn = () => {
      return !!localStorage.getItem('jwt')
    }

    render() {
      const { pathname } = this.props.location

      if (this.loggedIn() && pathname === "/") {
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

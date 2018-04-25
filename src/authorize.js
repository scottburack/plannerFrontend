import React from 'react'
import { Redirect } from 'react-router-dom'

const authorize = RenderedComponent => {
  return class extends React.Component {
    render() {
      console.log(this.props)
      if (localStorage.getItem("jwt") && this.props.location.pathname === "/login") {
        return <Redirect to='/' />

      } else if (!localStorage.getItem('jwt') && this.props.location.pathname !== "/login") {
          return <Redirect to='/login' />

      } else {
        return <RenderedComponent/>
      }
    }
  }
}

export default authorize

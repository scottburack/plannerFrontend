import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser, getUsers, logOutUser } from '../actions/user'
import AddGroupForm from '../components/AddGroupForm'

class UserDashboard extends React.Component {

  handleLogout = () => {
    this.props.logOutUser()
  }

  render() {

    return (
      <div>
        <h1>Hello {this.props.firstName} {this.props.lastName}</h1>
        <button onClick={this.handleLogout}>Logout</button>
        <h3>Journal</h3>
        <h3>Groups</h3>
        <AddGroupForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
     username: state.usersReducer.username,
     firstName: state.usersReducer.firstName,
     lastName: state.usersReducer.lastName
   })
}

export default connect(mapStateToProps, {logOutUser})(UserDashboard)

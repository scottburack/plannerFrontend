import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUser, getUsers, logOutUser } from '../actions/user'
import AddGroupForm from '../components/AddGroupForm'
import Group from '../components/Group'



class UserDashboard extends React.Component {

  handleLogout = () => {
    this.props.logOutUser()
  }

  // componentDidMount = () => {
  //   this.props.getUserGroups(this.props.username)
  // }

  renderGroups = () => {
    console.log("render groups triggered");
    return this.props.groups.map(group => {
      return <Group key={group.id} group={group} />
    })
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Hello {this.props.firstName} {this.props.lastName}</h1>
        <button onClick={this.handleLogout}>Logout</button>
        <h3>Journal</h3>
        <h3>Groups</h3>
        <ul>
          { this.props.groups !== undefined ? this.renderGroups() : null}
        </ul>
        <AddGroupForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}



export default connect(mapStateToProps, {logOutUser})(UserDashboard)

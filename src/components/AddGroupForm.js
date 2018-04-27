import React from 'react'
import { connect } from 'react-redux'
import { addGroup } from '../actions/group'
import { addGroupUserRelation } from '../actions/groupUser'
import { getCurrentUser } from '../actions/user'

class AddGroupForm extends React.Component {

  state = {
    name: '',
    link_url: ''
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addGroup(
      this.props.userId,
      this.state.name,
      this.state.link_url
    )
    this.setState({
      name: '',
      link_url: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Add Group: </label>
          <input type='text' value={this.state.name} onChange={(event) => this.handleChange(event)}/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default connect(mapStateToProps, { addGroup })(AddGroupForm)

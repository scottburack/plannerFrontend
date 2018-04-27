import React from 'react'
import { connect } from 'react-redux'
import { addGroup } from '../actions/group'


class AddGroupForm extends React.Component {

  state = {
    name: '',
    link_url: 'localhost:3001/groupdashboard/',
    newNumberOfGroups: null
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/groups', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }).then(resp => resp.json())
      .then(json => this.setState({newNumberOfGroups: json.length + 1}))
      .then(() => this.addToApi())
  }

  addToApi = () => {
    let numString = String(this.state.newNumberOfGroups)
    let linkURL = this.state.link_url + numString
    console.log(linkURL)
    this.props.addGroup(
      this.props.userId,
      this.state.name,
      linkURL
    )
    this.setState({
      name: '',
      link_url: '',
      newNumberOfGroups: null
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

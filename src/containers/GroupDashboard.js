import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddEventForm from '../components/AddEventForm'
import Event from '../components/Event'
import { getCurrentUser } from '../actions/user'
import * as actions from '../actions/group'
import AddFriendSearchBar from '../components/AddFriendSearchBar'
import Friend from '../components/Friend'

class GroupDashboard extends React.Component {

  state = {
    addEventButtonClicked: false,
    addFriendButtonClicked: false,
    groupId: parseInt(this.props.pathname.split('/')[2]),
    friendSearch: '',
    queryFriends: []
  }

  componentDidMount = () => {

    if (this.props.friends.length === 0) {
      console.log('In group mount');
      this.props.actions.getFriends(this.state.groupId);
    }

    fetch("http://localhost:3000/api/v1/users").then(resp => resp.json()).then(json => this.setState({queryFriends: json}))
  }

  handleClick = (event) => {
    this.setState({
      [event.target.name]: true
    })
  }

  renderEvents = () => {
    const events = this.props.events.filter(event => {
      return event.group_id === this.state.groupId
    })
    return events.map(event => {
      return <Event key={event.id} event={event} />
    })
  }

  renderFriends = () => {
    return this.props.friends.map(friend => {
      return <li>{friend.username}</li>
    })
  }

  handleFriendSearchChange = (event) => {
    event.preventDefault()
    this.setState({
      friendSearch: event.target.value
    })
  }

  renderForFriendSearch = () => {
    const filteredFriends = this.state.queryFriends.filter(user => {
      return user.username.toUpperCase().includes(this.state.friendSearch.toUpperCase())
    })
    // debugger
    return filteredFriends.map(friend => <a href="#" id={friend.id} onClick={() => {this.handleAddFriendClick(friend.id)}}><br/>{friend.username}</a>)
  }

  handleAddFriendClick = (userId) => {
    this.props.actions.addUserToGroup(this.state.groupId, userId)
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    return (
      <div>
        <h1>Group Dashboard</h1>
        <h3>Friends!</h3>
        <ul>
          { this.props.friends.length > 0 ? this.renderFriends() : null}
        </ul>

        {this.state.addFriendButtonClicked ? <AddFriendSearchBar friendSearch={this.state.friendSearch} handleChange={this.handleFriendSearchChange} /> : null}
        {this.state.addFriendButtonClicked && this.state.friendSearch !== '' ? this.renderForFriendSearch() : null}
        <button name='addFriendButtonClicked' onClick={this.handleClick}>Add Friend!</button>

        <h3>Events!</h3>
        <ul>
          { this.props.events ? this.renderEvents() : null }
        </ul>
        {this.state.addEventButtonClicked ? <AddEventForm groupId={this.state.groupId}/> : null}
        <button name='addEventButtonClicked' onClick={this.handleClick}>Add Event!</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
 return {...state.usersReducer}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDashboard)

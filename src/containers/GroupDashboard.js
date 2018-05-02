import React from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddEventForm from '../components/AddEventForm'
import Event from '../components/Event'
import { getCurrentUser } from '../actions/user'
import * as actions from '../actions/group'
import AddFriendSearchBar from '../components/AddFriendSearchBar'
import Friend from '../components/Friend'
import GroupCalendar from '../components/GroupCalendar'

class GroupDashboard extends React.Component {

  state = {
    addEventButtonClicked: false,
    addFriendButtonClicked: false,
    groupId: parseInt(this.props.pathname.split('/')[2]),
    friendSearch: '',
    queryFriends: [],
    eventsToShow: []
  }

  componentDidMount = () => {

    if (this.props.friends.length === 0) {
      console.log('In group mount');
      this.props.actions.getFriends(this.state.groupId);
    }
    window.onpopstate = this.onBackButtonEvent;
    fetch("http://localhost:3000/api/v1/users").then(resp => resp.json()).then(json => this.setState({queryFriends: json}))
  }

  handleClick = (event) => {
    this.setState({
      [event.target.name]: true
    })
  }

  onBackButtonEvent = () => {
    this.props.actions.resetFriends()
  }

  renderEvents = () => {
    let now = new Date(Date.now())
    let today = Moment(now, "MM-DD-YYYY").format().split('T')[0]
    let time = Moment(now, "hh:mm:ss a").format()
    const events = this.props.events.filter(event => {
      return event.group_id === this.state.groupId && today <= event.date_end
    })

    // let calendarEventObjs = []
    // this.setState({eventsToShow: events})

    return events.map(event => {
      // calendarEventObjs.push({startDate: event.date_start, endDate: event.date_end})
      return <Event key={event.id} event={event} />
    })

  }

  renderFriends = () => {
    // debugger

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
    return filteredFriends.map(friend => <Friend key={friend.id} friend={friend} handleAddFriendClick={this.handleAddFriendClick} />)
  }

  handleAddFriendClick = (userId, e) => {
    e.preventDefault()
    let users = this.props.actions.addUserToGroup(this.state.groupId, userId)
    console.log(users);
  }

  // getGroupName = () => {
  //   debugger
  //   return this.props.groups.filter(group => this.state.groupId === group.id)
  // }

  render() {
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

        <GroupCalendar eventsToShow={this.state.eventsToShow} groupId={this.state.groupId}/>
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

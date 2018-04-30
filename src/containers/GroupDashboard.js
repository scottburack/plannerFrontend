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
    groupId: parseInt(this.props.pathname.split('/')[2]),
    friendSearch: ''
  }

  handleClick = () => {
    this.setState({
      addEventButtonClicked: true
    })
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("component mount for group dash");

    if (nextProps.events.length !== 0 && nextProps.groups.length !== 0) {
      nextProps.actions.getFriends(String(prevState.groupId))
      debugger
    }
  }

  renderEvents = () => {
    // debugger
    const events = this.props.events.filter(event => {
      return event.group_id === this.state.groupId
    })
    return events.map(event => {
      return <Event key={event.id} event={event} />
    })
  }

  // getFriends = () => {
  //   fetch(`http://localhost:3000/api/v1/groups/${this.state.groupId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     }
  //   })
  //   .then(resp => resp.json())
  //   .then(friends => this.renderFriends(friends))
  // }

  renderFriends = (friends) => {
    return friends.map(friend => {
      return <li>friend.username</li>
    })
  }



  render() {
    console.log(this.props.events);
    console.log(this.props);
    // console.log(this.getFriends());
    return (
      <div>
        <h1>Group Dashboard</h1>
        <h3>Friends!</h3>
        <ul>

        </ul>
        <button onClick={this.handleFriendSearch}>Add Friend!</button>
        <h3>Events!</h3>
        <ul>
          { this.props.events ? this.renderEvents() : null }
        </ul>
        {this.state.addEventButtonClicked ? <AddEventForm groupId={this.state.groupId}/> : null}
        <button onClick={this.handleClick}>Add Event!</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
 return {...state,
   userId: state.user_id,
   username: state.username,
   firstName: state.first_name,
   lastName: state.last_name,
   groups: state.groups,
   events: state.events}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDashboard)

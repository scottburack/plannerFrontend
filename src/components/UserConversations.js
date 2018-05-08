import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Messages from './Messages'
import { Button, Input } from 'antd'
import AddFriendSearchBar from './AddFriendSearchBar'
import Friend from './Friend'
import * as actions from '../actions/user'


class UserConversations extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      newConvoClicked: false,
      friendSearch: '',
      queryFriends: [],
      convoClicked: false
    }
  }

  componentDidMount = () => {
    // this.state.queryFriends.length < 0 ? this.setState({queryFriends: this.props.actions.getAllUsers() }) : null
    fetch("http://localhost:3000/api/v1/users").then(resp => resp.json()).then(json => this.setState({queryFriends: json}))
  }

  addNewConversation = (event) => {
    event.preventDefault()
    this.setState({
      newConvoClicked: true
    })
  }

  handleSearchChange = (event) => {
    event.preventDefault()
    this.setState({
      friendSearch: event.target.value
    })
  }

  renderForFriendSearch = () => {
    console.log(this.state);
    const filteredFriends = this.state.queryFriends.filter(user => {
      return user.username.toUpperCase().includes(this.state.friendSearch.toUpperCase())
    })
    // debugger
    return filteredFriends.map(friend => <Friend key={friend.id} friend={friend} handleAddFriendClick={this.handleFriendConvoClick} />)
  }

  handleFriendConvoClick = (recieverId, e) => {
    e.preventDefault()
    this.props.actions.addConversation(this.props.userId, recieverId)
  }

  renderConversations = () => {
    return this.props.conversations.map(convo => {
      if (convo.sender_id === this.props.userId || convo.recipient_id === this.props.userId) {
        let recipient = {}
        if (convo.sender_id === this.props.userId) {
          recipient = this.state.queryFriends.find(friend => friend.id === convo.recipient_id)
          console.log(recipient);
        } else {
          recipient = this.state.queryFriends.find(friend => friend.id === convo.sender_id)
          console.log(recipient);
        }

        return <p onClick={(e) => this.renderMessages(e)}>{recipient.username}</p>
      }
    })
  }

  renderMessages = (event) => {
    event.preventDefault()
    this.setState({
      convoClicked: true
    })
  }

  render() {
    console.log(this.props.conversations);
    console.log(this.state.queryFriends);
    return (
      <div>
        <h2>Conversations</h2>
        {this.props.conversations.length > 0 && this.state.queryFriends.length > 0 ? this.renderConversations() : null}
        <Button onClick={(e) => this.addNewConversation(e)}>New Conversation</Button>
        { this.state.newConvoClicked ?
          <div>
            <label>Find Person To Message</label>
            <AddFriendSearchBar friendSearch={this.state.friendSearch} handleChange={this.handleSearchChange} />
          </div>
          : null }
        {this.state.newConvoClicked && this.state.friendSearch !== '' ? this.renderForFriendSearch() : null}
        <div>
          {this.state.convoClicked ? <Messages /> : null}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserConversations)

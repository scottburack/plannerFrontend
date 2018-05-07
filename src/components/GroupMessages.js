import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import { addMessageToGroupMessages, getGroupMessages } from '../actions/group'

class GroupMessages extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      messageInput: ''
    }
  }

  updateCurrentMessage = (event) => {
    this.setState({
      messageInput: event.target.value
    })
  }

  handleSendMessage = (event) => {
    event.preventDefault()
    this.props.addMessageToGroupMessages(
      this.state.messageInput,
      this.props.groupId,
      this.props.username
    )

    this.setState({
      messageInput: ''
    })
  }

  renderChatLog = () => {
    return this.props.groupMessages.map(msg => {
      return <li>{msg.sender_username}: {msg.content}</li>
    })
  }

  render() {

    return (
      <div>
        <h2>Group Messages</h2>
        <div className='chat-logs'>
          <ul>
            { this.props.groupMessages ? this.renderChatLog() : console.log('no msgs')}
          </ul>
        </div>
        <Input type='text'
          value={this.state.messageInput}
          onChange={(e) => this.updateCurrentMessage(e)}
          placeholder='Enter your message...'
        />
        <Button onClick={(e) => this.handleSendMessage(e)}>Send</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}


export default connect(mapStateToProps, {addMessageToGroupMessages, getGroupMessages} )(GroupMessages)

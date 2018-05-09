import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/user'
import {Input, Button} from 'antd'
import { bindActionCreators } from 'redux'


class Messages extends React.Component {

  state = {
    message: '',
    messages: [],
    users: []
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/api/v1/conversations/${this.props.convoId}/messages`).then(resp => resp.json()).then(json => this.setState({messages: json}))
    // fetch("http://localhost:3000/api/v1/users").then(resp => resp.json()).then(json => this.setState({users: json}))

  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      message: event.target.value
    })
  }

  handleSendEvent = (event) => {
    event.preventDefault()
    console.log('clicked');
    this.props.actions.createMessage(
      this.state.message,
      this.props.userId,
      this.props.convoId
    )
    this.setState({
      message: ''
    })
  }

  renderMessages = () => {
    return this.state.messages.map(msg => {
      let user = this.props.users.find(u => u.id === msg.user_id)
      return <p>{user.username}: {msg.body}</p>
    })
  }

  render() {
    console.log(this.props.convoId)
    return (
      <div id='messages'>
        {this.state.messages.length > 0 ? this.renderMessages() : null}
        <div>
          <Input type='text' placeholder='Your Message' value={this.state.message} onChange={ (e) => this.handleInputChange(e)} />
          <Button onClick={ (e) => this.handleSendEvent(e) }>Send</Button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.usersReducer.userId,
    messages: state.usersReducer.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)

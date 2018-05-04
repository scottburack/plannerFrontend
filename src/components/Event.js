import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import * as actions from '../actions/event'




class Event extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      votes: this.props.event.votes,
      userUpvote: this.props.event.votes + 1,
      userDownvote: this.props.event.votes - 1
    }
  }

  handleUpvote = (event) => {
    event.preventDefault()
    if (this.state.userUpvote !== this.state.votes) {
      this.setState({
        votes: this.state.votes + 1
      }, () => actions.handleEventVoting(this.state.votes, this.props.event.id))
    }
  }

  handleDownvote = (event) => {
    event.preventDefault()
    if (this.state.userDownvote !== this.state.votes) {
      this.setState({
        votes: this.state.votes - 1
      }, () => actions.handleEventVoting(this.state.votes, this.props.event.id))
    }
  }


  parseTime = (dateTime) => {
    let newDate = new Date(dateTime)
    // debugger
    let getHours
    if (newDate.getUTCHours() > 12) {
      getHours = newDate.getUTCHours() - 12
    } else if (newDate.getUTCHours() === 0) {
      getHours = newDate.getUTCHours() + 12
    } else {
      getHours = newDate.getUTCHours()
    }
    let getMinutes = String(newDate.getUTCMinutes())
    getMinutes === '0' ? getMinutes += '0' : getMinutes
    let newTime = getHours + ':' + getMinutes
    newDate.getUTCHours() >= 12 ? newTime += ' PM' : newTime += ' AM'
    return newTime
  }

  render() {
    return (
      <div id={this.props.event.id}>
        <li>
            Name: {this.props.event.name} |
            Start Date: {this.props.event.date_start} |
            End Date: {this.props.event.date_end} |
            Start Time: {this.props.event.time_start !== null ? this.parseTime(this.props.event.time_start) : 'No Time Given'} |
            End Time: {this.props.event.time_end !== null ? this.parseTime(this.props.event.time_end) : 'No Time Given'}  |
            Votes: {this.state.votes}
        </li>
        <ThumbsUp onClick={(e) => {this.handleUpvote(e)}}/>
        <ThumbsDown onClick={(e) => {this.handleDownvote(e)}} />
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default connect(mapDispatchToProps)(Event)

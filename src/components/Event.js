import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import * as actions from '../actions/event'
import { Card } from 'antd';
import { parseTime } from '../commonFunctions'




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


  render() {
    return (
      <div className='events'>
        <Card className='group-event-cards' title={this.props.event.name} style={{ width: 300 }}>
          <p>Start Date: {this.props.event.date_start}</p>
          <p>End Date: {this.props.event.date_end}</p>
          <p>Start Time: {this.props.event.time_start !== null ? parseTime(this.props.event.time_start) : 'No Time Given'}</p>
          <p>End Time: {this.props.event.time_end !== null ? parseTime(this.props.event.time_end) : 'No Time Given'}</p>
          <p>Votes: {this.state.votes}</p>
        <ThumbsUp onClick={(e) => {this.handleUpvote(e)}}/>
        <ThumbsDown onClick={(e) => {this.handleDownvote(e)}} />
        </Card>
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

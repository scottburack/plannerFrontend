import React from 'react'
import { connect } from 'react-redux'
import AddEventForm from '../components/AddEventForm'
import Event from '../components/Event'

class GroupDashboard extends React.Component {

  state = {
    addEventButtonClicked: false,
    groupId: parseInt(this.props.pathname.split('/')[2])
  }

  handleClick = () => {
    this.setState({
      addEventButtonClicked: true
    })
  }

  // getIdFromPathName = () => {
  //   return parseInt(this.props.pathname.split('/')[2])
  // }

  renderEvents = () => {
    const events = this.props.events.filter(event => {
      return event.group_id === this.state.groupId
    })
    return events.map(event => {
      return <Event key={event.id} event={event} />
    })
  }


  render() {
    console.log(this.props);

    return (
      <div>
        <h1>Group Dashboard</h1>
        <h3>Events!</h3>
        <ul>
          { this.renderEvents() }
        </ul>
        {this.state.addEventButtonClicked ? <AddEventForm groupId={this.state.groupId}/> : null}
        <button onClick={this.handleClick}>Add Event!</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {...state.usersReducer}
}

export default connect(mapStateToProps)(GroupDashboard)

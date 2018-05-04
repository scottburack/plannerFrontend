import React from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddEventForm from '../components/AddEventForm'
import Event from '../components/Event'
import AddYelpEventForm from '../components/AddYelpEventForm'
import YelpSearchResults from '../components/YelpSearchResults'
import { getCurrentUser } from '../actions/user'
import * as actions from '../actions/group'
import AddFriendSearchBar from '../components/AddFriendSearchBar'
import Friend from '../components/Friend'
import GroupCalendar from '../components/GroupCalendar'
import { Layout, Modal, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class GroupDashboard extends React.Component {

  state = {
    addEventButtonClicked: false,
    addFriendButtonClicked: false,
    searchYelpClick: false,
    yelpFormSubmitted: false,
    groupId: parseInt(this.props.pathname.split('/')[2]),
    friendSearch: '',
    queryFriends: []
  }

  componentDidMount = () => {

    if (this.props.friends.length === 0) {
      console.log('In group mount');
      this.props.actions.getFriends(this.state.groupId);
    }

    if (this.props.yelpResults.length > 0) {
      this.setState({
        yelpFormSubmitted: true
      })
    }
    window.onpopstate = this.onBackButtonEvent;
    fetch("http://localhost:3000/api/v1/users").then(resp => resp.json()).then(json => this.setState({queryFriends: json}))
  }

  handleClick = (event) => {
    this.setState({
      [event.target.name]: true
    },console.log(event.target.name))
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

    return events.map(event => {
      return <Event key={event.id} event={event} />
    })
  }

  handleOk = () => {
    alert("Please click 'Add Event' to add or 'Cancel' to exit.")
  }

  handleCancel = (event) => {
    // event.preventDefault()
    this.setState({
      addEventButtonClicked: false,
    });
  }

  handleYelpCancel = () => {
    this.setState({
      searchYelpClick: false,
    });
  }

  // handleSearchYelpClick = () => {
  //   this.setState({
  //     searchYelpClick: true
  //   })
  // }

  yelpFormSubmitted = (event) => {
    event.preventDefault()
    this.setState({
      yelpFormSubmitted: true
    })

  }

  handleYelpResultsCancel = () => {
    this.setState({
      yelpFormSubmitted: false
    })
  }

  renderFriends = () => {
    return this.props.friends.map(friend => {
      return <li className='friends-list'>{friend.username}</li>
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
  }

  getGroupName = () => {
    let foundGroup = this.props.groups.find(group => this.state.groupId === group.id)
    return foundGroup.name
  }

  render() {
    console.log(this.props);
    console.log(this.props.yelpResults);
    return (
      <div id='group-dashboard'>
        <Layout>
          <Header>
            <h1 style={{color:'white'}}>{this.props.groups.length > 0 ? this.getGroupName() : null}</h1>
          </Header>
          <Layout>
            <Sider>
              <h3 style={{color:'white'}}>Friends!</h3>
              <ul>
                { this.props.friends.length > 0 ? this.renderFriends() : null}
              </ul>
              {this.state.addFriendButtonClicked ? <AddFriendSearchBar friendSearch={this.state.friendSearch} handleChange={this.handleFriendSearchChange} /> : null}
              {this.state.addFriendButtonClicked && this.state.friendSearch !== '' ? this.renderForFriendSearch() : null}
              <button name='addFriendButtonClicked' onClick={this.handleClick}>Add Friend!</button>
            </Sider>
            <Content>
              <h2>Events!</h2>
              <ul>
                { this.props.events ? this.renderEvents() : null }
              </ul>

              <Button name='addEventButtonClicked' onClick={this.handleClick}>Add Event!</Button>
              <Modal title="What's the plan?"
                visible={this.state.addEventButtonClicked}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <AddEventForm groupId={this.state.groupId}/>
              </Modal>

              <Button name='searchYelpClick' onClick={this.handleClick}>Find Somewhere To Go!</Button>
              <Modal title="What's the plan?"
                visible={this.state.searchYelpClick}
                onOk={this.handleOk}
                onCancel={this.handleYelpCancel}
              >
              <AddYelpEventForm handleYelpCancel={this.handleYelpCancel} yelpFormSubmitted={this.yelpFormSubmitted} />
              </Modal>

              <Modal title="Search Results ..."
                visible={this.state.yelpFormSubmitted}
                onOk={this.handleOk}
                onCancel={this.handleYelpResultsCancel}
                width= '75%'
              >
              <YelpSearchResults />
              </Modal>

              <GroupCalendar eventsToShow={this.state.eventsToShow} groupId={this.state.groupId}/>
            </Content>
            </Layout>
          </Layout>
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

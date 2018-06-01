import React from 'react'
import Moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import ChatRoom from '../components/ChatRoom'
import GroupMessages from '../components/GroupMessages'
import AddEventForm from '../components/AddEventForm'
import Event from '../components/Event'
import UserDashboard from './UserDashboard'
import AddYelpEventForm from '../components/AddYelpEventForm'
import YelpSearchResults from '../components/YelpSearchResults'
import { getCurrentUser } from '../actions/user'
import * as actions from '../actions/group'
import AddFriendSearchBar from '../components/AddFriendSearchBar'
import Friend from '../components/Friend'
import GroupCalendar from '../components/GroupCalendar'
import { Layout, Modal, Button, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
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
      this.props.actions.getGroupMessages(this.state.groupId)
    }

    if (this.props.yelpResults.length > 0) {
      this.setState({
        yelpFormSubmitted: true
      })
    }

    // this.props.groupMessages.length === 0 ? this.props.actions.getGroupMessages(this.state.groupId) : null


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
    this.props.actions.resetYelpResults()
    this.props.actions.resetGroupMessages()
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

  yelpFormSubmitted = (event) => {
    event.preventDefault()
    this.setState({
      yelpFormSubmitted: true
    })

  }

  handleYelpResultsCancel = (event) => {
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
    return (
      <div id='group-dashboard'>
        <Layout>
          <Header className='header'>
            <h1 style={{color:'white', float: 'left'}}>{this.props.groups.length > 0 ? this.getGroupName() : null}</h1>
            <Link to={'/userdashboard/'} onClick={() => this.onBackButtonEvent()} style={{color:'white', float: 'right'}}>Home</Link>
          </Header>
          <Layout>
            <Sider className='sider'>
              <div>
                <h3 id='friends-text'>Friends!</h3>
                <ul>
                  { this.props.friends.length > 0 ? this.renderFriends() : null}
                </ul>
                {this.state.addFriendButtonClicked ? <AddFriendSearchBar friendSearch={this.state.friendSearch} handleChange={this.handleFriendSearchChange} /> : null}
                {this.state.addFriendButtonClicked && this.state.friendSearch !== '' ? this.renderForFriendSearch() : null}
                <button id='add-friend' name='addFriendButtonClicked' onClick={this.handleClick}>Add Friend!</button>
              </div>
            </Sider>
            <Content>
            <Tabs>
              <TabPane tab='Upcomming Events' key="1">
                <Button name='addEventButtonClicked' onClick={this.handleClick}>Add Event!</Button>
                <Button name='searchYelpClick' onClick={this.handleClick}>Find Somewhere To Go!</Button>
                <br/><br/>
                <div className='events-container'>
                  { this.props.events ? this.renderEvents() : null }
                </div>

                <Modal title="What's the plan?"
                  visible={this.state.addEventButtonClicked}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <AddEventForm groupId={this.state.groupId} clickedEvent={this.handleYelpResultsCancel}/>
                </Modal>

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
                  <YelpSearchResults clickedEvent={this.handleYelpResultsCancel} showAddEventForm={this.handleClick}/>

                </Modal>
              </TabPane>
              <TabPane tab='Group Calendar' key='2'>
                <GroupCalendar eventsToShow={this.state.eventsToShow} groupId={this.state.groupId}/>
              </TabPane>
              <TabPane tab='Group Chat' key='3'>
                <GroupMessages groupId={this.state.groupId}/>
              </TabPane>
            </Tabs>
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

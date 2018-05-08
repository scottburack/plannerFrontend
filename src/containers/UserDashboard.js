import React from 'react'
import '../App.css'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import { getCurrentUser, getUsers, logOutUser } from '../actions/user'
import AddGroupForm from '../components/AddGroupForm'
import Group from '../components/Group'
import Journal from '../components/Journal'
import UserCalendar from '../components/UserCalendar'
import UserConversations from '../components/UserConversations'

const { Header, Footer, Sider, Content } = Layout;

class UserDashboard extends React.Component {

  handleLogout = () => {
    this.props.logOutUser()
  }

  renderGroups = () => {
    console.log("render groups triggered");
    return this.props.groups.map(group => {
      return <Group key={group.id} group={group} />
    })
  }

  render() {
    console.log(this.props);
    return (
      <div id='user-dashboard'>
        <Layout>
          <Header>
            <h1 className='username-label'>Hello {this.props.firstName} {this.props.lastName}</h1>
            <Button style={{float: 'right'}} onClick={this.handleLogout}>Logout</Button>
          </Header>
        <Layout>
          <Sider>
            <h3 id='groups-label'>Groups</h3>
            <ul>
              { this.props.groups !== undefined ? this.renderGroups() : null}
            </ul>
            <AddGroupForm />
          </Sider>
          <Content>
            <h3>Journal</h3>
            <Journal />
            <UserCalendar />
            <UserConversations />
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



export default connect(mapStateToProps, {logOutUser})(UserDashboard)

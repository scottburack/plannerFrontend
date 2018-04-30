import React from 'react'
import { Link } from 'react-router-dom'
import GroupDashboard from '../containers/GroupDashboard'


const Group = (props) => {
  console.log('group component');
    return <Link to={'/groupdashboard/'+props.group.id}><li>{props.group.name}</li></Link>
}

export default Group

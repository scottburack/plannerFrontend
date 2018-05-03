import React from 'react'

const Friend = (props) => {

  return (

    <a href="#" onClick={(e) => {props.handleAddFriendClick(props.friend.id, e)}}>{props.friend.username}<br/></a>
  )
}

export default Friend

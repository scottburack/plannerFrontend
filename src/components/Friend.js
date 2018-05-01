import React from 'react'

const Friend = (props) => {

  return (

    <a href="#" onClick={(e) => {props.handleAddFriendClick(props.friend.id, e)}}><br/>{props.friend.username}</a>
  )
}

export default Friend

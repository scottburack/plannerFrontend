import React from 'react'
import { connect } from 'react-redux'

const AddFriendSearchBar = (props) => {

  return (
    <div>
      <form>
        <input type="text" value={props.friendSearch} onChange={(e) => props.handleChange(e)} />
      </form>
    </div>
  )
}

export default AddFriendSearchBar

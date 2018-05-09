export function addGroup(userId, name, link_url) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/groups', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        group: {
          user_id: userId,
          name: name,
          url_link: link_url
        }
      })
    })
    .then(response => response.json())
    .then(userGroups => dispatch(getGroups(userGroups)))
  }
}


export function getGroups(userGroups) {
  return {
    type: "GET_GROUPS",
    payload: userGroups
  }
}

export function getFriends(groupId) {
  return dispatch => {
    // dispatch({ type: 'LOADING_FRIENDS' })
    return fetch(`http://localhost:3000/api/v1/groups/${groupId}`)
    .then(resp => resp.json())
    .then(friends => {
      dispatch({type: 'GET_FRIENDS', payload: friends})
    })
  }
}

export function addUserToGroup(groupId, userId) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/groups_users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        groups_user: {
          user_id: userId,
          group_id: groupId
        }
      })
    })
    .then(response => response.json())
    .then(friends => dispatch({type: 'GET_FRIENDS', payload: friends}))
  }
}

export function resetFriends() {
  return dispatch =>
  dispatch({type: 'RESET_FRIENDS'})
}

export function resetYelpResults() {
  return dispatch =>
  dispatch({type: 'RESET_YELP_RESULTS'})
}

export function resetGroupMessages() {
  return dispatch =>
  dispatch({type: 'RESET_GROUP_MESSAGES'})
}

export function resetGroupEvents() {
  return dispatch =>
  dispatch({type: 'RESET_GROUP_EVENTS'})
}

export function addMessageToGroupMessages(content, groupId, senderUsername) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/group_messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        group_message: {
          content: content,
          group_id: groupId,
          sender_username: senderUsername
        }
      })
    })
    .then(response => response.json())
    .then(message => dispatch(addGroupMessage(message)))
  }
}

export function addGroupMessage(message) {
  return {
    type: "ADD_GROUP_MESSAGE",
    payload: message
  }
}

export function getGroupMessages(groupId) {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/get_messages/${groupId}`)
    .then(resp => resp.json())
    .then(msgs => {
      dispatch({type: 'GET_GROUP_MESSAGES', payload: msgs})
    })
  }
}

export function addEvent(groupId, name, dateStart, dateEnd, timeStart, timeEnd, votes) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/events', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        event: {
          group_id: groupId,
          name: name,
          date_start: dateStart,
          date_end: dateEnd,
          time_start: timeStart,
          time_end: timeEnd,
          votes: votes
        }
      })
    })
    .then(response => response.json())
    .then(groupEvents => dispatch(getEvents(groupEvents)))
  }
}

export function getEvents(groupEvents) {
  return {
    type: 'GET_EVENTS',
    payload: groupEvents
  }
}

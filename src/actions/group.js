export function addGroup(creatorUsername, name, link_url) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/groups', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        group: {
          creator_username: creatorUsername,
          name: name,
          url_link: link_url
        }
      })
    })
    .then(response => response.json())
    .then(userGroups => dispatch(getGroups(userGroups)))
  }
}

export function getUserGroups(username) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/groups', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: username
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

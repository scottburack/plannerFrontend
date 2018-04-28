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

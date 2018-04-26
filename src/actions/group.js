export function addGroup(name, link_url) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/groups', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        group: {
          name: name,
          link_url: link_url
        }
      })
    })
    .then(response => response.json())
    .then(groupData => dispatch(addGroupForUser(groupData)))
  }
}

export function addGroupForUser(groupData) {
  return {
    type: "ADD_GROUP",
    payload: groupData
  }
}

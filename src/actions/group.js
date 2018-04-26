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
  }
}

export function addGroupForUser(groupData) {
  return {
    type: "ADD_GROUP",
    payload: groupData
  }
}

// export function getGroups() {
//   return dispatch => {
//     fetch('http://localhost:3000/api/v1/groups', {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`
//       }
//     })
//     .then(response => response.json())
//     .then(users => dispatch(setUsers(groups)))
//   }
// }

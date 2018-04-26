export function addGroup(userId, groupId) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/groups_users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        groupUser: {
          user_id: userId,
          group_id: groupId
        }
      })
    })
    .then(response => response.json())
    .then(groupUserData => dispatch(addGroupUserRelation(groupUserData)))
  }
}

export function addGroupUserRelation(groupUserData) {
  return {
    type: "ADD_GROUP_USER",
    payload: groupUserData
  }
}

export function signInUser(username, password) {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
      .then(response => response.json())
      .then(userData => {
        dispatch(loginUser(userData));
      });
  };
}

// export function loginError(json) {
//   debugger;
// }

export function signUpUser(username, password, firstName, lastName) {
  //use thunk here
  return dispatch => {
    fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          first_name: firstName,
          last_name: lastName
        }
      })
    })
      .then(response => response.json())
      .then(userData => {
        dispatch(loginUser(userData));
      });
  };
}

export function loginUser(userData) {
  return {
    type: "LOGIN_USER",
    payload: userData
  };
}

export function loadingUser() {
  return {
    type: "LOADING_USER"
  };
}

export function getCurrentUser() {
  return dispatch => {
    dispatch(loadingUser());
    fetch("http://localhost:3000/api/v1/current_user", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(response => response.json())
      .then(userData => dispatch(loginUser(userData)));
  };
}

export function logOutUser() {
  return {
    type: "LOG_OUT_USER"
  };
}

export function setUsers(usersData) {
  return {
    type: "SET_USERS",
    payload: usersData
  }
}

export function getUsers() {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
    .then(response => response.json())
    .then(users => dispatch(setUsers(users)))
  }
}

export function getAllUsers() {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(users => dispatch(setUsers(users)))
  }
}

export function addConversation(senderId, recieverId) {
  console.log('add convo');
  return dispatch => {
    fetch("http://localhost:3000/api/v1/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        sender_id: senderId,
        recipient_id: recieverId
      })
    })
      .then(response => response.json())
      .then(convo => {
        dispatch(addToConversations(convo));
      });
  };
}

export function addToConversations(convo) {
  return {
    type: "ADD_CONVO",
    payload: convo
  }
}

export function createMessage(body, userId, convoId) {

  return dispatch => {
    fetch(`http://localhost:3000/api/v1/conversations/${convoId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        body: body,
        user_id: userId,
        conversation_id: convoId
      })
    })
      .then(response => response.json())
      .then(msg => {
        dispatch(addMessage(msg));
      });
  };
}

export function addMessage(msg) {
  return {
    type: "ADD_MESSAGE",
    payload: msg
  }
}

export function getConvoMessages(convoId) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/conversations/${convoId}/messages`)
    .then(response => response.json())
    .then(msgs => dispatch(getMessages(msgs)))
  }
}

export function getMessages(msgs) {
  return {
    type: 'GET_MESSAGES',
    payload: msgs
  }
}

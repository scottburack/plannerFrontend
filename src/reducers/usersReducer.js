export default function usersReducer(
  state = {userId: null, username: null, firstName: null, lastName: null, loggedIn: false, loading: false, users: [], groups: [], events: [], friends: [], groupUsers: [], yelpResults: [], groupMessages: [], conversations: [], messages: []  },
  action
) {
  switch (action.type) {
    //add in loading case and additional state
    case "LOADING_USER":
      return { ...state, loading: true };
    case "LOGIN_USER":
      if (action.payload.message === "Invalid username or password" || action.payload.message === "username has already been taken") {
        return {...state}
      } else {
        localStorage.setItem("jwt", action.payload.jwt);
        console.log(action.payload)
        return {
          ...state,
          userId: action.payload.user_id,
          username: action.payload.username,
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
          groups: action.payload.groups,
          events: action.payload.events,
          conversations: action.payload.conversations,
          loggedIn: true,
          loading: false
        };
      }
    case "LOG_OUT_USER":
      localStorage.removeItem("jwt");
      return { ...state, username: null, loggedIn: false, groups: [], events: [], friends: [] };
    case "SET_USERS":
      return {...state, users: action.payload}
    case "GET_GROUPS":
      return {...state, groups: action.payload}
    case "GET_EVENTS":
      if (state.events === undefined || state.events.length === 0) {
        return state
      } else {
        state.events.push(action.payload)
        return {...state, events: state.events}
      }
    case "GET_FRIENDS":
      return {...state, friends: action.payload}
    case "EVENT_VOTES":
      return action.payload.votes
    case "RESET_FRIENDS":
      return {...state, friends: []}
    case "YELP_RESULTS":
      return {...state, yelpResults: action.payload.businesses}
    case 'RESET_YELP_RESULTS':
      return {...state, yelpResults: []}
    case 'GET_GROUP_MESSAGES':
      return {...state, groupMessages: action.payload}
    case 'ADD_GROUP_MESSAGE':
      state.groupMessages.push(action.payload)
      return {...state, groupMessages: state.groupMessages}
    case 'RESET_GROUP_MESSAGES':
      return {...state, groupMessages: []}
    case 'ADD_CONVO':
      state.conversations.push(action.payload)
      return {...state, conversations: state.conversations}
    case 'ADD_MESSAGE':
      state.messages.push(action.payload)
      return {...state, messages: state.messages}
    case 'GET_MESSAGES':
      return {...state, messages: action.payload}
    default:
      return state;
  }
}

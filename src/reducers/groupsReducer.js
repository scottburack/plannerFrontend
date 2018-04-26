export default function groupsReducer(
  state = {name: null, linkUrl: null} , action
) {
  switch(action.type) {
    case "ADD_GROUP":
      const group = Object.assign({}, action.group)
      return Object.assig
    default:
    return state
  }
}

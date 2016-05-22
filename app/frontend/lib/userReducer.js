import { RECEIVE_USER_DATA } from './userActions'
const userResult = (state = {loading: true}, action) => {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return action.result
    default:
      return state
  }
}
export default userResult

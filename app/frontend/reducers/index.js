import { combineReducers } from 'redux';

const urlResult = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_URL_SEARCH':
      return action.result
    default:
      return state
  }
}

const homeApp = combineReducers({
  urlResult
})

export default homeApp

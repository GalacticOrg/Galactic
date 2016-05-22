import { combineReducers } from 'redux';

const urlSearch = (state = "", action) => {
  switch (action.type) {
    case 'RECEIVE_URL_SEARCH':
      return action
    default:
      return state

  }
}

const homeApp = combineReducers({
  urlSearch
})

export default homeApp

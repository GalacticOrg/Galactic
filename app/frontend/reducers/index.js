import { combineReducers } from 'redux';

const urlSearch = (state = "", action) => {
  switch (action.type) {
    case 'URL_INPUT':
      return action
    default:
      return state
  }
}

const homeApp = combineReducers({
  urlSearch
})

export default homeApp

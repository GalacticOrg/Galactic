/**
 * app/frontend/Home/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'


const urlResult = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_URL_SEARCH':
      return action.result
    default:
      return state
  }
}

const homeApp = combineReducers({
  urlResult,
  userResult
})

export default homeApp

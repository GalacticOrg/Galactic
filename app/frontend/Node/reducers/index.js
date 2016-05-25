/**
 * app/frontend/Home/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import { RECEIVE_NODE_DATA } from '../actions'

const nodeResult = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NODE_DATA:
      return action.result
    default:
      return state
  }
}

const nodeApp = combineReducers({
  userResult,
  nodeResult
})

export default nodeApp

/**
 * app/frontend/Connect/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import inputURLResult from '../../components/inputURL/reducers'
import { RECEIVE_CONNECTION_DATA } from '../actions'

const connectionsResult = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CONNECTION_DATA:
      return action.result
    default:
      return state
  }
}

const connectApp = combineReducers({
  userResult,
  inputURLResult,
  connectionsResult
}) 

export default connectApp

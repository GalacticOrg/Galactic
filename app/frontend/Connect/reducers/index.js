/**
 * app/frontend/Connect/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import inputURLResult from '../../components/inputURL/reducers'
import { RECEIVE_CONNECTION_DATA, POST_CONNECTION_DATA, RECEIVE_CONNECTION_ERROR } from '../actions'

const connectionsResult = (state = {success: null}, action) => {
  switch (action.type) {
    case POST_CONNECTION_DATA:
      return {
      }
    case RECEIVE_CONNECTION_ERROR:
      return action.response
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

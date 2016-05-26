/**
 * app/frontend/User/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import { RECEIVE_FIREHOSE_DATA } from '../actions'


const firehoseResult = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FIREHOSE_DATA:
      return action.result
    default:
      return state
  }
}

const userApp = combineReducers({
  userResult,
  firehoseResult
})

export default userApp

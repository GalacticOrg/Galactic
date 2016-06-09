/**
 * app/frontend/Home/reducers/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import inputURLResult from '../../components/InputURL/reducers'
import { RECEIVE_FIREHOSE_DATA } from '../actions'

const firehoseResult = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_FIREHOSE_DATA:
      return action.result
    default:
      return state
  }
}

const homeApp = combineReducers({
  inputURLResult,
  firehoseResult,
  userResult
})

export default homeApp

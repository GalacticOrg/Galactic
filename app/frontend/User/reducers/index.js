/**
 * app/frontend/User/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import { RECEIVE_USER_EDGE_DATA } from '../actions'


const userEdgeResult = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_EDGE_DATA:
      const {result, profile} = action
      return {
        result,
        profile
      }
    default:
      return state
  }
}

const userApp = combineReducers({
  userResult,
  userEdgeResult
})

export default userApp

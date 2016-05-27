/**
 * app/frontend/components/users/reducers/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { RECEIVE_USER_DATA } from '../actions'

export default function userResult (state = {loading: true}, action) {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return action.result
    default:
      return state
  }
}

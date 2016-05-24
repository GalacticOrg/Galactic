/**
 * app/frontend/components/inputURL/reducers/index.js
 * Copyright (c) 2016, Galactic
*/
import { RECEIVE_URL_SEARCH } from '../actions'

const inputURLResult = (state = { isURL: null, node: null }, action) => {
  switch (action.type) {
    case RECEIVE_URL_SEARCH:
      return action.result
    default:
      return state
  }
}

export default inputURLResult

/**
 * app/frontend/components/inputURL/reducers/index.js
 * Copyright (c) 2016, Galactic
*/
import { RECEIVE_URL_SEARCH, POST_URL_SEARCH, RESET_URL_SEARCH } from '../actions'

export default function inputURLResult (state = {}, action) {
  switch (action.type) {

    case POST_URL_SEARCH:
      return Object.assign({},
        state,
        {
          [action.uid]: {loading: true }
        });
    case RECEIVE_URL_SEARCH:
      return Object.assign({},
        state,
        {
          [action.uid]: action.result
        });
    case RESET_URL_SEARCH:
      return Object.assign({},
        state,
        {
          [action.uid]: {reset:true}
        });
    default:
      return state
  }
}

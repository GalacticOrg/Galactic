/**
 * app/frontend/components/inputURL/reducers/index.js
 * Copyright (c) 2016, Galactic
*/
import { RECEIVE_URL_SEARCH } from '../actions'

export default function inputURLResult (state = {}, action) {
  switch (action.type) {
    case RECEIVE_URL_SEARCH:
      return Object.assign({},
        state,
        {
          [action.uid]: action.result
        });
    default:
      return state
  }
}

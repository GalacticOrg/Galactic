/**
 * app/frontend/components/users/actions/index.js
 * Copyright (c) 2016, Galactic
*/

import { Post } from "../../lib/Api"
export const POST_CONNECTION_DATA = 'POST_CONNECTION_DATA'
export const RECEIVE_CONNECTION_DATA = 'RECEIVE_CONNECTION_DATA'
export const RECEIVE_CONNECTION_ERROR = 'RECEIVE_CONNECTION_ERROR'

function requestConnectionResult() {
  return {
    type: POST_CONNECTION_DATA
  }
}

function receiveConnectionResult(result) {
  return {
    type: RECEIVE_CONNECTION_DATA,
    result
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_CONNECTION_ERROR,
    err
  }
}

export function postConnection(aId, bId) {
  return dispatch => {
    dispatch(requestConnectionResult())
    return Post(
        '/api/connections',
        {aId, bId},
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveConnectionResult(res.body))
    )
  }
}

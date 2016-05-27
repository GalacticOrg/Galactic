/**
 * app/frontend/components/users/actions/index.js
 * Copyright (c) 2016, WikiWeb
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

function receiveErr(err, res) {
  const response = err.response.body
  return {
    type: RECEIVE_CONNECTION_ERROR,
    response
  }
}

export function postConnection(fromId, toId) {
  return dispatch => {
    dispatch(requestConnectionResult())
    return Post(
        '/api/connect',
        {fromId, toId},
        POST_CONNECTION_DATA,
        (err, res)=>dispatch(receiveErr(err, res)),
        (err, res)=>dispatch(receiveConnectionResult(res.body))
    )
  }
}

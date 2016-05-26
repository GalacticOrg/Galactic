/**
 * app/frontend/components/users/actions/index.js
 * Copyright (c) 2016, Galactic
*/

import { Get } from "../../../lib/Api"
export const GET_USER_DATA = 'GET_USER_DATA'
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR'

function requestUserResult() {
  return {
    type: GET_USER_DATA
  }
}

function receiveUserResult(result) {
  return {
    type: RECEIVE_USER_DATA,
    result
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_USER_ERROR,
    err
  }
}

export function getProfile() {
  return dispatch => {
    dispatch(requestUserResult())
    return Get(
        '/api/users/profile',
        {},
        GET_USER_DATA,
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveUserResult(res.body))
    )
  }
}

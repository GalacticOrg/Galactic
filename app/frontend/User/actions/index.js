/**
 * app/frontend/components/Home/actions/index.js
 * Copyright (c) 2016, Galactic
*/

import { Get } from "../../lib/Api"
export const GET_USER_EDGE_DATA = 'GET_USER_EDGE_DATA'
export const RECEIVE_USER_EDGE_DATA = 'RECEIVE_USER_EDGE_DATA'
export const RECEIVE_USER_EDGE_ERROR = 'RECEIVE_USER_EDGE_ERROR'


function requestUserEdgeResult() {
  return {
    type: GET_USER_EDGE_DATA
  }
}

function receiveUserEdgeResult(data) {
  const {result, profile} = data;
  return {
    type: RECEIVE_USER_EDGE_DATA,
    result,
    profile
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_USER_EDGE_ERROR,
    err
  }
}

export function getUserEdges(username) {
  return dispatch => {
    dispatch(requestUserEdgeResult())
    return Get(
        '/api/edges/users/'+username,
        {},
        GET_USER_EDGE_DATA,
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveUserEdgeResult(res.body))
    )
  }
}

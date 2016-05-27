/**
 * app/frontend/components/Home/actions/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { Get } from "../../lib/Api"
export const GET_NODE_DATA = 'GET_NODE_DATA'
export const RECEIVE_NODE_DATA = 'RECEIVE_NODE_DATA'
export const RECEIVE_NODE_ERROR = 'RECEIVE_NODE_ERROR'


function requestNodeResult() {
  return {
    type: GET_NODE_DATA
  }
}

function receiveNodeResult(result) {
  return {
    type: RECEIVE_NODE_DATA,
    result
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_NODE_ERROR,
    err
  }
}

export function getNode(id) {
  return dispatch => {
    dispatch(requestNodeResult())
    return Get(
        '/api/node/'+id,
        {},
        GET_NODE_DATA,
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveNodeResult(res.body))
    )
  }
}

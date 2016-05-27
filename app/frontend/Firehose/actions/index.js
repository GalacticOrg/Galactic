/**
 * app/frontend/components/Home/actions/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { Get } from "../../lib/Api"
export const GET_FIREHOSE_DATA = 'GET_FIREHOSE_DATA'
export const RECEIVE_FIREHOSE_DATA = 'RECEIVE_FIREHOSE_DATA'
export const RECEIVE_FIREHOSE_ERROR = 'RECEIVE_FIREHOSE_ERROR'


function requestFirehoseResult() {
  return {
    type: GET_FIREHOSE_DATA
  }
}

function receiveFirehoseResult(result) {
  return {
    type: RECEIVE_FIREHOSE_DATA,
    result
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_FIREHOSE_ERROR,
    err
  }
}

export function getFirehose(username) {
  return dispatch => {
    dispatch(requestFirehoseResult())
    return Get(
        '/api/edges/firehose/',
        {},
        GET_FIREHOSE_DATA,
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveFirehoseResult(res.body))
    )
  }
}

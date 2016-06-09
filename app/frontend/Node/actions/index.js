/**
 * app/frontend/components/Home/actions/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { Get, Post } from "../../lib/Api"
export const GET_NODE_DATA = 'GET_NODE_DATA'
export const RECEIVE_NODE_DATA = 'RECEIVE_NODE_DATA'
export const RECEIVE_NODE_ERROR = 'RECEIVE_NODE_ERROR'

export const RECEIVE_CONNECTION_TAGS_RESULT = 'RECEIVE_CONNECTION_TAGS_RESULT'
export const POST_NODE_TAGS_DATA = 'POST_NODE_TAGS_DATA'


function requestNodeResult() {
  return {
    type: GET_NODE_DATA
  }
}

function requestNodePostTags() {
  return {
    type: POST_NODE_TAGS_DATA
  }
}

function receiveNodeResult(result) {
  return {
    type: RECEIVE_NODE_DATA,
    result
  }
}

function receiveConnectionTagsResult(result){
  return {
    type: RECEIVE_CONNECTION_TAGS_RESULT,
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

export function postNodeTags(connectionId, tags){
  return dispatch => {
    dispatch(requestNodePostTags())
    return Post(
      '/api/connect/'+connectionId,
      {tags},
      POST_NODE_TAGS_DATA,
      (err, res)=>dispatch(receiveErr(err)),
      (err, res)=>dispatch(receiveConnectionTagsResult(res.body))
      )
  }
}
/**
 * app/frontend/components/inputURL/actions/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { Get } from "../../../lib/Api"
export const POST_URL_SEARCH = 'POST_URL_SEARCH'
export const RECEIVE_URL_SEARCH = 'RECEIVE_URL_SEARCH'
export const RECEIVE_URL_ERROR = 'RECEIVE_URL_ERROR'
export const RESET_URL_SEARCH = 'RESET_URL_SEARCH'

function requestSearchResult(q, uid) {
  return {
    type: POST_URL_SEARCH,
    uid
  }
}

function receiveSearchResult(result, uid) {

  return {
    type: RECEIVE_URL_SEARCH,
    result,
    uid
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_URL_ERROR,
    err
  }
}

export function getSearch(q, uid) {
  return dispatch => {
    dispatch(requestSearchResult(q, uid))
    return Get(
        '/api/searchurl',
        {q},
        POST_URL_SEARCH,
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveSearchResult(res.body, uid))
    )
  }
}

export function resetSearch(uid) {
  return {
    type: RESET_URL_SEARCH,
    uid
  }
}

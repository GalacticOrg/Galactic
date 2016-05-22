import { Get } from "./Api"
export const POST_URL_SEARCH = 'POST_URL_SEARCH'
export const RECEIVE_URL_SEARCH = 'RECEIVE_URL_SEARCH'
export const RECEIVE_URL_ERROR = 'RECEIVE_URL_ERROR'

function requestSearchResult(urlInput) {
  return {
    type: POST_URL_SEARCH,
    urlInput
  }
}

function receiveSearchResult(result) {
  return {
    type: RECEIVE_URL_SEARCH,
    result
  }
}

function receiveErr(err) {
  return {
    type: RECEIVE_URL_ERROR,
    err
  }
}



export function postSearch(q) {
  return dispatch => {
    dispatch(requestSearchResult(q))
    return Get(
        '/api/urlsearch',
        {q},
        (err, res)=>dispatch(receiveErr(err)),
        (err, res)=>dispatch(receiveSearchResult(res.body))
    )
  }
}

// if (err || !res.ok) {
//   alert('Oh no! error');
// } else {
//   alert('yay got ' + JSON.stringify(res.body));
// }

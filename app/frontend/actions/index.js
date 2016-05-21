export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export function requestSearchResult(urlInput) {
  return {
    type: POST_URL_SEARCH,
    urlInput
  }
}

function receiveSearchResult(result) {
  return {
    type: RECEIVE_POSTS,
    result
  }
}

function postSearch(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return setTimeout(function(){
        dispatch(receiveSearchResult("somemadeupthing"));
    },300)
  }
}

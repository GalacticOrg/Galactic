/**
 * app/frontend/Home/reducers/index.js
 * Copyright (c) 2016, WikiWeb
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import { RECEIVE_NODE_DATA, RECEIVE_CONNECTION_TAGS_RESULT } from '../actions'

const nodeResult = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NODE_DATA:
      return action.result
    case RECEIVE_CONNECTION_TAGS_RESULT:
      let obj = {...state}
      state.superEdges.forEach((superEdge, sei)=>{
        superEdge.edges.forEach((edge, ei)=>{
          if (edge._id === action.result.id){
            obj.superEdges[sei].edges[ei].tags = action.result.tags
          }
        })
      });
      return obj
    default:
      return state
  }
}

// const edgeResult = (state = {}, action) => {
//   switch(action.type) {
//     case RECEIVE_CONNECTION_TAGS_RESULT:
//       return action.result
//     default:
//       return state
//   }
// }

const nodeApp = combineReducers({
  userResult,
  nodeResult
})

export default nodeApp

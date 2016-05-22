import { combineReducers } from 'redux';
import userResult from '../../lib/userReducer'

const connectApp = combineReducers({
  userResult
})

export default connectApp

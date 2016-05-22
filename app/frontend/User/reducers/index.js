/**
 * app/frontend/User/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'

const connectApp = combineReducers({
  userResult
})

export default connectApp

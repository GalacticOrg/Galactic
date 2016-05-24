/**
 * app/frontend/Connect/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import inputURLResult from '../../components/inputURL/reducers'

const connectApp = combineReducers({
  userResult,
  inputURLResult
})

export default connectApp

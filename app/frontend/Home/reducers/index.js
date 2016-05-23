/**
 * app/frontend/Home/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'
import inputURLResult from '../../components/inputURL/reducers'

const homeApp = combineReducers({
  inputURLResult,
  userResult
})

export default homeApp

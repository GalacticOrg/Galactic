/**
 * app/frontend/Home/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'

const nodeApp = combineReducers({
  userResult
})

export default nodeApp

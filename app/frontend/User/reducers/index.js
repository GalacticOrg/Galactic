/**
 * app/frontend/User/reducers/index.js
 * Copyright (c) 2016, Galactic
*/

import { combineReducers } from 'redux';
import userResult from '../../components/users/reducers'

const userApp = combineReducers({
  userResult
})

export default userApp

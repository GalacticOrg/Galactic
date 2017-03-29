/**
 * app/frontend/User/index.js
 * Copyright (c) 2016, WikiWeb
*/

import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import userApp from './reducers'

import User from './containers/FirehoseMain.react'

import thunkMiddleware from 'redux-thunk'
let store = createStore(
  userApp,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  (<Provider store={store}>
    <User />
  </Provider>),
  document.getElementById('app')
);

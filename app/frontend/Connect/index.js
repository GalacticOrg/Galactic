/**
 * app/frontend/Home/index.js
 * Copyright (c) 2016, WikiWeb
*/

import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import connectApp from './reducers'

import Connect from './containers/ConnectMain.react'

import thunkMiddleware from 'redux-thunk'
let store = createStore(
  connectApp,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  (<Provider store={store}>
    <Connect />
  </Provider>),
  document.getElementById('app')
);

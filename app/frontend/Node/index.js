/**
 * app/frontend/Home/index.js
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import nodeApp from './reducers'

import NodeMain from './containers/NodeMain.react'

import thunkMiddleware from 'redux-thunk'
let store = createStore(
  nodeApp,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  (<Provider store={store}>
    <NodeMain />
  </Provider>),
  document.getElementById('app')
);

/**
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import homeApp from './reducers'
import Home from './containers/Home.react'

let store = createStore(homeApp)

ReactDOM.render(
  (<Provider store={store}>
    <Home />
  </Provider>),
  document.getElementById('app')
);

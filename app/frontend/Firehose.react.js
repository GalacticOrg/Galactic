/**
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react"

class Firehose extends React.Component {
  render() {
    return (<div>

      <h1>Firehose</h1>
      <a href="connect">/Connect</a>
      <br/>
      <a href="result">/Result</a>
      <br/>
      <a href="user">/User</a>
      <br/>
      <a href="firehose">/Firehose</a>
    </div>);
  }
}

ReactDOM.render(
  (<Firehose />),
  document.getElementById('app')
);

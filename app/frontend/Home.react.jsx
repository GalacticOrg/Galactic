/**
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react.jsx"

class Home extends React.Component {
  render() {
    return (<div>
      <Navbar />
      <h1>Home</h1>
      <a href="connect">/Connect</a>
      <br/>
      <a href="result">/Result</a>
      <br/>
      <a href="user">/User</a>
      <br />
      <a href="firehose">/Firehose</a>
    </div>);
  }
}

ReactDOM.render(
  (<Home />),
  document.getElementById('app')
);

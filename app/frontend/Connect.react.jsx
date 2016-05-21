/**
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react.jsx"

class Connect extends React.Component {
  render() {
    return (<div>
      <Navbar />
      Connect
    </div>);
  }
}

ReactDOM.render(
  (<Connect />),
  document.getElementById('app')
);

/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react.jsx"

class Result extends React.Component {
  render() {
    return (<div>
      <Navbar />
    </div>);
  }
}

ReactDOM.render(
  (<Result />),
  document.getElementById('app')
);

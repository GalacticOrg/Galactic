/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react"

class User extends React.Component {
  render() {
    return (<div>
      User
      <Navbar />
    </div>);
  }
}

ReactDOM.render(
  (<User />),
  document.getElementById('app')
);

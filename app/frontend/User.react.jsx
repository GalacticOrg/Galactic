/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";

export default class User extends React.Component {
  render() {
    return (<div>User</div>);
  }
}

ReactDOM.render(
  (<User />),
  document.getElementById('app')
);

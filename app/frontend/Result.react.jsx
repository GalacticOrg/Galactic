/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";

export default class Result extends React.Component {
  render() {
    return (<div>Result</div>);
  }
}

ReactDOM.render(
  (<Result />),
  document.getElementById('app')
);

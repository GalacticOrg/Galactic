/**
 * Copyright (c) 2016, Galactic
*/

import React from "react";

import LoginSignupModal from "./LoginSignupModal.react.jsx"

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header pull-left">
          <a className="navbar-brand" href="/">GALACTIC</a>
        </div>
        <div className="navbar-header pull-right">
          <a href="connect"><button type="button" className="btn btn-default navbar-btn connect-icon-box"><img className="connect-icon" src="/img/galactic-icon-logo.png" /></button></a>
          <a href="user">
            <button onClick={this.open} type="button" className="btn btn-default navbar-btn user-icon-box"><img className="user-icon" src="/img/most-beautiful-example-user.jpeg" /></button>
            </a>
        </div>
      </div>
    );
  }
};

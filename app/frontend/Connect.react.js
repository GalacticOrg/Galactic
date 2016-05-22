/**
 * Copyright (c) 2016, Galactic
*/

import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react"

class Connect extends React.Component {
  render() {
    return (<div>
      <Navbar />
      <div style={{backgroundColor: '#f0f0f0', paddingBottom: '20px'}}>
        <div className="container">
          <div className="row pageTitle" >
            <div className="col-md-3 col-md-offset-1">/Connect</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row connectFirstNode">
          <div>
            <div className="col-md-3 col-md-offset-1">.col-md-3</div>
            <div className="col-md-3">.col-md-3</div>
            <div className="col-md-3">.col-md-3</div>
          </div>
        </div>
      </div>
    </div>);
  }
}

ReactDOM.render(
  (<Connect />),
  document.getElementById('app')
);

/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react"

class User extends React.Component {
  render() {
    return (<div>
       <div style={{backgroundColor: '#f0f0f0', paddingBottom: '20px'}}>
        <div className="container">
          <div className="row pageTitle" >
            <div className="col-md-3 col-md-offset-1">&#47;@mceoin</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div style={{display: 'block'}}>
            <img style={{maxWidth: '300px', margin: 'auto', display: 'block'}} src="/img/aharef.jpg" />
          </div>
        </div>
        <hr />
        <div className="row" style={{marginTop: '30px'}}>
          <div className="col-md-5 col-md-offset-1">
            <span style={{display: 'inline-block'}}>
              <img style={{padding: '1px', border: "2px solid black"}} src="/img/most-beautiful-example-user.jpeg" />
              </span>
            <span style={{display: 'inline-block', marginLeft: '20px'}}>
              <div style={{fontSize: '20px'}}>Eoin McMillan</div>
              <div style={{marginTop: '2px', fontSize: '16px'}}>@mceoin</div>
              <div style={{marginTop: '2px'}}>287 connections</div>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-md-offset-1" style={{marginTop: '30px'}}>
            <div
              className="col-md-6"
              style={{
                display: 'inline-block',
                borderLeft: '1px solid',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderRight: '1px dotted',
                paddingTop: '7px'
              }}>
              <p>Node A URL</p>
              <p>http:&#47;&#47;nodeaurl.com</p>
              </div>
            <div
              className="col-md-6"
              style={{
                display: 'inline-block',
                borderLeft: '1px dotted',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderRight: '1px solid',
                paddingTop: '7px'
              }}>
              <p>Node B URL</p>
              <p>http:&#47;&#47;nodeburl.com</p>
            </div>
          </div>
          <div className="col-md-9 col-md-offset-1" style={{marginTop: '30px'}}>
            <div
              className="col-md-6"
              style={{
                display: 'inline-block',
                borderLeft: '1px solid',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderRight: '1px dotted',
                paddingTop: '7px'
              }}>
              <p>Node A URL</p>
              <p>http:&#47;&#47;nodeaurl.com</p>
              </div>
            <div
              className="col-md-6"
              style={{
                display: 'inline-block',
                borderLeft: '1px dotted',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderRight: '1px solid',
                paddingTop: '7px'
              }}>
              <p>Node C URL</p>
              <p>http:&#47;&#47;nodecurl.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

ReactDOM.render(
  (<User />),
  document.getElementById('app')
);

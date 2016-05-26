/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, Galactic
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Loader from 'react-loader';

import Navbar from "../../components/Navbar.react"
import Connection from "../../components/Connection.react"

import { connect } from 'react-redux'
import { getUserEdges } from "../actions/index"


class User extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserEdges(window.location.pathname.replace('/@',''))) //@todo include this in the page
  }

  render() {
    const { dispatch, userEdgeResult, result, profile } = this.props

    if (!result) {
      return (
        <div>
          <Navbar dispatch={dispatch} />
          <Loader top={'30%'} />
        </div>
      )
    }

    const username = profile.username;
    const profile_image_url_https = profile.twitter.profile_image_url_https


    const connections = result.map((edge, i)=> (
      <Connection
        key={i}
        nodeTo={edge.nodeTo}
        nodeFrom={edge.nodeFrom}
        user={profile}
        createdAt={edge.createdAt}/>)
    )

    return (<div>
      <Navbar dispatch={dispatch} />
      <div style={{backgroundColor: '#f0f0f0', paddingBottom: '20px'}}>
        <div className="container">
          <div className="row pageTitle" >
            <div className="col-md-3 col-md-offset-1">&#47;{"@"+username}</div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" style={{marginTop: '20px'}}>
          <div className="col-md-5 col-md-offset-1">
            <div style={{float: 'left'}}>
              <img style={{padding: '1px', border: '2px solid black'}} src={profile_image_url_https} />
              </div>
            <div style={{float: 'left', marginLeft: '20px'}}>
              <div style={{fontSize: '20px'}}>{name}</div>
              <a href={'https://twitter.com/@'+username} style={{textDecoration: 'none', color: 'inherit'}}><div style={{fontSize: '16px', textDecoration: 'none', color: 'inherit'}}>{'@'+username}</div></a>
              <div style={{marginTop: '2px'}}>287 connections</div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-offset-1" style={{marginTop: '15px'}}>
            <p>Connections:</p>
            <ul>
              {connections}
            </ul>
          </div>
        </div>
      </div>
    </div>);
  }
};


function mapStateToProps(state) {
  const { userEdgeResult:{ result, profile }, userResult } = state
  return {
    result,
    profile,
    userResult
  }
}

export default connect(mapStateToProps)(User)

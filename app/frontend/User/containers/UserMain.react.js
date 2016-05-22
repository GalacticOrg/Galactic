/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, Galactic
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Navbar from "../../components/Navbar.react"
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const { dispatch, user, success } = this.props

    if (user) {
      const { name, twitter: { description, profile_image_url_https }
      } = user;
    } else { return <Navbar dispatch={dispatch} /> }


    return (<div>
      <Navbar dispatch={dispatch} />
      <div style={{backgroundColor: '#f0f0f0', paddingBottom: '20px'}}>
        <div className="container">
          <div className="row pageTitle" >
            <div className="col-md-3 col-md-offset-1">&#47;{"@"+user.username}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row" style={{marginTop: '20px'}}>
          <div className="col-md-5 col-md-offset-1">
            <div style={{float: 'left'}}>
              <img style={{padding: '1px', border: '2px solid black'}} src={user.twitter.profile_image_url_https} />
              </div>
            <div style={{float: 'left', marginLeft: '20px'}}>
              <div style={{fontSize: '20px'}}>{name}</div>
              <a href={'https://twitter.com/@'+user.username} style={{textDecoration: 'none', color: 'inherit'}}><div style={{fontSize: '16px', textDecoration: 'none', color: 'inherit'}}>{'@'+user.username}</div></a>
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
              <li className="connectionLiElement"><a href="#">{"@"+user.username}</a> connected <a href="#">nautil.us/issue/9/time/how-music-hijacks-our-perception-of-time</a> to <a href="#">medium.com/@tristanharris/how-technology-hijacks-peoples-minds-from-a-magician-and-google-s-design-ethicist</a></li>
              <li className="connectionLiElement"><a href="#">{"@"+user.username}</a> connected <a href="#">landapart.com</a> to <a href="#">hipcamp.com</a></li>
              <li className="connectionLiElement"><a href="#">{"@"+user.username}</a> connected <a href="#">hipcamp.com</a> to <a href="#">reserveamerica.com</a></li>
              <li className="connectionLiElement"><a href="#">{"@"+user.username}</a> connected <a href="#">dropbox.com</a> to <a href="#">box.net</a></li>
              <li className="connectionLiElement"><a href="#">{"@"+user.username}</a> connected <a href="#">svbtle.com</a> to <a href="#">medium.com</a></li>
              <li className="connectionLiElement"><a href="#">{"@"+user.username}</a> connected <a href="#">medium.com</a> to <a href="#">tumblr.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
  }
};


function mapStateToProps(state) {
  const { user, success } = state.userResult
  return {
    success,
    user
  }
}

export default connect(mapStateToProps)(User)
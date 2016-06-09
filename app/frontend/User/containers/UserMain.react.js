/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Loader from 'react-loader';

import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/Entity/"
import EdgeConnection from "../../components/EdgeConnection"

import { connect } from 'react-redux'
import { getUserEdges } from "../actions/index"

const connectLine = {
  borderLeft: "2px solid orange",
  marginLeft: '23px',
  height: '6em'
}

const connectLineParent = {
  height: "0px",
  overflow: 'visible',
  marginTop: '-3em',
  marginBottom: '3em'
}

class User extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserEdges(window.location.pathname.replace('/@',''))) //@todo include this in the page
  }

  render() {
    const { dispatch, result, profile } = this.props

    if (!result || !profile) {
      return (
        <div>
          <Navbar dispatch={dispatch} />
          <Loader top={'30%'} />
        </div>
      )
    }


    const name = profile.name;
    const username = profile.username;
    const profile_image_url_https = profile.twitter.profile_image_url_https

    const connections = result.map(function(edge, i){
      const { nodeFrom, nodeTo, createdAt, nodeFromEntityCount, nodeToEntityCount } = edge;
      return (
        <div
          key={i}
          style={{backgroundColor:'rgb(249, 248, 241)',
                  borderRadius:'4px',
                  padding:'4px',
                  paddingLeft: '6px',
                  margin: '10px',
                  border: '1px #eee solid',
                }}>
          <EntityItem
            count={nodeFromEntityCount}
            imageCDN={nodeFrom.imageCDN.url?nodeFrom.imageCDN.url:''}
            faviconCDN={nodeFrom.faviconCDN?nodeFrom.faviconCDN:''}
            canonicalLink={nodeFrom.canonicalLink}
            title={nodeFrom.title}
            description={nodeFrom.description}
            id={nodeFrom._id}
            createdAt={Number(createdAt)}
          />
          <div style={connectLineParent}><div style={connectLine}></div></div>
          <EntityItem
            count={nodeToEntityCount}
            imageCDN={nodeTo.imageCDN.url?nodeTo.imageCDN.url:''}
            faviconCDN={nodeTo.faviconCDN?nodeTo.faviconCDN:''}
            canonicalLink={nodeTo.canonicalLink}
            title={nodeTo.title}
            description={nodeTo.description}
            id={nodeTo._id}
            createdAt={Number(createdAt)}
           />
          <EdgeConnection
            edges={[{...edge, user:profile}]}
            index={0}
            />
        </div>)
    });


    return (<div>
      <Navbar dispatch={dispatch} />
      <div style={{backgroundColor: '#f0f0f0', padding: '20px'}}>
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
            <p><b>@{username}'s Connections:</b></p>
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

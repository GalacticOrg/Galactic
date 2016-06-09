/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Loader from 'react-loader';

import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/Entity/"
import EdgeConnection from "../../components/EdgeConnection/"
import Tags from "../../components/Tags.react"


import { connect } from 'react-redux'
import { getUserEdges } from "../actions/index"

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
      const { nodeFrom, nodeTo, createdAt, nodeFromEntityCount, nodeToEntityCount, tags } = edge;
      return (
        <div
          key={i}
          className="default-card"
          >
          <div style={{
                  border: 'none',
                  paddingTop: '10px',
                  paddingBottom: '8px'}}>
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
          </div>
          <div style={{
                  border: 'none',
                  paddingTop: '10px',
                  paddingBottom: '8px'}}>
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
          </div>
          <div className='edge-card-info'>
            <EdgeConnection
              edges={[{...edge, user:profile}]}
              index={0}
              />
          </div>
          <div style={{
              display: 'block',
              overflow: 'hidden',
              border: 'none',
              marginTop: '3px',
              marginBottom: '3px'
            }}>
            <div className="card-left-col">
              <img src="../../img/blank.png" />
            </div>
            <div className="card-right-col"
                 style={{paddingLeft: '5px'}}>
              <Tags tags={tags}/>
            </div>
          </div>
        </div>)
    });


    return (<div style={{backgroundColor:'white'}}>
      <Navbar dispatch={dispatch} />

      <div style={{paddingTop:'40px', marginBottom: '40px'}}>
        <div className="container">
          <div className="row" style={{marginTop: '20px'}}>
            <div className={
                  ['col-xs-12',
                  'col-sm-10',
                  'col-sm-offset-1',
                  'col-md-8',
                  'col-md-offset-2'].join(' ')
              }>
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
      </div>

      <div style={{borderTop: '1px solid rgb(225, 232, 237)', backgroundColor: '#F5F8FA', paddingTop: '5px'}}>
        <div className="container">
          <div className="row">
            <div  style={{marginTop: '15px'}}
                  className={
                  ['col-xs-12',
                  'col-sm-10',
                  'col-sm-offset-1',
                  'col-md-8',
                  'col-md-offset-2'].join(' ')
              }>
              {connections}
            </div>
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

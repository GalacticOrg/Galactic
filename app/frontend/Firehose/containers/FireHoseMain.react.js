/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Loader from 'react-loader';

import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/EntityItem.react"
import EdgeConnection from "../../components/EdgeConnection.react"

import { connect } from 'react-redux'
import { getFirehose } from "../actions/index"


class User extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getFirehose())
  }

  render() {
    const { dispatch, firehoseResult, userResult } = this.props

    if (!firehoseResult){
      return (
        <div>
          <Navbar dispatch={dispatch} />
          <Loader top="30%" />
        </div>
      )
    }


    const connections = firehoseResult?
    firehoseResult.map(function(edge, i) {
      const { user, nodeFrom, nodeTo, createdAt } = edge;
      return (
        <div
          key={i}
          style={{backgroundColor:'#eee',
                  borderRadius:'4px',
                  padding:'4px',
                  margin: '10px'}}>
          <EntityItem
            imageCDN={nodeFrom.imageCDN.url?nodeFrom.imageCDN.url:''}
            faviconCDN={nodeFrom.faviconCDN?nodeFrom.faviconCDN:''}
            canonicalLink={nodeFrom.canonicalLink}
            title={nodeFrom.title}
            description={nodeFrom.description}
            id={nodeFrom._id}
          />
          <EntityItem
            imageCDN={nodeTo.imageCDN.url?nodeTo.imageCDN.url:''}
            faviconCDN={nodeTo.faviconCDN?nodeTo.faviconCDN:''}
            canonicalLink={nodeTo.canonicalLink}
            title={nodeTo.title}
            description={nodeTo.description}
            id={nodeTo._id}
          />
          <EdgeConnection
            username={user.username}
            profileImageUrl={user.twitter.profile_image_url}
            createdAt={Number(createdAt)}
            />
        </div>)
    }):null;

    return (<div>
      <Navbar dispatch={dispatch} />
      <div style={{backgroundColor: '#f0f0f0', paddingBottom: '20px'}}>
        <div className="container">
          <div className="row pageTitle" >
            <div className="col-md-3 col-md-offset-1">/Firehose</div>
          </div>
        </div>
      </div>

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
  const { firehoseResult, userResult } = state
  return {
    firehoseResult,
    userResult
  }
}

export default connect(mapStateToProps)(User)

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
import { getFirehose } from "../actions/index"


class User extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getFirehose('jeffj'))
  }

  render() {
    const { dispatch, firehoseResult, userResult } = this.props

    if (!userResult.loading) {
      const { user:{ name, twitter: { description }
    } } = userResult;

  } else { return (
        <div>
          <Navbar dispatch={dispatch} />
          <Loader top={'30%'} />
        </div>
      )
    }

    const user = userResult.user
    const profile_image_url_https = userResult.user.twitter.profile_image_url_https


    const connections = firehoseResult.map((edge, i)=> (
      <Connection
        key={i}
        nodeTo={edge.nodeTo}
        nodeFrom={edge.nodeFrom}
        user={user}
        createdAt={edge.createdAt} />)
    )

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

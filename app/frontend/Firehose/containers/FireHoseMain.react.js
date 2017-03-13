/**
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Loader from 'react-loader';
import moment from 'moment';
import Navbar from "../../components/Navbar.react";
import { connect } from 'react-redux';
import { getFirehose } from "../actions/index";

class Firehose extends Component {

  componentWillMount (){
    const { dispatch } = this.props;
    dispatch(getFirehose())
  }

  timeparser (timeStamp){
    return moment(timeStamp).format('dddd, MMMM D, YYYY');
  }

  render() {
    const that = this;
    const { dispatch, firehoseResult, userResult } = this.props
    if (!firehoseResult){
      return (
        <div>
          <Navbar dispatch={dispatch} />
          <Loader top="30%" />
        </div>
      )
    }

    console.log(firehoseResult)

    const connections = firehoseResult ?
      firehoseResult.map(function(edge, i) {
        const { user, nodeFrom, nodeTo, createdAt } = edge;
        const paddingTop = i === 0 ? 8 : 0 ;
        const borderTop = i === 0 ? 'none' : '2px solid rgba(0,0,0,0.075)';
        const borderBottom = i + 1 === firehoseResult.length ? 'none' : '2px solid rgba(0,0,0,0.04)';
        return (
          <div key={i} style={{ backgroundColor: 'white' }}>
            <div style={{ display: 'flex', alignSelf: 'center', flexDirection: 'column', height: 48, borderBottom: borderBottom, borderTop: borderTop }}>
              <div style={{ marginTop: 'auto', marginBottom: 'auto', fontWeight: 700, marginLeft: 20 }}>
                <span>
                  <a href={`/@${user.username}`} className="noUnderline" style={{ color: 'rgb(51, 51, 51)' }}>@{ user.username }</a> - {that.timeparser(createdAt)}
                </span>
              </div>
            </div>
            <div style={{ paddingTop: paddingTop, marginLeft: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
                <span style={{ marginTop: '-2px', marginRight: 16 }}>
                  <img src={nodeFrom.faviconCDN  === null ? '/img/default-favicon.png' : nodeFrom.faviconCDN } style={{ height: 16, width: 16 }} />
                </span>
                <span style={{ color: 'rgb(51, 51, 51)', fontSize: 13, fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
                  <a href={nodeFrom.canonicalLink} style={{ color: 'rgb(51, 51, 51)' }} className="noUnderline">
                    {nodeFrom.title}
                  </a>
                </span>
                <span style={{ paddingLeft: 16, paddingRight: 8, color: 'rgb(117, 117, 117)', fontSize: 13, fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
                  {nodeFrom.domain}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
                <span style={{ marginTop: '-2px', marginRight: 16 }}>
                  <img src={nodeTo.faviconCDN  === null ? '/img/default-favicon.png' : nodeTo.faviconCDN } style={{ height: 16, width: 16 }} />
                </span>
                <span style={{ color: 'rgb(51, 51, 51)', fontSize: 13, fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
                  <a href={nodeTo.canonicalLink} style={{ color: 'rgb(51, 51, 51)' }} className="noUnderline">{nodeTo.title}</a>
                </span>
                <span style={{ paddingLeft: 16, paddingRight: 8, color: 'rgb(117, 117, 117)', fontSize: 13, fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
                  {nodeTo.domain}
                </span>
              </div>
            </div>
          </div>)
      }) : <div>User has no connections.</div>;

    return (
      <div style={{ backgroundColor: 'rgb(245, 248, 250)' }}>
        <Navbar dispatch={dispatch} />
        <div style={{ backgroundColor: '#f0f0f0', paddingBottom: 18, boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}>
          <div className="container">
            <div className="row pageTitle" >
              <div className="col-md-3 col-md-offset-1" style={{ paddingTop: 15, fontSize: '20px', fontWeight: 700 }}>/Firehose</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="container">
          <div className="row">
            <div className="col-md-9 col-md-offset-1" style={{ marginTop: '15px', boxShadow: '0 0 2px rgba(0,0,0,0.2)', padding: 0 }}>
              {connections}
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

export default connect(mapStateToProps)(Firehose)

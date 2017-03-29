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

    const connections = firehoseResult ?
      firehoseResult.map(function(edge, i) {
        const { user, nodeFrom, nodeTo, createdAt } = edge;
        const borderTop = i === 0 ? 'none' : '2px solid rgba(0,0,0,0.075)';
        return (
          <div key={i} style={{ backgroundColor: 'white' }}>
            <div style={{ display: 'flex', alignSelf: 'center', flexDirection: 'column', height: 48, borderBottom: '2px solid rgba(0,0,0,0.04)', borderTop: borderTop }}>
              <div style={{ marginTop: 'auto', marginBottom: 'auto', fontWeight: 500, marginLeft: 20 }}>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <a href={`/@${user.username}`} className="noUnderline" style={{ color: 'rgb(51, 51, 51)' }}>@{ user.username }</a> - {that.timeparser(createdAt)}
                </span>
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
                <span style={{ marginTop: '-2px', marginRight: 16 }}>
                  <img src={nodeFrom.faviconCDN  === null ? '/img/default-favicon.png' : nodeFrom.faviconCDN } style={{ height: 16, width: 16 }} />
                  <div style={{ 
                    position: 'absolute', 
                    marginTop: '-9px', 
                    marginLeft: '-12px', 
                    width: 8, 
                    height: 47, 
                    borderTop: '2px solid rgba(128,0,128,0.5)', 
                    borderBottom: '2px solid rgba(128,0,128,0.5)', 
                    borderLeft: '2px solid rgba(128, 0, 128, 0.498039)', 
                    color: 'white' }}>
                  </div>
                </span>
                <span style={{ color: 'rgb(51, 51, 51)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
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
                <span style={{ color: 'rgb(51, 51, 51)', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
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
        <div className="container">
          <div className="row">
            <div style={{ height: 45, marginTop: 35, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(128, 0, 128, 0.3)' }} className={['col-xs-12', 'col-sm-10', 'col-sm-offset-1', 'col-md-8', 'col-md-offset-2'].join(' ')}>
              <span><strong>Recent Contributions:</strong></span>
            </div>
            <div style={{ boxShadow: '0 0 2px rgba(0,0,0,0.2)', padding: 0 }} className={['col-xs-12', 'col-sm-10', 'col-sm-offset-1', 'col-md-8', 'col-md-offset-2'].join(' ')}>
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

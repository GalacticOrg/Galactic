/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Loader from 'react-loader';
import moment from 'moment';
import Navbar from "../../components/Navbar.react";
import EntityItem from "../../components/Entity/";
import EdgeConnection from "../../components/EdgeConnection/";
import Tags from "../../components/Tags.react";
import { connect } from 'react-redux';
import { getUserEdges } from "../actions/index";

class User extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserEdges(window.location.pathname.replace('/@',''))) //@todo include this in the page
  }

  timeparser (timeStamp){
    return moment(timeStamp).format('dddd, MMMM D, YYYY');
  }


  render() {
    const that = this;
    const { dispatch, result, profile } = this.props;

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
    const profile_image = profile.profile_image;

    const connections = result ?
      result.map(function(edge, i) {
        const { user, nodeFrom, nodeTo, createdAt } = edge;
        const borderTop = i === 0 ? 'none' : '2px solid rgba(0,0,0,0.075)';
        return (
          <div key={i} style={{ backgroundColor: 'white' }}>
            <div style={{ display: 'flex', alignSelf: 'center', flexDirection: 'column', height: 48, borderBottom: '2px solid rgba(0,0,0,0.04)', borderTop: borderTop }}>
              <div style={{ marginTop: 'auto', marginBottom: 'auto', fontWeight: 500, marginLeft: 20 }}>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {that.timeparser(createdAt)}
                </span>
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
                <span style={{ marginTop: '-2px', marginRight: 16 }}>
                  <img src={nodeFrom.faviconCDN  === null ? '/img/default-favicon.png' : nodeFrom.faviconCDN } style={{ height: 16, width: 16 }} />
                  <div style={{ position: 'absolute', marginTop: 3, width: 1, height: 22, marginLeft: 7, borderRight: '2px solid rgba(128,0,128,0.5)', color: 'white' }}></div>
                </span>
                <span style={{ color: 'rgb(51, 51, 51)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13, fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
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
                  <a href={nodeTo.canonicalLink} style={{ color: 'rgb(51, 51, 51)' }} className="noUnderline">
                    {nodeTo.title}
                  </a>
                </span>
                <span style={{ paddingLeft: 16, paddingRight: 8, color: 'rgb(117, 117, 117)', fontSize: 13, fontFamily: 'Roboto, "Helvetica Neue", "Lucida Grande", sans-serif' }}>
                  {nodeTo.domain}
                </span>
              </div>
            </div>
          </div>)
      }) : null;


    return (
      <div style={{ backgroundColor: 'rgb(245, 248, 250)'}} >
        <Navbar dispatch={dispatch} />

        <div style={{paddingBottom: 20, backgroundColor: 'rgba(128,0,128, 0.3)', boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}>
          <div className="container">
            <div className="row" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', padding: 0 }} className={['col-xs-12', 'col-sm-10', 'col-sm-offset-1', 'col-md-8', 'col-md-offset-2'].join(' ')}>
                <div className="userBox">
                  <img style={{padding: '1px', border: '2px solid black'}} src={profile_image} />
                </div>
                <div style={{float: 'left', marginLeft: '20px'}}>
                  <div style={{ fontSize: '18px', lineHeight: '18px' }}>{name}</div>
                  <div>
                    <span style={{fontSize: '13px', textDecoration: 'none', color: 'inherit'}}>
                      {'@'+username}
                    </span>
                    <span style={{ marginLeft: 8, marginTop: '-3px', lineHeight: '24px' }}>
                      <a href={'https://twitter.com/@'+username}>
                        <img src="img/twitter-icon-16x16.png" style={{ height: 12, width: 12 }}/>
                      </a>
                    </span>
                  </div>
                  <div style={{marginTop: '-4px'}}>
                    <span style={{ fontSize: '13px' }}>
                      {result.length > 1 ? result.length + ' connections' : result.length + ' connection'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }} className="container">
          <div className="row">
            <div style={{ marginTop: '15px', boxShadow: '0 0 2px rgba(0,0,0,0.2)', padding: 0 }} className={['col-xs-12', 'col-sm-10', 'col-sm-offset-1', 'col-md-8', 'col-md-offset-2'].join(' ')}>
              {connections}
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

/**
  * app/frontend/User/containers/UserMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Loader from 'react-loader';
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

  render() {
    const { dispatch, result, profile } = this.props;

    console.log(this.props)

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

    const connections = result.map(function(edge, i){
      const { nodeFrom, nodeTo, createdAt, nodeFromEntityCount, nodeToEntityCount, tags } = edge;

      return (
        <div key={i} className="default-card">
        
        </div>)
    });


    return (
      <div style={{backgroundColor:'white'}}>
        <Navbar dispatch={dispatch} />

        <div style={{paddingTop:'40px', marginBottom: '40px'}}>
          <div className="container">
            <div className="row" style={{marginTop: '20px'}}>
              <div style={{display: 'flex', flexDirection: 'row'}} className={['col-xs-12', 'col-sm-10', 'col-sm-offset-1', 'col-md-8', 'col-md-offset-2'].join(' ')}>
                <div style={{float: 'left'}}>
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
                      {result.length > 1 ? result.length + ' connections' : result.length + 'connection'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{borderTop: '1px solid rgb(225, 232, 237)', backgroundColor: '#F5F8FA', paddingTop: '5px'}}>
          <div className="container">
            <div className="row">
              <div style={{marginTop: '15px'}} className={['col-xs-12', 'col-sm-10', 'col-sm-offset-1', 'col-md-8', 'col-md-offset-2'].join(' ')}>
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

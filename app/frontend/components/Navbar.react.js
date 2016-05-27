/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component } from 'react'
import LoginSignupModal from "./LoginSignupModal.react"
import { getProfile } from './users/actions'
import { connect } from 'react-redux'

class Navbar extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProfile());
  }

  render() {
    const { user, success, loading } = this.props;
    if (loading) return null;

    return (
      <div className="navbar navbar-default navbar-fixed-top" style={{backgroundColor: '#F6F6EF'}}>
        <div className="navbar-header pull-left">
          <a className="navbar-brand" href="/">WikiWeb</a>
        </div>
        <div className="navbar-header pull-right">
          <a href="/connect">
            <button type="button" className="btn btn-default navbar-btn connect-icon-box">
              Add Connection</button>
          </a>
          {!success?
            <LoginSignupModal />:
            (
              <a
                type="button"
                href={'/@'+user.username}
                className="btn btn-default navbar-btn user-icon-box">
                <img className="user-icon"
                  src={user.twitter.profile_image_url_https} />
              </a>
            )}
        </div>
      </div>
    );
  }
};


function mapStateToProps(state) {
  const { user, success } = state.userResult
  return {
    success,
    user
  }
}

export default connect(mapStateToProps)(Navbar)

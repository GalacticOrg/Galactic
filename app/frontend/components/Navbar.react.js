/**
 * Copyright (c) 2016, Galactic
*/

import React from "react";
import LoginSignupModal from "./LoginSignupModal.react"
import { getProfile } from './users/actions'
import { connect } from 'react-redux'

class Navbar extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProfile());
  }

  render() { debugger
    const { user, success, loading } = this.props;
    if (loading) return null;

    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header pull-left">
          <a className="navbar-brand" href="/">GALACTIC</a>
        </div>
        <div className="navbar-header pull-right">
          <a href="connect">
            <button type="button" className="btn btn-default navbar-btn connect-icon-box">
              <img className="connect-icon" src="/img/galactic-icon-logo.png" /></button>
          </a>
          {!success?
            <LoginSignupModal />:
            (
              <a
                type="button"
                href="/user"
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

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
      <div className="navbar navbar-default navbar-fixed-top" style={{backgroundColor: '#F5F8FA'}}>
        <div className="navbar-header pull-left">
          <a className="navbar-brand" href="/">WikiWeb</a>
        </div>
        <div className="navbar-header pull-right">
          <a href="/connect">
            <button type="button" className="btn btn-default navbar-btn connect-icon-box fa fa-plus" style={{fontSize: '15px', height: '32px', borderColor: 'orange', marginRight: '10px'}}></button>
          </a>
          {!success?
            <LoginSignupModal />:
            (
              <a
                type="button"
                href={'/@'+user.username}
                style={{marginRight: '20px'}}>
                <img style={{height: '32px', borderRadius: '3px', border: '1px solid rgb(197, 197, 197)'}}
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

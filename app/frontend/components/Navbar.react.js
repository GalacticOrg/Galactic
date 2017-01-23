/**
 * Copyright (c) 2017, WikiWeb
*/

import React, { Component } from 'react';
import LoginSignupModal from './LoginSignupModal.react';
import { getProfile } from './users/actions';
import { connect } from 'react-redux';

class Navbar extends Component {

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch(getProfile());
  }

  render () {
    const { user, success, loading } = this.props;
    if (loading) return null;

    return (
      <div className="navbar navbar-default navbar-fixed-top" style={{ backgroundColor: '#F5F8FA' }}>
        <div className="navbar-header pull-left">
          <a className="navbar-brand" href="/">WikiWeb</a>
        </div>
        <div className="navbar-header pull-right" style={{ marginRight:'10px' }}>
          {!success ?
            <LoginSignupModal /> :
            (
              <a type="button" href={'/@' + user.username} >
                <img src={user.profile_image} style={{ marginTop: 8, height: '32px', borderRadius: '3px' }} />
              </a>
            )}
        </div>
      </div>
    );
  }
}


function mapStateToProps (state) {
  const { user, success } = state.userResult;
  return {
    success,
    user
  };
}

export default connect(mapStateToProps)(Navbar);

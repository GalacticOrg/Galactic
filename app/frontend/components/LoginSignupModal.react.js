/**
 * Copyright (c) 2016, Galactic
*/

import React from "react";
import { Modal} from "react-bootstrap"
import { getProfile } from './users/actions'

export default class LoginSignupModal extends React.Component {

  constructor(props) {
     super(props);
     this.state = {showModal: false};
     this.close = this.close.bind(this);
     this.open = this.open.bind(this);
   }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  constructModal() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton className="loginModalHeader">
          <img className="modalHeaderIcon" src="/img/galactic-logo-full.png" />
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="explanatoryModalText">Sign in to Galactic to connect ideas together and access a new way of exploring the Internet.</p>
          </div>
          <div>
            <form action="/auth/twitter" method="GET">
              <button
                className="loginButtonTwitter"
                type="submit"
              >
                <i style={{fontSize:"3rem", marginRight:"20px", verticalAlign: "-5px"}} className="fa fa-twitter" aria-hidden="true"></i>
                <span className="loginButtonText">
                  Continue with Twitter
                </span>
              </button>
          </form>
          </div>
        </Modal.Body>
        <Modal.Footer className="top-twenty">
          <p className="permissionsText">By signing up with Twitter, we’ll start you off with a network by automatically importing any followers/followees or friends already on Galactic. Also, we’ll never post to Twitter without your permission.
          </p>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    return (
      <span>
        {this.constructModal()}
        <button
          type="button"
          onClick={this.open}
          className="btn btn-default navbar-btn user-icon-box">
            Login
        </button>
      </span>
    );
  }
};

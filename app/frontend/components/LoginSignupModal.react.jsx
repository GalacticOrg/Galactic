/**
 * Copyright (c) 2016, Galactic
*/

import React from "react";
import { Modal} from "react-bootstrap"

export default class LoginSignupModal extends React.Component {

  constructor(props) {
     super(props);
     this.state = {count: props.initialCount};
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
            <button
              className="loginButtonTwitter"
              onClick={this.open}
            ><img className="loginButtonTwitterIcon" src="/img/TwitterLogo_white.png" /><span className="loginButtonText">Continue with Twitter</span>
            </button>
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
        <button type="button" onClick={this.open} className="btn btn-default navbar-btn user-icon-box"><img className="user-icon" src="/img/most-beautiful-example-user.jpeg" /></button>
      </span>
    );
  }
};

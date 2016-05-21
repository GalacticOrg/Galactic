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
        <Modal.Header closeButton>
          <Modal.Title>Sign up / Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="twitterModalLogo" src="/img/twitter_520x520.png" />
          <button
            className="btn btn-primary"
            onClick={this.open}
          >
            Login With Twitter
          </button>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={this.close}
            className="btn btn-primary">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {

    return (
      <div>
        {this.constructModal()}
        <button
          className="btn btn-primary"
          onClick={this.open}
        >
          Launch Login Modal
        </button>
      </div>
    );
  }
};

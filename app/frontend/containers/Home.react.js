import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../components/Navbar.react"
import LoginSignupModal from "../components/LoginSignupModal.react"
import { FormGroup, FormControl, Button, InputGroup, Glyphicon } from "react-bootstrap"

class Home extends Component {
  render() {
    return (<div>
      <Navbar />
      <div>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div>
        <form className="homepageUrlSearchForm">
          <FormGroup className="homepageUrlFormGroup">
            <InputGroup className="homepageUrlSearchInputGroup">
              <FormControl className="homepageUrlSearchBox" type="text"/>
              <InputGroup.Addon className=" homepageUrlSearchIconBox" >
                <Glyphicon glyph="search" bsStyle="success"/>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    </div>);
  }
}

export default connect()(Home)

import React, { Component } from 'react'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"


export default class Home extends Component {

  render() {

    return (<div>
      <Navbar />
      <div>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div>
      <InputURL />
      </div>
    </div>);
  }
}

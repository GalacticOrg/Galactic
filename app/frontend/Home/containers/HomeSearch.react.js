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
      <div style={{backgroundColor:'#6699FF'}}>
        <ol className="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1" className=""></li>
              <li data-target="#carousel-example-generic" data-slide-to="2" className=""></li>
        </ol>
      </div>
    </div>);
  }
}

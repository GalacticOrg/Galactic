import React, { Component } from 'react'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"

export default class Home extends Component {

  constructor(props) {
     super(props);
     this.state = {
       messageIndex: 1,
       messages:[
         'a','b', 'c'
       ]
     };
   }
  render() {
    let messageIndex = this.state.messageIndex;
    return (<div>
      <Navbar />
      <div>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div>
      <InputURL />
      </div>
      <div >
        {this.state.messages[messageIndex]}
        <ol style={{backgroundColor:'#6699FF', position:'inherit'}}className="indicators">
          {this.state.messages.map((d, i)=>(<li className={messageIndex==i?'active':''}></li>))}
        </ol>
      </div>
    </div>);
  }
}

import React, { Component } from 'react'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"

export default class Home extends Component {

  constructor() {
     super();
     this.state = {
       messageIndex: 1,
       messages:[
         'Galactic helps you see',
         'Sometimes, it helps you sleep',
         'If in doubt, listen to the greeks'
      ]
    };
  }

  render() {
    let messageIndex = this.state.messageIndex;
    const that = this;
    return (<div>
      <Navbar />
      <div>
        <img className="homepageGalacticIcon" src="/img/constellation_2.png"/>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div>
      <InputURL />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>
            <ol style={{position:'inherit', display: 'block', margin: 'auto', textAlign: 'center', marginTop: '10px'}} className="indicators">
              <div style={{display: 'block', margin: 'auto', textAlign: 'center', marginBottom: '3px'}}>{this.state.messages[messageIndex]}
              </div>
              {this.state.messages.map((d, i)=>(
                <a href="javascript:void(0)" key={i} onClick={that.changeMessage.bind(that, i)}>
                  <li className={messageIndex==i?'active liElement':'liElement'} style={{marginLeft: '3px'}}></li>
                </a>
              )
            )}
            </ol>
          </div>
        </div>
      </div>
    </div>);
  }

  changeMessage(i){
    this.setState({
      messageIndex: i
    })
  }
}

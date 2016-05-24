import React, { Component } from 'react'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"

export default class Home extends Component {

  constructor() {
     super();
     this._onSearchResult = this._onSearchResult.bind(this);
     this.state = {
       node: null,
       messageIndex: 1,
       messages:[
         'Galactic is a crowdsourced map of the Internet.',
         'Use Galactic to search for similar URLs online. Learn more.',
         'Help improve Galactic by connecting similar content or websites!',
         'Already a fan? Help Spread Galactic!',
         'Need Ideas? See what&#39;s similar to "DonaldTrump.com"'
      ]
    };
  }

  render() {
    const that = this;
    const { messageIndex, node, isURL } = this.state;

    let existingPage = null;
    if (node && node.isConnected)
      existingPage = <p>Visit the existing page <a href={"/node/"+node._id}>here</a></p>
    else if (isURL) {
      const url = node.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"");
      existingPage = ( <p>Looks like that page is waiting for a smart person to
          <a href={"/connect?url="+url}>here</a>  Who could that person be???
        </p>);
    }

    return (<div>
      <Navbar />
      <div>
        <img className="homepageGalacticIcon" src="/img/constellation_2.png"/>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div>
      <InputURL receivedSearchResult={this._onSearchResult}/>
      <div className="col-md-6 col-md-offset-3">
          {existingPage}
      </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>
            <ol style={{position:'inherit', display: 'block', margin: 'auto', textAlign: 'center', marginTop: '10px'}} className="indicators">
              <div style={{
                display: 'block',
                margin: 'auto',
                textAlign: 'center',
                marginBottom: '3px',
                fontFamily: '"DDG_ProximaNova","DDG_ProximaNova_UI_0","DDG_ProximaNova_UI_1","DDG_ProximaNova_UI_2","DDG_ProximaNova_UI_3","DDG_ProximaNova_UI_4","DDG_ProximaNova_UI_5","DDG_ProximaNova_UI_6","Proxima Nova","Helvetica Neue","Helvetica","Segoe UI","Nimbus Sans L","Liberation Sans","Open Sans",FreeSans,Arial,sans-serif',
                fontWeight: 'lighter',
                fontSize: '1.25em',
                color: 'rgba(180,180,180,1)'
              }}>
              {this.state.messages[messageIndex]}
              </div>
              {this.state.messages.map((d, i)=>(
                <a href="javascript:void(0)" key={i} onClick={that._changeMessage.bind(that, i)}>
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

  _onSearchResult(data){
    const {node, isURL} = data
    this.setState({
      node,
      isURL
    })
  }

  _changeMessage(i){
    this.setState({
      messageIndex: i
    })
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"

class Home extends Component {

  constructor() {
     super();
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
    const { messageIndex } = this.state;

    const { node, isURL } = this.props;


    let existingPage = null;
    if (node && node.isConnected)
      existingPage = <p>Visit the existing page <a href={"/node/"+node._id}>here</a></p>
    else if (isURL) {
      const url = node.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"");
      existingPage = (
        <div className="col-md-8 col-md-offset-2" style={{paddingLeft: '0px', paddingRight: '0px', marginTop: '5px', fontStyle: 'italic'}}><span>Uh oh! Looks like {node.queryLink} isn't connected to anything on Galactic yet. Hook a URL up and <a href={"/connect?url="+url} style={{fontWeight: 'bold'}} className="noUnderline">connect it to similar content</a>.
        </span></div>
      );
    }

    return (<div>
      <Navbar />
      <div>
        <img className="homepageGalacticIcon" src="/img/constellation_2.png"/>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div className="container" style={{minHeight: '140px'}}>
        <InputURL receivedSearchResult={this._onSearchResult} id='result' className="row"/>
        <div className="InputUrlHelperText row">
            {existingPage}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>
            <ol style={{position:'inherit', display: 'block', margin: 'auto', textAlign: 'center'}} className="indicators">
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

  _changeMessage(i){
    this.setState({
      messageIndex: i
    })
  }
}

function mapStateToProps(state) {
  const result = state.inputURLResult.result
  if (result){
    const { node, isURL } = result;
    return {
      node, isURL
    }
  }
  else{
    return {}
  }
}

export default connect(mapStateToProps)(Home)

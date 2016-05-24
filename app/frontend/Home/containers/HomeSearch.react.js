import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"
import InfoModal from "./InfoModal.react"

class Home extends Component {

  render() {
    const { node, isURL } = this.props;

    let existingPage = null;
    if (node && node.isConnected)
      existingPage = <p>Visit the existing page <a href={"/node/"+node._id}>here</a></p>
    else if (isURL) {
      const url = node.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"");
      existingPage = (
        <div className="col-md-8 col-md-offset-2" style={{paddingLeft: '0px', paddingRight: '0px', marginTop: '5px', fontStyle: 'italic'}}><span>Uh oh! Looks like {node.queryLink} isn't connected on Galactic yet. <a href={"/connect?url="+url} style={{fontWeight: 'bold'}} className="noUnderline">Connect it to similar content</a>.
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
      <InfoModal />
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

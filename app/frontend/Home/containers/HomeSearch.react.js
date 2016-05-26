import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/InputURL.react"
import InfoModal from "./InfoModal.react"

class Home extends Component {

  render() {
    const { node, isURL } = this.props;

    let existingPage = null;
    if (node && node.isConnected)
      existingPage = <div
      className={[
              'col-xs-8',
              'col-xs-offset-2',
              'col-sm-8',
              'col-sm-offset-2',
              'col-md-8',
              'col-md-offset-2',
            ]}
      style={{
        marginTop: '5px',
        fontStyle: 'italic'}}
      ><span>Visit the existing page <a href={"/node/"+node._id}>here</a></span>
      </div>
    else if (isURL) {
      const url = node.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"");
      existingPage = (
        <div className={[
              'col-xs-8',
              'col-xs-offset-2',
              'col-sm-8',
              'col-sm-offset-2',
              'col-md-8',
              'col-md-offset-2',
            ]} style={{marginTop: '5px', fontStyle: 'italic'}}>
          <span>Uh oh! Looks like {node.queryLink} isn't connected on Galactic yet. <a href={"/connect?url="+url} style={{fontWeight: 'bold'}} className="noUnderline">Connect it to similar content</a>.</span>
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div>
              <img className={[
                'col-xs-8',
                'col-xs-offset-2',
                'col-sm-8',
                'col-sm-offset-2',
                'col-md-8',
                'col-md-offset-2',
                 ]} style={{marginTop: '150px', maxWidth: '350px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src='/img/galactic-font-logo.png' />
            </div>
          </div>
          <div className='row'>
            <InputURL receivedSearchResult={this._onSearchResult} id='result'/>
            <div className={[
              'col-xs-8',
              'col-xs-offset-2',
              'col-sm-8',
              'col-sm-offset-2',
              'col-md-8',
              'col-md-offset-2',
            ].join(' ')}>{existingPage}</div>
          </div>
          <InfoModal />
        </div>
      </div>
    );
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

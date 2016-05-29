import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL/"
import InfoModal from "./InfoModal.react"

const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px'
}

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
        fontStyle: 'italic'}}>
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
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="text-center" style={{height: '65px', margin: '150px 0 50px'}}>
              <img src='/img/WikiWeb.png' />
            </div>
          </div>
          <div className='row'>
            <div
              className={
              ['col-xs-12',
              'col-sm-10',
              'col-sm-offset-1',
              'col-md-8',
              'col-md-offset-2'].join(' ')
              }>
              <InputURL
                hasSearchButton={true}
                receivedSearchResult={this._onSearchResult}
                id='result'/>
            </div>
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

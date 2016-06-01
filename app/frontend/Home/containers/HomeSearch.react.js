import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL/"
import EntityItem from "../../components/EntityItem.react"

const inputKey = 'homeResult';
const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px'
}

import { getFirehose } from "../actions/index"

class Home extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getFirehose())
  }

  render() {
    const { node, isURL, firehoseResult, dispatch } = this.props;

    const connections = firehoseResult?
    firehoseResult.map(function(edge, i){
      return (
        <div
          key={i}
          style={{backgroundColor:'#eee',
                  borderRadius:'4px',
                  padding:'4px',
                  margin: '10px'}}>
          <EntityItem
            entity={edge.nodeFrom}
            user={edge.user}
          />
          <EntityItem
            entity={edge.nodeTo}
            user={edge.user}
          />
        </div>)
    }):<Loader top="100px"/>;





    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="text-center" style={{margin: '100px 0 30px'}}>
              <div style={{height: '120px'}}><b><span style={{fontFamily: "'Ovo', serif",fontSize: '102px'}}>WikiWeb</span></b></div>
              <div style={{fontFamily: "'Ovo', serif", fontSize: '18px', marginLeft: '15px'}}><span>WikiWeb is a hub for connected content on the web.
                <sup><a href="/about"><span className="fa fa-info-circle" style={{color: '#337ab7'}}></span></a></sup>
              </span></div>
            </div>
          </div>
          <div className='row' style={{marginTop: '10px'}}>
            <div
              className={
              ['col-xs-12',
              'col-sm-10',
              'col-sm-offset-1',
              'col-md-8',
              'col-md-offset-2'].join(' ')
              }>
              <InputURL
                placeholder="Enter a URL to search"
                hasSearchButton={true}
                receivedSearchResult={this._onSearchResult}
                id={inputKey}
                />
            </div>
          </div>
          <div className='row'>
            <div style={{marginTop:'80px'}}
              className={
              ['col-xs-12',
              'col-sm-10',
              'col-sm-offset-1',
              'col-md-8',
              'col-md-offset-2'].join(' ')
              }>
              <hr />
              <h4>Recently Made Connections:</h4>
              {connections}
            </div>
          </div>
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
  const { firehoseResult, inputURLResult} = state

  let object = { firehoseResult }

  if (  inputURLResult && inputURLResult[inputKey] ){
    const { node, isURL } = inputURLResult[inputKey];
    Object.assign(object, { node, isURL });
  }

  return object
}

export default connect(mapStateToProps)(Home)

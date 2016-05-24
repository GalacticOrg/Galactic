/**
  * app/frontend/Connect/containers/ConnectMain.react.js
  * Copyright (c) 2016, Galactic
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { postConnection } from '../actions'

import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/inputURL.react"

export default class Connect extends Component {

  constructor() {
     super();
     this._onSubmit = this._onSubmit.bind(this);
     this.state = {
       initalSearch: this._getQueryString().url
     };
  }

  render() {
    debugger
    const {initalSearch } = this.state
    const { fromNode, toNode } = this.props


    const diabled = !(
      toNode && fromNode && fromNode.node && toNode.node &&//lots of type checks before
      fromNode.node._id !== toNode.node._id );  //Checking  to see if the id are equal

    return (<div>
      <Navbar />
      <div style={{backgroundColor: '#f0f0f0', paddingBottom: '20px'}}>
        <div className="container">
          <div className="row pageTitle" >
            <div className="col-md-3 col-md-offset-1">&#47;Connect</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row connectionForm">
          <div>
            <div className="col-md-9 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>Connect two URLs together:</div>
            <div className="col-md-9 col-md-offset-1" style={{border: 'dashed 1px'}}>
              <div role="form" style={{ marginTop: '20px', marginBottom: '20px'}}>
                <div className="form-group">
                  <label for="connectionNodeA">URL A</label>
                  <br />
                  <InputURL
                    initalValue = {initalSearch}
                    receivedSearchResult={this._onSearchResultA}
                    id='fromNode' />
                  <br />
                </div>
                <hr />
                <div className="form-group">
                  <label for="connectionNodeB">URL B</label>
                  <br />
                  <InputURL
                    receivedSearchResult={this._onSearchResultB}
                    id='toNode'
                    />
                </div>
                <br />
                <button disabled={diabled} onClick={this._onSubmit} type="submit" className="btn btn-default" style={{backgroundColor: 'orange', marginTop: '20px'}}>Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }

  _onSubmit(data){
    const { dispatch, fromNode, toNode } = this.props;
    if ( fromNode && toNode && fromNode.node._id !== toNode.node._id ){
      dispatch(postConnection(fromNode.node._id, toNode.node._id));
    }
  }

  _getQueryString() {
    let result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
  }

}

function mapStateToProps(state) {
  const { fromNode, toNode } = state.inputURLResult

  return {
    fromNode,
    toNode
  }
}

export default connect(mapStateToProps)(Connect)

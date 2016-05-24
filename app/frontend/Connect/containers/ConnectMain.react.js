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

     this._onSearchResultA = this._onSearchResultA.bind(this);
     this._onSearchResultB = this._onSearchResultB.bind(this);
     this._onSubmit = this._onSubmit.bind(this);

     this.state = {
       nodeA: null,
       nodeB: null,
       initalSearch: this._getQueryString().url
     };
  }

  render() {
    const {initalSearch } = this.state
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
                    id='a' />
                  <br />
                </div>
                <hr />
                <div className="form-group">
                  <label for="connectionNodeB">URL B</label>
                  <br />
                  <InputURL
                    receivedSearchResult={this._onSearchResultB}
                    id='b'/>
                </div>
                <br />
                {this.state.nodeA} -- {this.state.nodeB}
                <button onClick={this._onSubmit} type="submit" className="btn btn-default" style={{backgroundColor: 'orange', marginTop: '20px'}}>Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }

  _onSearchResultA(data){
    const {node, isURL} = data
    this.setState({
      nodeA: node._id
    })
  }

  _onSearchResultB(data){
    const {node, isURL} = data
    this.setState({
      nodeB: node._id
    })
  }
  _onSubmit(data){
    const { dispatch } = this.props;
    const {nodeA, nodeB} = this.state;
    if (nodeA!==nodeB){
      dispatch(postConnection(nodeA, nodeB));
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
  const { a, b } = state.inputURLResult
  return {
    a,
    b
  }
}

export default connect(mapStateToProps)(Connect)

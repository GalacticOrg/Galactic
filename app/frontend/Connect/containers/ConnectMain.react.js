/**
  * app/frontend/Connect/containers/ConnectMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap';
import { postConnection } from '../actions'

import Navbar from "../../components/Navbar.react"
import InputURL from "../../components/InputURL.react"
import { resetSearch } from "../../components/inputURL/actions"


export default class Connect extends Component {

  constructor() {
     super();
     this._onSubmit = this._onSubmit.bind(this);
     this.state = {
       initalSearch: this._getQueryString().url
     };
  }

  render() {
    const {initalSearch } = this.state
    const { fromNode, toNode, success, edgeId, entities, errors } = this.props

    const diabled = !(
      toNode && fromNode && fromNode.node && toNode.node &&//lots of type checks before
      fromNode.node._id !== toNode.node._id );  //Checking  to see if the id are equal

    let connection = null;
    let toInput = null;
    let fromInput = initalSearch;
    let errMessage = null;
    if (success && entities){
      const {from, to} = entities
      connection = (
      <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset 1 col-md-10 col-md-offset-1">
        <a href={"/node/"+from._id}> {from.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"")} </a>
        is now connected to
        <a href={"/node/"+to._id}> {to.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,"")} </a>
      </div> )
      toInput = ''
      fromInput = ''
    } else if (errors && errors.length>0) {
      errMessage = (<ul className="col-md-offset-3 col-md-6">
        {errors.map(m=><Alert bsStyle={'warning'} >{m}</Alert>)}
      </ul>)
    }
    return (<div>
      <Navbar />
      {errMessage}
      <div className="container">
        <div className="row connectionForm">
          <div>
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"
              style={{marginTop: '20px',marginBottom: '15px', fontWeight: 'bold'}}>Connect two URLs together:</div>
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"
              style={{border: 'dashed 1px'}}>
              <div role="form" style={{ marginTop: '20px', marginBottom: '20px'}}>
                <div className="form-group">
                  <label for="connectionNodeA">URL A</label>
                  <br />
                  <InputURL
                    setValue = {fromInput}
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
        {connection}
      </div>
    </div>);
  }

  _onSubmit(data){
    const { dispatch, fromNode, toNode } = this.props;
    if ( fromNode && toNode && fromNode.node._id !== toNode.node._id ){
      dispatch(postConnection(fromNode.node._id, toNode.node._id));
    }
    dispatch(resetSearch('toNode'))
    dispatch(resetSearch('fromNode'))
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
  const { success, edgeId, entities, errors } = state.connectionsResult;
  return {
    fromNode,
    toNode,
    edgeId,
    success,
    entities,
    errors
  }
}

export default connect(mapStateToProps)(Connect)
//"Paste a link to search"

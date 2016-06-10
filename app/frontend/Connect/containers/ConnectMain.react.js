/**
  * app/frontend/Connect/containers/ConnectMain.react.js
  * Copyright (c) 2016, WikiWeb
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { Alert, Tooltip, OverlayTrigger} from 'react-bootstrap'
import { postConnection } from '../actions'

import Navbar from "../../components/Navbar.react"
import EntityItemTitleHost from "../../components/Entity/EntityItemTitleHost.react"
import InputURL from "../../components/InputURL/"

import { resetSearch } from "../../components/InputURL/actions"

const spacerStyle = { marginBottom: '50px'}
const formStyle = {
  padding: '60px 15px 40px',
  border: 'dashed 1px',
  backgroundColor: 'white'
}
const responsiveClasses = ['col-xs-12','col-sm-10',
  'col-sm-offset-1',
  'col-md-10',
  'col-md-offset-1'].join(' ')

export default class Connect extends Component {

  constructor() {
     super();
     this._onSubmit = this._onSubmit.bind(this);
     this.state = {
       initalSearch: this._getQueryString().url
     };
  }

  componentWillReceiveProps(newProps){
    if (newProps.success && newProps.entities && newProps.entities.from){
      window.location='/node/'+newProps.entities.from._id+'?message=true';
    }
  }

  render() {
    const {initalSearch } = this.state
    const { fromNode, toNode, success, edgeId, entities, errors } = this.props


    const fromNodeExists =  (fromNode!==undefined && fromNode.node!==undefined);
    const toNodeStyle =  fromNodeExists?
      {}:
      {opacity:'.1', pointerEvents: 'none'};

    Object.assign(toNodeStyle, spacerStyle)
    const toNodeExists =  (toNode!==undefined  && toNode.node!==undefined );

    const equalURL = (toNodeExists && fromNodeExists &&
    fromNode.node._id === toNode.node._id)

    const diabled = !(
      toNodeExists && fromNodeExists &&//lots of type checks before
       fromNode.node._id !== toNode.node._id);  //Checking  to see if the id are equal


    const connectStyle = diabled?
      {backgroundColor:'#eee'}:
      {backgroundColor: 'orange', border:'none'};
    Object.assign(connectStyle,
      {
       marginLeft: 'calc(50% - 50px)',
       width: '100px'
     });

    let connection = null;
    let toInput = null;
    let fromInput = initalSearch;
    let errMessage = null;

    const connectionSuccessMessage ={
        marginTop: '20px',
        fontFamily: "DDG_ProximaNova, DDG_ProximaNova_UI_0, DDG_ProximaNova_UI_1, DDG_ProximaNova_UI_2, DDG_ProximaNova_UI_3, DDG_ProximaNova_UI_4, DDG_ProximaNova_UI_5, DDG_ProximaNova_UI_6, 'Proxima Nova', 'Helvetica Neue', Helvetica, 'Segoe UI', 'Nimbus Sans L', 'Liberation Sans', 'Open Sans', FreeSans, Arial, sans-serif",
        fontSize: '1.25em'
    }

     if (errors && errors.length>0) {
      errMessage = (<ul className="col-md-offset-3 col-md-6">
        {errors.map(m=><Alert bsStyle={'warning'} >{m}</Alert>)}
      </ul>)
    }

    const tooltip = (
      <Tooltip id="connectPageTooltip">The purpose of connections is to create a thread between similar content for others to find later. Some people connect music videos, others connect articles they have read online. What will you connect?</Tooltip>
    );

    let nodeFromEntityTitle = null
    if (fromNode && fromNode.isURL){
      const {title, _id, canonicalLink, faviconCDN} = fromNode.node
      nodeFromEntityTitle = (
      <EntityItemTitleHost
        title={title}
        id={_id}
        canonicalLink={canonicalLink}
        faviconCDN={faviconCDN?faviconCDN:'/img/document.png'} />
      )
    }

    let nodeToEntityTitle = null
    if (toNode && toNode.isURL){
      const {title, _id, canonicalLink, faviconCDN} = toNode.node
      nodeToEntityTitle = (
        <EntityItemTitleHost
          title={title}
          id={_id}
          canonicalLink={canonicalLink}
          faviconCDN={faviconCDN?faviconCDN:'/img/document.png'} />
      )
    }

    return (<div>
      <Navbar />
      {errMessage}
      <div className="container">
        <div className="row">
            <div className={responsiveClasses}
              style={{marginTop: '20px',marginBottom: '15px', fontWeight: 'bold'}}>Connect two URLs together:
              <OverlayTrigger placement="right" overlay={tooltip}>
                <sup style={{marginLeft: '2px'}}>
                <span className="fa fa-info-circle" style={{color: '#337ab7'}}></span>
                </sup>
              </OverlayTrigger>
            </div>
            <div className={responsiveClasses}
              style={formStyle}>
                <div style={{height:'25px'}}>
                  {nodeFromEntityTitle}
                </div>
                <div style={spacerStyle} className="form-group">
                  <InputURL
                    setValue = {fromInput}
                    receivedSearchResult={this._onSearchResultA}
                    id='fromNode'
                    placeholder={'Paste a URL'} />
                </div>
                <hr />
                <div style={{height:'25px'}}>
                  {nodeToEntityTitle}
                </div>
                <div style={toNodeStyle} className="form-group" >
                  <InputURL
                    receivedSearchResult={this._onSearchResultB}
                    id='toNode'
                    placeholder={'Paste another URL'}
                    />
                  {equalURL?<div style={{color:'red'}}>Please enter two different URLs</div>:null}
                </div>

                <button
                  disabled={diabled}
                  onClick={this._onSubmit}
                  type="submit"
                  className="btn btn-default"
                  style={connectStyle}>Connect</button>
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
      // dispatch(resetSearch('toNode'));  /we are dedirection. Dont need these
      // dispatch(resetSearch('fromNode'));
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

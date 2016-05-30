import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Navbar from "../../components/Navbar.react"
import EntityItem from "../../components/EntityItem.react"

import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"
import { getNode } from "../actions/index"

class NodeMain extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getNode(window.location.pathname.replace('/node/',''))) //@todo include this in the page
  }
  render() {
    const that =this;
    const { nodeResult } = this.props

    if (!nodeResult || Object.keys(nodeResult).length==0) {
      return (
      <div>
        <Navbar/>
        <Loader top={'30%'} />
      </div>)
    }

    const { edges, faviconCDN, title, canonicalLink, description } = nodeResult

    const connectHref = "/connect?url="+canonicalLink

    const prettyLink = canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'');

    let documentImage = (<span><img src="/img/document.jpg" style={{height: '30px'}} /></span>)
    if (faviconCDN){
      documentImage = (<span><img src={faviconCDN} style={{width: '16px'}} /></span>)
    }

    const nodeEdges = edges.map(function(edge, i){

      return <EntityItem
        key={i}
        entity={edge.entity}
        user={edge.user}
      />
    })

    const emptyMessage = nodeEdges.length==0?
    <div>
      <h3>Shucks! There are no connection on this site <i>yet</i>.</h3>
      <p>
        You should be the first to&nbsp;
        <b><a href={connectHref}>create one</a>.</b>
      </p>
    </div>
    :null;

    return (
    <div>
      <Navbar />
      <Grid className="resultNodeCard">
        <Row className="show-grid">
          <Col className="resultFont"
                mdOffset={1}
                xsOffset={1}
                xs={6}
                md={6}>
            <br />
            {documentImage}&nbsp;<a href={canonicalLink} className="noUnderline">
              <span className="resultNodeHyperlinkText">{prettyLink}</span>
            </a>
          </Col>
        </Row>
        <Row>
          <Col
            xsOffset={1}
            xs={10}
            mdOffset={1}
            md={10}
            style={{fontSize: '17px', fontWeight: 'bold', marginTop: '5px'}}>
              <a href={connectHref}>
                 <button
                   type="button"
                   className="btn btn-default resultNodeAddConnectionBox">
                   Add a connection
                 </button>
               </a>
            </Col>
          </Row>
      </Grid>

      <hr />

      <Grid className="resultsSection">
        <Row className="show-grid">
          {nodeEdges}
        </Row>
        <div style={{margin:'50px'}}>
          {emptyMessage}
        </div>
      </Grid>
    </div>
  );
  }

}

function mapStateToProps(state) {
  const { nodeResult } = state;
  return {
    nodeResult
  }
}

export default connect(mapStateToProps)(NodeMain)

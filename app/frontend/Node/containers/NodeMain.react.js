import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"

import { getNode } from "../actions/index"

class NodeMain extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getNode('57450d031d985377e0876846'))
  }
  render() {

    const { nodeResult } = this.props

    if (!nodeResult || Object.keys(nodeResult).length==0) {
      return <div>Loader Bar goes here.</div>
    }


    if (nodeResult.imageCDN && nodeResult.imageCDN.url){
      console.log(nodeResult.imageCDN.url)
    } else {
      nodeResult.imageCDN = {}
      nodeResult.imageCDN.url = "/img/document.jpg"
    }

    const { _id, title, edges, queryLink, canonicalLink, description, imageCDN } = nodeResult

    const nodeEdges = edges.map(function(edge, i){
      let sourceURL=document.createElement('a')
      sourceURL.href=edge.entity.canonicalLink

      return <Col className="connectionCard" xsOffset={1} xs={9} mdOffset={1} md={8}>
        <div>
          <a href={'/node/'+edge.entity._id} title={edge.entity.canonicalLink} className="noUnderline"><span style={{fontSize: '14px'}}>{edge.entity.title}</span></a>
          <a href={'/node/'+edge.entity._id}><span style={{color: 'grey', marginLeft: '5px', fontSize: '12px', lineHeight: '14pt'}}>({sourceURL.host})</span></a>
        </div>
        <div className="connectionCardInfo">
          <a href={'/@'+edge.user.username}><span className="connectionCardInfoElement" title={'first connector: @'+edge.user.username}><img className="connectorIcon" src="/img/user_tim.jpeg" /></span></a>
          <a href={'/node/'+edge.entity._id}><Glyphicon className="connectionCardInfoElement" glyph="cd" bsStyle="success" title="8 connections"/></a>
          <a href={'/node/'+edge.entity._id} title={edge.entity.canonicalLink}><Glyphicon className="connectionCardInfoElement" glyph="link" bsStyle=" connectionCardInfoElementsuccess"/></a>
          </div>
        </Col>
    })

    return (
    <div>
      <Navbar />
      <Grid className="resultNodeCard">
        <Row className="show-grid">
          <Col className="resultFont" mdOffset={1} xsOffset={1} xs={6} md={6}>
            {title}
            <br />
            <a href={canonicalLink} className="noUnderline"><span className="resultNodeHyperlinkText">{queryLink}</span></a>
            <br />
            <span><img src={imageCDN.url} style={{marginTop: '5px', height: '30px'}} /></span>
          </Col>
          <Col className="resultInfo" xs={3} md={3}>
            <div>
              <div>
               <a href="/connect"><button type="button" className="btn btn-default resultNodeAddConnectionBox">Add Connection</button></a>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>

      <hr />

      <Grid className="resultsSection">
        <Row>
          <Col xsOffset={1} xs={10} mdOffset={1} md={10} style={{fontWeight: 'bold', marginBottom: '15px'}}>Connections:</Col>
          </Row>
        <Row className="show-grid">
          {nodeEdges}
        </Row>
      </Grid>
    </div>);
  }

}

function mapStateToProps(state) {
  const { nodeResult } = state;
  return {
    nodeResult
  }
}

export default connect(mapStateToProps)(NodeMain)

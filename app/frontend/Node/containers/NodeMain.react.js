import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"

import { getNode } from "../actions/index"

class NodeMain extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getNode(window.location.pathname.replace('/node/',''))) //@todo include this in the page
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
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }


      return <Col className="connectionCard" xsOffset={1} xs={9} mdOffset={1} md={8}>
        <div>
          <a href={'/node/'+edge.entity._id} title={edge.entity.canonicalLink} className="noUnderline"><span style={{fontSize: '14px', lineHeight: '14pt'}}>{edge.entity.title}</span></a>
          <span style={{color: 'grey', marginLeft: '5px', fontSize: '12px', lineHeight: '14pt'}}>(<a href={'/node/'+edge.entity._id}>{sourceURL.host}</a>)</span>
        </div>
        <div style={{marginTop: '-3px', color: 'grey', fontSize: '11px'}}>
          <span title={'galactic.wiki/@'+edge.user.username} >By <a href={'/@'+edge.user.username}>@{edge.user.username}</a></span>
          <span> | {getRandomInt(0,20)} edges</span>
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
               <a href={"/connect?url="+canonicalLink}><button type="button" className="btn btn-default resultNodeAddConnectionBox">Connect This Site</button></a>
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

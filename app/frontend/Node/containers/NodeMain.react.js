import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader';
import Navbar from "../../components/Navbar.react"
import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"
import { getNode } from "../actions/index"

const edgeEntityStyle = {color: 'grey', marginLeft: '5px', fontSize: '12px'}
const edgeEntityTitle = {fontSize: '15px', fontWeight: 'bold'}
const edgeEntityDescription = {fontSize: '13px'}
const edgeUserStyle = {fontSize: '13x'}

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
      let sourceURL=document.createElement('a')
      sourceURL.href=edge.entity.canonicalLink

      let edgeImg = null;

      if (edge.entity.faviconCDN){
        edgeImg = edge.entity.faviconCDN;
      } else {
        edgeImg = 'http://i.imgur.com/LuieUNb.jpg'
      }

      const entity = edge.entity
      const user = edge.user
      return <Col key={i} className="connectionCard" xsOffset={1} xs={9} mdOffset={1} md={7}>
        <div style={{display: 'block'}}>
          <div style={{float: 'left'}}>
            <img src={edgeImg} style={{width: '25px'}}/>
          </div>
          <div style={{marginLeft: '35px'}}>
            <div>
              <a href={'/node/'+edge.entity._id}
              title={edge.entity.canonicalLink}
              className="noUnderline">
                <span style={edgeEntityTitle}>{edge.entity.title}</span>
              </a>
              <span style={edgeEntityStyle}><a href={sourceURL.href}>({sourceURL.host})</a></span>
            </div>
            <div>
              <span style={edgeEntityDescription}>{edge.entity.description}</span>
            </div>
            <div style={edgeUserStyle}>
              <span title={'wikiweb.co/@'+edge.user.username}>Connected by
              <a href={'/@'+edge.user.username} style={{marginLeft: '5px', marginRight: '5px'}}>
                <img src={edge.user.twitter.profile_image_url} style={{height:'15px', width: '15px'}} />
              </a>
              <a href={'/@'+edge.user.username}>@{edge.user.username}</a>
              </span>
              <span> | {that.getRandomInt(0,20)} edges</span>
            </div>
          </div>
        </div>
      </Col>
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
            Connections for {title}
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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

function mapStateToProps(state) {
  const { nodeResult } = state;
  return {
    nodeResult
  }
}

export default connect(mapStateToProps)(NodeMain)

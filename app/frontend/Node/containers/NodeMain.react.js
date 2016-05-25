import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"

class NodeMain extends Component {

  render() {
    return (
    <div>
      <Navbar />
      <Grid className="resultNodeCard">
        <Row className="show-grid">
          <Col className="resultFont" mdOffset={1} xsOffset={1} xs={6} md={6}>
            Galactic.com
            <br />
            <a href="#"><span className="resultNodeHyperlinkText">http:&#47;&#47;galactic.com</span></a>
          </Col>
          <Col className="resultInfo" xs={3} md={3}>
            <div>
              <div>
               <a href="/connect"><button type="button" className="btn btn-default resultNodeAddConnectionBox">Add Connection</button></a>
              </div>
              <div>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/most-beautiful-example-user.jpeg" /></span>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/user_tim.jpeg" /></span>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/user_jackson.jpg" /></span>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/user_alyraz.jpeg" /></span>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/user_jeff.jpg" /></span>
              </div>
              <div>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/user_jehan.jpeg" /></span>
                <span className="connectorIconBox"><img className="connectorIcon" src="/img/user_alan.png" /></span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>

      <hr />

      <Grid className="resultsSection">
        <Row className="show-grid">
          <Col className="connectionCard" mdOffset={1} xsOffset={1} xs={4} md={3}>
            <a href="/node/duckduckgo.com" title="galactic.com/node/duckduckgo.com"><div className="connectionCardText">DuckDuckGo
            </div></a>
            <div className="connectionCardInfo">
              <a href="http://duckduckgo.com" title="http://duckduckgo.com"><Glyphicon className="connectionCardInfoElement" glyph="link" bsStyle=" connectionCardInfoElementsuccess"/></a>
              <a href="/node/duckduckgo.com"><Glyphicon className="connectionCardInfoElement" glyph="cd" bsStyle="success" title="8 connections"/></a>
              <a href="/@timoreilly"><span className="connectionCardInfoElement" title="connector: @timoreilly"><img className="connectorIcon" src="/img/user_tim.jpeg" /></span></a>
            </div>
          </Col>
          <Col className="connectionCard" xs={4} md={3} mdOffset={0} xsOffset={1}><span className="connectionCardText">Google</span></Col>
          <Col className="connectionCard" xs={4} md={3} mdOffset={0} xsOffset={1}><span className="connectionCardText">Pinterest</span></Col>
        </Row>
        <Row className="show-grid">
          <Col className="connectionCard" mdOffset={1} xsOffset={1} xs={4} md={3}><span className="connectionCardText">StumbleUpon</span></Col>
          <Col className="connectionCard" xs={4} md={3} mdOffset={0} xsOffset={1}><span className="connectionCardText">Wikipedia</span></Col>
          <Col className="connectionCard" xs={4} md={3} mdOffset={0} xsOffset={1}><span className="connectionCardText">SitesLike</span></Col>
        </Row>
      </Grid>
    </div>);
  }

}

function mapStateToProps(state) {
  const {result} = state;
  return {

  }
}

export default connect(mapStateToProps)(NodeMain)

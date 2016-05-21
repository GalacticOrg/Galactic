/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react"
import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"

class Result extends React.Component {
  render() {
    return (<div>
      <Navbar />

      <Grid className="resultNodeCard">
        <Row className="show-grid">
          <Col className="resultFont" mdOffset={1} xsOffset={1} xs={6} md={6}>Galactic.com</Col>
          <Col className="resultInfo" xs={3} md={3}>
            <div>Connections: 8</div>
            <div>Connectors: 3</div>
            <div><button>Add connection</button></div>
          </Col>
        </Row>
      </Grid>

      <Grid className="resultsSection">
        <Row className="show-grid">
          <Col className="connectionCard" mdOffset={1} xsOffset={1} xs={4} md={3}><span className="connectionCardText">DuckDuckGo</span></Col>
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

ReactDOM.render(
  (<Result />),
  document.getElementById('app')
);

/**
 * Copyright (c) 2016, Galactic
*/
import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/Navbar.react.jsx"
import { Grid, Row, Col, InputGroup, Glyphicon } from "react-bootstrap"

class Result extends React.Component {
  render() {
    return (<div>
      <Navbar />

      <Grid className="resultNodeCard">
        <Row className="show-grid">
          <Col className="resultFont" mdOffset={1} xsOffset={1} xs={5} md={5}>Galactic.com</Col>
        </Row>
      </Grid>

      <Grid className="resultsSection">
        <Row className="show-grid">
          <Col className="connectionCard" mdOffset={1} xsOffset={1} xs={4} md={3}><span className="connectionCardText">DuckDuckGo</span></Col>
          <Col className="connectionCard" xs={4} md={3} mdOffset={0} xsOffset={1}><span className="connectionCardText">Google</span></Col>
          <Col className="connectionCard" xs={4} md={3} mdOffset={0} xsOffset={1}><span className="connectionCardText">Pinterest</span></Col>
        </Row>
      </Grid>
    </div>);
  }
}

ReactDOM.render(
  (<Result />),
  document.getElementById('app')
);

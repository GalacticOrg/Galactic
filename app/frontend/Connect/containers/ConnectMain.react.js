/**
 * Copyright (c) 2016, Galactic
*/
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Navbar from "../../components/Navbar.react"

export default class Connect extends Component {
  render() {
    const { dispatch } = this.props

    return (<div>
      <Navbar dispatch={dispatch} />
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
            <div className="col-md-9 col-md-offset-1" style={{marginBottom: '15px', fontWeight: 'bold'}}>Connection two URLs together:</div>
            <div className="col-md-9 col-md-offset-1" style={{border: 'dashed 1px'}}>
              <form role="form" style={{ marginTop: '20px', marginBottom: '20px'}}>
                <div class="form-group">
                  <label for="connectionNodeA">URL A</label>
                  <br />
                  <input type="url" class="form-control" id="connectionNodeA" style={{width: '100%'}}/>
                  <br />
                </div>
                <hr />
                <div class="form-group">
                  <label for="connectionNodeB">URL B</label>
                  <br />
                  <input type="url" class="form-control" id="connectionNodeB" style={{width: '100%'}}/>
                </div>
                <br />
                <button type="submit" class="btn btn-default" style={{backgroundColor: 'orange', marginTop: '20px'}}>Connect</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

// ReactDOM.render(
//   (<Connect />),
//   document.getElementById('app')
// );

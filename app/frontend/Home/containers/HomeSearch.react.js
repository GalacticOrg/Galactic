import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import { FormGroup, FormControl, Button, InputGroup, Glyphicon } from "react-bootstrap"
import { getSearch } from '../actions'

const ENTER_KEY_CODE = 13;

class Home extends Component {

  constructor(){
    super()
    this.state={searchInput:""};
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _onChange(e) {
    e.preventDefault()
    this.setState({
      searchInput: e.target.value
    })
  }

  _onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this._onSubmit();
    }
  }

  _onSubmit() {
    const { dispatch } = this.props;
    dispatch(getSearch(this.state.searchInput));
  }

  render() {
    const { node, isURL, dispatch } = this.props
    const { searchInput } = this.state
    let result = null;
    if (node){

      const {canonicalURL } = node

      result = <div>{canonicalURL}--{isURL?'is a URl':'not a URL'}</div>

    }

    return (<div>
      <Navbar dispatch={dispatch} />
      <div>
        <img className="homepageBannerIcon" src="/img/galactic-font-logo.png" />
      </div>
      <div>
        <div className="homepageUrlSearchForm">
          <div className="homepageUrlFormGroup form-group">
            <span className="homepageUrlSearchInputGroup input-group">
              <input onChange={this._onChange} onKeyDown={this._onKeyDown} value={searchInput} type="search" className="homepageUrlSearchBox form-control" />
              <a onClick={this._onSubmit} href="/result" className=" homepageUrlSearchIconBox input-group-addon">
                <i className="fa fa-search" />
              </a>
              </span>
          </div>
          {result}
        </div>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  debugger
  const { node, isURL } = state.urlResult;

  return {
    node,
    isURL
  }
}

export default connect(mapStateToProps)(Home)

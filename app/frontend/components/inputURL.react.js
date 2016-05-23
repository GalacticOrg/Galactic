/**
 * Copyright (c) 2016, Galactic
*/

import React from "react";
import { Modal} from "react-bootstrap"
import { connect } from 'react-redux'
import { getSearch } from './inputURL/actions'

const ENTER_KEY_CODE = 13;


class InputURL extends React.Component {

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
    const { searchInput } = this.state
    let result = null;
    const { node, isURL, dispatch } = this.props


    if (node){

      const {canonicalURL } = node

      result = <div>{canonicalURL}--{isURL?'is a URl':'not a URL'}</div>

    }

    return (
      <div className="homepageUrlSearchForm">
        <div className="homepageUrlFormGroup form-group">
          <span className="homepageUrlSearchInputGroup input-group">
            <input onChange={this._onChange} onKeyDown={this._onKeyDown} value={searchInput} type="search" className="homepageUrlSearchBox form-control" />
            <a onClick={this._onSubmit} href="javascript:void(0)" className=" homepageUrlSearchIconBox input-group-addon">
              <i className="fa fa-search" />
            </a>
            </span>
        </div>
        {result}
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { node, isURL } = state.inputURLResult;
  return {
    node,
    isURL
  }
}

export default connect(mapStateToProps)(InputURL)

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
    this.state={searchInput:'', uid:Math.random()};
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const { receivedSearchResult } = this.props
    if (receivedSearchResult) receivedSearchResult(nextProps[this.state.uid]);
  }

  render() {
    const { searchInput } = this.state
    const { dispatch } = this.props
    const search = this.props[this.state.uid]

    let result = null;
    let node = null;
    let urlClass = '';
    if (search){
      node = search.node
      let isURL = search.isURL
      if (isURL===true) urlClass = 'is-url'
      else if(isURL===false) urlClass = 'is-not-url';
    }

    if (node){
      const { canonicalLink, title, isConnected, _id, faviconCDN } = node;
      result = (
        <div>
          <img src={faviconCDN}/> {title}
        </div>
      )
    }

    return (
      <div className="homepageUrlSearchForm">
        <div className="homepageUrlFormGroup form-group">
          <span
            className={[
              'homepageUrlSearchInputGroup',
              'input-group',
              urlClass
            ].join(' ')}
          >
            <input onBlur={this._onSubmit} onChange={this._onChange} onKeyDown={this._onKeyDown} value={searchInput} type="search" className="homepageUrlSearchBox form-control" />
            <a onClick={this._onSubmit} href="javascript:void(0)" className=" homepageUrlSearchIconBox input-group-addon">
              <i className="fa fa-search" />
            </a>
          </span>
        </div>
        {result}
      </div>
    );
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
     if (this.state.searchInput.length>0){
       const { dispatch } = this.props;
       this.state.uid;
       dispatch(getSearch(this.state.searchInput, this.state.uid));
     }
  }
};

function mapStateToProps(state) {
  const searches = {...state.inputURLResult};
  return searches
}

export default connect(mapStateToProps)(InputURL)

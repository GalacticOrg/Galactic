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
    const { node, isURL, dispatch } = this.props

    let result = null;
    if (node){
      const { canonicalLink, title, isConnected, _id, faviconCDN} = node;
      const existingPage = true? //replace me with isConnected boolean
        <p><hr/>Visit the existing page <a href={"/node/"+_id}>here</a></p>:
        null;
      result = <div>
        <img src={faviconCDN}/>
        {title} -- {canonicalLink}
        {existingPage}
      </div>


    } else if (isURL) {
      result = (
        <div>
          <p>Looks like we dont have this page.</p>
          <p>Why dont you <a href={"/connect"}>connect it</a> </p>
        </div>
      )

    }

    let urlClass = '';//set the url for the function
    if (isURL===true) urlClass = 'is-url'
    else if(isURL===false) urlClass = 'is-not-url';

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

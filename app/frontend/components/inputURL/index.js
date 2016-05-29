/**
 * Copyright (c) 2016, WikiWeb
*/

import React from "react";
import { Modal, OverlayTrigger, Popover} from 'react-bootstrap'
import { connect } from 'react-redux'
import { getSearch, resetSearch } from './actions'
import _ from 'lodash'
import StatusIcon from './StatusIcon.react'
import InputButton from './InputButton.react'


const ENTER_KEY_CODE = 13;

const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px'
}

const errorTextStyle = {
  position: 'absolute',
  left: '12px',
  bottom: '-1.5em',
  color:'red'
}

const homePageUrlSearchInputBox = {
  fontSize: '17px',
  height: '43px',
  outline: 'none',
  paddingRight: '30px'
}

const buttonStyle = {
  padding: '0px',
  margin: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  border: 'none',
  height: '0px',
  outline: 'none'
}

class InputURL extends React.Component {
  constructor(){
    super()
    this.state = { searchInput:'' };
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._search = this._search.bind(this);
    this._reset = this._reset.bind(this);
    this._submitWithDelay = _.debounce(this._submitWithDelay, 700);
  }

  componentWillMount(nextProps){
    const { setValue, id} = this.props;
    this.uid = id?id:Math.random()*Math.pow(10, 17);
    if (setValue) this._setValue(setValue)
    if (this.props.hasSearchButton)
      this.urlValidIconStyle = Object.assign(
        this.urlValidIconStyle, {right:'42px'}
      );
  }

  componentWillReceiveProps(nextProps){
    if (nextProps[this.uid]){
      const { reset } = nextProps[this.uid];
      if (reset) this.setState({searchInput:''})
    }
  }

  makePopover(status, text, title){
   const popover =
      <Popover
        id={this.uid}
        title={title?title:''}>
        {text}
      </Popover>
   return <OverlayTrigger
     trigger="focus"
     placement="top"
     overlay={popover}>
     <button style={buttonStyle} >{status}</button>
   </OverlayTrigger>
  }

  render() {
    const { searchInput } = this.state
    const { dispatch, hasSearchButton, placeholder } = this.props
    const search = this.props[this.uid]?this.props[this.uid]:{}
    const {isURL=null, loading=false, node=null} = search;

    // let result = null;
    // let node = null;

    // Search Button
    const inputButton = hasSearchButton?(
      <InputButton
        onSubmit = {this._onSubmit}
        disabled = {isURL === false}
        iconState = {this._getIcon(node)}
        href = {this._getHref(node)}
       />
    ):null;

    return (
      <div style={homepageUrlSearchForm}>
        <div className="form-group">
          <span
            className={[
              'input-group',
              'col-xs-12',
              'col-sm-10',
              'col-sm-offset-1',
              'col-md-8',
              'col-md-offset-2'
            ].join(' ')}
          >
            <input
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              value={searchInput}
              type="search"
              placeholder={placeholder}
              className="form-control"
              style={homePageUrlSearchInputBox} />
            <div  style={this.urlValidIconStyle} >
              <StatusIcon
                loading={loading}
                close={this._reset}
                hasReset={isURL===false || node!==null} />
            </div>
            {inputButton}
            {isURL===false?<div style={errorTextStyle}>URL does not exist</div>:null}
          </span>
        </div>
      </div>
    );
  }

  _getHref(node){
    let href = 'javascript:void(0)'
    if (node && node.isConnected) {
      href = '/node/'+ node._id;
    } else if (node && !node.isConnected && node.canonicalLink) {
      href = '/connect?url='+ node.canonicalLink;
    }
    return href
  }

  _getIcon(node){
    let icon = 'fa fa-search'
    if (node && !node.isConnected) {
      icon = 'fa fa-search-plus'
    }
    return icon
  }


  _setValue(setValue){
    this.setState({
      searchInput:setValue
    });
    if (setValue.length>0) this._search(setValue);
  }


  _onChange(e) {
    e.preventDefault()
    this.setState({
      searchInput: e.target.value
    })
    this._submitWithDelay()
  }

  _onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this._onSubmit();
    }
  }

  _submitWithDelay(e) {
    this._onSubmit()
  }

  _onSubmit(){
    const {searchInput} = this.state;
    if (searchInput.length > 0){
      this._submitWithDelay.cancel() //cancel the delayed submit.
      this._search(searchInput)
    } else{
      this._reset()
    }
  }

  _search(searchInput) {
    const { dispatch } = this.props;
    if (this.lastSearch !== searchInput){
      this.lastSearch = searchInput;
      dispatch(getSearch(searchInput, this.uid));
    }
  }

  _reset(searchInput) {
    const { dispatch } = this.props;
    this.lastSearch='';
    dispatch(resetSearch(this.uid));
  }

  urlValidIconStyle = {
    position: 'absolute',
    zIndex: 3,
    right: '0px'
  }

};

function mapStateToProps(state) {
  const searches = {...state.inputURLResult};
  return searches
}

export default connect(mapStateToProps)(InputURL)

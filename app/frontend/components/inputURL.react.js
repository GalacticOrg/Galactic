/**
 * Copyright (c) 2016, WikiWeb
*/

import React from "react";
import Loader from 'react-loader';
import { Modal, OverlayTrigger, Popover} from 'react-bootstrap'
import { connect } from 'react-redux'
import { getSearch, resetSearch } from './inputURL/actions'
import _ from 'lodash'

const ENTER_KEY_CODE = 13;

const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
  paddingLeft: '20px',
  paddingRight: '20px'
}

const homepageUrlSearchBox = {
  fontSize: '17px',
  height: '43px',
  outline: 'none',
}

const buttonStyle = {
  padding: 0,
  margin: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  border: 'none',
  height: 0,
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
    if (this.props.hasSearchButton) this.urlValidIconStyle = Object.assign(this.urlValidIconStyle,{right:45});
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
    const search = this.props[this.uid]
    const statusStyle = {margin: '0'}
    let result = null;
    let node = null;
    let hrefSubmit = "javascript:void(0)";
    let searchDisabled = {};
    let status = null;

    let iconState = 'fa fa-search';

    if (search){

      const {isURL, loading, node} = search;

      if (loading) status = (<div>
        <Loader scale={0.55} />
        <span style={{ padding: '5px', margin: '14px', display: 'inline-block'}}  />
      </div>)
      else if (isURL)
        status = this.makePopover(
          <i className="fa fa-check-circle is-url" style={statusStyle} />,
          'text',
          'title');
      else if (isURL==false)
        status = this.makePopover(
          <i className="fa fa-times-circle-o is-not-url" style={statusStyle} />,
          'text',
          'title'),
        searchDisabled = {cursor:'not-allowed'};

      if (node && !node.isConnected)
      iconState = 'fa fa-search-plus',
      hrefSubmit = '/connect?url='+ node.canonicalLink;
      else if (node)
      hrefSubmit = '/node/'+ node._id;

    }
    const searchButton = hasSearchButton?(
      <a tabIndex="-1"
        onClick={this._onSubmit}
        href={hrefSubmit}
        className="input-group-addon"
        style={searchDisabled} >
        <i style={{fontSize:'1.4em'}} className={iconState} />
      </a>
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
              style={homepageUrlSearchBox} />
            <div  style={this.urlValidIconStyle} >
              {status}
            </div>
            {searchButton}
          </span>
        </div>
        {result}
      </div>
    );
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
    dispatch(resetSearch(this.uid));
  }

  urlValidIconStyle = {
    position: 'absolute',
    zIndex: 3,
    right: 0
  }

};

function mapStateToProps(state) {
  const searches = {...state.inputURLResult};
  return searches
}

export default connect(mapStateToProps)(InputURL)

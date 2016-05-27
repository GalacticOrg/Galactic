/**
 * Copyright (c) 2016, WikiWeb
*/

import React from "react";
import Loader from 'react-loader';
import { Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import { getSearch, resetSearch } from './inputURL/actions'
import _ from 'lodash'

const ENTER_KEY_CODE = 13;

const homepageUrlSearchForm = {
  display: 'block',
  margin: 'auto',
  marginTop: '50px',
}

const homepageUrlSearchBox = {
  fontSize: '17px',
  height: '43px',
  outline: 'none',
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
    this._submitWithDelay = _.debounce(this._submitWithDelay, 1000);
  }

  componentWillMount(nextProps){
    const { setValue, id} = this.props;
    this.uid = id?id:Math.random()*Math.pow(10, 17);
    if (setValue) this._setValue(setValue)
    if (this.props.hasSearchButton) this.urlValidIconStyle = Object.assign(this.urlValidIconStyle,{right:40});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps[this.uid]){
      const { reset } = nextProps[this.uid];
      if (reset) this.setState({searchInput:''})
    }
  }

  render() {
    const { searchInput } = this.state
    const { dispatch, hasSearchButton, placeholder } = this.props
    const search = this.props[this.uid]

    let result = null;
    let node = null;
    let status = null;
    let urlClass = '';
    let iconState = 'fa fa-search'
    if (search){
      node = search.node
      const isURL = search.isURL
      status = search.loading?(
        <div style={this.urlValidIconStyle} >
          <Loader scale={0.55} />
          <i className="fa fa-check-circle" style={{margin: '14px'}}  />
        </div>
      ):null;
      if (isURL===true) {
        urlClass = 'is-url'
      }
      else if (isURL===false) {
        urlClass = 'is-not-url';
      }
    }
    const searchButton = hasSearchButton?(
      <a tabIndex="-1"
        onClick={this._onSubmit}
        href="javascript:void(0)"
        className="input-group-addon">
        <i className={iconState} />
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
              'col-md-offset-2',
              urlClass
            ].join(' ')}
          >
            <input
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              value={searchInput}
              type="search"
              placeholder={placeholder}
              className="form-control" style={homepageUrlSearchBox} />
            {status}
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

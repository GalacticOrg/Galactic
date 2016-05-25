/**
 * Copyright (c) 2016, Galactic
*/

import React from "react";
import Loader from 'react-loader';
import { Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import { getSearch, resetSearch } from './inputURL/actions'
import _ from 'lodash'

const ENTER_KEY_CODE = 13;

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
    const { initalValue, id} = this.props;
    this.uid = id?id:Math.random()*Math.pow(10, 17);
    if (initalValue){
      this.setState({
        searchInput:initalValue
      });
      this._search(initalValue);
    }
  }

  render() {
    const { searchInput } = this.state
    const { dispatch } = this.props
    const search = this.props[this.uid]

    let result = null;
    let node = null;
    let loading = false;
    let urlClass = '';
    let iconState = 'fa fa-search'
    if (search){
      node = search.node
      const isURL = search.isURL
      loading = search.loading?true:false;
      if (isURL===true) {
        urlClass = 'is-url'
      }
      else if (isURL===false) {
        urlClass = 'is-not-url';
      }
    }

    return (
      <div className="homepageUrlSearchForm">
        <div className="form-group homepageUrlFormGroup">
          <span
            className={[
              'homepageUrlSearchInputGroup',
              'input-group',
              urlClass
            ].join(' ')}
          >
            <input
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              value={searchInput}
              type="search"
              placeholder="Paste a link to search"
              className="form-control homepageUrlSearchBox" />
            {loading?<Loader left={'91%'} scale={0.55} />:null}
            <a tabIndex="-1" onClick={this._onSubmit} href="javascript:void(0)" className=" homepageUrlSearchIconBox input-group-addon">
              <i className={iconState} />
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
      this._search(searchInput)
    } else{
      this._reset()
    }
  }

  _search(searchInput) {
    const { dispatch } = this.props;
    dispatch(getSearch(searchInput, this.uid));
  }

  _reset(searchInput) {
    const { dispatch } = this.props;
    dispatch(resetSearch(this.uid));
  }


};

function mapStateToProps(state) {
  const searches = {...state.inputURLResult};
  return searches
}

export default connect(mapStateToProps)(InputURL)

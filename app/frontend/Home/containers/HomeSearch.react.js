import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar.react"
import LoginSignupModal from "../../components/LoginSignupModal.react"
import { FormGroup, FormControl, Button, InputGroup, Glyphicon } from "react-bootstrap"
import { postSearch } from '../actions'

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
    dispatch(postSearch(this.state.searchInput));
  }

  render() {
    const { title, id } = this.props
    const { searchInput } = this.state

    return (<div>
      <Navbar />
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
        </div>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  const { title, id } = state.urlResult
  return {
    title,
    id
  }
}

export default connect(mapStateToProps)(Home)

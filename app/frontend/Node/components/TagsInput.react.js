import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { postNodeTags } from "../actions/index"
import Tags from "../../components/Tags.react"

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;
class TagsInput extends Component {

  constructor() {
     super();
     this._tagChangeHandler = this._tagChangeHandler.bind(this)
     this._open = this._open.bind(this)
     this._close = this._close.bind(this)
     this._addTags = this._addTags.bind(this)
     this.state = {
       tagInput: '',
       open: false
     }
  }

  componentWillMount(){
    this.state={
      tagInput: this.props.tags.join(' ')
    }
  }

  componentWillReceiveProps(nextProps){
    this.state={
      tagInput: nextProps.tags.join(' ')
    }
  }

  render() {
    const { username, profileImageUrl, createdAt, length, tags } = this.props;

    if (!this.state.open){
      return (
      <div>
        <Tags tags={this.props.tags}/>
        <a href="javascript:void(0)" onClick={this._open}>Add/Edit Tags</a>
      </div>
      )
    }

    return (
      <div>
        <div className="input-group tag-entry">
          <input
            onChange={this._tagChangeHandler}
            onKeyDown={this._onKeyDown.bind(this)}
            value={this.state.tagInput}
            autoFocus={true}
            type="text" className="form-control" placeholder="enter tags..." />
            <span className="input-group-btn">
              <button
              onClick={this._addTags}
              className="btn btn-default"
              type="button">Submit</button>
            </span>
        </div>
      </div>
    )
  }

  _tagChangeHandler(e){
    e.preventDefault()
    this.setState({
      tagInput: e.target.value
    })
  }

  _onKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this._addTags()
    } else if (e.keyCode === ESC_KEY_CODE){
      this._close()
    }
  }

  _open(e){
    e.preventDefault()
    this.setState({
      open: true
    })
  }

  _close(){
    this.setState({
      open: false,
      tagInput: this.props.tags.join(' ')
    })
  }

  _addTags(){
    const {dispatch, id} = this.props;
    const val =this.state.tagInput.split(/[\s,]+/).filter(v=>v.length!==0);
    dispatch(postNodeTags(id, val))
    this.setState({
      open: false
    })
  }

}

TagsInput.propTypes = {
  tags: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}

export default connect()(TagsInput)

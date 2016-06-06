import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { postNodeTags } from "../actions/index"

export default class TagsInput extends Component {

  constructor() {
     super();
     this._tagChangeHandler = this._tagChangeHandler.bind(this)
     this._open = this._open.bind(this)
     this._close = this._close.bind(this)
     this.state = {
       tagInput: '',
       open: false
     }
  }

  componentWillMount(){
    this.state={
      open: this.props.isOpen?this.props.isOpen:false,
      tagInput: this.props.tags.join(' ')
    }
  }

  render() {
    const { username, profileImageUrl, createdAt, length, tags } = this.props;

    if (!this.state.open){
      return <a
        style={{padding:'0px 0px 20px 60px'}}
        href="javascript:void(0)"
        onClick={this._open}>+ Add/Edit Tags</a>
    }

    return (
      <div style={{padding:'10px 60px 20px'}}>
        <div className="input-group tag-entry">
          <input
            onChange={this._tagChangeHandler}
            value={this.state.tagInput}
            type="text" className="form-control" placeholder="enter tags..." />
            <span className="input-group-btn">
              <button
              onClick={this._addTags.bind(this, 'id goes here')}
              className="btn btn-default"
              type="button">Submit</button>
            </span>
        </div>
        <a href="javascript:void(0)" onClick={this._close}>close</a>
      </div>

    )
  }

  _tagChangeHandler(e){
    e.preventDefault()
    this.setState({
      tagInput: e.target.value
    })
  }

  _open(e){
    e.preventDefault()
    this.setState({
      open: true
    })
  }

  _close(e){
    e.preventDefault()
    this.setState({
      open: false
    })
  }

  _addTags(){
    const {dispatch, id} = this.props;
    const val =this.state.tagInput.split(' ').filter(v=>v.length!==0);
    dispatch(postNodeTags(id, val))
    this.setState({
      open: false
    })
  }

}

TagsInput.propTypes = {
  tags: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool
}

export default connect()(TagsInput)

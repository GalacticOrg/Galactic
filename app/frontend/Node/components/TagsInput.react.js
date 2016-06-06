import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { postNodeTags } from "../actions/index"

export default class TagsInput extends Component {

  constructor() {
     super();
     this._tagChangeHandler = this._tagChangeHandler.bind(this)
     this.state = {
       tagInput: ''
     }
  }

  componentWillMount(){
    this.state.tagInput=this.props.tags.join(' ');
  }

  render() {
    const { username, profileImageUrl, createdAt, length, tags } = this.props;

    return (
      <div className="input-group tag-entry" style={{padding:'10px 60px 20px'}}>
        <input
          onChange={this._tagChangeHandler}
          value={this.state.tagInput}
          type="text" className="form-control" placeholder="add Tags..." />
          <span className="input-group-btn">
          <button
            onClick={this._addTags.bind(this, 'id goes here')}
            className="btn btn-default"
            type="button">Submit</button>
        </span>
      </div>
    )
  }

  _tagChangeHandler(e){
    e.preventDefault()
    this.setState({
      tagInput: e.target.value
    })
  }

  _addTags(){
    const {dispatch, id} = this.props;
    const val =this.state.tagInput.split(' ').filter(v=>v.length!==0);
    dispatch(postNodeTags(id, val))
  }

}

TagsInput.propTypes = {
  tags: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}

export default connect()(TagsInput)

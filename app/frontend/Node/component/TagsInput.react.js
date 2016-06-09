  import React, { Component, PropTypes } from 'react'

  export default class TagInput extends Component {

    constructor() {
       super();
       this._tagChangeHandler = this._tagChangeHandler.bind(this)
       this.state = {
         tagInput: ''
       }
    }

    render() {
      const { username, profileImageUrl, createdAt, length, tags } = this.props;

      return (
        <div className="input-group tag-entry" style={{margin:'20px 60px 0px 0px'}}>
          <input
            onChange={that._tagChangeHandler}
            value={''}
            type="text" className="form-control" placeholder="add Tags..." />
            <span className="input-group-btn">
            <button
              onClick={this._addTag.bind(this, 'id goes here')}
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

  }

  TagInput.propTypes = {
    tags: PropTypes.array.isRequired
  }

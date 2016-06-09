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
      const { tags } = this.props;

      return (
        <div className="input-group tag-entry">
          <input
            onChange={that._tagChangeHandler}
            value={tags.join(' ')}
            type="text" className="form-control" placeholder="add Tags..." />
            <span className="input-group-btn">
            <button
              onClick={this.props.onSubmit.bind(this, this.state.tagInput)}
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
    tags: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

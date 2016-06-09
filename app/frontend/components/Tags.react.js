import React, { Component, PropTypes } from 'react'


export default class Tags extends Component {

  render() {
    const { tags  } = this.props;
    const tagJSX = tags.map(tag=>(
      <span>
        &nbsp;
        <i className="fa fa-tags" aria-hidden="true"></i>
        &nbsp;
        {tag}
      </span>
      ))
    return (
      <div className="tags">
        {tags&&tags.length>0?(
          <div style={{marginTop:'3px'}}>
            {tagJSX}
          </div>
        ):null}
      </div>
    )
  }
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired
}

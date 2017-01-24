import React, { Component, PropTypes } from 'react';

export default class Tags extends Component {

  render () {
    const { tags  } = this.props;
    const tagJSX = tags.map((tag, i) => (
      <span key={i} style={{ border: '1px solid rgba(255,165,0, 0.5)', padding: '1px 4px 2px 4px', marginLeft: 5 }}>{tag}</span>
      ));
    return (
      <span className="tags">
        {tags && tags.length > 0 ? (
          <span style={{ marginTop: 3, marginBottom: 5, marginRight: 5 }}>
            {tagJSX}
          </span>
        ) : null}
      </span>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};

import React, { Component, PropTypes } from 'react'
import EntityItemTitleHost from './EntityItemTitleHost.react'

const nodeEntityDescriptionStyle = {fontSize: '13px'}

export default class EntityItem extends Component {

  render() {
    const { tags  } = this.props;


    return (
      <div className="tags">
        {tags&&tags.length>0?<div style={{marginTop:'3px'}}>{tags.join(' ')}</div>:null}
      </div>
    )
  }
}

EntityItem.propTypes = {
  tags: PropTypes.array.isRequired
}

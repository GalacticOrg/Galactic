import React, { Component, PropTypes } from 'react'
import {timeSince} from '../../lib/Utils';

export default class EdgeConnectionItem extends Component {

  render() {
    const { username, profileImageUrl, createdAt  } = this.props;

    const time = timeSince(new Date(createdAt));
    return (
      <span>
        <a href={'/@'+username} style={{marginLeft: '5px', marginRight: '5px'}}>
          <img src={profileImageUrl} style={{height:'15px', width: '15px', borderRadius: '3px'}} />
        </a>
        <a href={'/@'+username}>@{username}</a>
        &nbsp;{time} ago
      </span>
    )
  }
}

EdgeConnectionItem.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.number
}

EdgeConnectionItem.defaultProps = {
  createdAt:null
}

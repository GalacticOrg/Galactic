import React, { Component, PropTypes } from 'react'
import moment from 'moment';

export default class EdgeConnectionItem extends Component {

  render() {
    const { username, profileImageUrl, createdAt  } = this.props;

    const time = moment(createdAt).fromNow()
    return (
      <span>
        <a href={'/@'+username} style={{marginLeft: '5px', marginRight: '5px'}}>
          <img src={profileImageUrl} style={{height:'15px', width: '15px', borderRadius: '3px'}} />
        </a>
        <a href={'/@'+username}>@{username}</a>
        &nbsp;{time}
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

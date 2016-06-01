import React, { Component, PropTypes } from 'react'
const edgeEntityStyle = {color: 'grey', marginLeft: '5px', fontSize: '12px'}
const edgeEntityTitle = {fontSize: '15px', fontWeight: 'bold'}
const edgeEntityDescription = {fontSize: '13px'}
const edgeUserStyle = {fontSize: '13x'}

export default class EdgeConnection extends Component {

  render() {
    const { username, profileImageUrl } = this.props;

    return (
      <div style={edgeUserStyle}>
        <span title={username}>
        <a href={'/@'+username} style={{marginLeft: '5px', marginRight: '5px'}}>
          <img src={profileImageUrl} style={{height:'15px', width: '15px'}} />
        </a>
        <a href={'/@'+username}>@{username}</a>
        </span>
        <span> | {Math.floor(Math.random() * (10 - 10)) + 10} edges</span>
      </div>
    )
  }
}

EdgeConnection.propTypes = {
  username: PropTypes.string.isRequired,
  profileImageUrl:  PropTypes.string.isRequired
}

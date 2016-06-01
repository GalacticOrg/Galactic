import React, { Component, PropTypes } from 'react'
const edgeUserStyle = {fontSize: '13x', borderTop: '1px #eee solid', paddingTop: '1px'}

export default class EdgeConnection extends Component {

  render() {
    const { username, profileImageUrl, createdAt } = this.props;

    return (
      <div className="edge-connection" style={edgeUserStyle}>
        <span title={username}>Connected by
        <a href={'/@'+username} style={{marginLeft: '5px', marginRight: '5px'}}>
          <img src={profileImageUrl} style={{height:'15px', width: '15px'}} />
        </a>
        <a href={'/@'+username}>@{username}</a>
        </span>
        <span> | {Math.floor(Math.random() * (10 - 10)) + 10} edges</span>
        <span> | {createdAt?new Date(createdAt).toLocaleString():null}</span>
      </div>
    )
  }
}

EdgeConnection.propTypes = {
  username: PropTypes.string.isRequired,
  profileImageUrl:  PropTypes.string.isRequired,
  createdAt: PropTypes.number
}

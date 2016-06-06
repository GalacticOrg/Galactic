import React, { Component, PropTypes } from 'react'
const edgeUserStyle = {fontSize: '13x', marginLeft: '60px', paddingTop: '1px'}
import { Alert } from "react-bootstrap"

export default class EdgeConnection extends Component {

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
      <div className="edge-connection" style={edgeUserStyle}>
        <span title={username}>Connected by
        <a href={'/@'+username} style={{marginLeft: '5px', marginRight: '5px'}}>
          <img src={profileImageUrl} style={{height:'15px', width: '15px'}} />
        </a>
        <a href={'/@'+username}>@{username}</a>
        </span>
        <span> | {length} edges</span>
        <span> | {new Date(createdAt).toLocaleString()}</span>
        {tags&&tags.length>0?<div>{tags.join(' ')}</div>:null}


        <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
          <div className="input-group" style={{width:'400px'}}>
            <input
              onChange={this._tagChangeHandler}
              value={this.state.tagInput}
              type="text" className="form-control" placeholder="add Tags..." />
              <span className="input-group-btn">
              <button
                onClick={this._addTag.bind(this, 'id goes here')}
                className="btn btn-default"
                type="button">Submit</button>
            </span>
          </div>
        </Alert>
      </div>
    )
  }

  _addTag(id){
    this.props.dispatch( postNodeTags(id, this.state.tagInput.split(' ') ));
    this.setState({
      tagInput: ''
    });
  }

  _tagChangeHandler(e){
    e.preventDefault()
    this.setState({
      tagInput: e.target.value
    })
  }

}

EdgeConnection.propTypes = {
  username: PropTypes.string.isRequired,
  profileImageUrl:  PropTypes.string.isRequired,
  tags: PropTypes.array,
  createdAt: PropTypes.number,
  length: PropTypes.number.isRequired,
}

import React, { Component } from 'react'
import ReactDOM from "react-dom";

export default class Connection extends Component {
  render() {
    debugger
    const { nodeTo, nodeFrom, user } = this.props;
    const username = user.username;

    return (<li className="connectionLiElement">
        <a href="#">{"@"+username}</a> connected&nbsp;
        <a href={'/node/'+nodeTo._id}>{nodeTo.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'')}</a> to&nbsp;
        <a href={'/node/'+nodeTo._id}>{nodeFrom.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'')}</a>
      </li>)
  }
}

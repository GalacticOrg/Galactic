import React, { Component } from 'react'
import ReactDOM from "react-dom";

export default class Connection extends Component {
  render() {
    const { nodeTo, nodeFrom, user, createdAt } = this.props;
    const username = user.username;
    const time = new Date(createdAt).toLocaleString();

    return (<li className="connectionLiElement">
        <a href={"/@"+username}>{"@"+username}</a> connected&nbsp;
        <a href={'/node/'+nodeFrom._id}>{nodeFrom.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'')}</a> to&nbsp;
        <a href={'/node/'+nodeTo._id}>{nodeTo.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'')}</a>&nbsp;
        <span className="muted" style={{fontSize:'.9em'}}>{time}</span>
      </li>)
  }
}

import React, { Component } from 'react'
import ReactDOM from "react-dom";
//import EntityItem from "../../components/EntityItem.react"

export default class Connection extends Component {
  render() {
    const { nodeTo, nodeFrom, user, createdAt } = this.props;
    const username = user.username;
    const time = new Date(createdAt).toLocaleString();


    return (<div>
    </div>

)
  }
}



// <li className="connectionLiElement">
//
//   <a href={"/@"+username}>{"@"+username}</a> connected&nbsp;
//   <a href={'/node/'+nodeFrom._id}>{nodeFrom.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'')}</a> to&nbsp;
//   <a href={'/node/'+nodeTo._id}>{nodeTo.canonicalLink.replace(/^(http:\/\/|https:\/\/)/,'')}</a>&nbsp;
//   - <span className="text-muted" style={{fontSize:'.85em'}}>{time}</span>
// </li>

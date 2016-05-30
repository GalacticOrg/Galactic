import React, { Component } from 'react'
const edgeEntityStyle = {color: 'grey', marginLeft: '5px', fontSize: '12px'}
const edgeEntityTitle = {fontSize: '15px', fontWeight: 'bold'}
const edgeEntityDescription = {fontSize: '13px'}
const edgeUserStyle = {fontSize: '13x'}

export default class EntityItem extends Component {

  render() {
    debugger

    const { entity, user } = this.props;

    let edgeImg = null;
    if (entity.imageCDN.url){
    edgeImg = entity.imageCDN.url;
    } else if (entity.faviconCDN){
      edgeImg = entity.faviconCDN;
    } else {
      edgeImg = 'http://i.imgur.com/LuieUNb.jpg'
    }

    let sourceURL=document.createElement('a')
    sourceURL.href=entity.canonicalLink
    return (
      <div className="connectionCard" xsOffset={1} xs={9} mdOffset={1} md={7}>
        <div style={{display: 'block'}}>
          <div style={{float: 'left', maxHeight:'50px', overflow:'hidden'}}>
            <img src={edgeImg} style={{width: '50px' }}/>
          </div>
          <div style={{marginLeft: '60px'}}>
            <div>
              <a href={'/node/'+entity._id}
              title={entity.canonicalLink}
              className="noUnderline">
                <span style={edgeEntityTitle}>{entity.title}</span>
              </a>
              <span style={edgeEntityStyle}>
                <a href={sourceURL.href} target="_blank" >({sourceURL.host})</a>
              </span>
            </div>
            <div>
              <span style={edgeEntityDescription}>{entity.description}</span>
            </div>
            <div style={edgeUserStyle}>
              <span title={user.username}>Connected by
              <a href={'/@'+user.username} style={{marginLeft: '5px', marginRight: '5px'}}>
                <img src={user.twitter.profile_image_url} style={{height:'15px', width: '15px'}} />
              </a>
              <a href={'/@'+user.username}>@{user.username}</a>
              </span>
              <span> | {this.getRandomInt(0,20)} edges</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

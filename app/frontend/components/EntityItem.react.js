import React, { Component, PropTypes } from 'react'
const edgeEntityStyle = {color: 'grey', marginLeft: '5px', fontSize: '12px'}
const edgeEntityTitleStyle = {fontSize: '15px', fontWeight: 'bold'}
const edgeEntityDescriptionStyle = {fontSize: '13px'}

export default class EntityItem extends Component {

  render() {
    const { imageCDN, faviconCDN, canonicalLink, title, description, id, edge=null  } = this.props;

    let edgeImg = null;
    if (imageCDN){
    edgeImg = imageCDN;
    } else if (faviconCDN){
      edgeImg = faviconCDN;
    } else {
      edgeImg = 'http://i.imgur.com/LuieUNb.jpg'
    }

    let edgeTitle = ''
    if (title.length > 100){
      edgeTitle = description.slice(0,100)+"..."
    } else {
      edgeTitle = title
    }

    let edgeDescription = ''
    if (description.length > 200){
      edgeDescription = description.slice(0,200)+"..."
    } else {
      edgeDescription = description
    }

    let sourceURL=document.createElement('a')
    sourceURL.href=canonicalLink

    return (
      <div className="connectionCard">
        <div style={{display: 'block'}}>
          <div style={{float: 'left', maxHeight:'50px', overflow:'hidden'}}>
            <img src={edgeImg} style={{width: '50px' }}/>
          </div>
          <div style={{marginLeft: '60px'}}>
            <div>
              <a href={'/node/'+id}
              title={canonicalLink}
              className="noUnderline">
                <span style={edgeEntityTitleStyle}>{edgeTitle}</span>
              </a>
              <span style={edgeEntityStyle}>
                <a href={sourceURL.href} target="_blank" >({sourceURL.host})</a>
              </span>
            </div>
            <div>
              <span style={edgeEntityDescriptionStyle}>{edgeDescription}</span>
            </div>
            {edge}
          </div>
        </div>
      </div>
    )
  }
}

EntityItem.propTypes = {
  imageCDN: PropTypes.string.isRequired,
  faviconCDN: PropTypes.string.isRequired,
  canonicalLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  edge: PropTypes.object
}

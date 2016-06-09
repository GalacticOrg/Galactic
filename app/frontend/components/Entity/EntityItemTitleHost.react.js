import React, { Component, PropTypes } from 'react'
const nodeEntityStyle = {color: 'grey', marginLeft: '5px', fontSize: '12px'}
const nodeEntityTitleStyle = {fontSize: '15px', fontWeight: 'bold'}

export default class EntityItemTitleHost extends Component {

  render() {
    const { count, canonicalLink, id, title, faviconCDN  } = this.props;

    let sourceURL=document.createElement('a')
    sourceURL.href=canonicalLink




    return (
      <div>
        {faviconCDN?<img style={{width:'16px', marginTop:'-5px'}} src={faviconCDN} />:null}
        <a href={'/node/'+id}
        title={canonicalLink}
        className="noUnderline">
          <span style={nodeEntityTitleStyle}>{title}</span>
        </a>
        <span style={nodeEntityStyle}>
          <a href={sourceURL.href} target="_blank" >({sourceURL.host})</a>
          &nbsp;
          <span className="label label-default">{count}</span>
        </span>
      </div>
    )
  }
}

EntityItemTitleHost.propTypes = {
  faviconCDN: PropTypes.string,
  id: PropTypes.string.isRequired,
  canonicalLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

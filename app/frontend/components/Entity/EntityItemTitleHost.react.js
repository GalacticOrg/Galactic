import React, { Component, PropTypes } from 'react';
const nodeEntityStyle = {
  display: 'inline-block',
  color: 'grey',
  marginLeft: '5px',
  fontSize: '12px'
};
const nodeEntityTitleStyle = {
  display: 'inline-block',
  maxWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '15px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  verticalAlign: 'top'
};

export default class EntityItemTitleHost extends Component {

  render () {
    const { count, canonicalLink, id, title, faviconCDN  } = this.props;
    let sourceURL = document.createElement('a');
    sourceURL.href = canonicalLink;
    const href = '/node/' + id;

    return (
      <div>
        {faviconCDN ? <img style={{ width:'16px', marginTop:'-5px', marginRight:'3px' }} src={faviconCDN} /> : null}
        <a href={href} title={canonicalLink} className="noUnderline">
          <span style={nodeEntityTitleStyle}>
            {title.length > 0 ? title : sourceURL.host + (sourceURL.pathname.length > 1 ? sourceURL.pathname : '')}
          </span>
        </a>
        <span style={nodeEntityStyle}>
          (<a href={sourceURL.href} target="_blank" >
            {sourceURL.host}
          </a>)
          &nbsp;
        </span>
      </div>
    );
  }
}

EntityItemTitleHost.propTypes = {
  faviconCDN: PropTypes.string,
  id: PropTypes.string.isRequired,
  canonicalLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number
};

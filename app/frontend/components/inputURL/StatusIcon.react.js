/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component, PropTypes } from 'react'
import Loader from 'react-loader';
const statusStyle = {margin: '0px', padding: '.5em 10px', fontSize:'1.5em',color:'#BDBDBD'}

export default class StatusIcon extends Component {

  render() {
      const { loading = false, close, hasReset } = this.props;
      let status = null;
      if (loading) status = (<div>
        <Loader scale={0.55} />
        <span style={{ padding: '5px', margin: '14px', display: 'inline-block'}}  />
        </div>);
      else if (hasReset)
        status = (<a className="status-icon"
          tabIndex="-1"
          href="javascript:void(0)">
          <i className="fa fa-times" style={statusStyle} onClick={close} />
      </a>);

    return (
      status
    )
  }
}

StatusIcon.propTypes = {
  loading: PropTypes.bool,
  close: PropTypes.func,
  hasReset: PropTypes.bool.isRequired
}

/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component, PropTypes } from 'react'
import Loader from 'react-loader';
const statusStyle = {margin: '0px', padding: '.5em 10px', fontSize:'1.5em',color:'#BDBDBD'}

export default class StatusIcon extends Component {

  render() {
      const { loading = false, close, hasText } = this.props;
      let status = null;
      if (loading) status = (<div>
        <Loader scale={0.55} />
        <span style={{ padding: '5px', margin: '14px', display: 'inline-block'}}  />
        </div>);
      else if (hasText)
        status = <a href="javascript:void(0)"><i className="fa fa-times" style={statusStyle} onClick={close} /> </a>;

    return (
      status
    )
  }
}

StatusIcon.propTypes = {
  loading: PropTypes.bool,
  close: PropTypes.func,
  hasText: PropTypes.bool.isRequired
}

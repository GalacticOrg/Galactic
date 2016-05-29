/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component } from 'react'
import Loader from 'react-loader';



export default class StatusIcon extends Component {

  render() {

    const statusStyle = {margin: '0px'}
    let status = null;
    let loading = true;

      if (loading) status = (<div>
        <Loader scale={0.55} />
        <span style={{ padding: '5px', margin: '14px', display: 'inline-block'}}  />
      </div>)
      else if (isURL)
        status = this.makePopover(
          <i className="fa fa-check-circle is-url" style={statusStyle} />,
          'text',
          'title');
      else if (isURL==false)
        status = this.makePopover(
          <i className="fa fa-times-circle-o is-not-url" style={statusStyle} />,
          'text',
          'title');

    return (
      <div>{status}</div>
    )
  }
};
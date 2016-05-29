/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component, PropTypes } from 'react'

export default class InputButton extends Component {

  render() {
    const { onSubmit, iconState, href='javascript:void(0)' } = this.props
    return (
      <a tabIndex="-1"
        onClick={onSubmit}
        href={href}
        className="input-group-addon"
        style={this.isDisabled()} >
        <i style={{fontSize:'1.4em'}}
           className={iconState}/>
      </a>
    )
  }

  isDisabled() {
    let disabled = {};
    if (this.props.disabled) {
      disabled.cursor = 'not-allowed';
    }
    return disabled
  }

};

InputButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  iconState: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  href: PropTypes.string
}

InputButton.getDefaultProps = {
  disabled: false,
  href: 'javascript:void(0)'
}

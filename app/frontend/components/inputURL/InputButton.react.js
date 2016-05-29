/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component, PropTypes } from 'react'

export default class InputButton extends Component {

  render() {
    const { onSubmit, iconState, href='javascript:void(0)' } = this.props
    return (
      <div className="input-group-addon" style={{
        backgroundColor: 'white',
        padding: '0px',
        paddingBottom: '1px',
        paddingLeft: '2px',
        paddingRight: '2px'
      }}>
        <a tabIndex="-1"
          onClick={onSubmit}
          href={href}
          // className="input-group-addon"
          style={this.isDisabled()} >
          <i style={{fontSize:'1.4em'}}
             className={iconState}/>
        </a>
      </div>
    )
  }

  isDisabled() {
    let disabled = {
      paddingTop: '9px', //directly related to height of container (gap should be 2px)
      paddingBottom: '8px', //directly related to height of container (gap should be 2px)
      paddingLeft: '18px',
      paddingRight: '18px',
      backgroundColor: '#66AD57', //$success-green
      border: '1px solid #66AD57', //$success-green
      borderRadius: '3px',
      color: 'white'
    };
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

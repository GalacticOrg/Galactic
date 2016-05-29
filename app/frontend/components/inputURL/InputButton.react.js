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
        paddingRight: '3px',
        paddingBottom: '1px',
        borderColor: 'rgb(197, 197, 197)'
      }}>
        <a tabIndex="-1"
          onClick={onSubmit}
          href={href}
          style={this.buttonState()} >
          <i style={{fontSize:'1.4em'}}
             className={iconState}/>
        </a>
      </div>
    )
  }

  buttonState(){
    let buttonState = {
      paddingTop: '9px', //directly related to height of container (gap should be 2px)
      paddingBottom: '8px', //directly related to height of container (gap should be 2px)
      paddingLeft: '18px',
      paddingRight: '18px',
      backgroundColor: 'white',
      border: '1px solid white',
      borderRadius: '3px',
      color: 'grey'
    }
    if (this.props.iconState === "fa fa-search" && this.props.href !== 'javascript:void(0)'){ // BRITTLE
      buttonState.backgroundColor = '#66AD57'; //$success-green
      buttonState.border = '1px solid #66AD57'; //$success-orange
      buttonState.color = 'white';
    } else if (this.props.iconState === 'fa fa-search-plus'){ // BRITTLE
      buttonState.backgroundColor = 'orange'; //$connection-orange
      buttonState.border = '1px solid orange'; //$connection-orange
      buttonState.color = 'white';
    }
    if (this.props.disabled){
      buttonState.cursor = 'not-allowed';
      buttonState.backgroundColor = '#FF0000'; //$error-red;
      buttonState.border = '1px solid #FF0000'; //$error-red
      buttonState.color = 'white';
    }
    return buttonState;
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

/**
 * Copyright (c) 2016, WikiWeb
*/

import React, { Component, PropTypes } from 'react'

export default class InputButton extends Component {

  constructor () {
    super()
    this.state = {
      isHovering: false
    };
  }

  handleMouseOver () { // GOOD: set this.state.isHovering to false on mouse leave
    this.setState({ isHovering: true });
  }

  handleMouseOut () { // GOOD: set this.state.isHovering to false on mouse leave
    this.setState({ isHovering: false });
  }

  render() {
    const { onSubmit, iconState, href='javascript:void(0)' } = this.props
    return (
      <div className="input-group-addon" style={{
        backgroundColor: 'white',
        padding: '0px',
        paddingRight: '3px',
        paddingBottom: '1px',
        borderColor: 'rgb(197, 197, 197)',
        borderLeft: 'none',
        borderRadiusRight: '4px'
      }}>
        <a tabIndex="-1"
          onClick={onSubmit}
          href={href}
          style={this.buttonState()}
          onMouseOver={this.handleMouseOver.bind(this)}
          onMouseOut={this.handleMouseOut.bind(this)}
          >
          <i style={{fontSize:'1.4em'}}
             className={iconState}/>
        </a>
      </div>
    )
  }

  buttonState(){
    let buttonStyle = {
      paddingTop: '9px', //directly related to height of container (gap should be 2px)
      paddingBottom: '8px', //directly related to height of container (gap should be 2px)
      paddingLeft: '18px',
      paddingRight: '18px',
      backgroundColor: 'white',
      border: '1px solid white',
      borderRadius: '3px',
      color: 'grey',
      WebkitFontSmoothing: 'antialiased',
    }
    if (this.props.iconState === "fa fa-search" && this.props.href !== 'javascript:void(0)'){ // BRITTLE
      buttonStyle.backgroundColor = '#66AD57'; //$success-green
      buttonStyle.border = '1px solid #66AD57'; //$success-green
      buttonStyle.color = 'white';
    } else if (this.props.iconState === 'fa fa-search-plus'){ // BRITTLE
      buttonStyle.backgroundColor = '#ff9900'; //$connection-orange
      buttonStyle.border = '1px solid #ff9900'; //$connection-orange
      buttonStyle.color = 'white';
    }
    if (this.props.disabled){
      buttonStyle.cursor = 'not-allowed';
      buttonStyle.backgroundColor = '#FF0000'; //$error-red;
      buttonStyle.border = '1px solid #FF0000'; //$error-red
      buttonStyle.color = 'white';
    }
    if (this.state.isHovering === true){ // SUPER BRITTLE!
      if (buttonStyle.backgroundColor === '#ff9900') //$connection-orange
        buttonStyle.backgroundColor = '#e68a00' //$connection-orange-layover
      else if (buttonStyle.backgroundColor === '#66AD57') //$success-green
        buttonStyle.backgroundColor = '#599a4c' //$success-layover
    }
    return buttonStyle;
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

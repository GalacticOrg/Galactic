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

  handleMouseOver () {
    this.setState({ isHovering: true });
  }

  handleMouseOut () {
    this.setState({ isHovering: false });
  }

  render() {
    const { onSubmit, href='javascript:void(0)' } = this.props
    return (
      <div className="input-group-addon input-button" style={{
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
             className="fa fa-search"/>
        </a>
      </div>
    )
  }

  buttonState(){
    const { isURL } = this.props;
    let buttonStyle = {
      paddingTop: '10px', //directly related to height of container (gap should be 2px)
      paddingBottom: '9px', //directly related to height of container (gap should be 2px)
      paddingLeft: '18px',
      paddingRight: '18px',
      backgroundColor: 'white',
      borderRadius: '3px',
      color: 'grey',
      WebkitFontSmoothing: 'antialiased',
    }

    if (isURL===true){
      buttonStyle.backgroundColor = '#66AD57'; //$error-red;
      buttonStyle.color = '#FFF';
    }else if (isURL===false){
      buttonStyle.cursor = 'not-allowed';
      buttonStyle.backgroundColor = '#FF0000'; //$error-red;
      buttonStyle.color = '#FFF';
    }

    if ( this.state.isHovering === true ) { // @todo SUPER BRITTLE!
      if (isURL===false){
          //noopp
      } else {
        buttonStyle.color = '#FFF',
        buttonStyle.backgroundColor = '#599a4c' //$success-layover
      }
    }
    return buttonStyle;
  }
};

InputButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  isURL: PropTypes.bool
}

InputButton.getDefaultProps = {
  disabled: false,
  href: 'javascript:void(0)',
  isURL: null
}

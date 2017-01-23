/**
 * Copyright (c) 2017, WikiWeb
*/

import React, { PropTypes } from "react";

export default class EntityImg extends React.Component {
  constructor () {
     super();
     this._handleImageErrored = this._handleImageErrored.bind(this);
     this.state = {
       imgError: false
     };
  }

  render () {
    const { imgError } = this.state;
    const { imgSrc } = this.props;

    return (
      <div
        className="text-center"
        style={{ paddingTop:'5px' }}>
        <img src={imgError ? '/img/document.png' : imgSrc}
          onError={this._handleImageErrored}
          style={{ maxWidth: '50px' }}
        />
      </div>
    );
  }

  _handleImageErrored (){
    this.setState({
      imgError:true
    });
  }
}

EntityImg.propTypes = {
  imgSrc:  PropTypes.string.isRequired
};

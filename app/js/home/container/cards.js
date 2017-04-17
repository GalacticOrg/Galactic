import React, { Component } from 'react'
import Card from '../components/card'
class Cards extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div style="background-color: red">
        This is the container Cards.js
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
};

export default Cards;

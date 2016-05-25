import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from "react-dom";

export default class Timer extends Component {
  constructor(){
    super();
    this.state = {
      secondsElapsed: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render() {
    const { secondsElapsed } = this.state
    return (
      <div>Seconds Elapsed: {secondsElapsed}</div>
    );
  }

  tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }
}


import React, { Component } from 'react';

import audioContext from '../AudioContext';

export default class Note extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay() {
    let oscillator = audioContext.createOscillator();
    let gain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = this.props.frequency;
    oscillator.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1.5);
  }

  render() {
    return <button type="button" onClick={this.handlePlay}>{ this.props.note }</button>;
  }
};

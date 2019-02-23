import React, { Component } from 'react';

import audioContext from '../../services/AudioContext';
import Event from '../../services/Event';

const DEFAULT_DURATION = 1.5;
const DEFAULT_WAVE = 'sine';

export default class Key extends Component {
  state = {
    isPlaying: false
  }

  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentWillMount() {
    Event.addListener(`${this.props.note}-down`, this.handlePlay);
    Event.addListener(`${this.props.note}-up`, this.handleStop);
  }

  componentWillUnmount() {
    this.handleStop();
    Event.removeListener(`${this.props.note}-down`, this.handlePlay);
    Event.removeListener(`${this.props.note}-up`, this.handleStop);
  }

  handlePlay() {
    if (!this.state.isPlaying) {
      this.oscillator = audioContext.createOscillator();
      this.gain = audioContext.createGain();

      this.oscillator.type = this.props.wave || DEFAULT_WAVE;
      this.oscillator.connect(this.gain);
      this.gain.connect(audioContext.destination);

      this.oscillator.frequency.value = this.props.frequency;
      this.oscillator.start(0);

      this.setState({ isPlaying: true });
    }
  }

  handleStop() {
    if (this.state.isPlaying) {
      this.gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + (parseInt(this.props.duration, 10) || DEFAULT_DURATION));
      this.setState({ isPlaying: false });
    }
  }

  render() {
    let keyType = this.props.note.indexOf('#') > -1 ? 'key-black' : 'key-white';
    keyType += ' key';

    return (<div className={ keyType } onPointerDown={ this.handlePlay } onPointerUp={ this.handleStop }>
      { this.props.note }
    </div>);
  }
};

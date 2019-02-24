import React, { Component } from 'react';

import './Keyboard.css';

import data from '../../data/notes.json';
import Event from '../../services/Event';

import Key from '../Key';
import Wave from '../Wave';

const MIDDLE_C = 'C4';
const OCTAVE = 12;
const MAXIMUM_KEY_INDEX = 97;
const KEYS_SHOWN = 18;
const NOTE_KEYS = `awsedftgyhujkolp;'`.split('');

export default class Keyboard extends Component {
  state = {
    start: 0,
    notes: data.notes,
    range: [],
    isMaxOctave: false,
    isMinOctave: false,
    wave: 'sine'
  }

  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.triggerNote = this.triggerNote.bind(this);
    this.handleOctaveUp = this.handleOctaveUp.bind(this);
    this.handleOctaveDown = this.handleOctaveDown.bind(this);
    this.handleWaveChange = this.handleWaveChange.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  componentWillMount() {
    // eslint-disable-next-line
    this.state.start = this.state.notes.findIndex(element => element.name === MIDDLE_C);

    // eslint-disable-next-line
    this.state.range = this.getKeys();
  }

  handleKeyDown(e) {
    if (NOTE_KEYS.includes(e.key)) {
      this.triggerNote(e.key, 'down');
    }
  }

  handleKeyUp(e) {
    if (NOTE_KEYS.includes(e.key)) {
      this.triggerNote(e.key, 'up');
    } else if (e.key === 'z') {
      this.handleOctaveDown();
    } else if (e.key === 'x') {
      this.handleOctaveUp();
    }
  }

  triggerNote(key, direction) {
    let index = NOTE_KEYS.indexOf(key);
    let note = this.state.range[index];
    if (note && note.name) {
      Event.trigger(`${note.name}-${direction}`);
    }
  }

  async handleOctaveDown() {
    if (!this.state.isMinOctave) {
      let start = Math.max(this.state.start - OCTAVE, 0);
      await this.setState({ start: start });

      let isMinOctave = start === 0;

      this.setState({
        range: this.getKeys(),
        isMinOctave: isMinOctave,
        isMaxOctave: false
      });
    }
  }

  async handleOctaveUp() {
    if (!this.state.isMaxOctave) {
      let start = Math.min(this.state.start + OCTAVE, MAXIMUM_KEY_INDEX);
      await this.setState({ start: start });

      let range = this.getKeys();
      let isMaxOctave = range.length < 18;

      this.setState({
        range: range,
        isMaxOctave: isMaxOctave,
        isMinOctave: false
      });
    }
  }

  handleWaveChange(type) {
    this.setState({
      wave: type
    });
  }

  getKeys() {
    let end = Math.min(this.state.start + KEYS_SHOWN, MAXIMUM_KEY_INDEX);
    return this.state.notes.slice(this.state.start, end);
  }

  render() {
    return (
      <React.Fragment>
        <div class="waves">
          <Wave onChange={ this.handleWaveChange } />
        </div>
        <div className="keyboard" onKeyDown={ this.handleKeyDown } onKeyUp={ this.handleKeyUp } tabIndex="0">
          <div className="keys">
            { this.state.range.map((key, index) => <Key key={key.name} note={ key.name } frequency={ key.frequency } index={ this.state.start + index + 1 } wave={ this.state.wave } />) }
          </div>
        </div>
      </React.Fragment>
    );
  }
};

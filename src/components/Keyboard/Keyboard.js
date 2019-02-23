import React, { Component } from 'react';

import data from '../../data/notes.json';
import Event from '../../services/Event';

import Key from '../Key';
import Wave from '../Wave';

const MAXIMUM_KEY_INDEX = 87;
const KEYS_SHOWN = 18;
const MAXIMUM_KEY_START = MAXIMUM_KEY_INDEX - KEYS_SHOWN;
const NOTE_KEYS = `awsedftgyhujkolp;'`.split('');

export default class Keyboard extends Component {
  state = {
    start: 0,
    notes: data.notes,
    range: []
  }

  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOctaveUp = this.handleOctaveUp.bind(this);
    this.handleOctaveDown = this.handleOctaveDown.bind(this);
    this.handleWaveChange = this.handleWaveChange.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  componentWillMount() {
    // eslint-disable-next-line
    this.state.start = this.state.notes.findIndex(element => element.name === 'C4');

    // eslint-disable-next-line
    this.state.range = this.getKeys();
  }

  handleKeyDown(e) {
    if (NOTE_KEYS.includes(e.key)) {
      let index = NOTE_KEYS.indexOf(e.key);
      let note = this.state.range[index];
      Event.trigger(`${note.name}-down`);
    }
  }

  handleKeyUp(e) {
    if (NOTE_KEYS.includes(e.key)) {
      let index = NOTE_KEYS.indexOf(e.key);
      let note = this.state.range[index];
      Event.trigger(`${note.name}-up`);
    }
  }

  handleOctaveDown() {
    // TODO handle octave down
  }

  handleOctaveUp() {
    // TODO handle octave up
  }

  handleWaveChange(e) {
    // TODO handle wave change
  }

  getKeys() {
    let end = Math.min(this.state.start + KEYS_SHOWN, MAXIMUM_KEY_INDEX);
    return this.state.notes.slice(this.state.start, end);
  }

  render() {
    return (
      <Wave onChange={ this.handleWaveChange } />
      <div className="keyboard" onKeyDown={ this.handleKeyDown } onKeyUp={ this.handleKeyUp } tabIndex="0">
        { this.state.range.map((key, index) => <Key key={key.name} note={ key.name } frequency={ key.frequency } index={ this.state.start + index + 1 } />) }
      </div>
    );
  }
};

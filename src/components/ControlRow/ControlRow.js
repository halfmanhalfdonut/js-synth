import React, { Component } from 'react';

import './ControlRow.css';
import Wave from '../Wave';
import Octave from '../Octave';

export default class ControlRow extends Component {
  render() {
    return (
      <div className="control-row">
        <div className="control-row-group">
          <Octave onChange={ this.props.onOctaveChange } />
        </div>
        <div className="control-row-group">
          <Wave onChange={ this.props.onWaveChange } />
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

import './ControlRow.css';
import Wave from '../Wave';

export default class ControlRow extends Component {
  render() {
    return (
      <div className="control-row">
        <div className="control-row-group">
          <div className="control-row-title">Octave</div>
          <div className="control-item">
            <div className="control-name">Down</div>
            <div className="control-letter">z</div>
          </div>
          <div className="control-item">
            <div className="control-name">Up</div>
            <div className="control-letter">x</div>
          </div>
        </div>
        <div className="control-row-group">
          <Wave onChange={ this.props.onWaveChange } />
        </div>
      </div>
    );
  }
}

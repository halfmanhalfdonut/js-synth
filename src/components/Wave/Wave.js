import React, { Component } from 'react';
import './Wave.css';

import Event from '../../services/Event';

export default class Wave extends Component {
  state = {
    selected: 'sine'
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getCssClass = this.getCssClass.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    Event.addListener('wave-change', this.handleUpdate);
  }

  componentWillUnmount() {
    Event.removeListener('wave-change', this.handleUpdate);
  }

  handleClick(e) {
    let wave = e.currentTarget.getAttribute('data-wave');
    this.setState({ selected: wave });
    this.props.onChange(wave);
  }

  handleUpdate(type) {
    this.setState({ selected: type });
  }

  getCssClass(wave) {
    return this.state.selected === wave ? 'control-item selected' : 'control-item';
  }

  render() {
    return (
      <React.Fragment>
        <div className="control-row-title">Waveform</div>
        <div className={this.getCssClass('sine')} onClick={this.handleClick} data-wave="sine">
          <div className="control-name">Sine</div>
          <div className="control-letter">v</div>
        </div>
        <div className={this.getCssClass('sawtooth')} onClick={this.handleClick} data-wave="sawtooth">
          <div className="control-name">Sawtooth</div>
          <div className="control-letter">b</div>
        </div>
        <div className={this.getCssClass('square')} onClick={this.handleClick} data-wave="square">
          <div className="control-name">Square</div>
          <div className="control-letter">n</div>
        </div>
        <div className={this.getCssClass('triangle')} onClick={this.handleClick} data-wave="triangle">
          <div className="control-name">Triangle</div>
          <div className="control-letter">m</div>
        </div>
      </React.Fragment>
    );
  }
}

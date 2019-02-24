import React, { Component } from 'react';
import './Wave.css';

export default class Wave extends Component {
  state = {
    selected: 'sine'
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getCssClass = this.getCssClass.bind(this);
  }

  handleClick(e) {
    let wave = e.target.getAttribute('data-wave');
    this.setState({ selected: wave });
    this.props.onChange(wave);
  }

  getCssClass(wave) {
    return this.state.selected === wave ? 'button selected' : 'button';
  }

  render() {
    return (
      <React.Fragment>
        <button className={this.getCssClass('sine')} type="button" onClick={this.handleClick} data-wave="sine">Sine</button>
        <button className={this.getCssClass('sawtooth')} type="button" onClick={this.handleClick} data-wave="sawtooth">Sawtooth</button>
        <button className={this.getCssClass('square')} type="button" onClick={this.handleClick} data-wave="square">Square</button>
        <button className={this.getCssClass('triangle')} type="button" onClick={this.handleClick} data-wave="triangle">Triangle</button>
      </React.Fragment>
    );
  }
}

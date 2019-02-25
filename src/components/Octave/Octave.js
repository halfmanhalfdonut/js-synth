import React, { Component } from 'react';

export default class Octave extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let direction = e.currentTarget.getAttribute('data-dirction');
    this.props.onChange(direction);
  }

  render() {
    return (
      <React.Fragment>
        <div className="control-row-title">Octave</div>
        <div className="control-item" onClick={this.handleClick} data-dirction="down">
          <div className="control-name">Down</div>
          <div className="control-letter">z</div>
        </div>
        <div className="control-item" onClick={this.handleClick} data-dirction="up">
          <div className="control-name">Up</div>
          <div className="control-letter">x</div>
        </div>
      </React.Fragment>
    );
  }
}

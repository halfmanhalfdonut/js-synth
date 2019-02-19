import React, { Component } from 'react';

import data from '../../data/notes.json';
import Note from '../Note';

export default class Piano extends Component {
  render() {
    return data.notes.map(note => <Note key={note.name} note={ note.name } frequency={ note.frequency }/>);
  }
};

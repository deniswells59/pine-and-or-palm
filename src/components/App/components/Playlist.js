import React, { Component } from 'react';
import Song from './Song';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='playlist'>
        <Song id='small' name='dakota' />
        <Song name='for loko ono' />
        <Song name='i killed jfk' />
        <Song name='engineer song' />
      </div>
    );
  }
}

export default Playlist;

import React, { Component } from 'react';
import Song from './Song';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='playlist'>
        <Song {...this.props} active='true' id='small' name='dakota' />
        <Song {...this.props} name='for loko ono' />
        <Song {...this.props} name='i killed jfk' />
        <Song {...this.props} name='engineer song' />
      </div>
    );
  }
}

export default Playlist;

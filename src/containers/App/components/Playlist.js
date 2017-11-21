import React, { Component } from 'react';
import Song from './Song';

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='playlist'>
        <Song {...this.props} id='small' name='dakota' />
        <Song {...this.props} name='i_killed_jfk' />
        <Song {...this.props} name='four_loko_ono' />
        <Song {...this.props} last='true' name='engineer_song' />
      </div>
    );
  }
}

export default Playlist;

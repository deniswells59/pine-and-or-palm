import React, { Component } from 'react';
import Playlist from './Playlist';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
      translate3d: 0,
      marquee: null,
      playlist: [
        <Playlist key='1' />,
        <Playlist key='2' />,
        <Playlist key='3' />
      ],
    }

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <footer>
        <div className='marquee'>

          { this.state.playlist }

        </div>
      </footer>
    );
  }
}

export default AudioPlayer;

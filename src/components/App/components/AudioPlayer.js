

import React, { Component } from 'react';
import Playlist from './Playlist';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
      translate3d: 0,
      marquee: null,
      playing: true,
      trackList: ['dakota', 'i_killed_jfk', 'for_loko_ono', 'engineer_song'],
      track: 'dakota'
    }

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="audio-player">
        <div
          className="controls"
          style={{backgroundImage: `linear-gradient(to bottom, ${this.props.colors.main}, ${this.props.colors.accent})`}}>
          <button
            className='audio-control'
            id='prev'
            style={{color: this.props.colors.text}}>
            <i className="icon icon-rewind-outline"></i>
          </button>
          <button
            className='audio-control'
            id='pause'
            style={{color: this.props.colors.text}}>
            <i className="icon icon-pause-outline"></i>
          </button>
          <button
            className='audio-control'
            id='next'
            style={{color: this.props.colors.text}}>
              <i className="icon icon-fast-fw-outline"></i>
          </button>
        </div>

        <footer
          style={{ 'backgroundColor': this.props.colors.main }}>
          <div className='marquee'>

            <Playlist {...this.props} {...this.state} />,

          </div>
        </footer>
      </div>
    );
  }
}

export default AudioPlayer;

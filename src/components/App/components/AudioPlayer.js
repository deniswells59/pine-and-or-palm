import React, { Component } from 'react';
import Playlist from './Playlist';
import AudioControl from './AudioControl';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
      translate3d: 0,
      marquee: null,
      playing: false,
      trackList: ['dakota', 'i_killed_jfk', 'for_loko_ono', 'engineer_song'],
      track: 'dakota'
    }

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    let icon = 'icon-pause-outline';

    if(!this.state.playing) icon = 'icon-play-outline';
    return (
      <div className="audio-player">
        <div
          className="controls">
          <AudioControl
            {...this.props}
            id='prev'
            icon='icon-rewind-outline' />
          <AudioControl
            {...this.props}
            id='pause'
            icon={ icon } />
          <AudioControl
            {...this.props}
            id='fwd'
            icon='icon-fast-fw-outline' />
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

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

    this.pause = this.pause.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  pause() {
    this.setState({ playing: !this.state.playing });
  }

  prev() {
    console.log('prev!');
  }

  next() {
    console.log('next!');
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
            clickHandler={ this.prev }
            id='prev'
            icon='icon-rewind-outline' />
          <AudioControl
            {...this.props}
            clickHandler={ this.pause }
            id='pause'
            icon={ icon } />
          <AudioControl
            {...this.props}
            clickHandler={ this.next }
            id='fwd'
            icon='icon-fast-fw-outline' />
        </div>

        <footer
          style={{ 'backgroundColor': this.props.colors.main }}>
          <div className='marquee'>

            <Playlist {...this.props} {...this.state} />

          </div>
        </footer>
      </div>
    );
  }
}

export default AudioPlayer;

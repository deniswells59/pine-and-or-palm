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
      trackList: ['dakota', 'i_killed_jfk', 'four_loko_ono', 'engineer_song'],
      track: 'dakota'
    }

    this.pause = this.pause.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleSpacebar = this.handleSpacebar.bind(this);
    this.reload = this.reload.bind(this);
    this.changeSong = this.changeSong.bind(this);
  }

  componentDidMount() {
    this.player =  document.querySelector('#audio')

    this.player.addEventListener('ended', this.next);
    document.body.onkeyup = this.handleSpacebar;
  }

  componentWillUnmount() {
    this.player.removeEventListener('ended', this.next);
    document.body.onkeyup = null;
  }

  handleSpacebar(e) {
    if(e.keyCode === 32 && e.target === document.body) {
      e.preventDefault();
      this.pause();

      return false;
    }
  }

  pause() {
    if(this.state.playing) {
      this.player.pause();
    } else {
      this.player.play();
    }

    this.setState({ playing: !this.state.playing });
  }

  prev() {
    let current = this.state.trackList.indexOf(this.state.track);
    current--;

    if(current < 0) {
      current = this.state.trackList.length - 1;
    }

    this.setState({ track: this.state.trackList[current] }, this.reload);
  }

  next() {
    let current = this.state.trackList.indexOf(this.state.track);
    current++;

    if(current > this.state.trackList.length - 1) {
      current = 0;
    }

    this.setState({ track: this.state.trackList[current] }, this.reload);
  }

  reload() {
    this.player.load();
    this.player.play();
    this.setState({ playing: true });
  }

  changeSong(e) {
    let track = e.target.getAttribute('data-name');
    this.setState({ track }, this.reload);
  }

  render() {
    return (
      <div className="audio-player">

        <audio id="audio" preload="auto">
          <source src={ `./assets/${this.state.track}.mp3`} />
        </audio>

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
            icon={ this.state.playing ? 'icon-pause-outline' : 'icon-play-outline' } />
          <AudioControl
            {...this.props}
            clickHandler={ this.next }
            id='fwd'
            icon='icon-fast-fw-outline' />
        </div>

        <footer
          style={{ 'backgroundColor': this.props.colors.main }}>

          <div className='marquee'>

            <Playlist
              clickHandler={this.changeSong}
              {...this.props}
              {...this.state} />

          </div>

        </footer>
      </div>
    );
  }
}

export default AudioPlayer;

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
      trackList: ['dakota', 'for_loko_ono', 'i_killed_jfk', 'engineer_song'],
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
    this.setState({ player: document.querySelector('#audio') });
    document.body.onkeyup = this.handleSpacebar;
    this.interval = setInterval(this.checkMarquee, 500);
  }

  componentWillUnmount() {
    document.body.onkeyup = null;
  }

  checkMarquee() {

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
      this.state.player.pause();
    } else {
      this.state.player.play();
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
    this.state.player.load();
    this.state.player.play();
    this.setState({ playing: true });
  }

  changeSong(e) {
    let track = e.target.getAttribute('data-name');
    this.setState({ track }, this.reload);
  }

  render() {
    let icon = 'icon-pause-outline';

    if(!this.state.playing) icon = 'icon-play-outline';
    return (
      <div className="audio-player">

        <audio id="audio" preload="auto">
          <source src={ `./assets/${this.state.track}.m4a`} />
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

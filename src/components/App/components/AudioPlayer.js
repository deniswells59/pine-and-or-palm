import React, { Component } from 'react';
import Song from './Song';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
      translate3d: 0
    }

    this.marquee = this.marquee.bind(this);
  }

  componentDidMount() {
    this.setState({ interval: setInterval(this.marquee, 1) });
    this.initMarquee();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  marquee() {
    let newTranslate = this.state.translate3d - .08;
    this.setState({ translate3d: newTranslate });
    // this.checkTitle();
  }

  initMarquee() {
    let titles = document.getElementsByClassName('song-wrapper');
    for (var i = 0; i < titles.length; i++) {
      let t = titles[i];

      t.style.minWidth = '400px';
      t.style.minHeight = `${t.offsetHeight || t.clientHeight}px`;
      document.getElementsByClassName('marquee')[0].style.minHeight =
        `${t.offsetHeight || t.clientHeight}px`;
    }

    // let playlists = document.getElementsByClassName('playlist');
    // for (var i = 0; i < playlists.length; i++) {
    //   let p = playlists[i];
    //
    //   p.style.position = 'absolute';
    //   p.style.minHeight = `${p.offsetHeight || p.clientHeight}px`;
    //
    // }
  }

  // checkTitle() {
  //   let titles = document.getElementsByClassName('playlist');
  //   for (let i = 0; i < titles.length; i++) {
  //     let el = titles[i];
  //
  //     let right = el.getBoundingClientRect().right;
  //
  //     if(right < 0) {
  //       let toMove = el.cloneNode(true);
  //       let marquee = document.getElementsByClassName('marquee')[0];
  //
  //       marquee.removeChild(el);
  //       // toMove.parentElement.remove(toMove);
  //       // this.state.marquee.appendChild(toMove);
  //       // this.state.marquee.appendChild(toMove);
  //     }
  //   }
  // }

  render() {
    return (
      <footer>
        <div className='marquee'>

          <div className="playlist">
            <Song name='dakota' />
            <Song name='for loko ono' />
            <Song name='i killed jfk' />
            <Song name='engineer song' />
          </div>

          <div className="playlist">
            <Song name='dakota' />
            <Song name='for loko ono' />
            <Song name='i killed jfk' />
            <Song name='engineer song' />
          </div>

        </div>
      </footer>
    );
  }
}

export default AudioPlayer;

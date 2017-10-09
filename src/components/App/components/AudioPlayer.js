import React, { Component } from 'react';
import Playlist from './Playlist';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: null,
      translate3d: 0,
      marquee: null,
    }

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <footer
        style={{ 'backgroundColor': this.props.colors.main }}>
        <div className='marquee'>

          <Playlist {...this.props} key='1' />,
          <Playlist {...this.props} key='2' />,
          <Playlist {...this.props} key='3' />


        </div>

      
      </footer>
    );
  }
}

export default AudioPlayer;

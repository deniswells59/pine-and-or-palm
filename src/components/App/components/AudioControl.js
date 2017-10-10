import React, { Component } from 'react';
import Playlist from './Playlist';

class AudioControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className='audio-control'
        id={this.props.id}
        style={{backgroundImage: `linear-gradient(to bottom, ${this.props.colors.accent}, ${this.props.colors.main})`}}>
        <i className={ `icon ${this.props.icon}` }></i>
      </button>
    );
  }
}

export default AudioControl;

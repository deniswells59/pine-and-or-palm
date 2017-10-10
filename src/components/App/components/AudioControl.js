import React, { Component } from 'react';
import Playlist from './Playlist';

class AudioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    let color = this.props.colors.text;

    if(this.state.hover) {
      color = '#fcfcfc';
    }

    return (
      <button
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.props.clickHandler}
        className='audio-control'
        id={this.props.id}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${this.props.colors.accent}, ${this.props.colors.main})`,
          color
        }}>
        <i className={ `icon ${this.props.icon}` }></i>
      </button>
    );
  }
}

export default AudioControl;

import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let name = this.props.name.split('_').join(' '),
        active = false,
        color = this.props.colors.text,
        dash = <span
                 style={{ 'color': this.props.colors.text }}
                 className='song-break'> - </span>;


    if(this.props.name === this.props.track) {
      color = this.props.colors.accent;
    }

    if(this.props.last) {
      dash = null;
    }

    return (
      <div className='song-wrapper'>
        <h2
          style={{ 'color': color }}
          id={ this.props.id }
          className='song-title'
          data-name={ this.props.name }>
          { name }
          { dash }
        </h2>
      </div>
    );
  }
}

export default Song;

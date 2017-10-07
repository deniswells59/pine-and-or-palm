import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='song-wrapper'>
        <h2 className='song-title' data-name={ this.props.name }>
          { this.props.name }
          <span className='song-break'> - </span>
        </h2>
      </div>
    );
  }
}

export default Song;

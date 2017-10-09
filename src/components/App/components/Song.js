import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let active = 'inactive';
    if(this.props.active) active = 'active';

    return (
      <div className='song-wrapper'>
        <h2
          style={{ 'color': this.props.active ? this.props.colors.accent : this.props.colors.text }}
          id={ this.props.id }
          className={ `song-title ${active}` }
          data-name={ this.props.name }>
          { this.props.name }
          <span
            style={{ 'color': this.props.colors.text }}
            className='song-break'> - </span>
        </h2>
      </div>
    );
  }
}

export default Song;

import React, { Component } from 'react';
import NavAnimation from '../NavAnimation';
// import './style.css';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: false
    }
  }

  render() {
    let prev = '/assets/gallery/prev/';
    let full = '/assets/gallery/full/';

    if(this.state.trip) {
      prev = '/assets/gallery/trip_prev/';
      full = '/assets/gallery/trip/';
    }

    return (
      <div className='photo-container'>
        <div className="gallery-row">

          <img
            height='auto'
            width='200px'
            src={ `${prev}chey.jpg` } alt=""/>

        </div>
      </div>
    );
  }
}

export default NavAnimation(Photos);

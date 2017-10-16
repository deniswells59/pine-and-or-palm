import React, { Component } from 'react';
import NavAnimation from '../NavAnimation';

import './style.css';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: false,
      images: []
    }
  }

  componentDidMount() {
    this.getImages();
  }

  getImages() {
    //SOME API CALL
    this.setState({ images: ['chey.jpg', 'chey.jpg', 'chey.jpg'] });
  }

  render() {
    let prev = '/assets/gallery/prev/';
    let full = '/assets/gallery/full/';

    if(this.state.trip) {
      prev = '/assets/gallery/trip_prev/';
      full = '/assets/gallery/trip/';
    }

    return (
      <div
        className='photo-container'
        style={{ backgroundColor: this.props.colors.text }}
        >

        <div className="gallery-row">
          { this.state.images.map((i, idx) => {
            return <img
                    key={idx}
                    className='gallery-img'
                    src={ `${full}${i}` } alt=""/>
          })}
        </div>

      </div>
    );
  }
}

export default NavAnimation(Photos);

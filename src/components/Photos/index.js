import React, { Component } from 'react';
import NavAnimation from '../NavAnimation';
import TripButton from './components/TripButton';

import './style.css';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }

    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    this.getImages();
    this.props.routeChange(this.props.location);
  }

  getImages() {
    //SOME API CALL
    this.setState({ images: ['chey.jpg', 'chey.jpg', 'chey.jpg'] });
  }

  render() {
    let prev = '/assets/gallery/prev/';
    let full = '/assets/gallery/full/';

    if(this.props.trip) {
      prev = '/assets/gallery/trip_prev/';
      full = '/assets/gallery/trip/';
    }

    return (
      <div
        id='gallery'
        className='photo-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >

        <div className="col">
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

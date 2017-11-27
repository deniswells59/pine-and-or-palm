import React, { Component } from 'react';

import NavAnimation from '../NavAnimation';
import Loader from '../Loader';

import TripButton from './components/TripButton';

import './style.css';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      // Jesus this is embarassing...
      galleryList: ['chey_2.jpg', 'tanny_0.jpg', 'seth_0.jpg', 'studio_1.jpg', 'chey_0.jpg', 'tanny_1.jpg', 'seth_2.jpg', 'chey_4.jpg', 'studio_0.jpg', 'tanny_2.jpg', 'chey_1.jpg', 'seth_3.jpg', 'tanny_3.jpg', 'chey_5.jpg', 'studio_2.jpg', 'chey_6.jpg'],
      loaded: 4,
      loading: true,
    }

    this.getImages = this.getImages.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.routeChange(this.props.location);
    this.getImages();

    this.root = document.getElementById('root');
    this.root.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.root.removeEventListener('scroll', this.handleScroll);
  }

  getImages() {
    // Adds more images to Gallery List
    let newGallery = this.state.galleryList.slice(0, this.state.loaded);

    if(newGallery.length === this.state.loaded) {
      this.setState({
        images: newGallery,
        loaded: this.state.loaded + 4
      });
    } else {
      // If no more images to load
      this.setState({
        loading: false
      });
    }
  }

  handleScroll(e) {
    // Checks if scrolled to bottom
    let element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.getImages();
    }
  }

  render() {
    let loader = <div className='end'></div>;

    let full = '/assets/gallery/full/';
    let trip = '/assets/gallery/trip/';

    if(this.state.loading) {
      loader =   <Loader
                  relative={ true }
                  {...this.props} />;
    }

    return (
      <div
        id='gallery'
        className='photo-container route-container'
        style={{ backgroundColor: this.props.colors.text }}
        >

        <div className="col">
          { this.state.images.map((i, idx) => {
            return (
              <div
                key={idx}
                className='img-wrapper'>
                <img
                  className='gallery-img-abs'
                  src={`${trip}${i}`}
                  style={{
                    opacity: this.props.trip ? 1 : 0
                  }}/>
                <img
                  className={ this.props.trip ? 'gallery-img trip' : 'gallery-img'}
                  src={`${full}${i}`} />
              </div>
            )
          })}

          { loader  }

        </div>


      </div>
    );
  }
}

export default NavAnimation(Photos);

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
      galleryList: ['chey_0.jpg', 'tanny_0.jpg', 'seth_0.jpg', 'seth_1.jpg', 'studio_0.jpg', 'chey_1.jpg', 'seth_2.jpg', 'tanny_1.jpg'],
      loaded: 4,
      loading: true
    }

    this.getImages = this.getImages.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.getImages();
    this.props.routeChange(this.props.location);

    this.root = document.getElementById('root');
    this.root.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.root.removeEventListener('scroll', this.handleScroll);
  }

  getImages() {
    let newGallery = this.state.galleryList.slice(0, this.state.loaded);

    if(newGallery.length === this.state.loaded) {
      this.setState({
        images: newGallery,
        loaded: this.state.loaded + 4
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleScroll(e) {
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

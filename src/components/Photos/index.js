import React, { Component } from 'react';
import NavAnimation from '../NavAnimation';

import './style.css';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: false,
      images: [],
      intervalId: null,
      tripIndex: this.props.listIndex,
      tripColors: {
        main: this.props.colors.main,
        accent: this.props.colors.accent,
      }
    }

    this.trip = this.trip.bind(this);
    this.getImages = this.getImages.bind(this);
    this.addButton = this.addButton.bind(this);
    this.initTripButton = this.initTripButton.bind(this);
    this.iterateTripColor = this.iterateTripColor.bind(this);
    this.tripTransition = this.tripTransition.bind(this);
  }

  componentDidMount() {
    this.getImages();
    this.initTripButton();
    this.setState({ button: document.getElementById('trip') }, () => {
      setTimeout(this.addButton, 900)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }


  getImages() {
    //SOME API CALL
    this.setState({ images: ['chey.jpg', 'chey.jpg', 'chey.jpg'] });
  }

  trip() {
    this.setState({ trip: !this.state.trip });
  }

  addButton() {
    let button = this.state.button;
    button.setAttribute('class', 'trip-button');
  }

  initTripButton() {
    if(this.state.intervalId) clearInterval(this.state.intervalId);

    let newIndex = this.state.tripIndex + 1;
    if(newIndex >= this.props.list.length) {
      newIndex = 0;
    }

    this.setState({
      intervalId: setInterval(this.tripTransition, 10),
      targetColors: {
        main: this.props.list[newIndex].main,
        accent: this.props.list[newIndex].accent,
      }
    });
  }

  iterateTripColor() {
    let newIndex = this.state.tripIndex + 1;
    if(newIndex >= this.props.list.length) {
      newIndex = 0;
    }

    this.setState({
      tripIndex: newIndex
    }, this.initTripButton);
  }

  tripTransition() {
    let currentColorMain = this.state.tripColors.main;
    let targetColorMain = this.state.targetColors.main;

    let currentColorAccent = this.state.tripColors.accent;
    let targetColorAccent = this.state.targetColors.accent;

    let newMain = this.props.transition(currentColorMain, targetColorMain);
    let newAccent = this.props.transition(currentColorAccent, targetColorAccent);

    if(!newMain || !newAccent) {
      clearInterval(this.state.intervalId);
      return this.setState({ intervalId: null }, this.iterateTripColor);
    } else {
      this.setState({
        tripColors: {
          main: newMain,
          accent: newAccent
        }
      });
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
      <div
        id='gallery'
        className='photo-container'
        style={{ backgroundColor: this.props.colors.text }}
        >

        <button
          onClick={ this.trip }
          id="trip"
          className="hide"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${this.state.tripColors.main}, ${this.state.tripColors.accent})`
          }}
          >
          TRIP BALLS
        </button>

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

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TripButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
      tripIndex: this.props.listIndex,
      tripColors: {
        main: this.props.colors.main,
        accent: this.props.colors.accent,
      }
    }

    this.addButton = this.addButton.bind(this);
    this.initTripButton = this.initTripButton.bind(this);
    this.iterateTripColor = this.iterateTripColor.bind(this);
    this.tripTransition = this.tripTransition.bind(this);
  }

  componentDidMount() {
    this.initTripButton();
    this.setState({ button: document.getElementById('trip') }, () => {
      setTimeout(this.addButton, 900)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
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

  addButton() {
    let button = this.state.button;
    button.setAttribute('class', 'trip-button show');
    setTimeout(() => button.setAttribute('class', 'trip-button'), 1000);
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

    return (
      <button
        onClick={ this.props.clickHandler }
        id='trip'
        className='hide'
        style={{
          backgroundImage: `linear-gradient(to bottom, ${this.state.tripColors.main}, ${this.state.tripColors.accent})`
        }}
        >
        TRIP BALLS
      </button>
    );
  }
}

export default TripButton;

import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Home from '../Home';
import Photos from '../Photos';
import TripButton from '../Photos/components/TripButton';
import MerchList from '../../containers/MerchList';
import MerchItem from '../../containers/MerchItem';

import Header from './components/Header.js';
import RouteContainer from './components/RouteContainer.js';
import AudioPlayer from './components/AudioPlayer.js';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: { main: '#490278',text: '#140152', accent:'#950595', name:'purp' },
      listIndex: 0,
      trip: false,
      photos: false,
      list: [
        { main: '#490278',text: '#140152', accent: '#780278', name: 'purp' },
        { main: '#5CDB95',text: '#05386B', accent: '#EDF5E1', name: 'green' },
        { main: '#F24D16',text: '#FBEEC1', accent: '#4CD4B0', name: 'retro' },
      ]
    }

    this.trip = this.trip.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  componentDidMount() {
    this.state.interval = setInterval(this.changeColor, 20000);
  }

  changeColor() {
    let index = this.state.listIndex + 1;
    if(index > this.state.list.length - 1) index = 0;

    this.setState({
      colors: this.state.list[index],
      listIndex: index,
    })
  }

  routeChange(location) {
    if(location.pathname === '/photos') {
      this.setState({ photos: true });
    } else {
      this.setState({ photos: false });
    }
  }

  trip() {
    this.setState({ trip: !this.state.trip });
  }

  render() {
    let tripButton = <div></div>;


    if(this.state.photos) {
      tripButton = <TripButton
                      clickHandler={ this.trip }
                      className={ this.state.tripButton }
                      {...this.props}
                      {...this.state} />;
    }

    return (
      <div>
        <BrowserRouter>
          <div className='container'>

            <Header {...this.state} />

            <div className="body-wrapper">

              <Route
                exact
                path="/"
                children={({ match, ...rest }) => (
                  <RouteContainer>
                    {match && <Home
                                routeChange={ this.routeChange }
                                {...this.state}
                                {...this.props}
                                {...rest} />}
                  </RouteContainer>
              )}/>

              <Route
                path='/photos'
                children={ ({ match, ...rest }) => (
                  <div>

                    { tripButton }

                    <RouteContainer>
                      {match && <Photos
                                  routeChange={ this.routeChange }
                                  {...this.state}
                                  {...this.props}
                                  {...rest} />}
                    </RouteContainer>
                  </div>
              )} />

              <Route
                path='/merch'
                children={ ({ match, ...rest }) => (
                  <div>
                    <RouteContainer>
                      {match && <MerchList
                                  routeChange={ this.routeChange }
                                  {...this.state}
                                  {...this.props}
                                  {...rest} />}
                    </RouteContainer>
                  </div>
              )} />

              <Route
                path='/merch-item/:id'
                children={ ({ match, ...rest }) => (
                  <RouteContainer>
                    {match && <MerchItem
                                match={ match }
                                routeChange={ this.routeChange }
                                {...this.state}
                                {...this.props}
                                {...rest} />}
                  </RouteContainer>
              )} />

            </div>

            <AudioPlayer {...this.state} />

        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

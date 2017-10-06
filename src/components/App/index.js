import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Home from '../Home';
import Header from './components/Header.js';
import AudioPlayer from './components/AudioPlayer.js';

import './style.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={ Home } />
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Home from '../Home';
import Header from './components/Header.js';
import AudioPlayer from './components/AudioPlayer.js';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {main: '#490278',text: '#780278',background: '#FFFCE6',accent: '#140152'},
      listIndex: 0,
      list: [
        {main: '#490278',text: '#780278',background: '#FFFCE6',accent: '#140152'},
        {main: '#5CDB95',text: '#05386B', background: '#FFFCE6', accent: '#EDF5E1'},
        {main: '#F24D16',text: '#FBEEC1', background: '#FFFCE6', accent: '#4CD4B0'},
      ]
    }

    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    this.state.interval = setInterval(this.changeColor, 10000);
  }

  changeColor() {
    let index = this.state.listIndex + 1;
    if(index > this.state.list.length - 1) index = 0;

    this.setState({
      colors: this.state.list[index],
      listIndex: index,
    })
  }

  render() {
    return (
      <div>
        <Header {...this.state} />
        <BrowserRouter>
          <div className="body-wrapper">
            <Route exact path="/" render={() => {
                return <Home {...this.state} />
              }} />

          </div>
        </BrowserRouter>
        <AudioPlayer {...this.state} />
      </div>
    );
  }
}

export default App;

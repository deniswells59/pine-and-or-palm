import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import TransitionGroup from "react-transition-group/TransitionGroup";

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

import Home from '../Home';
import Photos from '../Photos';
import Header from './components/Header.js';
import AudioPlayer from './components/AudioPlayer.js';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {main: '#490278',text: '#140152', accent:'#950595', name:'purp'},
      listIndex: 0,
      list: [
        {main: '#490278',text: '#140152', accent: '#780278', name: 'purp'},
        {main: '#5CDB95',text: '#05386B', accent: '#EDF5E1', name: 'green'},
        {main: '#F24D16',text: '#FBEEC1', accent: '#4CD4B0', name: 'retro'},
      ]
    }

    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    this.state.interval = setInterval(this.changeColor, 5000);
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
        <BrowserRouter>
          <div className='container'>

            <Header {...this.state} />

            <div className="body-wrapper">

              <Route
                exact
                path="/"
                children={({ match, ...rest }) => (
                  <TransitionGroup component={firstChild}>
                    {match && <Home {...this.state} {...rest} />}
                  </TransitionGroup>
              )}/>

              <Route
                path='/photos'
                children={ ({ match, ...rest }) => (
                  <TransitionGroup component={firstChild}>
                    {match && <Photos {...rest} />}
                  </TransitionGroup>
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

require('react-hot-loader/patch');
import React from 'react';
import ReactDOM from 'react-dom';
import { convertHex, transition } from './common';
import { AppContainer } from 'react-hot-loader'

import App from './components/App';

import './style.css';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component
        transition={ transition }
        convertHex={ convertHex } />
    </AppContainer>,
    document.getElementById('root')
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default;
    render(newApp);
  });
}

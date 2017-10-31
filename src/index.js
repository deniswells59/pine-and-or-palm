require('react-hot-loader/patch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';

import { convertHex, transition } from './common';
import App from './containers/App';

import './style.css';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component
          transition={ transition }
          convertHex={ convertHex } />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const newApp = require('./containers/App').default;
    render(newApp);
  });
}

import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `/api${route ? route : ''}`;
}

export function receiceSession(data) {
  return { type: types.RECEIVE_SESSION, session: data }
}

export function receiveCart(data) {
  return { type: types.RECEIVE_CART, cart: data };
}

export function sendCart(data) {
  return dispatch => {
    axios.put(url('/cart/item'), data)
      .then(response => {
        // dispatch(receiveMerch(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchSession() {
  return dispatch => {
    axios.post(url('/cart'))
      .then(() => {
        console.log('cookied');
      })
      .catch(err => {
        console.log('err', err);
      })
  }
}

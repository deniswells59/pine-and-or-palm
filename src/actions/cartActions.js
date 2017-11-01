import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `/api${route ? route : ''}`;
}

export function receiveCart(data) {
  return { type: types.RECEIVE_CART, cart: data };
}

export function receiveSession(data) {
  return { type: types.RECEIVE_SESSION, session: data };
}

export function sendCart(data) {
  return dispatch => {
    dispatch({ type: types.FETCHING_CART });
    
    axios.put(url('/cart/item'), data)
      .then(response => {
        dispatch(receiveCart(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchSession() {
  return dispatch => {
    axios.post(url('/cart'))
      .then(response => {
        dispatch(receiveSession(response.data));
      })
      .catch(err => {
        console.log('err', err);
      })
  }
}
export function fetchCart() {
  return dispatch => {
    axios.get(url('/cart'))
      .then(response => {
        dispatch(receiveCart(response.data));
      })
      .catch(err => {
        console.log('err', err);
      })
  }
}

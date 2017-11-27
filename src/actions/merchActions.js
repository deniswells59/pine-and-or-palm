// Currently NOT in use

import * as types from './actionTypes';
import axios from 'axios';

let merchStore = [];

function url(route) {
  return `/api${route ? route : ''}`;
}

export function receiveMerch(data) {
  return { type: types.RECEIVE_MERCH, merch: data };
}

export function receiveOne(data) {
  return { type: types.RECEIVE_ONE, one: data };
}

export function fetchMerch() {
  return dispatch => {
    axios.get(url('/merch'))
      .then(response => {
        merchStore = response.data;
        dispatch(receiveMerch(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function fetchOne(oneId) {
  return dispatch => {
    axios.get(url('/merch'))
      .then(response => {
        let one;

        response.data.forEach(m => { if(m.id == oneId) one = m });
        dispatch(receiveOne(one));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `/api${route ? route : ''}`;
}

export function receiveMerch(data) {
  return { type: types.RECEIVE_MERCH, merch: data };
}

export function fetchMerch() {
  return dispatch => {
    axios.get(url('/merch'))
      .then(response => {
        console.log(response);
        dispatch(receiveMerch(response.data))
      })
      .catch(error => {
        console.log(error);
      });
  };
}

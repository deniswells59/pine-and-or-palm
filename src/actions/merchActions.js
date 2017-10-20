import * as types from './actionTypes';

function url(route) {
  return `/api${route ? route : ''}`;
}

export function receiveMerch(json) {
  return { type: types.RECEIVE_MERCH, merch: json.merch };
}

export function fetchMerch() {
  return dispatch => {
    return fetch(url(), {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveMerch(json)));
  };
}

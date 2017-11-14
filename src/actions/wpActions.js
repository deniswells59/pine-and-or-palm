import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `http://pineandorpalm.com:8080/wp-json/wp/v2${route ? route : ''}`;
}

export function receiveHomepage(data) {
  return { type: types.RECEIVE_HOMEPAGE, wp: data };
}

export function fetchHome() {
  return dispatch => {
    axios.get(url('/home_page'))
      .then(response => {
        dispatch(receiveHomepage(response.data[0]));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

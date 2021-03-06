import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `//pineandorpalm.com:8080/wp-json/wp/v2${route ? route : ''}`;
}

export function receiveHomepage(data) {
  return { type: types.RECEIVE_HOMEPAGE, home: data };
}

export function receiveAbout(data) {
  return { type: types.RECEIVE_ABOUT, about: data };
}

// Grabs the Home Page
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

// Grabs the About Page
export function fetchAbout() {
  return dispatch => {
    axios.get(url('/about'))
      .then(response => {
        dispatch(receiveAbout(response.data[0]));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

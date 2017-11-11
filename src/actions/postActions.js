import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `http://pineandorpalm.com:8080/wp-json/wp/v2${route ? route : ''}`;
}

export function receivePosts(data) {
  return { type: types.RECEIVE_POSTS, posts: data };
}

export function fetchPosts() {
  return dispatch => {
    axios.get(url('/posts'))
      .then(response => {
        dispatch(receivePosts(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

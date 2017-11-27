import * as types from './actionTypes';
import axios from 'axios';

function url(route) {
  return `http://pineandorpalm.com:8080/wp-json/wp/v2${route ? route : ''}`;
}

export function receivePosts(data) {
  return { type: types.RECEIVE_POSTS, posts: data };
}

export function receiveOnePost(data) {
  return { type: types.RECEIVE_ONE_POST, post: data };
}

// Grabs list of allblog post
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

// Grabs the one post by ID
export function fetchOnePost(id) {
  let returnObj = {};

  return dispatch => {
    axios.get(url(`/posts/${id}`))
      .then(response => {
        returnObj = response.data;
        return axios.get(url(`/users/${response.data.author}`))
      })
      .then(response => {
        returnObj.author = response.data;
        dispatch(receiveOnePost(returnObj));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

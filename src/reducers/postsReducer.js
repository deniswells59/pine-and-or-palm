import { RECEIVE_POSTS, FETCH_POSTS } from '../actions/actionTypes';

export default function merch(state = {}, action) {
  let newState;
  switch (action.type) {
    case FETCH_POSTS:
      return action;
    case RECEIVE_POSTS:
      return state = action.posts;
    default:
      return state;
  }
}

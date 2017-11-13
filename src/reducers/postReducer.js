import { FETCH_ONE_POST, RECEIVE_ONE_POST } from '../actions/actionTypes';

export default function post(state = {}, action) {
  let newState;
  switch (action.type) {
    case FETCH_ONE_POST:
      return action;
    case RECEIVE_ONE_POST:
      return state = action.post;
    default:
      return state;
  }
}

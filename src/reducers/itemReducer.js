import { RECEIVE_ONE, FETCH_ONE } from '../actions/actionTypes';

export default function merch(state = {}, action) {
  let newState;
  switch (action.type) {
    case FETCH_ONE:
      return action;
    case RECEIVE_ONE:
      return state = action.one;
    default:
      return state;
  }
}

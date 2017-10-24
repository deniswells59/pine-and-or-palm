import { FETCH_MERCH, RECEIVE_MERCH } from '../actions/actionTypes';

export default function merch(state = [], action) {
  let newState;
  switch (action.type) {
    case FETCH_MERCH:
      return action;
    case RECEIVE_MERCH:
      return state = action.merch;
    default:
      return state;
  }
}

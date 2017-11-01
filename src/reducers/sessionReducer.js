import { RECEIVE_SESSION } from '../actions/actionTypes';

export default function session(state = '', action) {
  switch (action.type) {
    case RECEIVE_SESSION:
      return state = action.session;
    default:
      return state;
  }
}

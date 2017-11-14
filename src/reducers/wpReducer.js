import { RECEIVE_HOMEPAGE } from '../actions/actionTypes';

export default function wp(state = {}, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_HOMEPAGE:
      return state = action.wp;
    default:
      return state;
  }
}

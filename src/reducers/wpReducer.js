import { RECEIVE_HOMEPAGE, RECEIVE_ABOUT } from '../actions/actionTypes';

export default function wp(state = {}, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_HOMEPAGE:
      return {
        ...state,
        home: action.home,
      }
    case RECEIVE_ABOUT:
      return {
        ...state,
        about: action.about,
      }
    default:
      return state;
  }
}

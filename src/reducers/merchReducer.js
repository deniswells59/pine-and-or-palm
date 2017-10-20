import initialState from './initialState';
import {FETCH_ME, RECEIVE_MERCH} from '../actions/actionTypes';

export default function merch(state = initialState.merch, action) {
  let newState;
  switch (action.type) {
    case FETCH_ME:
      console.log('FETCH_ME Action')
      return action;
    case RECEIVE_MERCH:
      newState = action.merch;
      console.log('RECEIVE_MERCH Action')
      return newState;
    default:
      return state;
  }
}

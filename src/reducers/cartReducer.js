import { RECEIVE_CART, FETCHING_CART } from '../actions/actionTypes';

export default function cart(state = {}, action) {
  switch (action.type) {
    case FETCHING_CART:
      return {
        inProgress: true
      };
    case RECEIVE_CART:
      return {
        data: action.cart,
        inProgress: false
      };
    default:
      return state;
  }
}

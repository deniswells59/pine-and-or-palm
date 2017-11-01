import {combineReducers} from 'redux';
import merch from './merchReducer';
import item from './itemReducer';
import cart from './cartReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  merch,
  item,
  cart,
  session
});

export default rootReducer;

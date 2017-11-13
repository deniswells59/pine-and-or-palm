import { combineReducers } from 'redux';
import merch from './merchReducer';
import item from './itemReducer';
import cart from './cartReducer';
import session from './sessionReducer';
import blog from './blogReducer';
import post from './postReducer';

const rootReducer = combineReducers({
  merch,
  item,
  cart,
  session,
  blog,
  post
});

export default rootReducer;

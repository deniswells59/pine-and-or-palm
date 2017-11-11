import {combineReducers} from 'redux';
import merch from './merchReducer';
import item from './itemReducer';
import cart from './cartReducer';
import session from './sessionReducer';
import posts from './postsReducer';

const rootReducer = combineReducers({
  merch,
  item,
  cart,
  session,
  posts
});

export default rootReducer;

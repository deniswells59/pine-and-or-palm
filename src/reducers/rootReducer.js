import {combineReducers} from 'redux';
import merch from './merchReducer';
import item from './itemReducer';

const rootReducer = combineReducers({
  merch,
  item
});

export default rootReducer;

import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import results from './resultsState';

const rootReducer = combineReducers({
  player,
  token,
  results,
});

export default rootReducer;

import { combineReducers } from 'redux';
import rawMat from './rawMat';
import mat from './mat';

const combinedReducer = combineReducers({
  rawMat,
  mat,
});

const reducer = (state, action) => (combinedReducer(state, action));

export default reducer;

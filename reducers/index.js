// reducers.js

import { combineReducers } from 'redux';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
  language: languageReducer,
  // 其他的reducers
});

export default rootReducer;

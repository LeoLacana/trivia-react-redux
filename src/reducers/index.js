import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import triviaReducer from './triviaReducer';
// modelo de importação dos reducers

const rootReducer = combineReducers({
  loginReducer,
  triviaReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import triviaReducer from './triviaReducer';
import sectionReducer from './sectionReducer';

const rootReducer = combineReducers({
  loginReducer,
  triviaReducer,
  sectionReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
// modelo de importação dos reducers

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;

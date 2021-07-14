// create a reducer to manage the login state
import { TOKEN_REQUEST_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {
  sectionTriviaToken: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST_SUCCESS:
    return {
      sectionTriviaToken: action.token,
    };
  default:
    return state;
  }
};

export default triviaReducer;

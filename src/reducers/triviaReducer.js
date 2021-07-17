import { TOKEN_REQUEST_SUCCESS, QUESTIONS_REQUEST } from '../actions/actionTypes';

const INITIAL_STATE = {
  sectionTriviaToken: '',
  questions: {},
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST_SUCCESS:
    return {
      ...state, sectionTriviaToken: action.token,
    };
  case QUESTIONS_REQUEST:
    return {
      ...state, questions: action.questions,
    };
  default:
    return state;
  }
};

export default triviaReducer;

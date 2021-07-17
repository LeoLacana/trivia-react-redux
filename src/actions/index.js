import * as types from './actionTypes';

export const tokenRequestSuccess = ({ token }) => ({
  type: types.TOKEN_REQUEST_SUCCESS,
  token,
});

export const tokenRequestError = (errorData) => ({
  type: types.TOKEN_REQUEST_ERROR,
  errorData,
});

export const initialLogin = (data) => ({
  type: types.LOGIN,
  data,
});

export const allQuestions = (questions) => ({
  type: types.QUESTIONS_REQUEST,
  questions,
});

export const sectionUser = (section) => ({
  type: types.SECTION_USER,
  section,
});

export function requestToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => dispatch(tokenRequestSuccess(token)))
    .catch((error) => dispatch(tokenRequestError(error)));
}

export function questionsRequest(token) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((questions) => dispatch(allQuestions(questions)));
}

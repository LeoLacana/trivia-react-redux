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

export function requestToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => dispatch(tokenRequestSuccess(token)))
    .catch((error) => dispatch(tokenRequestError(error)));
}

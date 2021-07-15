import * as type from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case type.LOGIN:
    return {
      email: action.data.email,
      name: action.data.name,
    };
  default:
    return state;
  }
};

export default loginReducer;

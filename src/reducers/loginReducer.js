// create a reducer to manage the login state

const INITIAL_STATE = {
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default loginReducer;

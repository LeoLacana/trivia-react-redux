// create a reducer to manage the login state
import { SECTION_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const sectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SECTION_USER:
    return {
      ...state,
      player: {
        name: action.section.name,
        assertions: action.section.assertions,
        score: action.section.score,
        gravatarEmail: action.section.gravatarEmail,
      },
    };
  default:
    return state;
  }
};

export default sectionReducer;

import { AUTH_LOGIN } from '../actions/types/auth';

const initialState = {
  // the bad
  // user: null || {},
  user: null,
  authenticated: false,
  established: false,
};

// auth.authenticated ?
// auth.established? ?

// action is the event
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        authenticated: true,
        established: true,
        user: payload,
      };

    default:
      return state;
  }
};

export default authReducer;

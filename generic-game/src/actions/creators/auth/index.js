import { initializeGoogleAuth } from '../../../api/googleAuth';
import { readUsers } from '../../../api/users';
import { AUTH_LOGIN, AUTH_LOGOUT, SET_USERS } from '../../types/auth';
import {
  getUserProfile,
  getUserStats,
  postUserProfile,
  postUserStats,
} from '../profile';

export const login = (user) => {
  // switch to thunk
  // return {
  //   type: AUTH_LOGIN,
  //   payload: user,
  // };

  // when using async thunk, 1st - dispatch, 2nd getState
  return async (dispatch) => {
    const { id } = user;

    //read
    //see if user there
    //if not, create

    try {
      await dispatch(getUserStats(id));
    } catch (response) {
      const { status: httpStatus } = response;

      if (httpStatus === 404) {
        await dispatch(postUserStats(id));
      }

      // do more error handling
    }

    //read profile
    //determine if user has profile -> if no, create :)

    try {
      //dispatch getUserProfile
      await dispatch(getUserProfile(id));
    } catch (response) {
      //dispatch postUserProfile
      await dispatch(postUserProfile(id));
    }
    dispatch(setLogin(user));
  };
};
// without exporting, this is a private option if we so choose
export const setLogin = (user) => {
  return {
    type: AUTH_LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const requestSignIn = () => {
  return async () => {
    return initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signIn();
    });
  };
};

export const requestSignOut = () => {
  return async () => {
    return initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signOut();
    });
  };
};
//should be in a users slice
export const getUsers = (force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const cached = state.users.cached;

    if (cached === true && force === false) {
      return;
    }

    try {
      const users = await readUsers();
      dispatch(setUsers(users));
    } catch (response) {
      console.log(response);
    }
  };
};

//should be in a users slice
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

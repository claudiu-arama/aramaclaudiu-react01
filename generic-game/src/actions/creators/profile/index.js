import {
  createProfile,
  createUser,
  readProfile,
  readUser,
} from '../../../api/users';
import { PROFILE_SET_STATS } from './../../types/profile';

// getUserStats - create Redux action below, using thunk
export const getUserStats = (userId) => {
  return async (dispatch) => {
    try {
      const stats = await readUser(userId);

      dispatch(setUserStats(stats));

      return stats;
      // axios call - destruct response
    } catch ({ response }) {
      return Promise.reject(response);
    }
  };
};

export const setUserStats = (stats) => {
  return {
    type: PROFILE_SET_STATS,
    payload: stats,
  };
};

// postUserStats
export const postUserStats = (userId) => {
  return async () => {
    await createUser(userId);
  };
};

export const getUserProfile = (userId) => {
  return async () => {
    let creatureColors = {};

    try {
      creatureColors = await readProfile(userId);
      // set colors in state

      return creatureColors;
    } catch (_) {
      return Promise.reject();
    }
  };
};
//action creator
export const postUserProfile = (userId) => {
  return async (_, getState) => {
    const { profile } = getState();

    await createProfile(userId, profile.creature);
  };
};

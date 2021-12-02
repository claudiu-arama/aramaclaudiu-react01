import { SET_USERS } from '../actions/types/auth';

/**
 * {
 *  '213323323213213213': {
 *    id: '123213213232321321',
 *    stats: {}
 *  }
 * }
 */

const initialState = {
  entities: {},
  // the lamest cache
  cached: false,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      // users is entities, the accumulator
      const users = payload.reduce((users, user) => {
        const { id, stats } = user;
        users[id] = {
          id,
          stats,
        };

        return users;
      }, {});

      return {
        ...state,
        entities: users,
        cached: true, 
      };

    default:
      return state;
  }
};

export default usersReducer;

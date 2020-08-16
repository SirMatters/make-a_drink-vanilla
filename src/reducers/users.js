import { UPDATE_USER, GET_USERS } from '../actions/users';

export const users = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
};

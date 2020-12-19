import {
  GET_COCKTAILS,
  ADD_COCKTAIL,
  DELETE_COCKTAIL,
  EDIT_COCKTAIL,
} from '../actions/cocktails';

export const cocktails = (state = {}, action) => {
  switch (action.type) {
    case GET_COCKTAILS:
      return action.cocktails;
    case ADD_COCKTAIL:
      return {
        ...state,
        [action.cocktail.id]: action.cocktail,
      };
    case EDIT_COCKTAIL:
      const { id, ...updatedFields } = action.cocktail;

      return {
        ...state,
        [id]: { ...state[id], ...updatedFields },
      };
    case DELETE_COCKTAIL:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

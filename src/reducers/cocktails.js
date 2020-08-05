import {
  GET_COCKTAILS,
  ADD_COCKTAIL,
  DELETE_COCKTAIL,
} from '../actions/cocktails';

export const cocktails = (state = {}, action) => {
  switch (action.type) {
    case GET_COCKTAILS:
      return action.cocktails;
    case ADD_COCKTAIL:
      const { cocktail } = action;
      return {
        ...state,
        [cocktail.id]: cocktail,
      };
    case DELETE_COCKTAIL:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

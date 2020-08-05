import { GET_COCKTAILS, ADD_COCKTAIL } from '../actions/cocktails';

export const cocktails = (state = {}, action) => {
  switch (action.type) {
    case GET_COCKTAILS:
      return action.cocktails;
    case ADD_COCKTAIL:
      return {
        ...state,
        [action.cocktail.id]: action.cocktail,
      };
    default:
      return state;
  }
};

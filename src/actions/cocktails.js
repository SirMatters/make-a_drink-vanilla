import { _getCocktails } from '../utils/API';

export const GET_COCKTAILS = 'GET_COCKTAILS';
export const ADD_COCKTAIL = 'ADD_COCKTAIL';
export const DELETE_COCKTAIL = 'DELETE_COCKTAIL';
export const EDIT_COCKTAIL = 'EDIT_COCKTAIL';

export const addCocktail = (cocktail) => ({
  type: ADD_COCKTAIL,
  cocktail,
});

export const deleteCocktail = (id) => ({
  type: DELETE_COCKTAIL,
  id,
});

export const editCocktail = (cocktail) => ({
  type: EDIT_COCKTAIL,
  cocktail,
});

export const getCocktails = (cocktails) => ({
  type: GET_COCKTAILS,
  cocktails,
});

export const handleGetCocktails = () => {
  return (dispatch) => {
    _getCocktails()
      .then(({ data }) => {
        dispatch(getCocktails(data));
      })
      .catch((err) => {
        console.warn('Error in handleGetCocktails:', err);
      });
  };
};

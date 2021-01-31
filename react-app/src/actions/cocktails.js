import {
  // _getCocktails,
  _addCocktail,
  _deleteCocktail,
  _editCocktail,
} from '../utils/API';

import {_getCocktails} from '../utils/sanity_API'

export const GET_COCKTAILS = 'GET_COCKTAILS';
export const ADD_COCKTAIL = 'ADD_COCKTAIL';
export const DELETE_COCKTAIL = 'DELETE_COCKTAIL';
export const EDIT_COCKTAIL = 'EDIT_COCKTAIL';

const addCocktail = (cocktail) => ({
  type: ADD_COCKTAIL,
  cocktail,
});

export const handleAddCocktail = (cocktail) => {
  return (dispatch) => {
    _addCocktail(cocktail)
      .then((cocktail) => {
        dispatch(addCocktail(cocktail));
      })
      .catch((err) => {
        console.warn(err);
      });
  };
};

const deleteCocktail = (id) => ({
  type: DELETE_COCKTAIL,
  id,
});

export const handleDeleteCocktail = (id) => {
  return (dispatch) => {
    _deleteCocktail()
      .then(dispatch(deleteCocktail(id)))
      .catch((err) => {});
  };
};

export const editCocktail = (cocktail) => ({
  type: EDIT_COCKTAIL,
  cocktail,
});

export const handleEditCocktail = (cocktail) => {
  return (dispatch, getState) => {
    dispatch(editCocktail(cocktail));
    const oldData = getState().cocktails[cocktail.id];
    _editCocktail()
      .then(() => {
        console.log('Dispatching edit cocktail:', cocktail);
      })
      .catch((err) => {
        console.log('Err from handleEditCocktail', err);
        dispatch(editCocktail(oldData));
      });
  };
};

export const getCocktails = (cocktails) => ({
  type: GET_COCKTAILS,
  cocktails,
});

export const handleGetCocktails = () => {
  return (dispatch) => {
    _getCocktails()
      .then(({ cocktails }) => {
        dispatch(getCocktails(cocktails));
      })
      .catch((err) => {
        console.warn('Error in handleGetCocktails:', err);
      });
  };
};

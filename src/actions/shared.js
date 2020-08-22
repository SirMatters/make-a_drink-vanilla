import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  _getInitialData,
  _getRatingVote,
  _updateUser,
  _editCocktail,
} from '../utils/API';
import { getCocktails, editCocktail } from './cocktails';
import { handleUserAuthentication, authenticateUser } from './authedUser';
import { getUsers, updateUser } from './users';

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    _getInitialData().then(({ cocktails, users }) => {
      dispatch(handleUserAuthentication('u1'));
      dispatch(getCocktails(cocktails));
      dispatch(getUsers(users));
      dispatch(hideLoading());
    });
  };
};

export const handleStarsVote = ({ cocktailId, ratingVal, votes, user }) => {
  return (dispatch, getState) => {
    const oldCocktailData = getState().cocktails[cocktailId];
    const oldUserData = getState().users[user.id];

    dispatch(updateUser(user));
    dispatch(authenticateUser(user));
    dispatch(editCocktail({ id: cocktailId, rating: ratingVal, votes }));

    Promise.all([_updateUser(user), _editCocktail(cocktailId)])
      .then()
      .catch((err) => {
        alert('Error in handleStarsVote: ', err);
        dispatch(updateUser(oldUserData));
        dispatch(authenticateUser(oldUserData));
        dispatch(editCocktail(oldCocktailData));
      });
  };
};

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { _getInitialData, _getRatingVote } from '../utils/API';
import { getCocktails, handleEditCocktail } from './cocktails';
import { handleUserAuthentication, authenticateUser } from './authedUser';
import { handleUserUpdate, getUsers } from './users';

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
  return (dispatch) => {
    dispatch(handleEditCocktail({ id: cocktailId, rating: ratingVal, votes }));
    dispatch(handleUserUpdate(user));
    dispatch(authenticateUser(user));
  };
};

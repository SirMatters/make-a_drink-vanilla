import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { _getInitialData } from '../utils/API';
import { getCocktails } from './cocktails';
import { authenticateUser } from './authedUser';

const AUTHED_ID = 'u1';

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    _getInitialData().then(({ cocktails }) => {
      dispatch(getCocktails(cocktails));
      dispatch(authenticateUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
};

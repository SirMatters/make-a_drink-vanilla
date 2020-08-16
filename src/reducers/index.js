import { combineReducers } from 'redux';
import { cocktails } from './cocktails';
import { authedUser } from './authedUser';
import { users } from './users';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = combineReducers({
  cocktails,
  authedUser,
  loadingBar: loadingBarReducer,
  users,
});

export default reducers;

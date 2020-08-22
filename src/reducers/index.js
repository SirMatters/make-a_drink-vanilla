import { combineReducers } from 'redux';
import { cocktails } from './cocktails';
import { authedUser } from './authedUser';
import { users } from './users';
import { comments } from './comments';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = combineReducers({
  cocktails,
  authedUser,
  users,
  comments,
  loadingBar: loadingBarReducer,
});

export default reducers;

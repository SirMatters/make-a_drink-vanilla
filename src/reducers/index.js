import { combineReducers } from 'redux';
import { cocktails } from './cocktails';
import { authedUser } from './authedUser';

const reducers = combineReducers({ cocktails, authedUser });

export default reducers;

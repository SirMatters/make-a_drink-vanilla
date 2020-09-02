import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  RECEIVE_COMMENTS,
} from '../actions/comments';

export const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...state, ...action.comments };
    case ADD_COMMENT:
      const { comment } = action;

      return {
        ...state,
        [comment.id]: comment,
      };
    case DELETE_COMMENT:
      let comments = { ...state };
      delete comments[action.id];
      return comments;
    case EDIT_COMMENT:
    default:
      return state;
  }
};

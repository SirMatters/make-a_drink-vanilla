import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  RECEIVE_COMMENTS,
  TOGGLE_COMMENT,
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
      return { ...state, [action.comment.id]: action.comment };
    case TOGGLE_COMMENT:
      console.log(action.hasLiked, action.authedUser);
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked
            ? state[action.id].likes.filter((u) => u !== action.authedUser.id)
            : [...state[action.id].likes, action.authedUser.id],
        },
      };
    default:
      return state;
  }
};

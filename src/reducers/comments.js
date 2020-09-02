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
      let replyingTo = {};

      if (comment.replyingTo && state[comment.replyingTo]) {
        replyingTo = {
          [replyingTo]: {
            ...state[replyingTo],
            replies: state[comment.replyingTo].replies.concat([replyingTo]),
          },
        };
      }

      return {
        ...state,
        [comment.id]: comment,
        ...replyingTo,
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

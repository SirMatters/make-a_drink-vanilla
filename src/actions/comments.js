import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTs';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TOGGLE_COMMENT = 'TOGGLE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const handleAddComment = ({ text, isFor, replyingTo }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading);

    return addComment({ text, author: authedUser, replyingTo, isFor })
      .then((comment) => {
        dispatch(addComment(comment));
        console.log(`Got comment in handleAddComment:, ${comment}`);
      })
      .then(() => dispatch(hideLoading));
  };
};

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id,
});

const toggleComment = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_COMMENT,
  id,
});

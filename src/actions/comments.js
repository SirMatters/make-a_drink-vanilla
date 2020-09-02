import { _getComments, _deleteComment } from '../utils/API';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTs';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TOGGLE_COMMENT = 'TOGGLE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const handleReceiveComments = (cocktailId) => {
  return (dispatch) => {
    _getComments(cocktailId).then(({ comments }) => {
      dispatch(receiveComments(comments));
    });
  };
};

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id,
});

export const handleCommentDelete = (id) => {
  return (dispatch, getState) => {
    const comment = getState().comments[id];
    const replies = Object.values(getState().comments).filter(
      (c) => c.replyingTo === id
    );

    dispatch(deleteComment(id));
    replies.forEach((r) => {
      deleteComment(r.id);
    });

    _deleteComment(id)
      .then()
      .catch(() => {
        dispatch(addComment(comment));
        replies.forEach((r) => {
          dispatch(addComment(r));
        });
      });
  };
};

const toggleComment = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_COMMENT,
  id,
});

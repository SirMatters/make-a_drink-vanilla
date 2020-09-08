import {
  _getComments,
  _deleteComment,
  _addComment,
  _editComment,
  _toggleComment,
} from '../utils/API';
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

export const handleCommentEdit = (comment) => {
  return (dispatch) => {
    _editComment(comment)
      .then((comment) => {
        dispatch(editComment(comment));
      })
      .catch((err) => {
        console.log(err);
        alert('Sorry, the action can not be done now');
      });
  };
};

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
      dispatch(deleteComment(r.id));
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
  authedUser,
  hasLiked,
});

export const handleToggleComment = ({ id, authedUser, hasLiked }) => {
  return (dispatch) => {
    // if authed user in comment.likes -> delete from arr
    // if authed user is not in comment.likes -> add user there
    _toggleComment()
      .then(() => {
        dispatch(toggleComment({ id, authedUser, hasLiked }));
      })
      .catch();
  };
};

export const handleAddComment = ({ text, isFor, replyingTo }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading);

    return _addComment({ text, author: authedUser.id, replyingTo, isFor })
      .then((comment) => {
        dispatch(addComment(comment));
      })
      .then(() => dispatch(hideLoading));
  };
};

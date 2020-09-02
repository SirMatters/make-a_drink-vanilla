import React, { Fragment } from 'react';
import { useState, useDispatch } from 'react-redux';
import { handleCommentDelete } from '../actions/comments';
import CommentsList from './CommentsList';

const Comment = ({ comment, authedUser }) => {
  const dispatch = useDispatch();

  const deleteComment = (id) => {
    console.log('click on delete', id);
    dispatch(handleCommentDelete(id));
  };

  return (
    <Fragment>
      <div className={'comment'}>
        {comment.text}
        {comment.author === authedUser.id && (
          <span onClick={() => deleteComment(comment.id)}> X</span>
        )}
      </div>
      <CommentsList isFor={comment.isFor} replyingTo={comment.id} />
    </Fragment>
  );
};

export default Comment;

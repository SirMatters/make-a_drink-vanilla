import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { handleCommentDelete } from '../actions/comments';
import CommentsList from './CommentsList';
import NewComment from './NewComment';

const Comment = ({ comment, authedUser, onSelect, isSelected }) => {
  const dispatch = useDispatch();

  const deleteComment = (id) => {
    console.log('click on delete', id);
    dispatch(handleCommentDelete(id));
  };
  const onReplySelect = (id) => {
    onSelect(id);
  };

  return (
    <Fragment>
      <div className={'comment'}>
        {comment.text}
        {comment.author === authedUser.id && (
          <span onClick={() => deleteComment(comment.id)}> X</span>
        )}
        {
          <div
            onClick={() => {
              onReplySelect(comment.id);
            }}
          >
            Reply
          </div>
        }
      </div>
      {isSelected && (
        <NewComment
          isFor={comment.isFor}
          replyingTo={comment.id}
          clearSelected={() => onReplySelect(null)}
        />
      )}
      <CommentsList isFor={comment.isFor} replyingTo={comment.id} />
    </Fragment>
  );
};

export default Comment;

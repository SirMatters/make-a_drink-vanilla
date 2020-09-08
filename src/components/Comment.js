import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleCommentDelete, handleCommentEdit } from '../actions/comments';
import CommentsList from './CommentsList';
import NewComment from './NewComment';

const Comment = ({ comment, authedUser, onSelect, isSelected }) => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    setText(comment.text);
  }, [comment, authedUser, onSelect, isSelected]);

  const deleteComment = (id) => {
    console.log('click on delete', id);
    dispatch(handleCommentDelete(id));
  };

  const onReplySelect = (id) => {
    onSelect(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    dispatch(handleCommentEdit({ ...comment, text }));
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    const keys = ['Escape', 'Tab'];
    if (keys.indexOf(key) > -1) {
      setEditing(false);
    }
  };
  const onEditClick = () => {
    setEditing(true);
  };
  const onCommentEdit = (e) => {
    setText(e.target.value);
  };

  return (
    <Fragment>
      <div className={'comment'}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <textarea
              name='text'
              value={text}
              onChange={(e) => onCommentEdit(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button>Submit</button>
          </form>
        ) : (
          comment.text
        )}
        {comment.author === authedUser.id && (
          <span onClick={() => deleteComment(comment.id)}> X</span>
        )}
        {comment.author !== authedUser.id ? (
          <div
            onClick={() => {
              onReplySelect(comment.id);
            }}
          >
            Reply
          </div>
        ) : (
          <div onClick={onEditClick}>Edit</div>
        )}
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

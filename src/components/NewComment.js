import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleAddComment } from '../actions/comments';

const NewComment = ({ isFor, replyingTo = null }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    dispatch(handleAddComment({ isFor, replyingTo, text }));
  };

  return (
    <div className='newComment'>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={onChange} />
        <button disabled={text === ''} type='Submit'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default NewComment;

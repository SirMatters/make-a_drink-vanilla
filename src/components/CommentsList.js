import React from 'react';
import { useDispatch } from 'react-redux';

const CommentsList = (props) => {
  const { comments } = props;

  return (
    <div className='comments-list'>
      <ul>
        {Object.values(comments).map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;

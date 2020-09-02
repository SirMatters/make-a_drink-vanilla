import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const CommentsList = ({ isFor, replyingTo = null }) => {
  const authedUser = useSelector((state) => state.authedUser);
  const comments = useSelector((state) => {
    //TODO: return only isFor and replyingTo comments
    return state.comments;
  });
  const displayComments =
    Object.values(comments).reduce((a, b) => {
      if (b.replyingTo === replyingTo) {
        a.push(b);
      }
      return a;
    }, []) || [];
  return (
    <div className='comments-list'>
      {JSON.stringify(displayComments)}
      <ul>
        {displayComments.map((c) => (
          <li key={c.id}>
            <Comment comment={c} authedUser={authedUser} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;

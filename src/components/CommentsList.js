import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const CommentsList = ({ isFor, replyingTo = null }) => {
  const [selected, setSelected] = useState(null);

  const authedUser = useSelector((state) => state.authedUser);
  const comments = useSelector((state) => {
    //TODO: return only isFor and replyingTo comments
    return state.comments;
  });

  const handleReplySelect = (id) => {
    setSelected(id);
  };

  const displayComments =
    Object.values(comments).reduce((a, b) => {
      if (b.replyingTo === replyingTo) {
        a.push(b);
      }
      return a;
    }, []) || [];
  return (
    <div className='comments-list'>
      <ul>
        {displayComments.map((c) => (
          <li key={c.id}>
            <Comment
              comment={c}
              authedUser={authedUser}
              isSelected={c.id === selected}
              onSelect={handleReplySelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;

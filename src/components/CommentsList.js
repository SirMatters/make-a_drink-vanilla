import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCommentDelete } from '../actions/comments';

const CommentsList = (props) => {
  const { comments } = props;
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();

  const deleteComment = (id) => {
    console.log('click on delete', id);
    dispatch(handleCommentDelete(id));
  };

  return (
    <div className='comments-list'>
      <ul>
        {Object.values(comments).map((c) => (
          <li key={c.id}>
            {c.text}
            {c.author === authedUser.id && (
              <span onClick={() => deleteComment(c.id)}> X</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;

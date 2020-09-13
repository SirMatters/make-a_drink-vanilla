import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import styled from 'styled-components';

const CommentListStyles = styled.div`
  ul {
    padding-left: 2rem;
  }
  li {
    list-style: none;
  }
`;

const CommentsList = ({ isFor, replyingTo = null }) => {
  const [selected, setSelected] = useState(null);

  const authedUser = useSelector((state) => state.authedUser);
  const comments = useSelector((state) => {
    //TODO: return only isFor and replyingTo comments
    let comments = Object.values(state.comments).reduce((a, b) => {
      if (b.isFor === isFor) {
        a[b.id] = b;
      }
      return a;
    }, {});
    return comments || {};
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
    <CommentListStyles>
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
    </CommentListStyles>
  );
};

export default CommentsList;

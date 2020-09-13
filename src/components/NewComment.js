import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddComment } from '../actions/comments';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const NewCommentStyles = styled.div`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  padding: 1rem;

  form {
    flex-grow: 1;
    textarea {
      width: 100%;
      outline: none;
      border: 1px solid #f4f4f4;
      resize: none;
    }

    button {
      display: block;
    }
  }

  .author-avatar {
    height: 4rem;
    width: 4rem;
    position: relative;
    margin-right: 0.5rem;

    border-radius: 2rem;
    overflow: hidden;
    /* border: 0.4rem solid black; */

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-height: 100%;
    }
  }
`;

const NewComment = ({ isFor, replyingTo = null, clearSelected = () => {} }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const authedAvatar = useSelector((state) => state.authedUser.avatar);
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    dispatch(handleAddComment({ isFor, replyingTo, text }));
    clearSelected();
  };

  return (
    <NewCommentStyles>
      <div className='author-avatar'>
        <img src={authedAvatar} />
      </div>
      <form onSubmit={handleSubmit}>
        <TextareaAutosize minRows='4' value={text} onChange={onChange} />
        <button disabled={text === ''} type='Submit'>
          Add Comment
        </button>
      </form>
    </NewCommentStyles>
  );
};

export default NewComment;

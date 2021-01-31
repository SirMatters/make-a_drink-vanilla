import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleCommentDelete,
  handleCommentEdit,
  handleToggleComment,
} from '../../actions/comments';
import CommentsList from './CommentsList';
import NewComment from './NewComment';
import styled from 'styled-components';
import LikeButton from '../Common/LikeButton';
import { timestampToDate, timestampToHumanString } from '../../utils/utils.js';

const CommentStyles = styled.div`
  font-size: 1.2rem;
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  background-color: #ffffff;

  .author-avatar {
    height: 4rem;
    width: 4rem;
    position: relative;

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

  .comment-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-left: 0.5rem;

    .comment-info {
      display: flex;
      justify-content: left;

      .comment-author {
        margin-right: 0.5rem;
        color: ${(props) => props.theme.link.blue};
      }

      .comment-created {
        color: ${(props) => props.theme.link.grey};
      }

      .comment-edited {
        margin-left: 0.5rem;
        color: ${(props) => props.theme.link.grey};
      }
    }

    .comment-text {
      margin: 0.5rem 0;
    }
    .comment-buttons {
      display: flex;
      justify-content: left;
      max-width: 20rem;

      .comment-like {
        margin-left: auto;
      }

      button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        margin-right: 0.5rem;
        padding: 0;

        color: ${(props) => props.theme.link.grey};

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Comment = ({ comment, authedUser, onSelect, isSelected }) => {

  const dispatch = useDispatch();
  const authorData = useSelector((state) => state.users[comment.author]);
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    setText(comment.text);
  }, [comment, authedUser, onSelect, isSelected]);

  const hasLiked = comment.likes.includes(authedUser.id);

  const handleLike = () => {
    dispatch(handleToggleComment({ id: comment.id, authedUser, hasLiked }));
  };

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
      <CommentStyles className='comment'>
        <div className='author-avatar'>
          <img src={authorData.avatar} />
        </div>
        <div className='comment-details'>
          <div className='comment-info'>
            <span className='comment-author'>{authorData.handle}</span>
            <span className='comment-created'>
              {timestampToHumanString(comment.timestamp)}
            </span>
            {comment.edited && (
              <span className='comment-edited'>
                edited {timestampToDate(comment.edited)}
              </span>
            )}
          </div>
          <div className='comment-text'>
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
              <span>{comment.text}</span>
            )}
          </div>
          <div className='comment-buttons'>
            <button
              className='comment-reply'
              onClick={() => {
                onReplySelect(comment.id);
              }}
            >
              Reply
            </button>
            {comment.author === authedUser.id && (
              <Fragment>
                <button className='comment-edit' onClick={onEditClick}>
                  Edit
                </button>
                <button
                  className='comment-delete'
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              </Fragment>
            )}

            <span className='comment-like'>
              <LikeButton
                handleLike={handleLike}
                isActive={hasLiked}
                likesNum={comment.likes.length}
                size='1.2rem'
              />
            </span>
          </div>
        </div>
      </CommentStyles>

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

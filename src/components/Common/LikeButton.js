import React, { Fragment } from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index';
import styled from 'styled-components';

const LikeButtonStyles = styled.div`
  max-height: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export default (props) => {
  const onLikeClick = () => {
    props.handleLike();
  };

  return (
    <LikeButtonStyles>
      <span>{props.likesNum}</span>
      <button onClick={onLikeClick}>
        {props.isActive ? (
          <TiHeartFullOutline size={props.size} color='#e0425e' />
        ) : (
          <TiHeartOutline size={props.size} />
        )}
      </button>
    </LikeButtonStyles>
  );
};

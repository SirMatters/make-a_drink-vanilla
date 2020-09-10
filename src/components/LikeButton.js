import React from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index';

export default (props) => {
  const onLikeClick = () => {
    props.handleLike();
  };

  return (
    <button onClick={onLikeClick}>
      {props.likesNum}
      {props.isActive ? (
        <TiHeartFullOutline color='#e0425e' />
      ) : (
        <TiHeartOutline />
      )}
    </button>
  );
};

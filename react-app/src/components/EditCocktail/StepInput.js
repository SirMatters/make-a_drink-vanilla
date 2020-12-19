import React, { useState } from 'react';
import { ImageDisplay, ImageUpload } from './ImageUpload';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const StepInputStyles = styled.li`
  display: flex;
`;

export default ({
  num,
  text,
  img,
  onStepDelete,
  onStepImgChange,
  onStepTextChange,
}) => {
  const handleTextChange = (e) => {
    onStepTextChange(e);
  };
  const handleImgChange = (imgUrl) => {
    onStepImgChange(num, imgUrl);
  };
  const handleStepDelete = () => {
    onStepDelete(num);
  };

  return (
    <StepInputStyles>
      <span>{num}</span>
      <TextareaAutosize
        name={`sText-${num}`}
        value={text}
        onChange={handleTextChange}
      />
      {img === '' ? (
        <ImageUpload onImageSelect={handleImgChange} />
      ) : (
        <img src={img} style={{ maxHeight: '1rem' }} />
      )}
      <span onClick={handleStepDelete}> X </span>
    </StepInputStyles>
  );
};

import React from 'react';
import { FaImage, FaTimesCircle } from 'react-icons/fa';
import styled from 'styled-components';

const UploadStyle = styled.div`
  input {
    display: none;
  }
  max-height: 15rem;
`;

const DisplayStyle = styled.div`
  position: relative;
  max-height: 15rem;

  label {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 100%;
  }

  img {
    border: 2px dashed grey;
    margin: 1rem;
    padding: 1rem;
    max-height: 15rem;
  }
`;

export const ImageDisplay = (props) => {
  const removeImage = () => {
    props.onImageSelect('');
  };

  return (
    <DisplayStyle>
      <label htmlFor='cocktail-image'>
        <FaTimesCircle size='1.5rem' onClick={removeImage} />
      </label>
      <img id='cocktail-image' src={props.image} />
    </DisplayStyle>
  );
};

export const ImageUpload = (props) => {
  const onChange = (e) => {
    const file = [...e.target.files][0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.onImageSelect(reader.result);
    };
  };

  return (
    <UploadStyle>
      <label htmlFor='fileUpload'>
        <FaImage size='10rem' />
      </label>
      <input
        type='file'
        name='cocktail-image'
        id='fileUpload'
        onChange={onChange}
      />
    </UploadStyle>
  );
};

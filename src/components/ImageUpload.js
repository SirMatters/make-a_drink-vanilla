import React from 'react';
import { FaImage, FaTimesCircle } from 'react-icons/fa';
import styled from 'styled-components';

const UploadStyle = styled.div`
  input {
    display: none;
  }

  .image-display {
    position: relative;

    label {
      position: absolute;
      top: 0;
      left: 0;
    }

    img {
      border: 2px dashed grey;
      margin: 1rem;
      padding: 1rem;
    }
  }
`;

const ImageUpload = (props) => {
  const onChange = (e) => {
    const file = [...e.target.files][0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.onImageSelect(reader.result);
    };
  };

  const removeImage = () => {
    props.onImageSelect('');
  };

  return (
    <UploadStyle>
      {props.image === '' && (
        <div>
          <label for='fileUpload'>
            <FaImage size='10rem' />
          </label>
          <input
            type='file'
            name='cocktail-image'
            id='fileUpload'
            onChange={onChange}
          />
        </div>
      )}
      {props.image !== '' && (
        <div className='image-display'>
          <label for='cocktail-image'>
            <FaTimesCircle size='1.5rem' onClick={removeImage} />
          </label>
          <img id='cocktail-image' src={props.image} />
        </div>
      )}
    </UploadStyle>
  );
};

export default ImageUpload;

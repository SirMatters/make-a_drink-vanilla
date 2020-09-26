import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const initialData = {
  0: {
    id: 0,
    imgUrls: {
      large:
        'https://www.pngkey.com/png/detail/367-3676141_download-png-numeros-png-5.png',
    },
  },
};

const CarouselStyles = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;

  .carousel-preview {
    overflow-y: auto;
    flex: 1 1 15rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;

      .selected {
        border: 2px solid green;
      }
      li {
        img {
          width: 100%;
        }
      }
    }
  }

  .carousel-show {
    flex: 0 0 35rem;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ImageCarousel = (props) => {
  const [show, setShow] = useState(0);

  const handlePreviewClick = (i, j) => {
    if (props.images[props.selected]) {
      setShow(i.id);
      props.onPreviewClick(i.id);
    }
  };

  useEffect(() => {
    if (props.selected) {
      setShow(props.selected);
    }
  }, [props.selected]);

  return (
    <CarouselStyles>
      <div className='carousel-preview'>
        <ul>
          {Object.values(props.images).map((i, j) =>
            i.imgUrls.large !== '' ? (
              <li
                ref={props.imgRefs ? props.imgRefs[i] : null}
                className={show === i.id ? 'selected' : null}
                key={`img-prev-${i.id}`}
                onClick={() => handlePreviewClick(i, j)}
              >
                <img src={i.imgUrls.large} />
              </li>
            ) : null
          )}
        </ul>
      </div>
      <div className='carousel-show'>
        <img src={props.images[show].imgUrls.large} />
      </div>
    </CarouselStyles>
  );
};

ImageCarousel.defaultProps = {
  images: initialData,
};

export default ImageCarousel;

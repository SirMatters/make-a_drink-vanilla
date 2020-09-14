import React, { useState } from 'react';
import styled from 'styled-components';

const initialData = {
  0: {
    count: 0,
    imgUrls: {
      large:
        'https://www.pngkey.com/png/detail/367-3676141_download-png-numeros-png-5.png',
    },
  },
  1: {
    count: 1,
    imgUrls: {
      large: 'https://pngimg.com/uploads/number1/number1_PNG14901.png',
    },
  },
  2: {
    count: 2,
    imgUrls: {
      large:
        'https://www.pngkey.com/png/detail/367-3676141_download-png-numeros-png-5.png',
    },
  },
  3: {
    count: 3,
    imgUrls: {
      large:
        'https://www.pngkey.com/png/detail/367-3676141_download-png-numeros-png-5.png',
    },
  },
  4: {
    count: 4,
    imgUrls: {
      large:
        'https://www.pngkey.com/png/detail/367-3676141_download-png-numeros-png-5.png',
    },
  },
  5: {
    count: 5,
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

      li {
        border: 1px solid black;
        img {
          max-width: 10rem;
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

  const handlePreviewClick = (i) => {
    setShow(i.count);
  };

  return (
    <CarouselStyles>
      <div className='carousel-preview'>
        <ul>
          {Object.values(props.images).map((i) => (
            <li
              key={`img-prev-${i.count}`}
              onClick={() => handlePreviewClick(i)}
            >
              <img src={i.imgUrls.large} />
            </li>
          ))}
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

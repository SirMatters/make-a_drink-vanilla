import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarsRating = ({ maxVal, currentRating, disabled, votesNum }) => {
  const [rating, setRating] = useState(Math.floor(currentRating));
  const [hover, setHover] = useState(null);

  const handleClick = (ratingVal) => {
    if (!disabled) {
      setRating(ratingVal);
    }
  };

  const handleHover = (ratingVal) => {
    if (!disabled) {
      setHover(ratingVal);
    }
  };

  return (
    <div>
      {[...Array(maxVal ? maxVal : 5)].map((s, i) => {
        const ratingVal = i + 1;

        return (
          <label className='rating-star' key={`star-${i}`}>
            <input type='radio' name='rating' value={ratingVal} />
            <FaStar
              className='star'
              size={20}
              color={ratingVal <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onClick={() => handleClick(ratingVal)}
              onMouseEnter={() => handleHover(ratingVal)}
              onMouseLeave={() => handleHover(null)}
            />
          </label>
        );
      })}
      <span>
        {currentRating}({votesNum})
      </span>
    </div>
  );
};

export default StarsRating;

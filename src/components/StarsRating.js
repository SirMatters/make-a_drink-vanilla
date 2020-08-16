import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarsRating = ({ maxVal }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(maxVal)].map((s, i) => {
        const ratingVal = i + 1;

        return (
          <label className='rating-star' key={`star-${i}`}>
            <input type='radio' name='rating' value={ratingVal} />
            <FaStar
              className='star'
              size={20}
              color={ratingVal <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onClick={() => setRating(ratingVal)}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarsRating;

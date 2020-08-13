import React from 'react';
import { withRouter } from 'react-router-dom';

const CocktailCard = ({ cocktail, history }) => {
  const onClick = () => {
    history.push(`/cocktails/${cocktail.id}`);
  };

  const style = {
    backgroundImage: `url(${cocktail.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: '100%',
  };
  return (
    <div className='cocktail-card' onClick={onClick}>
      <div className='cocktail-card__info'>
        <div className='cocktail-card__img' style={style}></div>
        <div className='cocktail-card__raiting'>{cocktail.raiting}</div>
      </div>
      <div className='cocktail-card__name'>{cocktail.name}</div>
    </div>
  );
};

export default withRouter(CocktailCard);

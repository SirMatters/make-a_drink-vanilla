import React from 'react';
import { withRouter } from 'react-router-dom';

const CocktailCard = ({ cocktail, history }) => {
  const onClick = () => {
    history.push(`/cocktails/${cocktail.id}`);
  };
  return (
    <div className='cocktail-card' onClick={onClick}>
      <div className='cocktail-card__info'>
        <div className='cocktail-card__img'>{cocktail.name} img</div>
        <div className='cocktail-card__raiting'>{cocktail.raiting}</div>
      </div>
      <div className='cocktail-card__name'>{cocktail.name}</div>
    </div>
  );
};

export default withRouter(CocktailCard);

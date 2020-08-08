import React from 'react';

const CocktailCard = ({ cocktail }) => {
  const onClick = () => {
    alert(`Clicked cocktail ${cocktail.name}`);
  };
  return (
    <div className='cocktail-card' onClick={onClick}>
      <div className='cocktail-card__info'>
        <div className='cocktail-card__img'>{cocktail.name} img</div>
        <div className='cocktail-card__raiting'>{cocktail.name} raiting</div>
      </div>
      <div className='cocktail-card__name'>{cocktail.name}</div>
    </div>
  );
};

export default CocktailCard;

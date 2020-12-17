import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const CocktailCardStyles = styled.div`
  min-height: 35rem;
  min-width: 25rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  box-shadow: 10px 10px 8px #888888;

  .cocktail-card__info {
    width: 100%;
    height: 100%;
    .cocktail-card__img {
      background-image: ${(props) => `url(${props.cocktail.image})`};
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      height: 32rem;
    }
  }
`;

const CocktailCard = ({ cocktail, history }) => {
  const onClick = () => {
    history.push(`/cocktails/${cocktail.id}`);
  };

  return (
    <CocktailCardStyles cocktail={cocktail} onClick={onClick}>
      <div className='cocktail-card__info'>
        <div className='cocktail-card__img'></div>
        <div className='cocktail-card__raiting'>{cocktail.rating}</div>
      </div>
      <div className='cocktail-card__name'>{cocktail.name}</div>
    </CocktailCardStyles>
  );
};

export default withRouter(CocktailCard);

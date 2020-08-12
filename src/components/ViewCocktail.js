import React from 'react';
import { connect } from 'react-redux';

class ViewCocktail extends React.Component {
  render() {
    const { cocktail } = this.props;
    const { steps } = cocktail;
    return (
      <div className='cocktail'>
        <div className='cocktail__name'>{cocktail.name}</div>
        {/*TODO: provide default image*/}
        {cocktail.image ? (
          <img
            className='cocktail__img'
            src={cocktail.image}
            alt={`cocktail-${cocktail.id}-img`}
          />
        ) : null}
        <div className='cocktail__description'>{cocktail.description}</div>
        <div className='cocktail__steps-container'>
          {Object.keys(steps).map((s) => (
            <li className='cocktail__step' key={`step-${s}`}>
              <span className='step__number'>{s}</span>
              <div>{steps[s]}</div>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, cocktails }, props) => {
  const { id } = props.match.params;
  const cocktail = cocktails[id];
  const { comments } = cocktail;
  return {
    id,
    cocktail,
    comments: comments
      ? []
      : comments.sort((a, b) => comments[b].timestamp - comments[a].timestamp),
  };
};
export default connect(mapStateToProps)(ViewCocktail);

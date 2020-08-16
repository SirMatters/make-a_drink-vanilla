import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from './StarsRating';
import { handleStarsVote } from '../actions/shared';
class ViewCocktail extends React.Component {
  onRating = (ratingVal) => {
    const { dispatch, cocktail, authedUser } = this.props;
    const { votes, rating, id } = cocktail;

    let newRating = 0;
    let newVotesNum = votes;

    const prevVote = authedUser.votes[id];

    if (prevVote) {
      newRating = rating - (prevVote - ratingVal) / newVotesNum;
    } else {
      newVotesNum++;
      newRating = (rating * votes + ratingVal) / newVotesNum;
    }

    const updatedUser = {
      ...authedUser,
      votes: {
        ...authedUser.votes,
        [cocktail.id]: ratingVal,
      },
    };

    dispatch(
      handleStarsVote({
        user: updatedUser,
        ratingVal: newRating,
        votes: newVotesNum,
        cocktailId: id,
      })
    );
  };

  render() {
    const { cocktail, authedUser } = this.props;
    const vote = authedUser.votes[cocktail.id];
    const { steps } = cocktail;
    return (
      <div className='cocktail'>
        <Link to={`/cocktails/${cocktail.id}/edit`}>Edit</Link>
        <div className='cocktail__name'>{cocktail.name}</div>
        {/*TODO: provide default image*/}
        {cocktail.image ? (
          <img
            className='cocktail__img'
            src={cocktail.image}
            alt={`cocktail-${cocktail.id}-img`}
          />
        ) : null}
        <StarsRating
          currentRating={vote ? vote : 0}
          votesNum={cocktail.votes}
          onChange={this.onRating}
          totalRating={cocktail.rating}
        />
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

const mapStateToProps = ({ authedUser, cocktails, users }, props) => {
  const { id } = props.match.params;
  const cocktail = cocktails[id];
  const { comments } = cocktail;
  return {
    authedUser,
    users,
    id,
    cocktail,
    comments: comments
      ? []
      : comments.sort((a, b) => comments[b].timestamp - comments[a].timestamp),
  };
};
export default connect(mapStateToProps)(ViewCocktail);

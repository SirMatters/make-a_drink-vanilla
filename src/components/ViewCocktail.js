import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from './StarsRating';
import { handleStarsVote, handleAddComment } from '../actions/shared';
import { handleReceiveComments } from '../actions/comments';
import NewComment from './NewComment';
class ViewCocktail extends React.Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(handleReceiveComments(id));
  }

  onRating = (ratingVal) => {
    const { dispatch, cocktail, authedUser } = this.props;
    const { votes, rating, id } = cocktail;

    // TODO: should all calc be done by an API?

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

  onNewComment = (text) => {
    const { dispatch, cocktail } = this.props;
    // handleAddCocktail gets authedUser within the action's handler
    dispatch(handleAddComment({ text, isFor: cocktail.id }));
  };

  render() {
    const { cocktail, authedUser, comments } = this.props;
    const vote = authedUser.votes[cocktail.id];
    const { steps } = cocktail;
    return (
      <Fragment>
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
        <NewComment onSubmit={this.onNewComment} />
        <ul>
          {Object.values(comments).map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser, cocktails, users, comments }, props) => {
  const { id } = props.match.params;
  const cocktail = cocktails[id];

  const cocktailComments = cocktail.comments.reduce((a, b) => {
    if (comments[b]) {
      a[b] = comments[b];
    }
    return a;
  }, {});

  return {
    authedUser,
    users,
    id,
    cocktail,
    comments: cocktailComments,
  };
};
export default connect(mapStateToProps)(ViewCocktail);

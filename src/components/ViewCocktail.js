import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from './StarsRating';
import { handleStarsVote } from '../actions/shared';
import { handleReceiveComments } from '../actions/comments';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ImageCarousel from './ImageCarousel';

const ViewStyles = styled.div`
  max-width: 100%;
  display: grid;
  max-height: 45rem;
  overflow: hidden;

  grid-template-columns: minmax(35rem, 50rem) minmax(10rem, 1fr) 1fr;
  grid-template-rows: 3rem 3rem 10rem 1fr;
  grid-template-areas:
    'img title controls'
    'img rating rating'
    'img description description'
    'img steps steps';
  grid-column-gap: 2rem;

  & h2 {
    margin-top: 0;
  }
  .cocktail-img {
    max-width: 100%;
    grid-area: img;
    max-height: 100%;
    justify-self: center;
  }

  .cocktail-title {
    grid-area: title;
    margin: 0;
  }

  .cocktail-controls {
    grid-area: controls;
  }

  .cocktail-rating {
    grid-area: rating;
  }

  .cocktail-description {
    grid-area: description;
  }

  .steps-container {
    grid-area: steps;
    max-height: 100%;
    overflow-y: auto;
  }
`;

class ViewCocktail extends React.Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(handleReceiveComments(id));
  }

  onRating = (ratingVal) => {
    const { dispatch, cocktail, authedUser } = this.props;
    const { votes, rating, id } = cocktail;

    // FIXME: rating val and calculation should be done by API!

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
    const { cocktail, authedUser, comments } = this.props;

    if (!cocktail) {
      return <Redirect to='/not_found' />;
    }

    const vote = authedUser.votes[cocktail.id];
    const { steps } = cocktail;
    return (
      <Fragment>
        <ViewStyles className='cocktail'>
          {/* <img
            className='cocktail-img'
            src={cocktail.image}
            alt={`cocktail-${cocktail.id}-img`}
          /> */}
          <div className='cocktail-img'>
            <ImageCarousel />
          </div>
          <h1 className='cocktail-title div-cloud'>{cocktail.name}</h1>
          <Link
            className='cocktail-controls'
            to={`/cocktails/${cocktail.id}/edit`}
          >
            Edit
          </Link>
          <StarsRating
            currentRating={vote ? vote : 0}
            votesNum={cocktail.votes}
            onChange={this.onRating}
            totalRating={cocktail.rating}
          />
          <div className='cocktail-description'>
            <h2>About</h2>
            <div className='div-cloud'>{cocktail.description}</div>
          </div>
          <div className='steps-container'>
            <h2>Preparation</h2>
            <ul>
              {Object.keys(steps).map((s) => (
                <li className='cocktail__step div-cloud' key={`step-${s}`}>
                  <span className='step__number'>{s}</span>
                  <div>{steps[s]}</div>
                </li>
              ))}
            </ul>
          </div>
        </ViewStyles>
        <h2>Comments</h2>
        <NewComment isFor={cocktail.id} />
        {comments && <CommentsList isFor={cocktail.id} />}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser, cocktails, users, comments }, props) => {
  const { id } = props.match.params;
  const cocktail = cocktails[id];

  const cocktailComments = Object.values(comments).reduce((a, b) => {
    if (b.isFor === id) {
      a[b.id] = b;
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

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StarsRating from '../Common/StarsRating';
import { handleStarsVote } from '../../actions/shared';
import { handleReceiveComments } from '../../actions/comments';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ImageCarousel from '../Common/ImageCarousel';
import StepView from './StepView';

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
  state = {
    selected: 1,
  };

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

  handleStepSelect = (num) => {
    this.setState({ selected: num });
  };

  buildAdditionalImagesObj = (cocktail) => {
    let obj = Object.values(cocktail.steps).reduce((a, b) => {
      a[b.id] = { id: b.id, imgUrls: b.imgUrls };
      return a;
    }, {});
    console.log('additional img:', obj);
    return obj;
  };

  render() {
    const { cocktail, authedUser, comments } = this.props;

    if (!cocktail) {
      return <Redirect to='/not_found' />;
    }
    const cocktailImages = {
      0: { id: 0, imgUrls: { large: cocktail.image } },
      ...this.buildAdditionalImagesObj(cocktail),
    };

    const vote = authedUser.votes[cocktail.id];
    const { steps } = cocktail;
    const imgRefs = Object.keys(cocktailImages).map((i) => React.createRef());

    return (
      <Fragment>
        <ViewStyles className='cocktail'>
          <div className='cocktail-img'>
            {/* <ImageCarousel
              imgRefs={imgRefs}
              images={cocktailImages}
              selected={this.state.selected}
              onPreviewClick={this.handleStepSelect}
            /> */}
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
              {Object.keys(steps)
                .map((s) => parseInt(s))
                .map((s) => (
                  <StepView
                    // TODO: conisder if sth still has to happen
                    // onStepClick={this.handleStepSelect} 
                    num={s}
                    key={s}
                    selected={this.state.selected.toString() === s}
                    text={steps[s].text}
                  />
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
  const cocktail = cocktails[id] || {};

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

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NewCocktail from './NewCocktail';

class EditCocktail extends React.Component {
  render() {
    const { cocktails, match, authedUser } = this.props;
    const { id } = match.params;

    return (
      <div>
        {cocktails[id] ? (
          authedUser === cocktails[id].author ? (
            <NewCocktail id={id} />
          ) : (
            <div>
              Sorry, you can not edit the cocktail as it was created by another
              user.
              <Link to={`/cocktails/${id}`}>Go to the cocktail view.</Link>
            </div>
          )
        ) : (
          <div>No such cocktail</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps });
export default connect(mapStateToProps)(withRouter(EditCocktail));

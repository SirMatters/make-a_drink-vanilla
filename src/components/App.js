import React from 'react';
import { connect } from 'react-redux';
import { handleGetCocktails } from '../actions/cocktails';
import NewCocktail from './NewCocktail';
import { authenticateUser } from '../actions/authedUser';

class App extends React.Component {
  componentDidMount() {
    // FIXME: fix user
    this.props.dispatch(authenticateUser('placeholder'));
    this.props.dispatch(handleGetCocktails());
  }

  render() {
    return Object.keys(this.props.cocktails).length !== 0 && <NewCocktail />;
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
